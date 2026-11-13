# Luxxor Group — landing (rediseño 2026)

## Reglas de trabajo (obligatorias)
- **No hacer commits ni push.** Jordan los ejecuta a mano; al cerrar cada sesión, sugerir el mensaje de commit.
- **Presentar un plan antes de cada sesión** de `docs/plan-implementacion.md` y esperar «aprobado, ejecuta la Sesión N».
- **No usar `npm audit fix --force`.** Las vulnerabilidades se resuelven con versiones compatibles u `overrides` acotados.
- **No tocar `main` ni otras ramas** (no cambiar de rama, no fusionar, no crear ramas) salvo que Jordan lo pida.
- **No ejecutar comandos destructivos de git** (`reset --hard`, `clean`, `checkout -- .`, `restore .`, `push --force`) salvo que Jordan lo pida.
- No inventar datos, cifras, testimonios ni ubicaciones; no asignar fotos a proyectos sin confirmación. Contenido solo del portafolio del cliente.
- La foto 28 no se usa (contenido de terceros).

## Stack
Next.js 16.4 (App Router, Turbopack, `proxy.ts`) · React 19.3 · Tailwind v4 · Motion · React Three Fiber (Sesión 6) · AI SDK + Groq (Sesión 7). Node ≥ 20.9.

## Convenciones de código
- Código propio en español (variables, funciones, componentes, comentarios). Excepciones: identificadores de librerías/APIs y **hooks con prefijo `use`** (`useEnPantalla`), que exigen eslint-plugin-react-hooks y el React Compiler.
- Contacto y datos del sitio solo desde `config/sitio.ts`; textos de la landing desde `contenido/landing.ts`.
- Colores solo con tokens (`bg-fondo-base`, `text-texto-primario`…); cero hex en componentes.
- Animar solo `transform` y `opacity`; respetar `prefers-reduced-motion` en CSS, Motion y 3D.
- Accesibilidad WCAG 2.2 AA; áreas táctiles de 44 px como objetivo.
- Secretos solo en variables de entorno del servidor (ver `.env.example`); nunca con prefijo `NEXT_PUBLIC_`.

## Documentos
- `docs/plan-implementacion.md` — plan y sesiones (fuente de verdad del trabajo).
- `docs/luxxor-investigacion-diseno.md` — dirección visual, responsive, presupuestos de calidad.
- `docs/luxxor-contexto-y-auditoria.md` — empresa y auditoría.
- `docs/luxxor-figma-estado.md` — estado del diseño. Figma: archivo `7IEP7WM4lJvxi33qA0YIf0`.

## Recursos
Fotos originales y PDF en `C:\Luxxor\recursos\` (fuera del repo). Solo las versiones optimizadas entran en `public/`.

## Verificación
`npm run lint` · `npm run typecheck` · `npm run build` · `npm audit` (0 vulnerabilidades).
