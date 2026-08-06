import type { Metadata } from "next";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./config/site";
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
