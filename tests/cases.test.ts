import { describe, expect, it } from "vitest";
import { documentedCases } from "../app/lib/cases";

describe("documentedCases", () => {
  it("obsahuje alespoň jeden případ", () => {
    expect(documentedCases.length).toBeGreaterThan(0);
  });

  it("každý případ má unikátní slug", () => {
    const slugs = documentedCases.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("každý případ má alespoň jeden zdroj s platnou URL", () => {
    for (const item of documentedCases) {
      expect(item.sources.length).toBeGreaterThan(0);
      for (const source of item.sources) {
        expect(() => new URL(source.url)).not.toThrow();
        expect(source.publisher.length).toBeGreaterThan(0);
      }
    }
  });

  it("každý případ má vyplněné datum ověření ve formátu YYYY-MM-DD", () => {
    for (const item of documentedCases) {
      expect(item.verifiedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
