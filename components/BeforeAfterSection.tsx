/*
 * Archivo: components/BeforeAfterSection.tsx
 * Componentes: Card, BeforeAfterSection
 * Propósito: Demuestra casos de éxito visibles mostrando el estado previo 
 * y final de ciertos espacios utilizando un efecto visual de "cortina" o barrido.
 */
'use client';

import React, { useState } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  before: string;
  after: string;
}

const projects: Project[] = [
  {
    title: "Remodelación Cocina Urbana",
    description: "Transformación completa con isla central y acabados premium.",
    before: "/images/cocina-vieja.png",
    after: "/images/cocina-bonita.png",
  },
  {
    title: "Renovación Sala Principal",
    description: "Diseño de concepto abierto con iluminación cálida.",
    before: "/images/Sala-antigua.png",
    after: "/images/despues-sala.jpg",
  },
  {
    title: "Diseño Baño Spa",
    description: "Oasis personal con mármol y grifería dorada.",
    before: "/images/baño-feo-antiguo.png",
    after: "/images/despues-bano.jpg",
  },
  {
    title: "Dormitorio Suite",
    description: "Rediseño total para máximo confort y elegancia.",
    before: "/images/Habitacion-antigua.png",
    after: "/images/despues-dormitorio.jpg",
  }
];

/*
 * Componente Card local
 * Propósito: Administra independientemente el estado interactivo (Tap/Hover) 
 * de cada elemento iterado de la lista de proyectos.
 * Estado: 
 *  - isTapped: Alterna la visibilidad en dispositivos móviles/táctiles, simulando el hover de escritorio.
 */
function Card({ project }: { project: Project }) {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    setIsTapped(!isTapped);
  };

  return (
    <m.div
      className="flex flex-col h-full group cursor-pointer luxxor-card-premium bg-[#FFFFFF] dark:bg-[var(--theme-bg-card)] border border-[#D4AF37]/30 dark:border-[var(--theme-card-border)] hover:bg-white dark:hover:bg-[var(--theme-bg-card)] hover:shadow-xl p-4 md:p-6 rounded-2xl will-change-transform transition-all"
      onClick={handleTap}
    >
      <m.div
        className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 transition-all duration-300"
      >
        {/* Etiqueta Antes */}
        <div
          className={`absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-sm text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D4AF37]/30 transition-opacity duration-300 ${isTapped ? 'opacity-0' : 'opacity-100'} md:group-hover:opacity-0`}
        >
          Antes
        </div>

        {/* Imagen Antes (Base) */}
        <Image
          src={project.before}
          alt={`Antes - ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover"
        />

        {/* Imagen Después (Reveal on Hover / Tap) */}
        <div className={`absolute inset-0 z-10 transition-[clip-path] duration-500 ease-out ${
          isTapped ? '[clip-path:inset(0_0%_0_0)]' : '[clip-path:inset(0_100%_0_0)]'
        } md:group-hover:[clip-path:inset(0_0%_0_0)]`}>
          <Image
            src={project.after}
            alt={`Después - ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="object-cover"
          />
        </div>

        {/* Línea divisoria dorada */}
        <div className={`absolute top-0 bottom-0 w-[2px] bg-[#D4AF37] z-20 shadow-[0_0_10px_#D4AF37] transition-all duration-500 ease-out ${
          isTapped ? 'left-full' : 'left-0'
        } md:group-hover:left-full`} />

        {/* Etiqueta Después */}
        <div
          className={`absolute top-4 right-4 z-30 bg-[#D4AF37]/90 backdrop-blur-sm text-[#121212] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-opacity duration-300 delay-100 ${
            isTapped ? 'opacity-100' : 'opacity-0'
          } md:group-hover:opacity-100`}
        >
          Después
        </div>
      </m.div>

      {/* Contenido (Textos) */}
      <h3 className="text-[#D4AF37] text-xl font-medium mb-2 group-hover:text-[#2A2824] dark:group-hover:text-[var(--theme-text-primary)] transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-[#5C5A56] dark:text-[var(--theme-text-secondary)] transition-colors duration-700 text-sm leading-relaxed">
        {project.description}
      </p>
    </m.div>
  );
}

/*
 * Componente principal BeforeAfterSection
 * Mapea los proyectos en memoria limitados y los encapsula en componentes Card.
 * Añade animaciones de "stagger" simulado multiplicando los delays por su índice temporal.
 */
export default React.memo(function BeforeAfterSection() {
  return (
    <LazyMotion features={domAnimation}>
      {/* OPTIMIZACIÓN DESKTOP (lg+): Padding vertical reducido progresivamente en lg/xl/2xl
          para evitar secciones demasiado altas en resoluciones Desktop al 100% zoom. */}
      <section className="relative w-full py-24 lg:py-20 xl:py-24 2xl:py-28 bg-[#F0EBE1] dark:bg-[var(--theme-bg-primary)] transition-colors duration-700 overflow-hidden">
        {/* Fondo Premium - Textura */}
        <div className="bg-noise" />
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Cabecera */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <m.span
              className="text-[#D4AF37] tracking-[0.2em] text-sm font-semibold uppercase mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Transformaciones Reales
            </m.span>
            {/* OPTIMIZACIÓN DESKTOP (lg+): Tipografía fluida con clamp().
                md:text-5xl sin override lg resultaba en un tamaño excesivo en Desktop.
                clamp() proporciona escalado continuo entre 1024px y 1920px. */}
            <m.h2
              className="text-3xl md:text-5xl lg:text-[clamp(1.5rem,2.5vw,2rem)] xl:text-[clamp(1.75rem,2.8vw,2.25rem)] 2xl:text-4xl font-light text-[#2A2824] dark:text-[var(--theme-text-primary)] transition-colors duration-700 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Antes y <span className="text-[#D4AF37] font-medium">Después</span>
            </m.h2>
            <m.p
              className="text-[#5C5A56] dark:text-[var(--theme-text-secondary)] transition-colors duration-700 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Descubre cómo convertimos espacios comunes en entornos de lujo
            </m.p>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:items-stretch">
            {projects.map((project, index) => (
              <m.div
                key={index}
                className="h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px", amount: 0.2 }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.5), ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Card project={project} />
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
});
