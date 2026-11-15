import { MarcoLienzo } from "@/componentes/lienzo-3d/MarcoLienzo";
import { OcultarFlotanteMientrasVisible } from "@/componentes/navegacion/OcultarFlotanteMientrasVisible";
import { Boton } from "@/componentes/ui/Boton";
import { TextoAdaptable } from "@/componentes/ui/TextoAdaptable";
import { enlaceWhatsApp, funciones, mensajesWhatsApp } from "@/config/sitio";
import { archivosDescarga, idsSecciones, landing } from "@/contenido/landing";

const EJES = ["A", "B", "C", "D", "E"] as const;

/**
 * Hero (Figma 15:14 móvil, 18:20 escritorio): h1 (LCP), bajada, acciones y el lienzo del pórtico
 * (provisional hasta la Sesión 6). Dos columnas desde xl (el lienzo a la derecha, 540 px), apilado
 * por debajo. Variante «compacto» (xl y poca altura, Figma 06): menos relleno y dibujo más bajo.
 */
export function Hero() {
  const { titular, bajada, agendar, descargarPortafolio, notaIlustrativa, lienzo } = landing.hero;
  return (
    <section id={idsSecciones.hero} aria-labelledby="inicio-titulo" className="bg-fondo-base text-texto-primario">
      <div className="relative mx-auto flex w-full max-w-[90rem] flex-col gap-5 px-5 py-10 md:px-8 xl:flex-row xl:items-center xl:gap-16 xl:px-20 xl:pt-16 xl:pb-10 compacto:pt-12 compacto:pb-6">
        {/* Ejes estructurales A–E con su cota (Figma 18:21): decorativos. */}
        <div aria-hidden="true" className="absolute inset-x-20 top-5 hidden justify-between opacity-70 xl:flex">
          <span className="absolute inset-x-0 top-4 h-px bg-detalle-laton opacity-50" />
          {EJES.map((letra) => (
            // Círculo del componente Eje (Figma 10:75) sin su línea vertical: aquí los une la cota horizontal.
            <span
              key={letra}
              className="texto-eje relative flex size-8 items-center justify-center rounded-full border border-detalle-laton bg-fondo-base text-texto-laton"
            >
              {letra}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-5 xl:min-w-0 xl:flex-1 xl:gap-7">
          <h1 id="inicio-titulo" className="texto-display">
            {titular}
          </h1>
          <p className="texto-cuerpo-lg text-texto-secundario">
            <TextoAdaptable texto={bajada} />
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <Boton href={enlaceWhatsApp(mensajesWhatsApp.agendarVisita)} externo anchoCompleto className="md:w-auto">
              {agendar}
            </Boton>
            {funciones.descargas && (
              <Boton href={archivosDescarga.portafolio} variante="secundario" anchoCompleto download className="md:w-auto">
                {descargarPortafolio}
              </Boton>
            )}
          </div>
          {/* Solo con el lienzo a la derecha (Figma 04, 20:5327). */}
          <p className="texto-pequeno hidden text-texto-secundario xl:block">{notaIlustrativa}</p>
        </div>

        {/* El flotante taparía el lienzo (Figma 06, checklist «!»): se oculta mientras se ve, en todos los anchos. */}
        <OcultarFlotanteMientrasVisible
          motivo="lienzo"
          className="w-full md:max-w-[34rem] xl:w-[33.75rem] xl:max-w-none xl:shrink-0"
        >
          <MarcoLienzo {...lienzo} />
        </OcultarFlotanteMientrasVisible>
      </div>
    </section>
  );
}
