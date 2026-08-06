import type { Metadata } from "next";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./config/site";
import { ADSENSE_CLIENT_ID } from "./config/analytics";
import { ConsentProvider } from "./components/consent/ConsentProvider";
import CookieConsentUI from "./components/consent/CookieConsentUI";
import AnalyticsScripts from "./components/consent/AnalyticsScripts";
import MarketingScripts from "./components/consent/MarketingScripts";
import Header from "./components/Header";
import Footer from "./components/Footer";

const FULL_TITLE = `${SITE_NAME} – ${SITE_TITLE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: FULL_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: FULL_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: FULL_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  // Statický ověřovací meta tag pro Google AdSense — na rozdíl od
  // AdSenseAccountScript.tsx je vykreslený vždy v serverovém HTML, ne až
  // po souhlasu s marketingovými cookies. Google ho tak najde i tehdy,
  // když crawler nespustí JS/neudělí consent — bez tagu si AdSense
  // propojení účtu nemusí "všimnout". Nic netrackuje, nesetuje cookies,
  // proto nepotřebuje consent gating stejně jako account script.
  ...(ADSENSE_CLIENT_ID
    ? { other: { "google-adsense-account": ADSENSE_CLIENT_ID } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body className="flex min-h-screen flex-col bg-ink text-white antialiased">
        <a
          href="#hlavni-obsah"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          Přejít na hlavní obsah
        </a>
        <ConsentProvider>
          <Header />
          <main id="hlavni-obsah" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieConsentUI />
          <AnalyticsScripts />
          <MarketingScripts />
        </ConsentProvider>
      </body>
    </html>
  );
}
