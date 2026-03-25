"use client";

import React, { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Plus, Minus, MessageSquareText } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ChatbotModal from "@/components/ChatbotModal";

const FAQS = [
  {
    question: "¿Cuánto tiempo toma una remodelación residencial promedio?",
    answer: "Depende del alcance del proyecto. Remodelaciones parciales pueden tomar de 3 a 6 semanas, mientras que renovaciones integrales suelen requerir de 2 a 4 meses."
  },
  {
    question: "¿Trabajan en todo Cali y Valle del Cauca?",
    answer: "Así es, nuestros servicios de remodelación y diseño cubren de forma exclusiva toda la ciudad de Cali y sus alrededores en el Valle del Cauca."
  },
  {
    question: "¿Qué incluye el diseño 3D y Arquitectónico?",
    answer: "Incluye renders fotorealistas, planos técnicos de distribución, selección preliminar de acabados lujosos y visualizaciones de los espacios principales."
  },
  {
    question: "¿Realizan presupuestos cerrados?",
    answer: "Sí, tras aprobar el diseño definitivo y la cotización final, fijamos un valor cerrado para evitar sobrecostos ocultos, garantizando total transparencia."
  }
];

export default React.memo(function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full py-24 bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
        {/* Fondo Premium - Textura */}
        <div className="bg-noise" />
        
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        {/* Background Decor - Optimizados */}
        <div className="bg-glow-gold-top" />
        <div className="bg-glow-gold-bottom" />
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <m.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl font-light mb-4 text-[var(--color-luxxor-gold)]"
            >
              Preguntas Frecuentes
            </m.h2>
            <m.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg md:text-xl text-gray-400 font-light"
            >
              Resolvemos tus dudas sobre remodelación y diseño de interiores
            </m.p>
          </div>

          <m.div 
            className="space-y-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {FAQS.map((faq, index) => (
              <m.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                }}
                className="border border-[#2a2a2a] bg-[#1a1a1a]/50 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <m.button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group will-change-transform"
                >
                  <span className="font-medium text-lg text-gray-200 group-hover:text-[var(--color-luxxor-gold)] transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex-shrink-0 text-[var(--color-luxxor-gold)]">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </span>
                </m.button>
                
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <m.div
                      key={`content-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-400 leading-relaxed text-md font-light">
                        {faq.answer}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            ))}
          </m.div>

          {/* CTA Button to Chatbot */}
          <m.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center"
          >
            <button
              onClick={() => setIsChatOpen(true)}
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-[var(--color-luxxor-gold)] text-[var(--color-luxxor-dark)] font-medium text-lg tracking-wide rounded-none overflow-hidden hover-lift-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <MessageSquareText className="w-6 h-6 mr-3 z-10" />
              <span className="z-10 relative">Preguntar a nuestro Asistente IA</span>
            </button>
          </m.div>
        </div>

        <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </section>
    </LazyMotion>
  );
});
