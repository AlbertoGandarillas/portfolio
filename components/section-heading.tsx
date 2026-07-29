import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  number: string;
  title: string;
  id: string;
  className?: string;
}

export function SectionHeading({
  number,
  title,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("mb-12 sm:mb-16", className)}>
      <div className="mb-4 flex items-center gap-4">
        <span className="font-display text-sm" aria-hidden="true">
          {number}
        </span>
        <span className="h-px flex-1 bg-foreground/30" aria-hidden="true" />
      </div>
      <h2 id={id} className="type-section-title">
        {title}
      </h2>
    </header>
  );
}
