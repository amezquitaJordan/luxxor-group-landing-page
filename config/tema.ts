/**
 * Colores que el navegador usa fuera de la página (barra de direcciones en móvil: <meta name="theme-color">).
 * Deben coincidir con --color-fondo-base de app/globals.css en cada modo:
 *   claro  → primitivo concreto/100
 *   oscuro → primitivo marino/900
 * Una prueba unitaria (Sesión 3) verifica que no se desincronicen.
 */
export const colorNavegador = {
  claro: "#EEF0F2",
  oscuro: "#0B1B33",
} as const;
