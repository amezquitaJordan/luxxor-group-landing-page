import { cn } from "@/lib/utils";

/*
 * Dibujo decorativo con el lenguaje de plano técnico (Figma 01 · Fundamentos): retícula, ejes y pórtico.
 * Ocupa la caja de una foto que aún no existe (Complementarios · «Espacios comerciales» en escritorio).
 * Solo tokens (clases stroke- y fill- de Tailwind); aria-hidden: no aporta información.
 * Sin cota (15-nov-2026): una cota sin medida real no aportaba nada.
 */

const ANCHO = 411;
const ALTO = 300;
const PASO = 20.5;
/** Ejes: letras en vertical (A–C) y números en horizontal (1–2), como en un plano estructural. */
const EJES_X = [
  { letra: "A", x: 96 },
  { letra: "B", x: 206 },
  { letra: "C", x: 316 },
] as const;
const EJES_Y = [
  { numero: "1", y: 96 },
  { numero: "2", y: 206 },
] as const;
const RADIO = 11;

export function DibujoPlano({ className }: { className?: string }) {
  const lineasX = Array.from({ length: Math.floor(ANCHO / PASO) }, (_, i) => (i + 1) * PASO);
  const lineasY = Array.from({ length: Math.floor(ALTO / PASO) }, (_, i) => (i + 1) * PASO);

  return (
    <svg
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      aria-hidden="true"
      focusable="false"
      className={cn("rounded-md border border-borde-sutil", className)}
      fill="none"
    >
      {/* Retícula */}
      <g className="stroke-borde-sutil" strokeWidth={0.75} opacity={0.6}>
        {lineasX.map((x) => (
          <line key={`x${x}`} x1={x} y1={0} x2={x} y2={ALTO} />
        ))}
        {lineasY.map((y) => (
          <line key={`y${y}`} x1={0} y1={y} x2={ANCHO} y2={y} />
        ))}
      </g>

      {/* Ejes estructurales (línea de trazo y punto) */}
      <g className="stroke-detalle-laton" strokeWidth={1} strokeDasharray="10 3 2 3">
        {EJES_X.map(({ letra, x }) => (
          <line key={letra} x1={x} y1={20 + RADIO * 2} x2={x} y2={ALTO - 30} />
        ))}
        {EJES_Y.map(({ numero, y }) => (
          <line key={numero} x1={20 + RADIO * 2} y1={y} x2={ANCHO - 30} y2={y} />
        ))}
      </g>

      {/* Planta: contorno del local entre ejes y columnas en los cruces */}
      <rect
        x={EJES_X[0].x}
        y={EJES_Y[0].y}
        width={EJES_X[2].x - EJES_X[0].x}
        height={EJES_Y[1].y - EJES_Y[0].y}
        className="stroke-texto-secundario"
        strokeWidth={1.5}
      />
      <g className="fill-texto-secundario">
        {EJES_X.flatMap(({ x }) => EJES_Y.map(({ y }) => <rect key={`${x}-${y}`} x={x - 5} y={y - 5} width={10} height={10} />))}
      </g>

      {/* Burbujas de los ejes */}
      <g className="texto-eje">
        {EJES_X.map(({ letra, x }) => (
          <g key={letra}>
            <circle cx={x} cy={20 + RADIO} r={RADIO} className="fill-fondo-base stroke-detalle-laton" strokeWidth={1} />
            <text x={x} y={20 + RADIO} dominantBaseline="central" textAnchor="middle" className="fill-texto-laton">
              {letra}
            </text>
          </g>
        ))}
        {EJES_Y.map(({ numero, y }) => (
          <g key={numero}>
            <circle cx={20 + RADIO} cy={y} r={RADIO} className="fill-fondo-base stroke-detalle-laton" strokeWidth={1} />
            <text x={20 + RADIO} y={y} dominantBaseline="central" textAnchor="middle" className="fill-texto-laton">
              {numero}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
