#!/usr/bin/env node
/**
 * Optimiza las fotos del cliente y copia los PDF corregidos.
 *
 *   npm run fotos -- --recursos "C:\Luxxor\recursos"      (o RUTA_RECURSOS en el entorno)
 *
 * Lee los originales FUERA del repo y escribe solo lo optimizado:
 *   activos/fotos/*.jpg   JPEG mozjpeg progresivo, sRGB, sin metadatos, lado ≤ 1600 px, ≤ 400 KB
 *   public/descargas/*.pdf
 * next/image sirve después las variantes AVIF/WebP. El script es idempotente.
 */
import { copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import { DESTINO_FOTOS, DESTINO_PDF, FOTOS_EXCLUIDAS, LIMITES, fotos, pdfs } from "./fotos.config.mjs";

const raiz = path.resolve(import.meta.dirname, "..");

function rutaRecursos() {
  const indice = process.argv.indexOf("--recursos");
  const ruta = indice > -1 ? process.argv[indice + 1] : process.env.RUTA_RECURSOS;
  if (!ruta) {
    console.error('Falta la carpeta de recursos: --recursos "C:\Luxxor\recursos" o RUTA_RECURSOS.');
    process.exit(1);
  }
  return path.resolve(ruta);
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function optimizarFoto(recursos, foto) {
  if (FOTOS_EXCLUIDAS.includes(foto.origen)) throw new Error(`${foto.origen} está excluida y no puede publicarse.`);
  const origen = path.join(recursos, foto.origen);
  const destino = path.join(raiz, DESTINO_FOTOS, foto.destino);
  const meta = await sharp(origen).metadata();
  const recorte = foto.recorteInferior ?? 0;

  // Calidad 80; si el resultado supera el límite se baja de 5 en 5 hasta 60.
  for (let calidad = 80; calidad >= 60; calidad -= 5) {
    let tubo = sharp(origen).rotate();
    if (recorte > 0) tubo = tubo.extract({ left: 0, top: 0, width: meta.width, height: meta.height - recorte });
    const info = await tubo
      .resize({ width: LIMITES.ladoMaximo, height: LIMITES.ladoMaximo, fit: "inside", withoutEnlargement: true })
      .toColourspace("srgb")
      .jpeg({ quality: calidad, mozjpeg: true, progressive: true })
      .toFile(destino);
    if (info.size <= LIMITES.pesoMaximo) {
      return { ...foto, entrada: `${meta.width}×${meta.height}`, salida: `${info.width}×${info.height}`, peso: info.size, calidad };
    }
  }
  throw new Error(`${foto.destino} supera ${kb(LIMITES.pesoMaximo)} incluso con calidad 60.`);
}

async function main() {
  const recursos = rutaRecursos();
  await mkdir(path.join(raiz, DESTINO_FOTOS), { recursive: true });
  await mkdir(path.join(raiz, DESTINO_PDF), { recursive: true });

  // Limpia salidas que ya no están en la tabla (p. ej., una foto que pasa a publicar: false).
  const esperadas = new Set(fotos.filter((f) => f.publicar).map((f) => f.destino));
  for (const archivo of await readdir(path.join(raiz, DESTINO_FOTOS))) {
    if (!esperadas.has(archivo)) await rm(path.join(raiz, DESTINO_FOTOS, archivo));
  }

  const filas = [];
  for (const foto of fotos.filter((f) => f.publicar)) {
    const r = await optimizarFoto(recursos, foto);
    filas.push({
      archivo: r.destino,
      origen: r.origen,
      nivel: r.nivel,
      entrada: r.entrada,
      salida: r.salida,
      recorte: r.recorteInferior ? `−${r.recorteInferior} px abajo` : "—",
      calidad: r.calidad,
      peso: kb(r.peso),
    });
  }
  for (const pdf of pdfs) {
    const destino = path.join(raiz, DESTINO_PDF, pdf.destino);
    await copyFile(path.join(recursos, pdf.origen), destino);
    const { size } = await stat(destino);
    filas.push({ archivo: pdf.destino, origen: pdf.origen, nivel: "PDF", entrada: "—", salida: "—", recorte: "—", calidad: "—", peso: `${(size / 1_000_000).toFixed(2)} MB` });
  }
  console.table(filas);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
