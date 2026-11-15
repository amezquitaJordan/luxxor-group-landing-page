import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PropsSeccion {
  id?: string;
  /** Título visible (h2). Sin título, la sección necesita `etiqueta` o `tituloPropio`. */
  titulo?: ReactNode;
  /** Bajada de la cabecera: debajo del título en móvil y a la derecha desde lg (Figma 04, «Cabecera»). */
  bajada?: ReactNode;
  /**
   * Estilo del h2: «h1» (32 → 48 px, la mayoría) o «h2» (26 px en móvil y 48 px desde lg, como
   * Complementarios en Figma 03 y 04).
   */
  estiloTitulo?: "h1" | "h2";
  /** El h2 lo pinta el contenido (composiciones en columnas) con id `${id}-titulo`. */
  tituloPropio?: boolean;
  etiqueta?: string;
  fondo?: "base" | "superficie";
  /** Fuerza el modo oscuro en la sección (Contacto y pie, como en Figma 17:320 y 17:340). */
  oscura?: boolean;
  /** Dentro de una banda de dos columnas (escritorio): sin fondo ni rellenos propios desde lg. */
  enBanda?: boolean;
  /** Clases del contenedor interior (separación entre bloques, composición). */
  className?: string;
  children: ReactNode;
}

export function claseTitulo(estilo: "h1" | "h2" = "h1") {
  return estilo === "h1" ? "texto-h1" : "texto-h2 lg:texto-h1";
}

/**
 * Sección de la landing: fondo a sangre y contenido de hasta 80rem (más los márgenes de la retícula:
 * 20 px en móvil, 32 en md y lg, 80 desde xl). El título siempre es h2.
 * Escritorio: 120 px de relleno vertical y 40 px entre la cabecera y el contenido.
 */
export function Seccion({
  id,
  titulo,
  bajada,
  estiloTitulo = "h1",
  tituloPropio = false,
  etiqueta,
  fondo = "base",
  oscura = false,
  enBanda = false,
  className,
  children,
}: PropsSeccion) {
  const idTitulo = id && (titulo || tituloPropio) ? `${id}-titulo` : undefined;
  const h2 = titulo ? (
    <h2 id={idTitulo} className={claseTitulo(estiloTitulo)}>
      {titulo}
    </h2>
  ) : null;

  return (
    <section
      id={id}
      aria-labelledby={idTitulo}
      aria-label={idTitulo ? undefined : etiqueta}
      data-theme={oscura ? "dark" : undefined}
      className={cn(
        "text-texto-primario",
        fondo === "base" ? "bg-fondo-base" : "bg-fondo-superficie",
        oscura && "[color-scheme:dark]",
        enBanda && "lg:bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[90rem] flex-col gap-5 px-5 py-16 md:px-8 lg:gap-10",
          // En banda, los márgenes y el relleno vertical los pone la banda (no se combinan utilidades opuestas).
          enBanda ? "lg:max-w-none lg:px-0 lg:py-0" : "lg:py-30 xl:px-20",
          className,
        )}
      >
        {h2 && bajada ? (
          // Móvil: título y bajada siguen el flujo (display: contents). Desde lg: dos columnas.
          <div className="contents lg:grid lg:grid-cols-[minmax(0,40rem)_minmax(0,32.5rem)] lg:items-end lg:justify-between lg:gap-20">
            {h2}
            <p className="texto-cuerpo text-texto-secundario">{bajada}</p>
          </div>
        ) : (
          h2
        )}
        {children}
      </div>
    </section>
  );
}

/** h2 de una sección con `tituloPropio` (va dentro de una columna del contenido). */
export function TituloSeccion({ id, estilo = "h1", children }: { id: string; estilo?: "h1" | "h2"; children: ReactNode }) {
  return (
    <h2 id={`${id}-titulo`} className={claseTitulo(estilo)}>
      {children}
    </h2>
  );
}
