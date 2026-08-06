"use client";

import { useEffect, useRef, useState } from "react";
import { validatePhotoFile } from "../../lib/photo-validation";

/**
 * Čistě lokální výběr/náhled fotky — soubor se nikam neposílá (žádný
 * fetch/server action/API), jen se z něj přes URL.createObjectURL udělá
 * dočasný lokální náhled, který se při výměně souboru i unmountu uvolní
 * (revokeObjectURL). Žádné localStorage, žádná databáze, žádná analytika.
 */
export default function LocalPhotoPicker() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Uvolní object URL při výměně náhledu i při odchodu ze stránky.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    const validationError = validatePhotoFile(selected);
    if (validationError) {
      setError(validationError);
      setFile(null);
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return null;
      });
      return;
    }

    setError(null);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(selected);
    });
    setFile(selected);
  }

  function handleRemove() {
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <p className="font-semibold text-white">Vaše fotografie (nepovinné, jen pro tuto ukázku)</p>
      <p className="mt-1 text-sm text-gray-400">
        Fotografie zůstává pouze ve vašem zařízení. V této testovací verzi se nikam neodesílá.
      </p>

      {/* Vždy přítomný, jen vizuálně skrytý — "Vybrat jinou fotografii" ho spouští přes ref, ne nový <input>. */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Vybrat nebo vyfotit fotografii"
      />

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-warn">
          {error}
        </p>
      )}

      {!previewUrl ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 inline-block rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink hover:brightness-110"
        >
          Vybrat nebo vyfotit fotografii
        </button>
      ) : (
        <div className="mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- lokální blob: náhled, next/image ho neumí optimalizovat */}
          <img
            src={previewUrl}
            alt="Náhled vybrané fotografie"
            className="max-h-72 w-auto rounded-md border border-line object-contain"
          />
          {file && <p className="mt-2 text-sm text-gray-300">{file.name}</p>}
          <div className="mt-3 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-sm text-accent underline hover:brightness-110"
            >
              Vybrat jinou fotografii
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="text-sm text-gray-400 underline hover:text-white"
            >
              Odebrat fotografii
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
