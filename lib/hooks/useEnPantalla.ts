import { useEffect, useState, type RefObject } from "react";

interface OpcionesEnPantalla {
  /** rootMargin del IntersectionObserver, p. ej. "200px 0px". */
  margen?: string;
  /** Fracción visible necesaria (0–1). */
  umbral?: number;
  /** Si es true, deja de observar la primera vez que el elemento entra. */
  unaVez?: boolean;
}

/**
 * true mientras el elemento está en pantalla (IntersectionObserver).
 * En el servidor, false. Sin IntersectionObserver, true (no se oculta nada por error).
 */
export function useEnPantalla(
  ref: RefObject<Element | null>,
  { margen = "0px", umbral = 0, unaVez = false }: OpcionesEnPantalla = {},
): boolean {
  const [enPantalla, setEnPantalla] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    if (typeof IntersectionObserver === "undefined") {
      // Sincroniza con un sistema externo inexistente: se asume visible.
      queueMicrotask(() => setEnPantalla(true));
      return;
    }
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada) return;
        setEnPantalla(entrada.isIntersecting);
        if (entrada.isIntersecting && unaVez) observador.disconnect();
      },
      { rootMargin: margen, threshold: umbral },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [ref, margen, umbral, unaVez]);

  return enPantalla;
}
