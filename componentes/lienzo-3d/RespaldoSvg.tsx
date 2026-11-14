/*
 * Elevación 2D del pórtico (respaldo del lienzo 3D). PROVISIONAL (Sesión 4): pinta un solo estado,
 * «Original» con el sismo de diseño, a partir de una tabla fija. En la Sesión 6 los desplazamientos
 * salen de lib/estructura/derivas.ts y el dibujo responde a los controles.
 * Colores solo con tokens (clases stroke-*), así sigue al tema.
 */

type Estado = "cumple" | "cerca" | "excede";

const ANCHO = 318;
const ALTO = 216;
const PISOS = 5;
const ALTO_PISO = 36;
const BASE_Y = 200;
const COLUMNAS_X = [64, 134, 204, 274] as const;
/** Desplazamiento del techo exagerado para visualizar (px). */
const DESPLAZAMIENTO_TECHO = 34;

/** Estado de cada piso con el sismo de diseño (calibración del plan §F: 1–2 exceden, 3 cerca, 4–5 cumplen). */
const ESTADO_PISO: readonly Estado[] = ["excede", "excede", "cerca", "cumple", "cumple"];

const claseTrazo: Record<Estado, string> = {
  cumple: "stroke-grafico-cumple",
  cerca: "stroke-grafico-cerca",
  excede: "stroke-grafico-excede",
};

/** Primer modo aproximado: u(i) = U · sen(π/2 · i/n). */
const desplazamiento = (piso: number) => DESPLAZAMIENTO_TECHO * Math.sin((Math.PI / 2) * (piso / PISOS));
const nivelY = (piso: number) => BASE_Y - piso * ALTO_PISO;

export function RespaldoSvg({ descripcion }: { descripcion: string }) {
  const pisos = Array.from({ length: PISOS }, (_, i) => i + 1);
  return (
    <svg
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      role="img"
      aria-label={descripcion}
      className="h-full w-full"
      fill="none"
      strokeLinecap="round"
    >
      {/* Estructura sin deformar */}
      <g className="stroke-borde-sutil" strokeWidth={1.5} strokeDasharray="4 4">
        {COLUMNAS_X.map((x) => (
          <line key={`f-c-${x}`} x1={x} y1={BASE_Y} x2={x} y2={nivelY(PISOS)} />
        ))}
        {pisos.map((piso) => (
          <line key={`f-v-${piso}`} x1={COLUMNAS_X[0]} y1={nivelY(piso)} x2={COLUMNAS_X[3]} y2={nivelY(piso)} />
        ))}
      </g>

      {/* Estructura deformada: columnas y viga de cada piso con el color de su deriva */}
      {pisos.map((piso) => {
        const abajo = desplazamiento(piso - 1);
        const arriba = desplazamiento(piso);
        const estado = ESTADO_PISO[piso - 1] ?? "cumple";
        return (
          <g key={piso} className={claseTrazo[estado]} strokeWidth={2.5}>
            {COLUMNAS_X.map((x) => (
              <line key={x} x1={x + abajo} y1={nivelY(piso - 1)} x2={x + arriba} y2={nivelY(piso)} />
            ))}
            <line x1={COLUMNAS_X[0] + arriba} y1={nivelY(piso)} x2={COLUMNAS_X[3] + arriba} y2={nivelY(piso)} />
          </g>
        );
      })}

      {/* Terreno */}
      <line x1={36} y1={BASE_Y} x2={302} y2={BASE_Y} className="stroke-texto-secundario" strokeWidth={1.5} />
    </svg>
  );
}
