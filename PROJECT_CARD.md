# PROJECT_CARD — ct25-cz

**Co projekt řeší:** Facebooková stránka „ČT25 – Pravda bez cenzury“ používá
název připomínající Českou televizi a nezávislí ověřovatelé u ní doložili
opakované šíření zmanipulovaných fotografií a AI obsahu. Web shromažďuje
tyto doložené případy na jedno místo, jasně odlišuje sám sebe od České
televize i od kritizované stránky, a učí čtenáře, jak podobnou manipulaci
poznat a ověřit.

**Pro koho je:** Lidé, kteří na sociálních sítích narazí na obsah pod
označením „ČT25“ a chtějí rychle zjistit, o co jde a zda je důvěryhodný;
novináři a fact-checkeři hledající přehled případů; kdokoliv, kdo chce
před sdílením ověřit zdroj.

**Současný stav:** První, jednoduchá verze – jedna hlavní stránka s hero
sekcí, přehledem 4 doložených případů (zdroj Demagog.cz/CEDMO), vysvětlením
jak manipulaci poznat, a sadou právních/informačních stránek. Bez databáze,
bez registrace, bez redakčního systému. Reklamní sloty existují, ale žádná
reklamní síť není nasazena. Analytika je připravená, ale načítá se jen po
souhlasu s cookies.

**Jak může omezovat dopad dezinformací:** Nabízí rychle dohledatelný,
zdrojovaný protipól ke konkrétním virálním manipulacím – funguje jako místo,
na které lze v diskuzi odkázat, a jako stručný návod pro ověřování zdrojů.

**Možné budoucí propojení se ŠokujícíOdhalení.cz:** Web už na
ŠokujícíOdhalení.cz odkazuje jako na sesterský projekt s dalšími rozbory.
V budoucnu lze zvážit sdílení redakční infrastruktury (např. napojení na
stejné API pro články) nebo cross-promo bloky, ale zatím jde o zcela
samostatný, staticky obsahový web.

**Monetizace:** Připravené, ale nenasazené reklamní sloty (`AdSlot`)
kompatibilní s budoucím Google AdSense nebo jiným poskytovatelem – vyžaduje
doplnění `NEXT_PUBLIC_ADSENSE_CLIENT_ID` a aktualizaci textů o cookies.

**Hlavní právní a reputační rizika:**
- Nepřesné nebo nedoložené tvrzení o konkrétní osobě/subjektu (žalovatelná
  difamace) – mitigace: každé tvrzení má zdroj, žádné tvrzení o financování/
  řízení ze zahraničí/trestné činnosti bez důkazu.
- Neexistující identifikace provozovatele – dočasně přijatelné pro
  nekomerční informační fázi, ale musí se doplnit před monetizací
  (viz `docs/LEGAL-TODO.md`).
- Riziko záměny s Českou televizí – mitigace: opakovaná explicitní
  upozornění na hlavní stránce, v patičce i v právním upozornění, žádné
  logo ani grafická identita ČT.

**Co zatím nedělat:**
- Nepřidávat neověřená obvinění (kdo stránku provozuje, financování,
  trestná činnost).
- Nezveřejňovat jméno provozovatele tohoto webu.
- Nenasazovat reklamní síť nebo analytiku bez odpovídající aktualizace
  cookie textů a bez respektování souhlasu.
- Nekopírovat grafickou identitu ani chráněné obrázky třetích stran.
