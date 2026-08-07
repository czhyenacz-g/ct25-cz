import { describe, expect, it } from "vitest";
import {
  buildGoogleSearchUrl,
  buildFactCheckUrl,
  buildTrustedSourcesUrl,
  buildOriginalSourceUrl,
  FACT_CHECK_SITES,
  TRUSTED_SOURCES,
} from "../app/lib/fact-checker";

const BUILDERS = {
  buildGoogleSearchUrl,
  buildFactCheckUrl,
  buildTrustedSourcesUrl,
  buildOriginalSourceUrl,
};

// new URL(url).search je syrový query string ("+" pro mezery) — správné
// dekódování jde jen přes URLSearchParams, ne ruční decodeURIComponent
// (ten "+" nepřevádí zpět na mezeru).
function decodedQuery(url: string): string {
  return new URL(url).searchParams.get("q") ?? "";
}

describe.each(Object.entries(BUILDERS))("%s", (name, build) => {
  it("vrací platnou absolutní URL na google.com/search", () => {
    const url = build("test");
    expect(() => new URL(url)).not.toThrow();
    expect(new URL(url).hostname).toBe("www.google.com");
    expect(new URL(url).pathname).toBe("/search");
  });

  it("správně zakóduje české znaky a mezery", () => {
    const url = build("Byl Babiš v KGB?");
    expect(decodedQuery(url)).toContain("Byl Babiš v KGB?");
    expect(url).not.toContain("Babiš"); // musí být zakódované, ne syrové v URL
  });

  it("správně zakóduje uvozovky a speciální znaky", () => {
    const url = build('Tvrzení "s uvozovkami" & <script>alert(1)</script>');
    const decoded = decodedQuery(url);
    expect(decoded).toContain('"s uvozovkami"');
    expect(decoded).toContain("<script>");
    // syrové < > nesmí skončit nezakódované v samotné URL
    expect(url).not.toMatch(/[<>]/);
  });

  it("nevyhodí chybu na prázdný vstup a pořád vrátí platnou URL", () => {
    expect(() => build("")).not.toThrow();
    expect(() => new URL(build(""))).not.toThrow();
  });

  it("nevyhodí chybu na vstup jen s bílými znaky", () => {
    expect(() => new URL(build("   "))).not.toThrow();
  });
});

describe("buildFactCheckUrl", () => {
  it("omezuje dotaz na malý explicitní seznam fact-check webů přes site:", () => {
    const decoded = decodedQuery(buildFactCheckUrl("test"));
    for (const site of FACT_CHECK_SITES) {
      expect(decoded).toContain(`site:${site}`);
    }
  });
});

describe("buildTrustedSourcesUrl", () => {
  it("omezuje dotaz na malý explicitní seznam důvěryhodných zdrojů přes site:", () => {
    const decoded = decodedQuery(buildTrustedSourcesUrl("test"));
    for (const site of TRUSTED_SOURCES) {
      expect(decoded).toContain(`site:${site}`);
    }
  });

  it("seznam zdrojů je vědomě malý, ne desítky webů", () => {
    expect(TRUSTED_SOURCES.length).toBeLessThan(10);
    expect(FACT_CHECK_SITES.length).toBeLessThan(10);
  });
});

describe("buildOriginalSourceUrl", () => {
  it("doplní dotaz o výrazy zdroj/dokument/oficiální", () => {
    const decoded = decodedQuery(buildOriginalSourceUrl("test"));
    expect(decoded).toContain("zdroj");
    expect(decoded).toContain("dokument");
    expect(decoded).toContain("oficiální");
  });
});
