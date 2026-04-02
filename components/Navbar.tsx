/*
 * Archivo: components/Navbar.tsx
 * Componente: Navbar
 * Propósito: Barra de navegación responsiva, fija ("fixed") y opaca 
 * para el desplazamiento fácil del portal de manera accesible.
 * Interacciones: Ingresa suavemente desde arriba al montar el componente 
 * con Framer Motion (initial y: -100).
 */
"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

/* Renderiza la barra con efecto "glassmorphism" o vidrio oscurecido + borde dorado inferior. */
export default React.memo(function Navbar() {
  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50
                   bg-black/75 backdrop-blur-md
                   [border-bottom:1px_solid_rgba(212,175,55,0.40)]
                   shadow-[0_2px_0_rgba(212,175,55,0.18),0_6px_40px_rgba(0,0,0,0.85)]"
      >
        <div className="container mx-auto px-3 sm:px-5 lg:px-12 h-20 flex items-center justify-between gap-2 overflow-hidden">

          {/* Logo */}
          <a
            href="#"
            className="text-xl sm:text-2xl md:text-3xl font-serif text-[#D4AF37] tracking-widest font-bold flex-shrink-0
                       [text-shadow:0_0_18px_rgba(212,175,55,0.35)]"
          >
            LX
          </a>

          {/* Links */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-8
                          text-[10px] sm:text-[11px] md:text-sm
                          font-medium tracking-widest
                          text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
            <a href="#"          className="transition-colors duration-300 hover:text-[#D4AF37]">Inicio</a>
            <a href="#servicios" className="transition-colors duration-300 hover:text-[#D4AF37]">Servicios</a>
            <a href="#proyectos" className="transition-colors duration-300 hover:text-[#D4AF37]">Proyectos</a>
            <a href="#contacto"  className="transition-colors duration-300 hover:text-[#D4AF37]">Contacto</a>
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/573170303333"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 md:px-6 md:py-2
                       border border-[#D4AF37] text-[#D4AF37]
                       font-semibold text-[9px] sm:text-[10px] md:text-sm
                       uppercase tracking-widest rounded-none flex-shrink-0
                       shadow-[0_0_14px_rgba(212,175,55,0.30),0_0_4px_rgba(212,175,55,0.15)]
                       hover:bg-[#D4AF37] hover:text-black
                       hover:shadow-[0_0_22px_rgba(212,175,55,0.40)]
                       transition-all duration-300"
          >
            Cotizar
          </a>
        </div>
      </m.nav>
    </LazyMotion>
  );
});
