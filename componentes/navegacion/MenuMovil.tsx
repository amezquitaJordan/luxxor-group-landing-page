"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { m } from "motion/react";
import { X } from "lucide-react";
import { SelectorTema } from "@/componentes/tema/SelectorTema";
import { Boton } from "@/componentes/ui/Boton";
import { BotonWhatsApp } from "@/componentes/ui/BotonWhatsApp";
import { Logo } from "@/componentes/ui/Logo";
import { enlaceWhatsApp, mensajesWhatsApp, sitio } from "@/config/sitio";
import type { EnlaceNavegacion } from "@/contenido/navegacion";

interface PropsMenuMovil {
  id: string;
  abierto: boolean;
  enlaces: readonly EnlaceNavegacion[];
  /** Lo llama el evento `close` del <dialog>: única fuente de verdad del cierre. */
  alCerrarse: () => void;
  refDisparador: RefObject<HTMLButtonElement | null>;
}

const ATRIBUTO_BLOQUEO = "data-scroll-bloqueado";
const MEDIA_ESCRITORIO = "(min-width: 64rem)";

/**
 * Menú móvil (Figma 21:353): <dialog> nativo con showModal().
 * - showModal() pone el diálogo en la capa superior, vuelve inerte el resto de la página
 *   y mantiene el foco dentro.
 * - El evento `close` es la única fuente de verdad: actualiza el estado, quita el bloqueo de
 *   scroll, libera el motivo «menu» del botón flotante (vía el estado del encabezado) y
 *   devuelve el foco al botón «Abrir menú».
 * - `cancel` (Escape) se intenta cancelar solo para animar la salida; si el navegador no lo
 *   permite (Chrome sin activación del usuario), el diálogo se cierra igual y `close` sincroniza.
 */
export function MenuMovil({ id, abierto, enlaces, alCerrarse, refDisparador }: PropsMenuMovil) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const primerEnlace = useRef<HTMLAnchorElement>(null);
  const devolverFoco = useRef(true);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [saliendo, setSaliendo] = useState(false);

  // Abrir: showModal + bloqueo de scroll + foco en el primer enlace.
  useEffect(() => {
    const d = dialogo.current;
    if (!d || !abierto || d.open) return;
    d.showModal();
    document.documentElement.setAttribute(ATRIBUTO_BLOQUEO, "");
    primerEnlace.current?.focus();
  }, [abierto]);

  // Si la ventana pasa a escritorio con el menú abierto, se cierra sin devolver el foco.
  useEffect(() => {
    const consulta = window.matchMedia(MEDIA_ESCRITORIO);
    const alCambiar = () => {
      if (consulta.matches && dialogo.current?.open) {
        devolverFoco.current = false;
        dialogo.current.close();
      }
    };
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);

  useEffect(
    () => () => {
      if (temporizador.current) clearTimeout(temporizador.current);
      document.documentElement.removeAttribute(ATRIBUTO_BLOQUEO);
    },
    [],
  );

  function cerrarYa() {
    const d = dialogo.current;
    if (d?.open) d.close();
  }

  /** Cierre animado: anima la salida y luego cierra; con un respaldo por si la animación no termina. */
  function solicitarCierre() {
    setSaliendo(true);
    if (temporizador.current) clearTimeout(temporizador.current);
    temporizador.current = setTimeout(cerrarYa, 400);
  }

  /** Evento `close`: única fuente de verdad. */
  function alCerrar() {
    if (temporizador.current) clearTimeout(temporizador.current);
    document.documentElement.removeAttribute(ATRIBUTO_BLOQUEO);
    setSaliendo(false);
    alCerrarse();
    if (devolverFoco.current) refDisparador.current?.focus();
    devolverFoco.current = true;
  }

  /** Al tocar un enlace: cierre síncrono para que la navegación al ancla no quede bloqueada. */
  function alElegirEnlace() {
    devolverFoco.current = false;
    document.documentElement.removeAttribute(ATRIBUTO_BLOQUEO);
    cerrarYa();
  }

  return (
    <dialog
      ref={dialogo}
      id={id}
      aria-label="Menú"
      onCancel={(evento) => {
        evento.preventDefault();
        solicitarCierre();
      }}
      onClose={alCerrar}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-fondo-base p-0 text-texto-primario backdrop:bg-transparent"
    >
      <m.div
        initial="oculto"
        animate={abierto && !saliendo ? "visible" : "oculto"}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.2, 0, 0, 1] } },
          oculto: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } },
        }}
        onAnimationComplete={(definicion) => {
          if (definicion === "oculto" && saliendo) cerrarYa();
        }}
        className="flex min-h-full flex-col"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-borde-sutil px-5 pt-[env(safe-area-inset-top)]">
          <Logo />
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={solicitarCierre}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-borde-sutil text-texto-primario"
          >
            <X aria-hidden className="size-6" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-8 px-5 pt-4 pb-[calc(2.125rem+env(safe-area-inset-bottom))]">
          <nav aria-label="Principal">
            <ul>
              {enlaces.map((enlace, indice) => (
                <li key={enlace.href}>
                  <a
                    ref={indice === 0 ? primerEnlace : undefined}
                    href={enlace.href}
                    onClick={alElegirEnlace}
                    className="texto-h2 flex min-h-[59px] items-center border-b border-borde-sutil py-3.5"
                  >
                    {enlace.etiqueta}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-2.5">
            <p id={`${id}-apariencia`} className="texto-anotacion text-texto-laton">
              Apariencia
            </p>
            <SelectorTema idEtiqueta={`${id}-apariencia`} />
          </div>

          <div className="flex-1" />

          <div className="flex flex-col gap-3">
            <Boton href={enlaceWhatsApp(mensajesWhatsApp.agendarVisita)} externo anchoCompleto>
              Agendar visita técnica
            </Boton>
            <BotonWhatsApp anchoCompleto />
            <p className="texto-pequeno text-texto-secundario">
              <a href={`tel:+${sitio.contacto.whatsapp.numero}`}>{sitio.contacto.whatsapp.visible}</a>
              {" · "}
              <a href={`mailto:${sitio.contacto.correo}`}>{sitio.contacto.correo}</a>
            </p>
          </div>
        </div>
      </m.div>
    </dialog>
  );
}
