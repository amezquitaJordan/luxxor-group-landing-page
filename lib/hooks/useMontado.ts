import { useSyncExternalStore } from "react";

const suscribir = () => () => {};

/**
 * false en el servidor y durante la hidratación; true después.
 * Evita desajustes de hidratación sin usar setState dentro de un efecto.
 */
export function useMontado(): boolean {
  return useSyncExternalStore(
    suscribir,
    () => true,
    () => false,
  );
}
