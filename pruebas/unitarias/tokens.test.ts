import { describe, expect, it } from "vitest";
import { primitivos, resolver, tokensClaro, tokensOscuro, tokensSinJs } from "./css";

describe("tokens de color de globals.css", () => {
  it("hay 19 tokens semánticos en modo claro", () => {
    expect(tokensClaro.size).toBe(19);
  });

  it("el modo oscuro define exactamente los mismos tokens", () => {
    expect([...tokensOscuro.keys()].sort()).toEqual([...tokensClaro.keys()].sort());
  });

  it("el bloque sin JavaScript es idéntico al modo oscuro", () => {
    expect(Object.fromEntries(tokensSinJs)).toEqual(Object.fromEntries(tokensOscuro));
  });

  it("todos los tokens resuelven a un primitivo hex", () => {
    for (const mapa of [tokensClaro, tokensOscuro]) {
      for (const [nombre, valor] of mapa) {
        expect(resolver(valor, primitivos), nombre).toMatch(/^#[0-9a-f]{6}$/i);
      }
    }
  });
});
