import { BotonTema } from "@/componentes/tema/BotonTema";
import { enlaceWhatsApp, mensajesWhatsApp, sitio } from "@/config/sitio";

/** Página mínima provisional mientras se construye la nueva landing (Sesiones 3–5). */
export default function Inicio() {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-6 px-5 py-16">
      <div className="flex items-start justify-between gap-4">
        <h1 className="texto-h1">{sitio.nombre}</h1>
        <BotonTema />
      </div>
      <p className="texto-cuerpo-lg">{sitio.lema}.</p>
      <p className="texto-cuerpo text-texto-secundario">
        Estamos renovando nuestro sitio. Mientras tanto, puede contactarnos:
      </p>
      <ul className="texto-cuerpo flex flex-col gap-3">
        <li>
          <a
            className="text-texto-acento underline underline-offset-4"
            href={enlaceWhatsApp(mensajesWhatsApp.agendarVisita)}
          >
            Agendar visita técnica por WhatsApp ({sitio.contacto.whatsapp.visible})
          </a>
        </li>
        <li>
          <a className="text-texto-acento underline underline-offset-4" href={`mailto:${sitio.contacto.correo}`}>
            {sitio.contacto.correo}
          </a>
        </li>
        <li>
          <a className="text-texto-acento underline underline-offset-4" href={sitio.redes.instagram}>
            Instagram @luxxorcol
          </a>
        </li>
      </ul>
    </main>
  );
}
