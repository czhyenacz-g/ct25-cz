"use client";

import { useConsent } from "./ConsentProvider";

export default function CookieSettingsButton() {
  const { openSettings } = useConsent();
  return (
    <button onClick={openSettings} className="underline hover:text-white">
      Nastavení cookies
    </button>
  );
}
