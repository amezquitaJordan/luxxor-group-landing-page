/*
 * Archivo: components/ValueAdded.tsx
 * Componente: ValueAdded
 * Propósito: Una de las barras visuales estilo "marquee / cinta sin fin" 
 * listando diferenciadores rápidos y de alto valor de la entidad de forma repetitiva.
 */
"use client";

import React, { useState } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useTransform, useAnimationFrame, useReducedMotion } from "framer-motion";

const values = [
  "Diseño en 3D antes de ejecutar",
  "Equipo Profesional Certificado",
  "Cumplimiento Riguroso",
  "Acabados de Alto Estándar",
  "Acompañamiento Personalizado",
  "Materiales Importados y Nacionales",
];

/* 
 * Componente principal ValueAdded
 * Reutiliza las características avanzadas de movimiento dinámico de Framer Motion 
 * (useAnimationFrame + useMotionValue) similares a TestimonialsCarousel.
 */
export default React.memo(function ValueAdded() {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${v}%`);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((_t, delta) => {
    if (reducedMotion || isHovered) return;
    let moveBy = (delta / 1000) * 1.5;
    let newX = baseX.get() - moveBy;
    if (newX <= -33.333) {
      newX += 33.333;
    }
    baseX.set(newX);
  });

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full py-20 bg-[#EDE5D8] dark:bg-[var(--theme-bg-primary)] transition-colors duration-700 overflow-hidden">
        {/* Fondo Premium - Textura */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        <div className="container mx-auto px-6 mb-12 text-center relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px", amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-[1px] bg-[var(--color-luxxor-gold)]" />
            <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
              Valor Agregado
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-luxxor-gold)]" />
          </m.div>
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px", amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl font-serif text-[#2A2824] dark:text-[var(--theme-text-primary)] transition-colors duration-700"
          >
            Mucho más que una transacción
          </m.h2>
        </div>

        <div className="relative flex overflow-x-hidden group py-4">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#EDE5D8] dark:from-[var(--theme-bg-primary)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#EDE5D8] dark:from-[var(--theme-bg-primary)] to-transparent z-10 pointer-events-none" />
          
          {/* Infinite JS Carousel */}
          <m.div 
            style={{ x }}
            onMouseEnter={() => {
              // Solo pausar en Desktop (≥1024px) — nunca en Mobile ni Tablet
              if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
              setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            className="flex whitespace-nowrap w-max will-change-transform"
          >
            {[...values, ...values, ...values].map((value, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-6 px-8 py-4 mx-4 luxxor-card-premium bg-[#FFFFFF] dark:bg-[var(--theme-bg-card)] border border-[#D4AF37]/25 dark:border-[var(--theme-card-border)] text-[#5C5A56] dark:text-[var(--theme-text-secondary)] hover:text-[var(--color-luxxor-gold)] hover:bg-white hover:shadow-lg cursor-default transition-all duration-300"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--color-luxxor-gold)]" />
                <span className="text-xl font-serif tracking-wide">{value}</span>
              </div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
});
