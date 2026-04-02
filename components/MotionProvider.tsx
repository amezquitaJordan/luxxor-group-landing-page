/*
 * Archivo: components/MotionProvider.tsx
 * Componente: MotionProvider
 * Propósito: Envuelve toda la aplicación en MotionConfig para centralizar la configuración de animaciones.
 * Configuración: Utiliza 'reducedMotion="user"' para respetar las preferencias de accesibilidad del usuario (evitar animaciones pesadas si el usuario lo desea).
 */
"use client";

import { MotionConfig } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
