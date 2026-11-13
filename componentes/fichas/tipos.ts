import { createElement, type ReactNode } from "react";

export interface ImagenFicha {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type NivelTitulo = 2 | 3 | 4;

/** Título h2/h3/h4 según el nivel de la sección donde vive la ficha (el estilo lo da className). */
export function TituloFicha({ nivel, className, children }: { nivel: NivelTitulo; className: string; children: ReactNode }) {
  return createElement(`h${nivel}`, { className }, children);
}
