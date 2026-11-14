import { FichaServicio } from "@/componentes/fichas/FichaServicio";
import { Seccion } from "@/componentes/ui/Seccion";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing } from "@/contenido/landing";

/** Servicios (Figma 15:184): ficha principal (vulnerabilidad) y cuatro secundarias. */
export function Servicios() {
  const { titulo, bajada, principal, secundarios } = landing.servicios;
  return (
    <Seccion id={idsSecciones.servicios} titulo={titulo} className="gap-6">
      <p className="texto-cuerpo text-texto-secundario">{bajada}</p>
      <FichaServicio
        jerarquia="principal"
        norma={principal.norma}
        titulo={principal.titulo}
        descripcion={principal.descripcion}
        paraQuien={principal.paraQuien}
        accion={principal.accion}
        imagen={fotos[principal.foto]}
      />
      {secundarios.map((servicio) => (
        <FichaServicio key={servicio.titulo} jerarquia="secundaria" {...servicio} />
      ))}
    </Seccion>
  );
}
