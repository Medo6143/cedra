import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { i18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import { FaCheckCircle } from "react-icons/fa";

export default function WhyCedar() {
  const { language } = useLanguage();
  const t = i18n[language].why;

  return (
    <section id="why" className="py-24 bg-card relative overflow-hidden">
      <div className="absolute -right-64 -top-64 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -left-64 -bottom-64 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title={t.title} subtitle={t.subtitle} />

        <div className="max-w-3xl mx-auto bg-background/50 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-lg shadow-2xl">
          <ul className="space-y-6">
            {t.items.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 text-lg md:text-xl font-medium text-foreground/90"
              >
                <FaCheckCircle className="text-primary shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
