import { describe, expect, it } from "vitest";
import { validatePhotoFile, MAX_PHOTO_SIZE_BYTES } from "../app/lib/photo-validation";

describe("validatePhotoFile", () => {
  it("přijme platný JPEG pod limitem velikosti", () => {
    expect(validatePhotoFile({ type: "image/jpeg", size: 1024 })).toBeNull();
  });

  it("přijme platný PNG a WebP pod limitem velikosti", () => {
    expect(validatePhotoFile({ type: "image/png", size: 1024 })).toBeNull();
    expect(validatePhotoFile({ type: "image/webp", size: 1024 })).toBeNull();
  });

  it("odmítne nepodporovaný typ souboru", () => {
    expect(validatePhotoFile({ type: "image/heic", size: 1024 })).toMatch(/nepodporovaný typ/i);
    expect(validatePhotoFile({ type: "application/pdf", size: 1024 })).toMatch(/nepodporovaný typ/i);
  });

  it("odmítne soubor větší než 10 MB", () => {
    expect(validatePhotoFile({ type: "image/jpeg", size: MAX_PHOTO_SIZE_BYTES + 1 })).toMatch(/10 MB/);
  });

  it("přijme soubor přesně na hranici limitu", () => {
    expect(validatePhotoFile({ type: "image/jpeg", size: MAX_PHOTO_SIZE_BYTES })).toBeNull();
  });
});
