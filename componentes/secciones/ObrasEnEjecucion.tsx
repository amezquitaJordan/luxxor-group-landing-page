import { Foto } from "@/componentes/ui/Foto";
import { Seccion } from "@/componentes/ui/Seccion";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing } from "@/contenido/landing";

/**
 * Obras en ejecución (Figma 16:441): fila con desplazamiento horizontal y scroll-snap.
 * La región es enfocable para poder desplazarla con el teclado. Los botones Anterior/Siguiente
 * llegan en la Sesión 4b.
 */
export function ObrasEnEjecucion() {
  const { titulo, bajada, obras } = landing.obras;
  return (
    <Seccion id={idsSecciones.obras} titulo={titulo}>
      <p className="texto-cuerpo text-texto-secundario">{bajada}</p>
      <div
        role="region"
        aria-label={`Fotos de ${titulo.toLowerCase()}`}
        tabIndex={0}
        className="-mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-2 md:-mx-8 md:scroll-px-8 md:px-8"
      >
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
      </div>
    </Seccion>
  );
}
