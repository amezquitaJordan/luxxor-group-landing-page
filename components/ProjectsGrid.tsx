"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "p1",
    title: "Remodelación Ciudad Jardin",
    category: "Residencial Premium",
    image: "/images/sala-elegante-azul.jpg",
  },
  {
    id: "p2",
    title: "Remodelación Casa Tequendama",
    category: "Residencial Premium",
    image: "/images/sala-de-estar-elegante.jpg",
  },
  {
    id: "p3",
    title: "Restauración Cocina Clásica",
    category: "Restauración de Alta Gama",
    image: "/images/cocina-comedor-blanco-elegante.jpg",
  },
];

export default React.memo(function ProjectsGrid() {
  return (
    <LazyMotion features={domAnimation}>
      <section id="proyectos" className="relative w-full py-24 bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
        {/* Fondo Premium - Textura */}
        <div className="bg-noise" />
        
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        <div className="max-w-[1400px] w-full px-6 md:px-12 lg:px-24 mx-auto relative z-10 flex flex-col items-center">
          {/* Section Header — Centered Premium (matching Commercial section) */}
          <m.div
            className="text-center max-w-3xl mb-16 md:mb-24 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px', amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] font-medium">
                Nuestros Últimos Proyectos
              </span>
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#D4AF37] mb-6 tracking-wide [text-shadow:0_0_20px_rgba(212,175,55,0.15)] leading-tight">
              Explora Nuestras Remodelaciones y Diseños Más Recientes
            </h2>

            <p className="text-xl md:text-2xl text-white font-medium mb-6 tracking-wide drop-shadow-md">
              Cada proyecto refleja nuestra pasión por el lujo y la excelencia
            </p>

            <p className="text-base md:text-lg text-white/70 leading-relaxed font-light mb-8">
              Transformamos espacios residenciales y comerciales en Cali con diseño arquitectónico de alto nivel, acabados premium y atención al detalle. Descubre cómo redefinimos cada entorno.
            </p>

            <a href="#contacto" className="inline-block border-b-2 border-[#D4AF37] text-white hover:text-[#D4AF37] transition-colors duration-300 pb-1 font-semibold uppercase tracking-widest text-sm">
              Ver Catálogo Completo
            </a>
          </m.div>
        </div>

        {/* Infinite Carousel JS */}
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

          <div 
            className="flex w-max gap-8 px-6 will-change-transform animate-carousel-projects hover:[animation-play-state:paused] md:max-lg:hover:[animation-play-state:running] md:max-lg:active:[animation-play-state:running]"
          >
            {[...projects, ...projects, ...projects].map((project, index) => (
              <div
                key={`project-${index}`}
                className="group/card relative w-[350px] md:w-[420px] h-[450px] overflow-hidden cursor-pointer flex-shrink-0"
              >
                {/* Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 350px, 420px"
                    className="object-cover object-center transform group-hover/card:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-80 group-hover/card:opacity-90 transition-opacity duration-300" />
                
                {/* Content Box */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <p className="text-[var(--color-luxxor-gold)] text-sm tracking-widest uppercase font-semibold mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-2xl font-serif text-white mb-4">
                      {project.title}
                    </h3>
                    <div className="w-0 h-[2px] bg-[var(--color-luxxor-gold)] group-hover/card:w-12 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                  </div>
                </div>
                
                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover/card:border-[var(--color-luxxor-gold)]/50 z-30 transition-colors duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
});
