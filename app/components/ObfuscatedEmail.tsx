"use client";

import { useState } from "react";

/**
 * Chrání e-mail před jednoduchými scrapery/boty: adresa se sestaví z
 * oddělených částí (user/domain) a zobrazí/aktivuje jako mailto: odkaz
 * až po kliknutí v prohlížeči — v serverem vygenerovaném HTML se nikdy
 * neobjeví jako čitelný celý řetězec ani jako mailto: href.
 */
export default function ObfuscatedEmail({
  user,
  domain,
  subject,
  className,
}: {
  user: string;
  domain: string;
  subject?: string;
  className?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const linkClassName = className ?? "text-accent underline hover:brightness-110";

  if (!revealed) {
    return (
      <button type="button" onClick={() => setRevealed(true)} className={linkClassName}>
        Zobrazit e-mail
      </button>
    );
  }

  const email = `${user}@${domain}`;
  const href = subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;

  return (
    <a href={href} className={linkClassName}>
      {email}
    </a>
  );
}
