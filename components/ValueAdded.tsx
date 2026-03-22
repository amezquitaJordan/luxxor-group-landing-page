"use client";

import { motion } from "framer-motion";

const values = [
  "Diseño en 3D antes de ejecutar",
  "Equipo Profesional Certificado",
  "Cumplimiento Riguroso",
  "Acabados de Alto Estándar",
  "Acompañamiento Personalizado",
  "Materiales Importados y Nacionales",
];

export default function ValueAdded() {
  return (
    <section className="relative w-full py-20 bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
      {/* Fondo Premium - Textura */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
      />
      {/* Bordes dorados sutiles */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

      <div className="container mx-auto px-6 mb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <div className="w-8 h-[1px] bg-[var(--color-luxxor-gold)]" />
          <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
            Valor Agregado
          </span>
          <div className="w-8 h-[1px] bg-[var(--color-luxxor-gold)]" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-serif text-white"
        >
          Mucho más que una transacción
        </motion.h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
        
        {/* Infinite Carousel using CSS animation for smooth loop */}
        <div className="flex animate-carousel whitespace-nowrap group-hover:[animation-play-state:paused] w-max">
          {[...values, ...values, ...values].map((value, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-6 px-8 py-4 mx-4 bg-[#1a1a1a] border border-gray-800 text-gray-300 hover:text-[var(--color-luxxor-gold)] hover:border-[var(--color-luxxor-gold)] transition-colors duration-300 cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--color-luxxor-gold)]" />
              <span className="text-xl font-serif tracking-wide">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
