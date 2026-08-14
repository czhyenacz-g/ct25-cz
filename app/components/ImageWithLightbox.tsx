"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ImageWithLightbox({
  src,
  alt,
  caption,
  width,
  height,
  className = "mb-4",
  downloadUrl,
  downloadLabel = "Stáhnout pro tisk",
  dimensionsLabel,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  className?: string;
  /** Když je zadané, zobrazí se odkaz ke stažení originálu u náhledu i ve fullscreenu. */
  downloadUrl?: string;
  downloadLabel?: string;
  /** Volitelný diskrétní údaj o rozměrech souboru (např. "2480 × 3508 px"). */
  dimensionsLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <figure className={className}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full overflow-hidden rounded-lg border border-line text-left"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 640px) 100vw, 480px"
          className="h-auto w-full"
        />
        <span className="block bg-ink/80 px-3 py-1.5 text-xs text-gray-300 group-hover:text-white">
          Kliknutím zvětšit
        </span>
      </button>
      {caption && <figcaption className="mt-1 text-xs text-gray-500">{caption}</figcaption>}

      {downloadUrl && (
        <div className="mt-2 flex items-center justify-between gap-2 text-xs">
          <a
            href={downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            {downloadLabel}
          </a>
          {dimensionsLabel && <span className="text-gray-500">{dimensionsLabel}</span>}
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Zavřít"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- fullscreen viewer needs viewport-relative object-fit sizing, not next/image's intrinsic layout */}
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          {downloadUrl && (
            <div
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/70 px-4 py-2 text-xs text-gray-200"
              onClick={(event) => event.stopPropagation()}
            >
              <a
                href={downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent hover:underline"
              >
                {downloadLabel}
              </a>
              {dimensionsLabel && <span>{dimensionsLabel}</span>}
            </div>
          )}
        </div>
      )}
    </figure>
  );
}
