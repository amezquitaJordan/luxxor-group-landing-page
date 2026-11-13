import { cn } from "@/lib/utils";

interface PropsCota {
  medida?: string;
  /** true (por defecto): solo decoración, oculta a lectores de pantalla. */
  decorativa?: boolean;
  className?: string;
}

/** Cota (Figma 10:79): medida en latón sobre una línea con topes de 13 px. Se estira a lo ancho. */
export function Cota({ medida, decorativa = true, className }: PropsCota) {
  return (
    <div aria-hidden={decorativa || undefined} className={cn("flex w-full flex-col items-center gap-1.5", className)}>
      {medida && <span className="texto-anotacion text-texto-laton">{medida}</span>}
      <span className="flex h-[13px] w-full items-center" aria-hidden="true">
        <span className="h-[13px] w-px bg-detalle-laton" />
        <span className="h-px flex-1 bg-detalle-laton" />
        <span className="h-[13px] w-px bg-detalle-laton" />
      </span>
    </div>
  );
}
