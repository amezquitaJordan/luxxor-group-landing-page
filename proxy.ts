import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// --- MEJORA DE SEGURIDAD: PROXY GLOBAL (Anteriormente Middleware) ---
// Este proxy se ejecuta en el backend intermedio antes de responder al cliente.
// Aquí centralizamos la inyección de "Security Headers" para proteger toda la aplicación
// contra ataques XSS, Clickjacking, MIME type sniffing y exposición de información.

export function proxy(request: NextRequest) {
  // Inicializamos la respuesta subyacente para poder inyectarle cabeceras
  const response = NextResponse.next();

  // 1. CONTENT-SECURITY-POLICY (CSP)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://s.ytimg.com https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://images.unsplash.com https://img.youtube.com https://i.ytimg.com https://raw.githubusercontent.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com;
    frame-src 'self' https://www.youtube.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  // Limpiamos los saltos de línea para inyectar como una cabecera válida en una sola línea
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  // 2. INYECCIÓN DE CABECERAS HTTP SEGURAS

  // Establece nuestra CSP calculada
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

  // X-Frame-Options: Previene ataques de Clickjacking prohibiendo que el sitio
  // se incruste dentro de iframes de atacantes ('DENY').
  response.headers.set('X-Frame-Options', 'DENY');

  // X-Content-Type-Options: Previene "MIME-sniffing exploits". 
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Referrer-Policy: Protege privacidad asegurando que el sitio no filtre 
  // datos del path al navegar a sitios externos.
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions-Policy: Restringe a gran escala el acceso a APIs.
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()');

  return response;
}

// Configuración de alcance (Matcher):
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
