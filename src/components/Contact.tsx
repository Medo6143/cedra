import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { i18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import ConsultationForm from "./ConsultationForm";
import { FaPhone, FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const { language } = useLanguage();
  const t = i18n[language].contact;

  const contactItems = [
    {
      icon: <FaPhone />,
      href: "tel:01207685555",
      value: "012 0768 5555",
      colorClass: "text-primary hover:text-primary",
      bgClass: "bg-primary/10",
    },
    {
      icon: <FaWhatsapp />,
      href: "https://wa.me/201288822555",
      value: "012 8882 2555",
      colorClass: "hover:text-[#25D366]",
      bgClass: "bg-[#25D366]/10",
    },
    {
      icon: <FaEnvelope />,
      href: "mailto:Cedardesign2017@gmail.com",
      value: "Cedardesign2017@gmail.com",
      colorClass: "hover:text-primary",
      bgClass: "bg-primary/10",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} subtitle={t.subtitle} />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: language === "ar" ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border border-white/10 bg-card/60 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between gap-10"
          >
            <div className="space-y-7">
              {contactItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ x: language === "ar" ? -6 : 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`flex items-center gap-4 text-foreground/75 transition-colors duration-300 ${item.colorClass}`}
                  data-testid={`contact-item-${i}`}
                >
                  <div className={`w-12 h-12 shrink-0 ${item.bgClass} border border-white/5 flex items-center justify-center text-xl`}>
                    {item.icon}
                  </div>
                  <span className="font-mono tracking-wider text-lg" dir="ltr">{item.value}</span>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-primary/40" />
                <p className="text-white/40 text-xs tracking-widest uppercase">{t.info.social}</p>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/share/1GqELLastn/"
                  target="_blank" rel="noopener noreferrer"
                  data-testid="contact-facebook"
                  className="w-12 h-12 border border-white/10 text-white/50 flex items-center justify-center hover:border-[#1877F2] hover:text-[#1877F2] transition-all duration-300 text-xl"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/cedarinteriordesign"
                  target="_blank" rel="noopener noreferrer"
                  data-testid="contact-instagram"
                  className="w-12 h-12 border border-white/10 text-white/50 flex items-center justify-center hover:border-[#E4405F] hover:text-[#E4405F] transition-all duration-300 text-xl"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — consultation form */}
          <motion.div
            initial={{ opacity: 0, x: language === "ar" ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <ConsultationForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
