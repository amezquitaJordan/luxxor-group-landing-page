import { expect, test, type Browser } from "@playwright/test";

/*
 * Presupuestos de rendimiento (investigación §10, plan §8) @presupuesto.
 * Laboratorio: next start local, sin caché, mediana de 3 cargas para el LCP. Se ejecutan aparte y con
 * un solo navegador: npm run test:presupuestos. Las cifras se imprimen y se adjuntan al informe.
 * Perfiles (como Lighthouse):
 *   móvil      390×844, DPR 2, CPU ×4, «4G lenta» (150 ms, 1,6 Mbps / 750 kbps)
 *   escritorio 1440×900 y 1366×768, DPR 1, CPU ×1, 40 ms, 10 Mbps
 */
interface Perfil {
  nombre: string;
  viewport: { width: number; height: number };
  deviceScaleFactor: number;
  movil: boolean;
  cpu: number;
  red: { latency: number; downloadThroughput: number; uploadThroughput: number };
  imagenesTotalKB: number;
}

const RED_MOVIL = { latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 };
const RED_ESCRITORIO = { latency: 40, downloadThroughput: (10 * 1024 * 1024) / 8, uploadThroughput: (10 * 1024 * 1024) / 8 };

const PERFILES: Perfil[] = [
  { nombre: "móvil 390×844", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, movil: true, cpu: 4, red: RED_MOVIL, imagenesTotalKB: 550 },
  { nombre: "escritorio 1440×900", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, movil: false, cpu: 1, red: RED_ESCRITORIO, imagenesTotalKB: 700 },
  { nombre: "escritorio 1366×768", viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1, movil: false, cpu: 1, red: RED_ESCRITORIO, imagenesTotalKB: 700 },
];

const PRESUPUESTO = {
  lcpMs: 2500,
  cls: 0.1,
  /** Fotos visibles en el primer pantallazo: ninguna; el LCP es el h1. */
  fotosEnPrimerPantallazo: 0,
  /**
   * Techo de JS inicial (gzip): 165 KB (medido 152,3 KB tras retirar Motion; base de Next+React ≈ 133 KB).
   * El 3D (S6) y el chat (S7) se cargan diferidos: si alguno entra por error al JS inicial, este techo
   * lo detecta.
   */
  jsInicialKB: 165,
};

declare global {
  interface Window {
    __metricas: { lcp: number; elementoLcp: string; cls: number };
  }
}

/** Contexto limpio (sin caché) con la CPU y la red del perfil, y observadores de LCP y CLS. */
async function abrirMedida(browser: Browser, perfil: Perfil) {
  const contexto = await browser.newContext({
    viewport: perfil.viewport,
    deviceScaleFactor: perfil.deviceScaleFactor,
    hasTouch: perfil.movil,
    isMobile: perfil.movil,
  });
  const page = await contexto.newPage();
  const cdp = await contexto.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", { offline: false, ...perfil.red });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: perfil.cpu });

  await page.addInitScript(() => {
    window.__metricas = { lcp: 0, elementoLcp: "", cls: 0 };
    new PerformanceObserver((lista) => {
      for (const e of lista.getEntries() as (PerformanceEntry & { element?: Element })[]) {
        window.__metricas.lcp = e.startTime;
        window.__metricas.elementoLcp = e.element ? e.element.tagName.toLowerCase() : "";
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((lista) => {
      for (const e of lista.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
        if (!e.hadRecentInput) window.__metricas.cls += e.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/", { waitUntil: "load" });
  await page.waitForTimeout(1500);
  return { contexto, page };
}

for (const perfil of PERFILES) {
  test(`presupuestos ${perfil.nombre}: LCP, CLS, imágenes y JS inicial @presupuesto`, async ({ browser }, info) => {
    test.skip(info.project.name !== "movil-390-claro", "se mide una sola vez (cada perfil crea su propio contexto)");
    test.skip(process.env.MEDIR_PRESUPUESTOS !== "1", "se mide aparte, sin carga en paralelo: npm run test:presupuestos");
    test.setTimeout(180_000);

    // LCP: mediana de 3 cargas (la variación entre cargas en este equipo es de ±0,3 s).
    const cargas: { lcp: number; elementoLcp: string }[] = [];
    for (let i = 0; i < 2; i++) {
      const { contexto, page } = await abrirMedida(browser, perfil);
      cargas.push(await page.evaluate(() => ({ lcp: window.__metricas.lcp, elementoLcp: window.__metricas.elementoLcp })));
      await contexto.close();
    }
    const { contexto, page } = await abrirMedida(browser, perfil);
    cargas.push(await page.evaluate(() => ({ lcp: window.__metricas.lcp, elementoLcp: window.__metricas.elementoLcp })));
    const { lcp, elementoLcp } = [...cargas].sort((a, b) => a.lcp - b.lcp)[1]!;

    const sumaKB = (filtro: "js" | "img") =>
      page.evaluate((f) => {
        const recursos = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
        const elegidos = recursos.filter((r) =>
          f === "js" ? r.initiatorType === "script" || /\.js(\?|$)/.test(r.name) : r.name.includes("/_next/image"),
        );
        return elegidos.reduce((total, r) => total + r.transferSize, 0) / 1024;
      }, filtro);

    const jsInicialKB = await sumaKB("js");
    const fotosEnPrimerPantallazo = await page.evaluate(
      () =>
        [...document.images].filter((img) => img.getClientRects().length && img.getBoundingClientRect().top < window.innerHeight)
          .length,
    );
    const imagenesAntesKB = await sumaKB("img");

    // Recorre la página como un usuario (las fotos diferidas cargan y cualquier desplazamiento cuenta en CLS).
    const alto = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < alto; y += 400) {
      await page.mouse.wheel(0, 400);
      await page.waitForTimeout(150);
    }
    await page.waitForLoadState("networkidle");
    const imagenesTotalKB = await sumaKB("img");
    const { cls } = await page.evaluate(() => window.__metricas);

    const medido = {
      lcpMs: Math.round(lcp),
      lcpCargasMs: cargas.map((c) => Math.round(c.lcp)),
      elementoLcp,
      cls: Number(cls.toFixed(4)),
      fotosEnPrimerPantallazo,
      // Informativo: Chrome adelanta la carga diferida nativa de las fotos cercanas.
      imagenesAntesDeDesplazarKB: Number(imagenesAntesKB.toFixed(1)),
      imagenesTotalKB: Number(imagenesTotalKB.toFixed(1)),
      jsInicialKB: Number(jsInicialKB.toFixed(1)),
    };
    console.log(`Presupuestos ${perfil.nombre}:`, JSON.stringify(medido));
    await info.attach(`presupuestos-${perfil.viewport.width}x${perfil.viewport.height}.json`, {
      body: JSON.stringify({ perfil, medido, presupuesto: { ...PRESUPUESTO, imagenesTotalKB: perfil.imagenesTotalKB } }, null, 2),
      contentType: "application/json",
    });
    await contexto.close();

    expect(medido.elementoLcp).toBe("h1");
    expect(medido.lcpMs).toBeLessThan(PRESUPUESTO.lcpMs);
    expect(medido.cls).toBeLessThan(PRESUPUESTO.cls);
    expect(medido.fotosEnPrimerPantallazo).toBe(PRESUPUESTO.fotosEnPrimerPantallazo);
    expect(medido.imagenesTotalKB).toBeLessThanOrEqual(perfil.imagenesTotalKB);
    expect(medido.jsInicialKB).toBeLessThanOrEqual(PRESUPUESTO.jsInicialKB);
  });
}
