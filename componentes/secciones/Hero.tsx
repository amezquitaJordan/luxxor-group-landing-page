import { MarcoLienzo } from "@/componentes/lienzo-3d/MarcoLienzo";
import { Boton } from "@/componentes/ui/Boton";
import { enlaceWhatsApp, funciones, mensajesWhatsApp } from "@/config/sitio";
import { archivosDescarga, idsSecciones, landing } from "@/contenido/landing";

/** Hero (Figma 15:14): h1 (LCP), bajada, acciones y el lienzo del pórtico (provisional hasta la Sesión 6). */
export function Hero() {
  const { titular, bajada, agendar, descargarPortafolio, lienzo } = landing.hero;
  return (
    <section id={idsSecciones.hero} aria-labelledby="inicio-titulo" className="bg-fondo-base text-texto-primario">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-5 px-5 py-10 md:px-8 lg:px-20">
        <h1 id="inicio-titulo" className="texto-display">
          {titular}
        </h1>
        <p className="texto-cuerpo-lg text-texto-secundario">{bajada}</p>
        <div className="flex flex-col gap-3">
          <Boton href={enlaceWhatsApp(mensajesWhatsApp.agendarVisita)} externo anchoCompleto>
            {agendar}
          </Boton>
          {funciones.descargas && (
            <Boton href={archivosDescarga.portafolio} variante="secundario" anchoCompleto download>
              {descargarPortafolio}
            </Boton>
          )}
        </div>
        <MarcoLienzo {...lienzo} />
      </div>
    </section>
  );
}
