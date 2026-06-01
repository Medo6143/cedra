import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { i18n } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PortfolioLightbox from "@/components/PortfolioLightbox";

// Dynamically import all work images
const workImages = import.meta.glob('@/assets/work-*.jpeg', { eager: true, as: 'url' });

// Create portfolio items with categories
const portfolioItems = Object.keys(workImages)
  .sort((a, b) => {
    const numA = parseInt(a.match(/work-(\d+)\.jpeg/)?.[1] || '0');
    const numB = parseInt(b.match(/work-(\d+)\.jpeg/)?.[1] || '0');
    return numA - numB;
  })
  .map((path, index) => {
    const num = index + 1;
    let category: string;
    
    // Distribute images across categories
    if (num <= 74) {
      category = "bath"; // bathroom
    } else if (num <= 148) {
      category = "bed"; // bedroom
    } else {
      category = "kit"; // kitchen
    }
    
    return {
      image: workImages[path] as string,
      category: category,
      images: [workImages[path] as string],
    };
  });

const ITEMS_PER_PAGE = 12;

export default function Works() {
  const { language } = useLanguage();
  const t = i18n[language].portfolio;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    images: string[];
    title: string;
    index: number;
  }>({ open: false, images: [], title: "", index: 0 });

  const filteredItems = selectedCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const openLightbox = (item: typeof portfolioItems[0]) => {
    const title = t.categories[item.category as keyof typeof t.categories];
    setLightbox({ open: true, images: item.images, title, index: 0 });
  };

  const closeLightbox = () =>
    setLightbox((prev) => ({ ...prev, open: false }));

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden font-sans">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-foreground/70">
              {t.subtitle}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-black"
                  : "bg-white/10 text-foreground hover:bg-white/20"
              }`}
            >
              {t.categories.all}
            </button>
            <button
              onClick={() => setSelectedCategory("bath")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === "bath"
                  ? "bg-primary text-black"
                  : "bg-white/10 text-foreground hover:bg-white/20"
              }`}
            >
              {t.categories.bath}
            </button>
            <button
              onClick={() => setSelectedCategory("bed")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === "bed"
                  ? "bg-primary text-black"
                  : "bg-white/10 text-foreground hover:bg-white/20"
              }`}
            >
              {t.categories.bed}
            </button>
            <button
              onClick={() => setSelectedCategory("kit")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === "kit"
                  ? "bg-primary text-black"
                  : "bg-white/10 text-foreground hover:bg-white/20"
              }`}
            >
              {t.categories.kit}
            </button>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentItems.map((item, index) => (
              <motion.div
                key={startIndex + index}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group relative aspect-square overflow-hidden cursor-pointer rounded-lg"
                onClick={() => openLightbox(item)}
              >
                <img
                  src={item.image}
                  alt={t.categories[item.category as keyof typeof t.categories]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3">
                  <div className="text-center">
                    <p className="text-primary font-serif font-bold text-lg tracking-wide">
                      {t.categories[item.category as keyof typeof t.categories]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                {language === "ar" ? "السابق" : "Previous"}
              </button>
              <span className="text-foreground/70">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                {language === "ar" ? "التالي" : "Next"}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />

      <PortfolioLightbox
        images={lightbox.images}
        title={lightbox.title}
        isOpen={lightbox.open}
        onClose={closeLightbox}
        initialIndex={lightbox.index}
      />
    </div>
  );
}
