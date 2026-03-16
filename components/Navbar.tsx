"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-luxxor-dark)]/90 backdrop-blur-md border-b border-[var(--color-luxxor-gold)]/20"
    >
      <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-3xl font-serif text-[var(--color-luxxor-gold)] tracking-widest font-bold">
          LX
        </a>
        
        {/* Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-light tracking-wider text-gray-300">
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
          className="hidden md:inline-flex px-6 py-2 border border-[var(--color-luxxor-gold)] text-[var(--color-luxxor-gold)] font-semibold text-sm uppercase tracking-widest hover:bg-[var(--color-luxxor-gold)] hover:text-black transition-colors duration-300 rounded-none shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          Cotizar
        </a>
      </div>
    </motion.nav>
  );
}
