import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

/**
 * Site-wide Open Graph / Twitter card.
 *
 * Deliberately locale-agnostic and Latin-only: the brand wordmark is Latin,
 * and Arabic shaping is not supported by the image renderer's text engine.
 * Visitors still get locale-correct titles and descriptions in the markup.
 */
export const alt = `${siteConfig.name} · websites, customer journeys and automation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tagline = siteConfig.positioning.en;

const fontCache = new Map<string, ArrayBuffer | null>();

async function loadInter(text: string): Promise<ArrayBuffer | null> {
  if (fontCache.has(text)) return fontCache.get(text) ?? null;
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Inter:wght@600&text=${encodeURIComponent(text)}`,
      { cache: "force-cache" },
    ).then((response) => response.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) {
      fontCache.set(text, null);
      return null;
    }
    const data = await fetch(url, { cache: "force-cache" }).then((response) =>
      response.arrayBuffer(),
    );
    fontCache.set(text, data);
    return data;
  } catch {
    fontCache.set(text, null);
    return null;
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage() {
  const text = `${siteConfig.name}${tagline}`;
  const font = await loadInter(text);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171512",
          padding: "72px",
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#efe9df",
            fontSize: 34,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              display: "flex",
              width: 20,
              height: 20,
              borderRadius: 999,
              background: "#c9a24b",
            }}
          />
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            color: "#efe9df",
            fontSize: 66,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: "88%",
          }}
        >
          {tagline}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", width: 120, height: 4, background: "#c9a24b" }} />
          <div style={{ display: "flex", color: "#9a9187", fontSize: 28 }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Inter", data: font, weight: 600, style: "normal" }] : undefined },
  );
}
