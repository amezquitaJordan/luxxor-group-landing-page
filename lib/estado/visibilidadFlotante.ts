import { useEffect, useSyncExternalStore } from "react";

/**
 * Visibilidad del botón flotante de WhatsApp.
 * El botón se oculta mientras exista al menos un motivo activo (menú, chat, lienzo 3D en
 * pantalla, contacto visible o teclado abierto). Store mínimo sin dependencias.
 */
export type MotivoOcultar = "menu" | "chat" | "lienzo" | "contacto" | "teclado";

const motivos = new Set<MotivoOcultar>();
const oyentes = new Set<() => void>();

function notificar() {
  oyentes.forEach((oyente) => oyente());
}

export function ocultarBotonFlotante(motivo: MotivoOcultar): void {
  if (motivos.has(motivo)) return;
  motivos.add(motivo);
  notificar();
}

export function mostrarBotonFlotante(motivo: MotivoOcultar): void {
  if (!motivos.delete(motivo)) return;
  notificar();
}

export function esVisible(): boolean {
  return motivos.size === 0;
}

export function suscribir(oyente: () => void): () => void {
  oyentes.add(oyente);
  return () => {
    oyentes.delete(oyente);
  };
}

/** Solo para pruebas: vuelve al estado inicial. */
export function reiniciarParaPruebas(): void {
  motivos.clear();
  oyentes.clear();
}

/** true si el botón flotante debe verse. En el servidor, visible. */
export function useBotonFlotanteVisible(): boolean {
  return useSyncExternalStore(suscribir, esVisible, () => true);
}

/** Oculta el botón flotante por `motivo` mientras `activo` sea true; libera el motivo al desmontar. */
export function useOcultarBotonFlotante(motivo: MotivoOcultar, activo: boolean): void {
  useEffect(() => {
    if (!activo) return;
    ocultarBotonFlotante(motivo);
    return () => mostrarBotonFlotante(motivo);
  }, [motivo, activo]);
}
