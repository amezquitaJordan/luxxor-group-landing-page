import { Cota } from "@/componentes/ui/Cota";

interface PropsPasoMetodologia {
  numero: number;
  /** Total de pasos: con él la cota dice «Paso N de total» (Figma 16:342). */
  total?: number;
  titulo: string;
  descripcion: string;
}

/** Paso de metodología (Figma 11:43). Se usa dentro de un <ol>; la cota lleva el número del paso. */
export function PasoMetodologia({ numero, total, titulo, descripcion }: PropsPasoMetodologia) {
  const medida = total ? `Paso ${numero} de ${total}` : `Paso ${numero}`;
  return (
    <li className="flex flex-col gap-3">
      <Cota medida={medida} decorativa={false} />
      <h3 className="texto-h3">{titulo}</h3>
      <p className="texto-cuerpo text-texto-secundario">{descripcion}</p>
    </li>
  );
}
