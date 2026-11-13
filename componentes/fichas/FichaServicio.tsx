import Image from "next/image";
import { Boton } from "@/componentes/ui/Boton";
import { Chip } from "@/componentes/ui/Chip";
import { TituloFicha, type ImagenFicha, type NivelTitulo } from "./tipos";

type PropsFichaServicio =
  | {
      jerarquia: "principal";
      norma: string;
      titulo: string;
      descripcion: string;
      paraQuien: readonly string[];
      accion: { etiqueta: string; href: string };
      imagen?: ImagenFicha;
      nivelTitulo?: NivelTitulo;
    }
  | {
      jerarquia: "secundaria";
      titulo: string;
      descripcion: string;
      entregable: string;
      nivelTitulo?: NivelTitulo;
    };

const marco = "@container rounded-md border border-borde-sutil bg-fondo-superficie p-8";

/**
 * Ficha de servicio (Figma 11:32).
 * Principal: solo Evaluación de vulnerabilidad sísmica; horizontal desde contenedores anchos.
 * Secundaria: Modelado, Diseño y cálculo, Reforzamiento, Peritaje.
 */
export function FichaServicio(props: PropsFichaServicio) {

  if (props.jerarquia === "secundaria") {
    return (
      <article className={`${marco} flex flex-col gap-4`}>
        <span aria-hidden="true" className="h-0.5 w-10 bg-detalle-laton" />
        <TituloFicha nivel={props.nivelTitulo ?? 3} className="texto-h3">{props.titulo}</TituloFicha>
        <p className="texto-cuerpo text-texto-secundario">{props.descripcion}</p>
        <p className="texto-anotacion text-texto-laton">{props.entregable}</p>
      </article>
    );
  }

  const { norma, titulo, descripcion, paraQuien, accion, imagen } = props;
  return (
    <article className={marco}>
      <div className="flex flex-col gap-8 @3xl:flex-row @3xl:gap-12">
        {imagen ? (
          <Image
            src={imagen.src}
            alt={imagen.alt}
            width={imagen.width}
            height={imagen.height}
            sizes="(min-width: 64rem) 520px, 100vw"
            className="aspect-[4/3] w-full shrink-0 border border-borde-sutil object-cover @3xl:w-[520px]"
          />
        ) : (
          // Espacio de la foto mientras se confirma cuál usar (Figma: rectángulo fondo/elevado).
          <div aria-hidden="true" className="aspect-[4/3] w-full shrink-0 border border-borde-sutil bg-fondo-elevado @3xl:w-[520px]" />
        )}
        <div className="flex min-w-0 flex-col items-start gap-5">
          <p className="texto-anotacion text-texto-laton">{norma}</p>
          <TituloFicha nivel={props.nivelTitulo ?? 3} className="texto-h2">{titulo}</TituloFicha>
          <p className="texto-cuerpo max-w-[35rem] text-texto-secundario">{descripcion}</p>
          <ul aria-label="Para quién" className="flex flex-wrap gap-2">
            {paraQuien.map((tipo) => (
              <li key={tipo}>
                <Chip>{tipo}</Chip>
              </li>
            ))}
          </ul>
          <Boton variante="secundario" href={accion.href}>
            {accion.etiqueta}
          </Boton>
        </div>
      </div>
    </article>
  );
}
