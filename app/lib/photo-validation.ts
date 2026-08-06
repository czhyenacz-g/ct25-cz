export const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

/**
 * Čistá validační logika pro LocalPhotoPicker — vytažená zvlášť, aby šla
 * otestovat bez nutnosti renderovat React komponentu (projekt zatím nemá
 * jsdom/@testing-library, viz vitest.config.ts, a nezavádíme ji jen kvůli
 * jednomu formuláři). Vrací `null`, pokud je soubor v pořádku, jinak
 * uživatelsky čitelnou chybovou hlášku.
 */
export function validatePhotoFile(file: { type: string; size: number }): string | null {
  if (!ALLOWED_PHOTO_TYPES.includes(file.type as (typeof ALLOWED_PHOTO_TYPES)[number])) {
    return "Nepodporovaný typ souboru. Nahrajte prosím fotografii ve formátu JPEG, PNG nebo WebP.";
  }
  if (file.size > MAX_PHOTO_SIZE_BYTES) {
    return "Fotografie je větší než 10 MB. Zvolte prosím menší soubor.";
  }
  return null;
}
