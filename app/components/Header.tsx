import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "../config/site";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="relative border-b border-line bg-ink/95">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-white">
          {SITE_NAME}
          <span className="ml-2 hidden text-xs font-semibold uppercase tracking-wide text-warn sm:inline">
            {SITE_TAGLINE}
          </span>
        </Link>
        <nav aria-label="Hlavní navigace" className="hidden md:block">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-300">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
