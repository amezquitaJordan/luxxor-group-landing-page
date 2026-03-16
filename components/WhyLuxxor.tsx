"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    id: "01",
    title: "Diseño Funcional + Estética Premium",
    description: "Espacios meticulosamente planificados que equilibran la utilidad diaria con el lujo visual."
  },
  {
    id: "02",
    title: "Materiales de Alta Calidad",
    description: "Trabajamos exclusivamente con insumos de primera categoría para acabados duraderos y perfectos."
  },
  {
    id: "03",
    title: "Supervisión Técnica Profesional",
    description: "Control absoluto y seguimiento experto en cada etapa para garantizar el cumplimiento."
  },
  {
    id: "04",
    title: "Servicio Integral en un Solo Lugar",
    description: "Diseño, ejecución, carpintería y restauración gestionados desde una única firma."
  }
];

export default function WhyLuxxor() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <section id="por-que-elegirnos" className="py-24 bg-[#1a1a1a] relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
              <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
                La Ventaja Luxxor
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              ¿Por qué elegir <br />a <span className="text-[var(--color-luxxor-gold)] text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-luxxor-gold)] to-yellow-600">Luxxor Group?</span>
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/3 text-gray-400 font-light"
          >
            <p>
              No somos simplemente contratistas; somos sus socios estratégicos en la creación y transformación de su estilo de vida a través del diseño.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={itemVariants}
              className="group p-8 border border-gray-800 bg-[var(--color-luxxor-dark)] hover:bg-[#1f1f1f] transition-colors duration-300"
            >
              <div className="text-[var(--color-luxxor-gold)] text-5xl font-serif font-thin mb-8 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                {reason.id}
              </div>
              <h3 className="text-xl font-serif text-white mb-4 group-hover:text-[var(--color-luxxor-gold)] transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                {reason.description}
              </p>
              
              <div className="w-0 h-[2px] bg-[var(--color-luxxor-gold)] mt-8 group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
