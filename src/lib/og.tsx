import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { products, site } from "./site";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";
export const ogAlt = `${site.name} — ${site.work.title} at ${site.work.company}. Home of Badgy, DocTick, Pepper and more.`;

// Fonts are read once at module scope; the assets don't depend on request data.
const [geistRegular, geistBold, geistMono] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Geist-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Geist-Bold.ttf")),
  readFile(join(process.cwd(), "assets/fonts/GeistMono-Regular.ttf")),
]);

const INK = "#e8eaed";
const MUTED = "#98a1ac";
const FAINT = "#5c6470";
const ACCENT = "#57e68b";
const EDGE = "#1b1f25";
const PANEL = "#0c0e11";

export function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#07080a",
          color: INK,
          fontFamily: "Geist",
          padding: "72px 80px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -300,
            right: -160,
            width: 760,
            height: 760,
            display: "flex",
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(87,230,139,0.22) 0%, rgba(87,230,139,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: 16,
                border: `2px solid ${EDGE}`,
                backgroundColor: PANEL,
                color: ACCENT,
                fontFamily: "Geist Mono",
                fontSize: 26,
              }}
            >
              {">_"}
            </div>
            <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "-1px" }}>
              {site.brand}
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 24, color: FAINT }}>
            {site.url.replace("https://", "")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 26, color: ACCENT }}>
            {"nimeet@nimhq:~$ whoami"}
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: "-3px", lineHeight: 1 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: MUTED }}>
            {`${site.work.title} at ${site.work.company} · building small, sharp tools`}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 22px",
                borderRadius: 9999,
                border: `2px solid ${EDGE}`,
                backgroundColor: PANEL,
                fontSize: 24,
                color: MUTED,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 14,
                  height: 14,
                  borderRadius: 9999,
                  backgroundColor: product.accent,
                }}
              />
              {product.name}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
        { name: "Geist", data: geistBold, weight: 700, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
      ],
    },
  );
}
