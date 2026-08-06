import { describe, expect, it } from "vitest";
import { documentedCases } from "../app/lib/cases";
import { buildCaseMetadata } from "../app/lib/case-metadata";
import { SITE_URL } from "../app/config/site";

describe("buildCaseMetadata", () => {
  const caseWithImage = documentedCases.find((c) => c.image);
  const caseWithoutImage = documentedCases.find((c) => !c.image);

  it("nastaví title a description podle konkrétního případu", () => {
    const item = documentedCases[0];
    const metadata = buildCaseMetadata(item);

    expect(metadata.title).toBe(item.title);
    expect(metadata.description).toBe(item.summary);
  });

  it("canonical URL směřuje na /clanky/[slug] daného případu", () => {
    const item = documentedCases[0];
    const metadata = buildCaseMetadata(item);

    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/clanky/${item.slug}`);
  });

  it("Open Graph title/description/url odpovídají případu", () => {
    const item = documentedCases[0];
    const metadata = buildCaseMetadata(item);

    expect(metadata.openGraph?.title).toBe(item.title);
    expect(metadata.openGraph?.description).toBe(item.summary);
    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/clanky/${item.slug}`);
  });

  it("případ s obrázkem dostane Open Graph i Twitter obrázek a summary_large_image", () => {
    expect(caseWithImage).toBeDefined();
    if (!caseWithImage) return;

    const metadata = buildCaseMetadata(caseWithImage);
    const ogImages = metadata.openGraph && "images" in metadata.openGraph ? metadata.openGraph.images : undefined;

    expect(ogImages).toBeDefined();
    expect(JSON.stringify(ogImages)).toContain(caseWithImage.image!.src);
    expect((metadata.twitter as Record<string, unknown> | undefined)?.card).toBe("summary_large_image");
  });

  it("případ bez obrázku nevymýšlí Open Graph obrázek a používá summary", () => {
    expect(caseWithoutImage).toBeDefined();
    if (!caseWithoutImage) return;

    const metadata = buildCaseMetadata(caseWithoutImage);
    const ogImages = metadata.openGraph && "images" in metadata.openGraph ? metadata.openGraph.images : undefined;

    expect(ogImages).toBeUndefined();
    expect((metadata.twitter as Record<string, unknown> | undefined)?.card).toBe("summary");
  });
});
