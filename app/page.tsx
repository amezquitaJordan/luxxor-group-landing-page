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
        <DireccionTecnica />
        {funciones.descargas && <Descargas />}
        <PreguntasFrecuentes />
        <Contacto />
      </main>
      <PiePagina />
    </>
  );
}
