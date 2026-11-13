import type { Page, TestInfo } from "@playwright/test";

export const GALERIA = "/desarrollo/componentes";

export const esMovil = (info: TestInfo) => info.project.name.startsWith("movil");
export const esOscuro = (info: TestInfo) => info.project.name.endsWith("oscuro");

/** Carga una página con animaciones y transiciones apagadas (capturas estables). */
export async function abrir(page: Page, ruta: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(ruta);
  await page.evaluate(() => document.fonts.ready);
}
