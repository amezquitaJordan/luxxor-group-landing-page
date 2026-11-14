import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const raiz = path.resolve(import.meta.dirname, "..", "..");

function archivos(directorio: string): string[] {
  return readdirSync(directorio).flatMap((nombre) => {
    const ruta = path.join(directorio, nombre);
    return statSync(ruta).isDirectory() ? archivos(ruta) : /\.(ts|tsx|mts|mjs)$/.test(nombre) ? [ruta] : [];
  });
}

describe("animaciones sin Motion (entradas y salidas con CSS)", () => {
  it("package.json no depende de motion ni de framer-motion", () => {
    const paquete = JSON.parse(readFileSync(path.join(raiz, "package.json"), "utf8"));
    const dependencias = Object.keys({ ...paquete.dependencies, ...paquete.devDependencies });
    expect(dependencias).not.toContain("motion");
    expect(dependencias).not.toContain("framer-motion");
  });

  it("ningún archivo importa motion ni framer-motion", () => {
    const fuentes = ["app", "componentes", "lib", "contenido", "config"].flatMap((d) => archivos(path.join(raiz, d)));
    const conImportacion = fuentes.filter((f) => /from ["'](motion\/react|motion|framer-motion)["']/.test(readFileSync(f, "utf8")));
    expect(conImportacion).toEqual([]);
  });
});
