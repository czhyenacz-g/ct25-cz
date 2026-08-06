import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-white">Stránka nenalezena</h1>
      <p className="mt-4 text-gray-400">
        Hledaná stránka na tomto webu neexistuje nebo byla přesunuta.
      </p>
      <Link href="/" className="mt-6 inline-block rounded-md bg-accent px-4 py-2 font-semibold text-ink">
        Zpět na hlavní stránku
      </Link>
    </div>
  );
}
