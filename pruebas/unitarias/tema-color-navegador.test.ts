import { describe, expect, it } from "vitest";
import { colorNavegador } from "@/config/tema";
import { primitivos, resolver, tokensClaro, tokensOscuro } from "./css";

describe("themeColor (config/tema.ts) frente a --color-fondo-base (globals.css)", () => {
  it("modo claro: colorNavegador.claro = --color-fondo-base de @theme", () => {
    const valor = resolver(tokensClaro.get("--color-fondo-base")!, primitivos);
    expect(valor.toLowerCase()).toBe(colorNavegador.claro.toLowerCase());
  });

  it('modo oscuro: colorNavegador.oscuro = --color-fondo-base de [data-theme="dark"]', () => {
    const valor = resolver(tokensOscuro.get("--color-fondo-base")!, primitivos);
    expect(valor.toLowerCase()).toBe(colorNavegador.oscuro.toLowerCase());
  });
});
