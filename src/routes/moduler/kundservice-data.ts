/**
 * Shared data for the Kundservice-triage module.
 * This is the "Jag behöver hjälp med…" interactive narrowing pattern.
 */

export type KategoriId = "faktura" | "avtal" | "flytt" | "avbrott" | "elnat" | "ovrigt";

export type Kategori = {
  id: KategoriId;
  ikon: string;
  label: string;
  beskrivning: string;
  underkategorier: Underkategori[];
};

export type Underkategori = {
  id: string;
  label: string;
  action: Action;
};

export type Action =
  | { type: "link"; label: string; href: string; description: string }
  | { type: "mina-sidor"; label: string; description: string }
  | { type: "kontakt"; kanal: "chatt" | "telefon" | "epost"; label: string; description: string; tid?: string }
  | { type: "info"; label: string; description: string };

export const KATEGORIER: Kategori[] = [
  {
    id: "faktura",
    ikon: "description",
    label: "Faktura & betalning",
    beskrivning: "Frågor om fakturor, betalning, autogiro och e-faktura.",
    underkategorier: [
      {
        id: "faktura-forstar-inte",
        label: "Jag förstår inte min faktura",
        action: { type: "link", label: "Förstå din faktura", href: "#", description: "Steg-för-steg-guide som förklarar varje rad på din faktura." },
      },
      {
        id: "faktura-betala",
        label: "Jag vill ändra betalsätt",
        action: { type: "mina-sidor", label: "Ändra betalsätt", description: "Logga in på Mina sidor för att ställa in autogiro eller e-faktura." },
      },
      {
        id: "faktura-hog",
        label: "Min faktura är ovanligt hög",
        action: { type: "link", label: "Varför är min faktura hög?", href: "#", description: "Vanliga orsaker: vintermånader, ändrad förbrukning, eller prisändring. Vi förklarar." },
      },
      {
        id: "faktura-betalat",
        label: "Jag har redan betalat men fått påminnelse",
        action: { type: "kontakt", kanal: "chatt", label: "Chatta med oss", description: "Betalningar kan ta 1–3 bankdagar. Chatten hjälper dig kontrollera status.", tid: "Svarstid: ~2 min" },
      },
    ],
  },
  {
    id: "avtal",
    ikon: "edit_note",
    label: "Avtal & priser",
    beskrivning: "Teckna, byta eller förstå ditt elavtal.",
    underkategorier: [
      {
        id: "avtal-nytt",
        label: "Jag vill teckna nytt elavtal",
        action: { type: "link", label: "Teckna elavtal", href: "/moduler/elavtal-jamfor", description: "Jämför våra tre avtal och teckna direkt, tar ca 3 minuter." },
      },
      {
        id: "avtal-byta",
        label: "Jag vill byta avtal",
        action: { type: "mina-sidor", label: "Byt avtal på Mina sidor", description: "Logga in och välj nytt avtal. Inga samtal behövs, allt sker direkt." },
      },
      {
        id: "avtal-forstå-pris",
        label: "Jag förstår inte mitt elpris",
        action: { type: "link", label: "Så fungerar elpriset", href: "#", description: "Vad är påslag, spotpris och energiskatt? Vi förklarar varje del." },
      },
      {
        id: "avtal-anvisat",
        label: "Jag har ett anvisat avtal",
        action: { type: "link", label: "Vad är anvisat avtal?", href: "#", description: "Du har ett tillfälligt avtal som ofta är dyrare. Byt gratis, tar 3 min." },
      },
    ],
  },
  {
    id: "flytt",
    ikon: "home",
    label: "Flytta",
    beskrivning: "Flytta in, flytta ut, eller flytta inom nätet.",
    underkategorier: [
      {
        id: "flytt-in",
        label: "Jag ska flytta in",
        action: { type: "link", label: "Anmäl inflyttning", href: "#", description: "Gör det senast 3 veckor före. Du behöver personnummer och tillträdesdag." },
      },
      {
        id: "flytt-ut",
        label: "Jag ska flytta ut",
        action: { type: "link", label: "Anmäl utflyttning", href: "#", description: "Avanmäl senast 3 veckor före. Du behöver sista dag och mätarnummer." },
      },
      {
        id: "flytt-inom",
        label: "Jag flyttar inom Helsingborg/Ängelholm",
        action: { type: "link", label: "Flytta ditt avtal", href: "#", description: "Ditt elhandelsavtal följer med dig, anmäl bara ny adress." },
      },
    ],
  },
  {
    id: "avbrott",
    ikon: "bolt",
    label: "Strömavbrott",
    beskrivning: "Aktuella avbrott, felanmälan och driftstörningar.",
    underkategorier: [
      {
        id: "avbrott-nu",
        label: "Jag har inget ström just nu",
        action: { type: "link", label: "Se aktuella avbrott", href: "/moduler/avbrottslista", description: "Kolla om avbrottet redan är anmält. Om inte, gör en felanmälan." },
      },
      {
        id: "avbrott-planerat",
        label: "Kommer det bli avbrott snart?",
        action: { type: "link", label: "Planerade avbrott", href: "/moduler/avbrottslista", description: "Se kommande planerade avbrott i ditt område." },
      },
      {
        id: "avbrott-felanmal",
        label: "Jag vill göra en felanmälan",
        action: { type: "kontakt", kanal: "telefon", label: "Ring felanmälan", description: "Akuta fel anmäls via telefon dygnet runt.", tid: "042-490 32 00" },
      },
    ],
  },
  {
    id: "elnat",
    ikon: "power",
    label: "Elnät & mätare",
    beskrivning: "Mätarställning, nätavgift, anslutning och servis.",
    underkategorier: [
      {
        id: "elnat-matare",
        label: "Jag vill rapportera mätarställning",
        action: { type: "mina-sidor", label: "Rapportera mätarställning", description: "Logga in på Mina sidor och rapportera din aktuella mätarställning." },
      },
      {
        id: "elnat-anslutning",
        label: "Jag behöver ny elanslutning",
        action: { type: "link", label: "Ansök om anslutning", href: "#", description: "Ny bostad eller tillbyggnad? Ansök om ny anslutning, handläggningstid ca 4 veckor." },
      },
      {
        id: "elnat-natavgift",
        label: "Vad kostar nätavgiften?",
        action: { type: "link", label: "Se nätavgifter", href: "#", description: "Nätavgiften består av en fast del och en rörlig del baserad på förbrukning." },
      },
    ],
  },
  {
    id: "ovrigt",
    ikon: "help",
    label: "Annat",
    beskrivning: "Solceller, laddbox, fjärrvärme, eller en fråga vi inte listade.",
    underkategorier: [
      {
        id: "ovrigt-sol",
        label: "Jag är intresserad av solceller",
        action: { type: "link", label: "Solceller hos Öresundskraft", href: "#", description: "Producera din egen el, vi hjälper dig hela vägen." },
      },
      {
        id: "ovrigt-laddbox",
        label: "Jag vill installera laddbox",
        action: { type: "link", label: "Ladda Smart", href: "#", description: "Installation och smarta laddtjänster för elbil." },
      },
      {
        id: "ovrigt-kontakt",
        label: "Jag hittar inte det jag letar efter",
        action: { type: "kontakt", kanal: "chatt", label: "Chatta med oss", description: "Vår chatt är öppen vardagar 08–17. Vi hjälper dig hitta rätt.", tid: "Svarstid: ~2 min" },
      },
    ],
  },
];
