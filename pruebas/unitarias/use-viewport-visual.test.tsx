import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { esTecladoAbierto, useViewportVisual } from "@/lib/hooks/useViewportVisual";

class ViewportFalso extends EventTarget {
  height = 800;
  scale = 1;
}

let viewport: ViewportFalso;

function cambiar(alto: number, escala = 1) {
  viewport.height = alto;
  viewport.scale = escala;
  act(() => {
    viewport.dispatchEvent(new Event("resize"));
  });
}

describe("useViewportVisual", () => {
  beforeEach(() => {
    viewport = new ViewportFalso();
    vi.stubGlobal("visualViewport", viewport);
    Object.defineProperty(window, "visualViewport", { configurable: true, value: viewport });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("devuelve el alto inicial sin teclado", () => {
    const { result } = renderHook(() => useViewportVisual());
    expect(result.current).toEqual({ alto: 800, tecladoAbierto: false });
  });

  it("alto al 60 % con foco en un campo → teclado abierto; al volver al 100 % → cerrado", () => {
    const campo = document.createElement("input");
    document.body.append(campo);
    campo.focus();
    const { result } = renderHook(() => useViewportVisual());
    cambiar(480);
    expect(result.current.tecladoAbierto).toBe(true);
    cambiar(800);
    expect(result.current.tecladoAbierto).toBe(false);
  });

  it("zoom (scale 2) sin foco en un campo → no es teclado", () => {
    const { result } = renderHook(() => useViewportVisual());
    cambiar(400, 2);
    expect(result.current).toEqual({ alto: 400, tecladoAbierto: false });
  });

  it("zoom (scale 2) aunque haya foco en un campo → no es teclado", () => {
    const campo = document.createElement("textarea");
    document.body.append(campo);
    campo.focus();
    const { result } = renderHook(() => useViewportVisual());
    cambiar(400, 2);
    expect(result.current.tecladoAbierto).toBe(false);
  });

  it("sin visualViewport devuelve el valor por defecto", () => {
    Object.defineProperty(window, "visualViewport", { configurable: true, value: undefined });
    const { result } = renderHook(() => useViewportVisual());
    expect(result.current).toEqual({ alto: null, tecladoAbierto: false });
  });
});

describe("esTecladoAbierto", () => {
  it("exige alto < 75 %, escala ≈ 1 y foco en un campo editable", () => {
    const campo = document.createElement("input");
    const boton = document.createElement("button");
    const editable = document.createElement("div");
    editable.contentEditable = "true";
    document.body.append(editable);
    expect(esTecladoAbierto(500, 1, 800, campo)).toBe(true);
    expect(esTecladoAbierto(500, 1.04, 800, campo)).toBe(true);
    expect(esTecladoAbierto(500, 1.2, 800, campo)).toBe(false);
    expect(esTecladoAbierto(700, 1, 800, campo)).toBe(false);
    expect(esTecladoAbierto(500, 1, 800, boton)).toBe(false);
    expect(esTecladoAbierto(500, 1, 800, null)).toBe(false);
    expect(esTecladoAbierto(500, 1, 800, editable)).toBe(editable.isContentEditable);
  });
});
