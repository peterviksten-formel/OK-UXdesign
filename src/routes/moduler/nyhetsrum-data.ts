/**
 * Nyhetsrum — delad data för Press, Nyheter och Artiklar.
 *
 * Tre publicistiska "typer" lever sida vid sida: typen styr layout, ton och
 * målgrupp. Kategorier är tvärgående (Energi, Klimat, CCS osv) och används
 * för filtrering på Startsida Nyhetsrum.
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
  /** Pressmeddelande: kontakt visas som sidebar-card */
  presskontakt?: Presskontakt;
  /** Artikel: byline med foto + lästid */
  forfattare?: Forfattare;
  lastid?: string;
  /** Nyhet: TL;DR-punkter visas överst */
  sammanfattning?: string[];
  /** Featured på startsidan (en post i taget) */
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

/** Type-färger — formell grå för press, accent-blå för nyhet, kategori-färg för artikel */
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
    rubrik: "Öresundskraft justerar fjärrvärmepriset i Helsingborg och Ängelholm 2026",
    ingress:
      "Nytt prisåtagande till 2028 ger förutsägbara kostnader för 110 000 hushåll. Genomsnittlig prisökning blir 3,9 procent.",
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
      "Energimyndighetens stöd till koldioxidinfångning på Filbornaverket gör Helsingborg till nationell pilotanläggning för negativa utsläpp.",
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
      "Vi justerar elnätsavgifterna i takt med ökade investeringar i nätet. Här är vad det innebär för dig som privatkund.",
    datum: "2026-04-08",
    bildAlt: "Elnätstation",
    sammanfattning: [
      "Höjningen gäller från 1 juli 2026",
      "Genomsnittlig villakund: ~75 kr/månad mer",
      "Lägenhet: ~25 kr/månad mer",
      "Vi använder höjningen till att förstärka och förnya nätet",
    ],
  },
  {
    id: "n2",
    slug: "tillgangliggor-matvarden",
    typ: "nyhet",
    kategori: "infrastruktur",
    rubrik: "Du kan nu hämta dina mätvärden direkt i appen",
    ingress:
      "Från och med april kan du som privatkund se din timmesvis förbrukning direkt i Mina sidor — perfekt för dig som vill optimera elanvändningen.",
    datum: "2026-04-02",
    bildAlt: "Skärmdump av app med timmesvis förbrukning",
    sammanfattning: [
      "Timmesvis data direkt i appen",
      "Funktion finns för alla nätkunder i Helsingborg och Ängelholm",
      "Inget extra abonnemang krävs",
    ],
  },
  {
    id: "a1",
    slug: "solceller-storre-nytta",
    typ: "artikel",
    kategori: "utbildning",
    rubrik: "Hur kan solceller ge större nytta i hushållen framöver?",
    ingress:
      "Med rätt kombination av panel, batteri och styrning kan en typvilla dubbla sin självförsörjning. Vi går igenom vad som faktiskt fungerar — och vad som är överreklam.",
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
      "Energikartläggningen visade Clemondos besparingspotential — 1,2 miljoner kr per år",
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
      "Vi sänker framledningstemperaturen från 90 till 70 grader. Det låter teknisk men sparar 8 % energi och möjliggör nya värmekällor.",
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
      "Mellan 6 och 28 maj förstärker vi elnätet i Rydebäck för att möta de senaste årens ökade förbrukning från elbilsladdning och värmepumpar.",
    datum: "2026-04-22",
    bildAlt: "Schaktning för elkabel",
    sammanfattning: [
      "Pågår 6–28 maj 2026",
      "Berör Rydebäck och Gantofta",
      "Inga längre avbrott planerade — kortare omkopplingar kan förekomma",
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
      "Öresundskraft redovisar 4,2 miljarder kronor i omsättning och en ökad investeringstakt i elnätet — totalt 680 miljoner under året.",
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
      "Tre nya funktioner rullar ut i april — du kan nu ställa in schema per veckodag, koppla till spotpriset och få push-notiser när elen är extra billig.",
    datum: "2026-04-18",
    bildAlt: "Skärmdump av Ladda Smart-appen",
    sammanfattning: [
      "Schemaläggning per veckodag",
      "Auto-laddning vid lägsta spotpris",
      "Push-notiser när elen är extra billig",
    ],
  },
  {
    id: "n5",
    slug: "uppdaterade-villkor-mina-sidor",
    typ: "nyhet",
    kategori: "energi",
    rubrik: "Uppdaterade villkor för Mina sidor — gäller från 1 juni",
    ingress:
      "Vi har förenklat språket och förtydligat hanteringen av personuppgifter. Inga ekonomiska villkor ändras.",
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
    rubrik: "Effekttariffer förklarade — så undviker du onödiga toppar",
    ingress:
      "Effekttariffen straffar inte hur mycket el du använder, utan när du använder den mest. En liten ändring i vanor kan ge större besparing än man tror.",
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

/** Helper — hämtar typsäkert en post via slug */
export function getPostBySlug(slug: string): NyhetsrumPost | undefined {
  return NYHETSRUM.find((p) => p.slug === slug);
}
