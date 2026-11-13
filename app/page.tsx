import { enlaceWhatsApp, mensajesWhatsApp, sitio } from "@/config/sitio";

/** Página mínima provisional mientras se construye la nueva landing (Sesiones 2–5). */
export default function Inicio() {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-6 px-5 py-16">
      <h1 className="text-3xl font-semibold">{sitio.nombre}</h1>
      <p className="text-lg">{sitio.lema}.</p>
      <p>Estamos renovando nuestro sitio. Mientras tanto, puede contactarnos:</p>
      <ul className="flex flex-col gap-3">
        <li>
          <a className="underline underline-offset-4" href={enlaceWhatsApp(mensajesWhatsApp.agendarVisita)}>
            Agendar visita técnica por WhatsApp ({sitio.contacto.whatsapp.visible})
          </a>
        </li>
        <li>
          <a className="underline underline-offset-4" href={`mailto:${sitio.contacto.correo}`}>
            {sitio.contacto.correo}
          </a>
        </li>
        <li>
          <a className="underline underline-offset-4" href={sitio.redes.instagram}>
            Instagram @luxxorcol
          </a>
        </li>
      </ul>
    </main>
  );
}
