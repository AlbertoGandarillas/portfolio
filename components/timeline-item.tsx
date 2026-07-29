"use client";

import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";

import type { Accent, ExperienceEntry } from "@/content/profile";
import { formatDuration, formatPeriod } from "@/lib/dates";
import { cn } from "@/lib/utils";

type ReadonlyExperience = Omit<Readonly<ExperienceEntry>, "bullets"> & {
  readonly bullets: readonly string[];
};

const accentClasses: Record<Accent, string> = {
  red: "bg-bauhaus-red",
  blue: "bg-bauhaus-blue",
  yellow: "bg-bauhaus-yellow",
  navy: "bg-bauhaus-navy",
};

interface TimelineItemProps {
  entry: ReadonlyExperience;
  accent: Accent;
  shape: "circle" | "square" | "triangle";
  delay?: number;
}

export function TimelineItem({
  entry,
  accent,
  shape,
  delay = 0,
}: TimelineItemProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleBullets = expanded ? entry.bullets : entry.bullets.slice(0, 3);

  return (
    <article
      className="group relative pl-10 sm:pl-14"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-7 left-0 z-10 size-5 border-2 border-background ring-2 ring-foreground transition-transform group-hover:scale-125 sm:size-6",
          accentClasses[accent],
          shape === "circle" && "rounded-full",
          shape === "triangle" &&
            "size-0 border-x-[11px] border-t-0 border-b-[20px] border-x-transparent border-b-bauhaus-yellow bg-transparent ring-0"
        )}
      />
      <div className="border-2 border-foreground bg-background/90 p-5 shadow-[6px_6px_0_var(--foreground)] backdrop-blur-sm transition-colors group-hover:border-current sm:p-7">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="type-label mb-2 text-muted-foreground">{entry.role}</p>
            <h3 className="type-card-title">{entry.company}</h3>
          </div>
          {entry.end === "present" && (
            <span className="relative inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-bauhaus-red opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-bauhaus-red" />
              </span>
              Presente
            </span>
          )}
        </div>
        <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
          <span>{formatPeriod(entry.start, entry.end)}</span>
          <span>{formatDuration(entry.start, entry.end)}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3" aria-hidden="true" />
            {entry.location}
          </span>
        </div>
        <ul className="space-y-3 text-sm leading-relaxed sm:text-base">
          {visibleBullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span aria-hidden="true" className="font-mono text-bauhaus-red">
                —
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        {entry.bullets.length > 3 && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="focus-bauhaus mt-5 inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
            aria-expanded={expanded}
          >
            {expanded ? "Ver menos" : "Ver más"}
            <ChevronDown
              className={cn("size-4 transition-transform", expanded && "rotate-180")}
            />
          </button>
        )}
      </div>
    </article>
  );
}
