import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EscalaTipografica } from "@/componentes/desarrollo/EscalaTipografica";
import { MuestrasColor } from "@/componentes/desarrollo/MuestrasColor";
import { BotonTema } from "@/componentes/tema/BotonTema";
import { SelectorTema } from "@/componentes/tema/SelectorTema";

/*
 * Galería de componentes (solo desarrollo y pruebas visuales).
 * Este archivo usa la extensión .dev.tsx: next.config.ts solo lo compila con NODE_ENV=development
 * o GALERIA_COMPONENTES=1. Defensa adicional: notFound() en el entorno de producción de Vercel.
 */

export const metadata: Metadata = {
  title: "Galería de componentes · desarrollo",
  robots: { index: false, follow: false },
};

const espacios = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32] as const;
const radios = [
  { nombre: "radio/0", clase: "rounded-none", valor: "0" },
  { nombre: "radio/sm", clase: "rounded-sm", valor: "2" },
  { nombre: "radio/md", clase: "rounded-md", valor: "4" },
  { nombre: "radio/lg", clase: "rounded-lg", valor: "8" },
  { nombre: "radio/completo", clase: "rounded-full", valor: "999" },
] as const;

function Seccion({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="flex flex-col gap-6 border-t border-borde-sutil py-12">
      <h2 id={`${id}-titulo`} className="texto-h2">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export default function GaleriaComponentes() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <main className="mx-auto flex max-w-[80rem] flex-col px-5 py-12 md:px-8 lg:px-20">
      <header className="flex items-start justify-between gap-4 pb-8">
        <div className="flex flex-col gap-2">
          <p className="texto-anotacion text-texto-laton">Desarrollo · no se publica</p>
          <h1 className="texto-h1">Galería de componentes</h1>
          <p className="texto-cuerpo text-texto-secundario">Tokens, tipografía y tema tomados de Figma (01 · Fundamentos y 02 · Componentes).</p>
        </div>
        <BotonTema />
      </header>

      <Seccion id="color" titulo="Color semántico">
        <div className="grid gap-6 lg:grid-cols-2">
          <MuestrasColor titulo="Tema actual" />
          <div data-theme="dark">
            <MuestrasColor titulo="Forzado a Oscuro" />
          </div>
        </div>
      </Seccion>

      <Seccion id="tipografia" titulo="Tipografía · Opción A «Plano técnico»">
        <div className="flex max-w-[44rem] flex-col gap-5 rounded-md bg-fondo-superficie p-8" data-muestra="opcion-a">
          <p className="texto-display">Sabemos cómo se comporta su edificación ante un sismo.</p>
          <p className="texto-h3">Evaluación de vulnerabilidad sísmica</p>
          <p className="texto-cuerpo text-texto-secundario">
            Determinamos qué tan preparada está una edificación existente para el sismo de diseño: levantamiento
            estructural, ensayos a los materiales, modelo analítico y un concepto claro sobre si necesita reforzamiento y
            cuánto cuesta.
          </p>
          <dl className="flex gap-10">
            {[
              ["130 t", "de acero diseñado y montado"],
              ["+20", "proyectos"],
              ["NSR-10", "A.10"],
            ].map(([cifra, descripcion]) => (
              <div key={cifra} className="flex flex-col gap-1">
                <dt className="texto-dato order-1">{cifra}</dt>
                <dd className="texto-pequeno order-2 text-texto-secundario">{descripcion}</dd>
              </div>
            ))}
          </dl>
        </div>
        <EscalaTipografica />
      </Seccion>

      <Seccion id="espacio" titulo="Espacio y radio">
        <ul className="flex flex-wrap items-end gap-6">
          {espacios.map((n) => (
            <li key={n} className="flex flex-col items-center gap-1.5">
              <span className="block bg-texto-acento" style={{ width: `var(--esp-espacio-${n})`, height: `var(--esp-espacio-${n})` }} />
              <span className="texto-anotacion text-texto-secundario">
                {n} · {n * 4}
              </span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-8">
          {radios.map(({ nombre, clase, valor }) => (
            <li key={nombre} className="flex flex-col items-center gap-1.5">
              <span className={`block h-16 w-24 border border-borde-fuerte bg-fondo-superficie ${clase}`} />
              <span className="texto-anotacion text-texto-secundario">
                {nombre} · {valor}
              </span>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion id="tema" titulo="Tema">
        <div className="flex flex-col gap-3" data-muestra="boton-tema">
          <p className="texto-pequeno text-texto-secundario">Botón de tema (encabezado)</p>
          <BotonTema />
        </div>
        <div className="flex flex-col gap-3" data-muestra="selector-tema">
          <p id="titulo-apariencia" className="texto-pequeno text-texto-secundario">
            Apariencia
          </p>
          <SelectorTema idEtiqueta="titulo-apariencia" />
        </div>
      </Seccion>
    </main>
  );
}
