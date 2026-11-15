import { esResponsivo, type TextoResponsivo } from "@/contenido/landing";

/**
 * Pinta un TextoResponsivo: la versión de Figma 03 hasta lg y la de Figma 04 desde lg.
 * La que no toca queda con display: none, así el lector de pantalla solo lee una.
 */
export function TextoAdaptable({ texto }: { texto: TextoResponsivo }) {
  if (!esResponsivo(texto)) return <>{texto}</>;
  return (
    <>
      <span className="lg:hidden">{texto.movil}</span>
      <span className="hidden lg:inline">{texto.escritorio}</span>
    </>
  );
}
