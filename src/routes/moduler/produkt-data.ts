/**
 * Gemensamt exempelinnehåll för modulerna Produktinfo och Produktlisting,
 * och för produktsidorna som bygger på dem. Innehållet utgår från
 * Öresundskrafts kategori "Smarta produkter och tjänster".
 *
 * Skrivregler för fälten: tagline är en mening om nyttan för kunden,
 * uspar är korta påståenden som börjar med nyttan, villkor skrivs som
 * hela meningar som kunden förstår utan fackkunskap.
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
  uspar: string[];       // säljargument (USP:ar), nyttan först
  passarFor: string;
  bildAlt: string;       // alt-text som beskriver bilden
  cta: { label: string; typ: "kop" | "offert" | "kontakt" };
};

export const PRODUKTER: Produkt[] = [
  {
    id: "ladda-smart",
    namn: "Ladda Smart",
    kategori: "Elbil & laddning",
    tagline: "Smart laddning för elbil, hemma eller på jobbet.",
    beskrivning: "Vi installerar laddboxen, kopplar in smart styrning via app och ger dig ett elpris anpassat för nattladdning. Vi tar hand om allt, från besiktning till färdig installation.",
    pris: { typ: "fran", belopp: "14 900", enhet: "kr inkl. installation" },
    inkluderar: [
      "Laddbox (Easee eller Zaptec)",
      "Installation av certifierad elektriker",
      "Smart styrning via app",
      "Rotavdrag hanterat",
    ],
    villkor: [
      "Kräver jordfelsbrytare typ B",
      "Elcentralen får sitta högst 15 m från garageväggen",
      "Besiktning ingår. Om den visar att något behöver åtgärdas kan det tillkomma kostnader",
    ],
    uspar: [
      "Ladda billigare på natten med smart styrning",
      "Rotavdrag: du betalar 30 % mindre för arbetet",
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
    tagline: "Producera din egen el, vi hjälper dig hela vägen.",
    beskrivning: "En solcellsanläggning anpassad efter ditt tak och din förbrukning. Vi planerar, installerar och ansluter den till elnätet. Den el du inte använder själv kan du sälja.",
    pris: { typ: "offert" },
    inkluderar: [
      "Solcellspaneler och växelriktare",
      "Planering och beräkning av rätt storlek",
      "Installation av certifierad montör",
      "Anslutning till elnätet",
      "10 års produktgaranti",
    ],
    villkor: [
      "Takbesiktning krävs",
      "Taket bör vara vänt mot söder, väster eller öster",
      "Bygglov kan krävas i kulturmiljö",
    ],
    uspar: [
      "Sänk dina elkostnader med upp till 40 %",
      "Sälj den el du inte använder själv",
      "Grönt avdrag: 20 % av totalkostnaden",
    ],
    passarFor: "Villaägare som vill producera egen el och sänka sina elkostnader långsiktigt.",
    bildAlt: "Solcellspaneler på ett villatak i nordvästra Skåne",
    cta: { label: "Boka kostnadsfri rådgivning", typ: "offert" },
  },
  {
    id: "varmepump",
    namn: "Värmepump",
    kategori: "Uppvärmning",
    tagline: "Byt till värmepump, spara energi och pengar.",
    beskrivning: "Vi hjälper dig välja rätt värmepump för ditt hem, installerar den och ser till att allt fungerar.",
    pris: { typ: "offert" },
    inkluderar: [
      "Energirådgivning",
      "Val av värmepump efter behov",
      "Installation av certifierad installatör",
      "Injustering och driftsättning",
    ],
    villkor: [
      "Vi besiktigar din nuvarande uppvärmning först",
      "Bergvärme kräver borrning och ett eget tillstånd",
    ],
    uspar: [
      "Spara upp till 75 % på uppvärmningen",
      "Grönt avdrag på installationen",
      "Går att kombinera med solceller",
    ],
    passarFor: "Villaägare med direktel eller äldre oljepanna som vill sänka uppvärmningskostnaden.",
    bildAlt: "Luft-vattenvärmepump monterad på villavägg",
    cta: { label: "Boka rådgivning", typ: "offert" },
  },
  {
    id: "hemmaladdare",
    namn: "Hemmaladdare Flex",
    kategori: "Elbil & laddning",
    tagline: "Enkel laddbox utan smart styrning, lägre pris.",
    beskrivning: "En enkel laddbox för dig som inte behöver app eller smart nattladdning. Vi monterar den på väggen nära där du parkerar.",
    pris: { typ: "fran", belopp: "8 900", enhet: "kr inkl. installation" },
    inkluderar: [
      "Laddbox (standardmodell)",
      "Installation av certifierad elektriker",
      "Rotavdrag hanterat",
    ],
    villkor: [
      "Kräver jordfelsbrytare typ B",
      "Ingen app eller smart styrning ingår",
    ],
    uspar: [
      "Lägre ingångspris än Ladda Smart",
      "Rotavdrag: du betalar 30 % mindre för arbetet",
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
    tagline: "Kostnadsfri rådgivning, vi hjälper dig spara.",
    beskrivning: "Boka ett kostnadsfritt samtal med en energirådgivare. Vi går igenom din förbrukning och ger dig konkreta tips på hur du sänker dina kostnader.",
    pris: { typ: "fast", belopp: "0", enhet: "kr" },
    inkluderar: [
      "Rådgivningssamtal på 30 minuter",
      "Genomgång av din årsförbrukning",
      "Konkreta förslag på hur du kan spara",
      "Sammanfattning och uppföljning via e-post",
    ],
    villkor: ["Du bokar via telefon eller Mina sidor"],
    uspar: [
      "Helt kostnadsfritt",
      "Du pratar med en person, inte en chattbot",
      "Du behöver inte köpa något",
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
      "Läggs automatiskt på din elfaktura",
      "Pengarna går till lokala miljöprojekt",
      "Rapport varje kvartal om vad pengarna använts till",
    ],
    villkor: ["Du kan stänga av tillägget när du vill via Mina sidor"],
    uspar: [
      "Gör skillnad lokalt, i ditt eget område",
      "Helt frivilligt, ingen bindningstid",
      "Du ser exakt vad pengarna går till",
    ],
    passarFor: "Dig som vill bidra till hållbarhet utan att byta avtal eller livsstil.",
    bildAlt: "Naturområde i nordvästra Skåne med vindkraftverk i bakgrunden",
    cta: { label: "Lägg till Framtidspengen", typ: "kop" },
  },
];
