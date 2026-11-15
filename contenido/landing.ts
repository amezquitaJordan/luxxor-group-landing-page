import type { PropsDato } from "@/componentes/ui/Dato";
import type { IdFoto } from "./fotos";

/*
 * Textos de la landing (Sesión 4). Única fuente de copy de las secciones.
 * Fuentes: Figma 7IEP7WM4lJvxi33qA0YIf0, páginas 03 · Landing — Móvil y 04 · Landing — Escritorio
 * (nodo indicado en cada campo) y el portafolio PDF 2026 (folio impreso). Los datos de contacto salen
 * de config/sitio.ts. Nada inventado: lo que no está literal en Figma lleva un comentario VALIDAR.
 *
 * Regla de la Sesión 5 (15-nov-2026): lo que solo está en Figma 04 se muestra desde lg (TextoResponsivo
 * o `soloEscritorio`); la quinta pregunta frecuente va en todos los anchos.
 */

/** Texto que nombra a un cliente: se usa `sinNombre` mientras funciones.nombresClientes sea false. */
export interface TextoCliente {
  conNombre: string;
  sinNombre: string;
}

/**
 * Texto que cambia entre Figma 03 (móvil) y Figma 04 (escritorio). Se pintan las dos versiones y
 * cada una se oculta con display: none en el ancho que no le toca (el lector de pantalla solo lee una).
 */
export type TextoResponsivo<T = string> = T | { movil: T; escritorio: T };

export function esResponsivo<T>(texto: TextoResponsivo<T>): texto is { movil: T; escritorio: T } {
  return typeof texto === "object" && texto !== null && "movil" in texto && "escritorio" in texto;
}

export interface Credencial {
  cifra: string;
  descripcion: TextoResponsivo;
  /** Solo en Figma 04: se muestra desde lg. */
  soloEscritorio?: boolean;
}

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

export interface ContenidoLanding {
  hero: {
    titular: string;
    bajada: TextoResponsivo;
    agendar: string;
    descargarPortafolio: string;
    /** Solo con el lienzo a la derecha (xl). */
    notaIlustrativa: string;
    lienzo: {
      titulo: string;
      leyenda: { cumple: string; cerca: string; excede: string; sinDeformar: string };
      control: { etiqueta: string; valor: string };
      rotulo: string;
      descripcionAccesible: string;
    };
  };
  credenciales: readonly Credencial[];
  servicios: {
    titulo: string;
    bajada: string;
    principal: {
      norma: string;
      titulo: string;
      descripcion: string;
      paraQuien: readonly string[];
      accion: { etiqueta: string; href: `#${string}` };
      foto: IdFoto;
    };
    secundarios: readonly { titulo: string; descripcion: string; entregable: string }[];
  };
  cuandoSeNecesita: {
    titulo: string;
    /** Solo en Figma 04 (desde lg). */
    introduccion: string;
    /** Foto solo en Figma 04 (desde lg): no se descarga en móvil. */
    foto: IdFoto;
    casos: readonly string[];
  };
  metodologia: {
    titulo: string;
    bajada: TextoResponsivo;
    foto: IdFoto;
    pasos: readonly { titulo: string; descripcion: string }[];
  };
  ensayos: {
    titulo: string;
    bajada: string;
    foto: IdFoto;
    lista: readonly { referencia: string; titulo: string; descripcion: string }[];
    entregables: { titulo: string; items: readonly string[] };
  };
  obras: {
    titulo: string;
    bajada: TextoResponsivo;
    obras: readonly { foto: IdFoto; pie: string }[];
    controles: { anterior: string; siguiente: string };
  };
  proyectos: {
    titulo: string;
    bajada: string;
    fichas: readonly { tipologia: string; titulo: string | TextoCliente; dato: PropsDato }[];
  };
  complementarios: {
    titulo: string;
    bajada: string;
    items: readonly {
      titulo: string;
      descripcion: TextoResponsivo<string | TextoCliente>;
      /** Foto según el interruptor de clientes; null = la fila se pinta sin columna de foto. */
      foto: { conNombre: IdFoto | null; sinNombre: IdFoto | null };
    }[];
  };
  equipo: { titulo: string; personas: readonly { nombre: string; rol: string }[] };
  descargas: {
    titulo: string;
    archivos: readonly { id: "portafolio" | "tarjeta"; titulo: string; detalle: string }[];
  };
  preguntas: {
    titulo: string;
    items: readonly Pregunta[];
    /** Texto junto al botón del asistente (Figma 04); ambos con funciones.asistente. */
    introAsistente: string;
    asistente: string;
  };
  contacto: {
    titulo: string;
    bajada: string;
    botonWhatsApp: string;
    etiquetas: { whatsapp: string; telefono: string; correo: string; oficina: string; redes: string };
  };
  pie: { firma: string; legales: { datos: string; terminos: string }; derechos: string };
}

export const landing = {
  hero: {
    titular: "Sabemos cómo se comporta su edificación ante un sismo.", // 15:15 · PDF p.1
    bajada: {
      movil:
        "Evaluación de vulnerabilidad sísmica, diseño y reforzamiento estructural bajo la NSR-10, en Cali y el suroccidente colombiano.", // 15:16
      escritorio:
        "Evaluación de vulnerabilidad sísmica, diseño y reforzamiento estructural bajo la NSR-10, en Cali y el suroccidente colombiano. Ingeniería que se mide, se calcula y se firma.", // 18:45 · PDF p.1
    },
    agendar: "Agendar visita técnica", // I15:18
    descargarPortafolio: "Descargar portafolio (PDF, 1,9 MB)", // I15:20
    notaIlustrativa: "El modelo de la derecha es ilustrativo: desplazamientos exagerados, no es un resultado de análisis.", // 20:5327
    lienzo: {
      titulo: "Deriva por piso · ilustrativo", // I16:190;15:576
      leyenda: {
        cumple: "Cumple el límite", // I16:190;15:703
        cerca: "Cerca del límite", // I16:190;15:706
        excede: "Excede el límite", // I16:190;15:709
        sinDeformar: "Sin deformar", // I16:190;15:712
      },
      control: { etiqueta: "Intensidad del sismo", valor: "Sismo de diseño" }, // I16:190;15:715, 15:716
      rotulo:
        "Desplazamientos exagerados para visualizar. No es un resultado de análisis de ninguna edificación.", // I16:190;15:721
      // VALIDAR CON EL INGENIERO: redacción propia (no está en Figma); depende del límite de deriva y del mensaje del 3D.
      descripcionAccesible:
        "Pórtico de cinco pisos deformado por el sismo de diseño: los pisos 1 y 2 exceden el límite de deriva, el 3 está cerca y el 4 y el 5 cumplen.",
    },
  },

  // Móvil: 15:172, 15:175, 15:178, 15:181. Escritorio: 18:200 (cinco datos). PDF p.1–2.
  credenciales: [
    { cifra: "NSR-10", descripcion: "norma sismorresistente" },
    {
      cifra: "ASTM",
      descripcion: "ensayos de núcleos, esclerometría y ultrasonido",
      soloEscritorio: true,
    },
    {
      cifra: "+20",
      descripcion: {
        movil: "proyectos en el suroccidente",
        escritorio: "proyectos de vivienda, comercio, industria y equipamiento",
      },
    },
    { cifra: "130 t", descripcion: "de estructura metálica diseñada y montada" },
    {
      cifra: "3",
      descripcion: {
        movil: "departamentos: Valle, Cauca y Nariño",
        escritorio: "departamentos: Valle del Cauca, Cauca y Nariño",
      },
    },
  ],

  servicios: {
    titulo: "Del diagnóstico al reforzamiento, con un solo responsable técnico", // 15:185 · PDF p.3
    bajada: "Contrate el estudio que necesita o el ciclo completo: evaluar, modelar, diseñar, reforzar y construir.", // 15:186
    principal: {
      norma: "Servicio principal · NSR-10 Título A, Cap. A.10", // 15:190
      titulo: "Evaluación de vulnerabilidad sísmica", // 15:191
      descripcion:
        "Determinamos qué tan preparada está una edificación existente para el sismo de diseño y si necesita reforzamiento, con índices de sobreesfuerzo y flexibilidad y un presupuesto claro.", // 15:192
      paraQuien: ["Edificios en P.H.", "Colegios y clínicas", "Previas a 2010", "Post-sismo"], // 15:194–15:200
      accion: { etiqueta: "Ver la metodología", href: "#metodologia" }, // I15:202
      foto: "vulnerabilidad", // 15:188 (foto 15)
    },
    // I15:204, I15:209, I15:214, I15:219
    secundarios: [
      {
        titulo: "Modelado y análisis estructural",
        descripcion:
          "Modelos 3D por elementos finitos: análisis modal espectral, control de derivas y escenarios de reforzamiento comparados antes de construir.",
        entregable: "Entrega: modelo analítico y memoria de cálculo",
      },
      {
        titulo: "Diseño y cálculo estructural",
        descripcion:
          "Estructuras nuevas en concreto, mampostería estructural y acero, con planos y despieces listos para curaduría y obra.",
        entregable: "Entrega: memoria, planos y cantidades",
      },
      {
        titulo: "Reforzamiento estructural",
        descripcion:
          "Encamisados, muros de rigidización, arriostramientos metálicos, fibras de carbono y recalce de cimentaciones. Diseñamos y construimos.",
        entregable: "Entrega: diseño, obra y acta de entrega",
      },
      {
        titulo: "Peritaje de siniestros",
        descripcion:
          "Dictamen estructural de daños por sismo u otro siniestro, cuantificación con APU y soporte técnico ante la aseguradora.",
        entregable: "Entrega: informe pericial y presupuesto",
      },
    ],
  },

  cuandoSeNecesita: {
    titulo: "¿Cuándo necesita su edificación un estudio?", // 15:225 · PDF p.4
    introduccion:
      "Buena parte de las edificaciones de Cali se construyó antes de la NSR-10, con exigencias sísmicas menores a las actuales.", // 19:238 · PDF p.4
    foto: "obraCimentacion", // 19:235 (foto 6, solo escritorio)
    casos: [
      "Construida antes de la NSR-10 o sin planos estructurales", // 15:228
      "Ampliaciones en altura, nuevos pisos o cambios de uso", // 15:231
      "Colegios, clínicas, coliseos y otras edificaciones indispensables", // 15:234
      "Edificios y conjuntos tras un sismo, antes de reparar o reclamar", // 15:237
      "Compra, venta o financiación que exige concepto técnico", // 15:240
    ],
  },

  metodologia: {
    titulo: "Cómo evaluamos una edificación", // 16:339
    bajada: {
      movil:
        "El estudio responde con números a tres preguntas: qué tan expuesta está la estructura, dónde están sus puntos débiles y qué intervención la lleva al nivel de seguridad requerido.", // 16:340 · PDF p.4
      escritorio:
        "El estudio responde con números: qué tan expuesta está la estructura, dónde están sus puntos débiles y qué intervención la lleva al nivel de seguridad requerido.", // 19:257
    },
    foto: "metodologia", // 16:341 (foto 13)
    // I16:342 … I16:392 · PDF p.4
    pasos: [
      { titulo: "Información", descripcion: "Planos, estudios de suelos, licencias y antecedentes de la edificación." },
      { titulo: "Levantamiento", descripcion: "Geometría, sistema estructural y registro de daños y patologías." },
      { titulo: "Ensayos", descripcion: "No destructivos y semidestructivos sobre concreto, acero y mampostería." },
      { titulo: "Modelo", descripcion: "Modelo 3D calibrado con los resultados de campo y el espectro del sitio." },
      { titulo: "Índices", descripcion: "Sobreesfuerzo y flexibilidad por elemento y por piso (A.10.4)." },
      { titulo: "Decisión", descripcion: "Alternativas de reforzamiento con cantidades y presupuesto." },
    ],
  },

  ensayos: {
    titulo: "Ensayos y pruebas en sitio", // 16:402 · PDF p.5
    bajada:
      "Un modelo es tan bueno como los datos que lo alimentan. Medimos la estructura real, no la que se supone en los planos.", // 16:403
    foto: "ensayos", // 16:404 (foto 16)
    // Referencia y título: 16:407–16:432 (móvil). Descripción: Figma 04, 19:329–19:361 (visible también en móvil).
    lista: [
      { referencia: "ASTM C42", titulo: "Extracción de núcleos", descripcion: "Resistencia real f'c del concreto en laboratorio." },
      { referencia: "ASTM C805", titulo: "Esclerometría", descripcion: "Uniformidad del concreto y dónde extraer núcleos." },
      { referencia: "ASTM C597", titulo: "Ultrasonido", descripcion: "Fisuras internas, vacíos y concreto de baja calidad." },
      { referencia: "Acero", titulo: "Escaneo de refuerzo", descripcion: "Ubicación, cantidad y recubrimiento sin demoler." },
      { referencia: "Durabilidad", titulo: "Carbonatación y corrosión", descripcion: "Vida útil remanente del acero." },
      { referencia: "Patología", titulo: "Mapeo de fisuras", descripcion: "Daño estructural frente a no estructural." },
      { referencia: "Geometría", titulo: "Levantamiento estructural", descripcion: "La edificación tal como está." },
      { referencia: "Suelo", titulo: "Estudio geotécnico", descripcion: "Microzonificación sísmica de Cali." },
      { referencia: "Cimentación", titulo: "Apiques de verificación", descripcion: "Tipo, dimensiones y estado de la cimentación." },
    ],
    // 16:434–16:440 (en Figma cada ítem empieza con «— »; aquí la raya la pinta la lista)
    entregables: {
      titulo: "Lo que usted recibe",
      items: [
        "Informe de vulnerabilidad firmado por ingeniero estructural",
        "Resultados de laboratorio y registro fotográfico",
        "Planos de levantamiento estructural",
        "Modelo analítico y memoria de cálculo",
        "Índices de sobreesfuerzo y flexibilidad",
        "Alternativas de reforzamiento con presupuesto",
      ],
    },
  },

  obras: {
    titulo: "Obras en ejecución", // 16:442
    bajada: {
      movil:
        "El ingeniero que diseña el reforzamiento supervisa su construcción. Nuestro equipo ejecuta la obra civil y la estructura metálica.", // 16:443 · PDF p.8
      escritorio:
        "El ingeniero que diseña el reforzamiento supervisa su construcción. Nuestro equipo ejecuta la obra civil y la estructura metálica, con presupuesto por APU y cronograma por escrito.", // 19:373 · PDF p.8
    },
    // 16:445–16:456 (fotos 6, 3, 4 y 5)
    obras: [
      { foto: "obraCimentacion", pie: "Cimentación: formaleta y acero de refuerzo" },
      { foto: "obraEstructuraMetalica", pie: "Estructura metálica de cubierta" },
      { foto: "obraEdificioAndamio", pie: "Intervención de edificio en altura" },
      { foto: "obraLadera", pie: "Vivienda en ladera en construcción" },
    ],
    controles: { anterior: "Anterior", siguiente: "Siguiente" }, // 16:459, 16:461 (botones en la Sesión 4b)
  },

  proyectos: {
    titulo: "Proyectos", // 16:463
    bajada: "Diseño y cálculo de estructuras nuevas en concreto, mampostería y acero, del modelo al montaje.", // 16:464 · PDF p.7
    // 16:465, 16:477, 16:486 · PDF p.7. Sin foto hasta que el cliente confirme cuál corresponde a cada obra.
    fichas: [
      {
        tipologia: "Estructura metálica",
        // Sin nombre: «bodegas» y «naves industriales» (PDF p.2 y p.7).
        titulo: { conNombre: "Bodega Interplásticos", sinNombre: "Bodega industrial" },
        dato: { cifra: "60 t", descripcion: "Ampliación en estructura metálica" },
      },
      {
        tipologia: "Estructura metálica",
        // Sin nombre: «colegios» (PDF p.2).
        titulo: { conNombre: "Colegios públicos de Yumbo", sinNombre: "Colegios públicos" },
        dato: { cifra: "50 t", descripcion: "Cubiertas de dos instituciones educativas" },
      },
      {
        tipologia: "Estructura metálica",
        titulo: "Coliseo Buenos Aires, Cauca",
        dato: { cifra: "20 t", descripcion: "Cubierta curva, del modelo al montaje" },
      },
    ],
  },

  complementarios: {
    titulo: "Cuando termina la ingeniería, entregamos el espacio terminado", // 16:497 · PDF p.10
    bajada:
      "Sobre una estructura bien resuelta diseñamos y ejecutamos la arquitectura, los acabados y la adecuación comercial.", // 16:498
    items: [
      {
        titulo: "Diseño arquitectónico", // 16:502
        descripcion: {
          movil: "Renders 3D, recorridos 360° y trámites en curaduría.", // 16:503
          escritorio: "Vivienda, locales e interiores · renders 3D y recorridos 360° · planos y trámites en curaduría.", // 19:431 · PDF p.10
        },
        foto: { conNombre: "renderFachada", sinNombre: "renderFachada" }, // 16:500 (foto 1)
      },
      {
        titulo: "Espacios comerciales", // 16:507
        // Sin nombre: «Adecuación de locales y droguerías» (PDF p.10).
        descripcion: {
          movil: {
            conNombre: "Adecuación de locales y droguerías (Super Farma, Farmatodo).", // 16:508
            sinNombre: "Adecuación de locales y droguerías.",
          },
          escritorio: {
            conNombre: "Adecuación de locales y droguerías · fachadas, avisos y mobiliario · Super Farma, Farmatodo.", // 19:435
            // Sin nombre: la misma frase sin los clientes (PDF p.10).
            sinNombre: "Adecuación de locales y droguerías · fachadas, avisos y mobiliario.",
          },
        },
        // 16:505 (foto 18, con letrero del cliente). Sin autorización de nombres no se importa ni se
        // publica; la fila se pinta sin columna de foto. Al autorizarse: conNombre: "localComercial".
        foto: { conNombre: null, sinNombre: null },
      },
      {
        titulo: "Acabados y carpintería", // 16:512
        descripcion: {
          movil: "Pisos, enchapes, cielos, iluminación, cocinas y muebles a la medida.", // 16:513
          escritorio: "Pisos, enchapes, cielos, iluminación y baños · cocinas, closets y muebles a la medida.", // 19:439 · PDF p.10
        },
        foto: { conNombre: "mobiliario", sinNombre: "mobiliario" }, // 16:510 (foto 23)
      },
    ],
  },

  equipo: {
    titulo: "Dirección técnica", // 17:271 · PDF p.2
    personas: [
      {
        nombre: "Ing. Hugo Alberto Bohórquez", // 17:273
        rol: "Ingeniero especialista en estructuras · diseño, evaluación sísmica y reforzamiento", // 17:274
      },
      { nombre: "Arq. Emilio Ricaute", rol: "Arquitecto · diseño arquitectónico y coordinación con la ingeniería" }, // 17:276, 17:277
    ],
  },

  descargas: {
    titulo: "Descargas", // 17:280
    // 17:283–17:290. Verificado con los PDF corregidos (14-nov-2026): 11 págs., 1 869 076 B; 2 págs., 467 519 B.
    archivos: [
      { id: "portafolio", titulo: "Portafolio de ingeniería 2026", detalle: "PDF · 11 páginas · 1,9 MB" },
      { id: "tarjeta", titulo: "Tarjeta de presentación", detalle: "PDF · 2 páginas · 0,5 MB" },
    ],
  },

  preguntas: {
    titulo: "Preguntas frecuentes", // 17:294
    items: [
      {
        pregunta: "¿Qué recibo con un estudio de vulnerabilidad?", // 17:298
        respuesta:
          "Informe firmado por ingeniero estructural, resultados de laboratorio, planos de levantamiento, modelo analítico y memoria de cálculo, índices de sobreesfuerzo y flexibilidad, y alternativas de reforzamiento con presupuesto.", // 17:301
      },
      {
        pregunta: "¿Ustedes también ejecutan el reforzamiento?", // 17:304
        // VALIDAR CON EL DUEÑO: borrador con frases literales del PDF p.8.
        respuesta:
          "Sí. Diseñamos la intervención, la modelamos para verificar que cumple y la construimos con nuestro propio equipo. El ingeniero que diseñó el reforzamiento supervisa su construcción.",
      },
      {
        pregunta: "¿Me acompañan en la reclamación ante la aseguradora?", // 17:309
        // VALIDAR CON EL DUEÑO: borrador a partir del PDF p.9.
        respuesta:
          "Sí. Nuestros ingenieros estructurales documentan cada daño, establecen su causa, lo cuantifican y lo defienden con usted hasta la reparación, incluido el soporte técnico ante el ajustador y la aseguradora.",
      },
      {
        pregunta: "¿Qué pasa si mi edificación no tiene planos?", // 17:314
        // VALIDAR CON EL DUEÑO: borrador a partir del PDF p.4–5.
        respuesta:
          "El estudio parte de un levantamiento estructural en sitio: dimensiones de elementos, luces, alturas y ejes para construir el modelo con la edificación tal como está. El acero se ubica con escaneo de refuerzo, sin demoler.",
      },
      {
        pregunta: "¿Trabajan fuera de Cali?", // 20:367 (Figma 04; en todos los anchos)
        // VALIDAR CON EL DUEÑO: borrador a partir del PDF p.2 (cobertura) y p.9 (peritajes post-sismo).
        respuesta:
          "Sí. Trabajamos en el Valle del Cauca, el Cauca y Nariño, y desde el sismo del 10 de agosto de 2026 hemos hecho peritajes en Cali, Palmira y Armenia.",
      },
    ],
    introAsistente: "¿No encuentra su respuesta? El asistente responde preguntas sobre nuestros servicios.", // 20:340 (con el asistente, S7)
    asistente: "Preguntar al asistente", // I17:318 (oculto hasta la Sesión 7)
  },

  contacto: {
    titulo: "Agende la evaluación de su edificación", // 17:321 · PDF p.11
    bajada:
      "Cuéntenos qué tipo de estructura tiene y qué necesita saber. Le respondemos con una propuesta técnica clara y sin compromiso.", // 17:322
    botonWhatsApp: "Escribir por WhatsApp", // I17:323;10:65
    // 17:329, 17:332, 17:335, 17:338. «Teléfono»: dato confirmado por el dueño el 14-nov-2026 (no está en Figma).
    etiquetas: { whatsapp: "WhatsApp", telefono: "Teléfono", correo: "Correo", oficina: "Oficina", redes: "Redes" },
  },

  pie: {
    firma: "Luxxor Group · Ingeniería estructural y vulnerabilidad sísmica · Cali", // 17:341
    legales: { datos: "Política de tratamiento de datos", terminos: "Términos" }, // 17:343, 17:344 (ocultos hasta la Sesión 8)
    derechos: "© 2026 Luxxor Group", // 17:345
  },
} as const satisfies ContenidoLanding;

/** Id de cada sección (anclas del menú y de los botones). */
export const idsSecciones = {
  hero: "inicio",
  servicios: "servicios",
  cuandoSeNecesita: "cuando-se-necesita",
  metodologia: "metodologia",
  ensayos: "ensayos",
  obras: "obras",
  proyectos: "proyectos",
  complementarios: "complementarios",
  equipo: "equipo",
  descargas: "descargas",
  preguntas: "preguntas-frecuentes",
  contacto: "contacto",
} as const;

/** Rutas públicas de los PDF (los copia scripts/optimizar-fotos.mjs). */
export const archivosDescarga = {
  portafolio: "/descargas/luxxor-portafolio-2026.pdf",
  tarjeta: "/descargas/luxxor-tarjeta.pdf",
} as const;

/** Resuelve un texto responsivo que además puede nombrar a un cliente. */
export function resolverResponsivo(
  texto: TextoResponsivo<string | TextoCliente>,
  nombresClientes: boolean,
): TextoResponsivo {
  if (esResponsivo(texto)) {
    return { movil: resolverTexto(texto.movil, nombresClientes), escritorio: resolverTexto(texto.escritorio, nombresClientes) };
  }
  return resolverTexto(texto, nombresClientes);
}

/** Resuelve un texto que puede nombrar a un cliente según el interruptor de autorización. */
export function resolverTexto(texto: string | TextoCliente, nombresClientes: boolean): string {
  if (typeof texto === "string") return texto;
  return nombresClientes ? texto.conNombre : texto.sinNombre;
}

/** Foto de una fila de Complementarios según el interruptor de clientes. */
export function resolverFoto(
  foto: { conNombre: IdFoto | null; sinNombre: IdFoto | null },
  nombresClientes: boolean,
): IdFoto | null {
  return nombresClientes ? foto.conNombre : foto.sinNombre;
}
