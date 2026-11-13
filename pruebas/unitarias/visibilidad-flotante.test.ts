import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  esVisible,
  mostrarBotonFlotante,
  ocultarBotonFlotante,
  reiniciarParaPruebas,
  suscribir,
} from "@/lib/estado/visibilidadFlotante";

describe("store visibilidadFlotante", () => {
  beforeEach(() => reiniciarParaPruebas());

  it("empieza visible", () => {
    expect(esVisible()).toBe(true);
  });

  it("un motivo lo oculta", () => {
    ocultarBotonFlotante("menu");
    expect(esVisible()).toBe(false);
  });

  it("con dos motivos, quitar uno lo deja oculto", () => {
    ocultarBotonFlotante("menu");
    ocultarBotonFlotante("teclado");
    mostrarBotonFlotante("menu");
    expect(esVisible()).toBe(false);
  });

  it("quitar todos los motivos lo muestra", () => {
    ocultarBotonFlotante("menu");
    ocultarBotonFlotante("teclado");
    mostrarBotonFlotante("menu");
    mostrarBotonFlotante("teclado");
    expect(esVisible()).toBe(true);
  });

  it("ocultar dos veces por el mismo motivo equivale a una", () => {
    ocultarBotonFlotante("chat");
    ocultarBotonFlotante("chat");
    mostrarBotonFlotante("chat");
    expect(esVisible()).toBe(true);
  });

  it("solo avisa a los oyentes cuando cambia algo", () => {
    const oyente = vi.fn();
    suscribir(oyente);
    ocultarBotonFlotante("lienzo");
    ocultarBotonFlotante("lienzo");
    mostrarBotonFlotante("contacto");
    mostrarBotonFlotante("lienzo");
    expect(oyente).toHaveBeenCalledTimes(2);
  });

  it("desuscribirse deja de avisar", () => {
    const oyente = vi.fn();
    const cancelar = suscribir(oyente);
    cancelar();
    ocultarBotonFlotante("menu");
    expect(oyente).not.toHaveBeenCalled();
  });

  it("quitar un motivo que no está no hace nada", () => {
    const oyente = vi.fn();
    suscribir(oyente);
    mostrarBotonFlotante("contacto");
    expect(esVisible()).toBe(true);
    expect(oyente).not.toHaveBeenCalled();
  });
});
