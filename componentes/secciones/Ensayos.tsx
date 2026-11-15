import { FichaEnsayo } from "@/componentes/fichas/FichaEnsayo";
import { Foto } from "@/componentes/ui/Foto";
import { Seccion, TituloSeccion } from "@/componentes/ui/Seccion";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing } from "@/contenido/landing";

/**
 * Ensayos en sitio (Figma 16:401 móvil, 19:318 escritorio). Desde lg: columna de 520 px (título,
 * bajada y foto 16) y columna de 680 px (nueve ensayos y «Lo que usted recibe»).
 */
export function Ensayos() {
  const { titulo, bajada, foto, lista, entregables } = landing.ensayos;
  return (
    <Seccion
      id={idsSecciones.ensayos}
      tituloPropio
      fondo="superficie"
      className="lg:grid lg:grid-cols-[minmax(0,32.5rem)_minmax(0,42.5rem)] lg:items-start lg:justify-between lg:gap-20"
    >
      <div className="flex flex-col gap-5 lg:gap-6">
        <TituloSeccion id={idsSecciones.ensayos}>{titulo}</TituloSeccion>
        <p className="texto-cuerpo text-texto-secundario">{bajada}</p>
        <Foto
          foto={fotos[foto]}
          sizes="(min-width: 90rem) 520px, (min-width: 64rem) 40vw, calc(100vw - 40px)"
          className="aspect-[350/300] w-full rounded-md lg:aspect-[520/560]"
        />
      </div>
      <div className="flex flex-col gap-5 lg:gap-8">
        <ul aria-label="Ensayos">
          {lista.map((ensayo) => (
            <FichaEnsayo key={ensayo.titulo} {...ensayo} />
          ))}
        </ul>
        <div className="flex flex-col gap-2.5 rounded-md bg-fondo-base p-5 lg:p-7">
          <h3 className="texto-h3">{entregables.titulo}</h3>
          <ul className="flex flex-col gap-2.5">
            {entregables.items.map((item) => (
              <li key={item} className="texto-cuerpo text-texto-secundario">
                <span aria-hidden="true">— </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Seccion>
  );
}
