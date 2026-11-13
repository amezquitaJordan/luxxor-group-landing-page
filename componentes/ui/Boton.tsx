import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AVISO_PESTANA_NUEVA, TextoOculto } from "./TextoOculto";

export type VarianteBoton = "primario" | "secundario" | "texto";

interface PropsBaseBoton {
  variante?: VarianteBoton;
  anchoCompleto?: boolean;
  icono?: ReactNode;
  children: ReactNode;
  className?: string;
}

type PropsEnlace = PropsBaseBoton & { href: string; externo?: boolean } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type PropsAccion = PropsBaseBoton & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export type PropsBoton = PropsEnlace | PropsAccion;

/*
 * Botón (Figma 10:50): Tipo Primario / Secundario / Texto × Estado Reposo / Hover / Foco.
 * Alto mínimo 44 px (decisión del 13-nov-2026; Figma 40 px). Foco: anillo de latón global.
 * El tipo Texto se subraya al pasar el puntero (decisión del 13-nov-2026).
 */
const estilosBase =
  "texto-boton inline-flex min-h-11 items-center justify-center gap-2 rounded-sm text-center transition-colors duration-150 motion-reduce:transition-none";

const estilosVariante: Record<VarianteBoton, string> = {
  primario: "bg-accion-primaria-fondo px-6 py-3 text-accion-primaria-texto hover:bg-texto-acento",
  // Borde de 1,5 px como sombra interior: Chrome redondea border-width a píxeles enteros.
  // En colores forzados las sombras se eliminan: se pinta un borde real de 1 px con ButtonText.
  secundario:
    "px-6 py-3 text-texto-primario shadow-[inset_0_0_0_1.5px_var(--color-borde-fuerte)] hover:bg-fondo-superficie forced-colors:border forced-colors:border-solid forced-colors:border-[ButtonText]",
  texto: "px-2 py-3 text-texto-acento underline-offset-4 hover:underline",
};

export function clasesBoton(variante: VarianteBoton = "primario", anchoCompleto = false, className?: string) {
  return cn(estilosBase, estilosVariante[variante], anchoCompleto && "w-full", className);
}

export function Boton(props: PropsBoton) {
  if (props.href !== undefined) {
    const { variante, anchoCompleto, icono, children, className, externo, href, ...resto } = props;
    return (
      <a
        href={href}
        className={clasesBoton(variante, anchoCompleto, className)}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...resto}
      >
        {icono}
        {children}
        {externo && <TextoOculto>{AVISO_PESTANA_NUEVA}</TextoOculto>}
      </a>
    );
  }

  const { variante, anchoCompleto, icono, children, className, type = "button", ...resto } = props;
  return (
    <button type={type} className={clasesBoton(variante, anchoCompleto, className)} {...resto}>
      {icono}
      {children}
    </button>
  );
}
