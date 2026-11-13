interface PropsFichaEnsayo {
  referencia: string;
  titulo: string;
  descripcion: string;
}

/**
 * Fila de ensayo (no es componente en Figma: sale de la lista de la sección «Ensayos en sitio», 19:318).
 * Referencia en latón, título y descripción; en contenedores angostos se apila.
 */
export function FichaEnsayo({ referencia, titulo, descripcion }: PropsFichaEnsayo) {
  return (
    <li className="@container border-b border-borde-sutil py-3.5">
      <div className="flex flex-col gap-1 @lg:flex-row @lg:items-baseline @lg:gap-6">
        <span className="texto-anotacion w-[110px] shrink-0 text-texto-laton">{referencia}</span>
        <span className="texto-cuerpo-fuerte shrink-0 @lg:w-60">{titulo}</span>
        <span className="texto-pequeno min-w-0 flex-1 text-texto-secundario">{descripcion}</span>
      </div>
    </li>
  );
}
