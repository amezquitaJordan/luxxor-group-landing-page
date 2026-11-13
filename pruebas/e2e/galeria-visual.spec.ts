import { expect, test } from "@playwright/test";
import { abrir, esMovil, GALERIA } from "./utilidades";

const componentes = [
  "boton-primario",
  "boton-secundario",
  "boton-texto",
  "boton-whatsapp",
  "chip",
  "dato",
  "eje",
  "cota",
  "ficha-servicio-principal",
  "ficha-servicio-secundaria",
  "ficha-proyecto",
  "paso-metodologia",
  "ficha-ensayo",
] as const;

test.describe("galería · capturas @visual", () => {
  test.beforeEach(({}, info) => {
    test.skip(info.project.name === "movil-360-claro", "360 px solo se usa para el encabezado");
  });

  for (const nombre of componentes) {
    test(nombre, async ({ page }) => {
      await abrir(page, GALERIA);
      await expect(page.locator(`[data-componente="${nombre}"]`)).toHaveScreenshot(`${nombre}.png`);
    });
  }

  for (const tipo of ["primario", "secundario", "texto"] as const) {
    test(`boton-${tipo} · hover y foco`, async ({ page }, info) => {
      test.skip(esMovil(info), "sin hover en pantallas táctiles");
      await abrir(page, GALERIA);
      const muestra = page.locator(`[data-componente="boton-${tipo}"]`);
      await muestra.locator("a").hover();
      await expect(muestra).toHaveScreenshot(`boton-${tipo}-hover.png`);
      await page.mouse.move(0, 0);
      await page.keyboard.press("Tab");
      await muestra.locator("a").focus();
      await expect(muestra).toHaveScreenshot(`boton-${tipo}-foco.png`);
    });
  }

  test("encabezado", async ({ page }) => {
    await abrir(page, "/");
    await expect(page.locator("header").first()).toHaveScreenshot("encabezado.png");
  });

  test("menú móvil abierto", async ({ page }, info) => {
    test.skip(!esMovil(info), "el menú solo existe en móvil");
    await abrir(page, "/");
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await expect(page.getByRole("dialog", { name: "Menú" })).toBeVisible();
    await expect(page).toHaveScreenshot("menu-movil.png");
  });

  test("botón flotante", async ({ page }) => {
    await abrir(page, "/");
    await expect(page.locator("[data-boton-flotante]")).toHaveScreenshot("boton-flotante.png");
  });
});
