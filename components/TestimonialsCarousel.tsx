"use client";

import { motion } from "framer-motion";

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

export default function TestimonialsCarousel() {
  return (
    <section className="py-24 bg-[#111111] overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <div className="w-8 h-[1px] bg-[var(--color-luxxor-gold)]" />
          <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
            Testimonios
          </span>
          <div className="w-8 h-[1px] bg-[var(--color-luxxor-gold)]" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif text-white mb-6"
        >
          ¿Qué dicen <span className="text-[var(--color-luxxor-gold)]">nuestros clientes?</span>
        </motion.h2>
      </div>

      <div className="relative flex overflow-x-clip overflow-y-visible pt-8 pb-4 group">
        <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />
        
        {/* Infinite Carousel */}
        <div className="flex animate-carousel whitespace-nowrap hover:[animation-play-state:paused] w-max gap-6 px-6">
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
        </div>
      </div>
    </section>
  );
}
