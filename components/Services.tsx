/*
 * Archivo: components/Services.tsx
 * Componente: Services
 * Propósito: Destacar los tres servicios principales nivel Premium de la marca. 
 * Controla la presentación responsiva, mostrando vistas distintas según dispositivo.
 */
"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Building2, Briefcase, ShieldCheck } from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "remodeling",
    title: "Remodelaciones Residenciales Premium",
    description: "Transformación total o parcial de espacios residenciales con arquitectura moderna y acabados de lujo. Incluye redistribución de ambientes, iluminación premium, materiales de alta gama y supervisión técnica completa desde el diseño 3D hasta la entrega final.",
    icon: Building2,
    image: "/images/Remodelacion-recidencial-premium.png"
  },
  {
    id: "carpentry",
    title: "Carpintería Arquitectónica a Medida",
    description: "Diseño y fabricación de mobiliario fijo y elementos arquitectónicos (cocinas, closets, paneles, puertas, bibliotecas) con maderas seleccionadas y herrajes premium. Cada pieza es única y adaptada al espacio y estilo de vida del cliente.",
    icon: Briefcase,
    image: "/images/Carpinteria-arquitectonica.png"
  },
  {
    id: "restoration",
    title: "Restauración de Mobiliario",
    description: "Restauramos piezas de mobiliario de alta gama preservando su valor histórico y estético. Utilizamos técnicas tradicionales combinadas con acabados modernos para devolverle vida y elegancia a muebles clásicos o contemporáneos.",
    icon: ShieldCheck,
    image: "/images/Restauracion-mobiliaria.png"
  }
];

export default React.memo(function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section id="servicios" className="py-24 lg:py-20 xl:py-24 2xl:py-28 bg-[#EAE5D9] dark:bg-[var(--theme-bg-primary)] transition-colors duration-700 overflow-hidden">
        
        <div className="max-w-[1200px] xl:max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
              <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
                Nuestros Servicios
              </span>
              <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
            </m.div>
            
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-[clamp(1.75rem,2.8vw,2.25rem)] xl:text-[clamp(2rem,3vw,2.5rem)] 2xl:text-4xl font-serif text-[#2A2824] dark:text-[var(--theme-text-primary)] transition-colors duration-700 mb-6"
            >
              Nivel <span className="text-[var(--color-luxxor-gold)]">Premium</span>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[#5C5A56] dark:text-[var(--theme-text-secondary)] transition-colors duration-700 font-light text-lg"
            >
              Soluciones integrales diseñadas para clientes exigentes. Simplificamos la complejidad del crecimiento patrimonial.
            </m.p>
          </div>

          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 xl:gap-10 md:max-lg:gap-10"
          >
            {services.map((service) => (
              <m.div
                key={service.id}
                variants={itemVariants}
                className="relative flex w-full h-full group/wrapper"
              >
                {/* ── AURA MOBILE (≤767px) ──────────────────────────────── */}
                <m.div
                  initial={false}
                  animate={{
                    boxShadow: [
                      '0 0 22px -6px rgba(212,175,55,0.22), 0 0 40px -16px rgba(212,175,55,0.12)',
                      '0 0 32px -3px rgba(212,175,55,0.34), 0 0 55px -10px rgba(212,175,55,0.22)',
                      '0 0 22px -6px rgba(212,175,55,0.22), 0 0 40px -16px rgba(212,175,55,0.12)'
                    ]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none block md:hidden z-0 rounded-[1px]"
                />

                {/* ── AURA TABLET (768–1023px) ───────────────────────────── */}
                <m.div
                  initial={false}
                  animate={{ 
                    boxShadow: [
                      '0 0 25px -5px rgba(212,175,55,0.25), 0 0 45px -15px rgba(212,175,55,0.15)',
                      '0 0 35px -2px rgba(212,175,55,0.35), 0 0 60px -10px rgba(212,175,55,0.25)',
                      '0 0 25px -5px rgba(212,175,55,0.25), 0 0 45px -15px rgba(212,175,55,0.15)'
                    ]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none hidden md:block lg:hidden z-0"
                />

                {/* ── AURA DESKTOP (≥1024px) ─────────────────────────────── */}
                <m.div
                  className="absolute inset-0 pointer-events-none hidden lg:block z-0 opacity-40 group-hover/wrapper:opacity-100 transition-opacity duration-500"
                  initial={false}
                  animate={{ 
                    boxShadow: [
                      '0 0 15px -5px rgba(212,175,55,0.15), 0 0 25px -10px rgba(212,175,55,0.05)',
                      '0 0 20px -3px rgba(212,175,55,0.20), 0 0 35px -8px rgba(212,175,55,0.10)',
                      '0 0 15px -5px rgba(212,175,55,0.15), 0 0 25px -10px rgba(212,175,55,0.05)'
                    ]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* ── TARJETA MOBILE (≤767px): layout vertical ─────────── */}
                <div className="block md:hidden relative z-10 w-full overflow-hidden flex-col luxxor-card-premium bg-[#FFFFFF] dark:bg-[var(--theme-bg-card)] border border-[#D4AF37]/30 dark:border-[var(--theme-card-border)] hover:bg-white dark:hover:bg-[var(--theme-bg-card)] hover:shadow-xl">
                  {/* Imagen horizontal grande arriba */}
                  <div className="relative w-full h-52">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 767px) 100vw, 0px"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#FFFFFF]/60 dark:from-[var(--theme-bg-surface)]/60 to-transparent pointer-events-none" />
                  </div>

                  {/* Contenido: ícono + título + descripción */}
                  <div className="p-7 flex flex-col">
                    <div className="w-14 h-14 bg-[#EAE5D9] dark:bg-[var(--theme-bg-primary)] border border-[#D4AF37]/30 dark:border-[var(--theme-border)] flex items-center justify-center mb-5 text-[var(--color-luxxor-gold)] shrink-0">
                      <service.icon strokeWidth={1.5} size={28} />
                    </div>
                    <h3 className="text-xl font-serif text-[#2A2824] dark:text-[var(--theme-text-primary)] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[#5C5A56] dark:text-[var(--theme-text-secondary)] font-light leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* ── TARJETA TABLET (768–1023px): layout horizontal ─────── */}
                <div className="hidden md:flex lg:hidden relative z-10 w-full p-0 overflow-hidden flex-row min-h-[300px] h-auto rounded-none luxxor-card-premium bg-[#FFFFFF] dark:bg-[var(--theme-bg-card)] border border-[#D4AF37]/30 dark:border-[var(--theme-card-border)] hover:bg-white dark:hover:bg-[var(--theme-bg-card)] hover:shadow-xl">
                  <div className="relative w-[35%] h-auto shrink-0">
                    <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover" />
                    {/* Gradiente lateral: solo visible en dark mode para blend con fondo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent dark:to-[var(--theme-bg-surface)] pointer-events-none" />
                  </div>

                  <div className="relative z-10 flex flex-col p-10 w-[65%] justify-center">
                    <div className="w-16 h-16 bg-[#EAE5D9] dark:bg-[var(--theme-bg-primary)] border border-[#D4AF37]/30 dark:border-[var(--theme-border)] flex items-center justify-center mb-6 text-[var(--color-luxxor-gold)] shrink-0">
                      <service.icon strokeWidth={1.5} size={32} />
                    </div>
                    
                    <h3 className="text-2xl font-serif text-[#2A2824] dark:text-[var(--theme-text-primary)] mb-5">
                      {service.title}
                    </h3>
                    
                    <p className="text-[#5C5A56] dark:text-[var(--theme-text-secondary)] font-light leading-relaxed mb-8 flex-grow-0 text-base">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* ── TARJETA DESKTOP (≥1024px): layout vertical premium ─── */}
                <div className="hidden lg:flex relative z-10 w-full overflow-hidden flex-col h-full group luxxor-card-premium rounded-none bg-[#FFFFFF] dark:bg-[var(--theme-bg-card)] border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] dark:border-white/5 dark:hover:border-[#D4AF37] transition-colors duration-500 overflow-hidden">

                  {/* Imagen superior grande */}
                  <div className="relative w-full h-64 xl:h-72 overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      sizes="(max-width: 1536px) 33vw, 25vw" 
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.25,0.1,0.25,1]" 
                    />
                    {/* Gradiente sutil inferior */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#FFFFFF]/80 dark:from-[var(--theme-bg-surface)]/80 to-transparent pointer-events-none" />
                    
                    {/* Icono pequeño dorado flotante */}
                    <div className="absolute top-5 right-5 w-12 h-12 bg-[#EAE5D9]/80 dark:bg-[var(--theme-bg-primary)]/80 backdrop-blur-md border border-[#D4AF37]/50 flex items-center justify-center text-[var(--color-luxxor-gold)] group-hover:bg-[var(--color-luxxor-gold)] group-hover:text-black transition-colors duration-500 shadow-lg z-10">
                      <service.icon strokeWidth={1.5} size={22} />
                    </div>
                  </div>

                  {/* Contenido principal — sin borde top para evitar línea divisoria en hover */}
                  <div className="p-8 xl:p-10 flex flex-col flex-grow relative z-10 bg-transparent -mt-10 border-t-0 transition-colors duration-700">
                    <h3 className="text-xl xl:text-2xl font-serif text-[#2A2824] dark:text-[var(--theme-text-primary)] mb-4 group-hover:text-[var(--color-luxxor-gold)] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[#5C5A56] dark:text-[var(--theme-text-secondary)] font-light leading-relaxed text-sm xl:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
});

