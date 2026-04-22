/**
 * Shared placeholder data for Produktinfo + Produktlisting modules.
 * Based on Öresundskraft's "Smarta produkter och tjänster" category.
 */

export type ProduktId = "ladda-smart" | "solceller" | "varmepump" | "hemmaladdare" | "energiradgivning" | "framtidspengen";

export type Produkt = {
  id: ProduktId;
  namn: string;
  kategori: string;
  tagline: string;
  beskrivning: string;
  pris: { typ: "fast" | "fran" | "offert"; belopp?: string; enhet?: string };
  inkluderar: string[];
  villkor: string[];
  uspar: string[];       // USPs / selling points
  passarFor: string;
  bildAlt: string;       // alt text for placeholder image
  cta: { label: string; typ: "kop" | "offert" | "kontakt" };
};

export const PRODUKTER: Produkt[] = [
  {
    id: "ladda-smart",
    namn: "Ladda Smart",
    kategori: "Elbil & laddning",
    tagline: "Smart laddning för elbil — hemma eller på jobbet.",
    beskrivning: "Installation av laddbox, smart styrning via app, och en eltariff optimerad för nattladdning. Vi tar hand om allt från besiktning till installation.",
    pris: { typ: "fran", belopp: "14 900", enhet: "kr inkl. installation" },
    inkluderar: [
      "Laddbox (Easee eller Zaptec)",
      "Installation av certifierad elektriker",
      "Smart styrning via app",
      "Rotavdrag hanterat",
    ],
    villkor: [
      "Kräver jordfelsbrytare typ B",
      "Elcentral max 15m från garagevägg",
      "Besiktning ingår — kan medföra tillägg",
    ],
    uspar: [
      "Ladda billigare på natten med smart styrning",
      "Rotavdrag — dra av 30% av arbetskostnaden",
      "Installation klar inom 2 veckor",
    ],
    passarFor: "Dig som har elbil och vill ladda hemma till lägsta möjliga kostnad.",
    bildAlt: "Laddbox monterad på garagevägg med ansluten elbil",
    cta: { label: "Beställ Ladda Smart", typ: "kop" },
  },
  {
    id: "solceller",
    namn: "Solceller",
    kategori: "Egen elproduktion",
    tagline: "Producera din egen el — vi hjälper dig hela vägen.",
    beskrivning: "Solcellsanläggning dimensionerad efter ditt tak och din förbrukning. Inklusive projektering, installation och anslutning till nätet. Du säljer överskottet.",
    pris: { typ: "offert" },
    inkluderar: [
      "Solcellspaneler + växelriktare",
      "Projektering och dimensionering",
      "Installation av certifierad montör",
      "Anslutning till elnätet",
      "10 års produktgaranti",
    ],
    villkor: [
      "Takbesiktning krävs",
      "Söder-/väst-/östläge rekommenderas",
      "Bygglov kan krävas i kulturmiljö",
    ],
    uspar: [
      "Sänk dina elkostnader med upp till 40%",
      "Sälj överskottselen till nätet",
      "Grönt skatteavdrag: 20% av totalkostnaden",
    ],
    passarFor: "Villaägare som vill producera egen el och sänka sina elkostnader långsiktigt.",
    bildAlt: "Solcellspaneler på ett villatak i nordvästra Skåne",
    cta: { label: "Boka kostnadsfri rådgivning", typ: "offert" },
  },
  {
    id: "varmepump",
    namn: "Värmepump",
    kategori: "Uppvärmning",
    tagline: "Byt till värmepump — spara energi och pengar.",
    beskrivning: "Vi hjälper dig välja rätt värmepump för ditt hem, hanterar installation och ser till att allt fungerar.",
    pris: { typ: "offert" },
    inkluderar: [
      "Energirådgivning",
      "Val av värmepump efter behov",
      "Installation av certifierad installatör",
      "Injustering och driftsättning",
    ],
    villkor: [
      "Besiktning av befintlig uppvärmning",
      "Bergvärme kräver borrning (separat tillstånd)",
    ],
    uspar: [
      "Spara upp till 75% på uppvärmningskostnaden",
      "Grönt skatteavdrag",
      "Kombinerbart med solceller",
    ],
    passarFor: "Villaägare med direktel eller äldre oljepanna som vill sänka uppvärmningskostnaden.",
    bildAlt: "Luft-vattenvärmepump monterad på villavägg",
    cta: { label: "Boka rådgivning", typ: "offert" },
  },
  {
    id: "hemmaladdare",
    namn: "Hemmaladdare Flex",
    kategori: "Elbil & laddning",
    tagline: "Enkel laddbox utan smart styrning — lägre pris.",
    beskrivning: "Grundläggande laddbox för dig som inte behöver app-styrning eller smart nattladdning. Laddboxen installeras på vägg nära parkeringen.",
    pris: { typ: "fran", belopp: "8 900", enhet: "kr inkl. installation" },
    inkluderar: [
      "Laddbox (standardmodell)",
      "Installation av certifierad elektriker",
      "Rotavdrag hanterat",
    ],
    villkor: [
      "Kräver jordfelsbrytare typ B",
      "Enkel = ingen app, ingen smart styrning",
    ],
    uspar: [
      "Lägre ingångspris än Ladda Smart",
      "Rotavdrag — dra av 30% av arbetskostnaden",
      "Snabb installation",
    ],
    passarFor: "Dig som bara vill ladda elbilen hemma utan extra funktioner.",
    bildAlt: "Enkel vitmålad laddbox på garagevägg",
    cta: { label: "Beställ Hemmaladdare", typ: "kop" },
  },
  {
    id: "energiradgivning",
    namn: "Energirådgivning",
    kategori: "Tjänster",
    tagline: "Kostnadsfri rådgivning — vi hjälper dig spara.",
    beskrivning: "Boka ett kostnadsfritt samtal med vår energirådgivare. Vi går igenom din förbrukning och ger konkreta tips på hur du kan sänka dina kostnader.",
    pris: { typ: "fast", belopp: "0", enhet: "kr" },
    inkluderar: [
      "30 min rådgivningssamtal",
      "Genomgång av din årsförbrukning",
      "Konkreta sparåtgärder",
      "Uppföljning via e-post",
    ],
    villkor: ["Bokas via telefon eller Mina sidor"],
    uspar: [
      "Helt kostnadsfritt",
      "Personlig rådgivning — inte en chatbot",
      "Inga krav på att köpa något",
    ],
    passarFor: "Alla som vill förstå sin elförbrukning bättre och hitta sätt att spara.",
    bildAlt: "Energirådgivare i samtal med kund",
    cta: { label: "Boka rådgivning", typ: "kontakt" },
  },
  {
    id: "framtidspengen",
    namn: "Framtidspengen",
    kategori: "Tillägg",
    tagline: "Investera i lokala miljöprojekt med varje kWh.",
    beskrivning: "Ett frivilligt tillägg till ditt elavtal. För varje kWh du använder går en del till lokala hållbarhetsprojekt i nordvästra Skåne.",
    pris: { typ: "fast", belopp: "3", enhet: "öre/kWh" },
    inkluderar: [
      "Automatiskt tillägg på din elfaktura",
      "Pengarna går till lokala miljöprojekt",
      "Kvartalsvis rapport om vad pengarna använts till",
    ],
    villkor: ["Kan slås av när som helst via Mina sidor"],
    uspar: [
      "Gör skillnad lokalt — i ditt eget område",
      "Helt frivilligt, inga bindningstider",
      "Transparent: du ser vad pengarna går till",
    ],
    passarFor: "Dig som vill bidra till hållbarhet utan att byta avtal eller livsstil.",
    bildAlt: "Naturområde i nordvästra Skåne med vindkraftverk i bakgrunden",
    cta: { label: "Lägg till Framtidspengen", typ: "kop" },
  },
];
