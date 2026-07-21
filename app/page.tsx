import { Construction, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,var(--color-muted)_0%,transparent_70%)]" />

      <div className="flex w-full max-w-xl flex-col items-center gap-8 text-center">
        <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
          <Construction className="size-3.5" />
          En desarrollo
        </Badge>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Alberto Gandarillas
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Estoy construyendo mi portafolio personal. Vuelve pronto para
            conocer mis proyectos, experiencia y en qué estoy trabajando.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <a href="mailto:hola@albertogandarillas.com">
              <Mail />
              Contáctame
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/AlbertoGandarillas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://pe.linkedin.com/in/alberto-gandarillas-40089360"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>

      <footer className="absolute bottom-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Alberto Gandarillas
      </footer>
    </main>
  );
}
