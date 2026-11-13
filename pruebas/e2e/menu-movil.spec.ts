import { expect, test, type Page } from "@playwright/test";
import { abrir, esMovil } from "./utilidades";

test.beforeEach(({}, info) => {
  test.skip(!esMovil(info) || info.project.name === "movil-390-oscuro", "comportamiento del menú: un proyecto móvil basta");
});

async function abrirMenu(page: Page) {
  await abrir(page, "/");
  const disparador = page.getByRole("button", { name: "Abrir menú" });
  await disparador.click();
  const dialogo = page.getByRole("dialog", { name: "Menú" });
  await expect(dialogo).toBeVisible();
  return { disparador, dialogo };
}

async function estadoCerrado(page: Page) {
  const disparador = page.getByRole("button", { name: "Abrir menú" });
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(disparador).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("html")).not.toHaveAttribute("data-scroll-bloqueado");
  await expect(page.locator("[data-boton-flotante]")).toBeVisible();
}

test("abre: aria-expanded, foco en «Servicios», scroll bloqueado y flotante oculto", async ({ page }) => {
  const { disparador, dialogo } = await abrirMenu(page);
  await expect(disparador).toHaveAttribute("aria-expanded", "true");
  await expect(dialogo.getByRole("link", { name: "Servicios" })).toBeFocused();
  await expect(page.locator("html")).toHaveAttribute("data-scroll-bloqueado", "");
  await expect(page.locator("[data-boton-flotante]")).toHaveCount(0);
});

test("el foco no sale del diálogo con Tab", async ({ page }) => {
  const { dialogo } = await abrirMenu(page);
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press("Tab");
    const dentro = await page.evaluate(() => {
      const activo = document.activeElement;
      return !activo || activo === document.body || !!activo.closest("dialog");
    });
    expect(dentro, `pulsación ${i + 1}`).toBe(true);
  }
  await expect(dialogo).toBeVisible();
});

test("Escape cierra y devuelve el foco a «Abrir menú»", async ({ page }) => {
  await abrirMenu(page);
  await page.keyboard.press("Escape");
  await estadoCerrado(page);
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
});

test("Escape dos veces seguidas deja el estado coherente", async ({ page }) => {
  await abrirMenu(page);
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await estadoCerrado(page);
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
});

test("«Cerrar menú» cierra y devuelve el foco", async ({ page }) => {
  const { dialogo } = await abrirMenu(page);
  await dialogo.getByRole("button", { name: "Cerrar menú" }).click();
  await estadoCerrado(page);
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
});

test("el scroll de la página no se mueve con el menú abierto", async ({ page }) => {
  await abrirMenu(page);
  const antes = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(200);
  expect(await page.evaluate(() => window.scrollY)).toBe(antes);
});

test("tocar un enlace cierra el menú y cambia el hash", async ({ page }) => {
  const { dialogo } = await abrirMenu(page);
  await dialogo.getByRole("link", { name: "Contacto" }).click();
  await estadoCerrado(page);
  await expect(page).toHaveURL(/#contacto$/);
});

test("al pasar a escritorio con el menú abierto, se cierra", async ({ page }) => {
  await abrirMenu(page);
  await page.setViewportSize({ width: 1100, height: 844 });
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.locator("html")).not.toHaveAttribute("data-scroll-bloqueado");
});
