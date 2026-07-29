# Spec 001 — Contenido real de LinkedIn + rediseño Bauhaus nivel Awwwards

Paquete de especificaciones (*spec-driven development*) para evolucionar
`albertogandarillas.com` de landing "en desarrollo" a portafolio completo, usando
únicamente datos reales del perfil de LinkedIn de Alberto Gandarillas.

## Documentos

1. **[`requirements.md`](./requirements.md)** — el qué y el porqué. Contiene la fuente de
   verdad del contenido (transcripción íntegra del LinkedIn), alcance, historias de
   usuario con criterios de aceptación, y **5 decisiones (D1–D5), ya resueltas por
   Alberto el 2026-07-29** (§7): email `hola@`, Español agregado a idiomas, certificación
   TECSUP completa, roles concurrentes en tarjetas conectadas, modo oscuro incluido.
2. **[`design.md`](./design.md)** — el cómo. Sistema de diseño (extiende el ya existente:
   Bauhaus + Archivo Black/Inter/Space Mono), especificación sección por sección, sistema
   de movimiento, modelo de contenido tipado, inventario de componentes, accesibilidad,
   rendimiento y responsive.
3. **[`tasks.md`](./tasks.md)** — el plan de ejecución. Checklist ordenado en 8 milestones
   (M0–M7), cada tarea con ruta de archivo concreta y criterio verificable.

## Cómo usar esto en Cursor

1. Abrir el repo en Cursor con estos 3 archivos en contexto.
2. Las decisiones D1–D5 de `requirements.md` §7 **ya están resueltas** — Cursor puede
   implementar directamente sobre esa base, sin volver a preguntarlas.
3. Ejecutar `tasks.md` de arriba hacia abajo, milestone por milestone — no saltar a M3
   (secciones de página) sin haber completado M0–M2 (contenido tipado + componentes base),
   porque las secciones dependen de ese contrato.
4. Cada tarea completada se verifica contra su criterio de aceptación en
   `requirements.md` (sección "Historias de usuario") antes de marcarla `[x]`.

## Principio no negociable

**Cero datos inventados.** Todo lo que el sitio muestre (empresa, fecha, logro, skill)
debe poder trazarse a `requirements.md` §2. Si falta un dato (ej. institución de la
certificación), se deja explícito como pendiente — nunca se rellena con una suposición
presentada como hecho.
