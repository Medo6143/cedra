import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { i18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import { FaClipboardCheck, FaFileContract } from "react-icons/fa";

const icons = [FaClipboardCheck, FaFileContract];

const highlightsAr = [
  ["إدارة كاملة للمراحل", "أفضل الموردين", "ضمان الجودة"],
  ["تكلفة محددة مسبقاً", "لا مفاجآت مالية", "التزام بالمواعيد"],
];
const highlightsEn = [
  ["Full phase management", "Best suppliers", "Quality guarantee"],
  ["Pre-defined cost", "No surprises", "On-time delivery"],
];

export default function FinishingSystems() {
  const { language } = useLanguage();
  const t = i18n[language].systems;
  const highlights = language === "ar" ? highlightsAr : highlightsEn;

  return (
    <section id="systems" className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {t.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative border border-white/8 bg-background/50 hover:border-primary/40 transition-all duration-500 p-8"
                data-testid={`system-card-${index}`}
              >
                {/* Gold top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 shrink-0 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="text-2xl text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary font-serif leading-snug pt-2">
                    {item.title}
                  </h3>
                </div>

                <p className="text-foreground/70 leading-relaxed mb-6 text-base">
                  {item.desc}
                </p>

                {/* Highlight tags */}
                <div className="flex flex-wrap gap-2">
                  {highlights[index].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 border border-primary/20 text-primary/70 text-xs tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
