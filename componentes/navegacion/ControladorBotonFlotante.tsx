"use client";

import { useOcultarBotonFlotante } from "@/lib/estado/visibilidadFlotante";
import { useViewportVisual } from "@/lib/hooks/useViewportVisual";

/** Oculta el botón flotante mientras el teclado virtual está abierto. No pinta nada. */
export function ControladorBotonFlotante() {
  const { tecladoAbierto } = useViewportVisual();
  useOcultarBotonFlotante("teclado", tecladoAbierto);
  return null;
}
