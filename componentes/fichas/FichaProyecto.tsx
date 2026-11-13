import Image from "next/image";
import { Chip } from "@/componentes/ui/Chip";
import { Dato, type PropsDato } from "@/componentes/ui/Dato";
import { TituloFicha, type ImagenFicha, type NivelTitulo } from "./tipos";

interface PropsFichaProyecto {
  titulo: string;
  tipologia: string;
  dato: PropsDato;
  imagen?: ImagenFicha;
  nivelTitulo?: NivelTitulo;
}

/**
 * Ficha de proyecto (Figma 11:34). Datos solo del portafolio.
 * Sin imagen no se muestra ningún bloque: las fotos de proyecto siguen pendientes de confirmación.
 */
export function FichaProyecto({ titulo, tipologia, dato, imagen, nivelTitulo = 3 }: PropsFichaProyecto) {
  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-borde-sutil bg-fondo-superficie">
      {imagen && (
        <Image
          src={imagen.src}
          alt={imagen.alt}
          width={imagen.width}
          height={imagen.height}
          sizes="(min-width: 64rem) 392px, 100vw"
          className="aspect-[4/3] w-full border-b border-borde-sutil object-cover"
        />
      )}
      <div className="flex flex-col items-start gap-3 px-6 pt-6 pb-7">
        <Chip>{tipologia}</Chip>
        <TituloFicha nivel={nivelTitulo} className="texto-h3">{titulo}</TituloFicha>
        <Dato {...dato} />
      </div>
    </article>
  );
}
