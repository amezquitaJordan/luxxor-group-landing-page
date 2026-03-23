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

export default React.memo(function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  const [displayService, setDisplayService] = useState(service);

  useEffect(() => {
    if (service) setDisplayService(service);
  }, [service]);

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

  if (!displayService) return null;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola, me gustaría solicitar información sobre el servicio de ${displayService.title}.`);
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

            {/* Modal Content */}
            <m.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.28, ease: "easeIn" } }}
              transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-[900px] bg-[#151515] border border-gray-800 shadow-2xl flex flex-col md:flex-row h-auto md:h-[620px] rounded-none md:max-h-[calc(100vh-4rem)] max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-gray-400 hover:text-[var(--color-luxxor-gold)] hover:bg-black/80 transition-colors border border-transparent hover:border-[var(--color-luxxor-gold)]/30 backdrop-blur-md"
              >
                <X size={20} />
              </button>

              {/* Left Side: Image (45%) */}
              <div className="w-full md:w-[45%] h-[250px] md:h-full relative shrink-0">
                <Image
                  src={displayService.image}
                  alt={displayService.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOM8Ph/BAAEEwH+oYQ/1wAAAABJRU5ErkJggg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#151515]/20 md:to-[#151515] pointer-events-none" />
              </div>

              {/* Right Side: Content (55%) */}
              <div className="w-full md:w-[55%] p-6 md:p-12 flex flex-col justify-center h-auto md:h-full overflow-y-auto no-scrollbar relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-luxxor-gold)]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-luxxor-gold)]/5 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-6 leading-tight">
                    {displayService.title}
                  </h3>
                  
                  <div className="w-12 h-[1px] bg-[var(--color-luxxor-gold)] mb-6" />
                  
                  <p className="text-gray-400 font-light leading-relaxed mb-10 md:text-lg">
                    {displayService.description}
                  </p>
                  
                  <div className="mt-8 md:mt-auto">
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full sm:w-max px-8 py-4 bg-transparent border border-[var(--color-luxxor-gold)] text-[var(--color-luxxor-gold)] font-semibold tracking-widest uppercase text-sm hover:bg-[var(--color-luxxor-gold)] hover:text-black transition-all duration-300 relative overflow-hidden group shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
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
