import Link from "next/link";
import { FOOTER_LEGAL_LINKS, LAST_CONTENT_UPDATE, SITE_NAME } from "../config/site";
import CookieSettingsButton from "./consent/CookieSettingsButton";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-400">
        <p className="max-w-2xl">
          {SITE_NAME} není spojen s Českou televizí ani s provozovateli facebookové stránky
          „ČT25 – Pravda bez cenzury“. Cílem webu je upozorňovat na doložené informační manipulace.
        </p>
        <nav aria-label="Právní a informační odkazy" className="mt-4">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="underline hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </nav>
        <p className="mt-6 text-xs text-gray-500">
          Obsah naposledy aktualizován {LAST_CONTENT_UPDATE}. © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
