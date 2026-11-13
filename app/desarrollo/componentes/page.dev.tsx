import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EscalaTipografica } from "@/componentes/desarrollo/EscalaTipografica";
import { MuestrasColor } from "@/componentes/desarrollo/MuestrasColor";
import { FichaEnsayo } from "@/componentes/fichas/FichaEnsayo";
import { FichaProyecto } from "@/componentes/fichas/FichaProyecto";
import { FichaServicio } from "@/componentes/fichas/FichaServicio";
import { PasoMetodologia } from "@/componentes/fichas/PasoMetodologia";
import { BotonTema } from "@/componentes/tema/BotonTema";
import { SelectorTema } from "@/componentes/tema/SelectorTema";
import { Boton } from "@/componentes/ui/Boton";
import { BotonWhatsApp } from "@/componentes/ui/BotonWhatsApp";
import { Chip } from "@/componentes/ui/Chip";
import { Cota } from "@/componentes/ui/Cota";
import { Dato } from "@/componentes/ui/Dato";
import { Eje } from "@/componentes/ui/Eje";
import { ID_CONTENIDO } from "@/contenido/navegacion";

/*
 * Galería de componentes (solo desarrollo y pruebas visuales).
 * Este archivo usa la extensión .dev.tsx: next.config.ts solo lo compila con NODE_ENV=development
 * o GALERIA_COMPONENTES=1. Defensa adicional: notFound() en el entorno de producción de Vercel.
 * Los textos de muestra son los de los componentes de Figma (02 · Componentes).
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

function Muestra({ nombre, children }: { nombre: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="texto-anotacion text-texto-secundario">{nombre}</p>
      <div data-componente={nombre} className="inline-flex p-1.5">
        {children}
      </div>
    </div>
  );
}

export default function GaleriaComponentes() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <main id={ID_CONTENIDO} tabIndex={-1} className="mx-auto flex max-w-[80rem] flex-col px-5 py-12 focus:outline-none md:px-8 lg:px-20">
      <header className="flex flex-col gap-2 pb-8">
        <p className="texto-anotacion text-texto-laton">Desarrollo · no se publica</p>
        <h1 className="texto-h1">Galería de componentes</h1>
        <p className="texto-cuerpo text-texto-secundario">Tokens, tipografía y componentes tomados de Figma (01 · Fundamentos y 02 · Componentes).</p>
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
          <div className="flex flex-wrap gap-10">
            <Dato cifra="130 t" descripcion="de acero diseñado y montado" />
            <Dato cifra="+20" descripcion="proyectos" />
            <Dato cifra="NSR-10" descripcion="A.10" />
          </div>
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

      <Seccion id="botones" titulo="Botón (10:50) y Botón WhatsApp (10:62)">
        <div className="flex flex-wrap gap-6">
          <Muestra nombre="boton-primario">
            <Boton href="#botones">Agendar visita técnica</Boton>
          </Muestra>
          <Muestra nombre="boton-secundario">
            <Boton href="#botones" variante="secundario">
              Agendar visita técnica
            </Boton>
          </Muestra>
          <Muestra nombre="boton-texto">
            <Boton href="#botones" variante="texto">
              Agendar visita técnica
            </Boton>
          </Muestra>
          <Muestra nombre="boton-whatsapp">
            <BotonWhatsApp />
          </Muestra>
        </div>
      </Seccion>

      <Seccion id="varios" titulo="Chip (10:66), Dato (10:68), Eje (10:75) y Cota (10:79)">
        <div className="flex flex-wrap items-start gap-10">
          <Muestra nombre="chip">
            <Chip>Edificios en P.H.</Chip>
          </Muestra>
          <Muestra nombre="dato">
            <div className="w-[220px]">
              <Dato cifra="130 t" descripcion="de estructura metálica diseñada y montada" />
            </div>
          </Muestra>
          <Muestra nombre="eje">
            <Eje letra="A" />
          </Muestra>
          <Muestra nombre="cota">
            <div className="w-[480px] max-w-[80vw]">
              <Cota medida="6,00 m" />
            </div>
          </Muestra>
        </div>
      </Seccion>

      <Seccion id="fichas" titulo="Fichas (11:32, 11:34, 11:43) y fila de ensayo (19:318)">
        <div data-componente="ficha-servicio-principal">
          <FichaServicio
            jerarquia="principal"
            norma="Servicio principal · NSR-10 Título A, Capítulo A.10"
            titulo="Evaluación de vulnerabilidad sísmica"
            descripcion="Determinamos qué tan preparada está una edificación existente para el sismo de diseño: levantamiento estructural, ensayos a los materiales, modelo analítico, índices de sobreesfuerzo y flexibilidad, y un concepto claro sobre si necesita reforzamiento y cuánto cuesta."
            paraQuien={["Edificios en P.H.", "Colegios y clínicas", "Edificaciones previas a 2010", "Cambios de uso y ampliaciones", "Post-sismo"]}
            accion={{ etiqueta: "Ver la metodología", href: "#fichas" }}
          />
        </div>
        <div className="flex flex-wrap gap-6">
          <div data-componente="ficha-servicio-secundaria" className="w-[392px] max-w-full">
            <FichaServicio
              jerarquia="secundaria"
              titulo="Modelado y análisis estructural"
              descripcion="Modelos 3D por elementos finitos: análisis modal espectral, control de derivas y escenarios de reforzamiento comparados antes de construir."
              entregable="Entrega: modelo analítico y memoria de cálculo"
            />
          </div>
          <div data-componente="ficha-proyecto" className="w-[392px] max-w-full">
            <FichaProyecto
              tipologia="Estructura metálica"
              titulo="Bodega Interplásticos"
              dato={{ cifra: "60 t", descripcion: "Ampliación en estructura metálica" }}
            />
          </div>
          <ol data-componente="paso-metodologia" className="w-[240px]">
            <PasoMetodologia numero={1} titulo="Información" descripcion="Planos, estudios de suelos, licencias y antecedentes de la edificación." />
          </ol>
        </div>
        <ul data-componente="ficha-ensayo" className="max-w-[680px]">
          <FichaEnsayo referencia="ASTM C42" titulo="Extracción de núcleos" descripcion="Resistencia real f'c del concreto en laboratorio." />
          <FichaEnsayo referencia="ASTM C805" titulo="Esclerometría" descripcion="Uniformidad del concreto y dónde extraer núcleos." />
        </ul>
      </Seccion>

      <Seccion id="tema" titulo="Tema (21:346 y 21:611)">
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
