"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SobreNosotros() {
  return (
    <section id="sobre-nosotros" className="py-24 bg-[var(--color-luxxor-dark)] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-full lg:w-1/2 relative min-h-[500px] h-full"
          >
            <div className="absolute inset-0 border-2 border-[var(--color-luxxor-gold)] translate-x-4 -translate-y-4 z-0 hidden md:block" />
            <div className="relative z-10 w-full h-[500px]">
              <Image
                src="/images/sala-elegante-blanca-con-chimenea.jpg"
                alt="Sala elegante con chimenea - Diseño de interiores premium Luxxor Group"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center shadow-2xl"
              />
            </div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-[var(--color-luxxor-gold)] text-black p-6 md:p-8 z-20 shadow-xl"
            >
              <p className="text-4xl md:text-5xl font-serif font-bold mb-1">10+</p>
              <p className="text-sm md:text-base font-sans uppercase tracking-widest font-semibold">Años de<br/>Experiencia</p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
              <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
                Sobre Nosotros
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-8 leading-tight">
              Excelencia que Transciende el Tiempo
            </h2>
            
            <div className="space-y-6 text-gray-300 font-light text-lg">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
