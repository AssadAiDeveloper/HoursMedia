import { describe, expect, it } from "vitest";
import { en } from "./en";
import { nl } from "./nl";
import { ar } from "./ar";
import type { LocaleContent } from "./types";

const locales: Record<string, LocaleContent> = { en, nl, ar };

const PLACEHOLDER_PATTERNS = [
  /lorem ipsum/i,
  /\bTODO\b/,
  /\bTBD\b/,
  /placeholder text/i,
  /\bXXX\b/,
  /\[\s*insert/i,
];

function collectStrings(content: LocaleContent): string[] {
  const out: string[] = [];
  const visit = (value: unknown) => {
    if (typeof value === "string") out.push(value);
    else if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === "object")
      Object.values(value).forEach(visit);
  };
  visit(content);
  return out;
}

describe("locale content parity", () => {
  it("exposes the same service ids in every locale", () => {
    const enIds = Object.keys(en.services).sort();
    for (const [locale, content] of Object.entries(locales)) {
      expect(Object.keys(content.services).sort(), locale).toEqual(enIds);
    }
  });

  it("shares project slugs across locales", () => {
    const enSlugs = en.projects.map((project) => project.slug).sort();
    for (const [locale, content] of Object.entries(locales)) {
      expect(content.projects.map((project) => project.slug).sort(), locale).toEqual(
        enSlugs,
      );
    }
  });

  it("shares article slugs across locales", () => {
    const enSlugs = en.articles.map((article) => article.slug).sort();
    for (const [locale, content] of Object.entries(locales)) {
      expect(
        content.articles.map((article) => article.slug).sort(),
        locale,
      ).toEqual(enSlugs);
    }
  });

  it("defines all three legal documents in every locale", () => {
    for (const [locale, content] of Object.entries(locales)) {
      for (const key of ["privacy", "cookies", "terms"] as const) {
        expect(content.legal[key].sections.length, `${locale}.${key}`).toBeGreaterThan(
          0,
        );
        expect(typeof content.legal[key].reviewed, locale).toBe("boolean");
      }
    }
  });

  it("contains no placeholder markers", () => {
    for (const [locale, content] of Object.entries(locales)) {
      for (const text of collectStrings(content)) {
        for (const pattern of PLACEHOLDER_PATTERNS) {
          expect(pattern.test(text), `${locale}: "${text}"`).toBe(false);
        }
      }
    }
  });

  it("keeps legal documents unpublished until reviewed", () => {
    for (const content of Object.values(locales)) {
      for (const key of ["privacy", "cookies", "terms"] as const) {
        expect(content.legal[key].reviewed).toBe(false);
      }
    }
  });
});
