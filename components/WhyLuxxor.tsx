/*
 * Archivo: components/WhyLuxxor.tsx
 * Componente: WhyLuxxor
 * Propósito: Muestra la sección "La Ventaja Luxxor", que exalta las características 
 * únicas o motivos para elegir a Luxxor Group (cards de beneficios).
 * Interacciones/Animaciones: Usa `framer-motion` para animaciones de entrada en scroll. 
 * Posee configuraciones específicas (stagger) para dispositivos móviles distintos a escritorio.
 */
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

/*
 * Componente funcional memorizado (React.memo) para prevenir renders innecesarios.
 * No recibe Props y su estado interno es manejado estrictamente por animaciones delegadas.
 */
export default React.memo(function WhyLuxxor() {
  /* 
   * Variantes de animación para Escritorio (lg+) 
   * Controla la aparición en bloque y aparición secuencial rápida (staggerChildren).
   */
  // Variants Desktop (lg+) — comportamiento original
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.22 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  /* 
   * Variantes de animación EXCLUSIVAS para Mobile + Tablet (hasta 1023px)
   * Logra un flujo más lento o secuencial para una mejor apreciación en patallas tactiles.
   */
  // Variants EXCLUSIVOS para Mobile + Tablet (hasta 1023px) — stagger secuencial premium
  const mobileTabletContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0 }
    }
  };

  const mobileTabletItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
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
            className="text-center max-w-3xl mb-16 md:mb-24 flex flex-col items-center transform-gpu"
            style={{ willChange: "opacity, transform" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px 0px -40px 0px", amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
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

          {/* 
           * Renderizado Mobile y Tablet: Se utiliza una capa distinta con sus 
           * propias variantes (mobileTabletContainerVariants) para escalabilidad de tiempos. 
           * Esta sección será ocultada en lg y más (mediante className='lg:hidden') 
           */}
          {/* ── MOBILE EXCLUSIVE (hasta 767px): Animación repetible al scroll ── */}
          <div className="flex flex-col md:hidden gap-12 pt-6">
            {reasons.map((reason, index) => (
              <m.div
                key={reason.id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: '-50px', amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ willChange: "opacity, transform" }}
                className="group relative p-8 bg-[var(--color-luxxor-dark)] transform-gpu border-[1.5px] border-[#D4AF37]/40"
              >
                {/* Mobile Glow Animation */}
                <m.div 
                  initial={false}
                  animate={{ boxShadow: ['0 0 15px rgba(212,175,55,0.15)', '0 0 35px rgba(212,175,55,0.3)', '0 0 15px rgba(212,175,55,0.15)'] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none z-0"
                />
                
                <div className="relative z-10 text-[var(--color-luxxor-gold)] text-5xl font-serif font-thin mb-8 opacity-50 transition-opacity duration-300">
                  {reason.id}
                </div>
                <h3 className="relative z-10 text-xl font-serif text-white mb-4 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="relative z-10 text-gray-400 font-light text-sm leading-relaxed">
                  {reason.description}
                </p>
                
                <div className="relative z-10 w-0 h-[2px] bg-[var(--color-luxxor-gold)] mt-8 transition-all duration-500 ease-out" />
              </m.div>
            ))}
          </div>

          {/* ── TABLET EXCLUSIVE (768px hasta 1023px): Stagger secuencial intocable ── */}
          <m.div
            variants={mobileTabletContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "50px 0px", amount: 0.05 }}
            style={{ willChange: "opacity, transform" }}
            className="hidden md:grid md:grid-cols-2 lg:hidden gap-12 pt-6 transform-gpu"
          >
            {reasons.map((reason) => (
              <m.div
                key={reason.id}
                variants={mobileTabletItemVariants}
                style={{ willChange: "opacity, transform" }}
                className="group relative p-8 bg-[var(--color-luxxor-dark)] transition-all duration-500 transform-gpu border-[1.5px] border-[#D4AF37]/40"
              >
                {/* Tablet Glow Animation */}
                <m.div 
                  initial={false}
                  animate={{ boxShadow: ['0 0 15px rgba(212,175,55,0.15)', '0 0 35px rgba(212,175,55,0.3)', '0 0 15px rgba(212,175,55,0.15)'] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none lg:hidden z-0"
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

          {/* 
           * Renderizado Desktop: Se utiliza la capa principal con comportamientos 
           * originales en hover y distribuciones en Grid (lg:grid-cols-4). 
           */}
          {/* ── DESKTOP (1024px+): comportamiento original sin cambios ── */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px 0px -40px 0px", amount: 0.3 }}
            style={{ willChange: "opacity, transform" }}
            className="hidden lg:grid lg:grid-cols-4 gap-8 pt-0 transform-gpu"
          >
            {reasons.map((reason) => (
              <m.div
                key={reason.id}
                variants={itemVariants}
                style={{ willChange: "opacity, transform" }}
                className="group relative p-8 bg-[var(--color-luxxor-dark)] hover:bg-[#1f1f1f] transition-all duration-500 transform-gpu border-[1px] border-gray-800 shadow-none"
              >
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
