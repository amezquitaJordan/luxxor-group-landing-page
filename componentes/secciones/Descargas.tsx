import { Download } from "lucide-react";
import { Seccion } from "@/componentes/ui/Seccion";
import { archivosDescarga, idsSecciones, landing } from "@/contenido/landing";

/**
 * Descargas (Figma 17:279 móvil; 20:322 escritorio, columna derecha de la banda con Dirección técnica):
 * portafolio y tarjeta en PDF (versiones corregidas).
 */
export function Descargas({ enBanda = false }: { enBanda?: boolean }) {
  const { titulo, archivos } = landing.descargas;
  return (
    <Seccion id={idsSecciones.descargas} titulo={titulo} enBanda={enBanda} className="gap-3 lg:gap-4">
      <ul className="flex flex-col gap-3 lg:gap-4">
        {archivos.map((archivo) => (
          <li key={archivo.id}>
            <a
              href={archivosDescarga[archivo.id]}
              download
              className="flex items-center gap-4 rounded-md border border-borde-sutil bg-fondo-superficie p-4 hover:bg-fondo-elevado lg:px-6 lg:py-5"
            >
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="texto-cuerpo-fuerte">{archivo.titulo}</span>
                <span className="texto-pequeno text-texto-secundario">{archivo.detalle}</span>
              </span>
              <Download aria-hidden className="size-5 shrink-0" strokeWidth={1.75} />
            </a>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
