export type AdFormat = "leaderboard" | "rectangle" | "sidebar";
export type AdPlacement = "after-hero" | "mid-content" | "before-footer" | "sidebar";

export const AD_DIMENSIONS: Record<AdFormat, { width: number; height: number }> = {
  leaderboard: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  sidebar: { width: 300, height: 600 },
};
