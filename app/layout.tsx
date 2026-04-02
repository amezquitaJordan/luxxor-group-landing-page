/*
 * Archivo: app/layout.tsx
 * Propósito: Define el layout raíz de la aplicación web (Next.js App Router).
 * Controla la estructura base de HTML, inyecta fuentes, envuelve los componentes 
 * en proveedores globales (como MotionProvider) y configura los metadatos SEO.
 */
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import ScrollFeatures from "@/components/ScrollFeatures";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

/*
 * Configuración de metadatos globales para SEO y Open Graph.
 * Define la información que se mostrará al compartir enlaces en redes 
 * y en los resultados y pestañas del navegador.
 */
export const metadata: Metadata = {
  title: "Luxxor Group - Premium Services",
  description: "Servicios premium, bienes raíces, seguros y consultoría legal. Luxxor Group ofrece excelencia, exclusividad y rentabilidad.",
  icons: {
    icon: [
      { url: "/images/favicon-3-luxxor.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon-3-luxxor.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Luxxor Group - Premium Services",
    description: "Servicios premium, bienes raíces, seguros y consultoría legal en Cali, Colombia.",
    url: "https://luxxorgroup.com",
    siteName: "Luxxor Group",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxxor Group - Premium Services",
    description: "Servicios premium, bienes raíces, seguros y consultoría legal.",
  },
};

/*
 * Componente RootLayout
 * Función principal que envuelve todas las páginas de la aplicación.
 * Props:
 *  - children: Los componentes hijos que se renderizan dentro del body (las páginas).
 * Interacciones/Hooks:
 *  - Aplica las variables de fuentes (Tailwind) y clases globales (scroll-smooth, fondo oscuro).
 *  - Integra ScrollFeatures (para smooth scroll nativo), MotionProvider (animaciones globales), y SpeedInsights (estadísticas de Vercel).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-[var(--color-luxxor-dark)] text-white font-sans overflow-x-hidden`}>
        <ScrollFeatures />
        <MotionProvider>
          {children}
        </MotionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
