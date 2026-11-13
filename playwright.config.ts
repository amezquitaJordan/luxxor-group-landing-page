import { defineConfig, devices } from "@playwright/test";

const PUERTO = 3400;
const NEXT = "node node_modules/next/dist/bin/next";

/*
 * Pruebas E2E de la galería y del sitio contra un build de producción con la galería incluida
 * (GALERIA_COMPONENTES=1). Las capturas versionadas son solo las de Linux (-linux), generadas
 * en GitHub Actions con el workflow «Capturas visuales (Linux)» (.github/workflows/capturas.yml).
 */
export default defineConfig({
  testDir: "pruebas/e2e",
  snapshotPathTemplate: "{testDir}/__capturas__/{testFilePath}/{arg}-{projectName}{-platform}{ext}",
  fullyParallel: true,
  // Intermitencia conocida (Windows, 13-nov-2026): a veces todas las pruebas de un mismo navegador
  // se quedan esperando `load` porque los recursos de /_next/static no responden. Un reintento
  // abre un navegador nuevo. Pendiente de causa raíz (ver docs/plan-implementacion.md, S3).
  workers: 3,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  expect: {
    toHaveScreenshot: { animations: "disabled", caret: "hide", maxDiffPixelRatio: 0.01 },
  },
  use: {
    baseURL: `http://127.0.0.1:${PUERTO}`,
    trace: "retain-on-failure",
    locale: "es-CO",
  },
  projects: [
    // Móvil con densidad 2, como los teléfonos reales (los bordes de 1,5 px se ven como tales).
    { name: "movil-360-claro", use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, colorScheme: "light", hasTouch: true } },
    { name: "movil-390-claro", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light", hasTouch: true } },
    { name: "movil-390-oscuro", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "dark", hasTouch: true } },
    { name: "escritorio-1440-claro", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, colorScheme: "light" } },
    { name: "escritorio-1440-oscuro", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, colorScheme: "dark" } },
  ],
  webServer: {
    command: `${NEXT} build && ${NEXT} start -p ${PUERTO}`,
    env: { GALERIA_COMPONENTES: "1" },
    url: `http://127.0.0.1:${PUERTO}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
