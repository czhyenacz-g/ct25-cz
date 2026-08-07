import { describe, expect, it } from "vitest";
import { metadata } from "../app/fact-checker/page";
import { SITE_URL } from "../app/config/site";
import { NAV_LINKS, FOOTER_LEGAL_LINKS } from "../app/config/site";
import sitemap from "../app/sitemap";

describe("/fact-checker metadata", () => {
  it("má vlastní title a description", () => {
    expect(typeof metadata.title).toBe("string");
    expect((metadata.title as string).length).toBeGreaterThan(0);
    expect(metadata.description?.length).toBeGreaterThan(0);
  });

  it("canonical směřuje na https://ct25.cz/fact-checker", () => {
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/fact-checker`);
  });

  it("nenastavuje noindex — je to veřejná, indexovatelná stránka (na rozdíl od /ai-fotka)", () => {
    expect(metadata.robots).toBeUndefined();
  });
});

describe("/fact-checker v sitemap", () => {
  it("sitemapa obsahuje /fact-checker jako veřejnou URL", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${SITE_URL}/fact-checker`);
  });
});

// Task "Sloučení kontaktu a zapojení Fact-checkeru" zapojil /fact-checker
// do hlavního menu (viz tests/kontakt-merge.test.ts) — nahrazuje dřívější
// "zatím není odkázaná" stav z prvního nasazení stránky.
describe("/fact-checker je zapojená do hlavního menu, ne do patičky", () => {
  it("je v hlavním menu", () => {
    expect(NAV_LINKS.some((link) => link.href.includes("fact-checker"))).toBe(true);
  });

  it("není v patičce", () => {
    expect(FOOTER_LEGAL_LINKS.some((link) => link.href.includes("fact-checker"))).toBe(false);
  });
});
