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

  return (
    <LazyMotion features={domAnimation}>
      {/*
       * OPTIMIZACIÓN DESKTOP (lg+): Reducción de padding vertical por breakpoint.
       * py-24 en mobile/tablet se ajusta en lg para que la sección no ocupe pantallas
       * completas en resoluciones 1366×768 al 100% zoom. Escala hasta 2xl.
       */}
      <section id="por-que-elegirnos" className="relative w-full py-24 lg:py-20 xl:py-24 2xl:py-28 bg-[#F0EBE1] dark:bg-[var(--theme-bg-primary)] transition-colors duration-700 overflow-hidden">
        {/* Fondo Premium - Textura */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay -z-10" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        <div className="max-w-[1200px] xl:max-w-[1400px] w-full px-6 md:px-12 lg:px-12 xl:px-24 mx-auto relative z-10 flex flex-col items-center">
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

            {/*
             * OPTIMIZACIÓN DESKTOP (lg+): Tipografía fluida con clamp().
             * lg:text-5xl (48px) y xl:text-6xl (60px) resultaban en títulos
             * desproporcionados en Desktop 1366/1440px al 100% de zoom.
             * clamp() garantiza escalado suave y elegante entre resoluciones.
             */}
            <h2 className="text-4xl md:text-5xl lg:text-[clamp(1.75rem,2.8vw,2.25rem)] xl:text-[clamp(2rem,3vw,2.5rem)] 2xl:text-4xl font-light text-[#D4AF37] mb-6 tracking-wide [text-shadow:0_0_20px_rgba(212,175,55,0.15)] leading-tight">
              ¿Por Qué Elegir a Luxxor Group?
            </h2>

            <p className="text-xl md:text-2xl text-[#2A2824] dark:text-[var(--theme-text-primary)] font-medium mb-6 tracking-wide drop-shadow-md">
              Somos sus socios estratégicos en la transformación de su estilo de vida
            </p>

            <p className="text-base md:text-lg text-[#5C5A56] dark:text-[var(--theme-text-secondary)] leading-relaxed font-light">
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
                initial={{ opacity: 0, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                viewport={{ once: false, margin: "-15% 0px", amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative p-8 luxxor-card-premium bg-[#FFFFFF] dark:bg-[var(--theme-bg-card)] border border-[#D4AF37]/30 dark:border-[var(--theme-card-border)] hover:bg-white dark:hover:bg-[var(--theme-bg-card)] hover:shadow-xl"
              >
                {/* Mobile Glow Animation */}
                <m.div 
                  initial={false}
                  animate={{ boxShadow: ['0 0 15px var(--theme-gold-glow)', '0 0 35px var(--theme-gold-glow)', '0 0 15px var(--theme-gold-glow)'] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none z-0"
                />
                
                <div className="relative z-10 text-[var(--color-luxxor-gold)] text-5xl font-serif font-thin mb-8 opacity-50 transition-opacity duration-300">
                  {reason.id}
                </div>
                <h3 className="relative z-10 text-xl font-serif text-[#2A2824] dark:text-[var(--theme-text-primary)] mb-4 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="relative z-10 text-[#5C5A56] dark:text-[var(--theme-text-secondary)] font-light text-sm leading-relaxed">
                  {reason.description}
                </p>
                
                <div className="relative z-10 w-0 h-[2px] bg-[var(--color-luxxor-gold)] mt-8 transition-all duration-500 ease-out" />
              </m.div>
            ))}
          </div>

          {/* ── TABLET EXCLUSIVE (768px hasta 1023px): Stagger secuencial intocable ── */}
          <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-12 pt-6">
            {reasons.map((reason, index) => (
              <m.div
                key={reason.id}
                initial={{ opacity: 0, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                viewport={{ once: false, margin: "-15% 0px", amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative p-8 luxxor-card-premium bg-[#FFFFFF] dark:bg-[var(--theme-bg-card)] border border-[#D4AF37]/30 dark:border-[var(--theme-card-border)] hover:bg-white dark:hover:bg-[var(--theme-bg-card)] hover:shadow-xl"
              >
                {/* Tablet Glow Animation */}
                <m.div 
                  initial={false}
                  animate={{ boxShadow: ['0 0 15px var(--theme-gold-glow)', '0 0 35px var(--theme-gold-glow)', '0 0 15px var(--theme-gold-glow)'] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none lg:hidden z-0"
                />
                
                <div className="relative z-10 text-[var(--color-luxxor-gold)] text-5xl font-serif font-thin mb-8 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {reason.id}
                </div>
                <h3 className="relative z-10 text-xl font-serif text-[#2A2824] dark:text-[var(--theme-text-primary)] mb-4 group-hover:text-[var(--color-luxxor-gold)] transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="relative z-10 text-[#5C5A56] dark:text-[var(--theme-text-secondary)] font-light text-sm leading-relaxed">
                  {reason.description}
                </p>
                
                <div className="relative z-10 w-0 h-[2px] bg-[var(--color-luxxor-gold)] mt-8 group-hover:w-full transition-all duration-500 ease-out" />
              </m.div>
            ))}
          </div>

          {/* 
           * Renderizado Desktop: Se utiliza la capa principal con comportamientos 
           * originales en hover y distribuciones en Grid (lg:grid-cols-4). 
           */}
          {/* ── DESKTOP (1024px+): comportamiento original sin cambios ── */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8 pt-0">
            {reasons.map((reason, index) => (
              <m.div
                key={reason.id}
                initial={{ opacity: 0, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                viewport={{ once: false, margin: "-15% 0px", amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative p-8 lg:p-6 xl:p-8 luxxor-card-premium bg-[#FFFFFF] dark:bg-[var(--theme-bg-card)] border border-[#D4AF37]/30 dark:border-[var(--theme-card-border)] hover:bg-white dark:hover:bg-[var(--theme-bg-card)] hover:shadow-xl"
              >
                <div className="relative z-10 text-[var(--color-luxxor-gold)] text-5xl lg:text-4xl xl:text-5xl font-serif font-thin mb-8 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {reason.id}
                </div>
                <h3 className="relative z-10 text-xl lg:text-lg xl:text-xl font-serif text-[#2A2824] dark:text-[var(--theme-text-primary)] mb-4 group-hover:text-[var(--color-luxxor-gold)] transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="relative z-10 text-[#5C5A56] dark:text-[var(--theme-text-secondary)] font-light text-sm leading-relaxed">
                  {reason.description}
                </p>
                
                <div className="relative z-10 w-0 h-[2px] bg-[var(--color-luxxor-gold)] mt-8 group-hover:w-full transition-all duration-500 ease-out" />
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
});
