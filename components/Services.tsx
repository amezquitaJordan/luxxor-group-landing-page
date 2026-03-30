"use client";

import React, { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Building2, Briefcase, ShieldCheck } from "lucide-react";
import ServiceModal from "./ServiceModal";
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
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

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
      <section id="servicios" className="py-24 bg-[var(--color-luxxor-dark)] overflow-hidden">
        {/* Preload images for modal to prevent flash */}
        <div className="hidden">
          {services.map((service) => (
            <div key={service.id} className="relative w-0 h-0 overflow-hidden">
              <Image src={service.image} alt="preload" fill sizes="(max-width: 768px) 100vw, 650px" priority />
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-6 lg:px-12">
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
              className="text-4xl md:text-5xl font-serif text-white mb-6"
            >
              Nivel <span className="text-[var(--color-luxxor-gold)]">Premium</span>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-gray-400 font-light text-lg"
            >
              Soluciones integrales diseñadas para clientes exigentes. Simplificamos la complejidad del crecimiento patrimonial.
            </m.p>
          </div>

          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:max-lg:gap-10"
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

                {/* ── TARJETA MOBILE (≤767px): layout vertical ─────────── */}
                <div className="block md:hidden relative z-10 w-full border border-[#D4AF37]/40 bg-[#151515] overflow-hidden rounded-[1px] flex-col">
                  {/* Imagen horizontal grande arriba */}
                  <div className="relative w-full h-52">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 767px) 100vw, 0px"
                    />
                    {/* Gradiente sutil inferior para fundir con el fondo */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#151515] to-transparent pointer-events-none" />
                  </div>

                  {/* Contenido: ícono + título + descripción */}
                  <div className="p-7 flex flex-col">
                    <div className="w-14 h-14 bg-[#1a1a1a] border border-gray-700 flex items-center justify-center mb-5 text-[var(--color-luxxor-gold)] shrink-0">
                      <service.icon strokeWidth={1.5} size={28} />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* ── TARJETA TABLET + DESKTOP (≥768px): layout original ─ */}
                <div
                  onClick={(e) => {
                    if (typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024) {
                      e.stopPropagation();
                      return; // No modal on tablet
                    }
                    setSelectedService(service);
                  }}
                  className="hidden md:relative md:z-10 md:w-full md:flex md:p-8 md:max-lg:p-0 border border-gray-800 bg-[#151515] overflow-hidden group rounded-none flex-col md:max-lg:flex-row h-full md:max-lg:min-h-[300px] md:max-lg:h-auto hover-lift-gold will-change-transform cursor-pointer md:max-lg:cursor-default md:max-lg:border-[1.5px] md:max-lg:border-[#D4AF37]/40 md:max-lg:hover:translate-y-0 md:max-lg:hover:scale-100 md:max-lg:hover:shadow-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-luxxor-gold)]/5 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Animated Glow Border */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-luxxor-gold)] to-transparent opacity-0 lg:group-hover:opacity-100 lg:group-hover:animate-pulse-gold transform scale-x-0 lg:group-hover:scale-x-100 transition-all duration-500 origin-center" />
                
                {/* Image solely for Tablet */}
                <div className="hidden md:max-lg:block relative w-[35%] h-auto shrink-0">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#151515] pointer-events-none" />
                </div>

                <div className="relative z-10 flex flex-col md:max-lg:p-10 md:max-lg:w-[65%] md:max-lg:justify-center">
                  <div className="w-16 h-16 bg-[#1a1a1a] border border-gray-700 flex items-center justify-center mb-8 md:max-lg:mb-6 text-[var(--color-luxxor-gold)] group-hover:bg-[var(--color-luxxor-gold)] group-hover:text-black transition-colors duration-500 shrink-0">
                    <service.icon strokeWidth={1.5} size={32} />
                  </div>
                  
                  <h3 className="text-xl font-serif text-white mb-4 group-hover:text-[var(--color-luxxor-gold)] transition-colors duration-300 md:max-lg:text-2xl md:max-lg:mb-5">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 font-light leading-relaxed flex-grow md:max-lg:flex-grow-0 md:max-lg:mb-8 md:max-lg:text-base">
                    {service.description}
                  </p>
                  
                  {/* Botón oculto en Tablet */}
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024) return;
                      setSelectedService(service); 
                    }}
                    className="md:max-lg:hidden mt-8 md:max-lg:mt-0 w-max px-6 py-2 border border-[var(--color-luxxor-gold)] text-[var(--color-luxxor-gold)] text-xs font-semibold tracking-widest uppercase hover:bg-[var(--color-luxxor-gold)] hover:text-black transition-all duration-300 relative overflow-hidden group/btn flex items-center gap-2 opacity-0 lg:group-hover:opacity-100 transform translate-y-4 lg:group-hover:translate-y-0 shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                  >
                    <span className="relative z-10">Descubrir</span>
                    <span className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </button>
                </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>

        <ServiceModal 
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService as any}
        />
      </section>
    </LazyMotion>
  );
});
