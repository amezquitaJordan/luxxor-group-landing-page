import { Cota } from "@/componentes/ui/Cota";

interface PropsPasoMetodologia {
  numero: number;
  titulo: string;
  descripcion: string;
}

/** Paso de metodología (Figma 11:43). Se usa dentro de un <ol>; la cota lleva el número del paso. */
export function PasoMetodologia({ numero, titulo, descripcion }: PropsPasoMetodologia) {
  return (
    <li className="flex flex-col gap-3">
      <Cota medida={`Paso ${numero}`} decorativa={false} />
      <h3 className="texto-h3">{titulo}</h3>
      <p className="texto-cuerpo text-texto-secundario">{descripcion}</p>
    </li>
  );
}
