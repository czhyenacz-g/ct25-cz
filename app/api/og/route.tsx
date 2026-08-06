import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { SITE_DOMAIN, SITE_TITLE } from "../../config/site";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || SITE_TITLE;
  const sub = searchParams.get("sub") || "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #171c22 0%, #101418 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 32,
            display: "flex",
          }}
        >
          {title}
        </div>
        {sub && (
          <div
            style={{
              fontSize: 36,
              color: "#e2b93b",
              textAlign: "center",
              display: "flex",
            }}
          >
            {sub}
          </div>
        )}
        <div
          style={{
            fontSize: 28,
            color: "#6b7280",
            textAlign: "center",
            marginTop: 48,
            display: "flex",
          }}
        >
          {SITE_DOMAIN}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
