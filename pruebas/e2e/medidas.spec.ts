import { expect, test, type Locator } from "@playwright/test";
import { abrir, esMovil, GALERIA } from "./utilidades";

/*
 * Medidas exactas contra Figma (02 · Componentes). Cada valor cita su nodo.
 * Diferencias decididas: botones con alto mínimo 44 px (Figma 40) — 13-nov-2026.
 */

async function estilo(locator: Locator) {
  return locator.evaluate((el) => {
    const cs = getComputedStyle(el);
    const caja = el.getBoundingClientRect();
    return {
      ancho: caja.width,
      alto: caja.height,
      pt: cs.paddingTop,
      pr: cs.paddingRight,
      pb: cs.paddingBottom,
      pl: cs.paddingLeft,
      radio: parseFloat(cs.borderTopLeftRadius),
      borde: cs.borderTopWidth,
      bordeInferior: cs.borderBottomWidth,
      separacion: cs.columnGap,
    };
  });
}

test.describe("medidas frente a Figma", () => {
  test.beforeEach(({}, info) => {
    test.skip(info.project.name.endsWith("oscuro"), "las medidas no dependen del tema");
  });

  test("Botón (10:50): alto 44, padding 12/24, radio 2, separación 8; secundario con borde 1,5", async ({ page }) => {
    await abrir(page, GALERIA);
    const primario = await estilo(page.locator('[data-componente="boton-primario"] a'));
    expect(primario.alto).toBe(44);
    expect([primario.pt, primario.pr, primario.pb, primario.pl]).toEqual(["12px", "24px", "12px", "24px"]);
    expect(primario.radio).toBe(2);
    expect(primario.separacion).toBe("8px");
    const secundario = await estilo(page.locator('[data-componente="boton-secundario"] a'));
    expect(secundario.alto).toBe(44);
    // Borde de 1,5 px (Figma) como sombra interior: Chrome redondea border-width a enteros.
    const sombra = await page.locator('[data-componente="boton-secundario"] a').evaluate((el) => getComputedStyle(el).boxShadow);
    expect(sombra).toContain("0px 0px 0px 1.5px inset");
    const texto = await estilo(page.locator('[data-componente="boton-texto"] a'));
    expect([texto.pr, texto.pl]).toEqual(["8px", "8px"]);
  });

  test("Botón Secundario en colores forzados: borde real de 1 px (las sombras se eliminan)", async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" });
    await abrir(page, GALERIA);
    const estilos = await page
      .locator('[data-componente="boton-secundario"] a')
      .evaluate((el) => {
        const cs = getComputedStyle(el);
        return { ancho: cs.borderTopWidth, estilo: cs.borderTopStyle, sombra: cs.boxShadow };
      });
    expect(estilos.ancho).toBe("1px");
    expect(estilos.estilo).toBe("solid");
    expect(estilos.sombra).toBe("none");
  });

  test("Botón WhatsApp (10:62): alto 44, padding 12/24, separación 10, ícono 20", async ({ page }) => {
    await abrir(page, GALERIA);
    const enlace = page.locator('[data-componente="boton-whatsapp"] a');
    const e = await estilo(enlace);
    expect(e.alto).toBe(44);
    expect([e.pt, e.pr]).toEqual(["12px", "24px"]);
    expect(e.separacion).toBe("10px");
    const icono = await enlace.locator("svg").boundingBox();
    expect(icono?.width).toBe(20);
  });

  test("Chip (10:66): padding 8/12, radio completo, borde 1", async ({ page }) => {
    await abrir(page, GALERIA);
    const e = await estilo(page.locator('[data-componente="chip"] span').first());
    expect([e.pt, e.pr]).toEqual(["8px", "12px"]);
    expect(e.radio).toBeGreaterThanOrEqual(e.alto / 2);
    expect(e.borde).toBe("1px");
  });

  test("Eje (10:75): círculo 32; Cota (10:79): topes de 13", async ({ page }) => {
    await abrir(page, GALERIA);
    const circulo = await page.locator('[data-componente="eje"] span').first().boundingBox();
    expect([circulo?.width, circulo?.height]).toEqual([32, 32]);
    const tope = await page.locator('[data-componente="cota"] span[aria-hidden] > span').first().boundingBox();
    expect(tope?.height).toBe(13);
  });

  test("Fichas (11:32, 11:34): padding 32, radio 4; proyecto con contenido 24/24/28/24", async ({ page }) => {
    await abrir(page, GALERIA);
    const secundaria = await estilo(page.locator('[data-componente="ficha-servicio-secundaria"] article'));
    expect(secundaria.pt).toBe("32px");
    expect(secundaria.radio).toBe(4);
    const contenido = await estilo(page.locator('[data-componente="ficha-proyecto"] article > div'));
    expect([contenido.pt, contenido.pr, contenido.pb, contenido.pl]).toEqual(["24px", "24px", "28px", "24px"]);
  });

  test("Encabezado (11:81): 64 px en móvil, 80 px en escritorio, controles de 44", async ({ page }, info) => {
    await abrir(page, "/");
    const encabezado = await page.locator("header").first().boundingBox();
    expect(encabezado?.height).toBe(esMovil(info) ? 64 : 80);
    const tema = await page.getByRole("button", { name: /Cambiar a modo/ }).first().boundingBox();
    expect([tema?.width, tema?.height]).toEqual([44, 44]);
  });

  test("Botón flotante (11:82): 56×56, a 20/24 px (móvil) o 40 px (escritorio) del borde", async ({ page }, info) => {
    await abrir(page, "/");
    const caja = (await page.locator("[data-boton-flotante]").boundingBox())!;
    const vista = page.viewportSize()!;
    expect([caja.width, caja.height]).toEqual([56, 56]);
    expect(vista.width - (caja.x + caja.width)).toBe(esMovil(info) ? 20 : 40);
    expect(vista.height - (caja.y + caja.height)).toBe(esMovil(info) ? 24 : 40);
  });

  test("Menú móvil (21:353): filas de 59 px", async ({ page }, info) => {
    test.skip(!esMovil(info), "solo móvil");
    await abrir(page, "/");
    await page.getByRole("button", { name: "Abrir menú" }).click();
    const fila = await page.getByRole("dialog").getByRole("link", { name: "Servicios" }).boundingBox();
    // 59 px en Figma a 390; el h2 fluido puede sumar décimas de píxel.
    expect(fila?.height).toBeCloseTo(59, 0);
  });
});
