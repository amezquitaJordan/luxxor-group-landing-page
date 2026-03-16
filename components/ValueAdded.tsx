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
    <section className="py-20 bg-[#151515] border-y border-gray-800 overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
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
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#151515] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#151515] to-transparent z-10 pointer-events-none" />
        
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
