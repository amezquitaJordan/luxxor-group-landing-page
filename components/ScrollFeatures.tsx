/*
 * Archivo: components/ScrollFeatures.tsx
 * Componente: ScrollFeatures
 * Propósito: Administra e inyecta utilidades globales de inter-acción con el Scroll.
 * Instancia la barra superior de progreso dorada y un botón de retorno a top (Volver Arriba).
 */
"use client";

import React from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "framer-motion";

/*
 * Componente funcional ScrollFeatures
 * Hooks/Estados implementados:
 *  - scrollYProgress (Framer Motion): Obtiene un valor normalizado (0 a 1) sobre cuánto se ha desplazado el usuario.
 *  - isChatbotOpen / isBodyHidden: Detectores para ocultar el botón 'volver arriba' cuando 
 *    otros componentes como modales o chatbots secuestran la pantalla completa y bloquean el rebote visual.
 */
export default function ScrollFeatures() {
  const { scrollYProgress } = useScroll();

  // Transform scaleX for the progress bar based on scroll position
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Opacidad del progress bar (30% inactivo, hasta 100% activo)
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0.3, 1]);

  return (
    <LazyMotion features={domAnimation}>
      {/* Barra de Progreso de Scroll dorada — solo esta funcionalidad vive aquí.
          El botón "Volver Arriba" fue migrado a FloatingControls.tsx para evitar duplicados. */}
      <m.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#D4AF37] z-[100] origin-left pointer-events-none shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
        style={{ scaleX, opacity }}
      />
    </LazyMotion>
  );
}
