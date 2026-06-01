import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface LightboxProps {
  images: string[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function PortfolioLightbox({
  images,
  title,
  isOpen,
  onClose,
  initialIndex = 0,
}: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const { language } = useLanguage();

  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, current]);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex flex-col"
          style={{ background: "rgba(0,0,0,0.97)" }}
          data-testid="lightbox-overlay"
          onClick={onClose}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-primary" />
              <span className="text-primary font-serif tracking-widest text-sm uppercase">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-white/40 text-sm font-mono">
                {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button
                data-testid="lightbox-close"
                onClick={onClose}
                className="w-10 h-10 border border-white/20 text-white/70 flex items-center justify-center hover:border-primary hover:text-primary transition-colors duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main image */}
          <div
            className="flex-1 relative flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={images[current]}
                alt={`${title} - ${current + 1}`}
                initial={{ opacity: 0, scale: 1.04, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -20 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="max-h-full max-w-full object-contain select-none"
                data-testid={`lightbox-img-${current}`}
                draggable={false}
              />
            </AnimatePresence>

            {/* Arrow prev */}
            <button
              data-testid="lightbox-prev"
              onClick={prev}
              className={`absolute ${language === "ar" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 text-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors duration-300`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </button>

            {/* Arrow next */}
            <button
              data-testid="lightbox-next"
              onClick={next}
              className={`absolute ${language === "ar" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 text-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors duration-300`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          </div>

          {/* Thumbnail strip */}
          <div
            className="flex gap-2 px-6 py-4 overflow-x-auto border-t border-white/10 scrollbar-hide justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <button
                key={i}
                data-testid={`lightbox-thumb-${i}`}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-all duration-300 ${
                  i === current ? "border-primary" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
