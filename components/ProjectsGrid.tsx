/*
 * Archivo: components/ProjectsGrid.tsx
 * Componente: ProjectsGrid
 * Propósito: Muestra un carrusel dinámico e "infinito" con imágenes y descripciones de 
 * proyectos residenciales clave realizados por Luxxor Group. 
 * Animaciones: Utiliza TailwindCSS (animación continua) y framer-motion para las transiciones.
 */
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

/*
 * Componente principal ProjectsGrid (memorizado).
 * Carece de props explícitas. Manipula un array interno "projects".
 * Presenta un diseño horizontal tipo Carrusel aprovechando animaciones nativas CSS de scroll.
 */
export default React.memo(function ProjectsGrid() {
  return (
    <LazyMotion features={domAnimation}>
      {/* OPTIMIZACIÓN DESKTOP (lg+): Padding vertical reducido en lg/xl/2xl para
          proporcionar secciones equilibradas en resoluciones Desktop al 100% zoom. */}
      <section id="proyectos" className="relative w-full py-24 lg:py-20 xl:py-24 2xl:py-28 bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
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
            viewport={{ once: false, margin: '-50px', amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] font-medium">
                Nuestros Últimos Proyectos
              </span>
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
            </div>

            {/* OPTIMIZACIÓN DESKTOP (lg+): Tipografía fluida con clamp().
                lg:text-6xl (60px) era excesivamente grande en Desktop 1366/1440px al 100% zoom.
                clamp() escala el título de forma suave entre breakpoints Desktop. */}
            <h2 className="text-4xl md:text-5xl lg:text-[clamp(1.75rem,3vw,2.5rem)] xl:text-[clamp(2rem,3.2vw,2.75rem)] 2xl:text-5xl font-light text-[#D4AF37] mb-6 tracking-wide [text-shadow:0_0_20px_rgba(212,175,55,0.15)] leading-tight">
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

        {/* 
         * Contenedor Carrusel Animado
         * El contenedor genera el efecto de bucle infinito utilizando copias repetidas de los arreglos.
         */}
        {/* Infinite Carousel JS */}
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

          <div 
            className="flex w-max gap-8 px-6 will-change-transform animate-carousel-projects lg:hover:[animation-play-state:paused]"
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

                {/* Dark tinting overlay — Permanente y premium en todas las resoluciones */}
                <div className="absolute inset-0 bg-black/[0.32] z-[5] pointer-events-none" />

                {/* Vignette (lente de lujo) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0000002A_30%,transparent_70%)] z-[6] pointer-events-none" />
                
                {/* Overlay Degradado inferior — legible pero con más luz en zona superior */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.88] via-black/[0.55] to-transparent z-10 opacity-80 group-hover/card:opacity-90 transition-opacity duration-300 pointer-events-none" />
                
                {/* Content Box */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end pointer-events-none">
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
                
                {/* Gold frame + aura */}
                <div className="absolute inset-0 border border-[#D4AF37]/45 group-hover/card:border-[#D4AF37]/80 z-30 transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 border border-transparent group-hover/card:shadow-[0_0_30px_-8px_rgba(212,175,55,0.45)] z-30 transition-shadow duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
});
