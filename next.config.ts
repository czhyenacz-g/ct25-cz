import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /kontakt zrušen jako samostatná stránka — obsah přesunut na konec
      // /o-projektu (sekce #kontakt). Hash fragmenty (#kontakt) se
      // neposílají na server, takže je Next.js redirects() nemůže cílit —
      // proto trvalý redirect jen na /o-projektu bez kotvy.
      {
        source: "/kontakt",
        destination: "/o-projektu",
        permanent: true,
      },
    ];
  },
  images: {
    // Šablony pro /ai-fotka žijí v existující Knihovně médií projektu
    // sokujici-redakce (Media Library) — žádná lokální kopie, viz
    // app/lib/ai-photo-templates.ts.
    remotePatterns: [{ protocol: "https", hostname: "redakce.sokujiciodhaleni.cz" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
