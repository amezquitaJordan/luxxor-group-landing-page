import { describe, expect, it } from "vitest";
import { enlaceTelefono, enlaceWhatsApp, funciones, sitio } from "@/config/sitio";

describe("enlaceWhatsApp", () => {
  it("sin mensaje apunta al número oficial", () => {
    expect(enlaceWhatsApp()).toBe("https://wa.me/573170303333");
  });

  it("codifica el mensaje (?, &, #, tildes)", () => {
    const enlace = enlaceWhatsApp("¿Hacen peritajes & visitas? #1 Cali");
    expect(enlace).toBe(
      "https://wa.me/573170303333?text=%C2%BFHacen%20peritajes%20%26%20visitas%3F%20%231%20Cali",
    );
    expect(decodeURIComponent(new URL(enlace).searchParams.get("text")!)).toBe("¿Hacen peritajes & visitas? #1 Cali");
  });

  it("los datos de contacto son los oficiales", () => {
    expect(sitio.contacto.correo).toBe("gerencia@luxxorgroup.com");
    expect(sitio.redes.instagram).toBe("https://www.instagram.com/luxxorcol");
    expect(sitio.url).toBe("https://www.luxxor.com.co");
  });
});

describe("enlaceTelefono", () => {
  it("apunta al celular de operaciones en formato E.164", () => {
    expect(enlaceTelefono()).toBe("tel:+573001951936");
    expect(sitio.contacto.telefono.visible).toBe("+57 300 195 1936");
  });

  it("es un número distinto del de WhatsApp y solo con dígitos", () => {
    expect(sitio.contacto.telefono.numero).toMatch(/^57\d{10}$/);
    expect(sitio.contacto.telefono.numero).not.toBe(sitio.contacto.whatsapp.numero);
  });
});

describe("funciones", () => {
  it("estado aprobado para la Sesión 4", () => {
    expect(funciones).toEqual({ nombresClientes: false, descargas: true, asistente: false, paginasLegales: false });
  });
});
