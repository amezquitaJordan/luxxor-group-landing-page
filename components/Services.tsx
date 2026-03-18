"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Briefcase, ShieldCheck, Scale } from "lucide-react";
import ServiceModal from "./ServiceModal";

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

export default function Services() {
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
    <section id="servicios" className="py-24 bg-[var(--color-luxxor-dark)] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
            <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
              Nuestros Servicios
            </span>
            <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-white mb-6"
          >
            Nivel <span className="text-[var(--color-luxxor-gold)]">Premium</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-light text-lg"
          >
            Soluciones integrales diseñadas para clientes exigentes. Simplificamos la complejidad del crecimiento patrimonial.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(212, 175, 55, 0.15), 0 8px 10px -6px rgba(212, 175, 55, 0.1)"
              }}
              className="relative p-8 border border-gray-800 bg-[#151515] overflow-hidden group transition-all duration-300 rounded-none flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-luxxor-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated Glow Border */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-luxxor-gold)] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse-gold transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-center" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#1a1a1a] border border-gray-700 flex items-center justify-center mb-8 text-[var(--color-luxxor-gold)] group-hover:bg-[var(--color-luxxor-gold)] group-hover:text-black transition-colors duration-500">
                  <service.icon strokeWidth={1.5} size={32} />
                </div>
                
                <h3 className="text-xl font-serif text-white mb-4 group-hover:text-[var(--color-luxxor-gold)] transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 font-light leading-relaxed flex-grow">
                  {service.description}
                </p>
                
                <button 
                  onClick={() => setSelectedService(service)}
                  className="mt-8 w-max px-6 py-2 border border-[var(--color-luxxor-gold)] text-[var(--color-luxxor-gold)] text-xs font-semibold tracking-widest uppercase hover:bg-[var(--color-luxxor-gold)] hover:text-black transition-all duration-300 relative overflow-hidden group/btn flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
                >
                  <span className="relative z-10">Descubrir</span>
                  <span className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300">&rarr;</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ServiceModal 
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </section>
  );
}
