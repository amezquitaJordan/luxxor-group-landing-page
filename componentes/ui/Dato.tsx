export interface PropsDato {
  cifra: string;
  descripcion: string;
}

/**
 * Dato (Figma 10:68): cifra verificable del portafolio + descripción.
 * Un solo párrafo para que el lector de pantalla lo lea como una frase («130 t de estructura…»).
 */
export function Dato({ cifra, descripcion }: PropsDato) {
  return (
    <p className="flex flex-col gap-1">
      <span className="texto-dato text-texto-primario">{cifra}</span>{" "}
      <span className="texto-pequeno text-texto-secundario">{descripcion}</span>
    </p>
  );
}
