/** Texto solo para lectores de pantalla. */
export function TextoOculto({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/** Aviso estándar para enlaces que abren otra pestaña o aplicación. */
export const AVISO_PESTANA_NUEVA = " (se abre en otra pestaña)";
