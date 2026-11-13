import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ProveedorMovimiento } from "@/componentes/movimiento/ProveedorMovimiento";
import { BotonFlotanteWhatsApp } from "@/componentes/navegacion/BotonFlotanteWhatsApp";
import { ControladorBotonFlotante } from "@/componentes/navegacion/ControladorBotonFlotante";
import { Encabezado } from "@/componentes/navegacion/Encabezado";
import { ProveedorTema } from "@/componentes/tema/ProveedorTema";
import { sitio } from "@/config/sitio";
import { colorNavegador } from "@/config/tema";
import "./globals.css";

// Texto corrido (400 y 600 vienen en un solo archivo variable). Precargada.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

// Titulares (600): incluye el h1 del hero (LCP). Precargada.
const plexCondensada = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
  variable: "--font-plex-condensed",
});

// Cifras (texto-dato, 500): instancia separada y sin precarga.
const plexCondensadaDato = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  preload: false,
  variable: "--font-plex-condensed-dato",
});

// Anotaciones de plano: sin precarga.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-plex-mono",
});

const titulo = `${sitio.nombre} · ${sitio.lema}`;
const descripcion =
  "Evaluación de vulnerabilidad sísmica, diseño y reforzamiento estructural bajo la NSR-10, en Cali y el suroccidente colombiano.";

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: titulo,
  description: descripcion,
  // Página provisional durante el rediseño: no indexar. Se retira en la Sesión 8.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: colorNavegador.claro },
    { media: "(prefers-color-scheme: dark)", color: colorNavegador.oscuro },
  ],
};

const variablesFuentes = [plexSans, plexCondensada, plexCondensadaDato, plexMono]
  .map((fuente) => fuente.variable)
  .join(" ");

export default function DisenoRaiz({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: el script de next-themes fija data-theme y color-scheme antes de hidratar.
    <html lang={sitio.idioma} className={variablesFuentes} suppressHydrationWarning>
      <body className="antialiased">
        <ProveedorTema>
          <ProveedorMovimiento>
            <Encabezado />
            {children}
            <BotonFlotanteWhatsApp />
            <ControladorBotonFlotante />
          </ProveedorMovimiento>
        </ProveedorTema>
        <SpeedInsights />
      </body>
    </html>
  );
}
