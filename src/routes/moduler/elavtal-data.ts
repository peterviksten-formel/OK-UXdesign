/**
 * Shared placeholder data used by all three Jämför-elavtal variants.
 * Siffrorna är uppskattningar för SE4 (Helsingborg/Ängelholm) baserat på
 * snittspotpris + typiska påslag, ska bytas mot verkliga siffror innan
 * lansering. Lägenhet = 2 000 kWh/år, villa = 20 000 kWh/år.
 */

export type PlanId = "sakrat" | "kvartspris" | "manadspris";

export type Plan = {
  id: PlanId;
  namn: string;
  kortNamn: string;
  beskrivning: string;
  bastFor: string;
  prismekanism: string;
  bindning: string;
  pasalg: string;
  uppskattning: { lagenhet: string; villa: string };
  /**
   * Effektiv kr/kWh inkl. elhandel + påslag. Används av Progressiv-variantens
   * kalkylator för att räkna om pris live när användaren ändrar förbrukning.
   * Uppskattad totalkostnad = krPerKwh × kWh / 12.
   */
  krPerKwh: number;
  fordelar: string[];
  funderingar: string[];
};

export const PLANS: Plan[] = [
  {
    id: "sakrat",
    namn: "Säkrat pris",
    kortNamn: "Säkrat",
    beskrivning: "Du vet vad du betalar varje månad. Ingen prischock.",
    bastFor: "Bäst för dig som vill ha förutsägbarhet och slippa hålla koll.",
    prismekanism: "Fast pris hela avtalsperioden",
    bindning: "12 eller 36 månader",
    pasalg: "6,5 öre/kWh",
    uppskattning: { lagenhet: "~285 kr/mån", villa: "~2 850 kr/mån" },
    krPerKwh: 1.71,
    fordelar: ["Samma månadskostnad", "Skydd mot prisökningar", "Inga överraskningar"],
    funderingar: ["Du tjänar inte på att priset sjunker", "Bindningstid"],
  },
  {
    id: "kvartspris",
    namn: "Kvartspris",
    kortNamn: "Kvartspris",
    beskrivning: "Priset bestäms en gång i kvartalet. Mellanting mellan rörligt och fast.",
    bastFor: "Bäst för dig som vill ha viss stabilitet utan lång bindning.",
    prismekanism: "Nytt pris var tredje månad",
    bindning: "Ingen bindningstid",
    pasalg: "5,0 öre/kWh",
    uppskattning: { lagenhet: "~245 kr/mån", villa: "~2 450 kr/mån" },
    krPerKwh: 1.47,
    fordelar: ["Mindre svängningar än rörligt", "Ingen bindningstid", "Du följer marknaden"],
    funderingar: ["Priset kan stiga vid omräkning"],
  },
  {
    id: "manadspris",
    namn: "Månadspris (rörligt)",
    kortNamn: "Månadspris",
    beskrivning: "Du betalar genomsnittspriset på elbörsen för månaden.",
    bastFor: "Bäst för dig som är flexibel och vill kunna styra elanvändningen.",
    prismekanism: "Spotpris per timme, debiterat månadsvis",
    bindning: "Ingen bindningstid",
    pasalg: "4,5 öre/kWh",
    uppskattning: { lagenhet: "~215 kr/mån", villa: "~2 150 kr/mån" },
    krPerKwh: 1.29,
    fordelar: ["Lägst kostnad i snitt över tid", "Du belönas för smart förbrukning", "Ingen bindningstid"],
    funderingar: ["Vintermånader kan kosta mer", "Kräver lite koll"],
  },
];

export type BoendeTyp = "lagenhet" | "villa";

export const BOENDE_KWH: Record<BoendeTyp, number> = {
  lagenhet: 2000,
  villa: 20000,
};

/** Centralised glossary used by Variant C tooltips. */
export const TERMER: Record<string, { kort: string; lang: string }> = {
  påslag: {
    kort: "Vad vi tar betalt utöver elpriset.",
    lang: "Påslag är öresundskrafts marginal per kWh, det syns alltid i avtalet och förändras inte under avtalsperioden.",
  },
  spotpris: {
    kort: "Marknadens pris timme för timme.",
    lang: "Spotpriset bestäms på Nord Pool varje timme baserat på utbud och efterfrågan på el i din elprisområde.",
  },
  elprisområde: {
    kort: "Sverige är delat i fyra zoner.",
    lang: "Helsingborg och Ängelholm ligger i SE4, vårt sydligaste prisområde där elen oftast är dyrast i landet.",
  },
  bindningstid: {
    kort: "Hur länge avtalet gäller minst.",
    lang: "Med bindningstid är priset låst men du kan inte byta avtal innan tiden gått ut. Utan bindningstid kan du säga upp avtalet med en månads uppsägningstid.",
  },
  anvisat_avtal: {
    kort: "Avtalet du får om du inte väljer.",
    lang: "Om du flyttar in eller saknar elavtal får du automatiskt ett 'anvisat avtal' från ditt nätägarbolags valda elhandlare. Det är oftast dyrare än att aktivt välja avtal.",
  },
};
