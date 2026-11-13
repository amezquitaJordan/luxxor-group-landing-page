import { expect, test } from "@playwright/test";
import { abrir, esMovil } from "./utilidades";

test("el encabezado cabe sin desbordar y sus controles miden al menos 44×44", async ({ page }, info) => {
  await abrir(page, "/");
  const desborda = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(desborda).toBe(false);

  const controles = esMovil(info)
    ? [page.getByRole("button", { name: /Cambiar a modo/ }), page.getByRole("link", { name: /^Agendar/ }).first(), page.getByRole("button", { name: "Abrir menú" })]
    : [page.getByRole("button", { name: /Cambiar a modo/ }), page.getByRole("link", { name: /Agendar visita técnica/ }).first()];
  for (const control of controles) {
    const caja = (await control.boundingBox())!;
    expect(caja.width).toBeGreaterThanOrEqual(44);
    expect(caja.height).toBeGreaterThanOrEqual(44);
  }
});

test("navegación: enlaces visibles en escritorio, botón de menú en móvil", async ({ page }, info) => {
  await abrir(page, "/");
  const navegacion = page.getByRole("navigation", { name: "Principal" });
  if (esMovil(info)) {
    await expect(navegacion).toBeHidden();
    await expect(page.getByRole("button", { name: "Abrir menú" })).toBeVisible();
  } else {
    await expect(navegacion.getByRole("link")).toHaveCount(5);
    await expect(page.getByRole("button", { name: "Abrir menú" })).toBeHidden();
  }
});

test("«Saltar al contenido» aparece con el teclado y lleva al contenido", async ({ page }) => {
  await abrir(page, "/");
  await page.keyboard.press("Tab");
  const saltar = page.getByRole("link", { name: "Saltar al contenido" });
  await expect(saltar).toBeFocused();
  await expect(saltar).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contenido$/);
});
