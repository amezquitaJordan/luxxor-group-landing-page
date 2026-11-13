import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { sitio } from "@/config/sitio";
import "./globals.css";

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

export default function DisenoRaiz({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={sitio.idioma}>
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
