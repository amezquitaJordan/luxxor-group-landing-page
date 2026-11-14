import { FichaProyecto } from "@/componentes/fichas/FichaProyecto";
import { Seccion } from "@/componentes/ui/Seccion";
import { funciones } from "@/config/sitio";
import { idsSecciones, landing, resolverTexto } from "@/contenido/landing";

/** Proyectos (Figma 16:462): fichas con datos del portafolio, sin foto hasta que el cliente confirme. */
export function Proyectos() {
  const { titulo, bajada, fichas } = landing.proyectos;
  return (
    <Seccion id={idsSecciones.proyectos} titulo={titulo} fondo="superficie">
      <p className="texto-cuerpo text-texto-secundario">{bajada}</p>
      <ul className="flex flex-col gap-5">
        {fichas.map((ficha) => (
          <li key={ficha.dato.cifra}>
            <FichaProyecto
              tipologia={ficha.tipologia}
              titulo={resolverTexto(ficha.titulo, funciones.nombresClientes)}
              dato={ficha.dato}
            />
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
