// Snadno upravitelné seznamy domén pro vyhledávání se `site:` filtrem —
// jediné místo, kde je upravovat. Vědomě malé (ne desítky webů).
export const FACT_CHECK_SITES = ["demagog.cz", "cedmohub.eu", "factcheck.afp.com"];
export const TRUSTED_SOURCES = ["irozhlas.cz", "ct24.ceskatelevize.cz", "denikn.cz", "seznamzpravy.cz"];

const GOOGLE_SEARCH_BASE = "https://www.google.com/search";

function buildGoogleQueryUrl(query: string): string {
  return `${GOOGLE_SEARCH_BASE}?${new URLSearchParams({ q: query }).toString()}`;
}

function withSites(query: string, sites: string[]): string {
  const siteFilter = sites.map((site) => `site:${site}`).join(" OR ");
  return `${query} (${siteFilter})`;
}

export function buildGoogleSearchUrl(query: string): string {
  return buildGoogleQueryUrl(query);
}

/**
 * Google Fact Check Explorer nemá bez ověření živě v prohlížeči jistou
 * stabilní URL syntaxi pro přímé vyhledávání (zadání úkolu s touto
 * možností výslovně počítá) — použit je proto bezpečnější fallback:
 * Google dotaz omezený na několik konkrétních fact-check webů, které
 * projekt už jinde cituje jako zdroje (viz app/lib/cases.ts).
 */
export function buildFactCheckUrl(query: string): string {
  return buildGoogleQueryUrl(withSites(query, FACT_CHECK_SITES));
}

export function buildTrustedSourcesUrl(query: string): string {
  return buildGoogleQueryUrl(withSites(query, TRUSTED_SOURCES));
}

export function buildOriginalSourceUrl(query: string): string {
  return buildGoogleQueryUrl(`${query} zdroj dokument oficiální`);
}
