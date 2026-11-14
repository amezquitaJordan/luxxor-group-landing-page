import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { funciones } from "@/config/sitio";
import { landing } from "@/contenido/landing";
import { DESTINO_FOTOS, DESTINO_PDF, FOTOS_EXCLUIDAS, LIMITES, fotos, pdfs } from "@/scripts/fotos.config.mjs";

const raiz = path.resolve(import.meta.dirname, "..", "..");

describe("tabla de fotos (scripts/fotos.config.mjs)", () => {
  it("la foto 28 está excluida y no aparece en la tabla", () => {
    expect(FOTOS_EXCLUIDAS).toContain("28.jpeg");
    expect(fotos.map((f) => f.origen)).not.toContain("28.jpeg");
  });

  it("las fotos 5, 6 y 7 recortan la franja de la fecha", () => {
    for (const origen of ["5.jpeg", "6.jpeg", "7.jpeg"]) {
      expect(fotos.find((f) => f.origen === origen)?.recorteInferior).toBeGreaterThanOrEqual(90);
    }
  });

  it("solo se publican fotos de nivel A o B", () => {
    for (const foto of fotos.filter((f) => f.publicar)) expect(["A", "B"]).toContain(foto.nivel);
  });

  it("los PDF son las versiones corregidas", () => {
    for (const pdf of pdfs) expect(pdf.origen).toMatch(/^pdf-corregidos\//);
  });
});

describe("salidas del script", () => {
  it("activos/fotos contiene exactamente las fotos publicadas", () => {
    const esperadas = fotos.filter((f) => f.publicar).map((f) => f.destino).sort();
    expect(readdirSync(path.join(raiz, DESTINO_FOTOS)).sort()).toEqual(esperadas);
  });

  it("cada foto mide ≤ 1600 px de lado y pesa ≤ 400 KB", async () => {
    for (const foto of fotos.filter((f) => f.publicar)) {
      const ruta = path.join(raiz, DESTINO_FOTOS, foto.destino);
      const { width = 0, height = 0, format } = await sharp(ruta).metadata();
      expect(format).toBe("jpeg");
      expect(Math.max(width, height)).toBeLessThanOrEqual(LIMITES.ladoMaximo);
      expect(statSync(ruta).size).toBeLessThanOrEqual(LIMITES.pesoMaximo);
    }
  });

  it("el peso de cada PDF coincide con la etiqueta de Descargas", () => {
    const etiquetaPeso = (bytes: number) => `${(bytes / 1_000_000).toFixed(1).replace(".", ",")} MB`;
    const porId = { portafolio: "luxxor-portafolio-2026.pdf", tarjeta: "luxxor-tarjeta.pdf" } as const;
    for (const archivo of landing.descargas.archivos) {
      const ruta = path.join(raiz, DESTINO_PDF, porId[archivo.id]);
      expect(existsSync(ruta)).toBe(true);
      expect(archivo.detalle.endsWith(etiquetaPeso(statSync(ruta).size))).toBe(true);
    }
  });
});

describe("foto 18 (letrero de un cliente) con nombresClientes apagado", () => {
  const foto18 = fotos.find((f) => f.origen === "18.jpeg")!;
  const base = path.parse(foto18.destino).name; // complementario-local-comercial

  it("el interruptor está apagado", () => {
    expect(funciones.nombresClientes).toBe(false);
  });

  it("la tabla no la procesa", () => {
    expect(foto18.publicar).toBe(false);
    for (const foto of fotos.filter((f) => "requiereNombresClientes" in f && f.requiereNombresClientes)) {
      expect(foto.publicar).toBe(funciones.nombresClientes);
    }
  });

  it("no está en activos/fotos ni la importa contenido/fotos.ts", () => {
    expect(readdirSync(path.join(raiz, DESTINO_FOTOS))).not.toContain(foto18.destino);
    expect(readFileSync(path.join(raiz, "contenido", "fotos.ts"), "utf8")).not.toContain(base);
  });

  it("no queda en .next/static/media (si hay build)", () => {
    const media = path.join(raiz, ".next", "static", "media");
    if (!existsSync(media)) return;
    expect(readdirSync(media).filter((archivo) => archivo.startsWith(base))).toEqual([]);
  });
});
