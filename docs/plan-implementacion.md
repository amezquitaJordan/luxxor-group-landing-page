# Luxxor Group — Plan de implementación del rediseño

> Rama: `rediseno-2026` · Fecha: 12-nov-2026 · Estado: **aprobado con correcciones** (incorporadas en esta versión).
> Fuentes: `docs/luxxor-contexto-y-auditoria.md`, `docs/luxxor-investigacion-diseno.md`, `docs/luxxor-figma-estado.md` y el archivo de Figma `7IEP7WM4lJvxi33qA0YIf0` (leído con el MCP de Figma: variables, estilos, 21 componentes, landing móvil/escritorio, 3D, verificación responsive, recursos y chat).
> Reglas de trabajo: Claude Code **no hace commits ni push**; antes de cada sesión presenta un plan y espera «aprobado, ejecuta la Sesión N».

## Decisiones tomadas (12-nov-2026)

| Tema | Decisión |
|---|---|
| CSP | **Opción A: nonce por petición** (`strict-dynamic`). Medir TTFB y LCP en el preview; si incumplen el presupuesto, se discute antes de pasar a la opción B. |
| Sesión 0 | **Sí**, se hace primero (hotfix en `main`). |
| Animación de entrada del 3D | **Sí**, una sola vez; con reduced motion arranca ya deformado. |
| Rotación por arrastre | **No.** |
| Anotaciones | **14 px** cuando tienen contenido; **12 px** solo en letras de ejes decorativas (`aria-hidden`). |
| Dominio canónico | **https://www.luxxor.com.co**; la raíz redirige a www. |
| `arquitectura.md` | Se **borra**. |
| Endpoint del chat en la S1 | Se **retira** y se reconstruye en la S7. |
| «Volver arriba» | **No** se implementa. |

---

## A. Diagnóstico

Verificado: `npm audit --omit=dev` → 6 vulnerabilidades (1 crítica `next` 16.1.6, 4 altas, 1 moderada); `next` vigente 16.4.6; Node 22.19 / npm 11.11.

| Tema | Código actual | Diseño / auditoría |
|---|---|---|
| Mensaje | Remodelación de lujo, testimonios inventados, stock de Unsplash | Ingeniería estructural; 12 secciones con contenido del portafolio |
| Tema | `ThemeProvider` propio con `visibility:hidden`, script casero, `.dark` + `data-theme`, colores fijos, ~60 `duration-700` | next-themes (`data-theme`, `disableTransitionOnChange`), solo tokens |
| Paleta / tipos | Dorado #D4AF37 + beige, Playfair + Inter | Marino/acero/pizarra sobre concreto, latón como detalle; IBM Plex |
| Animación | `whileInView once:false`, auras infinitas de `box-shadow`, 3 carruseles infinitos | Un momento orquestado (3D); solo `transform`/`opacity` |
| Chat | Groq SDK sin validación, turnos `assistant` forjables, rate limit en memoria, sin Origin, prompt de otro negocio, `temperature 0.7` | AI SDK + streaming, zod, Upstash, Origin, alcance limitado |
| SEO | «bienes raíces, seguros…», `og:url` a luxxorgroup.com, sin canonical ni JSON-LD | Metadata real, canonical, JSON-LD, sitemap, páginas legales |
| Contacto | Hardcodeado en 10 sitios (incluye 313 886 5481) | Un solo `config/sitio.ts` |

**Se conserva:** `proxy.ts` como sitio de cabeceras (CSP reescrita), API key solo en servidor y errores genéricos, `MotionConfig reducedMotion="user"`, `lib/utils.ts` (`cn`), `.mcp.json` (next-devtools), `@vercel/speed-insights`.

**Se reescribe:** `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/api/chat/route.ts`, `proxy.ts`, `next.config.ts`, `package.json`, `README.md`.

**Se elimina:** `.agents/`, `.codex/`, `.cursor/`, `.gemini/`, `.zed/`, `.vscode/mcp.json`, `opencode.json`, `config/mcporter.json`; gitlink roto `claudecode` (`git rm --cached claudecode` + quitarlo del `exclude` de `tsconfig`); `src/app/*`; `tailwind.config.ts`; `scripts/download_*.js`; SVG de plantilla de `public/`; `arquitectura.md`; los 22 componentes actuales (incluidos `Offers.tsx` y `WhatsAppCTA.tsx` vacíos); todo `public/images/` (rotas de 29 bytes, PNG de 7–9,8 MB, stock, `logo-luxxor.png` de 0 bytes); el video de 8,7 MB; favicons actuales (→ `app/icon.png`, `app/apple-icon.png`). El historial de git (85 MB) no se reescribe.

---

## B. Arquitectura

```
app/
  layout.tsx · page.tsx · globals.css · not-found.tsx
  api/chat/route.ts
  politica-de-datos/page.tsx · terminos/page.tsx
  sitemap.ts · robots.ts · opengraph-image.tsx · icon.png · apple-icon.png
  desarrollo/componentes/page.tsx      galería para Playwright (notFound() en producción)
componentes/
  ui/          Boton, BotonWhatsApp, Chip, Dato, Eje, Cota, Contenedor, Seccion, IconoLuxxor
  fichas/      FichaServicio, FichaProyecto, PasoMetodologia, FichaEnsayo
  navegacion/  Encabezado, MenuMovil, BotonFlotanteWhatsApp
  tema/        ProveedorTema, BotonTema, SelectorTema
  secciones/   Hero, Credenciales, Servicios, CuandoSeNecesita, Metodologia, Ensayos,
               ObrasEnEjecucion, Proyectos, Complementarios, DireccionTecnica, Descargas,
               PreguntasFrecuentes, Contacto, PiePagina
  lienzo-3d/   Lienzo3D, EscenaPortico, Portico, ControlesLienzo, RespaldoSvg, LeyendaDerivas
  chat/        PanelChat, ChatBurbuja, ChatSugerencia, ChatEscribiendo, ChatAviso,
               ChatCampoMensaje, ChatEncabezado, BotonAbrirChat
config/sitio.ts             dominio, WhatsApp (+ mensajes prellenados), correo, redes, dirección, cobertura
contenido/landing.ts        textos tipados de cada sección (Figma/portafolio)
lib/
  estructura/derivas.ts     cálculo puro de desplazamientos y derivas (3D y SVG)
  asistente/{esquema,prompt,conocimiento,limite,origen,cuerpo}.ts
  entorno.ts                validación zod de variables de entorno (server-only)
  estado/visibilidadFlotante.ts   mini store con useSyncExternalStore
  hooks/{useEnPantalla,useViewportVisual,useMovimientoReducido}.ts
public/fotos/ (optimizadas) · public/descargas/ (PDF) · public/logo/
scripts/optimizar-fotos.mjs   lee de C:\Luxxor\recursos\ (fuera del repo) → escribe solo lo optimizado en public/
pruebas/{e2e,unitarias}/ · playwright.config.ts · vitest.config.ts · .env.example
.github/workflows/calidad.yml
CLAUDE.md
```

> Nota de nombres: los **hooks conservan el prefijo `use`** (`useEnPantalla`, `useViewportVisual`, `useMovimientoReducido`) porque lo exigen `eslint-plugin-react-hooks` y el React Compiler. El resto del código propio va en español.

**Mapeo Figma → código**

| Figma | Código |
|---|---|
| Botón (Tipo × Estado) | `Boton` (`variante: 'primario'\|'secundario'\|'texto'`, `<a>` o `<button>`) |
| Botón WhatsApp | `BotonWhatsApp` |
| Chip / Dato / Eje / Cota | `Chip` / `Dato` / `Eje` / `Cota` |
| Ficha de servicio (Principal/Secundaria) | `FichaServicio` (`jerarquia`) |
| Ficha de proyecto / Paso de metodología | `FichaProyecto` / `PasoMetodologia` |
| Encabezado (Escritorio/Móvil) | `Encabezado` (un componente responsive) |
| Botón flotante WhatsApp | `BotonFlotanteWhatsApp` |
| Lienzo 3D (Estado × Tamaño) | `Lienzo3D` (`estado`; tamaño por CSS) |
| Botón de tema / Selector de tema | `BotonTema` / `SelectorTema` |
| Menú móvil (abierto) | `MenuMovil` |
| Chat · Burbuja/Sugerencia/Escribiendo/Aviso/Campo/Encabezado | `ChatBurbuja` / `ChatSugerencia` / `ChatEscribiendo` / `ChatAviso` / `ChatCampoMensaje` / `ChatEncabezado` |

Secciones = Server Components. Cliente solo: encabezado (menú y tema), botón flotante, `Lienzo3D`, chat y su disparador.

---

## C. Sistema de diseño en código

- **Primitivos** en `:root` (no en `@theme`, para no generar utilidades): `--prim-marino-900: #0B1B33; …` (21 variables, mismo nombre que el *code syntax* de Figma).
- **Semánticos** en `@theme` con valores Claro (`--color-fondo-base: var(--prim-concreto-100)`, …, 18 tokens) → utilidades `bg-fondo-base`, `text-texto-primario`, etc. **Oscuro** sobrescribe las mismas variables en `[data-theme="dark"]` con los alias de Figma. `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`
- **Espacio:** `espacio/N` = N×4 px = escala por defecto de Tailwind; además `--esp-espacio-*` por paridad.
- **Radio:** `--radius-sm: 2px; --radius-md: 4px; --radius-lg: 8px;` + `rounded-full`; además `--rad-radio-*`.
- **Retícula:** 4 col / margen 20 / medianil 16 (base) · 8 / 32 / 24 (`md`) · 12 / 80 / 24 (`lg`); contenido máx. 80rem.
- **Sin hex en componentes** (verificación con grep en QA).
- **`--color-accion-whatsapp-texto`** (solo código; marino/900 en ambos modos): texto e ícono del botón de WhatsApp. En Figma el texto usa el hex suelto `#0A1C33`; atarlo a `accion/primaria/fondo` daría 1,74:1 en oscuro.
- **Excepción de `borde/sutil`** (1,38–2,34:1, no llega a 3:1): solo se acepta en el botón de tema y el selector de tema, que se identifican por su ícono (texto/primario ≥ 15:1) y por el relleno de la opción activa. **No aplica a campos de texto:** el campo del chat (S7) y cualquier `input`/`textarea` usan `borde/fuerte` o un borde con contraste ≥ 3:1 frente a su fondo (WCAG 1.4.11).

**Tipografía fluida** (`@utility texto-*`, 360 → 1440 px, siempre con término en rem):

| Estilo | Fuente | `font-size` | Interlineado | Tracking |
|---|---|---|---|---|
| display | Condensed 600 | `clamp(2.5rem, 2rem + 2.222vw, 4rem)` | 1.05 | -0.01em |
| h1 | Condensed 600 | `clamp(2rem, 1.667rem + 1.481vw, 3rem)` | 1.10 | -0.005em |
| h2 | Condensed 600 | `clamp(1.625rem, 1.417rem + 0.926vw, 2.25rem)` | 1.15 | 0 |
| h3 | Condensed 600 | `clamp(1.25rem, 1.167rem + 0.370vw, 1.5rem)` | 1.25 | 0 |
| cuerpo-lg | Sans 400 | `clamp(1.125rem, 1.083rem + 0.185vw, 1.25rem)` | 1.55 | 0 |
| cuerpo / cuerpo-fuerte | Sans 400 / 600 | `clamp(1rem, 0.958rem + 0.185vw, 1.125rem)` | 1.55 | 0 |
| pequeño | Sans 400 | `clamp(0.875rem, 0.854rem + 0.093vw, 0.9375rem)` | 1.45 | 0 |
| dato | Condensed 500 + `tabular-nums` | `clamp(2rem, 1.5rem + 2.222vw, 3.5rem)` | 1.0 | -0.005em |
| boton | Sans 600 | `1rem` | 1.0 | 0 |
| anotacion | Mono 400 | `clamp(0.875rem, 0.854rem + 0.093vw, 0.9375rem)` (14 px mín.) | 1.30 | 0 |
| eje (decorativo, `aria-hidden`) | Mono 400 | `0.75rem` (12 px) | 1.0 | 0 |

Texto corrido `max-width: 70ch`.

**Fuentes:** `next/font/google` → `IBM_Plex_Sans` (400, 600), `IBM_Plex_Sans_Condensed` (500, 600), `IBM_Plex_Mono` (400); `subsets:['latin']`, `display:'swap'`, variables `--font-texto`, `--font-titular`, `--font-mono`; precarga solo Sans 400 y Condensed 600. Se sirven desde el dominio propio. (Si la red en el build molesta: `next/font/local` con los `.woff2` OFL.)

---

## D. Modo oscuro

- `ProveedorTema` = `next-themes` con `attribute="data-theme"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`, `enableColorScheme`, `storageKey="theme"` y `nonce` (CSP opción A).
- Se eliminan el `ThemeProvider` actual (`visibility:hidden`) y el script inline casero.
- `BotonTema`: 44×44 en el encabezado; luna en claro / sol en oscuro, ambos renderizados y mostrados por CSS según `[data-theme]` (sin desajuste de hidratación); `aria-label` según `resolvedTheme` («Cambiar tema» antes de montar).
- `SelectorTema` (menú móvil, «Apariencia»): `role="radiogroup"` + 3 `role="radio"` con `aria-checked`, flechas; refleja `theme`.
- `viewport.themeColor` doble por `media`.
- Opcional: View Transitions (`clip-path: circle()` desde el botón, 350 ms) solo si existe la API y no hay reduced motion.
- Fotos en oscuro: `filter: brightness(.9)` estático.

---

## E. Animaciones

**Solo Motion** (`motion/react`, `LazyMotion` + `m` + `domAnimation`), **sin GSAP**: no hay pinning ni scrub; el 3D lo mueven el control deslizante y el selector, animados dentro de R3F con `invalidate()`. Motion solo para `AnimatePresence` (menú, chat, botón flotante). Cero animaciones de entrada de sección.

| # | Elemento | Disparador | Propiedades | Duración / easing | Reduced motion |
|---|---|---|---|---|---|
| 1 | **Pórtico 3D (momento orquestado)** | Primera vez listo y visible (una vez) | Intensidad 0 → sismo de diseño, colores por deriva | 1200 ms `easeOutCubic` | Arranca deformado |
| 2 | Original ↔ Reforzada | Selector `aria-pressed` | Riostras (escala de instancias) + interpolación de U | 600 ms `easeInOutCubic` | Instantáneo |
| 3 | Control deslizante | `input` | Deformación directa | — | Igual |
| 4 | Respaldo SVG → canvas | Canvas listo | `opacity` | 200 ms | Se queda el SVG |
| 5 | Menú móvil | Abrir / cerrar | `opacity` + `translateY(-8px→0)` | 200 ms `cubic-bezier(.2,0,0,1)` / 150 ms | Solo `opacity` |
| 6 | Chat móvil | Abrir / cerrar | `translateY(100%→0)` + `opacity` | 280 / 200 ms | Solo `opacity` |
| 7 | Panel de chat escritorio | Abrir / cerrar | `opacity` + `translateY(16px→0)` | 220 / 160 ms | Solo `opacity` |
| 8 | Burbuja nueva | Mensaje añadido | `opacity` | 150 ms | Ninguna |
| 9 | «Escribiendo» | Esperando respuesta | `opacity` de 3 puntos, desfase 0,2 s (CSS) | ciclo 1,2 s | Estáticos |
| 10 | Botón flotante | Cambio de visibilidad | `opacity` + `translateY(8px)` | 200 ms | Solo `opacity` |
| 11 | Hover | `:hover` (dispositivos con hover) | `background-color`, `border-color` | 150 ms | Igual |
| 12 | Chevron FAQ | `<details>` | `rotate` | 150 ms | Sin rotación |
| 13 | Anclas | Clic | `scroll-behavior: smooth` solo con `no-preference`; `scroll-margin-top` 64/80 px | nativo | Instantáneo |
| 14 | Cambio de tema | Botón / selector | Instantáneo (opcional View Transition) | 0 / 350 ms | 0 |

Sin `box-shadow`/`filter`/`backdrop-filter` animados; sin carruseles automáticos (proyectos: scroll-snap con controles).

---

## F. Sección 3D

El lienzo vive **dentro del hero** (derecha en escritorio, bajo los CTA en móvil); el LCP es el `h1`.

- **`lib/estructura/derivas.ts`** (con pruebas): pórtico 3 × 2 vanos × 5 pisos; `u(i) = U · sen(π/2 · i/n)`; `deriva(i) = (u(i) − u(i−1)) / h`; relativa = deriva/límite → cumple < 0,70 · cerca 0,70–1,00 · excede ≥ 1,00. Calibración: con el sismo de diseño, pisos 1–2 exceden, 3 cerca, 4–5 cumplen. Reforzada: U × ≈0,45 → todo «cumple». Límite provisional 1 % h **[validar con el ingeniero, NSR-10 A.6.4-1]**.
- **`EscenaPortico`** (R3F 9): `InstancedMesh` de columnas (60) y vigas (85) con `Matrix4.compose`; riostras en X en vanos centrales (tercer `InstancedMesh`, `--color-detalle-laton`); colores con `setColorAt` desde `--color-grafico-*` (releídos al cambiar `resolvedTheme`); fantasma «Sin deformar»; cámara ortográfica isométrica fija; **sin OrbitControls ni rotación**; `frameloop="demand"`, `dpr={[1, 1.5]}`, `invalidate()` solo durante animaciones 1–2; `frameloop="never"` fuera de pantalla o con pestaña oculta; drei solo `PerformanceMonitor`.
- **Controles HTML:** `<input type="range">` con `<label>` «Intensidad del sismo» y `aria-valuetext`; selector Original/Reforzada con `aria-pressed`; leyenda siempre visible; resumen en `aria-live="polite"` (debounce 400 ms); rótulo «Desplazamientos exagerados…».
- **`RespaldoSvg` dinámico:** elevación 2D generada por `derivas.ts`, renderizada en el servidor en estado Reposo (misma caja → sin CLS), interactiva con los mismos controles. Experiencia completa para: sin WebGL, gama baja (`deviceMemory ≤ 2` o `hardwareConcurrency ≤ 2`), `prefers-reduced-motion`, y mientras carga.
- **Carga:** `dynamic(() => import('./EscenaPortico'), { ssr:false })`; escritorio con `requestIdleCallback` tras `load`; móvil con IntersectionObserver `rootMargin: 200px`. Chunk aparte.
- **Variantes:** Escritorio 16:10 · Compacto `@media (min-width:64rem) and (max-height:43.75rem)` · Móvil 4:3.
- **Táctil:** `touch-action: pan-y`, sin gestos capturados; botón flotante oculto mientras el lienzo está en pantalla.

---

## G. Chat

Dependencias verificadas en los paquetes publicados (12-nov-2026): `ai@7.0.171`, `@ai-sdk/react@4.0.175`, `@ai-sdk/groq@4.0.82`, `zod@4.6.7`, `@upstash/ratelimit@2.2.1`, `@upstash/redis@1.41.0`, `@vercel/functions@3.11.2`.

### G.1 Servidor (`app/api/chat/route.ts`, runtime Node, `maxDuration` 30)

1. **Origen:** `Origin` (o `Referer`) ∈ {`https://www.luxxor.com.co`, `https://luxxor.com.co`, `https://${VERCEL_URL}`, `https://${VERCEL_BRANCH_URL}`, `http://localhost:3000` solo en desarrollo, `ORIGENES_PERMITIDOS`}. Si no → 403.
2. **IP:** `ipAddress(req)` de `@vercel/functions` (lee `x-real-ip`). **No** se usa el primer valor de `x-forwarded-for` (lo controla el cliente).
3. **Rate limit (Upstash):** ventana deslizante 6/min y 40/día por IP + tope global diario. 429 con `Retry-After` y `{codigo:'limite'}`. Sin Upstash: en producción **falla cerrado** (503); en desarrollo, memoria.
4. **Tamaño:** se lee el cuerpo **realmente** con un lector del `ReadableStream` que acumula bytes y aborta al pasar de **16 384 bytes** → 413. La cabecera `content-length` no se usa como control (puede faltar o mentir).
5. **Validación zod (`.strict()`)** del formato propio, no del `UIMessage` completo:
   ```ts
   { mensajes: Array<{ rol: 'user' | 'assistant'; texto: string }> }  // máx. 10
   // user: 1–500 caracteres; assistant: máx. 2000 (se recorta a 600 al usarlo)
   ```
   Cualquier otra forma, rol o campo → 400.
6. **Historial no confiable:** últimos 6 turnos; los `assistant` recortados y tratados como contexto; recordatorio del prompt de sistema al final.
7. **Modelo:** `streamText` con `groq('openai/gpt-oss-20b')`, `temperature: 0.2`, `maxOutputTokens: 400` (ver G.3), y
   ```ts
   providerOptions: { groq: { reasoningEffort: 'low', reasoningFormat: 'hidden' } satisfies GroqLanguageModelChatOptions }
   ```
   (`reasoningEffort` y `reasoningFormat` verificados en `@ai-sdk/groq@4.0.82`; gpt-oss admite `low|medium|high`, por defecto `medium`.)
8. **Señal de cierre — data part, no tool part en el historial (corrección 1):**
   - El handler usa `createUIMessageStream({ execute: ({ writer }) => … })`.
   - Se define la herramienta `ofrecerContacto` **con `execute`**: escribe `writer.write({ type: 'data-contacto', data: { motivo } })` y devuelve `'ok'`. `stopWhen: stepCountIs(2)` para que el modelo pueda terminar el texto tras la llamada.
   - El stream del modelo se fusiona con `writer.merge(resultado.toUIMessageStream({ sendReasoning: false }))`. **El razonamiento nunca llega al cliente** (`sendReasoning: false` + `reasoningFormat: 'hidden'`).
   - Cliente: `DefaultChatTransport({ prepareSendMessagesRequest })` envía **solo** `{ mensajes: [{ rol, texto }] }`, construido a partir de las partes `type === 'text'` de cada mensaje. Las partes `data-contacto`, `tool-*`, `step-start` o `reasoning` **se quedan en el cliente** (para renderizar `BotonWhatsApp`) y nunca viajan al servidor.
   - Servidor: el esquema estricto de G.1.5 descarta cualquier otra cosa; la conversión a `ModelMessage` es propia (solo texto).
   - Prueba E2E obligatoria: conversación de **dos turnos después de un ofrecimiento** (turno 1 → `data-contacto` visible; turno 2 → 200 y respuesta; turno 3 → 200).
9. Errores genéricos al cliente; logs sin contenido del usuario en producción. La lista negra de frases deja de ser control principal.

### G.2 Prompt (`lib/asistente/prompt.ts` + `conocimiento.ts`)
Base estática del portafolio (servicios, metodología, ensayos, entregables, cobertura, contacto); «usted»; ≤ 120 palabras; texto plano; prohibido diagnosticar, dar precios/plazos cerrados o salirse del tema; derivar a visita técnica y llamar a `ofrecerContacto`; respuesta fuera de alcance según el ejemplo de Figma.

### G.3 Respuestas vacías por razonamiento (corrección 2)
gpt-oss cuenta los tokens de razonamiento dentro del límite de salida. Medidas:
- `reasoningEffort: 'low'`.
- En `onFinish`/`onStepFinish` se registra `finishReason` y la longitud del texto; si el texto visible queda vacío, se escribe un `data-aviso` de respaldo («No pude generar una respuesta. Escríbanos por WhatsApp.») en lugar de una burbuja vacía.
- `scripts/evaluar-asistente.mjs` (manual, ~25 preguntas reales + adversarias) mide la tasa de respuestas vacías y `finishReason: 'length'` con `maxOutputTokens: 400`. **Criterio: 0 vacías.** Si hay alguna, se sube a 700 y se mantiene la brevedad por prompt; el valor final queda documentado.

### G.4 Cliente
`BotonAbrirChat` («Preguntar al asistente», FAQ) carga `PanelChat` con `import()` al hacer clic. Móvil: `<dialog>` + `showModal()` a pantalla completa. Escritorio: `dialog.show()` no modal 400×680 abajo a la derecha (Escape manejado). Foco al campo al abrir; al cerrar vuelve al botón de origen; `aria-labelledby`. Mensajes del asistente en `aria-live="polite"`, renderizados como **texto** (`whitespace-pre-line`), nunca HTML. `ChatCampoMensaje`: `<textarea>` 1–4 líneas, borde `borde/fuerte` (o cualquier borde ≥ 3:1; nunca `borde/sutil`, ver §C), 16 px, `maxLength={500}`, contador, etiqueta «Escriba su pregunta», Enter envía / Mayús+Enter salto, deshabilitado en `submitted|streaming`. Sugerencias solo en la bienvenida. Avisos `role="status"`: Límite (429 detectado con `fetch` propio en el transporte) y Error (con «Reintentar»). Aviso permanente + enlace a la política de datos. Teclado: `interactiveWidget: 'resizes-content'`; iOS con `useViewportVisual` → `--alto-visible`; `env(safe-area-inset-bottom)`. Botón flotante oculto con el chat abierto.

---

## H. Responsive

Matriz verificada con Playwright (claro y oscuro): 320×640, 360×800, 390×844, 414×896, 844×390, 768×1024, 1366×768, 1440×900, 1920×1080, 2560×1440.

- Breakpoints Tailwind en rem: base / `md` / `lg` (encabezado de escritorio).
- Hero `min-height: 100vh` → `100svh` (nunca `dvh`); `@media (max-height: 43.75rem)` compacta. Titular + CTA visibles en 360×640 y 1366×768.
- Container queries en `FichaServicio`, `FichaProyecto`, `PasoMetodologia`, `FichaEnsayo`.
- Metodología horizontal → vertical; credenciales fila → 2×N; proyectos cuadrícula → scroll-snap con «Anterior/Siguiente».
- `next/image` con `sizes` reales; `getImageProps()` + `<picture>` donde Figma recorta distinto.
- `viewportFit: 'cover'` + `env(safe-area-inset-*)` (encabezado, botón flotante, menú 34 px, chat).
- Sin `maximum-scale`/`user-scalable=no`; inputs 16 px.
- Áreas táctiles 44 px (mín. absoluto 24, separadas).
- **Botón flotante:** store `visibilidadFlotante` con motivos `menu`, `chat`, `lienzo` (móvil, IntersectionObserver), `contacto` (CTA final o contacto visible), `teclado` (`visualViewport.height < 0.75·innerHeight` o foco en campo). Visible solo si no hay motivos. `padding-bottom` en la última sección. Sin «Volver arriba».
- Pantallas anchas: contenido a 80rem, fondos a sangre.

---

## I. SEO, legal y seguridad de cabeceras

- `metadataBase: https://www.luxxor.com.co`; título «Luxxor Group · Ingeniería estructural y vulnerabilidad sísmica en Cali»; descripción del portafolio; `alternates.canonical: '/'`; `openGraph` (`es_CO`) y `twitter`; `opengraph-image.tsx` con tokens y Plex.
- **Redirecciones:** `luxxor.com.co` → `www.luxxor.com.co` la hace Vercel (Domains; verificado el 12-nov-2026), no el código. `luxxorgroup.com` / `www.luxxorgroup.com` → www.luxxor.com.co: también en Vercel Domains si ese dominio se añade al proyecto (DNS/MX fuera del código).
- JSON-LD `ProfessionalService`: name, url, `telephone +573170303333`, email, `PostalAddress` (Calle 44N #4N-05, La Flora, Cali, Valle del Cauca, CO), `areaServed` (Valle del Cauca, Cauca, Nariño), `sameAs`. Sin `aggregateRating`, horarios ni coordenadas. Sin `FAQPage`.
- `sitemap.ts`, `robots.ts` (`disallow: /api/`), `lang="es-CO"`, `poweredByHeader: false`.
- `/politica-de-datos` (Ley 1581/2012, Decreto 1377/2013: responsable, finalidades, encargados Groq y Vercel con transferencia internacional, derechos, procedimiento, canal, vigencia) y `/terminos`, como **borrador** con solo datos confirmados.
- **CSP opción A (nonce)** en `proxy.ts`:
  ```
  default-src 'self';
  script-src 'self' 'nonce-{n}' 'strict-dynamic';          (+ 'unsafe-eval' solo en desarrollo)
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com;
  frame-src 'none'; object-src 'none'; base-uri 'self';
  form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;
  ```
  Además se conservan y verifican: `Strict-Transport-Security: max-age=63072000; includeSubDomains` (sin `preload`: el dominio no está en la lista de precarga), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`, `X-Frame-Options: DENY`, `Cross-Origin-Opener-Policy: same-origin`.
  Medición obligatoria: TTFB y LCP en el preview; si incumplen el presupuesto se discute antes de pasar a la opción B.

---

## J. Sesiones

Versiones según npm al 12-nov-2026; se fijan exactas al instalar. Verificación común: `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm audit --omit=dev`. Al final de cada sesión: mensaje de commit sugerido (lo ejecuta Jordan).

### Sesión 0 — Hotfix de producción (rama desde `main`)
Plan detallado aparte (se presenta antes de ejecutar). Resumen: `next`/`eslint-config-next` 16.4.6, `npm audit fix`, `route.ts` endurecido (origen, IP por `x-real-ip`, cuerpo ≤ 16 KB leído, zod, historial recortado, `reasoning_effort: 'low'` sin razonamiento en la respuesta), cliente envía historial corto.
Commit: `fix(seguridad): actualizar next a 16.4.6 y endurecer la API del chat`

### Sesión 1 — Limpieza, dependencias y base de seguridad
- **Elimina** lo de §A, incluido `app/api/chat/route.ts` y `components/`.
- **Modifica:** `package.json` (nombre `luxxor-group-landing`, `engines.node >=20.9`, script `typecheck`; `test` y `test:e2e` se añaden en la S3; `overrides` de `minimatch@11.0.8` para `@typescript-eslint/typescript-estree`), `next.config.ts` (sin Unsplash, `poweredByHeader:false`; **sin redirección raíz → www: la hace Vercel**, verificado el 12-nov-2026), `proxy.ts` (CSP depurada sin `unsafe-eval` en producción, con `form-action` y `upgrade-insecure-requests`, cabeceras de §I, HSTS sin `preload`), `tsconfig.json`, `README.md`, `.gitignore` (`!.env.example`, `/recursos/`), `app/page.tsx` (página mínima temporal desde `config/sitio.ts`), `app/layout.tsx` (metadata mínima con `robots: { index: false }` provisional).
- **Crea:** `config/sitio.ts`, `.env.example`, `.gitattributes` (`eol=lf`), `CLAUDE.md` del proyecto con: stack, convenciones, **«no hacer commits ni push»**, **«presentar un plan antes de cada sesión»**, **«no usar `npm audit fix --force`»**, **«no tocar `main` ni otras ramas»** y **«no ejecutar comandos destructivos de git salvo petición»**.
- **Dependencias:** `next@16.4.6`, `eslint-config-next@16.4.6`, `react`/`react-dom@19.3.1`, `@types/react`/`@types/react-dom@19.3.0`; fuera `groq-sdk`, `embla-carousel-react`, `framer-motion`; dentro `motion@14.13.0`.
- **Aceptación:** lint/tsc 0 errores; build OK; audit 0 críticas/altas; sin rutas de configs de IA en `git ls-files`; sin gitlinks (`git ls-files -s | grep ^160000` vacío); sin 313 886 5481; `public/` < 1 MB.
- Commit: `chore: limpiar repositorio, actualizar dependencias y centralizar contacto`

### Sesión 2 — Tokens, fuentes y tema
- Crea `globals.css` (§C), fuentes, `componentes/tema/*`, `lib/hooks/useMontado.ts`, `config/tema.ts`, `viewport`, galería `app/desarrollo/componentes/page.dev.tsx` (solo se compila en desarrollo o con `GALERIA_COMPONENTES=1`, vía `pageExtensions`).
- Token añadido solo en código: `--color-accion-whatsapp-texto` = marino/900 en ambos modos (8,69:1 sobre #25D366). En Figma lo añade el asistente que mantiene el archivo.
- Fuentes: Plex Sans (400/600, un archivo variable) y Plex Sans Condensed 600 precargadas (~57 KB); Condensed 500 como instancia separada sin precarga (`--font-plex-condensed-dato`, solo `texto-dato`); Plex Mono sin precarga.
- Dependencias: `next-themes@0.4.6`.
- Aceptación: sin hex fuera de `globals.css` y `config/tema.ts`; tema sin parpadeo ni transiciones; «Sistema» sigue `prefers-color-scheme`; 19 tokens semánticos en ambos modos; colores calculados = Figma; tamaños tipográficos ±0,5 px a 360 y 1440 px; 2 preloads de fuente. **Excepción conocida:** el aviso de React 19 por el `<script>` de next-themes, solo en desarrollo, se documenta y no se corrige. La verificación con axe pasa a la S3.
- Commit: `feat(diseno): tokens de Figma, tipografía IBM Plex fluida y tema con next-themes`

### Sesión 3 — Componentes base, arnés de pruebas y CI
- Crea `ui/*`, `fichas/*`, `navegacion/*`, `lib/estado/visibilidadFlotante.ts`, `lib/hooks/{useEnPantalla,useViewportVisual,useMovimientoReducido}.ts`, `playwright.config.ts`, `vitest.config.ts`.
- **Crea `.github/workflows/calidad.yml`** (push y pull request): `npm ci` → `npm run lint` → `npx tsc --noEmit` → `npm test` (unitarias) → `npm run build` → `npm audit --omit=dev --audit-level=high`. Node 22, caché de npm. (Las E2E de Playwright se suman al workflow en la S9.)
- Dependencias dev: `@playwright/test@1.65.0`, `@axe-core/playwright@4.14.0`, `vitest`.
- Pruebas unitarias nuevas: `config/tema.ts` (`colorNavegador.claro` / `.oscuro`) coincide con el valor resuelto de `--color-fondo-base` en `app/globals.css` en modo claro y oscuro (se parsean los primitivos y los bloques de tokens del CSS).
- Aceptación: cada componente coincide con su variante de Figma; foco con anillo de latón 2 px; menú con foco atrapado, Escape, `aria-expanded`, scroll bloqueado, cierre al tocar enlace; **axe 0 violaciones en la galería (claro/oscuro), incluido `color-contrast`** (movido desde la S2); workflow en verde.
- Commit: `feat(componentes): sistema de componentes base, arnés de pruebas y CI`

### Sesión 4 — Landing móvil
- Crea `contenido/landing.ts`, las 14 secciones, `scripts/optimizar-fotos.mjs`, `public/fotos/*`, `public/descargas/*`; hero con `RespaldoSvg` provisional.
- **Recursos:** el script lee originales y PDF de **`C:\Luxxor\recursos\`** (fuera del repo; ruta configurable por argumento o variable `RUTA_RECURSOS`) y escribe solo las versiones optimizadas en `public/` (JPEG ≤ 1600 px, ≤ 400 KB, recorte de marcas de fecha en fotos 5, 6, 7). Los originales nunca se copian al repo.
- Dependencias dev: `sharp@0.35.5`.
- Aceptación: capturas 360/390/414 claro y oscuro coherentes con Figma 03 y 06; hero completo en 360×640; ningún texto < 14 px salvo letras de ejes; 0 scroll horizontal en 320; fotos A/B según rol en Figma; foto 28 ausente.
- Commit: `feat(landing): landing móvil con contenido del portafolio`

### Sesión 5 — Escritorio y anchos intermedios
- Layouts `md`/`lg`/`xl`, hero compacto, encabezado de escritorio.
- Aceptación: 768, 1366×768, 1440×900, 1920, 2560 coherentes con Figma 04 y 06; hero completo en 1366×768.
- Commit: `feat(landing): composición de escritorio y verificación de anchos`

### Sesión 6 — Lienzo 3D
- Crea `lib/estructura/derivas.ts` (+ pruebas) y `componentes/lienzo-3d/*`.
- Dependencias: `three@0.187.0`, `@react-three/fiber@9.8.2`, `@react-three/drei@10.7.9`, `@types/three@0.187.0`.
- Aceptación: JS inicial sin crecer respecto a la S5; teclado y `aria-live` correctos; SVG interactivo con reduced motion o sin WebGL; scroll vertical sobre el canvas; CLS 0; pruebas de derivas (pisos 1–2 exceden; Reforzada < 0,70); animación de entrada una sola vez.
- Commit: `feat(3d): pórtico interactivo con derivas por piso y respaldo SVG`

### Sesión 7 — Chat
- Crea `app/api/chat/route.ts`, `lib/asistente/*` (incluye `cuerpo.ts` con el lector limitado), `lib/entorno.ts`, `componentes/chat/*`, `scripts/evaluar-asistente.mjs`.
- Dependencias: `ai@7.0.171`, `@ai-sdk/react@4.0.175`, `@ai-sdk/groq@4.0.82`, `zod@4.6.7`, `@upstash/ratelimit@2.2.1`, `@upstash/redis@1.41.0`, `@vercel/functions@3.11.2`, `server-only`.
- Variables: `GROQ_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ORIGENES_PERMITIDOS` (opcional).
- Aceptación:
  - Unitarias: el esquema rechaza `rol:"system"`, > 500 caracteres, > 10 mensajes, campos extra, partes no textuales; cuerpo de 16 385 bytes **sin** `content-length` → 413; Origin ajeno → 403; IP tomada de `x-real-ip` aunque `x-forwarded-for` venga falsificado; límite simulado → 429.
  - E2E con modelo simulado (`ai/test`): streaming; **dos turnos después de un `data-contacto`** sin 400; aviso Límite y Error con reintento; Escape y foco; ninguna parte `reasoning` en el stream.
  - Evaluación manual: 0 respuestas vacías con el `maxOutputTokens` elegido.
  - El AI SDK no está en el chunk inicial.
- Commit: `feat(chat): asistente con AI SDK, validación zod, rate limit y verificación de origen`

### Sesión 8 — SEO, legal y CSP final
- Crea `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, JSON-LD, `/politica-de-datos`, `/terminos`, iconos; `proxy.ts` con nonce (opción A) y `nonce` en next-themes; se retira `robots: { index: false }` de `app/layout.tsx`.
- Dependencias: `@vercel/analytics@2.0.1` (si se activa).
- Aceptación: Rich Results Test sin errores; `curl -I` muestra CSP con nonce, `form-action 'self'`, `upgrade-insecure-requests`, HSTS, nosniff, Referrer-Policy y Permissions-Policy; 0 errores de CSP en consola (tema, 3D, chat); Lighthouse SEO 100; **TTFB y LCP medidos en el preview** y reportados; **metadata sin `robots` `index:false`**: `git grep -n "index: false" -- app` sin resultados y `curl -s https://<preview>/ | grep -ci 'name="robots"'` → `0` (o un `robots` con `index, follow`).
- Commit: `feat(seo): metadata, datos estructurados, páginas legales y CSP con nonce`

### Sesión 9 — QA final
- Matriz completa de Playwright, axe, Lighthouse móvil, bundle, checklist manual; E2E añadidas al workflow.
- Aceptación: LCP < 2,5 s, CLS < 0,1, TBT < 200 ms; JS inicial < 150 KB gz; axe 0; «Definición de terminado» (§11.5 de la investigación) completa.
- Commit: `test: regresión visual por viewport y verificación de accesibilidad y rendimiento`

---

## K. Pruebas

- **Playwright:** proyecto por viewport × `colorScheme`; `toHaveScreenshot` (`animations:'disabled'`, `maxDiffPixelRatio: 0.01`, canvas enmascarado); funcionales: menú, tema, selector, foco, reglas del botón flotante, `scrollWidth ≤ clientWidth`, zoom 200 %. Baselines generadas en Linux (CI).
- **axe:** `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa` en landing, menú abierto, chat abierto y páginas legales.
- **Vitest:** derivas, esquema zod, lector de cuerpo limitado, origen, IP, armado del prompt.
- **Chat:** route handler con modelo simulado de `ai/test` (sin llamar a Groq); Upstash simulado; E2E de dos turnos tras ofrecimiento; `scripts/evaluar-asistente.mjs` manual (inyección, turnos `assistant` forjados, otros idiomas, Unicode, pedir precio o diagnóstico, respuestas vacías).
- **Lighthouse** móvil contra `next start`; luego Speed Insights reales.
- **Manual:** Android gama media + Chrome, iPhone + Safari, teclado del chat, solo teclado, TalkBack/VoiceOver, horizontal, letra del sistema aumentada, reduced motion.

---

## L. Supuestos, pendientes y riesgos

**Bloqueantes de material**
1. `C:\Luxxor\recursos\` **no existe** en el equipo donde se preparó este plan (verificado el 12-nov-2026). Hace falta antes de la S4, con las 29 fotos y los 2 PDF.
2. Los PDF (portafolio y tarjeta) tienen un QR hacia `luxxorgroup.com` (error 500): publicarlos en Descargas lleva al sitio roto hasta que se redirija ese dominio.
3. Logo en vector (mientras tanto, logotipo de texto provisional como en Figma).

**Pendientes del cliente**
4. Fotos de proyectos: fichas sin foto hasta confirmación.
5. Autorización de nombres de clientes (Interplásticos, Colegios de Yumbo, Super Farma, Farmatodo, Tecnoquímicas).
6. Validación del ingeniero: mensaje del 3D, límite de deriva, rótulo «ilustrativo».
7. Matrícula y fotos de la dirección técnica.
8. Razón social, NIT y revisión legal de política y términos; URL canónica de Facebook.
9. Aprobación del copy de las respuestas de Preguntas frecuentes (tomado del portafolio).
10. Variables: `GROQ_API_KEY` (existe en Vercel), cuenta Upstash (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`); confirmar `openai/gpt-oss-20b`.

**Riesgos**
- Cambios de API en versiones mayores (AI SDK 7, motion 14, zod 4) → se verifica en los tipos y documentación del paquete instalado.
- CSP con nonce fuerza render dinámico → medición de TTFB/LCP en el preview (S8).
- Baselines de Playwright dependen de la plataforma → CI Linux.
- El chat envía datos a Groq (EE. UU.) → debe constar en la política de datos.
- Figma: la colección `Primitivos` no está oculta (el documento dice «oculta»); sin efecto en código.
