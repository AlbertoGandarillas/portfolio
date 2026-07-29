import { HighlightTile } from "@/components/highlight-tile";
import { RevealSection } from "@/components/reveal-section";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/content/profile";

export function HighlightsSection() {
  return (
    <RevealSection
      id="reconocimientos"
      aria-labelledby="reconocimientos-title"
      className="section-shell"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          number="04"
          title="Reconocimientos"
          id="reconocimientos-title"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.highlights.map((highlight, index) => (
            <HighlightTile
              key={highlight.label}
              {...highlight}
              delay={index * 70}
              className={
                index === 0
                  ? "sm:col-span-2"
                  : index === profile.highlights.length - 1
                    ? "lg:col-span-2"
                    : undefined
              }
            />
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
