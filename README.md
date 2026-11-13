# Luxxor Group — landing

Sitio de Luxxor Group (ingeniería estructural y vulnerabilidad sísmica, Cali): https://www.luxxor.com.co

Rediseño 2026 en curso en la rama `rediseno-2026`. El plan, las decisiones y el estado de cada sesión están en [`docs/plan-implementacion.md`](docs/plan-implementacion.md); las reglas para trabajar con Claude Code, en [`CLAUDE.md`](CLAUDE.md).

## Requisitos
- Node.js ≥ 20.9
- Variables de entorno: copiar `.env.example` a `.env.local` y completar las necesarias.

## Comandos
```bash
npm install
npm run dev        # desarrollo en http://localhost:3000
npm run lint
npm run typecheck
npm run build
npm start          # servidor de producción local
```

## Stack
Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Motion · despliegue en Vercel.
