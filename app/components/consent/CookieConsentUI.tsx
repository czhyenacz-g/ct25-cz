"use client";

import { useState } from "react";
import { useConsent } from "./ConsentProvider";

const CATEGORY_INFO = [
  {
    key: "necessary" as const,
    title: "Nezbytné",
    description: "Technicky nutné pro chod webu (např. uložení vaší volby cookies). Nelze vypnout.",
    locked: true,
  },
  {
    key: "analytics" as const,
    title: "Analytické",
    description: "Pomáhají pochopit návštěvnost webu. Zatím nejsou na webu aktivně nasazené žádné analytické skripty.",
    locked: false,
  },
  {
    key: "marketing" as const,
    title: "Marketingové",
    description: "Pro reklamu a její měření. Zatím nejsou na webu aktivně nasazené žádné reklamní skripty.",
    locked: false,
  },
];

export default function CookieConsentUI() {
  const { hasDecided, isSettingsOpen, openSettings, closeSettings, acceptAll, rejectAll, savePartial, consent } =
    useConsent();
  const [draftAnalytics, setDraftAnalytics] = useState(consent.analytics);
  const [draftMarketing, setDraftMarketing] = useState(consent.marketing);

  const showBanner = !hasDecided && !isSettingsOpen;
  const showSettings = isSettingsOpen;

  if (!showBanner && !showSettings) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4"
      role="region"
      aria-label="Nastavení cookies"
    >
      <div className="w-full max-w-2xl rounded-lg border border-line bg-surface p-5 shadow-2xl">
        {showSettings ? (
          <div>
            <h2 className="text-lg font-semibold text-white">Nastavení cookies</h2>
            <p className="mt-2 text-sm text-gray-300">
              Nezbytné cookies používáme vždy. Analytické a marketingové jsou zatím nevyužité, ale
              připravujeme pro ně možnost souhlasu do budoucna. Svou volbu můžete kdykoli změnit odkazem
              „Nastavení cookies“ v patičce webu.
            </p>
            <div className="mt-4 space-y-3">
              {CATEGORY_INFO.map((cat) => (
                <div key={cat.key} className="flex items-start justify-between gap-4 rounded-md border border-line/60 p-3">
                  <div>
                    <p className="font-medium text-white">{cat.title}</p>
                    <p className="text-sm text-gray-400">{cat.description}</p>
                  </div>
                  {cat.locked ? (
                    <span className="mt-1 shrink-0 rounded bg-line px-2 py-1 text-xs text-gray-300">Vždy zapnuto</span>
                  ) : (
                    <label className="mt-1 inline-flex shrink-0 cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-accent"
                        checked={cat.key === "analytics" ? draftAnalytics : draftMarketing}
                        onChange={(e) =>
                          cat.key === "analytics"
                            ? setDraftAnalytics(e.target.checked)
                            : setDraftMarketing(e.target.checked)
                        }
                        aria-label={`Povolit ${cat.title.toLowerCase()} cookies`}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => savePartial({ analytics: draftAnalytics, marketing: draftMarketing })}
                className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink hover:brightness-110"
              >
                Uložit nastavení
              </button>
              <button
                onClick={acceptAll}
                className="rounded-md border border-line px-4 py-2 text-sm text-white hover:bg-line/40"
              >
                Přijmout vše
              </button>
              <button
                onClick={rejectAll}
                className="rounded-md border border-line px-4 py-2 text-sm text-white hover:bg-line/40"
              >
                Odmítnout vše
              </button>
              {hasDecided && (
                <button onClick={closeSettings} className="ml-auto text-sm text-gray-400 hover:text-white">
                  Zavřít
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-200">
              Používáme jen technicky nezbytné cookies pro uložení vaší volby. Bez vašeho souhlasu nenačítáme
              žádnou analytiku ani reklamu.{" "}
              <a href="/cookies" className="underline hover:text-white">
                Více o cookies
              </a>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={openSettings}
                className="rounded-md border border-line px-3 py-2 text-sm text-white hover:bg-line/40"
              >
                Nastavení
              </button>
              <button
                onClick={rejectAll}
                className="rounded-md border border-line px-3 py-2 text-sm text-white hover:bg-line/40"
              >
                Odmítnout vše
              </button>
              <button
                onClick={acceptAll}
                className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-ink hover:brightness-110"
              >
                Přijmout vše
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
