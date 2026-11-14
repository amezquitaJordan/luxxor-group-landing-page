import { expect, type Page, type TestInfo } from "@playwright/test";

export const GALERIA = "/desarrollo/componentes";

export const esMovil = (info: TestInfo) => info.project.name.startsWith("movil");
export const esOscuro = (info: TestInfo) => info.project.name.endsWith("oscuro");

/** Carga una página con animaciones y transiciones apagadas (capturas estables). */
export async function abrir(page: Page, ruta: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(ruta);
  await page.evaluate(() => document.fonts.ready);
}

/** Nombre accesible del botón flotante (y de los botones de WhatsApp de la página). */
const NOMBRE_WHATSAPP = "Escribir por WhatsApp (se abre en otra pestaña)";

/**
 * Botón flotante oculto: no visible, con `inert` y fuera del árbol de accesibilidad.
 * (Siempre está montado; desde la retirada de Motion se oculta con CSS.)
 */
export async function esperarFlotanteOculto(page: Page) {
  const flotante = page.locator("[data-boton-flotante]");
  await expect(flotante).toBeHidden();
  await expect(flotante).toHaveAttribute("inert", "");
  await expect(flotante).toHaveAttribute("data-visible", "false");
  // getByRole solo encuentra elementos del árbol de accesibilidad: ninguno puede ser el flotante.
  const enArbol = await page
    .getByRole("link", { name: NOMBRE_WHATSAPP, exact: true })
    .evaluateAll((enlaces) => enlaces.filter((e) => e.hasAttribute("data-boton-flotante")).length);
  expect(enArbol).toBe(0);
}

/** Botón flotante visible, enfocable y en el árbol de accesibilidad. */
export async function esperarFlotanteVisible(page: Page) {
  const flotante = page.locator("[data-boton-flotante]");
  await expect(flotante).toBeVisible();
  await expect(flotante).not.toHaveAttribute("inert");
  await expect(flotante).toHaveAttribute("data-visible", "true");
}
