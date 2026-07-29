import type { Metadata } from "next";
import { Archivo_Black, Inter, Space_Mono } from "next/font/google";

import { profile } from "@/content/profile";
import "./globals.css";

const display = Archivo_Black({
  weight: "400",
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://albertogandarillas.com"),
  title: `${profile.name} — ${profile.headline}`,
  description:
    "Desarrollador Full-Stack con más de 15 años de experiencia en React, Next.js, C# y desarrollo potenciado por IA.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "es_PE",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} — ${profile.headline}`,
    description:
      "Más de 15 años creando aplicaciones web modernas con React, Next.js, C# e IA.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.headline}`,
    description:
      "Desarrollo full-stack moderno, modernización de aplicaciones y MVPs potenciados por IA.",
  },
};

const themeScript = `
  try {
    const stored = localStorage.getItem("theme");
    const dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch {}
`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
  address: {
    "@type": "PostalAddress",
    addressCountry: "PE",
  },
  email: `mailto:${profile.email}`,
  sameAs: [profile.links.linkedin, profile.links.github],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.education[0].school,
  },
  worksFor: [
    { "@type": "Organization", name: profile.experience[0].company },
    { "@type": "Organization", name: profile.experience[1].company },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
