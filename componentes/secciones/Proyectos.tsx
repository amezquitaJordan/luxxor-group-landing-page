import { FichaProyecto } from "@/componentes/fichas/FichaProyecto";
import { Seccion } from "@/componentes/ui/Seccion";
import { funciones } from "@/config/sitio";
import { idsSecciones, landing, resolverTexto } from "@/contenido/landing";

/**
 * Proyectos (Figma 16:462 móvil, 19:387 escritorio): fichas con datos del portafolio, sin foto hasta que
 * el cliente confirme; 2 columnas en md y 3 desde lg.
 */
export function Proyectos() {
  const { titulo, bajada, fichas } = landing.proyectos;
  return (
    <Seccion id={idsSecciones.proyectos} titulo={titulo} bajada={bajada} fondo="superficie">
      <ul className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
