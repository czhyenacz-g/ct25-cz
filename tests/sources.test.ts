import { describe, expect, it } from "vitest";
import { sourceCategories } from "../app/lib/sources";
import sitemap from "../app/sitemap";
import { SITE_URL } from "../app/config/site";

describe("sourceCategories", () => {
  it("obsahuje alespoň jednu kategorii", () => {
    expect(sourceCategories.length).toBeGreaterThan(0);
  });

  it("každá kategorie má alespoň jednu položku", () => {
    for (const category of sourceCategories) {
      expect(category.items.length).toBeGreaterThan(0);
    }
  });

  it("každá položka má platnou URL a neprázdný název i popis", () => {
    for (const category of sourceCategories) {
      for (const item of category.items) {
        expect(() => new URL(item.url)).not.toThrow();
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.description.length).toBeGreaterThan(0);
      }
    }
  });

  it("URL adresy jsou napříč kategoriemi unikátní", () => {
    const urls = sourceCategories.flatMap((category) => category.items.map((item) => item.url));
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("/zdroje v sitemapě", () => {
  it("sitemapa obsahuje /zdroje", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${SITE_URL}/zdroje`);
  });
});
