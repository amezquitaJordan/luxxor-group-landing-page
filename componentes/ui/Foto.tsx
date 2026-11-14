import Image from "next/image";
import type { Foto as DatosFoto } from "@/contenido/fotos";
import { cn } from "@/lib/utils";

interface PropsFoto {
  foto: DatosFoto;
  /** Ancho real de la caja en cada breakpoint (next/image elige la variante con esto). */
  sizes: string;
  className?: string;
}

/**
 * Foto del cliente optimizada (activos/fotos): AVIF/WebP vía next/image, carga diferida,
 * recorte con object-cover y exposición algo más baja en modo oscuro.
 */
export function Foto({ foto, sizes, className }: PropsFoto) {
  return (
    <Image
      src={foto.src}
      alt={foto.alt}
      sizes={sizes}
      className={cn("object-cover dark:brightness-90", className)}
      style={foto.posicion ? { objectPosition: foto.posicion } : undefined}
    />
  );
}
