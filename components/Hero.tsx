"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/images/casa-lujosa.jpg"
          alt="Casa lujosa moderna - Remodelación residencial premium en Cali"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 uppercase tracking-wider">
            Transformamos tu
            <br />
            <span className="text-[var(--color-luxxor-gold)]">Espacio en Lujo</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-sans font-light">
            Diseño funcional y estética premium para hogares y espacios que inspiran. Remodelaciones residenciales de alto nivel en Cali, Valle del Cauca.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://wa.me/573170303333"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[var(--color-luxxor-gold)] text-black font-semibold rounded-none tracking-wide hover:bg-white transition-colors duration-300 transform hover:scale-105"
            >
              Solicita tu cotización GRATIS por WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center hidden md:flex"
      >
        <span className="text-gray-400 text-sm tracking-widest uppercase mb-2">Descubrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-[var(--color-luxxor-gold)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
