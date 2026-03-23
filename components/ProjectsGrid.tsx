"use client";

import React, { useState } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useTransform, useAnimationFrame, useReducedMotion } from "framer-motion";
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
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${v}%`);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((t, delta) => {
    if (reducedMotion || isHovered) return;
    let moveBy = (delta / 1000) * 1.5; // slow speed, 1.5% per second
    let newX = baseX.get() - moveBy;
    if (newX <= -33.333) {
      newX += 33.333; // reset
    }
    baseX.set(newX);
  });

  return (
    <LazyMotion features={domAnimation}>
      <section id="proyectos" className="relative w-full py-24 bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
        {/* Fondo Premium - Textura */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:w-1/2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
                <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
                  Nuestros Últimos Proyectos
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white">
                Explora algunas de nuestras remodelaciones y diseños más recientes en Cali.
              </h2>
            </m.div>
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:w-1/4"
            >
              <a href="#contacto" className="inline-block border-b-2 border-[var(--color-luxxor-gold)] text-white hover:text-[var(--color-luxxor-gold)] transition-colors duration-300 pb-1 font-semibold uppercase tracking-widest text-sm">
                Ver Catálogo Completo
              </a>
            </m.div>
          </div>
        </div>

        {/* Infinite Carousel JS */}
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

          <m.div 
            style={{ x }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex w-max gap-8 px-6 will-change-transform"
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
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
});
