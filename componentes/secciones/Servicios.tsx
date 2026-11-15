import { FichaServicio } from "@/componentes/fichas/FichaServicio";
import { Seccion } from "@/componentes/ui/Seccion";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing } from "@/contenido/landing";

/** Servicios (Figma 15:184 móvil, 18:216 escritorio): ficha principal y cuatro secundarias (2×2 en md, 4 en lg). */
export function Servicios() {
  const { titulo, bajada, principal, secundarios } = landing.servicios;
  return (
    <Seccion id={idsSecciones.servicios} titulo={titulo} bajada={bajada} className="gap-6">
      <FichaServicio
        jerarquia="principal"
        norma={principal.norma}
        titulo={principal.titulo}
        descripcion={principal.descripcion}
        paraQuien={principal.paraQuien}
        accion={principal.accion}
        imagen={fotos[principal.foto]}
      />
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
        {secundarios.map((servicio) => (
          <FichaServicio key={servicio.titulo} jerarquia="secundaria" {...servicio} />
        ))}
      </div>
    </Seccion>
  );
}
