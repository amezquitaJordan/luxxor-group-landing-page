import { expect, test } from "@playwright/test";
import { abrir, esMovil } from "./utilidades";

/** Orden de Figma 03 (15:2). Credenciales no lleva id; Descargas está encendida. */
const SECCIONES = [
  "inicio",
  "servicios",
  "cuando-se-necesita",
  "metodologia",
  "ensayos",
  "obras",
  "proyectos",
  "complementarios",
  "equipo",
  "descargas",
  "preguntas-frecuentes",
  "contacto",
];

const NOMBRES_CLIENTES = /interpl[aá]sticos|tecnoqu[ií]micas|farmatodo|super ?farma|yumbo|wan su lay/i;

test.describe("estructura", () => {
  test("secciones en el orden de Figma y un solo h1", async ({ page }) => {
    await abrir(page, "/");
    const ids = await page.locator("main > section[id]").evaluateAll((s) => s.map((e) => e.id));
    expect(ids).toEqual(SECCIONES);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("Sabemos cómo se comporta su edificación ante un sismo.");
  });

  test("los encabezados no saltan niveles", async ({ page }) => {
    await abrir(page, "/");
    const niveles = await page.locator("h1, h2, h3, h4, h5, h6").evaluateAll((h) => h.map((e) => Number(e.tagName[1])));
    expect(niveles[0]).toBe(1);
    for (let i = 1; i < niveles.length; i++) expect(niveles[i]! - niveles[i - 1]!).toBeLessThanOrEqual(1);
  });

  test("cada ancla interna lleva a un id existente", async ({ page }) => {
    await abrir(page, "/");
    const destinos = await page.locator('a[href^="#"]').evaluateAll((a) => a.map((e) => e.getAttribute("href")!.slice(1)));
    for (const id of new Set(destinos)) await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  });

  test("el ancla deja la sección bajo el encabezado fijo", async ({ page }) => {
    await abrir(page, "/");
    await page.getByRole("link", { name: "Ver la metodología" }).click();
    await expect(page).toHaveURL(/#metodologia$/);
    const titulo = (await page.locator("#metodologia h2").boundingBox())!;
    const encabezado = (await page.locator("header").first().boundingBox())!;
    expect(titulo.y).toBeGreaterThanOrEqual(encabezado.y + encabezado.height - 1);
  });
});

test.describe("contenido apagado y datos", () => {
  test("sin nombres de clientes, enlaces legales ni «Preguntar al asistente»", async ({ page }) => {
    await abrir(page, "/");
    const texto = await page.locator("body").innerText();
    expect(texto).not.toMatch(NOMBRES_CLIENTES);
    const html = await page.content();
    expect(html).not.toMatch(NOMBRES_CLIENTES);
    await expect(page.getByRole("navigation", { name: "Legal" })).toHaveCount(0);
    await expect(page.getByText("Preguntar al asistente")).toHaveCount(0);
    await expect(page.locator('a[href="/politica-de-datos"], a[href="/terminos"]')).toHaveCount(0);
  });

  test("Contacto: WhatsApp oficial y teléfono de operaciones", async ({ page }) => {
    await abrir(page, "/");
    const contacto = page.locator("#contacto");
    await expect(contacto.getByRole("link", { name: "+57 300 195 1936" })).toHaveAttribute("href", "tel:+573001951936");
    await expect(contacto.getByRole("link", { name: /\+57 317 030 3333/ })).toHaveAttribute("href", /^https:\/\/wa\.me\/573170303333/);
    await expect(contacto.getByRole("link", { name: /Escribir por WhatsApp/ })).toHaveAttribute("href", /^https:\/\/wa\.me\/573170303333/);
  });

  test("regla única: todo tel: es el teléfono y todo wa.me es el WhatsApp", async ({ page }) => {
    await abrir(page, "/");
    // Incluye los enlaces del menú móvil (el <dialog> cerrado sigue en el DOM).
    const tel = await page.locator('a[href^="tel:"]').evaluateAll((a) => a.map((e) => e.getAttribute("href")));
    const whatsapp = await page.locator('a[href*="wa.me"]').evaluateAll((a) => a.map((e) => e.getAttribute("href")!));
    expect(tel.length).toBeGreaterThanOrEqual(2);
    expect(new Set(tel)).toEqual(new Set(["tel:+573001951936"]));
    expect(whatsapp.length).toBeGreaterThanOrEqual(4);
    for (const href of whatsapp) expect(new URL(href).pathname).toBe("/573170303333");
  });

  test("los PDF de Descargas y del hero responden 200 con application/pdf", async ({ page, request }) => {
    await abrir(page, "/");
    const enlaces = [
      page.getByRole("link", { name: "Descargar portafolio (PDF, 1,9 MB)" }),
      page.locator("#descargas").getByRole("link", { name: /Portafolio de ingeniería 2026/ }),
      page.locator("#descargas").getByRole("link", { name: /Tarjeta de presentación/ }),
    ];
    for (const enlace of enlaces) {
      const href = (await enlace.getAttribute("href"))!;
      expect(href).toMatch(/^\/descargas\/.+\.pdf$/);
      const respuesta = await request.get(href);
      expect(respuesta.status()).toBe(200);
      expect(respuesta.headers()["content-type"]).toContain("application/pdf");
    }
  });

  test("las fotos se sirven optimizadas (AVIF o WebP) y con texto alternativo", async ({ page }) => {
    await abrir(page, "/");
    const fotos = page.locator("main img");
    await expect(fotos).toHaveCount(9); // las 9 fotos publicadas (la 18 no se procesa con los clientes apagados)
    for (const foto of await fotos.all()) {
      expect((await foto.getAttribute("alt"))?.length).toBeGreaterThan(10);
      expect(await foto.getAttribute("src")).toMatch(/^\/_next\/image\?url=%2F_next%2Fstatic%2Fmedia%2F/);
    }
    const respuesta = await page.request.get((await fotos.first().getAttribute("src"))!, { headers: { accept: "image/avif,image/webp,*/*" } });
    expect(respuesta.headers()["content-type"]).toMatch(/image\/(avif|webp)/);
  });
});

test.describe("responsive (móvil)", () => {
  test.beforeEach(({}, info) => test.skip(!esMovil(info), "solo móvil"));

  test("320 px: sin desplazamiento horizontal", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await abrir(page, "/");
    const desborda = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(desborda).toBe(false);
  });

  test("360×640: titular y CTA principal en el primer pantallazo", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await abrir(page, "/");
    for (const elemento of [page.locator("h1"), page.locator("#inicio").getByRole("link", { name: /Agendar visita técnica/ })]) {
      const caja = (await elemento.boundingBox())!;
      expect(caja.y + caja.height).toBeLessThanOrEqual(640);
    }
  });

  test("ningún texto visible mide menos de 14 px (salvo decorativos y el logotipo)", async ({ page }) => {
    await abrir(page, "/");
    const pequenos = await page.evaluate(() => {
      const resultado: string[] = [];
      const recorrido = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (recorrido.nextNode()) {
        const nodo = recorrido.currentNode as Text;
        const padre = nodo.parentElement;
        if (!padre || !nodo.textContent?.trim()) continue;
        if (padre.closest("[aria-hidden='true'], .sr-only, dialog:not([open]), script, style")) continue;
        if (padre.closest("header a[href='/']")) continue; // «GROUP» del logotipo (exento)
        const estilo = getComputedStyle(padre);
        if (estilo.display === "none" || estilo.visibility === "hidden") continue;
        if (parseFloat(estilo.fontSize) < 14) resultado.push(`${nodo.textContent.trim()} (${estilo.fontSize})`);
      }
      return resultado;
    });
    expect(pequenos).toEqual([]);
  });

  test("la fila de obras se desplaza en horizontal y es enfocable", async ({ page }) => {
    await abrir(page, "/");
    const region = page.getByRole("region", { name: "Fotos de obras en ejecución" });
    await expect(region).toHaveAttribute("tabindex", "0");
    const { ancho, visible } = await region.evaluate((e) => ({ ancho: e.scrollWidth, visible: e.clientWidth }));
    expect(ancho).toBeGreaterThan(visible);
  });
});

test("preguntas frecuentes: la primera abierta y se abren con el teclado", async ({ page }) => {
  await abrir(page, "/");
  const preguntas = page.locator("#preguntas-frecuentes details");
  await expect(preguntas).toHaveCount(4);
  await expect(preguntas.first()).toHaveAttribute("open", "");
  const segunda = preguntas.nth(1);
  await segunda.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(segunda).toHaveAttribute("open", "");
});

test("el lienzo provisional reserva su caja y describe el dibujo", async ({ page }) => {
  await abrir(page, "/");
  const lienzo = page.locator("[data-lienzo]");
  await expect(lienzo.getByRole("img")).toHaveAccessibleName(/Pórtico de cinco pisos/);
  const caja = (await lienzo.boundingBox())!;
  expect(caja.height).toBeGreaterThan(300);
});
