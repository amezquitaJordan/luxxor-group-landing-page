import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import ScrollFeatures from "@/components/ScrollFeatures";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

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
      </body>
    </html>
  );
}
