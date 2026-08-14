import { afterEach, describe, expect, it, vi } from "vitest";
import { getPosterByName, getPosterCollection } from "../app/lib/posters";

function jsonResponse(body: unknown, ok = true) {
  return {
    ok,
    json: async () => body,
  } as Response;
}

describe("getPosterCollection", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("normalizuje relativní URL na absolutní adresu redakce", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          data: [
            {
              id: 1,
              url: "/media/articles/2026/08/x.webp",
              width: 100,
              height: 200,
              alt: null,
              caption: null,
              license: null,
              credit: null,
              rightsStatus: null,
            },
          ],
        })
      )
    );

    const result = await getPosterCollection("ct25cz-nalepky");

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://redakce.sokujiciodhaleni.cz/media/articles/2026/08/x.webp");
  });

  it("vrací prázdné pole při chybové odpovědi, stránka se nerozbije", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ message: "Kolekce nenalezena." }, false)));

    const result = await getPosterCollection("neexistujici");

    expect(result).toEqual([]);
  });

  it("vrací prázdné pole při síťové chybě, stránka se nerozbije", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down"))
    );

    const result = await getPosterCollection("ct25cz-plakaty");

    expect(result).toEqual([]);
  });

  it("vrací prázdné pole, pokud odpověď nemá pole data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ data: null })));

    const result = await getPosterCollection("ct25cz-nalepky");

    expect(result).toEqual([]);
  });
});

describe("getPosterByName", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("normalizuje relativní URL na absolutní adresu redakce", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          data: {
            id: 13,
            url: "/media/articles/2026/08/y.webp",
            width: 362,
            height: 352,
            alt: null,
            caption: null,
            license: null,
            credit: null,
            rightsStatus: null,
          },
        })
      )
    );

    const result = await getPosterByName("dluzena_small.png");

    expect(result?.url).toBe("https://redakce.sokujiciodhaleni.cz/media/articles/2026/08/y.webp");
  });

  it("vrací null, pokud médium neexistuje", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ data: null })));

    const result = await getPosterByName("dluzena_small.png");

    expect(result).toBeNull();
  });

  it("vrací null při chybové odpovědi, stránka se nerozbije", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ message: "Médium nenalezeno." }, false)));

    const result = await getPosterByName("neznamy.png");

    expect(result).toBeNull();
  });

  it("vrací null při síťové chybě, stránka se nerozbije", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const result = await getPosterByName("dluzena_small.png");

    expect(result).toBeNull();
  });
});
