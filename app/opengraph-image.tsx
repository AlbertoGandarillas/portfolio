import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 88px",
          background: "#efe7d6",
          color: "#161311",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-110px",
            right: "-70px",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            background: "#1f4ea1",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "180px",
            bottom: "-150px",
            width: "300px",
            height: "300px",
            borderRadius: "999px",
            border: "70px solid #f2b417",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "90px",
            height: "190px",
            background: "#e2361f",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          Portfolio · Perú
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 850,
            fontSize: 88,
            lineHeight: 0.88,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.06em",
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          {profile.headline} · React · Next.js · C# · IA
        </div>
      </div>
    ),
    size
  );
}
