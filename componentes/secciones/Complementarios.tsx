import { Foto } from "@/componentes/ui/Foto";
import { Seccion } from "@/componentes/ui/Seccion";
import { funciones } from "@/config/sitio";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing, resolverFoto, resolverTexto } from "@/contenido/landing";

/** Complementarios (Figma 16:496): foto de 112 px y texto. Sin foto, la columna queda vacía. */
export function Complementarios() {
  const { titulo, bajada, items } = landing.complementarios;
  return (
    <Seccion id={idsSecciones.complementarios} titulo={titulo} estiloTitulo="h2">
      <p className="texto-cuerpo text-texto-secundario">{bajada}</p>
      <ul className="flex flex-col gap-5">
        {items.map((item) => {
          const idFoto = resolverFoto(item.foto, funciones.nombresClientes);
          return (
            <li key={item.titulo} className="flex items-center gap-4">
              {idFoto ? (
                <Foto foto={fotos[idFoto]} sizes="112px" className="size-28 shrink-0 rounded-md" />
              ) : (
                // Sin foto aprobada: la columna se conserva vacía (sin recuadro) para alinear los títulos.
                <span aria-hidden="true" data-sin-foto="" className="size-28 shrink-0" />
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="texto-h3">{item.titulo}</h3>
                <p className="texto-pequeno text-texto-secundario">
                  {resolverTexto(item.descripcion, funciones.nombresClientes)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Seccion>
  );
}
