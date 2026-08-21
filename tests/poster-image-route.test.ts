import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "../app/api/poster-image/[id]/route";

function jsonResponse(body: unknown, ok = true): Response {
  return { ok, json: async () => body } as Response;
}

describe("GET /api/poster-image/[id]", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("proxies the image for an id belonging to a whitelisted collection", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL) => {
        const url = String(input);
        if (url.includes("/api/public/media-collections/ct25cz-nalepky")) return jsonResponse({ data: [] });
        if (url.includes("/api/public/media-collections/ct25cz-plakaty")) {
          return jsonResponse({
            data: [
              {
                id: 42,
                url: "/media/x.webp",
                width: 100,
                height: 100,
                alt: null,
                caption: null,
                license: null,
                credit: null,
                rightsStatus: null,
              },
            ],
          });
        }
        // upstream fetch of the actual image bytes
        return {
          ok: true,
          body: new ReadableStream(),
          headers: new Headers({ "content-type": "image/webp" }),
        } as Response;
      })
    );

    const request = new NextRequest("https://ct25.cz/api/poster-image/42");
    const response = await GET(request, { params: Promise.resolve({ id: "42" }) });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/webp");
  });

  it("returns 404 for an id not present in either whitelisted collection (never an open proxy)", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ data: [] })));

    const request = new NextRequest("https://ct25.cz/api/poster-image/999");
    const response = await GET(request, { params: Promise.resolve({ id: "999" }) });

    expect(response.status).toBe(404);
  });

  it("returns 404 for a non-numeric id without calling fetch", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const request = new NextRequest("https://ct25.cz/api/poster-image/abc");
    const response = await GET(request, { params: Promise.resolve({ id: "abc" }) });

    expect(response.status).toBe(404);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns 502 if the upstream image fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL) => {
        const url = String(input);
        if (url.includes("/api/public/media-collections/ct25cz-nalepky")) {
          return jsonResponse({
            data: [
              {
                id: 7,
                url: "/media/broken.webp",
                width: 10,
                height: 10,
                alt: null,
                caption: null,
                license: null,
                credit: null,
                rightsStatus: null,
              },
            ],
          });
        }
        if (url.includes("/api/public/media-collections/ct25cz-plakaty")) return jsonResponse({ data: [] });
        return { ok: false, body: null, headers: new Headers() } as unknown as Response;
      })
    );

    const request = new NextRequest("https://ct25.cz/api/poster-image/7");
    const response = await GET(request, { params: Promise.resolve({ id: "7" }) });

    expect(response.status).toBe(502);
  });
});
