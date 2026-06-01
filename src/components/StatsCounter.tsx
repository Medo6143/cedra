import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface StatItem {
  value: number;
  suffix: string;
  labelAr: string;
  labelEn: string;
}

const stats: StatItem[] = [
  { value: 200, suffix: "+", labelAr: "مشروع منجز", labelEn: "Projects Done" },
  { value: 8,   suffix: "+", labelAr: "سنوات خبرة",  labelEn: "Years Experience" },
  { value: 100, suffix: "%", labelAr: "رضا العملاء",  labelEn: "Client Satisfaction" },
  { value: 50,  suffix: "+", labelAr: "عميل سنوياً",  labelEn: "Clients / Year" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-background border-y border-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="text-center group"
              data-testid={`stat-item-${i}`}
            >
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="relative text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary leading-none">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
              </div>
              <div className="w-8 h-px bg-primary/40 mx-auto mb-3" />
              <p className="text-foreground/60 text-sm md:text-base tracking-widest uppercase">
                {language === "ar" ? stat.labelAr : stat.labelEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
