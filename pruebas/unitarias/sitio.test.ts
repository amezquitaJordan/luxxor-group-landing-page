import { describe, expect, it } from "vitest";
import { enlaceWhatsApp, sitio } from "@/config/sitio";

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
