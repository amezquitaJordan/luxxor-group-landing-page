'use client';

import React, { useState } from 'react';
import { LazyMotion, domAnimation, m, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

function Card({ project }: { project: Project }) {
  const hoverValue = useMotionValue(0);
  const animatedHover = useSpring(hoverValue, { stiffness: 180, damping: 22 });
  const [isTapped, setIsTapped] = useState(false);

  // Desktop transform animations
  // When hoverValue is 0, right 100% is inset (so width is 0).
  // When hoverValue is 100, right 0% is inset (width is 100%).
  const clipPath = useTransform(animatedHover, [0, 100], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const lineLeft = useTransform(animatedHover, [0, 100], ["0%", "100%"]);

  const handleMouseEnter = () => {
    hoverValue.set(100);
  };

  const handleMouseLeave = () => {
    hoverValue.set(0);
  };

  const handleTap = () => {
    setIsTapped(!isTapped);
  };

  return (
    <m.div
      className="flex flex-col group cursor-pointer hover-lift-gold will-change-transform transition-all"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      <m.div
        className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
      >
        {/* Etiqueta Antes (Desktop) */}
        <m.div
          className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-sm text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D4AF37]/30 hidden md:block"
          style={{ opacity: useTransform(animatedHover, [0, 50], [1, 0]) }}
        >
          Antes
        </m.div>

        {/* Etiqueta Antes (Mobile) */}
        <m.div
          className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-sm text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D4AF37]/30 md:hidden"
          initial={false}
          animate={{ opacity: isTapped ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          Antes
        </m.div>

        {/* Imagen Antes (Base) */}
        <Image
          src={project.before}
          alt={`Antes - ${project.title}`}
          fill
          loading="lazy"
          className="object-cover"
        />

        {/* Imagen Después (Reveal on Hover - Desktop) */}
        <m.div
          className="hidden md:block absolute inset-0 z-10"
          style={{ clipPath }}
        >
          <Image
            src={project.after}
            alt={`Después - ${project.title}`}
            fill
            loading="lazy"
            className="object-cover"
          />
        </m.div>

        {/* Imagen Después (Fade on Tap - Mobile) */}
        <m.div
          className="md:hidden absolute inset-0 z-10 pointer-events-none"
          initial={false}
          animate={{ opacity: isTapped ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={project.after}
            alt={`Después - ${project.title}`}
            fill
            loading="lazy"
            className="object-cover"
          />
        </m.div>

        {/* Línea divisoria dorada (Desktop) */}
        <m.div
          className="hidden md:block absolute top-0 bottom-0 w-[2px] bg-[#D4AF37] z-20 shadow-[0_0_10px_#D4AF37]"
          style={{ left: lineLeft }}
        />

        {/* Etiqueta Después (Shows with reveal/fade) */}
        <m.div
          className="absolute top-4 right-4 z-30 bg-[#D4AF37]/90 backdrop-blur-sm text-[#121212] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider hidden md:block"
          style={{ opacity: useTransform(animatedHover, [50, 100], [0, 1]) }}
        >
          Después
        </m.div>

        <m.div
          className="absolute top-4 right-4 z-30 bg-[#D4AF37]/90 backdrop-blur-sm text-[#121212] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider md:hidden"
          initial={false}
          animate={{ opacity: isTapped ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          Después
        </m.div>
      </m.div>

      {/* Contenido (Textos) */}
      <h3 className="text-[#D4AF37] text-xl font-medium mb-2 group-hover:text-white transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {project.description}
      </p>
    </m.div>
  );
}

export default React.memo(function BeforeAfterSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full py-24 bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
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
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Transformaciones Reales
            </m.span>
            <m.h2
              className="text-3xl md:text-5xl font-light text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Antes y <span className="text-[#D4AF37] font-medium">Después</span>
            </m.h2>
            <m.p
              className="text-gray-400 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Descubre cómo convertimos espacios comunes en entornos de lujo
            </m.p>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {projects.map((project, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px", amount: 0.2 }}
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
