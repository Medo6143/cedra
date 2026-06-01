import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { i18n } from "@/lib/i18n";
import logoPath from "@assets/cedar-logo.jfif";

export default function About() {
  const { language } = useLanguage();
  const t = i18n[language].about;
  const isRTL = language === 'ar';

  return (
    <section id="about" className="py-24 bg-black" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Logo Section */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl shadow-primary/30 transition-all duration-300 group-hover:border-primary group-hover:shadow-primary/40">
                <img src={logoPath} alt="CEDAR Logo" className="w-full h-full object-cover" />
              </div>
              <div className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} bg-primary text-black px-8 py-3 rounded-full font-bold text-xl shadow-lg shadow-primary/50 transition-all duration-300 group-hover:scale-110`}>
                CEDAR
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`lg:w-1/2 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              {t.title}
            </h2>
            <div className="mb-8">
              <p className="text-2xl text-foreground/90 mb-3 font-serif">
                {language === 'ar' ? 'CEDAR للتصميم الداخلي والديكور' : 'CEDAR Interior Design & Decoration'}
              </p>
              <p className="text-lg text-foreground/60 font-medium">
                {t.subtitle}
              </p>
            </div>
            <div className="space-y-5 text-foreground/80 text-lg leading-relaxed">
              <p>{t.description1}</p>
              <p>{t.description2}</p>
              <p>{t.description3}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
