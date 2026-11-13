import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { abrir, esMovil, GALERIA } from "./utilidades";

// wcag2aa incluye la regla color-contrast.
const ETIQUETAS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function analizar(page: Page) {
  const resultado = await new AxeBuilder({ page }).withTags(ETIQUETAS).analyze();
  const resumen = resultado.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
  return { resultado, resumen };
}

test("galería sin violaciones (incluido color-contrast)", async ({ page }) => {
  await abrir(page, GALERIA);
  const { resultado, resumen } = await analizar(page);
  expect(resultado.passes.some((r) => r.id === "color-contrast") || resultado.incomplete.some((r) => r.id === "color-contrast")).toBe(true);
  expect(resumen).toEqual([]);
});

test("página de inicio sin violaciones", async ({ page }) => {
  await abrir(page, "/");
  const { resumen } = await analizar(page);
  expect(resumen).toEqual([]);
});

test("menú móvil abierto sin violaciones", async ({ page }, info) => {
  test.skip(!esMovil(info), "solo móvil");
  await abrir(page, "/");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.getByRole("dialog", { name: "Menú" })).toBeVisible();
  const { resumen } = await analizar(page);
  expect(resumen).toEqual([]);
});
