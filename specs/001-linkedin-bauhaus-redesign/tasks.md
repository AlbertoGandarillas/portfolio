# Tasks — Plan de implementación

Depende de: `requirements.md`, `design.md`. **No empezar hasta resolver las decisiones
abiertas D1–D5 de `requirements.md` §7** (o confirmar explícitamente las recomendaciones
por defecto).

Convención: cada tarea es independiente y verificable. Marcar `[x]` al completar.
Rutas de archivo son las reales del repo (`/home/user/portfolio`).

## M0 — Preparación y capa de contenido

- [ ] Confirmar decisiones D1–D5 con Alberto (registrar respuesta al pie de
      `requirements.md` §7).
- [ ] Crear `content/profile.ts` implementando el contrato de `design.md` §5, con los
      datos reales de `requirements.md` §2 (sin placeholders ni datos inventados).
- [ ] Crear helper `lib/dates.ts` con función `formatDuration(start, end)` que calcule
      "X años Y meses" en runtime a partir de fechas ISO (evita strings hardcodeados que
      quedan obsoletos — cumple HU-3).
- [ ] Crear `lib/use-in-view-animation.ts` (hook) implementando `IntersectionObserver` +
      chequeo de `prefers-reduced-motion` (design.md §3.3).

## M1 — Sistema de diseño: extensión de tokens

- [ ] En `app/globals.css`, formalizar la escala tipográfica de `design.md` §2.2 como
      utilidades/clases reutilizables (o documentar las clases Tailwind a usar
      consistentemente — decisión de Cursor, pero debe quedar en un solo lugar de
      referencia, no reinventada por sección).
- [ ] Definir el ritmo vertical estándar entre secciones (`py-24 sm:py-32`) como
      convención documentada (comentario en el propio archivo o en este spec).
- [ ] Confirmar que los 4 colores de acento (`red`, `blue`, `navy`, `yellow`) están
      expuestos como tokens Tailwind reutilizables (ya existen en `bauhaus-background.tsx`
      como constantes JS — evaluar si conviene promoverlos a `globals.css` para que los
      nuevos componentes CSS/Tailwind los usen sin duplicar hex codes).

## M2 — Componentes nuevos (design.md §6)

- [ ] `components/section-heading.tsx` — H2 + número de índice + línea divisoria.
- [ ] `components/section-index-nav.tsx` — índice fijo lateral (desktop) + overlay mobile,
      con `aria-current` en la sección activa vía scroll-spy.
- [ ] `components/timeline-item.tsx` — nodo + tarjeta, soporta agrupación de roles
      concurrentes (`concurrentGroup`).
- [ ] `components/skill-grid.tsx` — grid de categorías/chips.
- [ ] `components/highlight-tile.tsx` — tile de logro/estadística.
- [ ] `components/contact-links.tsx` — extraer los 3 CTAs (email/GitHub/LinkedIn) del
      hero actual (`app/page.tsx`) a un componente reutilizable, sin cambiar su
      comportamiento actual.
- [ ] (Opcional, si se prioriza fidelidad visual completa) `components/bauhaus-background.tsx`
      — agregar variante `variant="ambient"` con menos formas/opacidad reducida para
      secciones no-hero, reutilizando las funciones constructoras ya existentes
      (`arches`, `wedge`, `sector`, etc.) en vez de duplicar lógica.

## M3 — Secciones de página

- [ ] **Hero** (`app/page.tsx`): reemplazar badge "En desarrollo" por el titular real
      (`profile.headline` + tags), agregar CTAs "Ver trayectoria" / "Contactar" con
      scroll suave a anclas. Mantener `BauhausBackground` sin alterar su comportamiento
      base.
- [ ] **Gap técnico del hero:** ajustar `components/bauhaus-background.tsx` para que la
      composición de formas se adapte a viewports angostos (< 640px) — ver `design.md`
      §4.1. Verificar visualmente en 375px que ninguna forma queda cortada/amontonada de
      forma que rompa la composición.
- [ ] **Sobre mí** (`app/sections/about.tsx` o equivalente): copy de dos párrafos según
      `design.md` §4.2, usando `content/profile.ts.summary`.
- [ ] **Trayectoria** (`app/sections/experience.tsx`): render de las 8 entradas de
      `profile.experience` vía `TimelineItem`, fechas calculadas con `formatDuration`,
      roles 2011–presente agrupados visualmente.
- [ ] **Stack** (`app/sections/stack.tsx`): `SkillGrid` con las 3 categorías de
      `profile.skills`.
- [ ] **Reconocimientos** (`app/sections/highlights.tsx`): 3–4 `HighlightTile` con los
      datos de `design.md` §4.5.
- [ ] **Formación & Idiomas** (`app/sections/education.tsx`): bloque de dos columnas con
      `profile.education`, `profile.languages`, `profile.certifications`.
- [ ] **Contacto/Footer** (`app/sections/contact.tsx`): CTA final + `ContactLinks` +
      copyright dinámico (reutilizar el ya existente).
- [ ] Ensamblar todas las secciones en `app/page.tsx` en el orden de `design.md` §1,
      cada una envuelta con el hook de scroll-reveal (`useInViewAnimation`).

## M4 — Movimiento

- [ ] Aplicar scroll-reveal (`design.md` §3.2) a la entrada de cada sección.
- [ ] Aplicar stagger a las listas de Timeline/Stack/Highlights (máx. 80ms entre ítems).
- [ ] Estados hover en `TimelineItem` y `HighlightTile` (color de acento, sin layout
      shift).
- [ ] Scroll-spy funcional en `SectionIndexNav` (sección activa resaltada).
- [ ] Extender el patrón de pausa por `visibilitychange` del canvas del hero con
      `IntersectionObserver` sobre su propio contenedor, para pausar el render cuando el
      hero sale del viewport en scroll profundo.
- [ ] Verificar que `prefers-reduced-motion: reduce` desactiva **todos** los efectos
      nuevos (no solo el canvas), mostrando el contenido ya visible.

## M5 — Accesibilidad

- [ ] Skip link "Saltar al contenido" antes del índice de navegación.
- [ ] Jerarquía de encabezados válida (un solo H1, H2 por sección, sin saltos de nivel).
- [ ] `aria-label`/`aria-labelledby` en cada `<section>`.
- [ ] `aria-current` en el link activo del índice de navegación.
- [ ] Verificar contraste AA de todo texto sobre fondo animado (usar herramienta de
      contraste, no solo inspección visual) — replicar la viñeta del hero donde aplique.
- [ ] Navegación completa por teclado (Tab a través de índice, CTAs, links del footer;
      sin trampas de foco).
- [ ] Auditoría con Lighthouse Accessibility (objetivo ≥ 95, `requirements.md` §6).

## M6 — Rendimiento y SEO

- [ ] Confirmar que solo hay una escena WebGL activa (el hero); ninguna sección nueva
      instancia Three.js adicional.
- [ ] `app/layout.tsx`: metadata OG completa + imagen OG generada con `next/og`
      (paleta/tipografía Bauhaus, usando `profile.name` + `profile.headline`).
- [ ] JSON-LD `Person` (schema.org) en el `<head>`, poblado desde `content/profile.ts`.
- [ ] `app/sitemap.ts` y `app/robots.ts` (convención Next.js App Router).
- [ ] Lighthouse: Performance ≥ 90 (mobile), LCP < 2.5s, CLS < 0.1, SEO 100.

## M7 — QA final y despliegue

- [ ] Revisión de contenido: cada dato visible en el sitio se contrasta contra
      `requirements.md` §2 (checklist manual, cumple HU-9).
- [ ] Verificación visual en 375px, 768px, 1440px (mínimo).
- [ ] `npm run build` y `npm run lint` sin errores.
- [ ] Captura de pantalla (claro y, si D5 = sí, oscuro) para validar composición final
      antes de mergear.
- [ ] Commit + push a `main` (o PR, según preferencia de Alberto en el momento) →
      verificar deploy en Vercel y `albertogandarillas.com`.

## Fuera de este plan (recordatorio de `requirements.md` §3)

No incluir: case studies de proyectos con capturas, testimonios/logos de clientes, CMS,
blog, versión en inglés. Si Alberto los pide más adelante, requieren su propio spec
(`002-...`) con brief y assets — no se improvisan dentro de esta iteración.
