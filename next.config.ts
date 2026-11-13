import type { NextConfig } from "next";

// La galería de componentes (app/desarrollo/componentes/page.dev.tsx) solo se compila en desarrollo
// o con GALERIA_COMPONENTES=1 (pruebas visuales). En un build normal la ruta no existe.
const incluirGaleria =
  process.env.NODE_ENV === "development" || process.env.GALERIA_COMPONENTES === "1";

const configuracion: NextConfig = {
  poweredByHeader: false,
  pageExtensions: incluirGaleria ? ["dev.tsx", "tsx", "ts"] : ["tsx", "ts"],
  images: {
    qualities: [75],
  },
  // La redirección luxxor.com.co → www.luxxor.com.co la hace Vercel (Domains).
};

export default configuracion;
