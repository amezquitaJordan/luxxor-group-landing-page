import { createElement, type ReactNode } from "react";
import type { StaticImageData } from "next/image";

/** Foto de una ficha: importación estática (ancho y alto automáticos) y texto alternativo. */
export interface ImagenFicha {
  src: StaticImageData;
  alt: string;
}

export type NivelTitulo = 2 | 3 | 4;

/** Título h2/h3/h4 según el nivel de la sección donde vive la ficha (el estilo lo da className). */
export function TituloFicha({ nivel, className, children }: { nivel: NivelTitulo; className: string; children: ReactNode }) {
  return createElement(`h${nivel}`, { className }, children);
}
