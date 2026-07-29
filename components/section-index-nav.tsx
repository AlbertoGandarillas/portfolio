"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

export const sections = [
  { id: "sobre-mi", number: "01", label: "Sobre mí" },
  { id: "trayectoria", number: "02", label: "Trayectoria" },
  { id: "stack", number: "03", label: "Stack" },
  { id: "reconocimientos", number: "04", label: "Reconocimientos" },
  { id: "formacion", number: "05", label: "Formación" },
  { id: "contacto", number: "06", label: "Contacto" },
] as const;

type SectionId = (typeof sections)[number]["id"];

export function SectionIndexNav() {
  const [activeId, setActiveId] = useState<SectionId>(sections[0].id);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id as SectionId);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
    );

    for (const section of sections) {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const links = sections.map((section) => (
    <a
      key={section.id}
      href={`#${section.id}`}
      aria-current={activeId === section.id ? "true" : undefined}
      onClick={() => setIsOpen(false)}
      className={cn(
        "focus-bauhaus flex items-center gap-3 py-1.5 font-mono text-[0.65rem] tracking-widest uppercase transition-colors",
        activeId === section.id
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span className="font-bold">{section.number}</span>
      <span>{section.label}</span>
    </a>
  ));

  return (
    <>
      <nav
        aria-label="Secciones"
        className="fixed top-20 right-6 z-40 hidden border-r-2 border-foreground pr-4 lg:block"
      >
        {links}
      </nav>

      <div
        className="fixed inset-x-0 top-0 z-40 flex h-1 bg-foreground/15 lg:hidden"
        aria-hidden="true"
      >
        {sections.map((section) => (
          <span
            key={section.id}
            className={cn(
              "flex-1 border-r border-background transition-colors",
              activeId === section.id ? "bg-bauhaus-red" : "bg-transparent"
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="focus-bauhaus fixed top-4 left-4 z-50 grid size-11 place-items-center border-2 border-foreground bg-background lg:hidden"
        aria-label="Abrir menú de secciones"
        aria-expanded={isOpen}
      >
        <Menu className="size-4" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background transition-transform duration-300 lg:hidden",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
        aria-hidden={!isOpen}
      >
        <div aria-hidden="true" className="absolute top-0 left-0 size-36 bg-bauhaus-red" />
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0 size-56 rounded-tl-full bg-bauhaus-blue"
        />
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="focus-bauhaus absolute top-4 right-4 z-10 grid size-11 place-items-center border-2 border-foreground bg-background"
          aria-label="Cerrar menú de secciones"
          tabIndex={isOpen ? 0 : -1}
        >
          <X className="size-4" />
        </button>
        <nav
          aria-label="Menú de secciones"
          className="relative z-10 flex min-h-full flex-col justify-center px-10"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={activeId === section.id ? "true" : undefined}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
              className="focus-bauhaus flex items-baseline gap-5 border-b border-foreground/20 py-4 font-display text-2xl uppercase"
            >
              <span className="font-mono text-xs">{section.number}</span>
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
