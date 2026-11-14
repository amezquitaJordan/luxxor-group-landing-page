import { PasoMetodologia } from "@/componentes/fichas/PasoMetodologia";
import { Foto } from "@/componentes/ui/Foto";
import { Seccion } from "@/componentes/ui/Seccion";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing } from "@/contenido/landing";

/** Metodología (Figma 16:338): seis pasos numerados con cota. */
export function Metodologia() {
  const { titulo, bajada, foto, pasos } = landing.metodologia;
  return (
    <Seccion id={idsSecciones.metodologia} titulo={titulo} className="gap-6">
      <p className="texto-cuerpo text-texto-secundario">{bajada}</p>
      <Foto foto={fotos[foto]} sizes="calc(100vw - 40px)" className="aspect-[350/260] w-full rounded-md" />
      <ol className="flex flex-col gap-6">
        {pasos.map((paso, indice) => (
          <PasoMetodologia key={paso.titulo} numero={indice + 1} total={pasos.length} {...paso} />
        ))}
      </ol>
    </Seccion>
  );
}
