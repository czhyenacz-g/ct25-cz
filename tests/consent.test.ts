import { describe, expect, it } from "vitest";
import { acceptAllConsent, rejectAllConsent, DEFAULT_CONSENT } from "../app/lib/consent";

describe("consent helpers", () => {
  it("výchozí souhlas má vypnutou analytiku a marketing", () => {
    expect(DEFAULT_CONSENT.analytics).toBe(false);
    expect(DEFAULT_CONSENT.marketing).toBe(false);
    expect(DEFAULT_CONSENT.necessary).toBe(true);
  });

  it("acceptAllConsent zapne všechny kategorie", () => {
    const consent = acceptAllConsent();
    expect(consent.analytics).toBe(true);
    expect(consent.marketing).toBe(true);
    expect(consent.decidedAt).not.toBe("");
  });

  it("rejectAllConsent vypne analytiku a marketing, nezbytné zůstává", () => {
    const consent = rejectAllConsent();
    expect(consent.analytics).toBe(false);
    expect(consent.marketing).toBe(false);
    expect(consent.necessary).toBe(true);
  });
});
