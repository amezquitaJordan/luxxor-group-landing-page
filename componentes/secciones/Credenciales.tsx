import { Dato } from "@/componentes/ui/Dato";
import { TextoAdaptable } from "@/componentes/ui/TextoAdaptable";
import { landing, type Credencial } from "@/contenido/landing";
import { cn } from "@/lib/utils";

/**
 * Banda de credenciales (Figma 15:170 móvil, 18:199 escritorio): 2×2 en móvil, 4 en fila en md y
 * los 5 datos de Figma 04 (incluido ASTM) en fila desde lg.
 */
export function Credenciales() {
  return (
    <section aria-label="Credenciales" className="border-y border-borde-sutil bg-fondo-superficie text-texto-primario">
      <ul className="mx-auto grid w-full max-w-[90rem] grid-cols-2 gap-x-4 gap-y-6 px-5 py-8 md:grid-cols-4 md:px-8 lg:flex lg:justify-between lg:gap-6 lg:py-10 xl:px-20">
        {(landing.credenciales as readonly Credencial[]).map((credencial) => (
          <li key={credencial.cifra} className={cn("lg:w-[13.75rem]", credencial.soloEscritorio && "hidden lg:block")}>
            <Dato cifra={credencial.cifra} descripcion={<TextoAdaptable texto={credencial.descripcion} />} />
          </li>
        ))}
      </ul>
    </section>
  );
}
