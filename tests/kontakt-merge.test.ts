import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";
import { NAV_LINKS, FOOTER_LEGAL_LINKS, SITE_URL } from "../app/config/site";
import sitemap from "../app/sitemap";

describe("/kontakt zrušen jako samostatná stránka", () => {
  it("app/kontakt/page.tsx už neexistuje", () => {
    expect(() => readFileSync(join(__dirname, "../app/kontakt/page.tsx"))).toThrow();
  });

  it("/kontakt permanentně redirectuje (next.config redirects)", async () => {
    const redirects = await nextConfig.redirects!();
    const kontaktRedirect = redirects.find((r) => r.source === "/kontakt");

    expect(kontaktRedirect).toBeDefined();
    expect(kontaktRedirect?.permanent).toBe(true);
    expect(kontaktRedirect?.destination).toBe("/o-projektu");
  });
});

describe("/o-projektu obsahuje kontaktní sekci", () => {
  const source = readFileSync(join(__dirname, "../app/o-projektu/page.tsx"), "utf-8");

  it("má sekci s id=\"kontakt\"", () => {
    expect(source).toMatch(/id="kontakt"/);
  });

  it("obsahuje jméno a e-mail kontaktu", () => {
    expect(source).toMatch(/SUPPORTER_CONTACT_NAME/);
    expect(source).toMatch(/SUPPORTER_CONTACT_EMAIL/);
  });
});

describe("hlavní menu", () => {
  it("obsahuje Fact-checker", () => {
    expect(NAV_LINKS.some((link) => link.href === "/fact-checker" && link.label === "Fact-checker")).toBe(true);
  });

  it("neobsahuje samostatnou položku Kontakt", () => {
    // `NAV_LINKS` je `as const` — TS by porovnání s odstraněným literálem
    // odmítl jako "no overlap" (to je vlastně žádoucí signál), proto String().
    expect(NAV_LINKS.some((link) => String(link.label) === "Kontakt")).toBe(false);
    expect(NAV_LINKS.some((link) => String(link.href) === "/kontakt")).toBe(false);
  });
});

describe("patička", () => {
  it("odkaz Kontakt v patičce směřuje na /o-projektu#kontakt, ne na starou URL", () => {
    const footerContact = FOOTER_LEGAL_LINKS.find((link) => link.label === "Kontakt");
    expect(footerContact?.href).toBe("/o-projektu#kontakt");
  });
});

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("obsahuje /, /o-projektu a /fact-checker", () => {
    expect(urls).toContain(SITE_URL);
    expect(urls).toContain(`${SITE_URL}/o-projektu`);
    expect(urls).toContain(`${SITE_URL}/fact-checker`);
  });

  it("neobsahuje /kontakt", () => {
    expect(urls.some((url) => url.endsWith("/kontakt"))).toBe(false);
  });
});

describe("interní odkazy na starý /kontakt jsou opravené", () => {
  const filesToCheck = [
    "app/poslat-podnet/page.tsx",
    "app/pravni-upozorneni/page.tsx",
    "app/ochrana-soukromi/page.tsx",
    "app/o-projektu/page.tsx",
  ];

  it.each(filesToCheck)("%s neobsahuje href=\"/kontakt\"", (relativePath) => {
    const source = readFileSync(join(__dirname, "..", relativePath), "utf-8");
    expect(source).not.toMatch(/href="\/kontakt"/);
  });
});

describe("homepage: karta 'Použijte fact-checking'", () => {
  const source = readFileSync(join(__dirname, "../app/components/HomeContent.tsx"), "utf-8");

  it("vede na /fact-checker", () => {
    expect(source).toMatch(/href:\s*"\/fact-checker"/);
  });

  it("používá next/link Link, ne vnořený interaktivní prvek uvnitř karty", () => {
    expect(source).toContain("import Link from \"next/link\"");
  });
});
