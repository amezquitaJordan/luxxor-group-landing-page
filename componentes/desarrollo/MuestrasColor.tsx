"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/** Tokens semánticos de Figma (colección Color) + accion/whatsapp/texto (solo código). */
export const tokensColor = [
  "fondo/base",
  "fondo/superficie",
  "fondo/elevado",
  "fondo/invertido",
  "texto/primario",
  "texto/secundario",
  "texto/invertido",
  "texto/acento",
  "texto/laton",
  "borde/sutil",
  "borde/fuerte",
  "detalle/laton",
  "accion/primaria/fondo",
  "accion/primaria/texto",
  "accion/whatsapp",
  "accion/whatsapp/texto",
  "grafico/excede",
  "grafico/cerca",
  "grafico/cumple",
] as const;

const aVariable = (token: string) => `--color-${token.replaceAll("/", "-")}`;

function aHex(rgb: string): string {
  const partes = rgb.match(/\d+/g);
  if (!partes) return rgb;
  return (
    "#" +
    partes
      .slice(0, 3)
      .map((p) => Number(p).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

/** Muestras con el valor resuelto en vivo (getComputedStyle) para compararlo con Figma. */
export function MuestrasColor({ titulo }: { titulo: string }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [valores, setValores] = useState<Record<string, string>>({});

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;
    // Se espera un fotograma para leer los estilos ya aplicados tras un cambio de tema.
    const id = requestAnimationFrame(() => {
      const resultado: Record<string, string> = {};
      nodo.querySelectorAll<HTMLElement>("[data-token]").forEach((muestra) => {
        resultado[muestra.dataset.token!] = aHex(getComputedStyle(muestra).backgroundColor);
      });
      setValores(resultado);
    });
    return () => cancelAnimationFrame(id);
  }, [resolvedTheme]);

  return (
    <div ref={contenedor} className="rounded-md border border-borde-sutil bg-fondo-base p-6 text-texto-primario">
      <h3 className="texto-h3 mb-6">{titulo}</h3>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {tokensColor.map((token) => (
          <li key={token} className="flex flex-col gap-1.5">
            <span
              data-token={token}
              className="h-14 rounded-md border border-borde-sutil"
              style={{ backgroundColor: `var(${aVariable(token)})` }}
            />
            <span className="texto-pequeno">{token}</span>
            <code className="texto-anotacion text-texto-secundario" data-valor={token}>
              {valores[token] ?? "…"}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}
