import { BauhausBackground } from "@/components/bauhaus-background";
import { SectionIndexNav } from "@/components/section-index-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { AboutSection } from "@/app/sections/about";
import { ContactSection } from "@/app/sections/contact";
import { EducationSection } from "@/app/sections/education";
import { ExperienceSection } from "@/app/sections/experience";
import { HighlightsSection } from "@/app/sections/highlights";
import { StackSection } from "@/app/sections/stack";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="focus-bauhaus fixed top-3 left-1/2 z-[100] -translate-x-1/2 -translate-y-24 bg-foreground px-4 py-3 font-mono text-xs text-background uppercase focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <ThemeToggle />
      <SectionIndexNav />
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-30 opacity-[0.035]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />
      <main id="contenido">
        <section
          aria-labelledby="hero-title"
          className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-24"
        >
          <BauhausBackground />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 48%, var(--background) 0%, color-mix(in oklch, var(--background) 75%, transparent) 50%, transparent 78%)",
            }}
          />
          <div className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
            <Badge
              variant="secondary"
              className="rounded-none border border-foreground/20 bg-background/75 px-3 py-1.5 font-mono text-[0.65rem] font-normal tracking-[0.2em] uppercase backdrop-blur-sm"
            >
              {profile.headline} · {profile.headlineTags.join(" · ")}
            </Badge>
            <div className="flex flex-col gap-5">
              <h1
                id="hero-title"
                className="font-display text-5xl leading-[0.86] tracking-tight text-balance uppercase sm:text-6xl md:text-8xl"
              >
                {profile.name}
              </h1>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                Desarrollo aplicaciones web modernas de extremo a extremo y uso IA para acelerar la creación de productos.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="focus-bauhaus h-11 rounded-none px-6 font-mono text-xs tracking-widest uppercase">
                <a href="#trayectoria">Ver trayectoria</a>
              </Button>
              <Button asChild variant="outline" className="focus-bauhaus h-11 rounded-none border-foreground/30 bg-background/70 px-6 font-mono text-xs tracking-widest uppercase backdrop-blur-sm">
                <a href="#contacto">Contactar</a>
              </Button>
            </div>
          </div>
          <a
            href="#sobre-mi"
            aria-label="Ir a Sobre mí"
            className="focus-bauhaus absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] tracking-[0.25em] uppercase"
          >
            Scroll ↓
          </a>
        </section>
        <AboutSection />
        <ExperienceSection />
        <StackSection />
        <HighlightsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  );
}
