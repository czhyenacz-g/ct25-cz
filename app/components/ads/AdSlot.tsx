import { ADS_ENABLED } from "../../config/analytics";
import { AD_DIMENSIONS, AdFormat, AdPlacement } from "./types";

/**
 * Jediné místo, které rozhoduje, co se v daném reklamním prostoru vykreslí.
 * Dokud nebude ADS_ENABLED (skutečné slot ID pro konkrétní pozice), v
 * produkci se nevykresluje vůbec nic — ve vývoji se ukáže placeholder se
 * stabilními rozměry, aby bylo vidět rozvržení bez layout shiftu. Nezávisí
 * na tom, zda je propojený AdSense účet (viz app/config/analytics.ts).
 */
export default function AdSlot({
  placement,
  format,
  className,
}: {
  placement: AdPlacement;
  format: AdFormat;
  className?: string;
}) {
  const isDev = process.env.NODE_ENV !== "production";
  const { width, height } = AD_DIMENSIONS[format];

  if (ADS_ENABLED) {
    // Budoucí: až bude nastavený reklamní poskytovatel a slot ID pro tento
    // placement, vykreslí se tady skutečná (souhlasem podmíněná) jednotka.
    return null;
  }

  if (!isDev) return null;

  return (
    <div
      className={`mx-auto flex items-center justify-center rounded border border-dashed border-line/70 bg-surface/40 text-center text-xs text-gray-500 ${className ?? ""}`}
      style={{ width: "100%", maxWidth: width, minHeight: height }}
      data-ad-placement={placement}
    >
      Reklamní prostor ({placement}) — vývojový placeholder, žádná síť zatím nasazena
    </div>
  );
}
