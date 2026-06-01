import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { i18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import PortfolioLightbox from "./PortfolioLightbox";

// Create portfolio items with categories - using @assets alias
const portfolioItems = Array.from({ length: 222 }, (_, i) => {
  const index = i + 1;
  let category: string;
  
  // Distribute images across categories
  if (index <= 74) {
    category = "bath"; // bathroom
  } else if (index <= 148) {
    category = "bed"; // bedroom
  } else {
    category = "kit"; // kitchen
  }
  
  return {
    image: new URL(`../assets/work-${index}.jpeg`, import.meta.url).href,
    category: category,
    images: [new URL(`../assets/work-${index}.jpeg`, import.meta.url).href],
  };
});

export default function Portfolio() {
  const { language } = useLanguage();
  const t = i18n[language].portfolio;
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    images: string[];
    title: string;
    index: number;
  }>({ open: false, images: [], title: "", index: 0 });

  const openLightbox = (item: (typeof portfolioItems)[0]) => {
    const title = t.categories[item.category as keyof typeof t.categories];
    setLightbox({ open: true, images: item.images, title, index: 0 });
  };

  const closeLightbox = () =>
    setLightbox((prev) => ({ ...prev, open: false }));

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {portfolioItems.slice(0, 6).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative aspect-square overflow-hidden cursor-pointer"
              onClick={() => openLightbox(item)}
              data-testid={`portfolio-item-${index}`}
            >
              <img
                src={item.image}
                alt={t.categories[item.category as keyof typeof t.categories]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3">
                {/* Zoom icon */}
                <div className="w-14 h-14 border border-primary/60 flex items-center justify-center text-primary">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-primary font-serif font-bold text-lg tracking-wide">
                    {t.categories[item.category as keyof typeof t.categories]}
                  </p>
                  <p className="text-white/60 text-xs mt-1 tracking-widest uppercase">
                    {language === "ar"
                      ? `${item.images.length} صور`
                      : `${item.images.length} photos`}
                  </p>
                </div>
              </div>

              {/* Image count badge */}
              <div className="absolute top-3 end-3 bg-black/70 border border-primary/30 px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="text-primary text-xs font-mono">{item.images.length}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="/works"
            className="inline-block bg-primary text-black px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            {language === "ar" ? "عرض جميع الأعمال" : "View All Works"}
          </a>
        </motion.div>
      </div>

      <PortfolioLightbox
        images={lightbox.images}
        title={lightbox.title}
        isOpen={lightbox.open}
        onClose={closeLightbox}
        initialIndex={lightbox.index}
      />
    </section>
  );
}
