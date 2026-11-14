import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PropsSeccion {
  id?: string;
  /** Título visible (h2). Sin título, la sección necesita `etiqueta` para tener nombre accesible. */
  titulo?: ReactNode;
  /** Estilo del h2: «h1» (32 px en móvil, la mayoría) o «h2» (26 px, Complementarios). */
  estiloTitulo?: "h1" | "h2";
  etiqueta?: string;
  fondo?: "base" | "superficie";
  /** Fuerza el modo oscuro en la sección (Contacto y pie, como en Figma 17:320 y 17:340). */
  oscura?: boolean;
  /** Clases del contenedor interior (separación entre bloques, rellenos). */
  className?: string;
  children: ReactNode;
}

/**
 * Sección de la landing: fondo a sangre y contenido limitado a 80rem con los márgenes de la
 * retícula (20 px en móvil). El título siempre es h2; el estilo visual lo decide `estiloTitulo`.
 */
export function Seccion({
  id,
  titulo,
  estiloTitulo = "h1",
  etiqueta,
  fondo = "base",
  oscura = false,
  className,
  children,
}: PropsSeccion) {
  const idTitulo = id && titulo ? `${id}-titulo` : undefined;
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
      )}
    >
      <div className={cn("mx-auto flex w-full max-w-[80rem] flex-col gap-5 px-5 py-16 md:px-8 lg:px-20", className)}>
        {titulo && (
          <h2 id={idTitulo} className={estiloTitulo === "h1" ? "texto-h1" : "texto-h2"}>
            {titulo}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
