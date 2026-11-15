import { Seccion } from "@/componentes/ui/Seccion";
import { idsSecciones, landing } from "@/contenido/landing";

/**
 * Dirección técnica (Figma 17:270 móvil; 20:314 escritorio, columna izquierda de la banda con Descargas).
 * Matrícula y fotos pendientes del cliente (no se muestran).
 */
export function DireccionTecnica({ enBanda = false }: { enBanda?: boolean }) {
  const { titulo, personas } = landing.equipo;
  return (
    <Seccion id={idsSecciones.equipo} titulo={titulo} fondo="superficie" enBanda={enBanda} className="lg:gap-0">
      <ul>
        {personas.map((persona) => (
          <li key={persona.nombre} className="flex flex-col gap-1.5 border-t border-borde-sutil py-4 lg:py-6">
            <h3 className="texto-h3">{persona.nombre}</h3>
            <p className="texto-cuerpo text-texto-secundario">{persona.rol}</p>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
