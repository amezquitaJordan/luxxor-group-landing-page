/** Chip (Figma 10:66): etiqueta informativa no interactiva (tipo de cliente, tipología). */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="texto-pequeno inline-flex items-center rounded-full border border-borde-sutil px-3 py-2 text-texto-primario">
      {children}
    </span>
  );
}
