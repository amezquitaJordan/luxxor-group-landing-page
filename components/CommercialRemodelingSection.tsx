'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

const MagneticCard = ({ service }: { service: typeof services[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile avoiding hydration mismatch
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 160, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 160, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center of card (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => isMobile && setIsHovered(!isHovered)}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full h-[400px] md:h-[450px] rounded-2xl cursor-pointer group perspective-1000"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Image Container with Inner Shadow */}
      <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#121212]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className={`object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Deep dark gradient overlay always present for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
      </div>

      {/* Golden Glow Depth Animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_0_1px_rgba(212,175,55,0.1)]"
        animate={{
          boxShadow: isHovered
            ? 'inset 0 0 0 1px rgba(212,175,55,0.5), inset 0 0 60px rgba(212,175,55,0.2), 0 0 40px rgba(212,175,55,0.15)'
            : 'inset 0 0 0 1px rgba(212,175,55,0.1), inset 0 0 0px rgba(212,175,55,0), 0 0 0px rgba(212,175,55,0)'
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 p-8 flex flex-col justify-end z-10"
        style={{ transform: 'translateZ(30px)' }}
      >
        <motion.div
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h3 className="text-2xl md:text-3xl font-light tracking-wide text-[#D4AF37] mb-3">
            {service.title}
          </h3>

          <motion.p
            initial={{ opacity: 0.8, height: 'auto' }}
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.4 }}
            className="text-white/90 text-sm md:text-base leading-relaxed max-w-[95%] font-light"
          >
            {service.description}
          </motion.p>
        </motion.div>

        {/* Animated accent line */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent mt-6 origin-left"
          initial={{ scaleX: 0.3, opacity: 0.5 }}
          animate={{
            scaleX: isHovered ? 1 : 0.3,
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

export default function CommercialRemodelingSection() {
  return (
    <section className="relative py-24 md:py-32 w-full bg-[#121212] overflow-hidden flex flex-col items-center">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2" />
      <div className="absolute right-0 top-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
      <div className="absolute left-0 top-1/4 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-[1400px] w-full px-6 md:px-12 lg:px-24 mx-auto relative z-10 flex flex-col items-center">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mb-16 md:mb-24 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
        </motion.div>

        {/* 2x2 Grid using CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full mb-20">
          {services.map((service, index) => (
            <MagneticCard key={index} service={service} />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="https://wa.me/573138865481"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#D4AF37] text-[#121212] font-semibold tracking-wider uppercase text-sm md:text-base overflow-hidden rounded-sm transition-transform hover:scale-[1.02] duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full skew-x-12 group-hover:animate-[shine_1.5s_ease-out_infinite]" />
            <span className="relative z-10 drop-shadow-sm">Transforma tu negocio comercial ahora</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
