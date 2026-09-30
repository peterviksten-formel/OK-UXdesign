/**
 * Gemensamt innehåll för kundservicemodulen ("Jag behöver hjälp med…").
 * Alla tre varianterna hämtar ämnen, frågor och svar härifrån, så en ändring
 * här slår igenom överallt. Frågorna skrivs i kundens röst ("Jag vill…"),
 * knapptexterna som verb + objekt och svaren i en eller två korta meningar.
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
    label: "Faktura och betalning",
    beskrivning: "Fakturor, betalning, autogiro och e-faktura.",
    underkategorier: [
      {
        id: "faktura-forstar-inte",
        label: "Jag förstår inte min faktura",
        action: { type: "link", label: "Läs guiden om fakturan", href: "#", description: "Guiden går igenom din faktura rad för rad." },
      },
      {
        id: "faktura-betala",
        label: "Jag vill ändra betalsätt",
        action: { type: "mina-sidor", label: "Ändra betalsätt", description: "Logga in på Mina sidor och välj autogiro eller e-faktura." },
      },
      {
        id: "faktura-hog",
        label: "Min faktura är ovanligt hög",
        action: { type: "link", label: "Se vanliga orsaker", href: "#", description: "Oftast beror det på vintermånader, att du använt mer el eller att priset har ändrats." },
      },
      {
        id: "faktura-betalat",
        label: "Jag har betalat men fått en påminnelse",
        action: { type: "kontakt", kanal: "chatt", label: "Chatta med oss", description: "En betalning kan ta 1-3 bankdagar att nå oss. I chatten kan vi se om din betalning har kommit in.", tid: "Svarstid cirka 2 min" },
      },
    ],
  },
  {
    id: "avtal",
    ikon: "edit_note",
    label: "Avtal och priser",
    beskrivning: "Teckna, byt eller förstå ditt elavtal.",
    underkategorier: [
      {
        id: "avtal-nytt",
        label: "Jag vill teckna nytt elavtal",
        action: { type: "link", label: "Teckna elavtal", href: "/moduler/elavtal-jamfor", description: "Jämför våra tre avtal och teckna direkt. Det tar ungefär 3 minuter." },
      },
      {
        id: "avtal-byta",
        label: "Jag vill byta avtal",
        action: { type: "mina-sidor", label: "Byt avtal på Mina sidor", description: "Logga in och välj nytt avtal. Bytet görs direkt och du behöver inte ringa." },
      },
      {
        id: "avtal-forstå-pris",
        label: "Jag förstår inte mitt elpris",
        action: { type: "link", label: "Läs om elpriset", href: "#", description: "Vi förklarar vad påslag, spotpris och energiskatt betyder för ditt pris." },
      },
      {
        id: "avtal-anvisat",
        label: "Jag har ett anvisat avtal",
        action: { type: "link", label: "Läs om anvisat avtal", href: "#", description: "Ett anvisat avtal är tillfälligt och ofta dyrare. Du byter gratis på ungefär 3 minuter." },
      },
    ],
  },
  {
    id: "flytt",
    ikon: "home",
    label: "Flytta",
    beskrivning: "Flytta in, flytta ut eller flytta inom vårt område.",
    underkategorier: [
      {
        id: "flytt-in",
        label: "Jag ska flytta in",
        action: { type: "link", label: "Anmäl inflyttning", href: "#", description: "Anmäl senast 3 veckor innan du flyttar in. Ha personnummer och tillträdesdag till hands." },
      },
      {
        id: "flytt-ut",
        label: "Jag ska flytta ut",
        action: { type: "link", label: "Anmäl utflyttning", href: "#", description: "Anmäl senast 3 veckor innan du flyttar ut. Ha sista boendedag och mätarnummer till hands." },
      },
      {
        id: "flytt-inom",
        label: "Jag flyttar inom Helsingborg/Ängelholm",
        action: { type: "link", label: "Anmäl ny adress", href: "#", description: "Ditt elavtal följer med dig. Du behöver bara anmäla din nya adress." },
      },
    ],
  },
  {
    id: "avbrott",
    ikon: "bolt",
    label: "Strömavbrott",
    beskrivning: "Pågående avbrott, planerade avbrott och felanmälan.",
    underkategorier: [
      {
        id: "avbrott-nu",
        label: "Jag har ingen ström just nu",
        action: { type: "link", label: "Se aktuella avbrott", href: "/moduler/avbrottslista", description: "Se om avbrottet redan är känt. Finns det inte med kan du göra en felanmälan." },
      },
      {
        id: "avbrott-planerat",
        label: "Blir det avbrott i mitt område snart?",
        action: { type: "link", label: "Se planerade avbrott", href: "/moduler/avbrottslista", description: "Här ser du när vi planerar arbeten som stänger av strömmen i ditt område." },
      },
      {
        id: "avbrott-felanmal",
        label: "Jag vill göra en felanmälan",
        action: { type: "kontakt", kanal: "telefon", label: "Ring felanmälan", description: "Ring oss om du har ett akut fel. Vi svarar dygnet runt.", tid: "042-490 32 00" },
      },
    ],
  },
  {
    id: "elnat",
    ikon: "power",
    label: "Elnät och mätare",
    beskrivning: "Mätarställning, nätavgift och ny anslutning.",
    underkategorier: [
      {
        id: "elnat-matare",
        label: "Jag vill rapportera mätarställning",
        action: { type: "mina-sidor", label: "Rapportera mätarställning", description: "Logga in på Mina sidor och skriv in vad din mätare visar i dag." },
      },
      {
        id: "elnat-anslutning",
        label: "Jag behöver ny elanslutning",
        action: { type: "link", label: "Ansök om anslutning", href: "#", description: "Bygger du nytt eller bygger till? Ansök om anslutning. Handläggningen tar ungefär 4 veckor." },
      },
      {
        id: "elnat-natavgift",
        label: "Vad kostar nätavgiften?",
        action: { type: "link", label: "Se nätavgifter", href: "#", description: "Nätavgiften har en fast del och en rörlig del som beror på hur mycket el du använder." },
      },
    ],
  },
  {
    id: "ovrigt",
    ikon: "help",
    label: "Annat",
    beskrivning: "Solceller, laddbox, fjärrvärme eller något annat.",
    underkategorier: [
      {
        id: "ovrigt-sol",
        label: "Jag är intresserad av solceller",
        action: { type: "link", label: "Läs om solceller", href: "#", description: "Producera din egen el. Vi hjälper dig hela vägen." },
      },
      {
        id: "ovrigt-laddbox",
        label: "Jag vill installera laddbox",
        action: { type: "link", label: "Läs om Ladda Smart", href: "#", description: "Vi installerar laddbox och erbjuder smarta laddtjänster för elbilen." },
      },
      {
        id: "ovrigt-kontakt",
        label: "Jag hittar inte det jag letar efter",
        action: { type: "kontakt", kanal: "chatt", label: "Chatta med oss", description: "Chatten är öppen vardagar 08-17. Vi hjälper dig att hitta rätt.", tid: "Svarstid cirka 2 min" },
      },
    ],
  },
];
