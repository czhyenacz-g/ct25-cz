"use client";

import ImageWithLightbox from "../ImageWithLightbox";
import type { PosterAsset } from "../../lib/posters";

const RIGHTS_STATUS_LABELS: Record<string, string> = {
  third_party_unknown: "Obsahuje materiál třetí strany — licence CT25.cz se na něj nevztahuje.",
};

function dimensionsLabel(item: PosterAsset): string | undefined {
  return item.width && item.height ? `${item.width} × ${item.height} px` : undefined;
}

export default function PosterGrid({ images, itemAltFallback }: { images: PosterAsset[]; itemAltFallback: string }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((item) => (
        <div key={item.id}>
          <ImageWithLightbox
            src={item.url}
            alt={item.alt || itemAltFallback}
            width={item.width || 1000}
            height={item.height || 1000}
            className=""
            downloadUrl={item.url}
            dimensionsLabel={dimensionsLabel(item)}
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
      ))}
    </div>
  );
}
