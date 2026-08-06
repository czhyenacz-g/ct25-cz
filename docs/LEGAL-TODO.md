# LEGAL-TODO — právní stav webu ct25-cz

## Již technicky připraveno

- Cookie consent s kategoriemi necessary/analytics/marketing, defaultně
  vypnuté analytics/marketing, snadné „Přijmout vše“ / „Odmítnout vše“ /
  „Nastavení“, změna volby kdykoli přes patičku (`app/lib/consent.ts`,
  `app/components/consent/`).
- Analytické skripty (Vercel Analytics, GoatCounter) se nenačtou bez
  souhlasu (`app/components/consent/AnalyticsScripts.tsx`).
- Reklamní sloty připravené, ale bez nasazené reklamní sítě
  (`app/components/ads/AdSlot.tsx`).
- Právní upozornění jasně odlišující web od České televize i od stránky
  „ČT25 – Pravda bez cenzury“ (`app/pravni-upozorneni/page.tsx`).
- Redakční pravidla vyžadující zdroj u každého tvrzení
  (`app/redakcni-pravidla/page.tsx`, `docs/SOURCES.md`).
- Kontaktní stránka, která na produkci nevymýšlí neexistující kontakt,
  pokud `NEXT_PUBLIC_CONTACT_EMAIL` není nastaven (`app/kontakt/page.tsx`).

## Závisí na identitě provozovatele

- Jméno a adresa provozovatele (fyzická nebo právnická osoba) – zatím
  vědomě neuvedeno, viz zadání projektu. Musí být doplněno **před plným
  komerčním spuštěním** a před nasazením jakékoli reklamy.
- IČO / DIČ, pokud provozovatel podniká.
- Skutečný kontaktní e-mail (`NEXT_PUBLIC_CONTACT_EMAIL`).
- Přesná právní forma zveřejnění (impressum) odpovídající skutečnému
  provozovateli – aktuální texty jsou vědomě formulovány jako dočasné.

## Před nasazením reklamy

- Doplnit `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (nebo jiného poskytovatele) a
  rozšířit `AdSlot.tsx` o skutečné vykreslení jednotky.
- Aktualizovat `app/cookies/page.tsx` a `app/ochrana-soukromi/page.tsx`,
  aby popisovaly konkrétní nasazenou reklamní síť.
- Ověřit, že marketingové skripty se načítají výhradně po souhlasu se
  marketingovou kategorií cookies.
- Zvážit nutnost registrace provozovatele reklamy podle daňových předpisů.

## Před nasazením analytiky nad rámec aktuálního stavu

- Pokud přibude další analytický nástroj (např. Google Analytics), doplnit
  ho do `app/config/analytics.ts` i do `AnalyticsScripts.tsx` se stejným
  gatingem přes souhlas a aktualizovat `app/cookies/page.tsx`.

## Co má zkontrolovat právník

- Formulace v `app/pravni-upozorneni/page.tsx` a `app/ochrana-soukromi/page.tsx`
  – zda odpovídají aktuálně platným předpisům (GDPR, zákon o některých
  službách informační společnosti, případně tiskový zákon podle skutečné
  povahy provozovatele).
- Míra rizika žalovatelnosti konkrétních formulací o třetí straně, zejména
  před rozšířením o další případy nebo o komerční provoz.
- Nutnost impressa/kontaktních údajů podle skutečné právní formy
  provozovatele, jakmile bude známá.
