import { FichaEnsayo } from "@/componentes/fichas/FichaEnsayo";
import { Foto } from "@/componentes/ui/Foto";
import { Seccion } from "@/componentes/ui/Seccion";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing } from "@/contenido/landing";

/** Ensayos en sitio (Figma 16:401): foto, nueve ensayos y «Lo que usted recibe». */
export function Ensayos() {
  const { titulo, bajada, foto, lista, entregables } = landing.ensayos;
  return (
    <Seccion id={idsSecciones.ensayos} titulo={titulo} fondo="superficie">
      <p className="texto-cuerpo text-texto-secundario">{bajada}</p>
      <Foto foto={fotos[foto]} sizes="calc(100vw - 40px)" className="aspect-[350/300] w-full rounded-md" />
      <ul aria-label="Ensayos">
        {lista.map((ensayo) => (
          <FichaEnsayo key={ensayo.titulo} {...ensayo} />
        ))}
      </ul>
      <div className="flex flex-col gap-2.5 rounded-md bg-fondo-base p-5">
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
    </Seccion>
  );
}
