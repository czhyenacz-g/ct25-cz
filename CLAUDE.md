# ct25-cz — instrukce pro Claude

Nezávislý informační web upozorňující na to, že označení „ČT25“ na sociálních
sítích používá facebooková stránka „ČT25 – Pravda bez cenzury“, u které
nezávislí ověřovatelé doložili opakované šíření zmanipulovaného obsahu.
Založeno ze starter šablony (`czhyenacz-g/starter`) s vlastní, čistou historií.

---

## Režim práce: plně autonomní

Tento projekt běží v **full-auto** režimu. V tomto adresáři (a nikde jinde)
smí Claude bez dalšího potvrzení:

- vytvářet, upravovat, přesouvat a mazat soubory a adresáře,
- instalovat a odstraňovat závislosti,
- spouštět buildy, testy, lintování a další lokální kontroly,
- vytvářet commity a pushovat na `main`,
- spravovat GitHub repozitář `czhyenacz-g/ct25-cz` a Vercel projekt `ct25-cz`
  (včetně proměnných prostředí a domén).

Neptej se na potvrzení běžných, vratných změn v tomto repozitáři. Nepřenášej
sem přísnější schvalovací pravidla z jiných projektů, pokud to zde nemá
vyžadovat tento soubor.

Omezení, která platí vždy:

- **Destruktivní operace mimo tento repozitář nejsou povolené** – jiné
  repozitáře, Vercel projekty ani domény se nesmí mazat ani resetovat.
- **Nikdy necommituj tokeny, hesla ani jiné secrets** – před pushnutím vždy
  zkontroluj staged změny.
- Žádný force push a žádné přepisování historie tohoto ani jiných repozitářů.
- Po úspěšných validacích (lint, typecheck, testy, build) commit a push.

---

## Obsahová a redakční pravidla

- Každé konkrétní tvrzení o třetí straně musí mít viditelný zdroj (ideálně
  Demagog.cz nebo jiný kvalitní fact-checker) – viz `docs/SOURCES.md` a
  `app/redakcni-pravidla/page.tsx`.
- Nepřidávej neověřená obvinění (financování ze zahraničí, řízení odjinud,
  trestná činnost, identita konkrétní fyzické osoby jako provozovatele) bez
  doloženého zdroje.
- Nezveřejňuj osobní údaje – ani o provozovateli tohoto webu, ani o
  neprokázaných provozovatelích stránky „ČT25 – Pravda bez cenzury“.
- Web se nikdy nesmí vydávat za Českou televizi ani za stránku
  „ČT25 – Pravda bez cenzury“ a nesmí napodobovat jejich grafickou identitu.
- Nový doložený případ přidávej do `app/lib/cases.ts` ve stejné struktuře a
  zapiš ho i do `docs/SOURCES.md`. Bez zdroje případ nepřidávej.
- Právní a cookie texty (`app/ochrana-soukromi`, `app/cookies`,
  `app/pravni-upozorneni`) musí odpovídat tomu, co web skutečně načítá – při
  přidání nové analytiky/reklamy tyto texty i `app/lib/consent.ts` aktualizuj
  zároveň.

## Provozní pravidla

- Udržuj malý a kontrolovatelný rozsah jednotlivých budoucích úkolů –
  nedělej rozsáhlý nesouvisející refactoring v rámci drobné změny.
- Zachovej jednoduchost architektury (žádná databáze, žádná registrace,
  obsah v `app/lib/*.ts`, ne monolitní komponenty).
- Po každé netrivální změně spusť: `npm run lint`, `npm run typecheck`,
  `npm test`, `npm run build`.
- V reportu na konci úkolu vždy uveď: krátký název problému, změněné
  soubory, provedené validace, commit hash a stav nasazení.

---

## Stack

- **Next.js 15** (App Router), **React 19**, **TypeScript**, **Tailwind CSS**
- **Vercel Analytics** + **GoatCounter** – obojí se načte jen po souhlasu s
  analytickými cookies (`app/components/consent/AnalyticsScripts.tsx`)
- Deploy: **Vercel** (auto-deploy z GitHubu na push do `main`)

## Struktura projektu

```
app/
  layout.tsx                 # Root layout, metadata, consent provider
  page.tsx                   # Homepage – všechny sekce
  not-found.tsx, robots.ts, sitemap.ts, icon.svg
  o-projektu/, kontakt/, ochrana-soukromi/, cookies/,
  pravni-upozorneni/, redakcni-pravidla/    # Právní a informační stránky
  config/
    site.ts                  # Název, popisky, kontakt, navigace
    analytics.ts              # GoatCounter kód, AdSense přepínač
  lib/
    cases.ts                  # Datová vrstva doložených případů
    consent.ts                 # Typy a helpery pro cookie souhlas
  components/
    Header.tsx, Footer.tsx, CaseCard.tsx
    ads/AdSlot.tsx, ads/types.ts
    consent/ConsentProvider.tsx, CookieConsentUI.tsx,
      CookieSettingsButton.tsx, AnalyticsScripts.tsx
  api/og/route.tsx            # Dynamický OG image endpoint
tests/                        # vitest – integrita dat případů a consent logiky
docs/
  SOURCES.md                  # Evidence zdrojů k jednotlivým případům
  LEGAL-TODO.md                # Co doplnit před komerčním provozem
```

## Přidání nového doloženého případu

1. Ověř tvrzení u nezávislého fact-checkera (primárně Demagog.cz), který
   ho přímo přiřazuje stránce „ČT25 – Pravda bez cenzury“.
2. Přidej položku do `documentedCases` v `app/lib/cases.ts` (slug, title,
   summary vlastními slovy, manipulationType, verifiedDate, sources s URL).
3. Zapiš zdroj do `docs/SOURCES.md`.
4. Spusť `npm test` – ověří základní integritu dat (unikátní slugy, platné
   URL, formát data).
