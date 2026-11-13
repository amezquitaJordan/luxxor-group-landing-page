import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * Logotipo provisional en texto (Figma 11:81): «LUXXOR» Plex Sans SemiBold 18/22 px y
 * «GROUP» Plex Mono 13 px. Se reemplaza por el vector oficial cuando llegue.
 * «GROUP» queda bajo el mínimo de 14 px: es parte del logotipo (exento).
 * Nombre accesible «LUXXOR GROUP, inicio»: contiene el texto visible (WCAG 2.5.3).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex flex-col leading-none", className)}>
      <span className="font-texto text-[1.125rem] font-semibold leading-none tracking-[0.12em] text-texto-primario lg:text-[1.375rem]">
        LUXXOR
      </span>{" "}
      <span className="font-mono text-[0.8125rem] leading-[1.3] tracking-[0.4em] text-texto-secundario">GROUP</span>
      <span className="sr-only">, inicio</span>
    </Link>
  );
}
