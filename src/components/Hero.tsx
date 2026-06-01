import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/context/LanguageContext";
import { i18n } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import hero2Path from "@/assets/hero-2.png";
import hero3Path from "@/assets/hero-3.png";
import work1Path from "@/assets/work-1.png";
import work2Path from "@/assets/work-2.png";
import work4Path from "@/assets/work-4.png";
import work6Path from "@/assets/work-6.png";

const slides = [
  { image: hero2Path,  key: "slide2" },
  { image: work1Path,  key: "slide3" },
  { image: hero3Path,  key: "slide4" },
  { image: work2Path,  key: "slide5" },
  { image: work4Path,  key: "slide6" },
  { image: work6Path,  key: "slide7" },
];

const slideTextKeys = ["slide2", "slide3", "slide4", "slide5", "slide6", "slide7"] as const;

export default function Hero() {
  const { language } = useLanguage();
  const t = i18n[language].hero;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: language === "ar" ? "rtl" : "ltr" },
    [Autoplay({ delay: 5500, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({ direction: language === "ar" ? "rtl" : "ltr" });
    }
  }, [language, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Cycle through available hero text keys
  const heroTextKeys = Object.keys(t) as Array<keyof typeof t>;
  const getSlideText = (index: number) => {
    const key = heroTextKeys[index % heroTextKeys.length];
    return t[key] as { title: string; subtitle: string };
  };

  return (
    <section id="home" className="relative h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {slides.map((slide, index) => {
            const slideData = getSlideText(index);
            const isActive = index === selectedIndex;
            return (
              <div key={index} className="relative flex-[0_0_100%] h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 z-10" />

                <img
                  src={slide.image}
                  alt={slideData.title}
                  data-testid={`hero-slide-img-${index}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-none ${isActive ? "hero-zoom" : ""}`}
                />

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`text-${index}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="relative z-20 h-full container mx-auto px-4 flex flex-col justify-center items-center text-center"
                    >
                      <div className="max-w-4xl">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="w-24 h-px bg-primary mx-auto mb-8"
                        />
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary font-bold mb-6 drop-shadow-2xl leading-tight">
                          {slideData.title}
                        </h1>
                        <p className="text-lg md:text-2xl text-white/85 font-light max-w-2xl mx-auto drop-shadow-md mb-12">
                          {slideData.subtitle}
                        </p>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="flex items-center justify-center gap-4 flex-wrap"
                        >
                          <a
                            href="#services"
                            data-testid="hero-cta-services"
                            className="px-10 py-4 bg-primary text-black font-bold tracking-widest uppercase text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.5)]"
                          >
                            {language === "ar" ? "اكتشف خدماتنا" : "Discover Services"}
                          </a>
                          <a
                            href="#portfolio"
                            data-testid="hero-cta-portfolio"
                            className="px-10 py-4 bg-transparent border border-primary/60 text-primary font-bold tracking-widest uppercase text-sm hover:bg-primary/10 transition-all duration-300"
                          >
                            {language === "ar" ? "شاهد أعمالنا" : "View Portfolio"}
                          </a>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={language === "ar" ? scrollNext : scrollPrev}
        data-testid="hero-arrow-prev"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 border border-primary/40 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </button>
      <button
        onClick={language === "ar" ? scrollPrev : scrollNext}
        data-testid="hero-arrow-next"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 border border-primary/40 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,18 15,12 9,6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            data-testid={`hero-dot-${index}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`transition-all duration-500 ${
              index === selectedIndex
                ? "w-8 h-1 bg-primary"
                : "w-2 h-1 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-30 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-white tracking-widest uppercase rotate-90 origin-center translate-y-4">scroll</span>
        <div className="w-px h-12 bg-white/40" />
      </div>
    </section>
  );
}
