import { RevealSection } from "@/components/reveal-section";
import { SectionHeading } from "@/components/section-heading";
import { TimelineItem } from "@/components/timeline-item";
import { profile, type Accent } from "@/content/profile";

const accents: Accent[] = ["red", "blue", "yellow", "navy"];
const shapes = ["circle", "square", "triangle"] as const;

export function ExperienceSection() {
  const concurrent = profile.experience.filter(
    (entry) => entry.concurrentGroup === "2011"
  );
  const remaining = profile.experience.filter(
    (entry) => entry.concurrentGroup !== "2011"
  );

  return (
    <RevealSection
      id="trayectoria"
      aria-labelledby="trayectoria-title"
      className="section-shell"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          number="02"
          title="Trayectoria"
          id="trayectoria-title"
        />
        <div className="relative space-y-10 before:absolute before:top-0 before:bottom-0 before:left-[9px] before:w-0.5 before:bg-foreground sm:before:left-[11px]">
          <div className="relative">
            <div className="mb-4 ml-10 flex items-center gap-3 sm:ml-14">
              <span className="type-label bg-foreground px-3 py-1.5 text-background">
                Roles concurrentes · desde abr 2011
              </span>
              <span className="h-px flex-1 bg-foreground/30" aria-hidden="true" />
            </div>
            <div className="relative grid gap-6 md:grid-cols-2">
              {concurrent.map((entry, index) => (
                <TimelineItem
                  key={`${entry.company}-${entry.role}`}
                  entry={entry}
                  accent={accents[index]}
                  shape={shapes[index]}
                  delay={index * 70}
                />
              ))}
            </div>
          </div>
          {remaining.map((entry, index) => (
            <TimelineItem
              key={`${entry.company}-${entry.role}`}
              entry={entry}
              accent={accents[(index + concurrent.length) % accents.length]}
              shape={shapes[(index + concurrent.length) % shapes.length]}
              delay={Math.min(index * 70, 420)}
            />
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
