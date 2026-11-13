"use client";

import { AnimatePresence, m } from "motion/react";
import { IconoWhatsApp } from "@/componentes/iconos/IconoWhatsApp";
import { enlaceWhatsApp, mensajesWhatsApp } from "@/config/sitio";
import { useBotonFlotanteVisible } from "@/lib/estado/visibilidadFlotante";

/**
 * Botón flotante de WhatsApp (Figma 11:82): 56×56, a 20/24 px del borde en móvil y 40 px en escritorio,
 * respetando las zonas seguras. Se oculta con menú, chat, lienzo 3D, contacto visible o teclado abierto.
 * El ícono usa accion/whatsapp/texto (en Figma el vector todavía tiene un hex suelto).
 */
export function BotonFlotanteWhatsApp({ mensaje = mensajesWhatsApp.general }: { mensaje?: string }) {
  const visible = useBotonFlotanteVisible();

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          key="boton-flotante-whatsapp"
          data-boton-flotante=""
          href={enlaceWhatsApp(mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp (se abre en otra pestaña)"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed right-[calc(1.25rem+env(safe-area-inset-right))] bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full bg-accion-whatsapp text-accion-whatsapp-texto lg:right-[calc(2.5rem+env(safe-area-inset-right))] lg:bottom-[calc(2.5rem+env(safe-area-inset-bottom))]"
        >
          <IconoWhatsApp className="size-[26px]" />
        </m.a>
      )}
    </AnimatePresence>
  );
}
