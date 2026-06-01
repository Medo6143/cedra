import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { i18n } from "@/lib/i18n";
import logoPath from "@assets/WhatsApp_Image_2026-06-01_at_21.16.04_(1)_1780344304823.jpeg";

export default function Footer() {
  const { language } = useLanguage();
  const t = i18n[language].footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-primary/50 mb-6">
          <img src={logoPath} alt="CEDAR Logo" className="w-full h-full object-cover" />
        </div>
        <p className="text-primary font-serif text-lg mb-6">{t.tagline}</p>
        <p className="text-foreground/50 text-sm">
          {t.rights} {currentYear}
        </p>
      </div>
    </footer>
  );
}
