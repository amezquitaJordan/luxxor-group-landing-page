"use client";

import { useCallback, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { BotonTema } from "@/componentes/tema/BotonTema";
import { Boton } from "@/componentes/ui/Boton";
import { Logo } from "@/componentes/ui/Logo";
import { enlaceWhatsApp, mensajesWhatsApp } from "@/config/sitio";
import { enlacesNavegacion, type EnlaceNavegacion } from "@/contenido/navegacion";
import { useOcultarBotonFlotante } from "@/lib/estado/visibilidadFlotante";
import { MenuMovil } from "./MenuMovil";
import { SaltarContenido } from "./SaltarContenido";

const ID_MENU = "menu-movil";

/**
 * Encabezado fijo (Figma 11:81). Escritorio (≥ 64rem): 80 px, logo · navegación · tema · Agendar.
 * Móvil: 64 px, logo · tema · Agendar · menú (controles de 44 px). Respeta la zona segura superior.
 */
export function Encabezado({ enlaces = enlacesNavegacion }: { enlaces?: readonly EnlaceNavegacion[] }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const disparador = useRef<HTMLButtonElement>(null);
  const alCerrarse = useCallback(() => setMenuAbierto(false), []);
  useOcultarBotonFlotante("menu", menuAbierto);

  const hrefAgendar = enlaceWhatsApp(mensajesWhatsApp.agendarVisita);

  return (
    <header className="sticky top-0 z-40 border-b border-borde-sutil bg-fondo-base pt-[env(safe-area-inset-top)]">
      <SaltarContenido />
      {/* Alto total 64/80 px con el borde inferior incluido (Figma 11:81). */}
      <div className="mx-auto flex h-[calc(4rem-1px)] max-w-[90rem] items-center justify-between gap-4 px-5 lg:h-[calc(5rem-1px)] lg:px-8 xl:px-20">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-9">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a href={enlace.href} className="texto-cuerpo underline-offset-4 hover:underline">
                  {enlace.etiqueta}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          <BotonTema />
          {/* Envolturas para no mezclar «hidden» con el «inline-flex» del botón. */}
          <span className="contents lg:hidden">
            <Boton href={hrefAgendar} externo>
              Agendar
            </Boton>
          </span>
          <span className="hidden lg:contents">
            <Boton href={hrefAgendar} externo>
              Agendar visita técnica
            </Boton>
          </span>
          <button
            ref={disparador}
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            aria-controls={ID_MENU}
            onClick={() => setMenuAbierto(true)}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-borde-sutil text-texto-primario lg:hidden"
          >
            <Menu aria-hidden className="size-6" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <MenuMovil
        id={ID_MENU}
        abierto={menuAbierto}
        enlaces={enlaces}
        alCerrarse={alCerrarse}
        refDisparador={disparador}
      />
    </header>
  );
}
