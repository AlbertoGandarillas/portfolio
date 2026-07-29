"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import { useInViewAnimation } from "@/lib/use-in-view-animation";

export function RevealSection({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={isVisible}
      className={cn("reveal-section", className)}
      {...props}
    >
      {children}
    </section>
  );
}
