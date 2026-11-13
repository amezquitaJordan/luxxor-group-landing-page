import { ID_CONTENIDO } from "@/contenido/navegacion";

/** «Saltar al contenido» (WCAG 2.4.1): oculto hasta recibir el foco con el teclado. */
export function SaltarContenido() {
  return (
    <a
      href={`#${ID_CONTENIDO}`}
      className="texto-boton fixed top-2 left-2 z-50 -translate-y-[200%] rounded-sm bg-accion-primaria-fondo px-6 py-3 text-accion-primaria-texto focus-visible:translate-y-0"
    >
      Saltar al contenido
    </a>
  );
}
