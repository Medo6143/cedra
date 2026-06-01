import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { i18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import { FaPencilRuler, FaHardHat, FaCouch, FaCube } from "react-icons/fa";
import work2Path from "@/assets/work-2.png";
import work3Path from "@/assets/work-3.png";
import work4Path from "@/assets/work-4.png";
import work5Path from "@/assets/work-5.png";

const serviceImages = [work2Path, work4Path, work3Path, work5Path];
const serviceIcons = [FaPencilRuler, FaHardHat, FaCouch, FaCube];

export default function Services() {
  const { language } = useLanguage();
  const t = i18n[language].services;

  return (
    <section id="services" className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.05)_0%,_transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.items.map((item, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group relative border border-white/8 bg-background hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-default"
                data-testid={`service-card-${index}`}
              >
                {/* Photo top half */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={serviceImages[index]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>

                {/* Icon floating over image/text boundary */}
                <div className="flex justify-center -mt-7 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300 shadow-lg shadow-black/40">
                    <Icon className="text-xl text-primary" />
                  </div>
                </div>

                {/* Text below */}
                <div className="px-6 pb-8 pt-4 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-3 font-serif group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Bottom gold accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
