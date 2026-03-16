# Arquitectura Completa - Luxxor Landing Page

## Tecnologías Base
- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v3.4+
- **Animaciones:** Framer Motion
- **Linter:** ESLint

## Árbol de Carpetas y Archivos

```text
landing-page-luxxor/
├── app/
│   ├── layout.tsx              ← metadata SEO + layout base (+ fuentes)
│   ├── page.tsx                ← página principal con todas las secciones importadas
│   ├── globals.css             ← configuración global de Tailwind + variables de color Luxxor (#D4AF37, #121212)
│   └── favicon.ico             ← ícono de la página
├── components/
│   ├── ui/                     ← futuros componentes reutilizables (botones, tarjetas, etc.)
│   ├── Hero.tsx                ← primera vista con CTA principal
│   ├── WhyLuxxor.tsx           ← sección "Por qué elegirnos"
│   ├── Services.tsx            ← listado de servicios destacados
│   ├── Offers.tsx              ← promociones actuales y paquetes
│   ├── WhatsAppCTA.tsx         ← botón/banner fijo para contacto directo a WhatsApp
│   └── Footer.tsx              ← pie de página con enlaces y redes sociales
├── public/
│   ├── images/                 ← aquí irán las fotos de los folletos y activos visuales
│   ├── logo-luxxor.png         ← placeholder del logo de Luxxor Group
│   └── favicon.ico             ← ícono usado en la cabecera
├── lib/
│   └── utils.ts                ← funciones de utilidad generales y helper functions para clases (cn)
├── types/                      ← definiciones y tipos globales de TypeScript
├── .agents/                    ← orquesta de agentes y configuraciones del entorno (no se toca)
├── .eslintrc.json              ← reglas globales de linting para mantener calidad
├── next.config.mjs             ← configuración del empaquetador Next.js
├── tailwind.config.ts          ← configuración del tema con colores Luxxor (#D4AF37, #121212)
├── tsconfig.json               ← configuración del compilador de TypeScript
├── package.json                ← listado de dependencias (Framer Motion, lucide-react, etc.) e información del proyecto
├── README.md                   ← guía general del proyecto
└── .gitignore                  ← reglas para ignorar archivos en el control de versiones Git
```

## Explicación de la Arquitectura
- **`app/`**: Contiene la capa de enrutamiento principal. Configura el cascarón (layout) principal para SEO y estilos globales.
- **`components/`**: Los fragmentos visuales modulares. La landing al ser one-page los organiza por secciones (Hero, Services, etc.) con una subcarpeta `ui/` para átomos y moléculas del diseño.
- **`public/`**: Assets estáticos de imagen que no se procesan en la canalización habitual de Next.js, listos para servir.
- **`lib/` y `types/`**: Contienen lógica compartida y definciones de modelos de datos, garantizando una base robusta y tipada en la aplicación.
