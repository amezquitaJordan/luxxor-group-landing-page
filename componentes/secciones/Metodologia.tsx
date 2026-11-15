import { PasoMetodologia } from "@/componentes/fichas/PasoMetodologia";
import { Foto } from "@/componentes/ui/Foto";
import { Seccion } from "@/componentes/ui/Seccion";
import { TextoAdaptable } from "@/componentes/ui/TextoAdaptable";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing } from "@/contenido/landing";

/**
 * Metodología (Figma 16:338 móvil, 19:254 escritorio): seis pasos numerados con cota; 2 columnas en md
 * y 6 en fila desde lg. La foto 13 solo está en Figma 03 (oculta desde lg, no se descarga).
 */
export function Metodologia() {
  const { titulo, bajada, foto, pasos } = landing.metodologia;
  return (
    <Seccion id={idsSecciones.metodologia} titulo={titulo} bajada={<TextoAdaptable texto={bajada} />} className="gap-6 lg:gap-12">
      <Foto foto={fotos[foto]} sizes="calc(100vw - 40px)" className="aspect-[350/260] w-full rounded-md lg:hidden" />
      <ol className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-6">
        {pasos.map((paso, indice) => (
          <PasoMetodologia key={paso.titulo} numero={indice + 1} total={pasos.length} {...paso} />
        ))}
      </ol>
    </Seccion>
  );
}
