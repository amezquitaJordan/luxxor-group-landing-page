"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="contacto" className="relative py-32 bg-[var(--color-luxxor-dark)] overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full border border-[var(--color-luxxor-gold)] absolute animate-pulse-gold scale-x-150 rotate-45" />
        <div className="w-[600px] h-[600px] rounded-full border border-[var(--color-luxxor-gold)] absolute animate-pulse-gold animation-delay-500 scale-y-110 -rotate-12" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="border border-gray-800 bg-[#151515]/80 backdrop-blur-md p-10 md:p-20 relative overflow-hidden"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-luxxor-gold)]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-luxxor-gold)]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-luxxor-gold)]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-luxxor-gold)]" />

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-6 uppercase tracking-wider leading-tight">
            Eleve su estándar <br />
            <span className="text-[var(--color-luxxor-gold)]">Agende su asesoría</span>
          </h2>
          
          <p className="text-gray-300 font-light text-lg mb-12 max-w-2xl mx-auto">
            Discuta sus necesidades de remodelación y diseño con nuestros asesores de manera personalizada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://wa.me/573170303333"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-[var(--color-luxxor-gold)] text-black font-semibold rounded-none tracking-widest uppercase overflow-hidden transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="flex items-center gap-2 relative z-10 text-sm">
                Asesoría WhatsApp
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <div className="text-white text-lg font-serif tracking-widest">
              +57 317 0303333
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
