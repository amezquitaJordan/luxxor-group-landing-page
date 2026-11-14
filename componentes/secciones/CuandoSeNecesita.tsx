import { Seccion } from "@/componentes/ui/Seccion";
import { idsSecciones, landing } from "@/contenido/landing";

/** «¿Cuándo necesita su edificación un estudio?» (Figma 15:224): lista con marca de latón. */
export function CuandoSeNecesita() {
  const { titulo, casos } = landing.cuandoSeNecesita;
  return (
    <Seccion id={idsSecciones.cuandoSeNecesita} titulo={titulo} fondo="superficie">
      <ul className="flex flex-col gap-5">
        {casos.map((caso) => (
          <li key={caso} className="texto-cuerpo flex items-start gap-3">
            <span aria-hidden="true" className="mt-3 h-0.5 w-3 shrink-0 bg-detalle-laton" />
            <span className="min-w-0 flex-1">{caso}</span>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
