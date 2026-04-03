/*
 * Archivo: components/ArchitecturalDesignSection.tsx
 * Componente: ArchitecturalDesignSection
 * Propósito: Ofrece información detallada sobre el servicio integral de Diseño Arquitectónico.
 * Incluye un reproductor de video sin controles (auto-play) y texto explicativo en un Layout Sandwich.
 */
"use client";

import React from "react";
import { LazyMotion, domAnimation, m, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
 * Componente principal ArchitecturalDesignSection
 * Define de manera explícita las variantes de Framer Motion (containerVariants, itemVariants) 
 * para controlar el flujo de entrada progresiva (staggering) de la estructura.
 */
export default React.memo(function ArchitecturalDesignSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full py-24 lg:py-20 xl:py-24 2xl:py-28 bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden border-t border-[var(--color-luxxor-gold)]/10">
        {/* Fondo Premium - Textura */}
        <div className="bg-noise" />
        {/* Bordes dorados bg-gradient-to-r para transiciones sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        {/* 
         * Contenedor principal 
         * Usando max-w-7xl para limitar el ancho y asegurar una proporción de video gigante 
         * sin estirarse indefinidamente en ultra-wide monitors.
         */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0 }}
            /* 
             * NUEVO LAYOUT SANDWICH: Elementos apilados verticalmente y centrados.
             * Esta jerarquía visual convierte al video en el nexo entre el título y el beneficio.
             */
            className="flex flex-col items-center w-full"
          >
            {/* =========================================
                1. CABECERA (ARRIBA)
                ========================================= */}
            <m.div
              variants={itemVariants}
              className="flex flex-col items-center text-center w-full max-w-3xl mb-10 lg:mb-14"
            >
              <div className="flex items-center gap-4 mb-4 lg:mb-6">
                {/* Líneas doradas a los lados del subtítulo para simetría premium */}
                <div className="w-8 md:w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
                <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-xs md:text-sm font-semibold">
                  Del concepto a la realidad
                </span>
                <div className="w-8 md:w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
              </div>

              {/* Título adaptado progresivamente para una lectura monumental */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-[3.5rem] font-serif text-white leading-tight">
                Diseño Arquitectónico Integral
              </h2>
            </m.div>

            {/* =========================================
                2. VIDEO (CENTRO) PROTAGONISTA
                =========================================
                max-w-[820px]: Limita el video para que no ocupe toda la pantalla
                en ultra-wide / 4K, manteniéndolo elegante y humano.
                mx-auto lo centra siempre independientemente del viewport.
                Móvil: full-width por defecto (max-w se aplica progressivamente). */}
            <m.div
              variants={itemVariants}
              className="w-full max-w-[820px] mx-auto relative group mb-10 lg:mb-14 rounded-sm"
            >
              {/* 
               * Aura dorada elegante.
               * - Móvil y tablet: Animación pulsante suave continua.
               * - Desktop: Animación sutil + incremento dramático al hover.
               */}
              <m.div
                initial={false}
                animate={{
                  boxShadow: [
                    '0 0 20px -5px rgba(212,175,55,0.2), 0 0 20px -15px rgba(212,175,55,0.1)',
                    '0 0 35px -3px rgba(212,175,55,0.35), 0 0 40px -10px rgba(212,175,55,0.2)',
                    '0 0 20px -5px rgba(212,175,55,0.2), 0 0 20px -15px rgba(212,175,55,0.1)'
                  ]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none block z-0 rounded-sm opacity-100 lg:opacity-70 group-hover:opacity-100 transition-opacity duration-700"
              />

              {/* 
               * Contenedor del video con aspect-video (16:9).
               * Elimina los saltos o huecos en responsive. Obliga al video a llenar un canvas cinematográfico 
               * rodeado de marco de lujo.
               */}
              <div className="relative z-10 w-full aspect-video rounded-sm overflow-hidden border border-[#D4AF37]/40 bg-black shadow-2xl">
                {/* Overlay oscuro transparente para mejorar contraste inicial; desaparece al hover */}
                <div className="absolute inset-0 bg-black/20 z-20 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                <video
                  src="/videos/Diseño-Arquitectónico-Integral-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  className="w-full h-full object-cover relative z-10 transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </m.div>

            {/* =========================================
                3. TEXTO (DEBAJO DEL VIDEO)
                ========================================= */}
            <m.div
              variants={itemVariants}
              /* 
               * max-w-3xl (~768px): Longitud de línea óptima para legibilidad larga (60–80 caracteres).
               * Evita que el texto se estire horizontalmente al mismo ancho que el video,
               * lo que rompe la jerarquía visual del sandwich. 
               * El texto actúa como complemento refinado, no como bloque monolítico.
               */
              /* En móvil se fuerza text-left y se añade padding horizontal para que
               * el texto nunca quede cortado por los bordes del viewport. */
              className="w-full max-w-3xl flex flex-col items-center text-left lg:text-center px-1"
            >
              <div className="space-y-5 text-gray-400 font-light text-sm sm:text-base lg:text-[17px]">
                <p>
                  En Luxxor Group convertimos ideas en proyectos ejecutables con precisión técnica y estética premium. Nuestro equipo de arquitectos y diseñadores entrega un paquete completo que incluye:
                </p>

                {/* 
                 * Lista refinada visualmente: al ser un contenedor centrado,
                 * se alinea a la izquierda (text-left) pero la caja se centra (inline-block). 
                 */}
                {/* 
                 * w-full en la ul garantiza que cada li haga word-wrap dentro del viewport.
                 * w-max causaba que el texto desbordara la pantalla en móvil.
                 */}
                <div className="w-full py-2">
                  <ul className="space-y-4 text-left w-full pl-0">
                    <li className="flex items-start gap-4 group/bullet">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxxor-gold)] flex-shrink-0 mt-2.5 opacity-80 group-hover/bullet:opacity-100 group-hover/bullet:scale-125 transition-all duration-300 shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                      <span className="text-gray-300 group-hover/bullet:text-white transition-colors duration-300">
                        Planos arquitectónicos completos (plantas, fachadas, cortes y detalles constructivos)
                      </span>
                    </li>
                    <li className="flex items-start gap-4 group/bullet">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxxor-gold)] flex-shrink-0 mt-2.5 opacity-80 group-hover/bullet:opacity-100 group-hover/bullet:scale-125 transition-all duration-300 shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                      <span className="text-gray-300 group-hover/bullet:text-white transition-colors duration-300">
                        Modelado 3D profesional y renders fotorealistas de alta resolución
                      </span>
                    </li>
                    <li className="flex items-start gap-4 group/bullet">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxxor-gold)] flex-shrink-0 mt-2.5 opacity-80 group-hover/bullet:opacity-100 group-hover/bullet:scale-125 transition-all duration-300 shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                      <span className="text-gray-300 group-hover/bullet:text-white transition-colors duration-300">
                        Visualizaciones 360° interactivas para que recorras tu espacio antes de construir
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="pt-2">
                  Este servicio es ideal tanto para remodelaciones residenciales como para nuevos proyectos, garantizando que cada detalle refleje el lujo y funcionalidad que mereces.
                </p>
              </div>

              {/* =========================================
                  4. CTA FINAL
                  ========================================= */}
              <div className="mt-10 lg:mt-12 flex justify-center w-full">
                <Link href="#contacto" className="inline-block group/cta w-full sm:w-auto">
                  <button
                    className="w-full sm:w-auto px-8 lg:px-12 py-4 lg:py-5 bg-[var(--color-luxxor-gold)] text-[var(--color-luxxor-dark)] font-semibold text-[15px] lg:text-[17px] flex items-center justify-center gap-3 transition-all hover:bg-white hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] active:scale-95"
                  >
                    Solicita tu paquete de diseño arquitectónico
                    <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
});
