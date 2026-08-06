// GoatCounter subdoména pro analytiku. Prázdné = analytika je vypnutá.
// I když je vyplněná, skript se v `app/components/consent/AnalyticsScripts.tsx`
// načte až po udělení souhlasu s analytickými cookies (viz app/lib/consent.ts).
export const GOATCOUNTER_CODE = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || "";

// Zatím žádný reklamní poskytovatel není nakonfigurovaný — AdSlot proto
// v produkci nevykresluje nic. Viz app/components/ads/AdSlot.tsx.
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";
export const ADS_ENABLED = Boolean(ADSENSE_CLIENT_ID);
