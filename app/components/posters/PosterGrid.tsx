"use client";

import ImageWithLightbox from "../ImageWithLightbox";
import type { PosterAsset } from "../../lib/posters";

const RIGHTS_STATUS_LABELS: Record<string, string> = {
  third_party_unknown: "Obsahuje materiál třetí strany — licence CT25.cz se na něj nevztahuje.",
};

function dimensionsLabel(item: PosterAsset): string | undefined {
  return item.width && item.height ? `${item.width} × ${item.height} px` : undefined;
}

// Skutečná šířka jedné dlaždice v gridu (grid-cols-2/3/4, gap-4 = 16px),
// uvnitř DVOU vnořených "mx-auto max-w-5xl px-4" kontejnerů — app/posters/page.tsx
// (outer) i PosterGallerySection.tsx (section, svůj max-w-5xl je uvnitř
// outer kontejneru neúčinný, ale px-4 se sčítá) — tedy 64px vodorovného
// paddingu celkem, ne 32px. Přes lg (≥1024px) je obsah navíc capnutý na
// 1024px (max-w-5xl), takže dlaždice tam přestává růst s viewportem a
// je to PEVNÝCH 228px, ne vw-based hodnota (jinak by Next.js na širokých
// monitorech zbytečně vytahoval větší varianty, než se reálně vykreslí):
//   mobil (<640px, 2 sloupce):  (100vw - 64px - 16px) / 2  = 50vw - 40px
//   sm–lg (640–1023px, 3 sloupce): (100vw - 64px - 32px) / 3 = 33.333vw - 32px
//   lg+ (≥1024px, 4 sloupce, capped): (1024 - 64 - 48) / 4 = 228px
const POSTER_GRID_IMAGE_SIZES = "(min-width: 1024px) 228px, (min-width: 640px) calc(33.333vw - 32px), calc(50vw - 40px)";

export default function PosterGrid({ images, itemAltFallback }: { images: PosterAsset[]; itemAltFallback: string }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((item) => {
        // Same-origin proxy (viz app/api/poster-image/[id]) — v adresním
        // řádku i v "kopírovat odkaz na obrázek" se má zobrazovat ct25.cz,
        // ne redakce.sokujiciodhaleni.cz.
        const proxiedUrl = `/api/poster-image/${item.id}`;

        return (
          <div key={item.id}>
            <ImageWithLightbox
              src={proxiedUrl}
              alt={item.alt || itemAltFallback}
              width={item.width || 1000}
              height={item.height || 1000}
              className=""
              downloadUrl={proxiedUrl}
              dimensionsLabel={dimensionsLabel(item)}
              sizes={POSTER_GRID_IMAGE_SIZES}
            />
            {(item.license || item.credit || item.rightsStatus) && (
              <div className="mt-1 space-y-0.5 text-[11px] leading-snug text-gray-500">
                {item.rightsStatus && RIGHTS_STATUS_LABELS[item.rightsStatus] && (
                  <p className="text-warn/90">{RIGHTS_STATUS_LABELS[item.rightsStatus]}</p>
                )}
                {item.license && <p>Licence: {item.license}</p>}
                {item.credit && <p>Autor/zdroj: {item.credit}</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
