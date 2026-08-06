export interface CaseSource {
  label: string;
  publisher: string;
  url: string;
}

export interface DocumentedCase {
  slug: string;
  title: string;
  summary: string;
  manipulationType: string;
  /** Datum, kdy nezávislý ověřovatel případ zveřejnil/ověřil (ISO 8601). */
  verifiedDate: string;
  sources: CaseSource[];
}

/**
 * Pouze případy, ke kterým existuje dohledatelný fact-check nezávislého
 * ověřovatele (primárně Demagog.cz) a který konkrétní příspěvek/fotografii
 * přímo přiřazuje stránce „ČT25 – Pravda bez cenzury“. Nové případy přidávej
 * stejnou strukturou — bez zdroje položku nepřidávej (viz README.md).
 */
export const documentedCases: DocumentedCase[] = [
  {
    slug: "zhar-pardubice-minar-halik",
    title: "Fotomontáž spojující žháře z Pardubic s Minářem a Halíkem",
    summary:
      "Stránka „ČT25 – Pravda bez cenzury“ zveřejnila fotografii, na které měli být vedle sebe teolog Tomáš Halík, předseda Milionu chvilek Mikuláš Minář a muž obviněný ze žhářského útoku na zbrojařskou firmu v Pardubicích, s poznámkou, že jde o „ilustrační foto“. Podle Demagog.cz vznikl snímek úpravou skutečné fotografie Halíka a Mináře pomocí umělé inteligence – manipulaci odhalil bílý náramek hodinek, který se shodně objevuje na originální fotografii z policejního transportu obviněného i na upravené verzi. Facebook fotografii následně v rámci spolupráce s fact-checkery označil jako pozměněnou.",
    manipulationType: "Zmanipulovaná fotografie vytvořená pomocí AI",
    verifiedDate: "2026-03-27",
    sources: [
      {
        label: "Falešná fotografie spojuje žháře z Pardubic s Minářem a Halíkem",
        publisher: "Demagog.cz",
        url: "https://demagog.cz/diskuze/falesna-fotografie-spojuje-zhare-z-pardubic-s-minarem-a-halikem",
      },
      {
        label: "Falešná fotografie spojuje žháře z Pardubic s Minářem a Halíkem",
        publisher: "CEDMO",
        url: "https://cedmohub.eu/cs/falesna-fotografie-spojuje-zhare-z-pardubic-s-minarem-a-halikem/",
      },
    ],
  },
  {
    slug: "petr-pavel-putin-fotomontaz",
    title: "Fotomontáž „setkání“ Petra Pavla s Vladimirem Putinem",
    summary:
      "Stránka „ČT25 – Pravda bez cenzury“ zveřejnila černobílou fotografii, která měla ukazovat podání ruky Petra Pavla s Vladimirem Putinem, se sarkastickým popiskem o „fotce z Pavlova mládí“. Podle Demagog.cz jde ve skutečnosti o archivní snímek z roku 1995, na kterém si Pavel po absolvování kurzu na britské Staff College v Camberley podává ruku s britským důstojníkem – postava Putina byla do fotografie digitálně domontována. Demagog.cz potvrzuje, že k žádnému osobnímu setkání Pavla s Putinem nikdy nedošlo; Facebook fotografii označil jako pozměněnou.",
    manipulationType: "Fotomontáž",
    verifiedDate: "2026-01-27",
    sources: [
      {
        label: "Pavel si podal ruku s britským důstojníkem, fotomontáž z něj udělala Putina",
        publisher: "Demagog.cz",
        url: "https://demagog.cz/diskuze/pavel-si-podal-ruku-s-britskym-dustojnikem-siri-se-upravena-verze-s-putinem",
      },
      {
        label: "Pavel si podal ruku s britským důstojníkem, fotomontáž z něj udělala Putina",
        publisher: "CEDMO",
        url: "https://cedmohub.eu/cs/pavel-si-podal-ruku-s-britskym-dustojnikem-fotomontaz-z-nej-udelala-putina/",
      },
    ],
  },
  {
    slug: "petr-pavel-obusek-fotomontaz",
    title: "Fotomontáž Petra Pavla v přilbě a s obuškem represivní složky",
    summary:
      "Na stránce „ČT25 – Pravda bez cenzury“ se objevila fotografie mladého muže v uniformě se štítem, obuškem a bílou přilbou, typickou pro příslušníky represivních složek normalizačního Československa, s tvrzením, že jde o Petra Pavla. Podle Demagog.cz vznikla fotomontáž tak, že autor vzal snímek muže v historickém stejnokroji z instagramového účtu Vězeňské služby ČR, převedl ho do černobílé podoby a vložil do něj obličej mladého Pavla z archivní fotografie z roku 1983. Pavel v mládí sloužil v armádě, nikoli ve Sboru nápravné výchovy. Facebook fotografii označil jako pozměněnou.",
    manipulationType: "Zmanipulovaná fotografie (fotomontáž)",
    verifiedDate: "2026-01-28",
    sources: [
      {
        label: "„Neklidné mládí, neklidné obušky“: Petr Pavel působil v armádě, snímek s obuškem je falešný",
        publisher: "Demagog.cz",
        url: "https://demagog.cz/diskuze/neklidne-mladi-neklidne-obusky-petr-pavel-pusobil-v-armade-snimek-s-obuskem-je-falesny",
      },
    ],
  },
  {
    slug: "cincila-nehoda-zavadejici-tvrzeni",
    title: "Zavádějící grafika o nehodě, kterou způsobil cyklista",
    summary:
      "Stránka „ČT25 – Pravda bez cenzury“ zveřejnila grafiku s tvrzením, že Benjamin Činčila v roce 2021 zabil cyklistu „pod vlivem amfetaminu a alkoholu“, a stavěla to do kontrastu s kritikou jiného politika po jiné nehodě. Podle Demagog.cz laboratorní rozbor krve přítomnost alkoholu ani drog u Činčily nepotvrdil a policie uzavřela vyšetřování se závěrem, že nehodu zavinil výhradně cyklista. Činčila navíc v době nehody nezastával žádnou volenou ani jmenovanou funkci. Příspěvek byl v rámci spolupráce se společností Meta označen jako nepravdivý.",
    manipulationType: "Zavádějící tvrzení",
    verifiedDate: "2026-07-23",
    sources: [
      {
        label: "Příspěvek překrucuje autonehodu lidoveckého poslance. Drogy ani alkohol se nepotvrdily.",
        publisher: "Demagog.cz",
        url: "https://demagog.cz/diskuze/prispevek-prekrucuje-autonehodu-lidoveckeho-poslance-drogy-ani-alkohol-se-nepotvrdily",
      },
    ],
  },
];
