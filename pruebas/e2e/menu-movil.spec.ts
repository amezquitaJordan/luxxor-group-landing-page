import { expect, test, type Page } from "@playwright/test";
import { abrir, esMovil, esperarFlotanteOculto, esperarFlotanteVisible } from "./utilidades";

test.beforeEach(({}, info) => {
  test.skip(!esMovil(info) || info.project.name === "movil-390-oscuro", "comportamiento del menú: un proyecto móvil basta");
});

async function abrirMenu(page: Page) {
  await abrir(page, "/");
  // Arriba de la página el lienzo oculta el flotante (motivo «lienzo»). Esperarlo oculto confirma que
  // la página ya hidrató y los observadores arrancaron; luego se baja a Servicios, donde debe verse.
  await esperarFlotanteOculto(page);
  await page.evaluate(() => document.getElementById("servicios")!.scrollIntoView());
  await esperarFlotanteVisible(page);
  const disparador = page.getByRole("button", { name: "Abrir menú" });
  await disparador.click();
  const dialogo = page.getByRole("dialog", { name: "Menú" });
  await expect(dialogo).toBeVisible();
  return { disparador, dialogo };
}

async function estadoCerrado(page: Page, flotante: "visible" | "oculto" = "visible") {
  const disparador = page.getByRole("button", { name: "Abrir menú" });
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(disparador).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("html")).not.toHaveAttribute("data-scroll-bloqueado");
  if (flotante === "visible") await esperarFlotanteVisible(page);
  else await esperarFlotanteOculto(page);
}

test("abre: aria-expanded, foco en «Servicios», scroll bloqueado y flotante oculto", async ({ page }) => {
  const { disparador, dialogo } = await abrirMenu(page);
  await expect(disparador).toHaveAttribute("aria-expanded", "true");
  await expect(dialogo.getByRole("link", { name: "Servicios" })).toBeFocused();
  await expect(page.locator("html")).toHaveAttribute("data-scroll-bloqueado", "");
  await esperarFlotanteOculto(page);
});

test("transición CSS: el menú termina opaco y, con movimiento reducido, sin desplazamiento", async ({ page }) => {
  // abrir() emula prefers-reduced-motion: reduce.
  const { dialogo } = await abrirMenu(page);
  await expect.poll(() => dialogo.evaluate((d) => getComputedStyle(d).opacity)).toBe("1");
  expect(await dialogo.evaluate((d) => getComputedStyle(d).translate)).toBe("none");
});

test("transición CSS sin movimiento reducido: entra desde -8 px y queda en su sitio", async ({ page }) => {
  await abrirMenu(page);
  await page.getByRole("button", { name: "Cerrar menú" }).click();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Abrir menú" }).click();
  const dialogo = page.getByRole("dialog", { name: "Menú" });
  await expect.poll(() => dialogo.evaluate((d) => getComputedStyle(d).opacity)).toBe("1");
  await expect.poll(() => dialogo.evaluate((d) => getComputedStyle(d).translate)).toMatch(/^(0px|0px 0px)$/);
  const propiedades = await dialogo.evaluate((d) => getComputedStyle(d).transitionProperty);
  expect(propiedades).toContain("opacity");
  expect(propiedades).toContain("display");
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
  // Con Contacto en pantalla el flotante queda oculto (motivo «contacto»).
  await estadoCerrado(page, "oculto");
  await expect(page).toHaveURL(/#contacto$/);
});

test("al pasar a escritorio con el menú abierto, se cierra", async ({ page }) => {
  await abrirMenu(page);
  await page.setViewportSize({ width: 1100, height: 844 });
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.locator("html")).not.toHaveAttribute("data-scroll-bloqueado");
});
