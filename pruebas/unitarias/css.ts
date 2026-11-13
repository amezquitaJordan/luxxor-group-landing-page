import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/** Utilidades para leer los tokens de app/globals.css en las pruebas. */
export const cssGlobal = readFileSync(fileURLToPath(new URL("../../app/globals.css", import.meta.url)), "utf8");

/** Contenido entre llaves del primer bloque cuyo selector coincide (respeta llaves anidadas). */
export function bloque(css: string, selector: string): string {
  const inicio = css.indexOf(selector);
  if (inicio === -1) throw new Error(`No se encontró el bloque «${selector}»`);
  const apertura = css.indexOf("{", inicio);
  let profundidad = 0;
  for (let i = apertura; i < css.length; i++) {
    if (css[i] === "{") profundidad++;
    if (css[i] === "}") profundidad--;
    if (profundidad === 0) return css.slice(apertura + 1, i);
  }
  throw new Error(`Bloque «${selector}» sin cerrar`);
}

/** Declaraciones `--nombre: valor;` de un bloque, como mapa. */
export function variables(cuerpo: string, prefijo = "--"): Map<string, string> {
  const mapa = new Map<string, string>();
  for (const [, nombre, valor] of cuerpo.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    if (nombre.startsWith(prefijo)) mapa.set(nombre, valor.trim());
  }
  return mapa;
}

/** Sigue var(--x) hasta un valor literal usando los primitivos. */
export function resolver(valor: string, primitivos: Map<string, string>): string {
  let actual = valor;
  for (let paso = 0; paso < 5; paso++) {
    const referencia = /^var\((--[a-z0-9-]+)\)$/i.exec(actual);
    if (!referencia) return actual;
    const siguiente = primitivos.get(referencia[1]);
    if (!siguiente) throw new Error(`Variable sin definir: ${referencia[1]}`);
    actual = siguiente;
  }
  return actual;
}

export const primitivos = variables(bloque(cssGlobal, ":root {"), "--prim-");
export const tokensClaro = variables(bloque(cssGlobal, "@theme static {"), "--color-");
export const tokensOscuro = variables(bloque(cssGlobal, '[data-theme="dark"] {'), "--color-");
export const tokensSinJs = variables(bloque(cssGlobal, ":root:not([data-theme]) {"), "--color-");
