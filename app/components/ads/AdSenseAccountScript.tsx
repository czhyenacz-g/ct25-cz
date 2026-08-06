import Script from "next/script";
import { ADSENSE_ACCOUNT_CONNECTED, ADSENSE_CLIENT_ID } from "../../config/analytics";

/**
 * Pouze propojení účtu s Google AdSense (ověření vlastnictví domény) —
 * žádné reklamní jednotky, žádné Auto Ads, žádný `adsbygoogle.push`.
 * Vykresluje se výhradně přes MarketingScripts (viz
 * app/components/consent/MarketingScripts.tsx) až po souhlasu s
 * marketingovými cookies. Skutečné reklamní jednotky řeší samostatně
 * AdSlot.tsx a flag ADS_ENABLED.
 */
export default function AdSenseAccountScript() {
  if (!ADSENSE_ACCOUNT_CONNECTED) return null;

  return (
    <Script
      id="adsense-account-script"
      strategy="afterInteractive"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
