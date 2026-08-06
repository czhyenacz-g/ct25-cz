# ct25-cz

Nezávislý informační web upozorňující na to, že označení „ČT25“ na
sociálních sítích používá facebooková stránka „ČT25 – Pravda bez cenzury“,
u které nezávislí ověřovatelé (primárně Demagog.cz) doložili opakované
šíření zmanipulovaných fotografií a obsahu vytvořeného umělou inteligencí.

**Tento web není spojen s Českou televizí ani s provozovateli stránky
„ČT25 – Pravda bez cenzury“.**

## Účel projektu

- Shromažďovat doložené případy manipulace pod jedno přehledné místo.
- Vysvětlit, jak podobnou manipulaci poznat a jak ověřovat zdroje před
  sdílením.
- Jasně odlišit tento web od České televize i od kritizované stránky.

## Lokální spuštění

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build a testování

```bash
npm run lint        # ESLint
npm run typecheck    # tsc --noEmit
npm test             # vitest – integrita dat případů a consent logiky
npm run build        # produkční build
```

## Environment variables

Zkopíruj `.env.example` do `.env.local` a vyplň dle potřeby:

| Proměnná | Účel | Výchozí stav |
|---|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Kontaktní e-mail na `/kontakt` a `/poslat-podnet` | Nastaveno na `redakce@sokujiciodhaleni.cz` (sdíleno se ŠokujícíOdhalení.cz); bez hodnoty se na produkci nezobrazí žádný kontakt |
| `NEXT_PUBLIC_GOATCOUNTER_CODE` | Subdoména GoatCounter | Bez hodnoty se analytika nenačítá |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Google AdSense client ID (propojení účtu) | Bez hodnoty se AdSense account script nenačítá vůbec |
| `NEXT_PUBLIC_ADSENSE_ADS_ENABLED` | Zapíná skutečné reklamní jednotky v `AdSlot` | `false`/chybí → `AdSlot` nevykresluje žádnou jednotku |

Žádná z těchto proměnných se nenačítá bez patřičného souhlasu s cookies –
viz níže.

## Deployment

Web je nasazen na Vercelu, auto-deploy z GitHubu při pushi do `main`.
Produkční build: `npm run build` → `npm run start`, nebo přímo přes Vercel.

### Připojení domény

1. Ve Vercel projektu `ct25-cz` → Settings → Domains přidej `ct25.cz` a
   `www.ct25.cz`.
2. Nastav DNS u registrátora podle instrukcí, které Vercel zobrazí (typicky
   `A`/`ALIAS` záznam pro `ct25.cz` na Vercel a `CNAME` pro `www` na
   `cname.vercel-dns.com`).
3. Kanonická varianta je `https://ct25.cz` – `www.ct25.cz` je na ni ve
   Vercelu nastaveno jako redirect.

## Přidání dalšího doloženého případu

1. Ověř tvrzení u nezávislého fact-checkera (primárně Demagog.cz), který ho
   přímo přiřazuje stránce „ČT25 – Pravda bez cenzury“.
2. Přidej položku do `documentedCases` v `app/lib/cases.ts`.
3. Zapiš zdroj do `docs/SOURCES.md`.
4. Spusť `npm test` a `npm run build`.

## Správa reklamních slotů

Reklamní prostory řeší jediná komponenta `app/components/ads/AdSlot.tsx`:

- Dokud `NEXT_PUBLIC_ADSENSE_ADS_ENABLED` není `"true"`, na produkci
  nevykresluje nic (jen ve vývoji ukáže placeholder se stabilními rozměry).
- Po zapnutí a doplnění konkrétních slot ID se v komponentě doplní
  vykreslení skutečné, souhlasem podmíněné reklamní jednotky.
- Sloty jsou umístěné po hero sekci, mezi obsahovými sekcemi a před
  patičkou (`app/page.tsx`).

Nezávisle na tom je propojený Google AdSense účet
(`NEXT_PUBLIC_ADSENSE_CLIENT_ID`) – jeho ověřovací account script
(`app/components/ads/AdSenseAccountScript.tsx`) se načte jen po souhlasu s
marketingovými cookies (`app/components/consent/MarketingScripts.tsx`) a
sám o sobě nezobrazuje žádnou reklamu.

## Správa cookies a souhlasu

- Logika a typy: `app/lib/consent.ts` (kategorie `necessary` / `analytics`
  / `marketing`, uloženo v `localStorage` pod klíčem `ct25-consent`).
- UI banneru a nastavení: `app/components/consent/CookieConsentUI.tsx`.
- Analytické skripty (Vercel Analytics, GoatCounter) se načtou výhradně
  přes `app/components/consent/AnalyticsScripts.tsx` až po souhlasu.
- Marketingové skripty (AdSense account script) se načtou výhradně přes
  `app/components/consent/MarketingScripts.tsx` až po souhlasu.
- Uživatel může volbu kdykoli změnit odkazem „Nastavení cookies“ v patičce.

## Právní TODO před komerčním spuštěním

Viz `docs/LEGAL-TODO.md` – zejména doplnění identifikačních údajů
provozovatele, kontaktního e-mailu a kontrola právních textů právníkem.
