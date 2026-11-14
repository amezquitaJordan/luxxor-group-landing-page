import { Foto } from "@/componentes/ui/Foto";
import { Seccion } from "@/componentes/ui/Seccion";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing } from "@/contenido/landing";
import { CarruselObras } from "./CarruselObras";

/** Obras en ejecución (Figma 16:441): carrusel con scroll-snap y controles Anterior/Siguiente. */
export function ObrasEnEjecucion() {
  const { titulo, bajada, obras, controles } = landing.obras;
  return (
    <Seccion id={idsSecciones.obras} titulo={titulo}>
      <p className="texto-cuerpo text-texto-secundario">{bajada}</p>
      <CarruselObras etiqueta={`Fotos de ${titulo.toLowerCase()}`} controles={controles}>
        <ul className="flex w-max gap-3">
          {obras.map((obra) => (
            <li key={obra.foto} className="w-[280px] shrink-0 snap-start">
              <figure className="flex flex-col gap-2.5">
                <Foto foto={fotos[obra.foto]} sizes="280px" className="h-[360px] w-[280px] rounded-md" />
                <figcaption className="texto-pequeno text-texto-secundario">{obra.pie}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </CarruselObras>
    </Seccion>
  );
}
