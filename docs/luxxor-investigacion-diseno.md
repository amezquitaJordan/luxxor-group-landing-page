# Luxxor Group — Investigación de diseño y arquitectura técnica

> Fecha: 12-nov-2026 · Complementa `claude/luxxor-contexto-y-auditoria.md`.
> Convención: **[Hecho]** = verificado en fuente (ver §10) · **[Recomendación]** = criterio de diseño/ingeniería propio · **[Validar]** = requiere confirmación (dueño o ingeniero de Luxxor).

---

## 1. Qué hacen bien las mejores webs de ingeniería estructural

Revisión de un ranking 2026 de webs de firmas de ingeniería (Whitelam Media; ojo: es una agencia que vende diseño web, así que es una fuente con sesgo comercial) y de los sitios que cita:

| Firma | Qué copiar (patrón, no estética) |
|---|---|
| **sbp — Schlaich Bergermann Partner** (sbp.de) | Portada casi solo con fotos de estructuras terminadas, sin página de "valores". **La sobriedad es el mensaje.** |
| **LERA** (lera.com) | Proyectos e ingenieros visibles, casi sin copy publicitario. Tesis del artículo: *menos marketing = más autoridad*. |
| **MKA — Magnusson Klemencic** (mka.com) | Archivo de proyectos filtrable por tipología con datos útiles; la arquitectura de información es la ventaja. |
| **Thornton Tomasetti** (thorntontomasetti.com) | Superficie propia para su capacidad computacional (CORE Studio). Equivalente Luxxor: **modelado ETABS + ensayos**. |
| **HDR** (hdrinc.com) | Plantilla de proyecto con narrativa + datos (cronograma, equipo, resultados). |
| **Tyréns AKT (ex AKT II)** | Fotografía y tipografía cuidadas: se ve "del lado de los arquitectos". |

**Patrones que el artículo recomienda a firmas medianas** [Hecho, según la fuente]: fichas de proyecto con los datos que lee un comprador (alcance, plazo, equipo, marco normativo, resultado); secciones nombradas como las busca el cliente, no por organigrama; ingenieros con matrícula visibles; una tesis propia en lugar de una página de valores; más contenido técnico verificable y menos copy.

**Traducción a Luxxor** [Recomendación]:
- Tesis (ya existe en el portafolio): *"Sabemos cómo se comporta su edificación ante un sismo"* → "de la opinión al dato".
- Secciones por **tipo de cliente**: administración de P.H., empresas/industria, propietarios, sector público.
- Fichas de proyecto con datos reales: tipo de estructura, toneladas, ciudad, norma, entregables.
- Dirección técnica visible (Ing. Hugo Alberto Bohórquez; Arq. Emilio Ricaute) **[Validar matrícula profesional a mostrar]**.

---

## 2. Cómo no parecer "diseño genérico de IA"

Rasgos que hoy delatan una página generada por IA (guía de diseño frontend de Anthropic) y cómo los evitamos:

| Rasgo genérico | Estado en la landing actual | Decisión |
|---|---|---|
| Resaltar una sola palabra del titular en otro color ("Espacio en **Lujo**") | Sí, en casi todos los H2 | **Eliminar.** El titular trabaja completo. |
| Eyebrow en MAYÚSCULAS espaciadas sobre cada título ("NUESTROS SERVICIOS") | Sí, en todas las secciones | Solo donde informe algo (p. ej., la norma: "NSR-10 · Título A.10"). |
| Numeración 01/02/03 decorativa | Sí, en ventajas y comercial (no son secuencias) | **Solo en la metodología** (6 pasos) y en el proceso del peritaje: ahí sí hay secuencia. |
| Kit de tarjetas SaaS idénticas con la misma sombra y radio | Sí + "auras" doradas | Jerarquía real: un servicio principal grande, el resto secundario. Sin auras. |
| Fade-and-slide-up en cada sección | Sí (whileInView en todas) | **Un solo momento orquestado** (el 3D) + movimiento solo como respuesta a acciones. |
| Crema + serif display + acento cálido / negro + acento neón | Beige + Playfair + dorado (variante "lujo") | Paleta del logo (marino/acero/pizarra) sobre gris concreto; latón como detalle. |
| Flecha "→" en todos los botones, metadatos con "·" | Parcial | CTA que dice exactamente qué pasa: "Agendar visita técnica", "Descargar portafolio (PDF, 1,9 MB)". |

**Principio rector** [Recomendación]: *gastar la audacia en un solo lugar* → la sección 3D. Todo lo demás, silencioso y disciplinado, como una memoria de cálculo.

---

## 3. Dirección visual propuesta: "Memoria de cálculo"

### 3.1 Concepto
El lenguaje visual sale del **vernáculo del ingeniero estructural**, no del lujo:
- **Ejes estructurales** (A, B, C… / 1, 2, 3…) como retícula visible en el hero y en separadores: es literalmente cómo se nombra una estructura en planos.
- **Cotas** (líneas de dimensión con remates) como divisores entre secciones.
- **Gráficas técnicas reales** (deriva por piso vs. límite de norma, espectro de diseño) como ilustraciones, rotuladas "ilustrativo" igual que en el portafolio.
- **Fotografía de obra y ensayos** sin filtros de lujo: concreto, acero, instrumentos.
- El **latón** (dorado desaturado) aparece como lo haría un acento en un plano: líneas de cota, el estado activo, el dato clave. Nunca en superficies grandes.

### 3.2 Paleta (base: colores del logo y de las tarjetas)
| Token | Hex | Rol |
|---|---|---|
| `marino` | `#0B1B33` | Fondo modo oscuro, titulares en modo claro (≈ color del logotipo) |
| `acero` | `#1F4E80` | Enlaces, acento primario en modo claro (derivado del azul del logo) |
| `pizarra` | `#323A46` | Superficies en modo oscuro (≈ fondo de las tarjetas) |
| `concreto` | `#EEF0F2` | Fondo modo claro (gris frío, no crema) |
| `blanco` | `#FFFFFF` | Superficies en modo claro, texto en oscuro |
| `latón` | `#D2B572` (oscuro) / `#8F6F2E` (claro) | Detalles: cotas, estado activo, datos clave |

Contraste calculado (fórmula WCAG 2.x):
- Blanco sobre marino 17,2:1 · concreto sobre marino 15,1:1 · gris texto `#5A6472` sobre concreto 5,3:1 ✔
- Latón `#D2B572` sobre marino 8,7:1 y sobre pizarra 5,8:1 ✔ (sirve para texto en modo oscuro)
- Latón `#B8954A` sobre blanco **2,8:1 ✘** → en modo claro se usa `#8F6F2E` (4,7:1 sobre blanco, 4,1:1 sobre concreto): válido para líneas e íconos (≥3:1) y texto grande; para texto pequeño, `#7A5C22` (5,4:1 sobre concreto).

**[Validar]** Los hex de marino/acero son muestreos de un JPEG; cuando llegue el logo en vector se ajustan al valor exacto.

### 3.3 Tipografía
Abandonar Playfair Display (lujo editorial) e Inter (default). Dos opciones a explorar en Figma, ambas con licencia libre (SIL OFL) y disponibles en Google Fonts **[Validar disponibilidad al implementar]**:

- **Opción A — "Plano técnico":** *IBM Plex Sans* (texto) + *IBM Plex Sans Condensed* (titulares). Familia diseñada con herencia de ingeniería; cifras tabulares para datos.
- **Opción B — "Estructura":** *Archivo* (titulares, aprovechando su eje de ancho para titulares expandidos) + *IBM Plex Sans* (texto).

Escala tipográfica modular (razón 1,25), líneas de texto ≤ 70 caracteres, cifras tabulares en datos (toneladas, derivas, años).

### 3.4 Retícula y composición
- Escritorio 1440: 12 columnas, márgenes 80, medianil 24. Móvil 390: 4 columnas, márgenes 20.
- Texto alineado a la izquierda (lectura técnica); nada centrado salvo el CTA final.
- Esquinas: radio 2–4 px (precisión) y no uno igual para todo: tarjetas de proyecto 4, botones 2, chips 999.

### 3.5 Wireframe del hero (escritorio)
```
 A          B          C          D            ← ejes estructurales (finos, latón)
 ┊──────────┊──────────┊──────────┊─────────────┐
 │ LUXXOR GROUP          Servicios Proyectos Equipo Contacto  [Agendar visita]
 │                                                              │
 │ Sabemos cómo se comporta          ┌───────────────────────┐ │
 │ su edificación ante un sismo.     │  PÓRTICO 3D            │ │
 │                                   │  (R3F, gira con drag)  │ │
 │ Evaluación de vulnerabilidad      │  ▓ deriva por piso      │ │
 │ sísmica, diseño y reforzamiento   │  ── límite NSR-10      │ │
 │ estructural bajo NSR-10 en Cali.  └───────────────────────┘ │
 │                                                              │
 │ [Agendar visita técnica]  Descargar portafolio (PDF)        │
 │──────────────────────────────────────────────────────────────│
 │ NSR-10 · Ensayos ASTM · Modelado ETABS · +20 proyectos · 130 t│
 └──────────────────────────────────────────────────────────────┘
```
En móvil: titular → CTA → 3D en proporción 4:3 debajo (o imagen estática si el dispositivo es de gama baja / reduced motion).

---

## 4. Arquitectura de la landing (revisada)

| # | Sección | Contenido clave | Prueba / evidencia |
|---|---|---|---|
| 1 | Hero + 3D | Tesis, 2 CTA, banda de credenciales | Pórtico 3D con derivas |
| 2 | Servicios | Vulnerabilidad (principal, grande) + Modelado, Diseño y cálculo, Reforzamiento, Peritaje | Norma y entregables por servicio |
| 3 | Para quién | P.H., empresas/industria, propietarios, sector público | "Cuándo necesita un estudio" (del portafolio) |
| 4 | Metodología | 6 pasos (aquí sí numerados) | Fotos 13 (levantamiento), 15/16 (ensayos) |
| 5 | Ensayos en sitio | Núcleos, esclerometría, ultrasonido, escaneo de acero… | Normas ASTM citadas |
| 6 | Proyectos | Fichas con datos: Interplásticos 60 t, Yumbo 50 t, coliseos, casas en ladera | Fotos 3, 4, 5, 6 |
| 7 | Del render a la obra | Arquitectura + estructura + obra con un mismo equipo | Render 1 → foto real |
| 8 | Complementarios | Acabados, carpintería, comercial | Fotos 18, 19, 23 |
| 9 | Dirección técnica | Ingenieros y especialidad | [Validar fotos y matrículas] |
| 10 | Descargas | Portafolio 2026 y tarjeta (PDF) | Peso y fecha de cada archivo |
| 11 | Preguntas frecuentes + Asistente IA | FAQ técnico; botón al chatbot | — |
| 12 | Contacto | WhatsApp, correo, dirección, mapa, redes | Política de datos |

**Testimonios:** fuera hasta tener reales con autorización.

---

## 5. La sección 3D (profundización)

### 5.1 Qué contar con el 3D
No un objeto bonito que gira: **una explicación de lo que hace Luxxor**. Propuesta:

> **"Así se ve un estudio de vulnerabilidad."** Un pórtico de varios pisos (generado por código). Al hacer scroll o mover un control de "intensidad del sismo", la estructura se deforma según su primer modo de vibración (exagerado visualmente), y cada piso se colorea según su deriva frente al límite de la norma. Un segundo estado muestra la estructura **reforzada** (riostras/muros) y cómo bajan las derivas.

Esto replica, en interactivo, la gráfica "Derivas por piso (ilustrativo)" y el "Antes y después" del reforzamiento que ya están en el portafolio.

**[Validar con el ingeniero]**
- Que la visualización sea conceptualmente correcta y quede rotulada como **ilustrativa** (no es un resultado de análisis).
- El límite de deriva a mostrar (en NSR-10 depende del sistema estructural; tabla A.6.4-1).
- Que nadie la lea como diagnóstico de su edificio.

### 5.2 Opciones técnicas
| Opción | Cómo | Ventajas | Riesgos |
|---|---|---|---|
| **A. Pórtico procedural** (recomendada para el hero) | React Three Fiber; columnas y vigas con `InstancedMesh`; deformación por *shader* o por transformaciones por piso | No depende de archivos del cliente; muy liviana; control total del concepto | Requiere diseño cuidadoso para que se vea "ingeniería" y no "juguete" |
| **B. Modelo real de un proyecto** | ETABS → *Export > IFC* → conversión a GLB (IfcConvert, ifc-lite o Blender + Bonsai) → optimización con gltf-transform → `useGLTF` en R3F | Muestra un proyecto real de Luxxor (máxima credibilidad) | Requiere archivo y **autorización** del dueño/cliente; los IFC llevan propiedades/metadatos → exportar solo geometría |
| C. `<model-viewer>` (Google) | Web component para GLB | Simple, AR en móviles | Poca libertad para la narrativa de derivas |
| D. Spline | Editor visual 3D | Rápido de diseñar | Dependencia de terceros y runtime adicional |

**[Hecho]** ETABS exporta a IFC: el comando *File > Export > IFC File* genera entidades de columna, viga, riostra, losa y muro. Para la web, el IFC no se renderiza directo sin una librería pesada; lo usual es convertirlo a glTF/GLB.

**[Recomendación]** **A en el hero + B en la ficha de un proyecto** si el dueño entrega un modelo y autoriza publicarlo.

### 5.3 Reglas de rendimiento y accesibilidad para el 3D
- Carga diferida: `dynamic(() => import(...), { ssr: false })` + montar solo cuando la sección entra al viewport.
- `<Canvas frameloop="demand">` cuando la escena está quieta (renderiza solo al cambiar), `dpr={[1, 1.5]}`, `PerformanceMonitor`/`AdaptiveDpr` de drei para degradar en equipos débiles.
- **Imagen estática de respaldo** (render del mismo pórtico) para: `prefers-reduced-motion`, sin WebGL, móviles de gama baja y como placeholder mientras carga (sin CLS).
- Pausar el loop cuando la pestaña o la sección no están visibles.
- Controles accesibles: el control de "intensidad" es un `<input type="range">` real, con etiqueta y teclado; el canvas tiene una descripción textual equivalente.
- Versiones: React 19 ↔ `@react-three/fiber` v9 (la v8 es para React 18; no mezclar).

---

## 6. Animación

**[Recomendación]** Un solo sistema de animación para no duplicar peso:
- **Motion** (la librería actual, framer-motion v12): entradas/salidas de UI (modal del chat, menú móvil, burbuja de WhatsApp) y progreso de scroll (`useScroll`) que alimenta al 3D.
- **CSS** para hovers y estados simples.
- **GSAP** solo si la coreografía del 3D por scroll (pinning + scrub) lo exige. [Hecho] Desde la adquisición por Webflow, GSAP y todos sus plugins (ScrollTrigger, SplitText…) son gratuitos, incluso para uso comercial. Si se adopta, se retira Motion de esas partes para no cargar ambas.

Reglas:
1. Nada de animaciones infinitas de `box-shadow`, `filter` o `backdrop-filter` (repintan en cada frame). Solo `transform` y `opacity`.
2. `viewport={{ once: true }}` en todo lo que aparezca con el scroll.
3. Carruseles: sin autoplay infinito; si se usan, con pausa y controles, y los duplicados con `aria-hidden`.
4. `prefers-reduced-motion`: se respeta en Motion (`reducedMotion="user"`, ya está), en CSS y en el 3D.

---

## 7. Modo oscuro sin lentitud

Causa del problema actual: cientos de elementos con transiciones de color de 0,6–0,75 s que se disparan a la vez (ver auditoría §5.2).

**[Recomendación]**
1. Usar **next-themes**: inyecta un script bloqueante en el `<head>` (sin parpadeo), persiste la preferencia, respeta `prefers-color-scheme` y sincroniza entre pestañas. Con `disableTransitionOnChange` apaga todas las transiciones CSS durante el cambio → el cambio es instantáneo.
2. **Un solo sistema de tokens**: variables CSS en `@theme` de Tailwind v4 y `@custom-variant dark` sobre `[data-theme="dark"]`. Cero colores *hardcodeados* (`bg-[#FFFFFF]`) en componentes.
3. Opcional, como mejora progresiva: transición del tema con la **View Transitions API** (p. ej., un barrido circular desde el botón). [Hecho] Las transiciones en el mismo documento son *Baseline newly available* desde Firefox 144 (oct. 2025), con soporte en Chrome/Edge y Safari 18. Con fallback al cambio instantáneo y desactivada con `prefers-reduced-motion`.
4. Eliminar el `visibility:hidden` del `ThemeProvider` actual.
5. Imágenes: mismas fotos en ambos modos; en oscuro, bajar levemente la exposición de las fotos claras (no invertir).

---

## 8. Chatbot (se mantiene, se rehace)

**Stack** [Recomendación]: Vercel **AI SDK** (`ai`, `@ai-sdk/react`, `@ai-sdk/groq`) → `streamText` en el route handler + `useChat` en el cliente: respuestas en *streaming*, menos código propio y menos errores de estado.

**Seguridad** (corrige los hallazgos de la auditoría):
1. Validación del cuerpo con **zod**: máx. ~500 caracteres por mensaje, máx. 10 turnos, roles permitidos solo `user`/`assistant`.
2. **No confiar en los turnos `assistant` enviados por el cliente**: historial corto, y el *system prompt* reafirmado al final; las reglas de alcance se aplican también a la salida (respuesta fuera de tema → mensaje de redirección).
3. **Rate limit distribuido** con Upstash (`@upstash/ratelimit`, ventana deslizante) por IP, en el route handler (y opcionalmente uno global en `proxy.ts`). Tope de tokens por respuesta.
4. Verificar `Origin`/`Referer` contra `luxxor.com.co`.
5. *System prompt* nuevo: alcance = servicios del portafolio (vulnerabilidad, modelado, diseño, reforzamiento, peritaje, complementarios); base de conocimiento estática en el código (sin "Google Sheets"); `temperature` baja (≈0,2–0,3); nunca dar diagnósticos estructurales ni precios cerrados → derivar a visita técnica.
6. Cierre de conversación con un **componente** (botones WhatsApp/Instagram) activado por una señal estructurada, no por buscar un texto en la respuesta.
7. Aviso visible: "Asistente automático. No reemplaza una evaluación técnica." + enlace a la política de datos.
8. Transferencia a WhatsApp con mensaje prellenado (`wa.me/573170303333?text=...`).

---

## 9. Skills y repositorios para potenciar a Claude Code

> ⚠️ **Seguridad:** un skill son instrucciones (y a veces scripts) que el agente ejecuta con tus permisos → riesgo de cadena de suministro e inyección de instrucciones. **Leer el `SKILL.md` y los scripts antes de instalar**, preferir oficiales, fijar a un commit y versionarlos dentro del repo (`.claude/skills/`). Los mismos catálogos lo advierten.

### 9.1 Oficiales / de mantenedores (recomendados)
| Skill / repo | Para qué | Instalación |
|---|---|---|
| **frontend-design** (anthropics/skills) | Dirección visual distintiva; evita la estética genérica | `npx skills add anthropics/skills --skill frontend-design` |
| **Skills de Figma** (figma-use, figma-design-to-code, figma-generate-design) | Leer/escribir el archivo de Figma y pasar diseño → código | Vienen con el plugin/MCP oficial de Figma |
| **vercel-react-best-practices** (vercel-labs/agent-skills) | 70 reglas de rendimiento React/Next.js priorizadas por impacto | `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices` |
| **web-design-guidelines** (vercel-labs/agent-skills) | Auditoría de accesibilidad y diseño web | mismo repo |
| **vercel-react-view-transitions** (vercel-labs/agent-skills) | View Transitions en React (para el cambio de tema) | mismo repo |
| **gsap-skills** (greensock) | Solo si se adopta GSAP | `npx skills add greensock/gsap-skills` |

### 9.2 De terceros (revisar antes)
| Skill / repo | Para qué | Licencia |
|---|---|---|
| **impeccable** (pbakaus/impeccable) | Comandos `/impeccable audit` y `/impeccable critique` para revisar UI | Apache-2.0 |
| **ui-ux-pro-max-skill** (nextlevelbuilder) | Base de datos de estilos/patrones UI | MIT |
| **taste-skill** (Leonxlnx) | Criterio estético para frontends | revisar |
| **threejs-skills** (cloudai-x) → `threejs-react-three-fiber` | Patrones R3F v9 + drei 10 con React 19 | revisar |

### 9.3 Limpieza del repo
El repo actual trae `.agents/skills` con Stitch, Remotion, shadcn, etc. y configs de 6 herramientas de IA. **[Recomendación]** Dejar solo `.claude/skills/` con lo de 9.1 (y lo de 9.2 que pase revisión) + un `CLAUDE.md` del proyecto con: stack, tokens, reglas de esta investigación y la regla de "plan antes de ejecutar".

---

## 10. Presupuestos de calidad (para revisar cada plan de Claude Code)

- Core Web Vitals en móvil: LCP < 2,5 s, INP < 200 ms, CLS < 0,1.
- JS inicial sin el 3D: objetivo < 150 KB gz [Recomendación]; el 3D se carga aparte, bajo demanda.
- Imágenes: AVIF/WebP vía `next/image`; originales ≤ 400 KB en `public/` (redimensionar antes de commitear).
- Accesibilidad: WCAG 2.2 AA (contraste, foco visible, áreas táctiles ≥ 24×24 px, teclado, `aria` del modal).
- Lint y `tsc` sin errores; `npm audit` sin críticas ni altas en producción.

---

## 11. Responsive: que se vea bien en cualquier dispositivo

### 11.1 Qué dispositivos usa la gente en Colombia [Hecho — StatCounter, 2026]
| Dato | Valor |
|---|---|
| Móvil / Escritorio / Tablet (sep-2026) | **69,2 % / 30,4 % / 0,4 %** (en jun-2026: 73,8 % / 25,9 % / 0,3 %) |
| Navegadores (jun-2026, todas las plataformas) | Chrome for Android 66,1 % · Safari iPhone 8,9 % · Chrome escritorio (varias versiones) |
| Resoluciones móviles más comunes (jul-2026, px CSS) | 414×896 · 393×873 · 390×844 · 360×800 · 384×832 · 375×812 |
| Escritorio más comunes (sep-2026) | 1920×1080 · 1366×768 · 1536×864 |
| Tablet más comunes (jul-2026) | 768×1024 · 1280×800 · 800×1280 · 820×1180 |

**Cómo leerlo [Inferencia]:**
- El diseño debe nacer en **móvil Android con Chrome** (≈2 de cada 3 visitas), con iPhone/Safari como segundo caso crítico.
- **Tablet es marginal** (<0,4 %): se verifica, pero no se diseña aparte.
- **1366×768** es la trampa del escritorio: es ancho, pero tiene poca altura útil (≈620–650 px descontando la interfaz del navegador). El hero tiene que caber ahí.
- StatCounter mide la **población general**, no al cliente B2B de Luxxor (administradores de P.H., empresas), que podría usar más el escritorio. Ya está instalado `@vercel/speed-insights`: activar **Vercel Web Analytics** para medir la audiencia real y ajustar las prioridades.

### 11.2 Matriz de viewports de prueba
| Ancho × alto (px CSS) | Representa | Prioridad |
|---|---|---|
| **320 × 640** | Reflow WCAG 1.4.10 y zoom al 400 % | Obligatoria (accesibilidad) |
| **360 × 800** | Android de gama de entrada (el móvil común más angosto) | Alta |
| **390 × 844 / 393 × 873** | iPhone y Android modernos | Alta (frame base de Figma) |
| **414 × 896** | La resolución móvil más común | Alta |
| 844 × 390 | Móvil horizontal | Media |
| 768 × 1024 | Tablet vertical | Baja (solo verificar) |
| **1366 × 768** | Laptop de altura corta | Alta |
| **1440 × 900** | Escritorio de referencia (frame base de Figma) | Alta |
| 1920 × 1080 | Escritorio más común | Alta |
| 2560 × 1440 | Pantalla ancha: comprobar el ancho máximo | Media |

Además: zoom del navegador al 200 %, tamaño de letra del sistema aumentado, modo oscuro en cada caso, y el chat con el **teclado abierto**.

### 11.3 Decisiones técnicas
1. **Mobile-first** con los breakpoints por defecto de Tailwind v4, que están en `rem` (sm 40rem · md 48rem · lg 64rem · xl 80rem · 2xl 96rem). Los cortes los decide el contenido, no el dispositivo; si se agrega alguno, también en `rem`.
2. **Container queries** (nativas en Tailwind v4: `@container`, `@md:`) para los componentes que viven en contextos distintos: ficha de servicio, ficha de proyecto, paso de metodología. Las media queries quedan para el layout de página (columnas, navegación).
3. **Tipografía fluida con `clamp()`**, siempre con un componente en `rem`, p. ej. `clamp(2rem, 1.2rem + 3vw, 3.5rem)`. **Nunca** solo `vw`: el texto dejaría de crecer con el zoom (WCAG 1.4.4). Líneas de texto ≤ 70 caracteres en todos los anchos.
4. **Alturas:**
   - Hero con `min-height: 100vh` como respaldo y luego `min-height: 100svh`.
   - Las unidades `svh/lvh/dvh` funcionan en Chrome 108+, Firefox 101+ y Safari 15.4+. Hay tráfico con navegadores viejos (Chrome 118 de escritorio ≈1,9 % en Colombia), así que el respaldo en `vh` sí importa.
   - **No usar `dvh` en el hero**: cambia al aparecer/desaparecer la barra de direcciones y la página "salta".
   - Añadir `@media (max-height: 700px)` para compactar el hero en laptops 1366×768 y en móviles horizontales.
5. **Zonas seguras (notch y barra de gestos):** `viewport-fit=cover` en el `viewport` de Next.js + `env(safe-area-inset-*)` en el botón de WhatsApp, el header fijo y el campo del chat.
6. **No bloquear el zoom:** nada de `maximum-scale=1` ni `user-scalable=no` (incumple WCAG 1.4.4). Para evitar que iOS haga zoom al enfocar un campo, los inputs llevan **≥ 16 px** de tamaño de fuente.
7. **Teclado virtual en el chat:**
   - `interactive-widget=resizes-content` en la meta viewport hace que el layout se ajuste al teclado en Chrome 108+ y Firefox 132+. **Safari todavía no lo implementa** (bug de WebKit abierto).
   - Para iPhone: escuchar `window.visualViewport` (evento `resize`) y fijar la altura del panel del chat a la altura visible.
   - En móvil, el chat es una **hoja a pantalla completa**, no un modal flotante.
8. **Táctil vs. mouse:** en Tailwind v4, `hover:` solo se aplica en dispositivos con hover real. Ninguna información queda escondida detrás de un hover. Áreas táctiles: mínimo 24×24 px (WCAG 2.2 AA, criterio 2.5.8); objetivo de diseño 44–48 px, que es lo que piden las guías de iOS y Android.
9. **Imágenes:**
   - `sizes` correcto en cada `next/image` según el layout real.
   - **Dirección de arte** con `getImageProps()` + `<picture>`: foto horizontal en escritorio y recorte vertical en móvil.
   - Casi todas las fotos reales de Luxxor son **verticales** (2, 3, 4, 5, 12, 13, 15, 16): eso es una ventaja en móvil. Hero móvil candidato: la 4 o la 3. Hero de escritorio: la 6.
10. **Navegación móvil:** menú hamburguesa que abre un diálogo accesible (foco atrapado, cierre con Escape, `aria-expanded`), en lugar de la fila de enlaces de 10 px actual. El CTA "Agendar visita" siempre visible en el header.
11. **Botones flotantes:**
    - En móvil, **un solo botón** visible (WhatsApp) + acceso al asistente.
    - El selector de tema pasa al header o al menú.
    - "Volver arriba" solo en escritorio.
    - El botón se oculta cuando el CTA final o el footer están en pantalla, y cuando el teclado está abierto.
    - Padding inferior en la última sección para que nunca tape contenido.
12. **3D responsive:**
    - Lienzo 16:10 en escritorio y 4:3 en móvil.
    - `touch-action: pan-y` sobre el canvas, para que el dedo siga haciendo scroll vertical.
    - En móvil: sin zoom ni rotación libre; la interacción es el **control deslizante** de intensidad.
    - `dpr` máximo 1,5 en móvil.
    - Imagen estática en equipos de gama baja: heurística con `navigator.hardwareConcurrency` / `deviceMemory` + `PerformanceMonitor` de drei.
13. **Contenido que cambia de forma:**
    - Metodología: línea de tiempo horizontal en escritorio → lista vertical en móvil.
    - Banda de credenciales: fila en escritorio → cuadrícula 2×N en móvil.
    - Fichas de proyecto: cuadrícula → lista con scroll-snap horizontal y controles visibles.
14. **Pantallas anchas:** contenido limitado a ~1280–1440 px de ancho; los fondos y las fotos sí pueden ir a sangre completa.

### 11.4 Cómo se prueba (para cada plan de Claude Code)
- **Pruebas visuales automatizadas con Playwright:** capturas por cada viewport de la matriz 11.2, en claro y oscuro, comparadas contra la versión aprobada (regresión visual).
- **Lighthouse en modo móvil** y Core Web Vitals reales en Vercel Speed Insights.
- **Dispositivos reales mínimos:** un Android de gama media con Chrome y un iPhone con Safari. Según StatCounter, juntos cubren la gran mayoría del tráfico móvil del país.
- **Checklist manual:** zoom al 200 % · 320 px sin scroll horizontal · navegación solo con teclado · móvil horizontal · chat con teclado abierto en iPhone y Android · `prefers-reduced-motion` · modo oscuro.

### 11.5 Definición de "terminado" en responsive
- [ ] Cero scroll horizontal entre 320 y 2560 px.
- [ ] El hero cabe completo (titular + CTA) en 360×640 y en 1366×768.
- [ ] Ningún texto < 14 px en móvil (cuerpo ≥ 16 px); inputs ≥ 16 px.
- [ ] Áreas táctiles ≥ 24 px (objetivo 44 px) y separadas entre sí.
- [ ] Ningún elemento fijo tapa contenido ni el CTA principal.
- [ ] Imágenes con `sizes` correcto; el LCP del hero se precarga y no hay CLS.
- [ ] El chat es usable con el teclado abierto en iOS y Android.
- [ ] Capturas de Playwright aprobadas en toda la matriz, en claro y en oscuro.

---

## 12. Próximos pasos (Figma)

1. Página **"Fundamentos"**: variables de color (claro/oscuro), escala tipográfica fluida (opciones A y B, con valores mínimo y máximo), retícula 4/8/12 columnas, cotas y ejes como componentes.
2. Página **"Landing — Móvil"** (390, base) y **"Landing — Escritorio"** (1440), ambas en claro y oscuro; más frames de verificación en **360** (móvil angosto) y **1366×768** (laptop baja).
3. Frames del **concepto 3D** (estados: reposo, sismo, reforzada) + imagen de respaldo.
4. Componentes: botón, chip, ficha de proyecto, ficha de servicio, paso de metodología, burbuja WhatsApp, modal del chat.

---

## Fuentes
- [The 15 best engineering firm websites in 2026 — Whitelam Media](https://whitelam.media/insights/best-engineering-firm-websites-2026)
- [ETABS — Export options (CSI)](https://docs.csiamerica.com/help-files/etabs/Menus/File/Export/Export.htm)
- [IFC to glTF — explicación de la conversión](https://convert.guru/ifc-to-gltf)
- [ifc-lite (visor/convertidor IFC en navegador)](https://github.com/louistrue/ifc-lite)
- [React Three Fiber — Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [What's new in view transitions (2025) — Chrome for Developers](https://developer.chrome.com/blog/view-transitions-in-2025)
- [Same-document view transitions are Baseline newly available — web.dev](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [GSAP README (licencia gratuita)](https://cdn.jsdelivr.net/npm/gsap@3.15.0/README.md)
- [Groq + Vercel AI SDK](https://console.groq.com/docs/ai-sdk)
- [Upstash — Rate limiting Next.js](https://upstash.com/blog/nextjs-ratelimiting)
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- [anthropics/skills — frontend-design](https://github.com/anthropics/skills)
- [pbakaus/impeccable](https://github.com/pbakaus/impeccable)
- [Snyk — Top Claude skills for UI/UX](https://snyk.io/articles/top-claude-skills-ui-ux-engineers/)
- [StatCounter — Desktop vs Mobile vs Tablet vs Console, Colombia](https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet-console/colombia)
- [StatCounter — Mobile screen resolution, Colombia](https://gs.statcounter.com/screen-resolution-market-share/mobile/colombia)
- [StatCounter — Overall screen resolution, Colombia](https://gs.statcounter.com/screen-resolution-stats/overall/colombia)
- [StatCounter — Browser version market share, Colombia](https://gs.statcounter.com/browser-version-market-share/desktop-mobile-tablet/colombia)
- [Tailwind CSS — Responsive design / breakpoints](https://tailwindcss.com/docs/breakpoints)
- [web.dev — The large, small, and dynamic viewport units](https://web.dev/blog/viewport-units)
- [HTMHell — interactive-widget](https://htmhell.dev/adventcalendar/2024/4/)
- [WebKit Bug 259770 — interactive-widget](https://bugs.webkit.org/show_bug.cgi?id=259770)
- [Vercel Academy — Advanced image optimization (getImageProps)](https://vercel.com/academy/nextjs-foundations/advanced-image-optimization)
