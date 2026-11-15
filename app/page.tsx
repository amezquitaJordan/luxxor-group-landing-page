import { Complementarios } from "@/componentes/secciones/Complementarios";
import { Contacto } from "@/componentes/secciones/Contacto";
import { Credenciales } from "@/componentes/secciones/Credenciales";
import { CuandoSeNecesita } from "@/componentes/secciones/CuandoSeNecesita";
import { Descargas } from "@/componentes/secciones/Descargas";
import { DireccionTecnica } from "@/componentes/secciones/DireccionTecnica";
import { Ensayos } from "@/componentes/secciones/Ensayos";
import { Hero } from "@/componentes/secciones/Hero";
import { Metodologia } from "@/componentes/secciones/Metodologia";
import { ObrasEnEjecucion } from "@/componentes/secciones/ObrasEnEjecucion";
import { PiePagina } from "@/componentes/secciones/PiePagina";
import { PreguntasFrecuentes } from "@/componentes/secciones/PreguntasFrecuentes";
import { Proyectos } from "@/componentes/secciones/Proyectos";
import { Servicios } from "@/componentes/secciones/Servicios";
import { OcultarFlotanteMientrasVisible } from "@/componentes/navegacion/OcultarFlotanteMientrasVisible";
import { funciones } from "@/config/sitio";
import { ID_CONTENIDO } from "@/contenido/navegacion";

/** Landing (Figma 03 · Landing — Móvil, 15:2): secciones en el orden del diseño. */
export default function Inicio() {
  return (
    <>
      <main id={ID_CONTENIDO} tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Credenciales />
        <Servicios />
        <CuandoSeNecesita />
        <Metodologia />
        <Ensayos />
        <ObrasEnEjecucion />
        <Proyectos />
        <Complementarios />
        {/* Escritorio (Figma 20:312): Dirección técnica y Descargas en una banda de dos columnas. */}
        <div className="lg:bg-fondo-superficie">
          <div className="lg:mx-auto lg:grid lg:max-w-[90rem] lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-30 xl:px-20">
            <DireccionTecnica enBanda />
            {funciones.descargas && <Descargas enBanda />}
          </div>
        </div>
        <PreguntasFrecuentes />
        {/* Con Contacto en pantalla el flotante sobra: la sección tiene su propio botón de WhatsApp. */}
        <OcultarFlotanteMientrasVisible motivo="contacto">
          <Contacto />
        </OcultarFlotanteMientrasVisible>
      </main>
      <PiePagina />
    </>
  );
}
