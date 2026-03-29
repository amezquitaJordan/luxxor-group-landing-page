"use client";

import React from "react";
import { LazyMotion, domAnimation, m, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default React.memo(function ArchitecturalDesignSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full py-24 bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden border-t border-[var(--color-luxxor-gold)]/10">
        {/* Fondo Premium - Textura */}
        <div className="bg-noise" />
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px", amount: 0.2 }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            {/* Left Column: Video */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              className="w-full lg:w-1/2 relative min-h-[500px] h-full group"
            >
              {/* Mobile-only golden aura animation */}
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
                className="absolute inset-0 pointer-events-none block z-0 rounded-sm"
              />
              <div className="relative z-10 w-full h-[500px] rounded-sm overflow-hidden border-[1.5px] border-[#D4AF37]/40">
                {/* The absolute overlay removes darkness on hover. */}
                <div className="absolute inset-0 bg-black/20 z-20 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                <video
                  src="/videos/Diseño-Arquitectónico-Integral-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  className="w-full h-full object-cover relative z-10"
                />
              </div>
            </m.div>

            {/* Right Column: Text */}
            <m.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full lg:w-1/2 flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
                <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
                  Del concepto a la realidad
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-8 leading-tight">
                Diseño Arquitectónico Integral
              </h2>

              <div className="space-y-6 text-gray-300 font-light text-lg">
                <p>
                  En Luxxor Group convertimos ideas en proyectos ejecutables con precisión técnica y estética premium. Nuestro equipo de arquitectos y diseñadores entrega un paquete completo que incluye:
                </p>
                <ul className="space-y-4 text-left w-full pl-0">
                  <li className="flex items-start gap-4">
                    <div className="w-[6px] h-[6px] rounded-full bg-[var(--color-luxxor-gold)] flex-shrink-0 mt-2" />
                    <span>Planos arquitectónicos completos (plantas, fachadas, cortes y detalles constructivos)</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-[6px] h-[6px] rounded-full bg-[var(--color-luxxor-gold)] flex-shrink-0 mt-2" />
                    <span>Modelado 3D profesional y renders fotorealistas de alta resolución</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-[6px] h-[6px] rounded-full bg-[var(--color-luxxor-gold)] flex-shrink-0 mt-2" />
                    <span>Visualizaciones 360° interactivas para que recorras tu espacio antes de construir</span>
                  </li>
                </ul>
                <p>
                  Este servicio es ideal tanto para remodelaciones residenciales como para nuevos proyectos, garantizando que cada detalle refleje el lujo y funcionalidad que mereces.
                </p>
              </div>

              <div className="mt-10 flex flex-col items-start gap-6">
                {/* CTA final */}
                <Link href="#contacto" className="inline-block group">
                  <button
                    className="px-10 py-5 bg-[var(--color-luxxor-gold)] text-[var(--color-luxxor-dark)] font-semibold text-lg flex items-center justify-center gap-3 transition-all hover:bg-white hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95"
                  >
                    Solicita tu paquete de diseño arquitectónico
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
