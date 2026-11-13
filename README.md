# Luxxor Group — landing

Sitio de Luxxor Group (ingeniería estructural y vulnerabilidad sísmica, Cali): https://www.luxxor.com.co

Rediseño 2026 en curso en la rama `rediseno-2026`. El plan, las decisiones y el estado de cada sesión están en [`docs/plan-implementacion.md`](docs/plan-implementacion.md); las reglas para trabajar con Claude Code, en [`CLAUDE.md`](CLAUDE.md).

## Requisitos
- Node.js 22 (ver `.nvmrc`; el sitio funciona con Node ≥ 20.9, las pruebas piden ≥ 22.12)
- Variables de entorno: copiar `.env.example` a `.env.local` y completar las necesarias.

## Comandos
```bash
npm install
npm run dev        # desarrollo en http://localhost:3000 (incluye la galería /desarrollo/componentes)
npm run lint
npm run typecheck
npm test           # pruebas unitarias (Vitest)
npm run build
npm start          # servidor de producción local
npm run test:e2e   # pruebas E2E y de accesibilidad (Playwright; la primera vez: npx playwright install chromium)
```

## Capturas visuales (Playwright)
Las capturas de referencia que se versionan son **solo las de Linux** (`*-linux.png`), para que coincidan en cualquier máquina y en CI. Las de Windows (`*-win32.png`) son locales y están en `.gitignore`.

Para generar o actualizar las de Linux:
1. En GitHub, pestaña **Actions** → workflow **«Capturas visuales (Linux)»** → **Run workflow**, sobre la rama de trabajo (p. ej. `rediseno-2026`). También desde la terminal:
   ```bash
   gh workflow run capturas.yml --ref rediseno-2026
   ```
2. Al terminar, descargar el artefacto **`capturas-linux`** desde el resumen de la ejecución (se guarda 7 días), o con:
   ```bash
   gh run download --name capturas-linux
   ```
3. Copiar el contenido del artefacto en la raíz del repositorio respetando sus rutas: los archivos van en `pruebas/e2e/__capturas__/<archivo de prueba>/…-linux.png`.
4. Revisar las imágenes y hacer commit.

En local (Windows), `npm run test:e2e:actualizar-local` regenera las capturas `-win32` para comparar.

## Stack
Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Motion · despliegue en Vercel.
