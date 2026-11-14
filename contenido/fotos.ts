import type { StaticImageData } from "next/image";
import ensayosInspeccionColumna from "@/activos/fotos/ensayos-inspeccion-columna.jpg";
import complementarioMobiliario from "@/activos/fotos/complementario-mobiliario.jpg";
import complementarioRenderFachada from "@/activos/fotos/complementario-render-fachada.jpg";
import metodologiaLevantamiento from "@/activos/fotos/metodologia-levantamiento.jpg";
import obraCimentacion from "@/activos/fotos/obra-cimentacion.jpg";
import obraEdificioAndamio from "@/activos/fotos/obra-edificio-andamio.jpg";
import obraEstructuraMetalica from "@/activos/fotos/obra-estructura-metalica.jpg";
import obraLadera from "@/activos/fotos/obra-ladera.jpg";
import vulnerabilidadMedicionFisura from "@/activos/fotos/vulnerabilidad-medicion-fisura.jpg";

/**
 * Fotos optimizadas (scripts/optimizar-fotos.mjs → activos/fotos). La importación estática da
 * ancho, alto y blurDataURL, y una URL con hash cacheable de forma inmutable.
 * Textos alternativos neutros: describen lo que se ve, sin atribuir cargos a las personas.
 */
export interface Foto {
  src: StaticImageData;
  alt: string;
  /** object-position cuando el recorte de la caja no debe ser el central. */
  posicion?: string;
}

export const fotos = {
  // Foto 15 (A) · ficha principal de Servicios (Figma 15:188).
  vulnerabilidad: { src: vulnerabilidadMedicionFisura, alt: "Una persona mide con cinta métrica una fisura en un muro." },
  // Foto 13 (B) · Metodología (Figma 16:341).
  metodologia: {
    src: metodologiaLevantamiento,
    alt: "Dos personas hacen un levantamiento con un instrumento topográfico en un pasillo.",
  },
  // Foto 16 (A) · Ensayos en sitio (Figma 16:404).
  ensayos: {
    src: ensayosInspeccionColumna,
    alt: "Una persona mide con cinta métrica una columna de concreto en un parqueadero.",
  },
  // Fotos 6, 3, 4 y 5 (A) · Obras en ejecución (Figma 16:446–16:455). 6 y 5 sin la franja de la fecha.
  obraCimentacion: { src: obraCimentacion, alt: "Cimentación en obra con formaleta de madera y acero de refuerzo." },
  obraEstructuraMetalica: { src: obraEstructuraMetalica, alt: "Vigas de acero de una cubierta vistas desde abajo, con andamios." },
  obraEdificioAndamio: { src: obraEdificioAndamio, alt: "Edificio de varios pisos cubierto de andamios durante su intervención." },
  obraLadera: { src: obraLadera, alt: "Terreno en ladera en obra, con la vivienda en construcción al fondo." },
  // Fotos 1 y 23 (B) · Complementarios (Figma 16:500, 16:510). La 18 (16:505) lleva el letrero de un
  // cliente: no se importa mientras funciones.nombresClientes sea false (ver scripts/fotos.config.mjs).
  // Texto alternativo previsto para cuando se autorice: «Fachada de una droguería en un centro comercial.»
  renderFachada: { src: complementarioRenderFachada, alt: "Render de la fachada de un edificio." },
  mobiliario: { src: complementarioMobiliario, alt: "Mueble de oficina a la medida con repisas iluminadas." },
} as const satisfies Record<string, Foto>;

export type IdFoto = keyof typeof fotos;
