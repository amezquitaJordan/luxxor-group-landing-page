# Luxxor Group — Contexto de empresa, análisis de la landing y auditoría del código

> Documento base del proyecto de remodelación de la landing (nov. 2026).
> Fuentes: `Luxxor-imagenes.zip` (29 imágenes + 2 PDF), sitio en vivo https://www.luxxor.com.co (revisado el 12-nov-2026), repositorio `amezquitaJordan/luxxor-group-landing-page` (66 commits, último 2026-09-01).
> Convención: **[Hecho]** = verificado en la fuente · **[Inferencia]** = conclusión mía a partir de los datos · **[Pendiente]** = requiere confirmación del dueño.

---

## 0. Hallazgo principal (cambia todo el enfoque)

**[Hecho]** La landing actual vende *remodelación de interiores de lujo, carpintería y restauración de mobiliario* ("Transformamos tu espacio en lujo"). El portafolio 2026 y las tarjetas que entregó el dueño posicionan a Luxxor como **firma caleña de ingeniería estructural y vulnerabilidad sísmica**, con la remodelación/acabados como servicio *complementario*.

**[Inferencia]** No es un "rediseño visual": es un **reposicionamiento**. La arquitectura de información, el copy, el chatbot, el SEO y las imágenes deben reconstruirse alrededor de la ingeniería. Mantener el discurso de "lujo" como eje contradice el pedido de "transmitir ingeniería, seguridad y calidad".

**[Hecho]** El contexto lo explica: el sismo M7,4 del 10-ago-2026 (epicentro San José del Palmar, Chocó) afectó gravemente a Cali — la Alcaldía reporta más de 12.000 edificaciones afectadas y 24 colapsadas (cali.gov.co, 11-sep-2026). El portafolio menciona explícitamente el sismo y el peritaje post-sismo.

**[Inferencia — implicación de diseño/ética]** Hubo víctimas fatales. El tono debe ser **sobrio, técnico y verificable**, nunca alarmista ni de "marketing del miedo" (nada de imágenes de colapsos, contadores dramáticos ni urgencias falsas). La autoridad se transmite con evidencia: normas, ensayos, entregables firmados, proyectos reales.

---

## 1. Contexto de la empresa (según PDFs y tarjetas)

| Campo | Dato |
|---|---|
| Nombre | Luxxor Group |
| Aliado/marca asociada | BH Constructora (logo en portada del portafolio y tarjetas) — **[Pendiente]** relación exacta |
| Sede | Calle 44N #4N-05, La Flora, Cali, Valle del Cauca (la landing agrega "2do piso") |
| Cobertura | Valle del Cauca, Cauca y Nariño; peritajes post-sismo en Cali, Palmira y Armenia |
| Marco normativo | NSR-10 (Reglamento Colombiano de Construcción Sismo Resistente); Título A, Cap. A.10 (edificaciones existentes) |
| Software | ETABS y otros programas de elementos finitos |
| Cifras declaradas | +20 proyectos; 130 t de estructura metálica diseñada y montada; 3 departamentos |
| Dirección técnica | Ing. Hugo Alberto Bohórquez (especialista en estructuras) · Arq. Emilio Ricaute (diseño arquitectónico) |
| Contacto comercial | Yasser Niño Garrido — Director de Operaciones |
| Clientes declarados | Tecnoquímicas, Interplásticos, Colegios públicos de Yumbo, Farmatodo, Super Farma, Wan Su Lay, conjuntos y edificios en P.H. |

**Nota de integridad:** las cifras y nombres de clientes son *declarados por la empresa*; no los verifiqué de forma independiente. Antes de publicarlos conviene confirmar que hay autorización para usar marcas de clientes (Tecnoquímicas, Farmatodo, etc.).

### 1.1 Servicios (jerarquía del portafolio)

1. **Evaluación de vulnerabilidad sísmica** — *servicio principal* (NSR-10 A.10): levantamiento, ensayos, modelo analítico, índices de sobreesfuerzo y flexibilidad, concepto y presupuesto de reforzamiento.
   - Metodología en 6 pasos: Información → Levantamiento → Ensayos → Modelo → Índices → Decisión.
   - Ensayos: núcleos (ASTM C42), esclerometría (ASTM C805), ultrasonido (ASTM C597), escaneo de refuerzo, carbonatación/corrosión, mapeo de fisuras, levantamiento geométrico, estudio geotécnico, apiques.
   - Entregables: informe firmado por ingeniero estructural, resultados de laboratorio, planos de levantamiento, modelo y memoria, índices, alternativas con presupuesto.
2. **Modelado y análisis estructural** — FHE, modal espectral, derivas, irregularidades, comparación de escenarios de reforzamiento.
3. **Diseño y cálculo estructural** — concreto, mampostería estructural, acero; memorias, planos, despieces, acompañamiento en curaduría. Proyectos: Bodega Interplásticos (60 t), Colegios de Yumbo (50 t), Coliseo Buenos Aires-Cauca (20 t), Coliseo Corinto, Tecnoquímicas (cubierta comedor), Casa Ingeniera Claudia (ladera).
4. **Reforzamiento estructural** — encamisados, muros de rigidización, arriostramiento metálico, fibras de carbono, recalce de cimentaciones, refuerzo de entrepisos. "Diseño y ejecución con el mismo equipo".
5. **Peritaje estructural de siniestros** — Inspección → Dictamen → Presupuesto (APU) → Reclamación ante aseguradora → Reparación.
6. **Complementarios** — estudio de suelos, estructura metálica y cubiertas, obra civil, diseño arquitectónico y renders 3D/360°, acabados y carpintería, adecuación de espacios comerciales (Farmatodo, Super Farma).

### 1.2 Propuesta de valor (síntesis mía de los PDFs)
- "Ingeniería que se mide, se calcula y se firma" → **de la opinión al dato, del dato a la decisión**.
- **Un solo responsable técnico** del diagnóstico a la obra.
- Evidencia verificable por terceros (propietario, curaduría, aseguradora).
- Proceso documentado: visita técnica → propuesta escrita → estudio/diseño → entrega con sustentación.

### 1.3 Público objetivo [Inferencia]
1. Administradores y consejos de propiedad horizontal (edificios/conjuntos post-sismo).
2. Propietarios de edificaciones previas a 2010 o sin planos; ampliaciones y cambios de uso.
3. Empresas industriales/comerciales (bodegas, cubiertas, locales, droguerías).
4. Entidades públicas/educativas (colegios, coliseos).
5. Afectados con reclamación ante aseguradoras.

---

## 2. Identidad visual — conflicto que hay que resolver

**[Hecho]**
- Logo entregado (17.jpeg): wordmark "LUXXOR / GROUP" **azul marino (~#0A1A30) con acento azul (~#104070)** sobre blanco.
- Portafolio y tarjetas: fondo **gris pizarra (~#313945–#47576D)**, texto blanco, acentos **azul claro** y degradado azul.
- Landing actual: **dorado #D4AF37** + negro #121212 / beige #F5EDE2, tipografías Playfair Display + Inter, monograma "LX" en texto (no hay logo real: `public/logo-luxxor.png` pesa 0 bytes).

**[Pendiente — decisión #1]** El pedido es "gris con blanco y dorado, como el logo", pero **ningún material entregado contiene dorado**. Opciones a preguntar al dueño:
- a) Existe otra versión del logo con dorado → que la envíe en vector (SVG/AI/PDF).
- b) Quiere gris + blanco + dorado como **nueva** dirección (el logo azul se adaptaría a versión blanca/monocroma).
- c) Usar la paleta real de sus piezas (gris pizarra + blanco + azul) y el dorado solo como acento mínimo.

**[Inferencia]** Para "ingeniería y seguridad", un dorado saturado tipo #D4AF37 en grandes superficies tiende a leerse como lujo/joyería. Si se usa dorado, recomiendo un tono desaturado (latón/bronce) y solo como acento funcional (líneas, datos, estados), no en titulares sobre fondos claros: hoy el dorado sobre beige tiene contraste ≈1,8:1, que **incumple WCAG 2.x** (mínimo 3:1 para texto grande, 4,5:1 normal).

---

## 3. Inventario de imágenes del ZIP

Todas son JPEG sin EXIF (comprimidas por WhatsApp), máx. 1600 px de lado. **Sirven para tarjetas y galerías; son justas para un hero a pantalla completa en pantallas retina** → pedir originales al dueño.

| Categoría | Archivos | Uso recomendado |
|---|---|---|
| Obra / estructura real | 2, 3 (estructura metálica en terraza), 4 (edificio con andamio), 5 (casa en ladera en obra), 6, 7 (cimentación, formaleta y acero) | Hero, reforzamiento, "obras en ejecución" |
| Trabajo de campo / ensayos | 12 (estación total), 13 (levantamiento), 15 (medición de fisura), 16 (inspección de columna en parqueadero) | Vulnerabilidad, ensayos en sitio (muy valiosas: transmiten ingeniería real) |
| Modelos y renders | 1 (render fachada), 11 (captura ETABS con fondo de damero "horneado"), 25, 26 (modelos de mobiliario) | Modelado; para el 3D usar la imagen con transparencia extraída del PDF (portada, 790×575 con canal alfa) |
| Comercial | 18, 19 (Super Farma) | Espacios comerciales |
| Interiores / carpintería | 20, 21, 22, 23, 24 | Complementarios |
| Capturas de celular | 27, 29 (con barra de estado) | Solo recortadas, y con baja resolución |
| Piezas gráficas con texto | 8, 9, 10 (collages), 14 (flyer) | **No usar como foto**; re-componer con las fotos fuente |
| Logo | 17 | Pedir vector |
| **No usar** | 28 — tiene marca de agua de TikTok **@apexfitout** (contenido de terceros) | Riesgo de derechos de autor |

---

## 4. Análisis de la landing en vivo (luxxor.com.co, 12-nov-2026)

### 4.1 Contenido y mensaje
- Title: "Luxxor Group - Premium Services"; meta description: "Servicios premium, **bienes raíces, seguros y consultoría legal**" → **restos de otra plantilla, totalmente erróneos** para el negocio.
- Copy heredado de otro rubro: "Simplificamos la complejidad del crecimiento patrimonial", "Mucho más que una transacción".
- `og:url` apunta a `https://luxxorgroup.com`, no al dominio real. Sin `canonical` y sin datos estructurados (JSON-LD `LocalBusiness`/`ProfessionalService`).
- Testimonios ("Dr. Roberto Mendoza", "Carolina Sterling", "Familia Restrepo") **[Pendiente]** — no hay evidencia de que sean reales. Si son inventados, es publicidad engañosa: **eliminarlos o reemplazarlos por reales**.
- Antes/Después y varias fotos son **stock de Unsplash** (confirmado en `scripts/download_images.js`), y algunas parecen generadas por IA. Presentarlas como "Transformaciones reales" es engañoso.
- "10+ años de experiencia" **[Pendiente]** — no aparece en el portafolio.
- Enlaces muertos: "Política de Privacidad" y "Términos de Servicio" → `#`. Al recoger datos (chat/WhatsApp) aplica la Ley 1581 de 2012 (habeas data) → se necesita política de tratamiento real.

### 4.2 Contactos inconsistentes — **[Pendiente — decisión #2]**
| Dónde | Dato |
|---|---|
| Landing (hero, nav, footer, chatbot, burbuja) | WhatsApp/tel. **+57 317 030 3333** |
| Landing, sección comercial | WhatsApp **+57 313 886 5481** |
| Tarjetas / portafolio | **+57 300 195 1936** |
| Correo landing | info@luxxorgroup.com |
| Correo tarjetas | gerencia@luxxorgroup.com |
| Instagram | `@luxxor_group` (chatbot) vs `@luxxorcol` (footer) |

### 4.3 Dominio y QR — **[Hecho, crítico]**
El QR de las tarjetas y del flyer apunta a **https://www.luxxorgroup.com**, que hoy responde **HTTP 500 "There has been a critical error on this website" (WordPress)**. Todo cliente que escanee una tarjeta llega a una página rota. Hay que decidir el dominio canónico y redirigir el otro (cuidando no romper los registros MX del correo @luxxorgroup.com).

### 4.4 Rendimiento / UX observados
- 205 elementos con transiciones ≥500 ms y 71 animaciones activas simultáneas.
- Navegación móvil: textos de 9–10 px y áreas táctiles de ~15 px de alto (WCAG 2.2 recomienda ≥24×24 px; las guías de plataforma, 44–48 px).
- En móvil, la pila de 3 botones flotantes + burbuja de WhatsApp tapa el contenido.
- Los carruseles duplican el contenido 3 veces en el DOM (lectores de pantalla lo leen 3 veces).
- Hero con `h-screen` (100vh): en móvil se corta por la barra del navegador (usar `svh/dvh`).
- Video de 8,7 MB con autoplay y sin `poster`.
- Cabeceras de seguridad presentes: CSP, HSTS (max-age 63072000), X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy. CSP debilitada por `'unsafe-inline' 'unsafe-eval'`.

---

## 5. Auditoría del repositorio

**Stack:** Next.js 16.1.6 (App Router, Turbopack) · React 19.2.3 · Tailwind v4 · framer-motion 12 · groq-sdk (modelo `openai/gpt-oss-20b`) · Vercel + Speed Insights.

### 5.1 Severidad alta
1. **Dependencias vulnerables** (`npm audit`, 12-nov-2026): 1 crítica (`next` ≤16.4.0 → corregida en 16.4.6), 4 altas (`postcss`, `sharp`, `nanoid`, `source-map-js`), 1 moderada. → Actualizar `next` a la versión parcheada actual.
2. **API del chatbot (`app/api/chat/route.ts`)**
   - Sin límite de tamaño en `message` ni en `chatHistory` → abuso de costos (consumo de tokens) y DoS lógico.
   - El cliente puede **forjar turnos `assistant`** en `chatHistory` (cualquier rol ≠ `user` se convierte en `assistant`) y el filtro anti-inyección solo revisa `message`, no el historial → la inyección se salta trivialmente.
   - El filtro por lista negra de frases es un control débil (se evade con sinónimos, otros idiomas o Unicode). Es defensa complementaria, no principal.
   - Rate limit en memoria por instancia: no se comparte entre instancias serverless y el `Map` nunca se purga. Para algo robusto: Upstash/Vercel KV o el firewall de Vercel.
   - Sin verificación de `Origin`: cualquiera puede consumir el endpoint desde fuera del sitio.
   - El *system prompt* describe otro negocio (remodelación de interiores), ordena "consultar Google Sheets" (no existe esa herramienta → induce alucinaciones) y usa `temperature 0.7` para un FAQ factual.
   - La UI detecta la despedida con `includes("¡Gracias por tu consulta!")` → acoplamiento frágil entre prompt y UI.
3. **`ThemeProvider` oculta toda la página (`visibility:hidden`) hasta que React hidrata** → retrasa el primer render visible (LCP/FCP) y, si el JS falla, la página queda en blanco. El script inline del `<head>` ya resuelve el FOUC; el ocultamiento sobra.

### 5.2 Causas raíz de la lentitud claro↔oscuro y de las animaciones
- Doble sistema de tema: variables CSS (`data-theme`) **+** clases `dark:` de Tailwind **+** colores fijos (`bg-[#FFFFFF]`, `text-[#2A2824]`) mezclados → inconsistencias.
- `transition-colors duration-700` repetido en ~60 sitios + transición de 0,75 s en `body` + `.luxxor-card-premium` (0,6 s, incluye `box-shadow`) → al cambiar el tema, cientos de elementos interpolan color y sombra a la vez durante casi un segundo.
- **Animaciones infinitas de `box-shadow` con framer-motion** ("auras" en tarjetas): `box-shadow` no se compone en la GPU → repintado en cada frame. Además se renderizan 3 auras por tarjeta (móvil/tablet/desktop), ocultas con CSS pero **animándose igual en JS**.
- `whileInView` con `viewport={{ once: false }}` → re-animación cada vez que se hace scroll.
- Carruseles infinitos en JS (testimonios, valor agregado) y en CSS (proyectos) corriendo siempre.
- Imágenes fuente de 7–9,8 MB (PNG) en `public/images`; repo de 89 MB.

### 5.3 Deuda técnica / calidad
- `npx eslint .`: 14 errores, 12 advertencias (`any`, `setState` síncrono dentro de effects, `prefer-const`, `require()` en scripts).
- `tsc --noEmit`: sin errores.
- Código muerto/duplicado: `src/app/*` (plantilla create-next-app sin usar), `Offers.tsx` y `WhatsAppCTA.tsx` (placeholders vacíos), `claudecode` sigue registrado como **gitlink de submódulo roto** (modo 160000 sin `.gitmodules`), `boutique-lujosa.jpg` y `farmacia-lujosa.jpg` contienen el texto `<html><body>404</body></html>` (descargas fallidas), `logo-luxxor.png` de 0 bytes, `tailwind.config.ts` ignorado por Tailwind v4.
- Ruido en el repo: `.agents/`, `.codex/`, `.cursor/`, `.gemini/`, `.zed/`, `opencode.json`, `config/mcporter.json` (configs de varias herramientas de IA) → ensucian el lint y el repo público.
- `package.json` con `name: "temp-app"`; README genérico.
- Datos de contacto *hardcodeados* en 7+ componentes → centralizar en un `config/sitio.ts`.
- Accesibilidad: el modal del chat no tiene `role="dialog"`, `aria-modal`, foco atrapado ni cierre con Escape; el botón de cerrar no tiene `aria-label`; el input no tiene `maxLength` ni etiqueta.
- **Secretos:** no encontré claves en el historial de git (búsqueda por patrones `gsk_`, `AIza`, `sk-`). `.env*` está en `.gitignore`. ✔
- El build no pudo completarse en mi entorno porque `next/font` no logra descargar Google Fonts sin red; no es un fallo del código.

### 5.4 Lo que sí está bien
- Cabeceras de seguridad centralizadas en `proxy.ts`; `MotionConfig reducedMotion="user"`; uso de `LazyMotion`/`m`; `next/image` con `sizes`; carga diferida de secciones; la API key nunca llega al cliente; los mensajes de error al cliente son genéricos.

---

## 6. Recomendación de arquitectura de información (borrador para Figma)

1. **Hero** — Ingeniería estructural y vulnerabilidad sísmica en Cali. Mensaje: "Sabemos cómo se comporta su edificación ante un sismo". CTA primario: *Agendar evaluación técnica*; secundario: *Descargar portafolio (PDF)*.
2. **Barra de credenciales** — NSR-10 · Ensayos ASTM · Modelado ETABS · +20 proyectos · 130 t de acero.
3. **Servicios** — Vulnerabilidad (destacado) / Modelado / Diseño y cálculo / Reforzamiento / Peritaje de siniestros.
4. **Metodología** — los 6 pasos, como diagrama técnico.
5. **Ensayos en sitio** — fotos reales 12, 13, 15 y 16.
6. **Proyectos** — casos con tonelaje, tipo y ubicación (Interplásticos, Yumbo, coliseos, Casa Ingeniera Claudia, Colinas de Arroyo Hondo).
7. **Del render a la obra** — integración de arquitectura + estructura + obra.
8. **Complementarios** — acabados, carpintería, comercial (secundario).
9. **Equipo / dirección técnica** — ingenieros con su especialidad.
10. **Clientes** — solo con autorización.
11. **Descargas** — Portafolio 2026 (PDF) y Tarjeta (PDF).
12. **FAQ técnico** + asistente IA reentrenado al nuevo alcance.
13. **Contacto** — visita técnica, mapa, datos unificados.

---

## 7. Decisiones

### 7.1 Confirmadas por el dueño (12-nov-2026)
| Tema | Decisión |
|---|---|
| Paleta | Colores **principales = los del logo** (azul marino ~#0A1A30, azul ~#104070, gris pizarra ~#313945 de sus piezas, blanco). **Dorado solo como detalle/acento**. |
| Dominio | **luxxor.com.co** (canónico). |
| Correo | gerencia@luxxorgroup.com — ⚠️ en el mensaje llegó escrito "luxxorgruop.com"; las tarjetas dicen "luxxorgroup.com". Se asume el de las tarjetas. |
| WhatsApp | https://wa.me/573170303333 (único; eliminar el 313 886 5481). |
| Instagram | https://www.instagram.com/luxxorcol (sin el parámetro de rastreo `?obrf=…`). |
| Facebook | https://www.facebook.com/share/1FDJBdYxgs/ (enlace de "compartir"; idealmente reemplazar por la URL canónica de la página). |
| Fotos | Selección a criterio del equipo (ver §8). |
| Testimonios | **Son inventados** → no se publican como reales (ver §7.3). |

### 7.2 Aún pendientes
1. Logo en vector (SVG/AI/PDF) y versión monocroma blanca.
2. QR de las tarjetas → `luxxorgroup.com` (WordPress con error 500): redirigir ese dominio a luxxor.com.co **sin tocar los registros MX** (el correo vive ahí).
3. ¿Remodelación/carpintería/mobiliario pasan a "complementarios"? (Recomendado, según el portafolio.)
4. Autorización para mostrar nombres/logos de clientes.
5. Fotos originales en alta resolución.
6. Relación con BH Constructora y si va en la landing.
7. ¿Se mantienen modo oscuro y chatbot?
8. Política de tratamiento de datos (Ley 1581/2012) y términos.
9. Consentimiento de las personas que aparecen en las fotos (13, 15, 16).

### 7.3 Testimonios
Publicar testimonios ficticios como si fueran reales es publicidad engañosa (Estatuto del Consumidor, Ley 1480 de 2011) y contradice el posicionamiento de "evidencia verificable". Propuesta: **eliminar la sección** hasta tener testimonios reales con autorización, y en su lugar usar **prueba verificable**: casos con datos (toneladas, tipo de estructura, ciudad), clientes autorizados y entregables. En Figma, si se deja un espacio para testimonios, irá rotulado como *placeholder* con texto de ejemplo evidente.

## 8. Selección de fotos (criterio: real, técnica, nítida, sin texto incrustado)

Nitidez medida con varianza del Laplaciano (imagen reescalada a 800 px); los valores son relativos entre fotos.

| Nivel | Foto | Contenido | Uso propuesto | Ajuste |
|---|---|---|---|---|
| **A** | 6 | Cimentación: formaleta y acero (horizontal, la más nítida) | **Hero** o banda de "obras en ejecución" | Recortar marca de fecha (esquina inferior derecha) |
| **A** | 15 | Ingeniero midiendo una fisura | Vulnerabilidad / patología | — |
| **A** | 16 | Inspección de columna en parqueadero | Vulnerabilidad / ensayos | — |
| **A** | 3 | Estructura metálica vista desde abajo | Diseño y cálculo / estructura metálica | — |
| **A** | 4 | Edificio con andamio en intervención | Reforzamiento | — |
| **A** | 5 | Casa en ladera en obra | Diseño estructural / proyectos | Recortar marca de fecha |
| B | 7 | Cimentación (otro ángulo) | Galería de obra | Recortar marca de fecha |
| B | 2 | Pórtico metálico en terraza | Galería / estructura metálica | — |
| B | 13 | Levantamiento en sitio | Metodología (paso "Levantamiento") | — |
| B | 18, 19 | Super Farma (fachada e interior) | Espacios comerciales | 19 recortar reflejos |
| B | 23 | Mobiliario de oficina a medida | Acabados y carpintería | — |
| B | 1 | Render de fachada | "Del render a la obra" | — |
| B | modelo 3D del PDF (portada) | Modelo ETABS con transparencia | Sección modelado / gráfico del hero | Extraer del PDF, no usar 11.jpeg (fondo de damero + logo de ETABS) |
| C | 12 | Estación total | Detalle pequeño | Poco nítida (186) |
| C | 21, 24 | Interiores | Solo si hace falta | 21: recortar cuadro religioso (hogar del cliente); 24: recortar cama y herramientas |
| ✗ | 8, 9, 10, 14 | Collages/flyer con texto | No usar | — |
| ✗ | 20, 22 | Interiores poco nítidos | No usar | — |
| ✗ | 27, 29 | Capturas de celular | No usar | — |
| ✗ | 28 | Marca de agua TikTok @apexfitout | **No usar (terceros)** | — |
| ✗ | 11, 25, 26 | Capturas de software | No usar | — |

## 9. Flujo de trabajo acordado
- Este chat = director/revisor. Claude Code genera un **plan por sesión** → Jordan lo trae aquí → revisión → corrección o aprobación → ejecución.
- Los commits los hace Jordan manualmente (aquí se le dan los comandos).
- Orden: (1) contexto y auditoría ✔ → (2) investigación de diseño (evitar estética genérica de IA) → (3) diseño en Figma (`Luxxor-Group`, archivo `7IEP7WM4lJvxi33qA0YIf0`) → (4) codificación por sesiones.
