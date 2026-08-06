import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { metadata } from "../app/ai-fotka/page";
import { SITE_URL } from "../app/config/site";
import sitemap from "../app/sitemap";
import { photoTemplates, aiDemoImage } from "../app/lib/ai-photo-templates";

describe("/ai-fotka metadata", () => {
  it("má noindex, nofollow", () => {
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("canonical směřuje na https://ct25.cz/ai-fotka", () => {
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/ai-fotka`);
  });

  it("má vlastní title a description", () => {
    expect(typeof metadata.title).toBe("string");
    expect((metadata.title as string).length).toBeGreaterThan(0);
    expect(metadata.description?.length).toBeGreaterThan(0);
  });
});

describe("/ai-fotka mimo sitemap", () => {
  it("sitemapa neobsahuje /ai-fotka", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.includes("/ai-fotka"))).toBe(false);
  });
});

describe("photoTemplates", () => {
  it("obsahuje právě dvě předlohy pavelplus a putinplus", () => {
    expect(photoTemplates.map((t) => t.id).sort()).toEqual(["pavelplus", "putinplus"]);
  });

  it("každá předloha má platnou absolutní URL na existující Knihovnu médií, ne lokální kopii", () => {
    for (const template of photoTemplates) {
      expect(() => new URL(template.imageUrl)).not.toThrow();
      expect(template.imageUrl).toMatch(/^https:\/\/redakce\.sokujiciodhaleni\.cz\//);
    }
  });

  it("každá předloha má rozměry pro next/image bez deformace", () => {
    for (const template of photoTemplates) {
      expect(template.width).toBeGreaterThan(0);
      expect(template.height).toBeGreaterThan(0);
    }
  });
});

describe("aiDemoImage (zelensky-putin)", () => {
  it("má platnou absolutní URL na existující Knihovnu médií, ne lokální kopii", () => {
    expect(() => new URL(aiDemoImage.imageUrl)).not.toThrow();
    expect(aiDemoImage.imageUrl).toMatch(/^https:\/\/redakce\.sokujiciodhaleni\.cz\//);
  });

  it("alt text jednoznačně označuje obrázek jako AI fikci", () => {
    expect(aiDemoImage.alt.toLowerCase()).toMatch(/ai|fiktivní/);
  });

  it("má rozměry pro next/image bez deformace", () => {
    expect(aiDemoImage.width).toBeGreaterThan(0);
    expect(aiDemoImage.height).toBeGreaterThan(0);
  });
});

describe("/ai-fotka stránka nevykresluje upload fotografie", () => {
  const pageSource = readFileSync(join(__dirname, "../app/ai-fotka/page.tsx"), "utf-8");

  it("neimportuje ani nepoužívá LocalPhotoPicker", () => {
    expect(pageSource).not.toMatch(/LocalPhotoPicker/);
  });

  it("neobsahuje nefunkční tlačítko pro generování", () => {
    expect(pageSource).not.toMatch(/Generování bude doplněno později/);
  });

  it("obsahuje jasné označení výsledků jako AI fikce", () => {
    expect(pageSource).toMatch(/fikce/i);
  });
});

describe("LocalPhotoPicker zůstává v projektu jako znovupoužitelná komponenta", () => {
  it("soubor stále existuje, jen se nikde nepoužívá na /ai-fotka", () => {
    const source = readFileSync(
      join(__dirname, "../app/components/ai-photo/LocalPhotoPicker.tsx"),
      "utf-8"
    );
    expect(source).toContain("export default function LocalPhotoPicker");
  });
});
