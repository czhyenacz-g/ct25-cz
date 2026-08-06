"use client";

import AdSenseAccountScript from "../ads/AdSenseAccountScript";
import { useConsent } from "./ConsentProvider";

/** Načte marketingové skripty (zatím jen AdSense account script) výhradně
 * po souhlasu s marketingovými cookies. Bez souhlasu se nic z tohoto
 * nenačítá – viz app/lib/consent.ts. */
export default function MarketingScripts() {
  const { consent } = useConsent();

  if (!consent.marketing) return null;

  return <AdSenseAccountScript />;
}
