"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "../config/site";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobilni-menu"
        aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-white"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      <nav
        id="mobilni-menu"
        aria-label="Mobilní navigace"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-ink px-4 py-3 shadow-lg"
      >
        <ul className="flex flex-col gap-1 text-base text-gray-200">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded px-2 py-3 hover:bg-surface hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
