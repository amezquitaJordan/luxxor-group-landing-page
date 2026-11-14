/**
 * Tabla de fotos y PDF que se publican (Sesión 4). La lee scripts/optimizar-fotos.mjs y la
 * verifican las pruebas unitarias. Roles y niveles según Figma, página 07 · Recursos.
 *
 * recorteInferior: píxeles que se quitan abajo para ocultar la marca de fecha de la cámara
 * (medida en los originales: la fecha ocupa la franja de 55–80 px sobre el borde inferior).
 */

/** Fotos que nunca se publican. La 28 lleva marca de agua de terceros (TikTok @apexfitout). */
export const FOTOS_EXCLUIDAS = Object.freeze(["28.jpeg"]);

export const LIMITES = Object.freeze({ ladoMaximo: 1600, pesoMaximo: 400 * 1024 });

export const fotos = Object.freeze([
  { origen: "15.jpeg", destino: "vulnerabilidad-medicion-fisura.jpg", nivel: "A", publicar: true },
  { origen: "13.jpeg", destino: "metodologia-levantamiento.jpg", nivel: "B", publicar: true },
  { origen: "16.jpeg", destino: "ensayos-inspeccion-columna.jpg", nivel: "A", publicar: true },
  { origen: "6.jpeg", destino: "obra-cimentacion.jpg", nivel: "A", publicar: true, recorteInferior: 100 },
  { origen: "3.jpeg", destino: "obra-estructura-metalica.jpg", nivel: "A", publicar: true },
  { origen: "4.jpeg", destino: "obra-edificio-andamio.jpg", nivel: "A", publicar: true },
  { origen: "5.jpeg", destino: "obra-ladera.jpg", nivel: "A", publicar: true, recorteInferior: 100 },
  { origen: "1.jpeg", destino: "complementario-render-fachada.jpg", nivel: "B", publicar: true },
  // Lleva el letrero de Super Farma (nombre de cliente sin autorización). Con
  // funciones.nombresClientes = false no se procesa ni se importa, para que no quede servible en el
  // build. Al autorizarse: publicar: true y volver a añadirla en contenido/fotos.ts y landing.ts.
  { origen: "18.jpeg", destino: "complementario-local-comercial.jpg", nivel: "B", publicar: false, requiereNombresClientes: true },
  { origen: "23.jpeg", destino: "complementario-mobiliario.jpg", nivel: "B", publicar: true },
  // Sin lugar en Figma (03 ni 04): recorte definido, no se publica.
  { origen: "7.jpeg", destino: "obra-cimentacion-2.jpg", nivel: "B", publicar: false, recorteInferior: 100 },
]);

/** Versiones corregidas por el dueño (www.luxxor.com.co y QR nuevo), en <recursos>/pdf-corregidos. */
export const pdfs = Object.freeze([
  { origen: "pdf-corregidos/luxxor-portafolio-2026.pdf", destino: "luxxor-portafolio-2026.pdf" },
  { origen: "pdf-corregidos/luxxor-tarjeta.pdf", destino: "luxxor-tarjeta.pdf" },
]);

export const DESTINO_FOTOS = "activos/fotos";
export const DESTINO_PDF = "public/descargas";
