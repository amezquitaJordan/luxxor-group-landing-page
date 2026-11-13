import { NextResponse } from "next/server";

// Cabeceras de seguridad para todas las respuestas.
// CSP provisional (Sesión 1): sin nonce. En la Sesión 8 se reemplaza por una CSP con
// nonce + 'strict-dynamic' y se elimina 'unsafe-inline' de script-src.

const esDesarrollo = process.env.NODE_ENV === "development";

function construirCsp(): string {
  const directivas: Record<string, string[]> = {
    "default-src": ["'self'"],
    // 'unsafe-inline' es provisional: sin nonce, los scripts inline del App Router no cargan.
    // 'unsafe-eval' y el script de depuración de Speed Insights solo en desarrollo.
    "script-src": esDesarrollo
      ? ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://va.vercel-scripts.com"]
      : ["'self'", "'unsafe-inline'"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": esDesarrollo
      ? ["'self'", "https://vitals.vercel-insights.com", "https://va.vercel-scripts.com"]
      : ["'self'", "https://vitals.vercel-insights.com"],
    "frame-src": ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
  };

  const politica = Object.entries(directivas).map(
    ([directiva, fuentes]) => `${directiva} ${fuentes.join(" ")}`
  );
  politica.push("upgrade-insecure-requests");
  return politica.join("; ");
}

const politicaSeguridad = construirCsp();

export function proxy() {
  const respuesta = NextResponse.next();

  respuesta.headers.set("Content-Security-Policy", politicaSeguridad);
  // HSTS sin preload: el dominio no está en la lista de precarga.
  respuesta.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
  respuesta.headers.set("X-Content-Type-Options", "nosniff");
  respuesta.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  respuesta.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );
  respuesta.headers.set("X-Frame-Options", "DENY");
  respuesta.headers.set("Cross-Origin-Opener-Policy", "same-origin");

  return respuesta;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
