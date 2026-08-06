import { describe, expect, it } from "vitest";
import { buildSupporterMailtoHref, SUPPORTER_CONTACT_EMAIL, SUPPORTER_EMAIL_SUBJECT } from "../app/lib/supporter-mailto";

describe("buildSupporterMailtoHref", () => {
  it("směřuje na správný kontaktní e-mail", () => {
    expect(buildSupporterMailtoHref(null)).toMatch(new RegExp(`^mailto:${SUPPORTER_CONTACT_EMAIL}\\?`));
  });

  it("obsahuje správně zakódovaný předmět", () => {
    const href = buildSupporterMailtoHref(null);
    expect(href).toContain(`subject=${encodeURIComponent(SUPPORTER_EMAIL_SUBJECT)}`);
  });

  it("bez vybrané scény uvádí, že scéna zatím nebyla vybrána", () => {
    const href = buildSupporterMailtoHref(null);
    const body = decodeURIComponent(href.split("body=")[1]);
    expect(body).toMatch(/nevybral/i);
  });

  it("s vybranou scénou předvyplní její název do těla zprávy", () => {
    const href = buildSupporterMailtoHref("Fotka s Petrem Pavlem");
    const body = decodeURIComponent(href.split("body=")[1]);
    expect(body).toContain("Fotka s Petrem Pavlem");
  });

  it("nepoužívá '+' misto mezery (mailto, ne form-urlencoded tělo)", () => {
    const href = buildSupporterMailtoHref("Fotka s Petrem Pavlem");
    const bodyParam = href.split("body=")[1];
    expect(bodyParam).not.toContain("+");
  });
});
