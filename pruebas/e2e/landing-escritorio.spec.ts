import { expect, test, type Page } from "@playwright/test";
import { abrir, esMovil } from "./utilidades";

/*
 * Sesión 5: composición de escritorio (Figma 04) y anchos intermedios (Figma 06).
 * Las pruebas de escritorio corren en los proyectos escritorio-1440 (claro y oscuro); las de anchos,
 * con setViewportSize desde un proyecto.
 */

/** Posición de los hijos directos de un contenedor (para contar columnas). */
async function posiciones(page: Page, selector: string) {
  return page.locator(selector).evaluateAll((elementos) =>
    elementos
      .filter((e) => getComputedStyle(e).display !== "none")
      .map((e) => {
        const r = e.getBoundingClientRect();
        return { x: Math.round(r.left), y: Math.round(r.top + window.scrollY) };
      }),
  );
}

/** Recorre la página para disparar la carga diferida de las fotos. */
async function recorrer(page: Page) {
  const alto = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 500) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(60);
  }
  await page.waitForLoadState("networkidle");
}

test.describe("escritorio (Figma 04)", () => {
  test.beforeEach(({}, info) => test.skip(esMovil(info), "escritorio"));

  test("columnas por sección a 1440", async ({ page }) => {
    await abrir(page, "/");
    const filas: [string, string, number][] = [
      ['section[aria-label="Credenciales"] li', "credenciales", 5],
      ["#servicios > div > div:last-child > article", "servicios secundarios", 4],
      ["#metodologia ol > li", "pasos de metodología", 6],
      ["#obras ul > li", "obras", 4],
      ["#proyectos ul > li", "proyectos", 3],
      ["#complementarios ul > li", "complementarios", 3],
    ];
    for (const [selector, nombre, cantidad] of filas) {
      const cajas = await posiciones(page, selector);
      expect(cajas, nombre).toHaveLength(cantidad);
      expect(new Set(cajas.map((c) => c.y)).size, `${nombre}: una sola fila`).toBe(1);
    }
    // Dos columnas: Dirección técnica | Descargas; FAQ (título | acordeón); Contacto (llamado | datos).
    for (const [izquierda, derecha] of [
      ["#equipo h2", "#descargas h2"],
      ["#preguntas-frecuentes h2", "#preguntas-frecuentes details >> nth=0"],
      ["#contacto h2", "#contacto dl"],
      ["#ensayos h2", "#ensayos ul >> nth=0"],
      ["#cuando-se-necesita img", "#cuando-se-necesita h2"],
    ] as const) {
      const a = (await page.locator(izquierda).boundingBox())!;
      const b = (await page.locator(derecha).boundingBox())!;
      expect(b.x, `${derecha} a la derecha de ${izquierda}`).toBeGreaterThan(a.x + a.width);
    }
  });

  test("hero en dos columnas con ejes decorativos y nota ilustrativa", async ({ page }) => {
    await abrir(page, "/");
    const h1 = (await page.locator("h1").boundingBox())!;
    const lienzo = (await page.locator("[data-lienzo]").boundingBox())!;
    expect(lienzo.x).toBeGreaterThan(h1.x + h1.width);
    const ejes = page.locator("#inicio > div > div[aria-hidden='true']");
    await expect(ejes).toBeVisible();
    await expect(ejes.locator("span")).toHaveCount(6); // cota + A–E
    await expect(page.getByText("El modelo de la derecha es ilustrativo", { exact: false })).toBeVisible();
    // El rótulo del lienzo queda para lectores de pantalla.
    await expect(page.locator("[data-lienzo] figcaption")).toHaveClass(/xl:sr-only/);
  });

  test("textos de Figma 04: versión de escritorio visible y la de móvil oculta", async ({ page }) => {
    await abrir(page, "/");
    await expect(page.getByText("Ingeniería que se mide, se calcula y se firma.", { exact: false })).toBeVisible();
    await expect(page.getByText("ASTM", { exact: true })).toBeVisible();
    await expect(page.getByText("proyectos en el suroccidente")).toBeHidden();
    await expect(page.getByText("Buena parte de las edificaciones de Cali", { exact: false })).toBeVisible();
  });

  test("Obras desde lg: sin controles, sin región desplazable y sin parada de Tab", async ({ page }) => {
    await abrir(page, "/");
    await expect(page.locator("#obras").getByRole("button")).toHaveCount(0); // ocultos con display: none
    await expect(page.getByRole("region", { name: "Fotos de obras en ejecución" })).toHaveCount(0);
    const contenedor = page.locator("#obras ul").locator("xpath=..");
    await expect(contenedor).not.toHaveAttribute("tabindex");
    await expect(contenedor).not.toHaveAttribute("role");
    // Tab recorre la página entera sin detenerse en la lista de obras.
    const total = await page.evaluate(() => document.querySelectorAll("a[href], button, summary, [tabindex]").length);
    for (let i = 0; i < total + 5; i++) {
      await page.keyboard.press("Tab");
      const dentro = await page.evaluate(() => {
        const activo = document.activeElement;
        const obras = document.querySelector("#obras ul")?.parentElement;
        return !!activo && !!obras && (activo === obras || obras.contains(activo));
      });
      expect(dentro, `pulsación ${i + 1}`).toBe(false);
    }
  });

  test("a 1440 la foto 13 (Metodología, solo móvil) no se descarga", async ({ page }) => {
    const pedidas: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("metodologia-levantamiento")) pedidas.push(r.url());
    });
    await abrir(page, "/");
    await recorrer(page);
    expect(pedidas).toEqual([]);
  });
});

test.describe("anchos (Figma 06)", () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== "escritorio-1440-claro", "un proyecto basta"));

  test("hero completo en 1366×768 y en la variante compacta (1366×650)", async ({ page }) => {
    for (const alto of [768, 650]) {
      await page.setViewportSize({ width: 1366, height: alto });
      await abrir(page, "/");
      for (const selector of ["h1", "#inicio a >> nth=0", "[data-lienzo]"]) {
        const caja = (await page.locator(selector).boundingBox())!;
        expect(caja.y + caja.height, `${selector} a 1366×${alto}`).toBeLessThanOrEqual(alto);
      }
    }
  });

  test("sin desplazamiento horizontal entre 768 y 2560 y en horizontal (844×390)", async ({ page }) => {
    for (const [ancho, alto] of [
      [768, 1024],
      [1024, 768],
      [1280, 800],
      [1366, 768],
      [1920, 1080],
      [2560, 1440],
      [844, 390],
    ] as const) {
      await page.setViewportSize({ width: ancho, height: alto });
      await abrir(page, "/");
      const desborda = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(desborda, `${ancho}×${alto}`).toBe(false);
    }
  });

  test("pantallas anchas: contenido de 1280 px centrado y fondos a sangre", async ({ page }) => {
    for (const ancho of [1920, 2560]) {
      await page.setViewportSize({ width: ancho, height: 1080 });
      await abrir(page, "/");
      const titulo = (await page.locator("#servicios h2").boundingBox())!;
      const tarjetas = await posiciones(page, "#complementarios ul > li");
      const ultima = (await page.locator("#complementarios ul > li").last().boundingBox())!;
      const izquierda = titulo.x;
      const derecha = ultima.x + ultima.width;
      expect(Math.round(derecha - izquierda), `ancho de contenido a ${ancho}`).toBe(1280);
      expect(Math.abs(izquierda - (ancho - derecha)), `centrado a ${ancho}`).toBeLessThanOrEqual(1);
      expect(tarjetas).toHaveLength(3);
      const fondo = (await page.locator("#servicios").boundingBox())!;
      expect(fondo.width).toBe(ancho);
    }
  });

  test("ningún texto visible mide menos de 14 px en escritorio (salvo decorativos y el logotipo)", async ({ page }) => {
    await abrir(page, "/");
    const pequenos = await page.evaluate(() => {
      const resultado: string[] = [];
      const recorrido = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (recorrido.nextNode()) {
        const nodo = recorrido.currentNode as Text;
        const padre = nodo.parentElement;
        if (!padre || !nodo.textContent?.trim()) continue;
        if (padre.closest("[aria-hidden='true'], .sr-only, dialog:not([open]), script, style")) continue;
        if (padre.closest("header a[href='/']")) continue;
        const estilo = getComputedStyle(padre);
        if (estilo.display === "none" || estilo.visibility === "hidden" || !padre.getClientRects().length) continue;
        if (parseFloat(estilo.fontSize) < 14) resultado.push(`${nodo.textContent.trim()} (${estilo.fontSize})`);
      }
      return resultado;
    });
    expect(pequenos).toEqual([]);
  });
});

test.describe("fotos por ancho", () => {
  test("a 390 la foto de «Cuándo se necesita» no se descarga (la 6 solo se pide para Obras)", async ({ page }, info) => {
    test.skip(info.project.name !== "movil-390-claro", "390 claro");
    const pedidas: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("obra-cimentacion")) pedidas.push(r.url());
    });
    await abrir(page, "/");
    await recorrer(page);
    // Una sola variante: la de Obras (280 px → w=640). La imagen de «Cuándo» (display: none) no se pide.
    expect(pedidas).toHaveLength(1);
    expect(pedidas[0]).toMatch(/[?&]w=640\b/);
    const cuando = page.locator("#cuando-se-necesita img");
    await expect(cuando).toBeHidden();
    expect(await cuando.evaluate((img: HTMLImageElement) => img.currentSrc)).toBe("");
  });
});
