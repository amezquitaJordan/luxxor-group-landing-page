"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default React.memo(function Navbar() {
  return (
    <LazyMotion features={domAnimation}>
      <m.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-luxxor-dark)]/90 backdrop-blur-md border-b border-[var(--color-luxxor-gold)]/20"
      >
        <div className="container mx-auto px-3 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-2 overflow-hidden">
          {/* Logo */}
          <a href="#" className="text-xl sm:text-2xl md:text-3xl font-serif text-[var(--color-luxxor-gold)] tracking-widest font-bold flex-shrink-0">
            LX
          </a>
          
          {/* Links (Mobile & Desktop) */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8 text-[9px] sm:text-[11px] md:text-sm font-light tracking-wider text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
            <a href="#" className="hover:text-[var(--color-luxxor-gold)] transition-colors">Inicio</a>
            <a href="#servicios" className="hover:text-[var(--color-luxxor-gold)] transition-colors">Servicios</a>
            <a href="#proyectos" className="hover:text-[var(--color-luxxor-gold)] transition-colors">Proyectos</a>
            <a href="#contacto" className="hover:text-[var(--color-luxxor-gold)] transition-colors">Contacto</a>
          </div>
          
          {/* CTA */}
          <a 
            href="https://wa.me/573170303333"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-3 py-1.5 md:px-6 md:py-2 border border-[var(--color-luxxor-gold)] text-[var(--color-luxxor-gold)] font-semibold text-[9px] sm:text-[10px] md:text-sm uppercase tracking-widest hover:bg-[var(--color-luxxor-gold)] hover:text-black transition-colors duration-300 rounded-none shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] flex-shrink-0"
          >
            Cotizar
          </a>
        </div>
      </m.nav>
    </LazyMotion>
  );
});
