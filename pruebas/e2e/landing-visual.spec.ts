import { expect, test, type Page } from "@playwright/test";
import { abrir, esMovil } from "./utilidades";

/*
 * Capturas por sección de la landing móvil (Figma 03 y 06). Escritorio llega en la Sesión 5.
 * Se ocultan el encabezado fijo y el botón flotante para que no tapen la sección capturada.
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

const OCULTAR_FIJOS = "header, [data-boton-flotante] { visibility: hidden !important; }";

/** Recorre la página para que carguen las fotos diferidas y espera a que todas estén decodificadas. */
async function cargarTodo(page: Page) {
  const alto = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 700) await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForFunction(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.addStyleTag({ content: OCULTAR_FIJOS });
}

test.describe("landing · secciones @visual", () => {
  test.beforeEach(({}, info) => test.skip(!esMovil(info), "la composición de escritorio llega en la Sesión 5"));

  test("390/360 por sección", async ({ page }) => {
    await abrir(page, "/");
    await cargarTodo(page);
    for (const { nombre, selector } of SECCIONES) {
      await expect.soft(page.locator(selector).first()).toHaveScreenshot(`seccion-${nombre}.png`);
    }
  });

  test("414 por sección", async ({ page }, info) => {
    test.skip(info.project.name === "movil-360-claro", "414 solo en los proyectos de 390 (claro y oscuro)");
    await page.setViewportSize({ width: 414, height: 896 });
    await abrir(page, "/");
    await cargarTodo(page);
    for (const { nombre, selector } of SECCIONES) {
      await expect.soft(page.locator(selector).first()).toHaveScreenshot(`seccion-${nombre}-414.png`);
    }
  });
});
