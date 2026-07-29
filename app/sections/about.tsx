import { RevealSection } from "@/components/reveal-section";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/content/profile";

export function AboutSection() {
  return (
    <RevealSection
      id="sobre-mi"
      aria-labelledby="sobre-mi-title"
      className="section-shell overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-24 right-[-8rem] -z-10 size-80 rounded-full border-[5rem] border-bauhaus-navy/10"
      />
      <div className="mx-auto max-w-3xl">
        <SectionHeading number="01" title="Sobre mí" id="sobre-mi-title" />
        <div className="space-y-8">
          <p className="font-display text-2xl leading-tight uppercase sm:text-4xl">
            De sistemas enterprise a desarrollo full-stack potenciado por IA.
          </p>
          <div className="grid gap-6 border-l-4 border-bauhaus-navy pl-6 sm:pl-8">
            <p className="type-body">{profile.summary.today}</p>
            <p className="type-body text-muted-foreground">{profile.summary.origin}</p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
