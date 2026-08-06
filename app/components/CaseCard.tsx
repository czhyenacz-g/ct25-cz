import { DocumentedCase } from "../lib/cases";
import ImageWithLightbox from "./ImageWithLightbox";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("cs-CZ", { year: "numeric", month: "long", day: "numeric" });
}

export default function CaseCard({ item }: { item: DocumentedCase }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-5">
      <span className="mb-2 inline-block w-fit rounded bg-warn/20 px-2 py-1 text-xs font-medium text-warn">
        {item.manipulationType}
      </span>
      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
      {item.image && (
        <div className="mt-3">
          <ImageWithLightbox
            src={item.image.src}
            alt={item.image.alt}
            caption={item.image.caption}
            width={item.image.width}
            height={item.image.height}
          />
        </div>
      )}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-300">{item.summary}</p>
      <p className="mt-3 text-xs text-gray-500">Ověřeno: {formatDate(item.verifiedDate)}</p>
      <ul className="mt-2 space-y-1">
        {item.sources.map((source) => (
          <li key={source.url} className="text-sm">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-1 text-accent underline hover:brightness-110"
            >
              {source.publisher}: {source.label}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
