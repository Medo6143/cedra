import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/201288822555"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20bd5a] transition-colors"
      style={{
        boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)"
      }}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
      <FaWhatsapp className="text-3xl relative z-10" />
    </motion.a>
  );
}
