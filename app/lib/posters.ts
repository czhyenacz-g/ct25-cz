// Server-only čtení whitelistovaných veřejných endpointů redakce
// ŠokujícíOdhalení (viz sokujici-redakce/docs/MEDIA_COLLECTIONS.md a
// docs/MEDIA_LIBRARY.md) — bez tokenu, jen pro explicitně vyjmenované
// kolekce/soubory. Nikdy nevolat z klientské komponenty.

const REDAKCE_BASE_URL = "https://redakce.sokujiciodhaleni.cz";

export interface PosterAsset {
  id: number;
  url: string;
  width: number | null;
  height: number | null;
  alt: string | null;
  caption: string | null;
  license: string | null;
  credit: string | null;
  rightsStatus: string | null;
}

interface RawPosterAsset {
  id: number;
  url: string;
  width: number | null;
  height: number | null;
  alt: string | null;
  caption: string | null;
  license: string | null;
  credit: string | null;
  rightsStatus: string | null;
}

function toAbsoluteUrl(url: string): string {
  return url.startsWith("http") ? url : `${REDAKCE_BASE_URL}${url}`;
}

function normalizeAsset(raw: RawPosterAsset): PosterAsset {
  return { ...raw, url: toAbsoluteUrl(raw.url) };
}

/** Obrázky whitelistované pracovní složky. Prázdné pole při chybě i prázdné kolekci — stránka se nikdy nerozbije. */
export async function getPosterCollection(slug: string): Promise<PosterAsset[]> {
  try {
    const response = await fetch(`${REDAKCE_BASE_URL}/api/public/media-collections/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];

    const json = await response.json();
    if (!Array.isArray(json?.data)) return [];

    return json.data.map(normalizeAsset);
  } catch {
    return [];
  }
}

/** Jednotlivé whitelistované médium podle původního jména souboru, nebo null. */
export async function getPosterByName(filename: string): Promise<PosterAsset | null> {
  try {
    const response = await fetch(`${REDAKCE_BASE_URL}/api/public/media/by-name/${encodeURIComponent(filename)}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;

    const json = await response.json();
    if (!json?.data) return null;

    return normalizeAsset(json.data);
  } catch {
    return null;
  }
}
