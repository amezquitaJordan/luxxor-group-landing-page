import { RespaldoSvg } from "./RespaldoSvg";

interface PropsMarcoLienzo {
  titulo: string;
  leyenda: { cumple: string; cerca: string; excede: string; sinDeformar: string };
  control: { etiqueta: string; valor: string };
  rotulo: string;
  descripcionAccesible: string;
}

const muestras = [
  { clave: "cumple", clase: "bg-grafico-cumple" },
  { clave: "cerca", clase: "bg-grafico-cerca" },
  { clave: "excede", clase: "bg-grafico-excede" },
  { clave: "sinDeformar", clase: "bg-borde-sutil" },
] as const;

/**
 * Marco del lienzo del hero (Figma 16:190 móvil, 20:4863 escritorio/compacto). Reserva la caja que
 * ocupará Lienzo3D en la Sesión 6, con filas de alto fijo para que el cambio no mueva nada (CLS 0):
 *   móvil: barra 76 px (título y selector apilados) · dibujo 318:216 · leyenda · control 56 px · rótulo
 *   desde md: barra 38 px en fila · dibujo 448:304 (máx. 448 px) · …
 *   compacto: dibujo de 200 px de alto.
 * Desde xl el rótulo queda solo para lectores de pantalla: la nota ilustrativa de la columna de texto
 * lo sustituye a la vista (Figma 04).
 * PROVISIONAL (Sesión 4): sin selector Original/Reforzada ni control deslizante.
 */
export function MarcoLienzo({ titulo, leyenda, control, rotulo, descripcionAccesible }: PropsMarcoLienzo) {
  return (
    <figure
      data-lienzo=""
      className="flex w-full flex-col gap-4 rounded-md border border-borde-sutil bg-fondo-superficie p-4 md:gap-3 md:px-5 md:py-4"
    >
      <div className="min-h-[4.75rem] md:flex md:min-h-[2.375rem] md:items-center">
        <p className="texto-anotacion text-texto-laton">{titulo}</p>
      </div>

      <div className="aspect-[318/216] w-full md:mx-auto md:aspect-[448/304] md:max-w-[28rem] compacto:aspect-auto compacto:h-[12.5rem]">
        <RespaldoSvg descripcion={descripcionAccesible} />
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {muestras.map(({ clave, clase }) => (
          <li key={clave} className="texto-pequeno flex items-center gap-2 text-texto-secundario">
            <span aria-hidden="true" className={`h-1 w-[18px] shrink-0 ${clase}`} />
            {leyenda[clave]}
          </li>
        ))}
      </ul>

      <p className="flex min-h-14 items-start justify-between gap-4">
        <span className="texto-cuerpo-fuerte">{control.etiqueta}</span>
        <span className="texto-pequeno text-texto-secundario">{control.valor}</span>
      </p>

      <figcaption className="texto-pequeno text-texto-secundario xl:sr-only">{rotulo}</figcaption>
    </figure>
  );
}
