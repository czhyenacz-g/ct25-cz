import Image from "next/image";

export interface AffiliateBannerProps {
  href: string;
  imageUrl: string;
  imageAlt: string;
  width: number;
  height: number;
  label?: string;
}

/**
 * Klikací affiliate kreativa v přirozeném poměru stran — CTA je součástí
 * obrázku, žádné další tlačítko přes něj. `rel="sponsored"` navíc k
 * obvyklému `noopener noreferrer`, protože jde o placený/affiliate odkaz.
 */
export default function AffiliateBanner({
  href,
  imageUrl,
  imageAlt,
  width,
  height,
  label = "Reklama",
}: AffiliateBannerProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="block overflow-hidden rounded-lg border border-line transition-opacity hover:opacity-95"
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="h-auto w-full"
        />
      </a>
    </div>
  );
}
