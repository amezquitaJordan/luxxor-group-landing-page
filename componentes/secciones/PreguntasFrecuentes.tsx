import { Plus } from "lucide-react";
import { Boton } from "@/componentes/ui/Boton";
import { Seccion } from "@/componentes/ui/Seccion";
import { funciones } from "@/config/sitio";
import { idsSecciones, landing } from "@/contenido/landing";

/**
 * Preguntas frecuentes (Figma 17:293): <details> nativos, la primera abierta.
 * El ícono + gira 45° (×) al abrir. «Preguntar al asistente» aparece con funciones.asistente (Sesión 7).
 */
export function PreguntasFrecuentes() {
  const { titulo, items, asistente } = landing.preguntas;
  return (
    <Seccion id={idsSecciones.preguntas} titulo={titulo} fondo="superficie" className="gap-0">
      <div className="mt-5 flex flex-col">
        {items.map((item, indice) => (
          <details key={item.pregunta} open={indice === 0} className="group border-b border-borde-sutil py-[18px]">
            <summary className="texto-cuerpo-fuerte flex cursor-pointer list-none items-start gap-3 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1">{item.pregunta}</span>
              <Plus
                aria-hidden
                className="mt-0.5 size-5 shrink-0 transition-transform duration-150 group-open:rotate-45 motion-reduce:transition-none"
                strokeWidth={1.75}
              />
            </summary>
            <p className="texto-cuerpo mt-2.5 text-texto-secundario">{item.respuesta}</p>
          </details>
        ))}
      </div>
      {funciones.asistente && (
        <Boton variante="secundario" anchoCompleto className="mt-5">
          {asistente}
        </Boton>
      )}
    </Seccion>
  );
}
