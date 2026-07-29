# Design — Sistema Bauhaus extendido + arquitectura del portafolio

Depende de: `requirements.md` (fuente de verdad de contenido y alcance)

## 1. Arquitectura de la información

Single-page scroll con anclas semánticas (mejor para SEO, para compartir un enlace directo
a una sección, y para el índice de navegación tipo catálogo — ver §4.0). Rutas ancla:

```
/                    → Hero
/#sobre-mi           → Manifiesto / Sobre mí
/#trayectoria        → Timeline de experiencia
/#stack              → Herramientas y tecnologías
/#reconocimientos    → Highlights / logros
/#formacion          → Educación e idiomas
/#contacto           → CTA de contacto + footer
```

Cada sección es un componente de servidor (`app/page.tsx` los compone), con islas de
cliente solo donde hay interacción/animación (patrón ya usado por `BauhausBackground`).

## 2. Sistema de diseño — extensión de lo ya existente

### 2.1 Paleta (sin cambios, disciplina estricta de 4 colores + neutros)
Ya definida en `app/globals.css` / `bauhaus-background.tsx`:

| Token | Valor | Uso |
|---|---|---|
| `--bauhaus-red` | `#e2361f` (bermellón) | acentos, CTA, sección Contacto |
| `--bauhaus-blue` | `#1f4ea1` (cobalto) | acentos, sección Formación |
| `--bauhaus-navy` | `#14224c` | acentos oscuros, sección Sobre mí |
| `--bauhaus-yellow` | `#f2b417` (dorado) | acentos, sección Reconocimientos |
| `--background` | `oklch(0.972 0.008 83)` (papel crema) | fondo base |
| `--foreground` / `ink` | `#161311` | texto, líneas |

**Regla:** ninguna sección introduce un color nuevo. La identidad Bauhaus se sostiene
precisamente por la restricción de paleta; cada sección solo cambia **qué color domina**
(ver §4).

### 2.2 Tipografía (sin cambios, ya en producción)
- `font-display` (Archivo Black) — titulares, nombre, números de sección.
- `font-sans` (Inter) — cuerpo de texto.
- `font-mono` (Space Mono) — labels, fechas, metadatos, badges, índice de navegación.

**Extensión necesaria:** escala tipográfica formal para las nuevas secciones (hoy solo
existe para el hero). Definir en `globals.css` bajo `@theme inline` o usar utilidades
Tailwind consistentes:

| Rol | Clase sugerida |
|---|---|
| H1 (hero, nombre) | `font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.9]` (ya existe) |
| H2 (título de sección) | `font-display text-3xl sm:text-4xl uppercase tracking-tight leading-[0.95]` |
| H3 (rol/empresa en timeline, título de tile) | `font-sans text-xl font-bold tracking-tight` |
| Body | `font-sans text-base sm:text-lg leading-relaxed` |
| Label/meta | `font-mono text-xs uppercase tracking-widest` |
| Número de índice ("01", "02"...) | `font-display text-sm` |

### 2.3 Grid y espaciado
- Contenedor de contenido: `max-w-3xl` para texto de lectura (Sobre mí), `max-w-5xl` para
  timeline/stack/highlights (permiten 2–3 columnas).
- Ritmo vertical entre secciones: `py-24 sm:py-32` — respiración generosa, propia de un
  cartel Bauhaus (mucho espacio negativo/blanco es parte del lenguaje, no solo relleno).
- Alinear los bloques de texto a un **grid de 12 columnas invisible** compartido con las
  formas del fondo, para que texto y geometría se sientan diseñados juntos (no texto
  flotando sobre decoración desconectada).

## 3. Sistema de movimiento

### 3.1 Principios
1. Todo movimiento tiene una razón: guiar el ojo, indicar jerarquía o dar feedback. Nada
   de motion puramente decorativo sin propósito de lectura.
2. Reutilizar el lenguaje de easing ya establecido en `bauhaus-background.tsx`
   (`easeInOut` cúbico, giros "mecánicos" a pasos) — no mezclar con springs/bounces que
   rompan el carácter geométrico/preciso del Bauhaus.
3. `prefers-reduced-motion: reduce` → **todo** scroll-reveal se reemplaza por contenido ya
   visible sin transición (mismo patrón que ya existe en el componente actual).

### 3.2 Catálogo de interacciones

| Interacción | Dónde | Comportamiento |
|---|---|---|
| Scroll-reveal | Entrada de cada sección | Fade + slide-up sutil (`translateY(16px)→0`, 500ms, `ease-out`), disparado una vez vía `IntersectionObserver` al 20% de visibilidad. |
| Stagger de lista | Timeline, Stack, Highlights | Hijos entran con `50–80ms` de retraso entre sí, máximo 8 elementos (no genera espera larga). |
| Hover en tarjeta | Timeline item, Highlight tile | Cambio de color de acento del borde/ícono (usar el color asignado a la sección), sin mover el layout (`transform: scale` leve, no `margin`/`height`). |
| Progreso de sección | Índice fijo lateral (§4.0) | El número/label de la sección activa se resalta en `ink` sólido; el resto en `ink/40`. |
| Hero | Ya implementado | Loop continuo + parallax de puntero — se mantiene igual. |
| Pausa fuera de viewport | Canvas del hero | Si el hero sale del viewport (scroll profundo), pausar el loop de render (ya existe la lógica de `visibilitychange`; extender con `IntersectionObserver` sobre el propio contenedor del canvas para ahorrar batería/CPU en scroll largo). |

### 3.3 Componente reutilizable
Especificar un hook `useInViewAnimation` (o similar) en `lib/` que encapsule el
`IntersectionObserver` + el chequeo de `prefers-reduced-motion`, para no repetir esa
lógica en cada sección. Un solo lugar de verdad para el comportamiento de HU-7.

## 4. Especificación por sección

### 4.0 Índice de navegación (nuevo componente global)
Un índice fijo, minimalista, estilo catálogo de exposición — no una navbar convencional.

- **Desktop:** columna fija en el borde derecho (o izquierdo) de la pantalla, `font-mono`,
  lista los 6 anclas como `01 SOBRE MÍ`, `02 TRAYECTORIA`, etc. Click hace scroll suave.
  El item activo se marca (ver §3.2).
- **Mobile:** colapsa a un indicador de progreso delgado (barra superior con marcas por
  sección) + un botón flotante "menú" que despliega la misma lista en overlay a pantalla
  completa (con las formas Bauhaus de fondo, coherente con el resto).
- Accesible: `<nav aria-label="Secciones">`, cada link con `aria-current="true"` en la
  sección activa.

### 4.1 Hero (`app/page.tsx`, ya existe — refinar, no rehacer)
- Mantener: `BauhausBackground`, nombre en Archivo Black, badge "En desarrollo".
- **Cambio de contenido:** el badge "En desarrollo" se reemplaza por el titular real
  (§2.1 de requirements): *"Senior Full-Stack Developer — React · Next.js · IA"* en
  `font-mono uppercase tracking-widest`, mismo tratamiento visual que el badge actual
  (rounded-none, borde sutil) pero como texto informativo, no placeholder.
- CTA primario: "Ver trayectoria" (scroll a `#trayectoria`) + CTA secundario "Contactar"
  (mismo tratamiento de botón ya existente).
- **Gap técnico a resolver:** la composición de `bauhaus-background.tsx` usa coordenadas
  fijas de mundo (`x: -6.4`, etc.) pensadas para aspect ratio de escritorio. En viewports
  angostos (< 640px) varias formas terminan fuera de cuadro o amontonadas. Se requiere un
  segundo set de posiciones (o un factor de escala/reflow) activado por `aspect ratio` o
  `window.innerWidth`, no solo pixel ratio.

### 4.2 Sobre mí / Manifiesto
- Layout: texto centrado o alineado a la izquierda, `max-w-3xl`, sobre fondo con **una
  sola forma Bauhaus grande y quieta** (o de movimiento muy lento) en navy — no compite
  con la lectura.
- Contenido: versión editada (no traducción literal) del resumen de §2.2 de
  requirements.md, dividida en 2 párrafos cortos:
  1. Qué hace hoy (full-stack, React/Next.js/C#, IA como acelerador, MVPs).
  2. De dónde viene (arco narrativo de §2.8: 30 años en TI, evolución desde sistemas
     enterprise/telecom hasta desarrollo moderno potenciado por IA).
- Un **pull-quote** tipográfico grande (`font-display`, 1 línea corta) puede anclar la
  sección, ej. una síntesis de una frase — a redactar junto con Alberto, no inventar cita.

### 4.3 Trayectoria (Timeline)
- Componente: riel vertical (línea `ink`, como las "circuit lines" del hero) con un nodo
  geométrico por experiencia (círculo/triángulo/cuadrado alternando, coloreado con la
  paleta en rotación fija: red→blue→yellow→navy→red...).
- Cada nodo abre una tarjeta con: empresa (H3), rol, **rango de fechas calculado en
  runtime** (no strings hardcodeados — ver §5, campo `start`/`end` tipados como fecha),
  ubicación, bullets (máx. 3 visibles, resto en "ver más" si aplica).
- **Roles concurrentes (2011–presente):** Info Tech Partners e Hildebrando se renderizan
  como dos tarjetas conectadas por un mismo nodo/bracket en el riel (mismo punto de
  partida visual), no como dos entradas independientes que parezcan duplicadas — resuelve
  HU-3 y la decisión D4 con la opción recomendada.
- El item más reciente lleva un indicador "Presente" (`font-mono`, color de acento
  pulsante sutil — reusar el patrón de "halo" del punto de dato viajero del hero).
- Responsive: en mobile el riel se pega al borde izquierdo, tarjetas a ancho completo.

### 4.4 Stack & Herramientas
- Grid de "chips"/tiles agrupados por categoría (Frontend, Plataforma & DevOps,
  Flujo de trabajo con IA), estilo tablero de color Bauhaus: cada categoría tiene un color
  de fondo de acento distinto, los ítems dentro son texto `font-mono uppercase` sobre esa
  base.
- Contenido (trazable a requirements §2.3 y bullets de experiencia):
  - **Frontend:** React.js, Next.js, Tailwind CSS
  - **Plataforma & DevOps:** C#, Azure DevOps, Vercel, CI/CD
  - **Flujo con IA:** Claude, Cursor AI
- No se listan tecnologías no mencionadas en el LinkedIn (p. ej. no inventar "Node.js",
  "PostgreSQL", etc. si no están documentadas).

### 4.5 Reconocimientos / Highlights
- 3–4 tiles grandes tipo "estadística de cartel" (número o ícono grande en `font-display`
  + label en mono), composición asimétrica tipo grid Bauhaus (no todos los tiles del mismo
  tamaño):
  1. **+15 AÑOS** — desarrollo full-stack moderno
  2. **TOP IT 2003** — IT/USERS Awards, mejor producto en gestión empresarial (AT&T Perú)
  3. **BBVA Continental & Claro Perú** — diseño de interfaces (Hildebrando Perú)
  4. **~30 años en TI** — desde 1996, arco completo de la carrera
- Cada tile usa un color de acento distinto de la paleta (rotación fija, no aleatoria).

### 4.6 Formación & Idiomas
- Bloque compacto de dos columnas (desktop) / apiladas (mobile):
  - **Educación:** Universidad San Ignacio de Loyola — Ingeniería en Sistemas de
    Información (1995–1998).
  - **Idiomas:** Inglés, Portugués (+ Español si se confirma D2).
  - **Certificación:** Desarrollo Web Fullstack (con nota "institución/año a confirmar"
    si D3 queda sin resolver — no se debe inventar el dato para "completar" visualmente).

### 4.7 Contacto / Footer
- CTA repetido a pantalla completa o casi (`font-display` grande: "HABLEMOS" o similar),
  con los tres canales ya operativos: email (`hola@albertogandarillas.com` salvo cambio
  por D1), GitHub, LinkedIn — mismos componentes `Button`/iconos ya implementados en el
  hero actual, reutilizados aquí (no duplicar código: extraer a un componente
  `ContactLinks` compartido entre Hero y Footer si el hero mantiene sus propios CTAs, o
  centralizar el CTA de contacto solo en esta sección final y dejar el hero con scroll-to
  únicamente — **decisión de implementación libre para Cursor**, ambas cumplen la spec).
- Copyright dinámico (ya existe: `{new Date().getFullYear()}`).

## 5. Modelo de contenido (contrato tipado)

Todo el contenido de §2 de `requirements.md` debe vivir en un módulo de datos separado de
los componentes — **no hardcodeado en JSX**. Ubicación sugerida: `content/profile.ts`.

```ts
// content/profile.ts — contrato de referencia (no implementar aún, ver tasks.md)

export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  start: string; // ISO "YYYY-MM"
  end: string | "present";
  bullets: string[];
  concurrentGroup?: string; // id compartido para roles paralelos (p. ej. "2011")
}

export interface EducationEntry {
  school: string;
  degree: string;
  start: string; // ISO "YYYY"
  end: string;   // ISO "YYYY"
}

export interface Highlight {
  label: string;   // "+15 AÑOS" / "TOP IT 2003"
  detail: string;  // descripción corta
  accent: "red" | "blue" | "yellow" | "navy";
}

export const profile = {
  name: "Alberto Gandarillas",
  headline: "Senior Full-Stack Developer",
  headlineTags: ["React", "Next.js", "C#", "AI-Enhanced Development"],
  location: "Perú",
  email: "hola@albertogandarillas.com", // pendiente confirmar D1
  links: {
    github: "https://github.com/AlbertoGandarillas",
    linkedin: "https://pe.linkedin.com/in/alberto-gandarillas-40089360",
  },
  summary: {
    // copy editorial derivado de requirements.md §2.2, redactado en design.md §4.2
    today: "…",
    origin: "…",
  },
  skills: {
    frontend: ["React.js", "Next.js", "Tailwind CSS"],
    platform: ["C#", "Azure DevOps", "Vercel", "CI/CD"],
    ai: ["Claude", "Cursor AI"],
  },
  experience: [/* 8 entradas, ver requirements.md §2.6 */] satisfies ExperienceEntry[],
  education: [/* 1 entrada, ver requirements.md §2.7 */] satisfies EducationEntry[],
  languages: ["Inglés", "Portugués"], // + "Español" si D2 = sí
  certifications: ["Desarrollo Web Fullstack"],
  highlights: [/* 3-4 entradas, ver §4.5 */] satisfies Highlight[],
} as const;
```

**Por qué:** (a) separa datos de presentación → actualizar LinkedIn en el futuro es editar
un archivo, no buscar strings en JSX; (b) permite calcular fechas/duraciones en runtime
(cumple HU-3, evita strings tipo "15 years 4 months" que quedan obsoletos); (c) es el
contrato exacto que Cursor debe implementar en `tasks.md`.

## 6. Inventario de componentes

| Componente | Estado | Notas |
|---|---|---|
| `BauhausBackground` | Existe, reutilizar | Motor del hero; posible variante ligera (`BauhausBackground variant="ambient"`) para secciones no-hero, con menos formas y opacidad reducida, mismo vocabulario. |
| `Button`, `Badge` (shadcn) | Existen, no tocar | Seguir extendiendo por `className` (patrón `rounded-none`, `font-mono uppercase tracking-widest` ya establecido). |
| `SectionHeading` | Nuevo | H2 + número de índice (`01`, `02`...) + línea divisoria geométrica. |
| `TimelineItem` | Nuevo | Nodo + tarjeta, soporta `concurrentGroup`. |
| `SkillGrid` / `SkillCategory` | Nuevo | Grid de chips agrupados. |
| `HighlightTile` | Nuevo | Tile de estadística/logro. |
| `SectionIndexNav` | Nuevo | Índice fijo lateral + variante mobile. |
| `ContactLinks` | Nuevo (extraído) | Email/GitHub/LinkedIn reutilizado en Hero y Footer. |
| `useInViewAnimation` | Nuevo (hook) | Scroll-reveal + respeto a `prefers-reduced-motion`. |

## 7. Accesibilidad

- Estructura semántica: `<main>`, una sección `<section aria-labelledby="...">` por bloque,
  encabezados en orden jerárquico (H1 único en hero, H2 por sección).
- Skip link "Saltar al contenido" antes del índice de navegación.
- Foco visible (`focus-visible`) en todos los links/botones, incluidos los del índice.
- Contraste: todo texto sobre el fondo animado debe pasar AA (4.5:1 texto normal, 3:1
  texto grande) — validar con la viñeta ya usada en el hero, replicar el patrón en
  secciones con fondo Bauhaus activo.
- `aria-hidden` en todas las formas decorativas (ya es el patrón en `BauhausBackground`).
- Navegación 100% operable por teclado (índice, CTAs, links del footer).

## 8. Rendimiento y SEO

- **Rendimiento:** un solo canvas Three.js activo (el del hero); las demás secciones usan
  SVG/CSS estático o animaciones CSS/transform ligeras — no instanciar múltiples escenas
  WebGL.
- **Metadata:** `app/layout.tsx` — `title`, `description`, Open Graph (`og:title`,
  `og:description`, `og:image` generado con `next/og` usando paleta+tipografía Bauhaus),
  Twitter card.
- **Structured data:** JSON-LD `Person` en el `<head>` con `name`, `jobTitle`, `worksFor`,
  `alumniOf`, `sameAs` (LinkedIn, GitHub) — mapeado 1:1 a `content/profile.ts`.
- `sitemap.xml` y `robots.txt` (convención de archivo de Next.js App Router).

## 9. Estrategia responsive

- Mobile-first en todas las secciones nuevas (timeline, stack, highlights ya descritos
  como "apilados" en mobile).
- Breakpoints: usar los de Tailwind por defecto (`sm`, `md`, `lg`) — sin breakpoints
  custom nuevos salvo que el fondo Bauhaus lo requiera (ver gap técnico en §4.1).
- Verificar manualmente en 375px (mobile chico), 768px (tablet) y 1440px (desktop) como
  mínimo — parte de la verificación en `tasks.md`.
