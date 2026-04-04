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
      <section id="proyectos" className="relative w-full py-24 lg:py-20 xl:py-24 2xl:py-28 bg-[#F5EDE2] dark:bg-[var(--theme-bg-primary)] transition-colors duration-700 overflow-hidden">
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

            <p className="text-xl md:text-2xl text-[#2A2824] dark:text-[var(--theme-text-primary)] transition-colors duration-700 font-medium mb-6 tracking-wide drop-shadow-md">
              Cada proyecto refleja nuestra pasión por el lujo y la excelencia
            </p>

            <p className="text-base md:text-lg text-[#5C5A56] dark:text-[var(--theme-text-secondary)] transition-colors duration-700 leading-relaxed font-light mb-8">
              Transformamos espacios residenciales y comerciales en Cali con diseño arquitectónico de alto nivel, acabados premium y atención al detalle. Descubre cómo redefinimos cada entorno.
            </p>

            <a href="#contacto" className="inline-block border-b-2 border-[#D4AF37] text-[#2A2824] dark:text-[var(--theme-text-primary)] hover:text-[#D4AF37] transition-colors duration-300 pb-1 font-semibold uppercase tracking-widest text-sm">
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
          <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#F5EDE2] dark:from-[var(--theme-bg-primary)] to-transparent z-10 pointer-events-none transition-colors duration-700" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#F5EDE2] dark:from-[var(--theme-bg-primary)] to-transparent z-10 pointer-events-none transition-colors duration-700" />

          <div 
            className="flex w-max gap-8 px-6 will-change-transform animate-carousel-projects lg:hover:[animation-play-state:paused]"
          >
            {[...projects, ...projects, ...projects].map((project, index) => (
              <div
                key={`project-${index}`}
                className="group/card w-[350px] md:w-[420px] flex flex-col cursor-pointer flex-shrink-0 luxxor-card-premium rounded-2xl"
              >
                {/* Bloque Superior: Imagen portrait */}
                <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden rounded-t-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 350px, 420px"
                    className="object-cover object-center transform group-hover/card:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  />
                  {/* Gradiente inferior para blend con el bloque sándwich */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#F5F2EB] dark:from-[var(--theme-bg-card)] to-transparent pointer-events-none" />
                </div>

                {/* Bloque Inferior: Texto Sándwich desplazado */}
                <div className="-mt-10 relative z-10 mx-4 mb-4 bg-[#F5F2EB] dark:bg-[var(--theme-bg-card)] p-6 border border-[#D4AF37]/30 rounded-xl hover:border-[#D4AF37] transition-colors duration-300 flex flex-col justify-between gap-4">
                  <div>
                    <p className="text-[#D4AF37] text-xs tracking-widest uppercase font-semibold mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-xl font-serif text-[#2A2824] dark:text-[var(--theme-text-primary)] group-hover/card:text-[#D4AF37] transition-colors duration-300 leading-snug">
                      {project.title}
                    </h3>
                  </div>
                  <div className="h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent origin-left scale-x-[0.3] opacity-50 group-hover/card:scale-x-100 group-hover/card:opacity-100 transition-all duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
});
