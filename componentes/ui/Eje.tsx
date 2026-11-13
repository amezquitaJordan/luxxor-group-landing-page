import { cn } from "@/lib/utils";

/** Eje estructural (Figma 10:75): círculo con letra y línea vertical en latón. Decorativo. */
export function Eje({ letra, className }: { letra: string; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex h-48 w-8 flex-col items-center", className)}>
      <span className="texto-eje flex size-8 shrink-0 items-center justify-center rounded-full border border-detalle-laton text-texto-laton">
        {letra}
      </span>
      <span className="w-px flex-1 bg-detalle-laton" />
    </div>
  );
}
