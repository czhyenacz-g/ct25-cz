import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import { documentedCases } from "../app/lib/cases";
import { SITE_URL } from "../app/config/site";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  it("obsahuje titulní stránku", () => {
    expect(urls).toContain(SITE_URL);
  });

  it("obsahuje URL pro každý dokumentovaný případ, odvozenou ze stejného zdroje dat", () => {
    for (const item of documentedCases) {
      expect(urls).toContain(`${SITE_URL}/clanky/${item.slug}`);
    }
  });

  it("nemá duplicitní URL", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("URL případů mají lastModified odvozené ze skutečného verifiedDate, ne vymyšlené", () => {
    for (const item of documentedCases) {
      const entry = entries.find((e) => e.url === `${SITE_URL}/clanky/${item.slug}`);
      expect(entry?.lastModified).toEqual(new Date(item.verifiedDate));
    }
  });
});
