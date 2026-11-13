"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Motion con carga mínima (LazyMotion + m) y respeto a prefers-reduced-motion:
 * con reducedMotion="user" se desactivan las animaciones de transform y se conservan las de opacidad.
 */
export function ProveedorMovimiento({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
