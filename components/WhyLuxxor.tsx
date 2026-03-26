"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const reasons = [
  {
    id: "01",
    title: "Diseño Funcional + Estética Premium",
    description: "Espacios meticulosamente planificados que equilibran la utilidad diaria con el lujo visual."
  },
  {
    id: "02",
    title: "Materiales de Alta Calidad",
    description: "Trabajamos exclusivamente con insumos de primera categoría para acabados duraderos y perfectos."
  },
  {
    id: "03",
    title: "Supervisión Técnica Profesional",
    description: "Control absoluto y seguimiento experto en cada etapa para garantizar el cumplimiento."
  },
  {
    id: "04",
    title: "Servicio Integral en un Solo Lugar",
    description: "Diseño, ejecución, carpintería y restauración gestionados desde una única firma."
  }
];

export default React.memo(function WhyLuxxor() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section id="por-que-elegirnos" className="relative w-full py-24 bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
        {/* Fondo Premium - Textura */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay -z-10" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        <div className="max-w-[1400px] w-full px-6 md:px-12 lg:px-24 mx-auto relative z-10 flex flex-col items-center">
          <m.div
            className="text-center max-w-3xl mb-16 md:mb-24 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px", amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] font-medium">
                La Ventaja Luxxor
              </span>
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#D4AF37] mb-6 tracking-wide [text-shadow:0_0_20px_rgba(212,175,55,0.15)] leading-tight">
              ¿Por Qué Elegir a Luxxor Group?
            </h2>

            <p className="text-xl md:text-2xl text-white font-medium mb-6 tracking-wide drop-shadow-md">
              Somos sus socios estratégicos en la transformación de su estilo de vida
            </p>

            <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
              No somos simplemente contratistas; creamos y transformamos espacios a través del diseño, la excelencia técnica y una pasión incomparable por el detalle.
            </p>
          </m.div>

          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px", amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {reasons.map((reason) => (
              <m.div
                key={reason.id}
                variants={itemVariants}
                style={{ willChange: "box-shadow, transform" }}
                className="group relative p-8 bg-[var(--color-luxxor-dark)] lg:hover:bg-[#1f1f1f] transition-all duration-500 transform-gpu border border-gray-800 md:max-lg:border-[1.5px] md:max-lg:border-[#D4AF37]/40 md:max-lg:shadow-[0_0_25px_-8px_rgba(212,175,55,0.35),0_0_45px_-15px_rgba(212,175,55,0.25)] lg:border-[1px] lg:border-gray-800 lg:shadow-none md:max-lg:hover:translate-y-0 md:max-lg:hover:scale-100"
              >
                {/* Tablet Glow Animation (md a lg) */}
                <m.div 
                  initial={false}
                  animate={{ boxShadow: ['0 0 10px rgba(212,175,55,0.15)', '0 0 30px rgba(212,175,55,0.35)', '0 0 10px rgba(212,175,55,0.15)'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none hidden md:block lg:hidden z-0"
                />
                
                <div className="relative z-10 text-[var(--color-luxxor-gold)] text-5xl font-serif font-thin mb-8 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {reason.id}
                </div>
                <h3 className="relative z-10 text-xl font-serif text-white mb-4 group-hover:text-[var(--color-luxxor-gold)] transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="relative z-10 text-gray-400 font-light text-sm leading-relaxed">
                  {reason.description}
                </p>
                
                <div className="relative z-10 w-0 h-[2px] bg-[var(--color-luxxor-gold)] mt-8 group-hover:w-full transition-all duration-500 ease-out" />
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
});
