/** Datos oficiales del sitio. Única fuente de contacto para todos los componentes. */
export const sitio = {
  nombre: "Luxxor Group",
  lema: "Ingeniería estructural y vulnerabilidad sísmica en Cali",
  url: "https://www.luxxor.com.co",
  idioma: "es-CO",
  contacto: {
    whatsapp: { numero: "573170303333", visible: "+57 317 030 3333" },
    correo: "gerencia@luxxorgroup.com",
  },
  redes: {
    instagram: "https://www.instagram.com/luxxorcol",
    // Enlace de «compartir»; reemplazar por la URL canónica de la página cuando el cliente la envíe.
    facebook: "https://www.facebook.com/share/1FDJBdYxgs/",
  },
  direccion: {
    calle: "Calle 44N #4N-05",
    barrio: "La Flora",
    ciudad: "Cali",
    departamento: "Valle del Cauca",
    pais: "CO",
  },
  cobertura: ["Valle del Cauca", "Cauca", "Nariño"],
} as const;

export const mensajesWhatsApp = {
  general: "Hola, quiero información sobre los servicios de Luxxor Group.",
  agendarVisita: "Hola, quiero agendar una visita técnica para evaluar mi edificación.",
} as const;

/** Enlace a WhatsApp con mensaje prellenado opcional. */
export function enlaceWhatsApp(mensaje?: string): string {
  const base = `https://wa.me/${sitio.contacto.whatsapp.numero}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
