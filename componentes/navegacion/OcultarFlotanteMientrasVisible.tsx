"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { useOcultarBotonFlotante, type MotivoOcultar } from "@/lib/estado/visibilidadFlotante";
import { useEnPantalla } from "@/lib/hooks/useEnPantalla";

interface PropsOcultarFlotante {
  motivo: MotivoOcultar;
  /** Media query en la que aplica (p. ej., solo móvil). Sin ella, aplica siempre. */
  media?: string;
  className?: string;
  children: ReactNode;
}

function useCoincideMedia(media: string | undefined): boolean {
  return useSyncExternalStore(
    (oyente) => {
      if (!media || typeof window === "undefined") return () => {};
      const lista = window.matchMedia(media);
      lista.addEventListener("change", oyente);
      return () => lista.removeEventListener("change", oyente);
    },
    () => (media ? window.matchMedia(media).matches : true),
    () => !media,
  );
}

/**
 * Oculta el botón flotante de WhatsApp mientras su contenido está en pantalla (motivos «lienzo»
 * y «contacto», plan §H). Pinta un <div> real: IntersectionObserver no observa cajas con
 * display: contents.
 */
export function OcultarFlotanteMientrasVisible({ motivo, media, className, children }: PropsOcultarFlotante) {
  const ref = useRef<HTMLDivElement>(null);
  const enPantalla = useEnPantalla(ref);
  const aplica = useCoincideMedia(media);
  useOcultarBotonFlotante(motivo, aplica && enPantalla);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
