import type { Accent } from "@/content/profile";
import { cn } from "@/lib/utils";

const accentClasses: Record<Accent, string> = {
  red: "bg-bauhaus-red text-white",
  blue: "bg-bauhaus-blue text-white",
  yellow: "bg-bauhaus-yellow text-bauhaus-ink",
  navy: "bg-bauhaus-navy text-white",
};

interface HighlightTileProps {
  label: string;
  detail: string;
  accent: Accent;
  className?: string;
  delay?: number;
}

export function HighlightTile({
  label,
  detail,
  accent,
  className,
  delay = 0,
}: HighlightTileProps) {
  return (
    <article
      className={cn(
        "group flex min-h-52 flex-col justify-between border-2 border-foreground p-6 transition-transform duration-300 hover:scale-[1.015] sm:p-8",
        accentClasses[accent],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="font-display text-3xl leading-none uppercase sm:text-5xl">
        {label}
      </span>
      <p
        className={cn(
          "mt-8 max-w-xs font-mono text-xs leading-relaxed tracking-wider uppercase",
          accent === "red" && "bg-white p-2 text-bauhaus-ink"
        )}
      >
        {detail}
      </p>
    </article>
  );
}
