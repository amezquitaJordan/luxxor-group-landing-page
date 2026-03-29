'use client';

import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    title: 'Farmacias',
    image: '/images/farmacia-lujosa-2.png',
    description: 'Diseños que transmiten confianza y profesionalismo médico, optimizando el flujo de clientes y destacando productos con iluminación estratégica.'
  },
  {
    title: 'Boutiques y Tiendas Especializadas',
    image: '/images/boutique-lujosa-2.jpg',
    description: 'Espacios que convierten la visita en una experiencia de compra premium, aumentando el tiempo de permanencia y las ventas.'
  },
  {
    title: 'Oficinas y Consultorios',
    image: '/images/oficina-lujosa.jpg',
    description: 'Ambientes que proyectan seriedad y bienestar, mejorando la productividad y la imagen corporativa.'
  },
  {
    title: 'Restaurantes y Espacios Gastronómicos',
    image: '/images/restaurante-lujosa.jpg',
    description: 'Diseños que crean atmósfera y experiencia, haciendo que los clientes quieran regresar una y otra vez.'
  }
];


export default React.memo(function CommercialRemodelingSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-24 md:py-32 w-full bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden flex flex-col items-center">
        {/* Fondo Premium - Textura */}
        <div className="bg-noise" />
        
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        {/* Subtle Background Glows - Optimizados */}
        <div className="bg-glow-gold-top" />
        <div className="bg-glow-gold-bottom" />
        <div className="absolute right-0 top-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="absolute left-0 top-1/4 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />

        <div className="max-w-[1400px] w-full px-6 md:px-12 lg:px-24 mx-auto relative z-10 flex flex-col items-center">

          {/* Section Header */}
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
                Especialidad Comercial
              </span>
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#D4AF37] mb-6 tracking-wide [text-shadow:0_0_20px_rgba(212,175,55,0.15)] leading-tight">
              Remodelación de Espacios Comerciales
            </h2>

            <p className="text-xl md:text-2xl text-white font-medium mb-6 tracking-wide drop-shadow-md">
              Tu negocio merece un espacio que venda antes de que el cliente entre
            </p>

            <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
              En Luxxor Group transformamos locales comerciales en entornos que generan confianza, aumentan ventas y proyectan exclusividad. Especializados en farmacias, boutiques, oficinas, restaurantes y clínicas, creamos diseños que combinan funcionalidad operativa con estética de alto nivel.
            </p>
          </m.div>

          {/* 2×2 Premium Hover Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mb-20">
            {services.map((service, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px', amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full h-[400px] md:h-[480px] rounded-2xl cursor-pointer group will-change-transform border-[1.5px] border-[#D4AF37]/40 lg:hover:-translate-y-2 lg:hover:scale-[1.01] transition-transform duration-500 ease-[0.25,0.1,0.25,1]"
              >
                {/* Aura Animation — Mobile only (≤767px) */}
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
                  className="absolute inset-0 pointer-events-none block md:hidden z-0 rounded-2xl"
                />

                {/* Aura Animation — Tablet only (768–1023px) */}
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
                  className="absolute inset-0 pointer-events-none hidden md:block z-0 rounded-2xl"
                />

                {/* Image with hover scale + parallax */}
                <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#121212]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Base dark gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />
                  {/* Hover overlay with fade */}
                  <div className="absolute inset-0 bg-black/20 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                </div>

                {/* Golden Glow Border on Hover */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none transition-shadow duration-500 shadow-[inset_0_0_0_1px_rgba(212,175,55,0.1)] group-hover:shadow-[inset_0_0_0_2px_rgba(212,175,55,0.5),0_0_40px_rgba(212,175,55,0.12)]" />

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-2xl md:text-3xl font-light tracking-wide text-[#D4AF37] mb-3 drop-shadow-md">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-[95%] font-light transition-opacity duration-400 group-hover:text-white/95 drop-shadow-md">
                      {service.description}
                    </p>
                  </div>

                  {/* Animated accent line */}
                  <div className="h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent mt-6 origin-left scale-x-[0.3] opacity-50 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-500 ease-out" />
                </div>
              </m.div>
            ))}
          </div>

          {/* CTA Button — Large Centered */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px', amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center"
          >
            <a
              href="https://wa.me/573138865481"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#D4AF37] text-[#121212] font-semibold tracking-wider uppercase text-base md:text-lg overflow-hidden rounded-sm hover-lift-gold transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full skew-x-12 group-hover:animate-[shine_1.5s_ease-out_infinite]" />
              <span className="relative z-10 drop-shadow-sm">Transforma tu negocio comercial ahora</span>
            </a>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
});
