"use client";

import { useRef, type KeyboardEvent } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMontado } from "@/lib/hooks/useMontado";

const opciones = [
  { valor: "light", etiqueta: "Claro", Icono: Sun },
  { valor: "dark", etiqueta: "Oscuro", Icono: Moon },
  { valor: "system", etiqueta: "Sistema", Icono: Monitor },
] as const;

const pasos: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

/**
 * Selector de tema (Figma 21:611): radiogroup con Claro / Oscuro / Sistema.
 * Teclado: flechas, Inicio y Fin; foco itinerante (solo la opción activa tiene tabIndex 0).
 * «Sistema» sigue prefers-color-scheme. La opción activa refleja la elección del usuario.
 */
export function SelectorTema({ idEtiqueta }: { idEtiqueta: string }) {
  const { theme, setTheme } = useTheme();
  const montado = useMontado();
  const activo = montado ? (theme ?? "system") : null;
  const botones = useRef<(HTMLButtonElement | null)[]>([]);

  function alTeclear(evento: KeyboardEvent<HTMLButtonElement>, indice: number) {
    let destino: number | null = null;
    if (evento.key in pasos) destino = (indice + pasos[evento.key] + opciones.length) % opciones.length;
    if (evento.key === "Home") destino = 0;
    if (evento.key === "End") destino = opciones.length - 1;
    if (destino === null) return;
    evento.preventDefault();
    setTheme(opciones[destino].valor);
    botones.current[destino]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-labelledby={idEtiqueta}
      className="grid w-full max-w-[350px] grid-cols-3 rounded-sm border border-borde-sutil"
    >
      {opciones.map(({ valor, etiqueta, Icono }, indice) => {
        const marcado = activo === valor;
        const enfocable = marcado || (activo === null && valor === "system");
        return (
          <button
            key={valor}
            ref={(elemento) => {
              botones.current[indice] = elemento;
            }}
            type="button"
            role="radio"
            aria-checked={marcado}
            tabIndex={enfocable ? 0 : -1}
            onClick={() => setTheme(valor)}
            onKeyDown={(evento) => alTeclear(evento, indice)}
            className={cn(
              "texto-pequeno inline-flex h-11 items-center justify-center gap-2",
              marcado
                ? "bg-accion-primaria-fondo text-accion-primaria-texto"
                : "text-texto-primario",
            )}
          >
            <Icono aria-hidden className="size-5" strokeWidth={1.75} />
            {etiqueta}
          </button>
        );
      })}
    </div>
  );
}
