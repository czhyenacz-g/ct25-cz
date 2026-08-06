import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
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
