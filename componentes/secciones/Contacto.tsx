import type { ReactNode } from "react";
import { BotonWhatsApp } from "@/componentes/ui/BotonWhatsApp";
import { Seccion, TituloSeccion } from "@/componentes/ui/Seccion";
import { AVISO_PESTANA_NUEVA, TextoOculto } from "@/componentes/ui/TextoOculto";
import { enlaceTelefono, enlaceWhatsApp, mensajesWhatsApp, sitio } from "@/config/sitio";
import { idsSecciones, landing } from "@/contenido/landing";

const claseEnlace = "underline underline-offset-4";

function EnlaceExterno({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={claseEnlace}>
      {children}
      <TextoOculto>{AVISO_PESTANA_NUEVA}</TextoOculto>
    </a>
  );
}

/**
 * Contacto (Figma 17:320 móvil, 20:370 escritorio): sección en modo oscuro en ambos temas. Datos desde
 * config/sitio.ts. Desde lg: llamado (600 px) a la izquierda y datos (600 px) a la derecha.
 */
export function Contacto() {
  const { titulo, bajada, botonWhatsApp, etiquetas } = landing.contacto;
  const { contacto, direccion, redes } = sitio;
  const datos: { etiqueta: string; valor: ReactNode }[] = [
    {
      etiqueta: etiquetas.whatsapp,
      valor: <EnlaceExterno href={enlaceWhatsApp(mensajesWhatsApp.general)}>{contacto.whatsapp.visible}</EnlaceExterno>,
    },
    {
      etiqueta: etiquetas.telefono,
      valor: (
        <a href={enlaceTelefono()} className={claseEnlace}>
          {contacto.telefono.visible}
        </a>
      ),
    },
    {
      etiqueta: etiquetas.correo,
      valor: (
        <a href={`mailto:${contacto.correo}`} className={claseEnlace}>
          {contacto.correo}
        </a>
      ),
    },
    {
      etiqueta: etiquetas.oficina,
      valor: `${direccion.calle}, ${direccion.barrio} · ${direccion.ciudad}, ${direccion.departamento}`,
    },
    {
      etiqueta: etiquetas.redes,
      valor: (
        <>
          <EnlaceExterno href={redes.instagram}>Instagram @luxxorcol</EnlaceExterno>
          {" · "}
          <EnlaceExterno href={redes.facebook}>Facebook</EnlaceExterno>
        </>
      ),
    },
  ];

  return (
    <Seccion
      id={idsSecciones.contacto}
      tituloPropio
      oscura
      className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-20"
    >
      <div className="flex flex-col gap-5 lg:gap-6">
        <TituloSeccion id={idsSecciones.contacto}>{titulo}</TituloSeccion>
        <p className="texto-cuerpo text-texto-secundario lg:max-w-[35rem]">{bajada}</p>
        <BotonWhatsApp
          etiqueta={botonWhatsApp}
          mensaje={mensajesWhatsApp.agendarVisita}
          anchoCompleto
          className="justify-center lg:w-auto lg:self-start"
        />
      </div>
      <dl className="flex flex-col gap-3.5 pt-3 lg:gap-5 lg:pt-0">
        {datos.map((dato) => (
          <div key={dato.etiqueta} className="flex flex-col gap-0.5 lg:gap-1">
            <dt className="texto-anotacion text-texto-laton">{dato.etiqueta}</dt>
            <dd className="texto-cuerpo lg:texto-cuerpo-lg">{dato.valor}</dd>
          </div>
        ))}
      </dl>
    </Seccion>
  );
}
