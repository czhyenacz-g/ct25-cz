"use client";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { GOATCOUNTER_CODE } from "../../config/analytics";
import { useConsent } from "./ConsentProvider";

/** Načte analytické skripty jen po udělení souhlasu s analytickými cookies
 * v nastavení cookies (viz app/lib/consent.ts). Do té doby se nic z tohoto
 * načítá – ani Vercel Analytics, ani GoatCounter. */
export default function AnalyticsScripts() {
  const { consent } = useConsent();

  if (!consent.analytics) return null;

  return (
    <>
      <Analytics />
      {GOATCOUNTER_CODE && (
        <Script
          data-goatcounter={`https://${GOATCOUNTER_CODE}.goatcounter.com/count`}
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
