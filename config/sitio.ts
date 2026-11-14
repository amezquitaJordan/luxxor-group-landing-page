/** Datos oficiales del sitio. Única fuente de contacto para todos los componentes. */
export const sitio = {
  nombre: "Luxxor Group",
  lema: "Ingeniería estructural y vulnerabilidad sísmica en Cali",
  url: "https://www.luxxor.com.co",
  idioma: "es-CO",
  contacto: {
    /** Regla única: todo enlace wa.me usa este número (enlaceWhatsApp) y todo tel: usa `telefono` (enlaceTelefono). */
    whatsapp: { numero: "573170303333", visible: "+57 317 030 3333" },
    /** Celular de Yasser Niño Garrido, Director de Operaciones (confirmado por el dueño, 14-nov-2026). */
    telefono: { numero: "573001951936", visible: "+57 300 195 1936" },
    // luxxorgroup.com solo se usa en el correo; el dominio del sitio es www.luxxor.com.co.
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

/**
 * Interruptores de contenido. Cada uno enciende o apaga en un solo sitio lo que depende de una
 * autorización o de una sesión posterior.
 */
export const funciones = {
  /** Nombres de clientes (Interplásticos, Colegios de Yumbo, Super Farma, Farmatodo…): sin autorización todavía. */
  nombresClientes: false,
  /** Portafolio y tarjeta en PDF (versiones corregidas con www.luxxor.com.co) y CTA secundario del hero. */
  descargas: true,
  /** «Preguntar al asistente» en Preguntas frecuentes: se enciende en la Sesión 7. */
  asistente: false,
  /** Enlaces del pie a /politica-de-datos y /terminos: se encienden en la Sesión 8. */
  paginasLegales: false,
} as const;

export type Funciones = typeof funciones;

export const mensajesWhatsApp = {
  general: "Hola, quiero información sobre los servicios de Luxxor Group.",
  agendarVisita: "Hola, quiero agendar una visita técnica para evaluar mi edificación.",
} as const;

/** Enlace a WhatsApp con mensaje prellenado opcional. */
export function enlaceWhatsApp(mensaje?: string): string {
  const base = `https://wa.me/${sitio.contacto.whatsapp.numero}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/** Enlace tel: del teléfono de contacto (formato E.164). */
export function enlaceTelefono(): string {
  return `tel:+${sitio.contacto.telefono.numero}`;
}
