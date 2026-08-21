import { NextRequest, NextResponse } from "next/server";
import { getPosterCollection } from "../../../lib/posters";
import { STICKERS_COLLECTION_SLUG, POSTERS_COLLECTION_SLUG } from "../../../config/posters";

/**
 * Same-origin proxy pro whitelistované plakáty/nálepky (viz
 * app/lib/posters.ts) — jediný důvod, proč existuje, je aby se v adresním
 * řádku/odkazu ke stažení/sdílení zobrazovalo ct25.cz, ne
 * redakce.sokujiciodhaleni.cz. Záměrně NENÍ obecný obrázkový proxy: slouží
 * jen ID, která jsou skutečně v jedné ze dvou whitelistovaných kolekcí —
 * jinak 404, aby se z toho nestal otevřený relay na libovolnou URL.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const posterId = Number(id);

  if (!Number.isInteger(posterId)) {
    return new NextResponse(null, { status: 404 });
  }

  const [stickers, posters] = await Promise.all([
    getPosterCollection(STICKERS_COLLECTION_SLUG),
    getPosterCollection(POSTERS_COLLECTION_SLUG),
  ]);

  const asset = [...stickers, ...posters].find((item) => item.id === posterId);
  if (!asset) {
    return new NextResponse(null, { status: 404 });
  }

  const upstream = await fetch(asset.url, { next: { revalidate: 3600 } });
  if (!upstream.ok || !upstream.body) {
    return new NextResponse(null, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "image/webp",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
