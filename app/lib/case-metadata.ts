import type { Metadata } from "next";
import { DocumentedCase } from "./cases";
import { SITE_NAME, SITE_URL } from "../config/site";

/**
 * Sdílené sestavení metadat pro /clanky/[slug] — jediné místo, které ví, jak
 * z jednoho DocumentedCase udělat title/description/canonical/OG/Twitter.
 * Použito v app/clanky/[slug]/page.tsx (generateMetadata), samostatně
 * testovatelné bez nutnosti renderovat Next.js route.
 */
export function buildCaseMetadata(item: DocumentedCase): Metadata {
  const url = `${SITE_URL}/clanky/${item.slug}`;
  const imageUrl = item.image ? `${SITE_URL}${item.image.src}` : undefined;

  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description: item.summary,
      url,
      siteName: SITE_NAME,
      locale: "cs_CZ",
      type: "article",
      ...(imageUrl && item.image
        ? { images: [{ url: imageUrl, width: item.image.width, height: item.image.height, alt: item.image.alt }] }
        : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: item.title,
      description: item.summary,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}
