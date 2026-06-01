import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const projectTypes = {
  ar: ["شقة سكنية", "فيلا", "مكتب تجاري", "محل تجاري", "فندق / مطعم", "أخرى"],
  en: ["Apartment", "Villa", "Office", "Commercial Shop", "Hotel / Restaurant", "Other"],
};

export default function ConsultationForm() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "",
    area: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const labels = {
    title:   isAr ? "اطلب استشارة مجانية"       : "Request Free Consultation",
    subtitle:isAr ? "سيتواصل معك فريقنا خلال 24 ساعة" : "Our team will reach you within 24 hours",
    name:    isAr ? "الاسم الكريم"               : "Your Name",
    phone:   isAr ? "رقم الهاتف"                : "Phone Number",
    type:    isAr ? "نوع المشروع"               : "Project Type",
    area:    isAr ? "المساحة التقريبية (م²)"    : "Approx. Area (m²)",
    message: isAr ? "تفاصيل إضافية (اختياري)"  : "Additional Details (optional)",
    send:    isAr ? "إرسال عبر واتساب"          : "Send via WhatsApp",
    sent:    isAr ? "تم الإرسال! سنتواصل معك قريباً" : "Sent! We'll contact you soon.",
    select:  isAr ? "اختر نوع المشروع"          : "Select project type",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const types = projectTypes[language];
    const msg = isAr
      ? `مرحباً سيدار 👋\nاسمي: ${form.name}\nرقمي: ${form.phone}\nنوع المشروع: ${form.type || "—"}\nالمساحة: ${form.area || "—"} م²\n${form.message ? "ملاحظات: " + form.message : ""}\nأود الحصول على استشارة مجانية.`
      : `Hello CEDAR 👋\nName: ${form.name}\nPhone: ${form.phone}\nProject: ${form.type || "—"}\nArea: ${form.area || "—"} m²\n${form.message ? "Notes: " + form.message : ""}\nI'd like a free consultation.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/201288822555?text=${encoded}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", type: "", area: "", message: "" });
  };

  const inputClass =
    "w-full bg-black/40 border border-white/10 focus:border-primary/60 outline-none px-4 py-3 text-foreground placeholder-white/25 transition-colors duration-300 text-sm rounded-none";
  const labelClass = "block text-white/50 text-xs tracking-widest uppercase mb-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="border border-primary/20 bg-card/60 backdrop-blur-sm p-8 md:p-10"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-px bg-primary" />
          <h3 className="text-primary font-serif text-xl font-bold tracking-wide">
            {labels.title}
          </h3>
        </div>
        <p className="text-white/40 text-sm">{labels.subtitle}</p>
      </div>

      {sent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10"
        >
          <div className="w-14 h-14 border-2 border-primary flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-primary font-serif text-lg">{labels.sent}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" data-testid="consultation-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>{labels.name}</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={isAr ? "محمد أحمد" : "John Smith"}
                className={inputClass}
                data-testid="input-name"
              />
            </div>
            <div>
              <label className={labelClass}>{labels.phone}</label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="01x xxxx xxxx"
                className={inputClass}
                dir="ltr"
                data-testid="input-phone"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>{labels.type}</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={`${inputClass} cursor-pointer`}
                data-testid="select-project-type"
              >
                <option value="">{labels.select}</option>
                {projectTypes[language].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>{labels.area}</label>
              <input
                type="number"
                min="0"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                placeholder="150"
                className={inputClass}
                data-testid="input-area"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>{labels.message}</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={isAr ? "أي تفاصيل تريد إضافتها..." : "Any details you'd like to add..."}
              className={`${inputClass} resize-none`}
              data-testid="textarea-message"
            />
          </div>

          <button
            type="submit"
            data-testid="button-submit-consultation"
            className="w-full py-4 bg-[#25D366] text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:bg-[#20c05a] transition-colors duration-300 group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.117 1.522 5.849L.057 23.5l5.793-1.52A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.366l-.36-.213-3.438.902.917-3.352-.233-.373A9.773 9.773 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
            </svg>
            {labels.send}
          </button>
        </form>
      )}
    </motion.div>
  );
}
