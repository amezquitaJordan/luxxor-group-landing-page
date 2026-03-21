"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, MessageSquareText } from "lucide-react";
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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <section className="py-24 bg-[var(--color-luxxor-dark)] text-white relative flex flex-col items-center border-t border-b border-[#2A2A2A]" id="faq">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-[var(--color-luxxor-gold)]/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[var(--color-luxxor-gold)]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light mb-4 text-[var(--color-luxxor-gold)]"
          >
            Preguntas Frecuentes
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 font-light"
          >
            Resolvemos tus dudas sobre remodelación y diseño de interiores
          </motion.p>
        </div>

        <div className="space-y-4 mb-16">
          {FAQS.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-[#2a2a2a] bg-[#1a1a1a]/50 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
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
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed text-md font-light">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button to Chatbot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setIsChatOpen(true)}
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-[var(--color-luxxor-gold)] text-[var(--color-luxxor-dark)] font-medium text-lg tracking-wide rounded-none overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <MessageSquareText className="w-6 h-6 mr-3 z-10" />
            <span className="z-10 relative">Preguntar a nuestro Asistente IA</span>
          </button>
        </motion.div>
      </div>

      <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </section>
  );
}
