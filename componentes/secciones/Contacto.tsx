import type { ReactNode } from "react";
import { BotonWhatsApp } from "@/componentes/ui/BotonWhatsApp";
import { Seccion } from "@/componentes/ui/Seccion";
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

/** Contacto (Figma 17:320): sección en modo oscuro en ambos temas. Datos desde config/sitio.ts. */
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
    <Seccion id={idsSecciones.contacto} titulo={titulo} oscura>
      <p className="texto-cuerpo text-texto-secundario">{bajada}</p>
      <BotonWhatsApp
        etiqueta={botonWhatsApp}
        mensaje={mensajesWhatsApp.agendarVisita}
        anchoCompleto
        className="justify-center"
      />
      <dl className="flex flex-col gap-3.5 pt-3">
        {datos.map((dato) => (
          <div key={dato.etiqueta} className="flex flex-col gap-0.5">
            <dt className="texto-anotacion text-texto-laton">{dato.etiqueta}</dt>
            <dd className="texto-cuerpo">{dato.valor}</dd>
          </div>
        ))}
      </dl>
    </Seccion>
  );
}
