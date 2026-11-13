import { expect, test } from "@playwright/test";
import { esOscuro } from "./utilidades";

test("con «dark» guardado, data-theme es dark desde domcontentloaded (sin parpadeo)", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");
});

test("sin preferencia guardada, sigue el esquema del sistema", async ({ page }, info) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", esOscuro(info) ? "dark" : "light");
});

test("el botón de tema alterna y persiste", async ({ page }, info) => {
  await page.goto("/");
  const inicial = esOscuro(info) ? "dark" : "light";
  const otro = inicial === "dark" ? "light" : "dark";
  await page.getByRole("button", { name: /Cambiar a modo/ }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", otro);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", otro);
});
