import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  esVisible,
  reiniciarParaPruebas,
  useBotonFlotanteVisible,
  useOcultarBotonFlotante,
} from "@/lib/estado/visibilidadFlotante";

describe("useOcultarBotonFlotante", () => {
  beforeEach(() => reiniciarParaPruebas());

  it("activo=true oculta y activo=false vuelve a mostrar", () => {
    const { rerender } = renderHook(({ activo }) => useOcultarBotonFlotante("menu", activo), {
      initialProps: { activo: true },
    });
    expect(esVisible()).toBe(false);
    rerender({ activo: false });
    expect(esVisible()).toBe(true);
  });

  it("al desmontar libera el motivo", () => {
    const { unmount } = renderHook(() => useOcultarBotonFlotante("chat", true));
    expect(esVisible()).toBe(false);
    unmount();
    expect(esVisible()).toBe(true);
  });

  it("useBotonFlotanteVisible reacciona a los cambios del store", () => {
    const visible = renderHook(() => useBotonFlotanteVisible());
    expect(visible.result.current).toBe(true);
    const ocultador = renderHook(() => useOcultarBotonFlotante("teclado", true));
    expect(visible.result.current).toBe(false);
    act(() => ocultador.unmount());
    expect(visible.result.current).toBe(true);
  });
});
