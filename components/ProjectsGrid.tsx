"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "p1",
    title: "Remodelación Penthouse La Flora",
    category: "Residencial Premium",
    image: "/images/baño-lujoso.jpg",
  },
  {
    id: "p2",
    title: "Villas del Prado Pance",
    category: "Residencial Premium",
    image: "/images/cocina-elegante-opaca.jpg",
  },
  {
    id: "p3",
    title: "Restauración Mobiliario Clásico",
    category: "Restauración de Alta Gama",
    image: "/images/sala-de-estar-lujosa-negro.jpg",
  },
];

export default function ProjectsGrid() {
  return (
    <section id="proyectos" className="py-24 bg-[var(--color-luxxor-dark)] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)]" />
              <span className="text-[var(--color-luxxor-gold)] tracking-widest uppercase text-sm font-semibold">
                Nuestros Últimos Proyectos
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Explora algunas de nuestras remodelaciones y diseños más recientes en Cali.
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/4"
          >
            <a href="#contacto" className="inline-block border-b-2 border-[var(--color-luxxor-gold)] text-white hover:text-[var(--color-luxxor-gold)] transition-colors duration-300 pb-1 font-semibold uppercase tracking-widest text-sm">
              Ver Catálogo Completo
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative h-[450px] overflow-hidden cursor-pointer"
            >
              {/* Image constraints */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Content Box */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  <p className="text-[var(--color-luxxor-gold)] text-sm tracking-widest uppercase font-semibold mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-serif text-white mb-4">
                    {project.title}
                  </h3>
                  <div className="w-0 h-[2px] bg-[var(--color-luxxor-gold)] group-hover:w-12 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                </div>
              </div>
              
              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[var(--color-luxxor-gold)]/50 z-30 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
