import { funciones } from "@/config/sitio";
import { landing } from "@/contenido/landing";

/**
 * Pie de página (Figma 17:340): modo oscuro en ambos temas. Los enlaces legales aparecen con
 * funciones.paginasLegales (Sesión 8), para que ninguno lleve a un 404.
 * Relleno inferior de 96 px: deja libre la zona del botón flotante.
 */
export function PiePagina() {
  const { firma, legales, derechos } = landing.pie;
  return (
    <footer data-theme="dark" className="bg-fondo-superficie text-texto-primario [color-scheme:dark]">
      <div className="texto-pequeno mx-auto flex w-full max-w-[80rem] flex-col gap-3 px-5 pt-8 pb-[calc(6rem+env(safe-area-inset-bottom))] md:px-8 lg:px-20">
        <p className="text-texto-secundario">{firma}</p>
        {funciones.paginasLegales && (
          <nav aria-label="Legal">
            <ul className="flex gap-5">
              <li>
                <a href="/politica-de-datos" className="underline underline-offset-4">
                  {legales.datos}
                </a>
              </li>
              <li>
                <a href="/terminos" className="underline underline-offset-4">
                  {legales.terminos}
                </a>
              </li>
            </ul>
          </nav>
        )}
        <p className="text-texto-secundario">{derechos}</p>
      </div>
    </footer>
  );
}
