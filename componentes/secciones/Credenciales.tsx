import { Dato } from "@/componentes/ui/Dato";
import { landing } from "@/contenido/landing";

/** Banda de credenciales (Figma 15:170): cuatro datos del portafolio, 2×2 en móvil. */
export function Credenciales() {
  return (
    <section aria-label="Credenciales" className="border-y border-borde-sutil bg-fondo-superficie text-texto-primario">
      <ul className="mx-auto grid w-full max-w-[80rem] grid-cols-2 gap-x-4 gap-y-6 px-5 py-8 md:px-8 lg:px-20">
        {landing.credenciales.map((dato) => (
          <li key={dato.cifra}>
            <Dato {...dato} />
          </li>
        ))}
      </ul>
    </section>
  );
}
