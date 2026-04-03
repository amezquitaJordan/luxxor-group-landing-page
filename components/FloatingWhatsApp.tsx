/*
 * Archivo: components/FloatingWhatsApp.tsx
 * Componente: FloatingWhatsApp
 * Propósito: Muestra el botón flotante permanente de WhatsApp con mensajes emergentes (burbujas) 
 * que incentivan el contacto ("Call To Action" o CTA dinámico).
 * Interacciones: Se oculta automáticamente si el ChatbotModal entra a escena.
 */
"use client";

import React, { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

const messages = [
  "¿Qué esperas para hacer tu cotización?",
  "¡Diseño 3D gratis antes de empezar!",
  "¡Transforma tu espacio en lujo hoy!",
  "Cotización sin costo en minutos ¡Escríbenos!"
];

const bubbleVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/*
 * Componente FloatingWhatsApp Memorizado
 * Estado: 
 *  - showMessage: Visibilidad de la burbuja activa de texto.
 *  - currentIndex: Posición del mensaje actual en el arreglo.
 *  - notificationCount: Número mostrado sobre el globo simulando notificaciones.
 *  - isChatbotOpen: Determina si debe ocultarse al activarse el evento `chatbot-state-change`.
 */
export default React.memo(function FloatingWhatsApp({ isContainerOpen = true }: { isContainerOpen?: boolean }) {
  const [showMessage, setShowMessage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  // Escucha para apagar los mensajes si el Container se oculta de repente.
  useEffect(() => {
    if (!isContainerOpen) {
      setShowMessage(false);
    }
  }, [isContainerOpen]);

  /* Hook para alternar la visibilidad de los mensajes cada X segundos en bucle cerrado. */
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const initialTimeout = setTimeout(() => {
      setNotificationCount(1);
      setShowMessage(true);
      hideTimeout = setTimeout(() => setShowMessage(false), 3000);

      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex < 3 ? prevIndex + 1 : 3;
          setNotificationCount(nextIndex + 1);
          return nextIndex;
        });

        setShowMessage(true);
        hideTimeout = setTimeout(() => setShowMessage(false), 3000);
      }, 7000);
    }, 2000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(hideTimeout);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-end">
      {/* Dynamic Bubble Message — entrance-only animation */}
      <AnimatePresence mode="wait">
        {showMessage && isContainerOpen && (
          <m.div
            key={currentIndex}
            variants={bubbleVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.38 }}
            className="absolute right-[calc(100%+16px)] top-1/2 -translate-y-1/2 bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border)] rounded-2xl rounded-br-sm px-4 py-3 shadow-lg max-w-[220px] w-max whitespace-nowrap lg:whitespace-normal"
            style={{ transformOrigin: "right center" }}
          >
            <p className="text-sm font-medium leading-snug">
              {messages[currentIndex]}
            </p>
            {/* Small triangle pointing right */}
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[var(--theme-bg-surface)]" />
          </m.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button (Fixed to exactly 56px x 56px) */}
      <m.a
        href="https://wa.me/573170303333"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-[56px] h-[56px] bg-[#25D366] rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:bg-[#128C7E] transition-all duration-300 z-10"
        whileHover={{ scale: 1.1 }}
      >
        <m.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 -z-10 blur-[8px]"
        />

        {/* Red notification badge — only visible after first message */}
        {notificationCount > 0 && (
          <m.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md z-20"
          >
            {notificationCount}
          </m.span>
        )}

        {/* WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157.1zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-3.2-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </m.a>
    </div>
  );
});
