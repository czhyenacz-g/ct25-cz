"use client";

import { useEffect } from "react";

const HIGHLIGHT_CLASSES = ["ring-2", "ring-accent", "ring-offset-2", "ring-offset-ink"];
const HIGHLIGHT_DURATION_MS = 2500;

/**
 * Progresivní vylepšení pro /clanky/[slug]: po načtení najde odpovídající
 * <article id={slug}> na titulní stránce, odscrolluje k němu (s offsetem
 * podle skutečné výšky hlavičky, ne natvrdo odhadnutým číslem — funguje
 * i kdyby hlavička později zezticknula) a krátce ho zvýrazní.
 *
 * Bez JavaScriptu se prostě nic nescrolluje/nezvýrazní — obsah článku je
 * ale vždy plně vykreslený na stránce (viz app/page.tsx), takže zůstává
 * dostupný běžným scrollováním/čtením i tak.
 */
export default function ScrollToCase({ slug }: { slug?: string }) {
  useEffect(() => {
    if (!slug) return;

    const target = document.getElementById(slug);
    if (!target) return;

    const header = document.querySelector("header");
    const headerHeight = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    target.classList.add(...HIGHLIGHT_CLASSES);

    const timeout = window.setTimeout(() => {
      target.classList.remove(...HIGHLIGHT_CLASSES);
    }, HIGHLIGHT_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [slug]);

  return null;
}
