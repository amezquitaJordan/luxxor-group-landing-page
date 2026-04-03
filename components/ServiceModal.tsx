/*
 * Archivo: components/ServiceModal.tsx
 * Componente: ServiceModal
 * Propósito: Muestra los detalles extendidos de un servicio premium específico en un formato 
 * modal (ventana superpuesta), bloqueando el scroll de fondo y ofreciendo un CTA directo.
 * Animación: Framer Motion (AnimatePresence) para transiciones de entrada y salida pulidas.
 */
"use client";

import React from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    title: string;
    description: string;
    image: string;
  } | null;
}

/*
 * Componente principal ServiceModal
 * Props:
 *  - isOpen: booleano que determina si el modal está visible.
 *  - onClose: función callback para cerrar el modal.
 *  - service: objeto con la información detallada del servicio seleccionado.
 * Hooks/Estado: 
 *  - Mantiene referencia del último servicio (prevService) para permitir 
 *    transiciones de cierre suaves sin que el contenido desaparezca de golpe.
 */
export default React.memo(function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  const prevService = React.useRef(service);
  const activeService = service || prevService.current;

  useEffect(() => {
    if (service) prevService.current = service;
  }, [service]);

  /* 
   * Previene el scroll del cuerpo de la página (<body>) cuando el modal está activo
   * para asegurar una experiencia aislada libre de ruidos visuales.
   */
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!activeService) return null;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola, me gustaría solicitar información sobre el servicio de ${activeService.title}.`);
    window.open(`https://wa.me/573170303333?text=${message}`, '_blank');
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={onClose}
            />

            {/*
             * Modal Content
             * OPTIMIZACIÓN DESKTOP (lg+): max-w y max-h ajustados por breakpoint.
             * max-w-[650px] puro sin restricción lg provocaba modal excesivamente ancho en Desktop.
             * max-h controlado por breakpoint evita que el modal tape el botón de WhatsApp
             * y que se sienta "apretado" en pantallas de 768px de alto al 100% zoom.
             */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.28, ease: "easeIn" } }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-[650px] lg:max-w-[580px] xl:max-w-[640px] bg-[#151515] border border-gray-800 shadow-2xl flex flex-col h-auto rounded-none max-h-[85vh] lg:max-h-[78vh] xl:max-h-[82vh] overflow-hidden mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-gray-400 hover:text-[var(--color-luxxor-gold)] hover:bg-black/80 transition-colors border border-transparent hover:border-[var(--color-luxxor-gold)]/30 backdrop-blur-md"
              >
                <X size={20} />
              </button>

              {/* Top Side: Image */}
              {/* OPTIMIZACIÓN DESKTOP (lg+): Altura de imagen reducida para caber dentro del max-h del modal
                  sin comprimir el contenido de texto. Escala progresivamente en xl y 2xl. */}
              <div className="w-full h-[250px] sm:h-[300px] lg:h-[170px] xl:h-[210px] 2xl:h-[250px] relative shrink-0">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 650px"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOM8Ph/BAAEEwH+oYQ/1wAAAABJRU5ErkJggg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom Side: Content */}
              {/* OPTIMIZACIÓN DESKTOP (lg+): Padding reducido en lg para que el contenido no quede
                  apretado dentro del max-h más pequeño. Escala progresivamente en xl/2xl. */}
              <div className="w-full p-6 sm:p-8 lg:p-6 xl:p-8 flex flex-col justify-center h-auto overflow-y-auto no-scrollbar relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-luxxor-gold)]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-luxxor-gold)]/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10">
                  {/* OPTIMIZACIÓN DESKTOP (lg+): Tipografía fluida para el título del modal.
                      clamp() evita que el título sea demasiado grande en pantallas lg de 768px de alto. */}
                  <h3 className="text-2xl md:text-3xl lg:text-[clamp(1.2rem,1.8vw,1.5rem)] xl:text-[clamp(1.35rem,1.9vw,1.65rem)] font-serif text-white mb-6 leading-tight">
                    {activeService.title}
                  </h3>
                  
                  <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)] mb-6" />
                  
                  <p className="text-gray-400 font-light leading-relaxed mb-10 text-base lg:text-sm xl:text-base">
                    {activeService.description}
                  </p>
                  
                  <div className="mt-auto">
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full px-8 py-4 bg-transparent border border-[var(--color-luxxor-gold)] text-[var(--color-luxxor-gold)] font-semibold tracking-widest uppercase text-sm hover:bg-[var(--color-luxxor-gold)] hover:text-black transition-all duration-300 relative overflow-hidden group shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                    >
                      <span className="relative z-10">Solicitar información</span>
                    </button>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
});
