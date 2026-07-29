export type Accent = "red" | "blue" | "yellow" | "navy";

export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string | "present";
  bullets: string[];
  concurrentGroup?: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export interface Highlight {
  label: string;
  detail: string;
  accent: Accent;
}

export interface Certification {
  name: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  credentialUrl?: string;
  associatedSkills?: string[];
}

export interface LanguageEntry {
  name: string;
  isNative?: boolean;
}

export const profile = {
  name: "Alberto Gandarillas",
  headline: "Senior Full-Stack Developer",
  headlineTags: ["React", "Next.js", "C#", "Desarrollo potenciado por IA"],
  location: "Perú",
  email: "hola@albertogandarillas.com",
  links: {
    github: "https://github.com/AlbertoGandarillas",
    linkedin: "https://linkedin.com/in/alberto-gandarillas-40089360",
  },
  summary: {
    today:
      "Desarrollo aplicaciones web modernas de extremo a extremo con React, Next.js y C#. Integro herramientas de IA para acelerar el trabajo y ayudar a empresas a modernizar sus aplicaciones y crear MVPs con tecnologías de vanguardia.",
    origin:
      "Mi trayectoria en TI comenzó en 1996, construyendo sistemas para minería y telecomunicaciones. Esa experiencia enterprise evolucionó hacia más de 15 años de desarrollo full-stack moderno, CI/CD y despliegues en la nube.",
  },
  skills: {
    frontend: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    platform: ["C#", "Azure DevOps", "Vercel", "CI/CD"],
    ai: ["Claude", "Cursor AI"],
  },
  experience: [
    {
      company: "The Info Tech Partners",
      role: "Web Designer / Web Developer",
      location: "California, USA",
      start: "2011-04",
      end: "present",
      concurrentGroup: "2011",
      bullets: [
        "Desarrollo de aplicaciones web full-stack usando React, Next.js y C#.",
        "Implementación de CI/CD con Azure DevOps y despliegues en Vercel.",
        "Uso de Claude y Cursor AI para acelerar el desarrollo.",
        "Arquitectura y desarrollo de sistemas completos desde frontend hasta backend.",
      ],
    },
    {
      company: "Hildebrando Perú SA",
      role: "Web Designer / UIX Designer",
      location: "San Isidro, Lima",
      start: "2011-04",
      end: "present",
      concurrentGroup: "2011",
      bullets: ["Diseño de interfaces para BBVA Continental y Claro Perú."],
    },
    {
      company: "TELMEX USA",
      role: "Webmaster – Analista Senior",
      location: "Miami, Florida",
      start: "2009-10",
      end: "2011-03",
      bullets: [
        "Diseño y desarrollo de la Intranet para el área de IT.",
        "Diseño de interfaces gráficas para aplicaciones web y sistemas Customer eCare USA.",
        "Rediseño del portal de Carriers y webmaster del sitio institucional de Telmex USA.",
      ],
    },
    {
      company: "The Info Tech Partners",
      role: "Web Developer",
      location: "California, USA",
      start: "2007-11",
      end: "2009-09",
      bullets: [
        "Diseño y desarrollo del sistema SSTK (Student Survey ToolKit Administration).",
        "Atención de requerimientos: WebCMS, eFAS, eEPSS y DSPS.",
      ],
    },
    {
      company: "TELMEX PERU SA",
      role: "Analista de Sistemas Senior",
      location: "Miraflores",
      start: "2004-03",
      end: "2007-10",
      bullets: [
        "Desarrollo e implementación del SGA CRM y SGA Service Management System para Telmex USA.",
        "Diseño y desarrollo del Sistema de Requerimientos Internos del área de IT.",
        "Diseño y desarrollo de la Intranet Empresarial para Telmex USA LLC.",
      ],
    },
    {
      company: "AT&T Perú",
      role: "Analista de Sistemas Senior",
      location: "San Isidro",
      start: "2000-08",
      end: "2004-02",
      bullets: [
        "Desarrollo del Global Sales Database and Funnel Administration System para AT&T Latin America.",
        "Implementación del SGA integrado a Oracle Financials en AT&T Brasil y AT&T Perú.",
        'Trofeo "TOP IT", Concurso IT/USERS Awards 2003: mejor producto en gestión empresarial (SGA).',
      ],
    },
    {
      company: "FIRSTCOM SA",
      role: "Analista de Sistemas Junior",
      location: "San Isidro",
      start: "1998-08",
      end: "2000-07",
      bullets: ["Diseño y desarrollo de la Intranet Empresarial."],
    },
    {
      company: "Registro Público de Minería",
      role: "Analista de Sistemas",
      location: "San Borja",
      start: "1996-05",
      end: "1998-07",
      bullets: [
        "Desarrollo de aplicaciones para la administración del Procedimiento Minero.",
        "Mantenimiento de base de datos y consistencia de información.",
        "Preparación de informes gerenciales.",
      ],
    },
  ] satisfies ExperienceEntry[],
  education: [
    {
      school: "Universidad San Ignacio de Loyola",
      degree: "Ingeniería en Sistemas de Información",
      start: "1995",
      end: "1998",
    },
  ] satisfies EducationEntry[],
  languages: [
    { name: "Español", isNative: true },
    { name: "Inglés" },
    { name: "Portugués" },
  ] satisfies LanguageEntry[],
  certifications: [
    {
      name: "Desarrollo Web Fullstack",
      issuer: "TECSUP",
      issuedDate: "2022-01",
      credentialId: "E-174067",
      associatedSkills: ["TypeScript"],
    },
  ] satisfies Certification[],
  highlights: [
    {
      label: "+15 AÑOS",
      detail: "Desarrollo full-stack moderno",
      accent: "red",
    },
    {
      label: "TOP IT 2003",
      detail: "IT/USERS Awards · mejor producto en gestión empresarial",
      accent: "yellow",
    },
    {
      label: "BBVA & CLARO",
      detail: "Diseño de interfaces en Hildebrando Perú",
      accent: "blue",
    },
    {
      label: "~30 AÑOS",
      detail: "Trayectoria documentada en TI desde 1996",
      accent: "navy",
    },
  ] satisfies Highlight[],
} as const;
