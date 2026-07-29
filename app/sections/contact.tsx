import { ArrowUpRight } from "lucide-react";

import { ContactLinks } from "@/components/contact-links";
import { RevealSection } from "@/components/reveal-section";
import { profile } from "@/content/profile";

export function ContactSection() {
  return (
    <RevealSection
      id="contacto"
      aria-labelledby="contacto-title"
      className="relative overflow-hidden border-t-2 border-foreground bg-bauhaus-red px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="absolute -top-28 -right-28 size-80 rounded-full border-[4rem] border-bauhaus-yellow"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-24 w-24 bg-bauhaus-navy"
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="mb-5 inline-block bg-bauhaus-navy px-3 py-2 font-mono text-xs tracking-[0.3em] uppercase">
          06 · Contacto
        </p>
        <h2
          id="contacto-title"
          className="max-w-4xl font-display text-5xl leading-[0.85] uppercase sm:text-7xl lg:text-8xl"
        >
          Hablemos
          <ArrowUpRight className="ml-3 inline size-[0.75em]" aria-hidden="true" />
        </h2>
        <p className="mt-8 max-w-xl bg-bauhaus-navy p-4 text-lg leading-relaxed text-white">
          Desarrollo full-stack, modernización de aplicaciones y creación rápida de MVPs.
        </p>
        <ContactLinks className="mt-10 [&_a]:border-white [&_a]:bg-white [&_a]:text-bauhaus-ink [&_a]:hover:bg-bauhaus-yellow" />
        <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 bg-bauhaus-navy p-5 font-mono text-xs tracking-widest uppercase">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.location}</span>
        </footer>
      </div>
    </RevealSection>
  );
}
