import { describe, expect, it } from "vitest";
import { enlacesNavegacion } from "@/contenido/navegacion";
import { archivosDescarga, esResponsivo, idsSecciones, landing, resolverFoto, resolverResponsivo, resolverTexto, type Credencial, type TextoCliente } from "@/contenido/landing";

/** Nombres de clientes sin autorización (auditoría §1 y plan §L.5). */
const NOMBRES_CLIENTES = /interpl[aá]sticos|tecnoqu[ií]micas|farmatodo|super ?farma|yumbo|wan su lay/i;

function esTextoCliente(valor: unknown): valor is TextoCliente {
  return typeof valor === "object" && valor !== null && "conNombre" in valor && "sinNombre" in valor;
}

/** Recorre el contenido y devuelve todos los textos tal como se publicarían con el interruptor dado. */
function textosPublicados(valor: unknown, nombresClientes: boolean): string[] {
  if (typeof valor === "string") return [valor];
  if (esTextoCliente(valor)) {
    const elegido = nombresClientes ? valor.conNombre : valor.sinNombre;
    return typeof elegido === "string" ? [elegido] : [];
  }
  if (Array.isArray(valor)) return valor.flatMap((v) => textosPublicados(v, nombresClientes));
  if (typeof valor === "object" && valor !== null) {
    return Object.values(valor).flatMap((v) => textosPublicados(v, nombresClientes));
  }
  return [];
}

describe("contenido de la landing", () => {
  it("los id de sección son únicos", () => {
    const ids = Object.values(idsSecciones);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("cada enlace del menú apunta a una sección que existe", () => {
    const ids = new Set<string>(Object.values(idsSecciones));
    for (const enlace of enlacesNavegacion) expect(ids.has(enlace.href.slice(1))).toBe(true);
  });

  it("la acción de la ficha principal apunta a la metodología", () => {
    expect(landing.servicios.principal.accion.href).toBe(`#${idsSecciones.metodologia}`);
  });

  it("seis pasos de metodología, nueve ensayos y cinco preguntas (Figma 03 y 04)", () => {
    expect(landing.metodologia.pasos).toHaveLength(6);
    expect(landing.ensayos.lista).toHaveLength(9);
    expect(landing.preguntas.items).toHaveLength(5);
    expect(landing.preguntas.items[4]?.respuesta).toContain("desde el sismo del 10 de agosto de 2026");
    expect(landing.ensayos.lista.every((e) => e.descripcion.length > 0)).toBe(true);
  });

  it("las descargas apuntan a /descargas/*.pdf", () => {
    for (const ruta of Object.values(archivosDescarga)) expect(ruta).toMatch(/^\/descargas\/[a-z0-9-]+\.pdf$/);
  });
});

describe("interruptor de nombres de clientes", () => {
  it("apagado: ningún texto publicado nombra a un cliente", () => {
    const textos = textosPublicados(landing, false);
    expect(textos.filter((t) => NOMBRES_CLIENTES.test(t))).toEqual([]);
  });

  it("encendido: vuelven los nombres de Figma", () => {
    const textos = textosPublicados(landing, true).join(" | ");
    expect(textos).toContain("Bodega Interplásticos");
    expect(textos).toContain("Colegios públicos de Yumbo");
    expect(textos).toContain("(Super Farma, Farmatodo)");
  });

  it("resolverTexto deja pasar los textos sin cliente", () => {
    expect(resolverTexto("Coliseo Buenos Aires, Cauca", false)).toBe("Coliseo Buenos Aires, Cauca");
    expect(resolverTexto({ conNombre: "A", sinNombre: "B" }, false)).toBe("B");
    expect(resolverTexto({ conNombre: "A", sinNombre: "B" }, true)).toBe("A");
  });

  it("«Espacios comerciales» se pinta sin foto", () => {
    const fila = landing.complementarios.items.find((item) => item.titulo === "Espacios comerciales")!;
    expect(resolverFoto(fila.foto, false)).toBeNull();
  });
});

describe("contenido de escritorio (Sesión 5)", () => {
  it("credenciales: 4 en móvil y 5 en escritorio (ASTM solo desde lg)", () => {
    const credenciales = landing.credenciales as readonly Credencial[];
    expect(credenciales).toHaveLength(5);
    expect(credenciales.filter((c) => !c.soloEscritorio).map((c) => c.cifra)).toEqual(["NSR-10", "+20", "130 t", "3"]);
    expect(credenciales.find((c) => c.soloEscritorio)?.cifra).toBe("ASTM");
  });

  it("los textos responsivos tienen versión móvil y de escritorio distintas", () => {
    for (const texto of [landing.hero.bajada, landing.metodologia.bajada, landing.obras.bajada]) {
      expect(esResponsivo(texto)).toBe(true);
      if (esResponsivo(texto)) expect(texto.movil).not.toBe(texto.escritorio);
    }
  });

  it("resolverResponsivo aplica el interruptor de clientes a las dos versiones", () => {
    const fila = landing.complementarios.items.find((item) => item.titulo === "Espacios comerciales")!;
    const apagado = resolverResponsivo(fila.descripcion, false);
    expect(esResponsivo(apagado) && apagado.movil + apagado.escritorio).not.toMatch(NOMBRES_CLIENTES);
    const encendido = resolverResponsivo(fila.descripcion, true);
    expect(esResponsivo(encendido) && encendido.escritorio).toContain("Super Farma, Farmatodo");
  });
});
