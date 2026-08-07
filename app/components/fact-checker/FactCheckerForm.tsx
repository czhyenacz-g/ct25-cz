"use client";

import { useState } from "react";
import {
  buildGoogleSearchUrl,
  buildFactCheckUrl,
  buildTrustedSourcesUrl,
  buildOriginalSourceUrl,
} from "../../lib/fact-checker";

const OPTIONS = [
  { label: "Vyhledat na Googlu", build: buildGoogleSearchUrl },
  { label: "Hledat fact-checky", build: buildFactCheckUrl },
  { label: "Hledat v důvěryhodných zdrojích", build: buildTrustedSourcesUrl },
  { label: "Hledat původní zdroj", build: buildOriginalSourceUrl },
];

/**
 * Tvrzení žije jen v lokálním React stavu prohlížeče — nikdy se
 * neposílá na backend ct25.cz ani nikam neukládá (žádný fetch, žádné
 * localStorage). Prázdný/whitespace-only vstup nesmí odkazy aktivovat:
 * dokud `hasClaim` není true, možnosti se vykreslí jako <button disabled>
 * bez href, ne jako "neaktivní vypadající" odkaz.
 */
export default function FactCheckerForm() {
  const [claim, setClaim] = useState("");
  const trimmed = claim.trim();
  const hasClaim = trimmed.length > 0;

  return (
    <div>
      <label htmlFor="claim" className="block text-sm font-semibold text-white">
        Tvrzení k prověření
      </label>
      <input
        id="claim"
        type="text"
        value={claim}
        onChange={(event) => setClaim(event.target.value)}
        placeholder="Byl Babiš v KGB?"
        className="mt-2 w-full rounded-md border border-line bg-ink px-4 py-3 text-base text-white placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {OPTIONS.map((option) =>
          hasClaim ? (
            <a
              key={option.label}
              href={option.build(trimmed)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line bg-surface px-4 py-3 text-center text-sm font-semibold text-white hover:border-accent/60 hover:text-accent"
            >
              {option.label}
            </a>
          ) : (
            <button
              key={option.label}
              type="button"
              disabled
              className="cursor-not-allowed rounded-md border border-line bg-surface px-4 py-3 text-center text-sm font-medium text-gray-500"
            >
              {option.label}
            </button>
          )
        )}
      </div>

      <div className="mt-8 rounded-lg border border-line bg-surface p-5">
        <p className="font-bold text-white">Minimum hotovo</p>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">
          Výsledky vyhledávání samy o sobě nedokazují, že je tvrzení pravdivé nebo nepravdivé.
          Zkontrolujte původ informace, datum, autora a zda tvrzení potvrzuje více nezávislých
          zdrojů.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Zadané tvrzení se na ct25.cz neukládá. Otevře se pouze jako vyhledávací dotaz ve zvolené
          externí službě.
        </p>
      </div>
    </div>
  );
}
