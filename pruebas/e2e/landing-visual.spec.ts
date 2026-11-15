import { expect, test, type Page } from "@playwright/test";
import { abrir, esMovil } from "./utilidades";

/*
 * Capturas por sección: móvil (Figma 03 y 06: 360, 390 y 414), escritorio (Figma 04: 1440) y 768.
 * Se ocultan el encabezado fijo y el botón flotante para que no tapen la sección capturada.
 * El flotante se oculta con display: none: durante una transición CSS el navegador ignora un
 * `visibility: hidden !important` (las transiciones ganan a las declaraciones !important).
 */
const SECCIONES: { nombre: string; selector: string }[] = [
  { nombre: "hero", selector: "#inicio" },
  { nombre: "credenciales", selector: 'section[aria-label="Credenciales"]' },
  { nombre: "servicios", selector: "#servicios" },
  { nombre: "cuando-se-necesita", selector: "#cuando-se-necesita" },
  { nombre: "metodologia", selector: "#metodologia" },
  { nombre: "ensayos", selector: "#ensayos" },
  { nombre: "obras", selector: "#obras" },
  { nombre: "proyectos", selector: "#proyectos" },
  { nombre: "complementarios", selector: "#complementarios" },
  { nombre: "equipo", selector: "#equipo" },
  { nombre: "descargas", selector: "#descargas" },
  { nombre: "preguntas-frecuentes", selector: "#preguntas-frecuentes" },
  { nombre: "contacto", selector: "#contacto" },
  { nombre: "pie", selector: "body > footer, footer[data-theme]" },
];

/** En escritorio, Dirección técnica y Descargas van en una banda: se captura la banda entera. */
const SECCIONES_ESCRITORIO = [
  ...SECCIONES.filter((s) => s.nombre !== "equipo" && s.nombre !== "descargas"),
  { nombre: "equipo-y-descargas", selector: "main > div:has(> div > #equipo)" },
];

const OCULTAR_FIJOS = "header { visibility: hidden !important; } [data-boton-flotante] { display: none !important; }";

/** Recorre la página para que carguen las fotos diferidas y espera a que todas estén decodificadas. */
async function cargarTodo(page: Page) {
  const alto = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 700) await page.evaluate((v) => window.scrollTo(0, v), y);
  // Solo las que se pintan: las ocultas con display: none (foto 6 en móvil, 13 en escritorio) no se descargan.
  await page.waitForFunction(() =>
    [...document.images].filter((img) => img.getClientRects().length).every((img) => img.complete && img.naturalWidth > 0),
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.addStyleTag({ content: OCULTAR_FIJOS });
}

test.describe("landing · secciones @visual", () => {
  test("390/360 por sección", async ({ page }, info) => {
    test.skip(!esMovil(info), "móvil");
    await abrir(page, "/");
    await cargarTodo(page);
    for (const { nombre, selector } of SECCIONES) {
      await expect.soft(page.locator(selector).first()).toHaveScreenshot(`seccion-${nombre}.png`);
    }
  });

  test("414 por sección", async ({ page }, info) => {
    test.skip(!esMovil(info) || info.project.name === "movil-360-claro", "414 solo en los proyectos de 390 (claro y oscuro)");
    await page.setViewportSize({ width: 414, height: 896 });
    await abrir(page, "/");
    await cargarTodo(page);
    for (const { nombre, selector } of SECCIONES) {
      await expect.soft(page.locator(selector).first()).toHaveScreenshot(`seccion-${nombre}-414.png`);
    }
  });

  test("1440 por sección", async ({ page }, info) => {
    test.skip(esMovil(info), "escritorio");
    await abrir(page, "/");
    await cargarTodo(page);
    for (const { nombre, selector } of SECCIONES_ESCRITORIO) {
      await expect.soft(page.locator(selector).first()).toHaveScreenshot(`seccion-${nombre}.png`);
    }
  });

  test("768 por sección", async ({ page }, info) => {
    test.skip(info.project.name !== "movil-390-claro", "768 solo en claro");
    await page.setViewportSize({ width: 768, height: 1024 });
    await abrir(page, "/");
    await cargarTodo(page);
    for (const { nombre, selector } of SECCIONES) {
      await expect.soft(page.locator(selector).first()).toHaveScreenshot(`seccion-${nombre}-768.png`);
    }
  });
});

test.describe("landing · primer pantallazo @visual", () => {
  test("1366×768 (Figma 06, 20:6175)", async ({ page }, info) => {
    test.skip(esMovil(info), "escritorio");
    await page.setViewportSize({ width: 1366, height: 768 });
    await abrir(page, "/");
    await page.addStyleTag({ content: "[data-boton-flotante] { display: none !important; }" });
    await expect(page).toHaveScreenshot("primer-pantallazo-1366x768.png");
  });
});
