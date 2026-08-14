import PosterGrid from "./PosterGrid";
import type { PosterAsset } from "../../lib/posters";

export default function PosterGallerySection({
  id,
  title,
  images,
  emptyMessage,
  itemAltFallback,
}: {
  id: string;
  title: string;
  images: PosterAsset[];
  emptyMessage: string;
  itemAltFallback: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-2xl font-bold text-white">{title}</h2>

      {images.length > 0 ? (
        <div className="mt-6">
          <PosterGrid images={images} itemAltFallback={itemAltFallback} />
        </div>
      ) : (
        <p className="mt-6 rounded-lg border border-line bg-surface p-5 text-gray-400">{emptyMessage}</p>
      )}
    </section>
  );
}
