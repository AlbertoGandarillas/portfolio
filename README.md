# Portafolio — Alberto Gandarillas

Portafolio personal construido con [Next.js](https://nextjs.org) (App Router),
[Tailwind CSS](https://tailwindcss.com) y [shadcn/ui](https://ui.shadcn.com).

> 🚧 Sitio en desarrollo.

## Stack

- **Next.js 16** (App Router + Turbopack)
- **React 19**
- **Tailwind CSS v4**
- **shadcn/ui** (estilo new-york, base neutral)
- **TypeScript**

## Desarrollo

Instala las dependencias y arranca el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — servidor de producción
- `npm run lint` — ESLint

## Estructura

```
app/                # Rutas y layout (App Router)
components/ui/      # Componentes de shadcn/ui
lib/utils.ts       # Helper `cn` para clases
components.json    # Configuración de shadcn/ui
```

## Agregar componentes de shadcn/ui

```bash
npx shadcn@latest add <componente>
```
