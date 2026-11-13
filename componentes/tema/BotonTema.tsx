"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMontado } from "@/lib/hooks/useMontado";

/**
 * Botón de tema (Figma 21:346): 44×44, borde borde/sutil, radio 2 px, ícono de 20 px.
 * Luna en modo claro («Cambiar a modo oscuro»), sol en modo oscuro («Cambiar a modo claro»).
 * El ícono lo decide el CSS según data-theme, así que no hay desajuste de hidratación.
 */
export function BotonTema() {
  const { resolvedTheme, setTheme } = useTheme();
  const montado = useMontado();
  const esOscuro = montado && resolvedTheme === "dark";
  const etiqueta = !montado
    ? "Cambiar tema"
    : esOscuro
      ? "Cambiar a modo claro"
      : "Cambiar a modo oscuro";

  function alternar() {
    const actual = document.documentElement.getAttribute("data-theme");
    setTheme(actual === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={etiqueta}
      className="inline-flex size-11 items-center justify-center rounded-sm border border-borde-sutil text-texto-primario"
    >
      <Moon aria-hidden className="size-5 dark:hidden" strokeWidth={1.75} />
      <Sun aria-hidden className="hidden size-5 dark:block" strokeWidth={1.75} />
    </button>
  );
}
