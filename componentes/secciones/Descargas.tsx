import { Download } from "lucide-react";
import { Seccion } from "@/componentes/ui/Seccion";
import { archivosDescarga, idsSecciones, landing } from "@/contenido/landing";

/** Descargas (Figma 17:279): portafolio y tarjeta en PDF (versiones corregidas). */
export function Descargas() {
  const { titulo, archivos } = landing.descargas;
  return (
    <Seccion id={idsSecciones.descargas} titulo={titulo} className="gap-3">
      <ul className="flex flex-col gap-3">
        {archivos.map((archivo) => (
          <li key={archivo.id}>
            <a
              href={archivosDescarga[archivo.id]}
              download
              className="flex items-center gap-4 rounded-md border border-borde-sutil bg-fondo-superficie p-4 hover:bg-fondo-elevado"
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
