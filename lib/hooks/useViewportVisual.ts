import { useSyncExternalStore } from "react";

export interface EstadoViewportVisual {
  /** Alto visible en px (visualViewport.height) o null si no hay API. */
  alto: number | null;
  /** Teclado virtual abierto (heurística; ver esTecladoAbierto). */
  tecladoAbierto: boolean;
}

const SIN_API: EstadoViewportVisual = { alto: null, tecladoAbierto: false };
const TOLERANCIA_ESCALA = 0.05;
const PROPORCION_TECLADO = 0.75;

/** true si el foco está en un campo editable (input de texto, textarea o contenteditable). */
export function focoEnCampoEditable(elemento: Element | null): boolean {
  if (!elemento) return false;
  if (elemento instanceof HTMLTextAreaElement) return !elemento.readOnly && !elemento.disabled;
  if (elemento instanceof HTMLInputElement) {
    const noEditables = ["button", "checkbox", "radio", "range", "color", "file", "image", "reset", "submit", "hidden"];
    return !noEditables.includes(elemento.type) && !elemento.readOnly && !elemento.disabled;
  }
  return elemento instanceof HTMLElement && elemento.isContentEditable;
}

/**
 * Teclado abierto = el alto visible baja de 0,75 × innerHeight, sin zoom (scale ≈ 1)
 * y con el foco en un campo editable. Así el zoom con pellizco no se confunde con el teclado.
 */
export function esTecladoAbierto(alto: number, escala: number, altoVentana: number, activo: Element | null): boolean {
  return (
    alto < PROPORCION_TECLADO * altoVentana &&
    Math.abs(escala - 1) <= TOLERANCIA_ESCALA &&
    focoEnCampoEditable(activo)
  );
}

let ultimo: EstadoViewportVisual = SIN_API;

function leer(): EstadoViewportVisual {
  if (typeof window === "undefined" || !window.visualViewport) return SIN_API;
  const vv = window.visualViewport;
  const alto = Math.round(vv.height);
  const tecladoAbierto = esTecladoAbierto(vv.height, vv.scale, window.innerHeight, document.activeElement);
  // Misma referencia si no cambió nada (requisito de useSyncExternalStore).
  if (ultimo.alto !== alto || ultimo.tecladoAbierto !== tecladoAbierto) ultimo = { alto, tecladoAbierto };
  return ultimo;
}

function suscribir(oyente: () => void) {
  if (typeof window === "undefined" || !window.visualViewport) return () => {};
  const vv = window.visualViewport;
  vv.addEventListener("resize", oyente);
  vv.addEventListener("scroll", oyente);
  document.addEventListener("focusin", oyente);
  document.addEventListener("focusout", oyente);
  return () => {
    vv.removeEventListener("resize", oyente);
    vv.removeEventListener("scroll", oyente);
    document.removeEventListener("focusin", oyente);
    document.removeEventListener("focusout", oyente);
  };
}

/** Alto del viewport visual y estado del teclado virtual (iOS no ajusta el layout al teclado). */
export function useViewportVisual(): EstadoViewportVisual {
  return useSyncExternalStore(suscribir, leer, () => SIN_API);
}
