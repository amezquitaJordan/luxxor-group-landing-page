"use client";

import React, { useState } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useTransform, useAnimationFrame, useReducedMotion } from "framer-motion";

const testimonials = [
  {
    name: "Dr. Roberto Mendoza",
    role: "Cliente Residencial",
    text: "Luxxor Group transformó nuestra casa por completo. Su nivel de profesionalismo, la calidad de la carpintería arquitectónica y los acabados superaron todas nuestras expectativas. Son el verdadero estándar de la remodelación en Cali.",
  },
  {
    name: "Carolina Sterling",
    role: "Diseño de Interiores",
    text: "Necesitaba un equipo que entendiera mi visión y la llevara a la realidad con materiales premium. Luxxor no solo ejecutó la obra impecablemente, sino que el diseño 3D nos dio la tranquilidad de ver todo antes de empezar.",
  },
  {
    name: "Familia Restrepo",
    role: "Restauración de Mobiliario",
    text: "La restauración de nuestro comedor clásico fue un trabajo de artistas. Recuperaron la esencia y el valor de nuestra pieza familiar con un estándar que difícilmente se encuentra en la ciudad.",
  },
];

export default React.memo(function TestimonialsCarousel() {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${v}%`);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // similar speed adjustment for items. -33.333% is the wrap point with 3 duplicated sets of items
  useAnimationFrame((t, delta) => {
    if (reducedMotion || isHovered) return;
    let moveBy = (delta / 1000) * 1.5; 
    let newX = baseX.get() - moveBy;
    if (newX <= -33.333) {
      newX += 33.333; // reset loop
    }
    baseX.set(newX);
  });

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full py-24 bg-[#121212] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
        {/* Fondo Premium - Textura */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay -z-10" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />
        {/* Bordes dorados sutiles */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-10" />

        <div className="container mx-auto px-6 mb-16 text-center relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px", amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-[1px] bg-[var(--color-luxxor-gold)]" />
            <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
              Testimonios
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-luxxor-gold)]" />
          </m.div>
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px", amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl font-serif text-white mb-6"
          >
            ¿Qué dicen <span className="text-[var(--color-luxxor-gold)]">nuestros clientes?</span>
          </m.h2>
        </div>

        <div className="relative flex overflow-x-clip overflow-y-visible pt-8 pb-4 group">
          <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
          
          {/* Infinite JS Carousel */}
          <m.div 
            style={{ x }}
            onMouseEnter={() => {
              if (typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024) return;
              setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => {
              // Never pause on mobile (< 768px)
              if (typeof window !== 'undefined' && window.innerWidth < 768) return;
              setIsHovered(true);
            }}
            onTouchEnd={() => setIsHovered(false)}
            className="flex whitespace-nowrap w-max gap-6 px-6 will-change-transform"
          >
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="w-[300px] md:w-[450px] p-8 md:p-10 border border-gray-800 bg-[#151515] flex-shrink-0 cursor-default hover:border-[var(--color-luxxor-gold)] hover:shadow-[0_10px_30px_-15px_rgba(212,175,55,0.2)] transition-all duration-300 transform hover:-translate-y-3 hover:z-10 whitespace-normal flex flex-col justify-between relative"
              >
                <div>
                  <div className="text-[var(--color-luxxor-gold)] text-4xl font-serif mb-6 leading-none">"</div>
                  <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed mb-8 italic">
                    {testimonial.text}
                  </p>
                </div>
                <div>
                  <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)] mb-4" />
                  <h4 className="text-white font-serif text-lg">{testimonial.name}</h4>
                  <p className="text-[var(--color-luxxor-gold)] text-xs uppercase tracking-widest mt-1">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
});
