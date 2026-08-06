import type { Metadata } from "next";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./config/site";
import { ConsentProvider } from "./components/consent/ConsentProvider";
import CookieConsentUI from "./components/consent/CookieConsentUI";
import AnalyticsScripts from "./components/consent/AnalyticsScripts";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TITLE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_TITLE} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} | ${SITE_NAME}`,
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
          className="skip-link absolute left-2 top-2 z-50 h-0 w-0 overflow-hidden rounded bg-accent px-3 py-2 text-sm font-medium text-ink"
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
        </ConsentProvider>
      </body>
    </html>
  );
}
