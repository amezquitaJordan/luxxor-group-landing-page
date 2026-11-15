import { DibujoPlano } from "@/componentes/ui/DibujoPlano";
import { Foto } from "@/componentes/ui/Foto";
import { Seccion } from "@/componentes/ui/Seccion";
import { TextoAdaptable } from "@/componentes/ui/TextoAdaptable";
import { funciones } from "@/config/sitio";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing, resolverFoto, resolverResponsivo } from "@/contenido/landing";

/**
 * Complementarios (Figma 16:496 móvil, 19:423 escritorio). Móvil: fila con foto de 112 px; sin foto,
 * la columna queda vacía. Desde lg: tres tarjetas con foto de 411×300 arriba; sin foto, un dibujo
 * decorativo de plano en esa caja.
 */
export function Complementarios() {
  const { titulo, bajada, items } = landing.complementarios;
  return (
    <Seccion id={idsSecciones.complementarios} titulo={titulo} bajada={bajada} estiloTitulo="h2">
      <ul className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-6">
        {items.map((item) => {
          const idFoto = resolverFoto(item.foto, funciones.nombresClientes);
          return (
            <li key={item.titulo} className="flex items-center gap-4 lg:flex-col lg:items-stretch lg:gap-3">
              {idFoto ? (
                <Foto
                  foto={fotos[idFoto]}
                  sizes="(min-width: 90rem) 411px, (min-width: 64rem) 30vw, 112px"
                  className="size-28 shrink-0 rounded-md lg:aspect-[411/300] lg:size-auto lg:w-full"
                />
              ) : (
                <>
                  {/* Sin foto aprobada: columna vacía en móvil (títulos alineados) y dibujo de plano en escritorio. */}
                  <span aria-hidden="true" data-sin-foto="" className="size-28 shrink-0 lg:hidden" />
                  <DibujoPlano className="hidden aspect-[411/300] w-full lg:block" />
                </>
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-1 lg:gap-3">
                <h3 className="texto-h3">{item.titulo}</h3>
                <p className="texto-pequeno text-texto-secundario lg:texto-cuerpo">
                  <TextoAdaptable texto={resolverResponsivo(item.descripcion, funciones.nombresClientes)} />
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Seccion>
  );
}
