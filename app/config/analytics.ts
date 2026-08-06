// GoatCounter subdoména pro analytiku. Prázdné = analytika je vypnutá.
// I když je vyplněná, skript se v `app/components/consent/AnalyticsScripts.tsx`
// načte až po udělení souhlasu s analytickými cookies (viz app/lib/consent.ts).
export const GOATCOUNTER_CODE = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || "";

// Google AdSense — dvě nezávislé přepínače, úmyslně oddělené, aby pouhé
// propojení účtu nikdy samo o sobě nezapnulo skutečné reklamy:
//
// ADSENSE_ACCOUNT_CONNECTED: vyplněné client ID => načte se (po souhlasu
// s marketingovými cookies) jen ověřovací account script AdSense
// (app/components/ads/AdSenseAccountScript.tsx). Žádné reklamní jednotky.
//
// ADS_ENABLED: samostatný flag pro budoucí <ins class="adsbygoogle">
// jednotky v AdSlot.tsx — zůstává vypnutý, dokud nebudou existovat
// konkrétní slot ID pro jednotlivé pozice.
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";
export const ADSENSE_ACCOUNT_CONNECTED = Boolean(ADSENSE_CLIENT_ID);
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ADS_ENABLED === "true";
