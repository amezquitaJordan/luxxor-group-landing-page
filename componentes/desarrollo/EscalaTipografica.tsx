"use client";

import { useEffect, useRef, useState } from "react";

const estilos = [
  { clase: "texto-display", nombre: "display", figma: "40 → 64 px" },
  { clase: "texto-h1", nombre: "h1", figma: "32 → 48 px" },
  { clase: "texto-h2", nombre: "h2", figma: "26 → 36 px" },
  { clase: "texto-h3", nombre: "h3", figma: "20 → 24 px" },
  { clase: "texto-cuerpo-lg", nombre: "cuerpo-lg", figma: "18 → 20 px" },
  { clase: "texto-cuerpo", nombre: "cuerpo", figma: "16 → 18 px" },
  { clase: "texto-cuerpo-fuerte", nombre: "cuerpo-fuerte", figma: "16 → 18 px" },
  { clase: "texto-pequeno", nombre: "pequeño", figma: "14 → 15 px" },
  { clase: "texto-dato", nombre: "dato", figma: "32 → 56 px" },
  { clase: "texto-boton", nombre: "boton", figma: "16 px" },
  { clase: "texto-anotacion", nombre: "anotacion", figma: "14 → 15 px (decisión; Figma 12 → 13)" },
  { clase: "texto-eje", nombre: "eje", figma: "12 px (decorativo)" },
] as const;

/** Escala tipográfica con el tamaño calculado en vivo (cambia al redimensionar). */
export function EscalaTipografica() {
  const lista = useRef<HTMLUListElement>(null);
  const [tamanos, setTamanos] = useState<Record<string, string>>({});

  useEffect(() => {
    const nodo = lista.current;
    if (!nodo) return;
    const medir = () => {
      const resultado: Record<string, string> = {};
      nodo.querySelectorAll<HTMLElement>("[data-estilo]").forEach((muestra) => {
        const calculado = getComputedStyle(muestra);
        resultado[muestra.dataset.estilo!] =
          `${parseFloat(calculado.fontSize).toFixed(1)} px · ${calculado.fontWeight} · ${calculado.lineHeight}`;
      });
      setTamanos(resultado);
    };
    const id = requestAnimationFrame(medir);
    window.addEventListener("resize", medir);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", medir);
    };
  }, []);

  return (
    <ul ref={lista} className="flex flex-col divide-y divide-borde-sutil">
      {estilos.map(({ clase, nombre, figma }) => (
        <li key={clase} className="grid gap-2 py-4 md:grid-cols-[12rem_1fr]">
          <div className="flex flex-col">
            <span className="texto-pequeno">{nombre}</span>
            <span className="texto-anotacion text-texto-secundario">Figma: {figma}</span>
            <span className="texto-anotacion text-texto-laton" data-medida={clase}>
              {tamanos[clase] ?? "…"}
            </span>
          </div>
          <p className={clase} data-estilo={clase}>
            {nombre === "dato" ? "130 t · +20 · 3" : nombre === "eje" ? "A B C 1 2 3" : "Sabemos cómo se comporta su edificación ante un sismo."}
          </p>
        </li>
      ))}
    </ul>
  );
}
