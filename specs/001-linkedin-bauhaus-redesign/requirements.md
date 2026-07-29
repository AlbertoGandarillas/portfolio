# Requirements — Contenido real de LinkedIn + rediseño Bauhaus nivel Awwwards

Estado: **Aprobado — decisiones D1–D5 resueltas, listo para `tasks.md`** · Owner: Alberto Gandarillas · Spec: `001-linkedin-bauhaus-redesign`

## 1. Contexto

El sitio (`albertogandarillas.com`, Next.js 16 + Tailwind v4 + shadcn/ui) hoy es una landing
"En desarrollo" de una sola pantalla, con un fondo animado Three.js de estilo Bauhaus y un
sistema tipográfico ya definido (Archivo Black / Inter / Space Mono). Ese trabajo se conserva
y se **extiende**, no se descarta.

Objetivo de esta iteración: convertir esa landing en un **portafolio completo**, con la
información real y verificada de LinkedIn, y una ejecución de diseño/UX a la altura de un
candidato a **Awwwards** (Site of the Day / Honorable Mention): fuerte identidad visual,
tipografía con jerarquía impecable, movimiento con propósito, y cero fricción de uso.

## 2. Fuente de verdad — datos reales de LinkedIn

Extraídos del PDF exportado del perfil (`linkedin.com/in/alberto-gandarillas-40089360`) el
2026-07-29. **Esta es la única fuente de datos de contenido permitida.** No se inventan
proyectos, métricas, clientes, testimonios ni fechas.

### 2.1 Identidad
- **Nombre:** Alberto Gandarillas
- **Titular (headline):** Senior Full-Stack Developer | React, Next.js, C# | AI-Enhanced
  Development | Remote Work Specialist
- **Ubicación:** Perú
- **Email de perfil:** albertogandarillas@hotmail.com *(nota: el sitio ya usa
  `hola@albertogandarillas.com`, con reenvío activo vía Cloudflare Email Routing — ver §7,
  decisión abierta D1)*
- **LinkedIn:** linkedin.com/in/alberto-gandarillas-40089360
- **GitHub:** github.com/AlbertoGandarillas *(ya enlazado en el sitio)*

### 2.2 Resumen (tal como aparece en el perfil, en español)
> Desarrollador Full-Stack con +15 años de experiencia creando aplicaciones web modernas.
> Especializado en React, Next.js, C#, y herramientas de IA para desarrollo acelerado. He
> implementado sistemas completos desde el frontend hasta el backend, con experiencia en
> Azure DevOps y despliegues en Vercel. Actualmente ayudo a empresas a modernizar sus
> aplicaciones y crear MVPs rápidamente usando tecnologías de vanguardia.

### 2.3 Top Skills (según LinkedIn)
Next.js · React.js · Tailwind CSS · TypeScript *(este último confirmado vía la
certificación de §2.5, no en la lista "Top Skills" original pero sí en el perfil)*

### 2.4 Idiomas
Español (nativo) · Inglés · Portugués *(español confirmado por Alberto — D2 resuelta)*

### 2.5 Certificaciones
**Desarrollo Web Fullstack**
- Institución: **TECSUP**
- Emitida: **enero 2022**
- Credential ID: **E-174067**
- Skill asociado (tal como aparece en LinkedIn): **TypeScript**
- URL de verificación ("Show credential"): *no visible en la captura aportada — si Alberto
  la tiene a mano, se agrega; si no, se omite el link y se muestra solo el Credential ID
  como referencia verificable.* (D3 resuelta con este detalle)

> Nota para `design.md`/`content/profile.ts`: **TypeScript** se incorpora al stack técnico
> (categoría Frontend) porque proviene de un dato verificado de LinkedIn (skill asociado a
> la certificación), no es una adición libre.

### 2.6 Experiencia (orden tal como aparece en LinkedIn; ambas entradas "Present" comparten
inicio en abril de 2011 → se muestran como roles concurrentes, no como error de datos)

| # | Empresa | Rol | Periodo | Lugar |
|---|---|---|---|---|
| 1 | The Info Tech Partners | Web Designer / Web Developer | Abr 2011 — Presente | California, USA |
| 2 | Hildebrando Perú SA | Web Designer / UIX Designer | Abr 2011 — Presente | San Isidro, Lima |
| 3 | TELMEX USA | Webmaster – Analista Senior | Oct 2009 — Mar 2011 | Miami, Florida |
| 4 | The Info Tech Partners | Web Developer | Nov 2007 — Sep 2009 | California, USA |
| 5 | TELMEX PERU SA | Analista de Sistemas Senior | Mar 2004 — Oct 2007 | Miraflores |
| 6 | AT&T Perú | Analista de Sistemas Senior | Ago 2000 — Feb 2004 | San Isidro |
| 7 | FIRSTCOM SA | Analista de Sistemas Junior | Ago 1998 — Jul 2000 | San Isidro |
| 8 | Registro Público de Minería | Analista de Sistemas | May 1996 — Jul 1998 | San Borja |

**Bullets por rol (verbatim, para reescritura editorial ligera en `design.md` sin alterar
hechos):**

1. **The Info Tech Partners** (2011–presente)
   - Desarrollo de aplicaciones web full-stack usando React, Next.js, y C#
   - Implementación de CI/CD con Azure DevOps y despliegues en Vercel
   - Uso de herramientas de IA (Claude, Cursor AI) para acelerar el desarrollo
   - Arquitectura y desarrollo de sistemas completos desde frontend hasta backend
2. **Hildebrando Perú SA** (2011–presente)
   - Diseño de interfaces para BBVA Continental y Claro Perú
3. **TELMEX USA** (2009–2011)
   - Diseño y desarrollo de la Intranet para el área de IT
   - Diseño de interfaces gráficas para aplicaciones web
   - Customer eCare USA support systems
   - Rediseño del portal de Carriers Telmex USA
   - Webmaster del sitio institucional de Telmex USA
4. **The Info Tech Partners** (2007–2009)
   - Diseño y desarrollo del sistema SSTK (Student Survey ToolKit Administration)
   - Atención de requerimientos: WebCMS, eFAS, eEPSS, DSPS
5. **TELMEX PERU SA** (2004–2007)
   - Desarrollo e implementación del SGA CRM para Telmex USA
   - Desarrollo e implementación del SGA Service Management System para Telmex USA
   - Diseño y desarrollo del Sistema de Requerimientos Internos del área de IT
   - Diseño y desarrollo de la Intranet Empresarial para Telmex USA LLC
6. **AT&T Perú** (2000–2004)
   - Desarrollo e implementación del Global Sales Database and Funnel Administration System
     para AT&T Latin America Global Sales Division
   - Implementación del SGA integrado a Oracle Financials en AT&T Brasil y AT&T Perú
   - 🏆 **Trofeo "TOP IT", Concurso IT/USERS Awards 2003** — mejor producto en gestión
     empresarial (SGA)
7. **FIRSTCOM SA** (1998–2000)
   - Diseño y desarrollo de la Intranet Empresarial
8. **Registro Público de Minería** (1996–1998)
   - Desarrollo de aplicaciones para la administración del Procedimiento Minero
   - Mantenimiento de base de datos — consistencia de información
   - Preparación de informes gerenciales

### 2.7 Educación
- **Universidad San Ignacio de Loyola** — Ingeniería en Sistemas de Información — 1995–1998

### 2.8 Narrativa derivada (hecho, no relleno)
La trayectoria documentada cubre **1996 → presente (≈30 años en TI)**. El propio titular
enfatiza **"+15 años"** de desarrollo full-stack moderno — esto corresponde a la etapa
2011–presente (React/Next.js/C#) que sigue a ~15 años previos como analista de sistemas
senior en telecom/enterprise (AT&T, Telmex). Esta arco es el hilo narrativo del sitio:
**de analista de sistemas de telecom a desarrollador full-stack potenciado por IA.**

## 3. Alcance

### Dentro de alcance
- Reescritura del contenido del sitio con los datos de §2 (Hero, Sobre mí, Trayectoria,
  Stack, Reconocimientos, Formación/Idiomas, Contacto).
- Extensión del sistema de diseño Bauhaus ya existente a todas las secciones nuevas
  (no solo el hero).
- Sistema de movimiento (scroll reveals, micro-interacciones) coherente con el fondo
  Three.js actual.
- Accesibilidad (WCAG 2.1 AA), rendimiento (Core Web Vitals) y SEO/metadata con datos
  estructurados `Person` (schema.org) basados en §2.
- Responsive completo, incluida una composición Bauhaus adaptada para móvil (la actual
  usa coordenadas de mundo pensadas para escritorio).

### Fuera de alcance (para esta iteración)
- Case studies de proyectos con capturas/métricas: **no hay assets ni datos verificados
  de proyectos individuales** en el LinkedIn exportado; no se inventan. Si en el futuro se
  quiere una sección de proyectos, requiere brief e imágenes aparte.
- Testimonios / logos de clientes como validación social (no confirmados/autorizados).
- CMS o panel de edición de contenido — el contenido vive tipado en el repo (ver
  `design.md` §5).
- Blog.
- Internacionalización (versión en inglés) — se deja como *stretch* documentado, no
  requerido para el release de esta spec.

## 4. Historias de usuario y criterios de aceptación

Formato EARS (Easy Approach to Requirements Syntax).

**HU-1 — Primera impresión (Hero)**
- CUANDO un visitante entra al sitio, EL SISTEMA DEBE mostrar en menos de 2.5s (LCP) el
  nombre, el titular profesional y un CTA de contacto, sobre la animación Bauhaus existente.

**HU-2 — Entender quién es Alberto en 10 segundos**
- CUANDO el visitante hace scroll a la sección "Sobre mí", EL SISTEMA DEBE presentar el
  resumen profesional (adaptado de §2.2) en un bloque tipográfico escaneable en <15s de
  lectura.

**HU-3 — Explorar la trayectoria**
- CUANDO el visitante llega a la sección "Trayectoria", EL SISTEMA DEBE listar las 8
  experiencias de §2.6 en orden cronológico inverso, con empresa, rol, fechas (calculadas
  dinámicamente, no strings fijos) y bullets clave.
- SI dos roles son concurrentes (Info Tech Partners + Hildebrando, 2011–presente),
  ENTONCES EL SISTEMA DEBE representarlos visualmente como paralelos, no como un error.

**HU-4 — Evaluar stack técnico**
- CUANDO el visitante llega a "Stack", EL SISTEMA DEBE agrupar las skills de §2.3 más las
  tecnologías mencionadas en la experiencia (C#, Azure DevOps, Vercel, IA: Claude/Cursor)
  por categoría (Frontend, Plataforma/Cloud, Flujo con IA).

**HU-5 — Credibilidad rápida (Reconocimientos)**
- CUANDO el visitante llega a "Reconocimientos", EL SISTEMA DEBE destacar como mínimo:
  +15 años de experiencia full-stack, el premio TOP IT 2003, y las interfaces para BBVA
  Continental/Claro Perú — como tiles visuales, no párrafos.

**HU-6 — Contacto sin fricción**
- CUANDO el visitante quiere contactar, EL SISTEMA DEBE ofrecer email, LinkedIn y GitHub
  accesibles desde cualquier punto del scroll (footer + CTA persistente opcional).

**HU-7 — Accesibilidad de movimiento**
- SI el visitante tiene `prefers-reduced-motion: reduce`, ENTONCES EL SISTEMA DEBE
  desactivar animaciones continuas y scroll-reveals, mostrando el contenido ya visible
  (patrón ya implementado en `bauhaus-background.tsx`, debe replicarse en todo nuevo
  componente animado).

**HU-8 — Rendimiento en móvil**
- CUANDO el sitio se carga en un dispositivo móvil de gama media, EL SISTEMA DEBE alcanzar
  Lighthouse Performance ≥ 90 y no producir jank perceptible por el canvas Three.js.

**HU-9 — Datos verificables**
- EL SISTEMA NO DEBE mostrar ningún dato (empresa, fecha, logro, cifra) que no esté
  presente en §2 de este documento.

## 5. Restricciones y guardrails técnicos

1. **No reescribir** `components/ui/button.tsx` ni `components/ui/badge.tsx` — se siguen
   extendiendo por `className`, patrón ya validado en el sitio actual.
2. **Reutilizar** `components/bauhaus-background.tsx` como motor del hero; las nuevas
   composiciones por sección son variantes del mismo vocabulario de formas (no un sistema
   gráfico paralelo).
3. **No tocar** `vercel.json` (`framework: nextjs`) ni la configuración de deploy — el
   fix de producción ya está estable.
4. **No reemplazar** el email de contacto ya operativo (`hola@albertogandarillas.com`) sin
   decisión explícita (ver D1).
5. Mantener Next.js 16 App Router, Tailwind v4, shadcn/ui, `next/font` self-hosted — sin
   nuevas dependencias de UI framework.
6. Contenido en un módulo tipado separado de la presentación (ver `design.md` §5) — nunca
   hardcodeado inline en JSX disperso, para que futuras actualizaciones de LinkedIn sean
   una sola edición de datos.

## 6. Métricas de éxito

| Categoría | Métrica objetivo |
|---|---|
| Performance | Lighthouse ≥ 90 (mobile), LCP < 2.5s, CLS < 0.1 |
| Accesibilidad | Lighthouse Accessibility ≥ 95, WCAG 2.1 AA, contraste AA en todo texto sobre el fondo animado |
| SEO | Lighthouse SEO 100, metadata OG completa, JSON-LD `Person` válido |
| Contenido | 100% de los datos visibles trazables a §2 de este documento |
| Diseño (criterio Awwwards) | Identidad visual distintiva y consistente, jerarquía tipográfica clara, movimiento con propósito (no decorativo gratuito), usabilidad sin fricción |

## 7. Decisiones (resueltas por Alberto — 2026-07-29)

- **D1 — Email de contacto:** ✅ **Resuelto.** Se mantiene `hola@albertogandarillas.com`
  como CTA principal en todo el sitio (Hero, Contacto/Footer). No se usa el email del
  export de LinkedIn (`albertogandarillas@hotmail.com`).
- **D2 — Español como idioma listado:** ✅ **Resuelto.** Se agrega **"Español (nativo)"**
  al bloque de idiomas, junto a Inglés y Portugués (ver §2.4 actualizado).
- **D3 — Certificación "Desarrollo Web Fullstack":** ✅ **Resuelto.** Institución TECSUP,
  emitida enero 2022, Credential ID `E-174067`, skill asociado TypeScript (ver §2.5
  actualizado). Falta únicamente la URL de verificación (opcional, no bloqueante).
- **D4 — Roles concurrentes 2011–presente:** ✅ **Resuelto.** Se sigue la recomendación:
  Info Tech Partners e Hildebrando se muestran como **dos tarjetas conectadas** en el mismo
  punto de la línea de tiempo (ver `design.md` §4.3, `concurrentGroup`).
- **D5 — Modo oscuro:** ✅ **Resuelto — SÍ, dentro de esta iteración.** Se agrega un
  toggle claro/oscuro (paper/ink) visible en el sitio, usando los tokens `.dark` ya
  existentes en `globals.css`. Ver especificación completa en `design.md` §10.

Con las 5 decisiones resueltas, este documento queda **congelado como fuente de verdad**
para `design.md` y `tasks.md`. Cualquier corrección posterior a los datos de LinkedIn debe
registrarse aquí primero.
