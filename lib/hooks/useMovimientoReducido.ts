import { useSyncExternalStore } from "react";

const consulta = "(prefers-reduced-motion: reduce)";

function suscribir(oyente: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const lista = window.matchMedia(consulta);
  lista.addEventListener("change", oyente);
  return () => lista.removeEventListener("change", oyente);
}

function leer() {
  return typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(consulta).matches;
}

/** true si el usuario pidió reducir el movimiento. En el servidor, false. */
export function useMovimientoReducido(): boolean {
  return useSyncExternalStore(suscribir, leer, () => false);
}
