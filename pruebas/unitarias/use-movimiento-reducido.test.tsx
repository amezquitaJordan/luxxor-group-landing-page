import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMovimientoReducido } from "@/lib/hooks/useMovimientoReducido";

function simularMatchMedia(inicial: boolean) {
  const oyentes = new Set<() => void>();
  const lista = {
    matches: inicial,
    addEventListener: (_: string, f: () => void) => oyentes.add(f),
    removeEventListener: (_: string, f: () => void) => oyentes.delete(f),
  };
  vi.stubGlobal("matchMedia", vi.fn(() => lista));
  Object.defineProperty(window, "matchMedia", { configurable: true, value: vi.fn(() => lista) });
  return {
    cambiar(valor: boolean) {
      lista.matches = valor;
      act(() => oyentes.forEach((f) => f()));
    },
  };
}

describe("useMovimientoReducido", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("lee el valor inicial", () => {
    simularMatchMedia(true);
    const { result } = renderHook(() => useMovimientoReducido());
    expect(result.current).toBe(true);
  });

  it("se actualiza con el evento change", () => {
    const medios = simularMatchMedia(false);
    const { result } = renderHook(() => useMovimientoReducido());
    expect(result.current).toBe(false);
    medios.cambiar(true);
    expect(result.current).toBe(true);
  });
});
