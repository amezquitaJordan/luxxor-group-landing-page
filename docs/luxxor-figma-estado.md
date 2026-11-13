# Luxxor — Estado del diseño en Figma (12-nov-2026)

Archivo: https://www.figma.com/design/7IEP7WM4lJvxi33qA0YIf0/Luxxor-Group

## Páginas
| Página | Contenido | Estado |
|---|---|---|
| 00 · Portada | Índice y estado | Listo |
| 01 · Fundamentos | Color claro/oscuro con contrastes, tipografía (opción A elegida), escala fluida, retícula 4/8/12, espacio, radios, ejes y cotas | Listo |
| 02 · Componentes | Botón (tipo × estado), WhatsApp, chip, dato, eje, cota, ficha de servicio (principal/secundaria), ficha de proyecto, paso de metodología, encabezado (escritorio/móvil), botón flotante, Lienzo 3D (estado × tamaño: escritorio/compacto/móvil), Botón de tema (Claro=luna / Oscuro=sol), Selector de tema (Activo=Claro/Oscuro/Sistema), Menú móvil (abierto), Chat: burbuja (Asistente/Usuario), sugerencia, escribiendo, aviso (Límite/Error), campo de mensaje (Vacío/Con texto/Esperando), encabezado (Pantalla completa/Panel) | Listo |
| 03 · Landing — Móvil | 390 px, claro y oscuro + menú abierto claro y oscuro | Listo |
| 04 · Landing — Escritorio | 1440 px, claro y oscuro | Listo |
| 05 · Concepto 3D | Estados + especificación R3F | Listo · validar con el ingeniero |
| 06 · Verificación responsive | Primer pantallazo en 360×800, 390×844, 1366×768, 1440×900, menú abierto 360×800 + checklist | Listo |
| 07 · Recursos | Fotos del cliente por nivel (A/B/C/no usar) | Listo |
| 08 · Asistente (chat) | Móvil 390×844: bienvenida, conversación, fuera de alcance + límite, teclado abierto (claro) y bienvenida/conversación (oscuro). Escritorio 1440×900: panel 400×680 sobre la landing (claro/oscuro). Especificación de comportamiento | Listo |

## Decisiones de diseño
- Tipografía: **IBM Plex Sans Condensed** (titulares) + **IBM Plex Sans** (texto) + IBM Plex Mono (solo anotaciones de plano).
- Paleta: colores del logo (marino #0B1B33, acero #1F4E80, pizarra #323A46) sobre gris concreto #EEF0F2; latón solo como detalle (#8F6F2E claro / #D2B572 oscuro).
- Botón WhatsApp con texto/ícono marino (blanco sobre #25D366 no cumple contraste).
- Tema: botón siempre visible en el encabezado (también en móvil, 44 px); luna en claro, sol en oscuro; el menú móvil incluye «Apariencia» Claro/Oscuro/Sistema.
- Encabezado móvil: logo · tema · Agendar · menú (cabe en 360 px).
- Menú móvil: diálogo a pantalla completa (foco atrapado, Escape, bloqueo de scroll, cierra al tocar un enlace; oculta el botón flotante).
- Chat: se presenta como «Asistente de Luxxor — respuestas automáticas» (ya no «Lia» con punto verde «En línea»). Aviso permanente: puede equivocarse y no reemplaza una evaluación técnica. Nunca diagnostica una edificación ni da precios cerrados; deriva a visita técnica y ofrece WhatsApp. Móvil: pantalla completa; escritorio: panel no modal 400×680 abajo a la derecha. Entrada: «Preguntar al asistente» en Preguntas frecuentes. Mientras el chat está abierto se oculta el botón flotante.
- Testimonios: eliminados (eran inventados).
- Fichas de proyecto sin foto hasta confirmar con el cliente qué foto corresponde a cada obra.

## Tokens (variables Figma → CSS)
- Colecciones: `Primitivos` (oculta), `Color` (modos Claro/Oscuro), `Espacio`, `Radio`.
- Nombres CSS: `var(--color-fondo-base)`, `var(--color-texto-primario)`, `var(--color-detalle-laton)`, `var(--color-grafico-excede)`, `var(--esp-espacio-4)`, `var(--rad-radio-md)`, etc.
- Estilos de texto: `Móvil/*` y `Escritorio/*` → display, h1, h2, h3, cuerpo-lg, cuerpo, cuerpo-fuerte, pequeño, dato, boton, anotacion. En código: un solo token fluido con `clamp()` por estilo.

## Pendientes
1. Logo en vector (el del encabezado es provisional, texto).
2. Fotos originales en alta resolución.
3. Fotos de proyectos: están en el portafolio PDF (pág. 7); asignar solo con confirmación.
4. Validación del concepto 3D por el ingeniero (mensaje y límite de deriva).
5. Para código: ocultar el botón flotante con el lienzo 3D en pantalla (móvil), con el menú abierto y con el chat abierto; pruebas de 320 px/zoom 200 %, teclado en el chat (iOS con visualViewport) y Playwright por viewport.
