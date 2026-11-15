import { Foto } from "@/componentes/ui/Foto";
import { Seccion } from "@/componentes/ui/Seccion";
import { TextoAdaptable } from "@/componentes/ui/TextoAdaptable";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing } from "@/contenido/landing";
import { CarruselObras } from "./CarruselObras";

/**
 * Obras en ejecución (Figma 16:441 móvil, 19:370 escritorio): carrusel con scroll-snap y controles
 * hasta lg; desde lg, cuadrícula de 4 fotos de 302×400 sin controles.
 */
export function ObrasEnEjecucion() {
  const { titulo, bajada, obras, controles } = landing.obras;
  return (
    <Seccion id={idsSecciones.obras} titulo={titulo} bajada={<TextoAdaptable texto={bajada} />}>
      <CarruselObras etiqueta={`Fotos de ${titulo.toLowerCase()}`} controles={controles}>
        <ul className="flex w-max gap-3 lg:grid lg:w-full lg:grid-cols-4 lg:gap-6">
          {obras.map((obra) => (
            <li key={obra.foto} className="w-[280px] shrink-0 snap-start lg:w-auto">
              <figure className="flex flex-col gap-2.5 lg:gap-3">
                <Foto
                  foto={fotos[obra.foto]}
                  sizes="(min-width: 90rem) 302px, (min-width: 64rem) 22vw, 280px"
                  className="h-[360px] w-[280px] rounded-md lg:aspect-[302/400] lg:h-auto lg:w-full"
                />
                <figcaption className="texto-pequeno text-texto-secundario">{obra.pie}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </CarruselObras>
    </Seccion>
  );
}
