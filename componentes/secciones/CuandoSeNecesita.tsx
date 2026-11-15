import { Foto } from "@/componentes/ui/Foto";
import { Seccion, TituloSeccion } from "@/componentes/ui/Seccion";
import { fotos } from "@/contenido/fotos";
import { idsSecciones, landing } from "@/contenido/landing";

/**
 * «¿Cuándo necesita su edificación un estudio?» (Figma 15:224 móvil, 19:233 escritorio).
 * Desde lg: foto 6 a la izquierda (oculta con display: none en móvil: la carga diferida no la descarga)
 * y, a la derecha, título, introducción (solo Figma 04) y la lista con marca de latón.
 */
export function CuandoSeNecesita() {
  const { titulo, introduccion, foto, casos } = landing.cuandoSeNecesita;
  return (
    <Seccion id={idsSecciones.cuandoSeNecesita} tituloPropio fondo="superficie">
      <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">
        <Foto
          foto={fotos[foto]}
          sizes="(min-width: 90rem) 600px, 40vw"
          className="hidden aspect-[600/450] w-full rounded-md lg:block"
        />
        <div className="flex flex-col gap-5">
          <TituloSeccion id={idsSecciones.cuandoSeNecesita}>{titulo}</TituloSeccion>
          <p className="texto-cuerpo hidden text-texto-secundario lg:block">{introduccion}</p>
          <ul className="flex flex-col gap-5 lg:gap-0">
            {casos.map((caso) => (
              <li key={caso} className="texto-cuerpo flex items-start gap-3 lg:gap-3.5 lg:py-3">
                <span aria-hidden="true" className="mt-3 h-0.5 w-3 shrink-0 bg-detalle-laton lg:mt-[0.8125rem] lg:w-3.5" />
                <span className="min-w-0 flex-1">{caso}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Seccion>
  );
}
