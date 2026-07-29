"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-bauhaus fixed top-4 right-4 z-50 grid size-11 place-items-center border-2 border-foreground bg-background text-foreground transition-colors hover:bg-foreground hover:text-background lg:top-6 lg:right-6"
      aria-label="Cambiar tema claro u oscuro"
      title="Cambiar tema"
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}
