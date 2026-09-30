/**
 * Nyhetsrum: delad innehållsdata för pressmeddelanden, nyheter och artiklar.
 *
 * Tre innehållstyper lever sida vid sida. Typen styr layout, ton och
 * målgrupp. Kategorierna (Energi, Klimat, CCS osv.) går tvärs över typerna
 * och används för filtrering på startsidan för Nyhetsrummet.
 */

export type NyhetsrumTyp = "press" | "nyhet" | "artikel";

export type NyhetsrumKategori =
  | "energi"
  | "klimat"
  | "ccs"
  | "infrastruktur"
  | "kundcase"
  | "utbildning"
  | "hallbarhet";

export type Presskontakt = {
  namn: string;
  titel: string;
  tel: string;
  mejl: string;
  initialer: string;
};

export type Forfattare = {
  namn: string;
  roll: string;
  initialer: string;
};

export type NyhetsrumPost = {
  id: string;
  slug: string;
  typ: NyhetsrumTyp;
  kategori: NyhetsrumKategori;
  rubrik: string;
  ingress: string;
  /** ISO-datum: "2026-04-22" */
  datum: string;
  bildAlt: string;
  /** Pressmeddelande: presskontakten visas i en fast ruta bredvid texten */
  presskontakt?: Presskontakt;
  /** Artikel: författarrad med foto och lästid */
  forfattare?: Forfattare;
  lastid?: string;
  /** Nyhet: sammanfattningspunkter visas överst */
  sammanfattning?: string[];
  /** Utvald post överst på startsidan (en i taget) */
  utvald?: boolean;
};

export const KATEGORI_LABEL: Record<NyhetsrumKategori, string> = {
  energi: "Energi",
  klimat: "Klimat",
  ccs: "CCS",
  infrastruktur: "Infrastruktur",
  kundcase: "Kundcase",
  utbildning: "Utbildning",
  hallbarhet: "Hållbarhet",
};

export const TYP_LABEL: Record<NyhetsrumTyp, string> = {
  press: "Press",
  nyhet: "Nyhet",
  artikel: "Artikel",
};

/** Färg per typ: formell grå för press, blå för nyhet, accentfärg för artikel */
export const TYP_COLOR: Record<NyhetsrumTyp, string> = {
  press: "bg-ink/10 text-ink-secondary",
  nyhet: "bg-tint-info text-brand-primary",
  artikel: "bg-tint-highlight text-brand-primary",
};

const ANNA: Presskontakt = {
  namn: "Anna Lindqvist",
  titel: "Presschef",
  tel: "042-490 32 50",
  mejl: "press@oresundskraft.se",
  initialer: "AL",
};

const ERIK: Forfattare = {
  namn: "Erik Bergman",
  roll: "Energirådgivare",
  initialer: "EB",
};

const MARIA: Forfattare = {
  namn: "Maria Söderström",
  roll: "Hållbarhetschef",
  initialer: "MS",
};

export const NYHETSRUM: NyhetsrumPost[] = [
  {
    id: "p1",
    slug: "fjarrvarmepris-2026",
    typ: "press",
    kategori: "energi",
    rubrik: "Öresundskraft höjer fjärrvärmepriset med 3,9 procent och lovar förutsägbara priser till 2028",
    ingress:
      "Ett nytt prisåtagande till och med 2028 ger 110 000 fjärrvärmekunder i Helsingborg och Ängelholm förutsägbara kostnader. Höjningen gäller från 1 januari 2026.",
    datum: "2026-04-15",
    bildAlt: "Filbornaverket i Helsingborg sett från avstånd",
    presskontakt: ANNA,
    utvald: true,
  },
  {
    id: "p2",
    slug: "industriklivet-ccs",
    typ: "press",
    kategori: "ccs",
    rubrik:
      "Industriklivet beviljar 228 miljoner till CCS på Filbornaverket",
    ingress:
      "Energimyndighetens stöd till koldioxidinfångning på Filbornaverket gör anläggningen i Helsingborg till en nationell pilot för negativa utsläpp.",
    datum: "2026-03-28",
    bildAlt: "Anläggning för koldioxidinfångning",
    presskontakt: ANNA,
  },
  {
    id: "n1",
    slug: "elnatsavgifter-2026",
    typ: "nyhet",
    kategori: "energi",
    rubrik: "Nya elnätsavgifter från 1 juli 2026",
    ingress:
      "Vi höjer elnätsavgifterna för att kunna bygga ut och förnya elnätet. Här ser du vad det betyder för dig som privatkund.",
    datum: "2026-04-08",
    bildAlt: "Elnätstation",
    sammanfattning: [
      "Höjningen gäller från 1 juli 2026",
      "Villa: cirka 75 kronor mer per månad",
      "Lägenhet: cirka 25 kronor mer per månad",
      "Pengarna går till att förstärka och förnya elnätet",
      "Du behöver inte göra något, ändringen syns automatiskt på fakturan",
    ],
  },
  {
    id: "n2",
    slug: "tillgangliggor-matvarden",
    typ: "nyhet",
    kategori: "infrastruktur",
    rubrik: "Du kan nu hämta dina mätvärden direkt i appen",
    ingress:
      "Från april kan du som privatkund se din elförbrukning timme för timme i appen och på Mina sidor. Då ser du när på dygnet du använder mest el.",
    datum: "2026-04-02",
    bildAlt: "Skärmdump av app med timmesvis förbrukning",
    sammanfattning: [
      "Se din förbrukning timme för timme i appen",
      "Gäller alla elnätskunder i Helsingborg och Ängelholm",
      "Kostar inget extra",
    ],
  },
  {
    id: "a1",
    slug: "solceller-storre-nytta",
    typ: "artikel",
    kategori: "utbildning",
    rubrik: "Hur kan solceller ge större nytta i hushållen framöver?",
    ingress:
      "Med rätt kombination av panel, batteri och styrning kan en typvilla dubbla sin självförsörjning. Vi går igenom vad som faktiskt fungerar och vad som är överdrivet.",
    datum: "2026-04-12",
    bildAlt: "Villa med solceller på taket i kvällsljus",
    forfattare: ERIK,
    lastid: "6 min läsning",
  },
  {
    id: "a2",
    slug: "energikartlaggning-clemondo",
    typ: "artikel",
    kategori: "kundcase",
    rubrik:
      "Energikartläggningen visade Clemondos besparingspotential, 1,2 miljoner kr per år",
    ingress:
      "Tillsammans gick vi igenom processflöden, ventilation och belysning. Tre konkreta åtgärder gav återbetalning på under två år.",
    datum: "2026-03-21",
    bildAlt: "Clemondos produktionsanläggning i Helsingborg",
    forfattare: MARIA,
    lastid: "5 min läsning",
  },
  {
    id: "a3",
    slug: "framtidens-fjarrvarme",
    typ: "artikel",
    kategori: "hallbarhet",
    rubrik: "Framtidens fjärrvärme: lägre temperatur, smartare distribution",
    ingress:
      "Vi sänker framledningstemperaturen från 90 till 70 grader. Det låter tekniskt, men det sparar 8 procent energi och gör det möjligt att använda nya värmekällor.",
    datum: "2026-03-10",
    bildAlt: "Fjärrvärmeledning i schaktet vid utgrävning",
    forfattare: MARIA,
    lastid: "7 min läsning",
  },
  {
    id: "n3",
    slug: "byggstart-rydeback",
    typ: "nyhet",
    kategori: "infrastruktur",
    rubrik: "Byggstart för förstärkning av nätet i Rydebäck",
    ingress:
      "Mellan 6 och 28 maj förstärker vi elnätet i Rydebäck. Fler elbilsladdare och värmepumpar har ökat förbrukningen i området de senaste åren.",
    datum: "2026-04-22",
    bildAlt: "Schaktning för elkabel",
    sammanfattning: [
      "Pågår 6 till 28 maj 2026",
      "Berör Rydebäck och Gantofta",
      "Inga längre avbrott är planerade, men korta avbrott vid omkopplingar kan förekomma",
    ],
  },
  {
    id: "p3",
    slug: "fossilfri-fjarrvarme-avsiktsforklaring",
    typ: "press",
    kategori: "klimat",
    rubrik: "Ny avsiktsförklaring för fossilfri fjärrvärme i nordvästra Skåne",
    ingress:
      "Helsingborg, Ängelholm och fyra grannkommuner skriver under en gemensam plan för fossilfri uppvärmning till 2030.",
    datum: "2026-02-12",
    bildAlt: "Underskrift av avsiktsförklaring",
    presskontakt: ANNA,
  },
  {
    id: "p4",
    slug: "bokslutskommunike-2025",
    typ: "press",
    kategori: "energi",
    rubrik: "Bokslutskommuniké 2025: stabil tillväxt och rekordinvesteringar i nätet",
    ingress:
      "Öresundskraft redovisar 4,2 miljarder kronor i omsättning och en ökad investeringstakt i elnätet, totalt 680 miljoner under året.",
    datum: "2026-01-30",
    bildAlt: "Filbornaverket på vintern",
    presskontakt: ANNA,
  },
  {
    id: "n4",
    slug: "ladda-smart-app-uppdatering",
    typ: "nyhet",
    kategori: "infrastruktur",
    rubrik: "Ladda Smart-appen får schemaläggning och spotpris-styrning",
    ingress:
      "I april får appen tre nya funktioner. Du kan ställa in ett laddschema per veckodag, låta bilen ladda när spotpriset är lägst och få en notis när elen är extra billig.",
    datum: "2026-04-18",
    bildAlt: "Skärmdump av Ladda Smart-appen",
    sammanfattning: [
      "Laddschema per veckodag",
      "Automatisk laddning när spotpriset är lägst",
      "Notis när elen är extra billig",
    ],
  },
  {
    id: "n5",
    slug: "uppdaterade-villkor-mina-sidor",
    typ: "nyhet",
    kategori: "energi",
    rubrik: "Uppdaterade villkor för Mina sidor, gäller från 1 juni",
    ingress:
      "Vi har gjort språket enklare och beskriver tydligare hur vi hanterar dina personuppgifter. Priser och andra ekonomiska villkor ändras inte.",
    datum: "2026-04-05",
    bildAlt: "Skärmdump av Mina sidor",
    sammanfattning: [
      "Gäller från 1 juni 2026",
      "Förenklat språk i hela avtalet",
      "Inga ekonomiska villkor ändras",
    ],
  },
  {
    id: "a4",
    slug: "effekttariffer-forklarade",
    typ: "artikel",
    kategori: "utbildning",
    rubrik: "Effekttariffer förklarade, så undviker du onödiga toppar",
    ingress:
      "Effekttariffen handlar inte om hur mycket el du använder, utan om när du använder mest. Små ändringar i vardagen kan spara mer än du tror.",
    datum: "2026-02-28",
    bildAlt: "Effektdiagram över ett dygn",
    forfattare: ERIK,
    lastid: "4 min läsning",
  },
  {
    id: "a5",
    slug: "framtidspengen-ar-tre",
    typ: "artikel",
    kategori: "hallbarhet",
    rubrik: "Framtidspengen år tre: 12 lokala miljöprojekt, 3,4 miljoner kronor",
    ingress:
      "Sedan starten 2023 har Framtidspengen finansierat allt från laddstationer i Pålsjö till våtmarksrestaurering vid Råån. En översikt av tre år.",
    datum: "2026-01-15",
    bildAlt: "Våtmark vid Råån",
    forfattare: MARIA,
    lastid: "8 min läsning",
  },
];

/** Hämtar en post via dess slug */
export function getPostBySlug(slug: string): NyhetsrumPost | undefined {
  return NYHETSRUM.find((p) => p.slug === slug);
}
