"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useMovimientoReducido } from "@/lib/hooks/useMovimientoReducido";

interface PropsCarruselObras {
  /** Nombre accesible de la región desplazable. */
  etiqueta: string;
  controles: { anterior: string; siguiente: string };
  /** La lista de obras (Server Component): <ul> con un <li> por foto. */
  children: ReactNode;
}

/** Margen de tolerancia (px) para decidir si la fila está en un extremo. */
const TOLERANCIA = 2;

const MEDIA_ESCRITORIO = "(min-width: 64rem)";

/** true desde lg (en el servidor, false: se pinta como carrusel y se corrige al hidratar). */
function useEsEscritorio(): boolean {
  return useSyncExternalStore(
    (oyente) => {
      const lista = window.matchMedia(MEDIA_ESCRITORIO);
      lista.addEventListener("change", oyente);
      return () => lista.removeEventListener("change", oyente);
    },
    () => window.matchMedia(MEDIA_ESCRITORIO).matches,
    () => false,
  );
}

const claseControl =
  "texto-pequeno inline-flex min-h-11 items-center rounded-sm border border-borde-sutil px-3.5 py-3 text-texto-primario transition-colors duration-150 hover:bg-fondo-superficie aria-disabled:cursor-not-allowed aria-disabled:text-texto-secundario aria-disabled:hover:bg-transparent motion-reduce:transition-none";

/**
 * Carrusel de Obras en ejecución (Figma 16:444 y 16:457): scroll-snap nativo, sin reproducción
 * automática. Anterior/Siguiente desplazan un elemento; en los extremos quedan con aria-disabled
 * (siguen enfocables y anuncian su estado). La región es enfocable para usar las flechas.
 * Desde lg (Figma 19:374) es una cuadrícula de 4 fotos: sin controles, sin rol de región ni tabindex
 * (no hay nada que desplazar y una parada de Tab vacía solo estorba).
 */
export function CarruselObras({ etiqueta, controles, children }: PropsCarruselObras) {
  const region = useRef<HTMLDivElement>(null);
  const reducido = useMovimientoReducido();
  const [enInicio, setEnInicio] = useState(true);
  const [enFinal, setEnFinal] = useState(false);
  const escritorio = useEsEscritorio();

  const actualizar = useCallback(() => {
    const r = region.current;
    if (!r) return;
    setEnInicio(r.scrollLeft <= TOLERANCIA);
    setEnFinal(r.scrollLeft + r.clientWidth >= r.scrollWidth - TOLERANCIA);
  }, []);

  useEffect(() => {
    const r = region.current;
    if (!r) return;
    actualizar();
    r.addEventListener("scroll", actualizar, { passive: true });
    const observador = new ResizeObserver(actualizar);
    observador.observe(r);
    return () => {
      r.removeEventListener("scroll", actualizar);
      observador.disconnect();
    };
  }, [actualizar]);

  function desplazar(sentido: 1 | -1) {
    const r = region.current;
    if (!r) return;
    if ((sentido < 0 && enInicio) || (sentido > 0 && enFinal)) return;
    // Paso = ancho de un elemento + el espacio entre elementos.
    const lista = r.querySelector("ul");
    const primero = lista?.firstElementChild as HTMLElement | null;
    const espacio = lista ? parseFloat(getComputedStyle(lista).columnGap) || 0 : 0;
    const paso = (primero?.offsetWidth ?? r.clientWidth) + espacio;
    r.scrollBy({ left: sentido * paso, behavior: reducido ? "auto" : "smooth" });
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        ref={region}
        role={escritorio ? undefined : "region"}
        aria-label={escritorio ? undefined : etiqueta}
        tabIndex={escritorio ? undefined : 0}
        className="-mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-2 md:-mx-8 md:scroll-px-8 md:px-8 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {children}
      </div>
      <div className="flex gap-2 lg:hidden">
        <button type="button" aria-disabled={enInicio} onClick={() => desplazar(-1)} className={claseControl}>
          {controles.anterior}
        </button>
        <button type="button" aria-disabled={enFinal} onClick={() => desplazar(1)} className={claseControl}>
          {controles.siguiente}
        </button>
      </div>
    </div>
  );
}
