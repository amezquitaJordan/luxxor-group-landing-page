import type { NextConfig } from "next";

const configuracion: NextConfig = {
  poweredByHeader: false,
  images: {
    qualities: [75],
  },
  // La redirección luxxor.com.co → www.luxxor.com.co la hace Vercel (Domains).
};

export default configuracion;
