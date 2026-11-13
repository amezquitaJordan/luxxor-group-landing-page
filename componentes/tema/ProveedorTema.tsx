"use client";

import { ThemeProvider } from "next-themes";

/**
 * Tema claro/oscuro con next-themes:
 * - script bloqueante en <head> que fija data-theme antes del primer pintado (sin parpadeo);
 * - preferencia guardada en localStorage ("theme") y opción «Sistema» (prefers-color-scheme);
 * - sin transiciones durante el cambio (disableTransitionOnChange).
 */
export function ProveedorTema({ children, nonce }: { children: React.ReactNode; nonce?: string }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      themes={["light", "dark"]}
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
      storageKey="theme"
      nonce={nonce}
    >
      {children}
    </ThemeProvider>
  );
}
