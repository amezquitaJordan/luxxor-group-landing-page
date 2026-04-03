/*
 * Archivo: components/SobreNosotros.tsx
 * Componente: SobreNosotros
 * Propósito: Muestra la sección informativa "Sobre Nosotros", presentando 
 * una imagen destacada junto con un badge de experiencia, y texto descriptivo.
 */
"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";

/*
 * Componente principal SobreNosotros
 * Renderiza la sección en un grid responsivo (1 columna en móvil, 2 en lg+).
 * Utiliza viewport={once: true} para animar solo la primera vez que se hace scroll.
 */
export default React.memo(function SobreNosotros() {
  return (
    <LazyMotion features={domAnimation}>
      {/*
       * OPTIMIZACIÓN DESKTOP (lg+): Control de espaciado vertical por breakpoint.
       * py-24 en mobile/tablet → se reduce en lg para evitar secciones excesivamente
       * altas en pantallas 1366×768 y 1440×900 al 100% zoom. Se escala progresivamente
       * hasta 2xl para pantallas grandes donde el espacio adicional se justifica.
       */}
      <section id="sobre-nosotros" className="relative w-full py-24 lg:py-20 xl:py-24 2xl:py-28 bg-[#F5EDE2] dark:bg-[var(--theme-bg-primary)] transition-colors duration-700 overflow-hidden">
        {/* Fondo Premium - Textura */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay -z-10" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image Side */}
            {/*
             * OPTIMIZACIÓN DESKTOP (lg+): min-h reducido progresivamente.
             * 500px fijo consumía demasiada altura vertical en pantallas 1366×768.
             * Escalado: lg=420px → xl=460px → 2xl=500px (proporcional al viewport).
             */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px 0px -40px 0px", amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "opacity, transform" }}
              className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-[420px] xl:min-h-[460px] 2xl:min-h-[500px] h-full transform-gpu"
            >
              <div className="absolute inset-0 border-2 border-[var(--color-luxxor-gold)] translate-x-4 -translate-y-4 z-0 hidden md:block" />
              {/* OPTIMIZACIÓN DESKTOP (lg+): Altura de imagen reducida en lg/xl para no desbordar viewports de 768px de alto. */}
              <div className="relative z-10 w-full h-[500px] lg:h-[420px] xl:h-[460px] 2xl:h-[500px]">
                <Image
                  src="/images/sala-elegante-blanca-con-chimenea.jpg"
                  alt="Sala elegante con chimenea - Diseño de interiores premium Luxxor Group"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center shadow-2xl"
                />
              </div>
              
              {/* Experience Badge */}
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-80px 0px -40px 0px", amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ willChange: "opacity, transform" }}
                className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-[var(--color-luxxor-gold)] text-black p-6 md:p-8 z-20 shadow-xl transform-gpu will-change-transform"
              >
                <p className="text-4xl md:text-5xl font-serif font-bold mb-1">10+</p>
                <p className="text-sm md:text-base font-sans uppercase tracking-widest font-semibold">Años de<br/>Experiencia</p>
              </m.div>
            </m.div>

            {/* Text Side */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px 0px -40px 0px", amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "opacity, transform" }}
              className="w-full lg:w-1/2 flex flex-col justify-center transform-gpu"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
                <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
                  Sobre Nosotros
                </span>
              </div>
              
              {/*
               * OPTIMIZACIÓN DESKTOP (lg+): Tipografía fluida con clamp().
               * lg:text-5xl (48px) era excesivo en 1366×768. clamp() escala
               * el tamaño entre un mínimo y máximo según el ancho del viewport,
               * logrando proporción natural en todas las resoluciones Desktop.
               */}
              <h2 className="text-3xl md:text-4xl lg:text-[clamp(1.75rem,2.6vw,2.25rem)] xl:text-[clamp(2rem,2.8vw,2.5rem)] 2xl:text-4xl font-serif text-[#2A2824] dark:text-[var(--theme-text-primary)] mb-8 leading-tight">
                Excelencia que Transciende el Tiempo
              </h2>
              
              <div className="space-y-6 text-[#5C5A56] dark:text-[var(--theme-text-secondary)] font-light text-lg">
                <p>
                  En <strong>Luxxor Group</strong> somos un equipo apasionado por transformar espacios en entornos de lujo y funcionalidad. Con sede en el Barrio La Flora de Cali, combinamos creatividad, precisión técnica y materiales de la más alta calidad para crear hogares que reflejan la personalidad y estilo de vida de nuestros clientes.
                </p>
                <p>
                  Cada proyecto es una oportunidad para elevar lo cotidiano a lo extraordinario, con un enfoque integral desde el diseño conceptual hasta la ejecución impecable.
                </p>
              </div>
              
              <div className="mt-10">
                <a
                  href="#contacto"
                  className="group inline-flex items-center gap-3 text-[var(--color-luxxor-gold)] font-semibold tracking-widest uppercase text-sm"
                >
                  Conoce más sobre nuestra visión
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
});
