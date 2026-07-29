import { Award, BookOpen, Languages } from "lucide-react";

import { RevealSection } from "@/components/reveal-section";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/content/profile";

export function EducationSection() {
  const education = profile.education[0];
  const certification = profile.certifications[0];

  return (
    <RevealSection
      id="formacion"
      aria-labelledby="formacion-title"
      className="section-shell overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 -z-10 h-48 w-48 rounded-tl-full bg-bauhaus-blue/10"
      />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          number="05"
          title="Formación & Idiomas"
          id="formacion-title"
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="border-2 border-foreground bg-background p-6 sm:p-8">
            <BookOpen className="mb-8 size-8 text-bauhaus-blue" aria-hidden="true" />
            <p className="type-label mb-3 text-muted-foreground">Educación</p>
            <h3 className="type-card-title mb-2">{education.school}</h3>
            <p>{education.degree}</p>
            <p className="mt-5 font-mono text-xs">
              {education.start} — {education.end}
            </p>
          </article>

          <article className="border-2 border-foreground bg-bauhaus-blue p-6 text-white sm:p-8">
            <Languages className="mb-8 size-8" aria-hidden="true" />
            <h3 className="type-card-title mb-6">Idiomas</h3>
            <ul className="flex flex-wrap gap-2">
              {profile.languages.map((language) => (
                <li
                  key={language.name}
                  className="border border-white px-3 py-2 font-mono text-xs tracking-wider uppercase"
                >
                  {language.isNative && (
                    <span
                      aria-hidden="true"
                      className="mr-2 inline-block size-2 rounded-full bg-bauhaus-yellow"
                    />
                  )}
                  {language.name}
                  {language.isNative ? " · nativo" : ""}
                </li>
              ))}
            </ul>
          </article>

          <article className="border-2 border-foreground bg-background p-6 sm:p-8">
            <Award className="mb-8 size-8 text-bauhaus-red" aria-hidden="true" />
            <p className="type-label mb-3 text-muted-foreground">Certificación</p>
            <h3 className="type-card-title">{certification.name}</h3>
            <p className="mt-2 font-semibold">{certification.issuer}</p>
            <dl className="mt-5 space-y-2 font-mono text-xs">
              <div>
                <dt className="inline text-muted-foreground">Emitida: </dt>
                <dd className="inline">enero 2022</dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">Credential ID: </dt>
                <dd className="inline">{certification.credentialId}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              {certification.associatedSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-bauhaus-yellow px-3 py-1.5 font-mono text-xs text-bauhaus-ink uppercase"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </RevealSection>
  );
}
