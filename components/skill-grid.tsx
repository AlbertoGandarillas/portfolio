import { cn } from "@/lib/utils";

interface Category {
  title: string;
  items: readonly string[];
  className: string;
  itemClassName?: string;
}

interface SkillGridProps {
  categories: readonly Category[];
}

export function SkillGrid({ categories }: SkillGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {categories.map((category, categoryIndex) => (
        <article
          key={category.title}
          className={cn(
            "min-h-64 border-2 border-foreground p-6 sm:p-8",
            category.className
          )}
          style={{ transitionDelay: `${categoryIndex * 70}ms` }}
        >
          <h3 className="mb-8 font-display text-2xl leading-none uppercase">
            {category.title}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {category.items.map((item) => (
              <li
                key={item}
                className={cn(
                  "border border-current bg-background/15 px-3 py-2 font-mono text-xs tracking-wider uppercase backdrop-blur-sm",
                  category.itemClassName
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
