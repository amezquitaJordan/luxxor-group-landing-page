export interface EnlaceNavegacion {
  etiqueta: string;
  href: `#${string}`;
}

/** Navegación principal (Figma 11:81 y 21:353). Los id de destino se crean en la Sesión 4. */
export const enlacesNavegacion: readonly EnlaceNavegacion[] = [
  { etiqueta: "Servicios", href: "#servicios" },
  { etiqueta: "Proyectos", href: "#proyectos" },
  { etiqueta: "Metodología", href: "#metodologia" },
  { etiqueta: "Equipo", href: "#equipo" },
  { etiqueta: "Contacto", href: "#contacto" },
];

/** Id del contenido principal (destino de «Saltar al contenido»). */
export const ID_CONTENIDO = "contenido";
