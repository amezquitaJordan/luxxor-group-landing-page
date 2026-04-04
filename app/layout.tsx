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
import { ThemeProvider } from "@/components/ThemeProvider";
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
 *  - Aplica las variables de fuentes (Tailwind) y usa variables del tema.
 *  - Integra ThemeProvider (Light/Dark Mode), ScrollFeatures (para smooth scroll nativo), MotionProvider (animaciones globales), y SpeedInsights (estadísticas de Vercel).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Script para prevenir el parpadeo de colores (FOUC) leyendo localStorage antes del renderizado
  const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans overflow-x-hidden`}>
        <ThemeProvider>
          <ScrollFeatures />
          <MotionProvider>
            {children}
          </MotionProvider>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
