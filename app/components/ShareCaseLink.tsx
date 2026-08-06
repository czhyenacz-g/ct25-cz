"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Viditelná možnost zkopírovat/otevřít sdílecí URL jednoho případu.
 * Vždy je to platný <a href="/clanky/slug"> (next/image Link) — bez JS se
 * chová jako běžný odkaz (otevře vlastní stránku případu, jde i zkopírovat
 * pravým tlačítkem). S JS navíc klik zkopíruje absolutní URL do schránky
 * místo navigace, jako drobné progresivní vylepšení.
 */
export default function ShareCaseLink({ slug, absoluteUrl }: { slug: string; absoluteUrl: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!navigator.clipboard) return;

    event.preventDefault();
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Schránka nedostupná (oprávnění/prohlížeč) — necháme uživatele
      // otevřít odkaz normálně při dalším kliknutí.
    }
  }

  return (
    <Link
      href={`/clanky/${slug}`}
      onClick={handleClick}
      className="inline-flex items-center gap-1 text-xs text-gray-400 underline hover:text-accent"
    >
      {copied ? "Odkaz zkopírován" : "Sdílet tento případ"}
    </Link>
  );
}
