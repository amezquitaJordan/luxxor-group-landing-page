import { IconoWhatsApp } from "@/componentes/iconos/IconoWhatsApp";
import { enlaceWhatsApp, mensajesWhatsApp } from "@/config/sitio";
import { cn } from "@/lib/utils";
import { AVISO_PESTANA_NUEVA, TextoOculto } from "./TextoOculto";

interface PropsBotonWhatsApp {
  etiqueta?: string;
  mensaje?: string;
  anchoCompleto?: boolean;
  className?: string;
}

/**
 * Botón WhatsApp (Figma 10:62): verde de la marca con texto e ícono marino
 * (accion/whatsapp/texto, 8,69:1). Abre wa.me con mensaje prellenado.
 */
export function BotonWhatsApp({
  etiqueta = "Escribir por WhatsApp",
  mensaje = mensajesWhatsApp.general,
  anchoCompleto = false,
  className,
}: PropsBotonWhatsApp) {
  return (
    <a
      href={enlaceWhatsApp(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "texto-boton inline-flex min-h-11 items-center gap-2.5 rounded-sm bg-accion-whatsapp px-6 py-3 text-accion-whatsapp-texto",
        anchoCompleto && "w-full",
        className,
      )}
    >
      <IconoWhatsApp className="size-5 shrink-0" />
      {etiqueta}
      <TextoOculto>{AVISO_PESTANA_NUEVA}</TextoOculto>
    </a>
  );
}
