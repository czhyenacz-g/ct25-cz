import Image from "next/image";
import Link from "next/link";
import type { PosterAsset } from "../../lib/posters";

export default function PostersBanner({ image }: { image: PosterAsset | null }) {
  if (!image) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <Link
        href="/posters"
        className="group flex items-center gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:gap-6 sm:p-5"
      >
        <Image
          src={image.url}
          alt={image.alt || "Plakáty a nálepky CT25.cz ke stažení"}
          width={image.width || 400}
          height={image.height || 400}
          className="h-20 w-20 shrink-0 rounded-md border border-line object-contain sm:h-28 sm:w-28"
        />
        <div className="min-w-0">
          <p className="text-lg font-bold text-white sm:text-xl">Plakáty a nálepky zdarma</p>
          <p className="mt-1 text-sm text-gray-300 sm:text-base">
            Stáhněte si materiály CT25.cz, vytiskněte je nebo je sdílejte dál.
          </p>
          <p className="mt-2 text-sm font-semibold text-accent">Zobrazit materiály →</p>
        </div>
      </Link>
    </div>
  );
}
