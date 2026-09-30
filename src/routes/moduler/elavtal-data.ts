/**
 * Gemensamt platshållarinnehåll för alla tre varianter av Jämför elavtal.
 * Siffrorna är uppskattningar för elprisområde SE4 (Helsingborg och
 * Ängelholm) baserat på snittspotpris och typiska påslag. De ska bytas mot
 * verkliga siffror innan lansering. Lägenhet = 2 000 kWh/år, villa = 20 000 kWh/år.
 */

export type PlanId = "sakrat" | "kvartspris" | "manadspris";

export type Plan = {
  id: PlanId;
  namn: string;
  /** Används i knapptexter, t.ex. "Teckna säkrat pris". */
  kortNamn: string;
  beskrivning: string;
  /** Ska börja med "Bäst för dig som", den tabellformade varianten tar bort början. */
  bastFor: string;
  prismekanism: string;
  bindning: string;
  pasalg: string;
  uppskattning: { lagenhet: string; villa: string };
  /**
   * Ungefärligt pris i kr per kWh inklusive elhandel och påslag. Används av
   * den progressiva varianten för att räkna om månadskostnaden direkt när
   * användaren ändrar sin förbrukning.
   * Uppskattad månadskostnad = kr per kWh × kWh per år / 12.
   */
  krPerKwh: number;
  fordelar: string[];
  funderingar: string[];
};

export const PLANS: Plan[] = [
  {
    id: "sakrat",
    namn: "Säkrat pris",
    kortNamn: "Säkrat pris",
    beskrivning: "Du vet vad elen kostar varje månad. Inga prischocker.",
    bastFor: "Bäst för dig som vill veta vad du betalar och slippa hålla koll.",
    prismekanism: "Fast pris hela avtalstiden",
    bindning: "12 eller 36 månader",
    pasalg: "6,5 öre/kWh",
    uppskattning: { lagenhet: "~285 kr/mån", villa: "~2 850 kr/mån" },
    krPerKwh: 1.71,
    fordelar: ["Samma pris varje månad", "Skyddar dig mot prisökningar", "Inga överraskningar på fakturan"],
    funderingar: ["Du får inte lägre pris om elpriset sjunker", "Du är bunden under avtalstiden"],
  },
  {
    id: "kvartspris",
    namn: "Kvartspris",
    kortNamn: "Kvartspris",
    beskrivning: "Priset sätts en gång per kvartal. Ett mellanting mellan rörligt och fast pris.",
    bastFor: "Bäst för dig som vill ha ett stabilare pris utan lång bindning.",
    prismekanism: "Nytt pris var tredje månad",
    bindning: "Ingen bindningstid",
    pasalg: "5,0 öre/kWh",
    uppskattning: { lagenhet: "~245 kr/mån", villa: "~2 450 kr/mån" },
    krPerKwh: 1.47,
    fordelar: ["Svänger mindre än rörligt pris", "Ingen bindningstid", "Du följer marknaden"],
    funderingar: ["Priset kan bli högre när det räknas om"],
  },
  {
    id: "manadspris",
    namn: "Månadspris (rörligt)",
    kortNamn: "Månadspris",
    beskrivning: "Du betalar elbörsens snittpris för månaden.",
    bastFor: "Bäst för dig som är flexibel och vill styra din elanvändning själv.",
    prismekanism: "Timpris från elbörsen, faktureras per månad",
    bindning: "Ingen bindningstid",
    pasalg: "4,5 öre/kWh",
    uppskattning: { lagenhet: "~215 kr/mån", villa: "~2 150 kr/mån" },
    krPerKwh: 1.29,
    fordelar: ["Lägst kostnad i snitt över tid", "Du sparar när du använder el under billiga timmar", "Ingen bindningstid"],
    funderingar: ["Vintermånaderna kan bli dyrare", "Du behöver hålla lite koll på elpriset"],
  },
];

export type BoendeTyp = "lagenhet" | "villa";

export const BOENDE_KWH: Record<BoendeTyp, number> = {
  lagenhet: 2000,
  villa: 20000,
};

/** Gemensam ordlista som den experimentella varianten visar när man pekar på ett begrepp. */
export const TERMER: Record<string, { kort: string; lang: string }> = {
  påslag: {
    kort: "Det vi tar betalt utöver elpriset.",
    lang: "Påslaget är Öresundskrafts marginal per kWh. Det står alltid i avtalet och ändras inte under avtalstiden.",
  },
  spotpris: {
    kort: "Elbörsens pris, timme för timme.",
    lang: "Spotpriset sätts varje timme på elbörsen Nord Pool. Det beror på hur mycket el som finns och hur mycket som används i ditt elprisområde.",
  },
  elprisområde: {
    kort: "Sverige är delat i fyra prisområden.",
    lang: "Helsingborg och Ängelholm ligger i SE4, det sydligaste prisområdet. Där är elen oftast dyrast i landet.",
  },
  bindningstid: {
    kort: "Hur länge avtalet minst gäller.",
    lang: "Med bindningstid är priset låst, men du kan inte byta avtal förrän tiden har gått ut. Utan bindningstid kan du säga upp avtalet med en månads uppsägningstid.",
  },
  anvisat_avtal: {
    kort: "Avtalet du får om du inte väljer själv.",
    lang: "Om du flyttar in eller saknar elavtal får du automatiskt ett anvisat avtal från den elhandlare som ditt nätbolag har valt. Det är oftast dyrare än ett avtal du väljer själv.",
  },
};
