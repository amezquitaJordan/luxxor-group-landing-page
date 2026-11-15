import { Plus } from "lucide-react";
import { Boton } from "@/componentes/ui/Boton";
import { Seccion, TituloSeccion } from "@/componentes/ui/Seccion";
import { funciones } from "@/config/sitio";
import { idsSecciones, landing } from "@/contenido/landing";

/**
 * Preguntas frecuentes (Figma 17:293 móvil, 20:336 escritorio): <details> nativos, la primera abierta.
 * El ícono + gira 45° (×) al abrir. Desde lg: columna izquierda de 440 px (título y, con el asistente,
 * su texto y botón) y acordeón de 760 px. El asistente aparece con funciones.asistente (Sesión 7):
 * en móvil, debajo de las preguntas; en escritorio, en la columna izquierda.
 */
export function PreguntasFrecuentes() {
  const { titulo, items, introAsistente, asistente } = landing.preguntas;
  return (
    <Seccion
      id={idsSecciones.preguntas}
      tituloPropio
      fondo="superficie"
      className="gap-0 lg:grid lg:grid-cols-[minmax(0,27.5rem)_minmax(0,47.5rem)] lg:items-start lg:justify-between lg:gap-20"
    >
      <div className="flex flex-col gap-6">
        <TituloSeccion id={idsSecciones.preguntas}>{titulo}</TituloSeccion>
        {funciones.asistente && (
          <div className="hidden flex-col items-start gap-6 lg:flex">
            <p className="texto-cuerpo text-texto-secundario">{introAsistente}</p>
            <Boton variante="secundario">{asistente}</Boton>
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col lg:mt-0">
        {items.map((item, indice) => (
          <details key={item.pregunta} open={indice === 0} className="group border-b border-borde-sutil py-[18px] lg:py-[22px]">
            <summary className="texto-cuerpo-fuerte flex cursor-pointer list-none items-start gap-3 lg:gap-4 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1">{item.pregunta}</span>
              <Plus
                aria-hidden
                className="mt-0.5 size-5 shrink-0 transition-transform duration-150 group-open:rotate-45 motion-reduce:transition-none"
                strokeWidth={1.75}
              />
            </summary>
            <p className="texto-cuerpo mt-2.5 text-texto-secundario lg:mt-3 lg:max-w-[43.75rem]">{item.respuesta}</p>
          </details>
        ))}
      </div>
      {funciones.asistente && (
        <Boton variante="secundario" anchoCompleto className="mt-5 lg:hidden">
          {asistente}
        </Boton>
      )}
    </Seccion>
  );
}
