import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import nl from "@/messages/nl.json";
import ar from "@/messages/ar.json";

const locales: Record<string, Record<string, unknown>> = { en, nl, ar };

function flatten(value: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === "object" && !Array.isArray(child)) {
      keys.push(...flatten(child as Record<string, unknown>, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

describe("message catalogue parity", () => {
  const enKeys = flatten(en).sort();

  it("has identical key sets across locales", () => {
    for (const [locale, messages] of Object.entries(locales)) {
      expect(flatten(messages).sort(), locale).toEqual(enKeys);
    }
  });

  it("has no empty message strings", () => {
    for (const [locale, messages] of Object.entries(locales)) {
      const stack: unknown[] = [messages];
      while (stack.length > 0) {
        const node = stack.pop();
        if (typeof node === "string") {
          expect(node.trim().length, `${locale} has an empty string`).toBeGreaterThan(
            0,
          );
        } else if (Array.isArray(node)) {
          stack.push(...node);
        } else if (node && typeof node === "object") {
          stack.push(...Object.values(node));
        }
      }
    }
  });
});
