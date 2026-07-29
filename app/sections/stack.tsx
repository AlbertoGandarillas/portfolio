import { RevealSection } from "@/components/reveal-section";
import { SectionHeading } from "@/components/section-heading";
import { SkillGrid } from "@/components/skill-grid";
import { profile } from "@/content/profile";

export function StackSection() {
  const categories = [
    {
      title: "Frontend",
      items: profile.skills.frontend,
      className: "bg-bauhaus-red text-white",
      itemClassName: "bg-white text-bauhaus-ink",
    },
    {
      title: "Plataforma & DevOps",
      items: profile.skills.platform,
      className: "bg-bauhaus-blue text-white",
    },
    {
      title: "Flujo con IA",
      items: profile.skills.ai,
      className: "bg-bauhaus-yellow text-bauhaus-ink",
    },
  ] as const;

  return (
    <RevealSection
      id="stack"
      aria-labelledby="stack-title"
      className="section-shell"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="03" title="Stack" id="stack-title" />
        <SkillGrid categories={categories} />
      </div>
    </RevealSection>
  );
}
