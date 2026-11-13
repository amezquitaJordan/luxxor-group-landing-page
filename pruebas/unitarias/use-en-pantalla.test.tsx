import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useEnPantalla } from "@/lib/hooks/useEnPantalla";

type Retrollamada = (entradas: Array<{ isIntersecting: boolean }>) => void;

function simularObservador() {
  const instancias: Array<{ retrollamada: Retrollamada; disconnect: ReturnType<typeof vi.fn> }> = [];
  class ObservadorFalso {
    retrollamada: Retrollamada;
    disconnect = vi.fn();
    observe = vi.fn();
    constructor(retrollamada: Retrollamada) {
      this.retrollamada = retrollamada;
      instancias.push(this);
    }
  }
  vi.stubGlobal("IntersectionObserver", ObservadorFalso);
  return instancias;
}

describe("useEnPantalla", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("empieza en false y pasa a true al intersectar", () => {
    const instancias = simularObservador();
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() => useEnPantalla(ref));
    expect(result.current).toBe(false);
    act(() => instancias[0].retrollamada([{ isIntersecting: true }]));
    expect(result.current).toBe(true);
    act(() => instancias[0].retrollamada([{ isIntersecting: false }]));
    expect(result.current).toBe(false);
  });

  it("con unaVez deja de observar tras entrar", () => {
    const instancias = simularObservador();
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() => useEnPantalla(ref, { unaVez: true }));
    act(() => instancias[0].retrollamada([{ isIntersecting: true }]));
    expect(result.current).toBe(true);
    expect(instancias[0].disconnect).toHaveBeenCalled();
  });

  it("se desconecta al desmontar", () => {
    const instancias = simularObservador();
    const ref = { current: document.createElement("div") };
    const { unmount } = renderHook(() => useEnPantalla(ref));
    unmount();
    expect(instancias[0].disconnect).toHaveBeenCalled();
  });

  it("sin IntersectionObserver devuelve true", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() => useEnPantalla(ref));
    await waitFor(() => expect(result.current).toBe(true));
  });
});
