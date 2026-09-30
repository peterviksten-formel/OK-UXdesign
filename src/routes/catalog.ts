/**
 * Single source of truth for the prototype's pages and modules.
 * Adding a new sidtyp/modul = adding an entry here + a route component.
 */

export type CatalogEntry = {
  slug: string;
  title: string;
  subtitle: string;
  status: "klar" | "wip" | "stub";
};

export const sidtyper: CatalogEntry[] = [
  { slug: "startsida-undersida-ux", title: "Start - Elavtal", subtitle: "Bygger på UX-granskningen: elnät före val av ärende, klickbara jämförelsekort och FAQ efter jämförelsen.", status: "klar" },
  { slug: "kundservice-ny", title: "Start - Kundservice", subtitle: "Kundservice och kontakt på samma sida: statusbanner, snabbval, fyra kontaktvägar och ett kontaktflöde.", status: "klar" },
  { slug: "avbrott-ny", title: "Start - Avbrott", subtitle: "Adressen först, sedan ett statuskort som visar påverkan per tjänst. Knappar som passar läget och en karta längre ner.", status: "klar" },
  { slug: "produktsida-direktkop", title: "Produktsida - direktköp", subtitle: "Säljande produktsida med beställning i tre steg (Ladda Smart). Hero, USP, produktinfo, process, kundcase, beställning och FAQ. Priset följer med i höger kolumn.", status: "klar" },
  { slug: "produktsida-direktkop2", title: "Produktsida - direktköp v2", subtitle: "Som direktköp, men priset ligger i en fast list längst ner på alla skärmstorlekar i stället för i en kolumn. Innehållet får full bredd. Mönstret känns igen från e-handel (Klarna, Ikea).", status: "klar" },
  { slug: "produktsida-leadsgen", title: "Produktsida - leadsgenerering", subtitle: "Rådgivande produktsida för stora investeringar (solceller). Hero, USP, process, sparkalkylator, kundcase, teknisk fakta, säljkontakt, FAQ och intresseformulär. Säljkontakten följer med i höger kolumn.", status: "klar" },
  { slug: "produktsida-leadsgen2", title: "Produktsida - leadsgenerering v2", subtitle: "Som leadsgenerering, men utan panelen som följer med. I stället finns två banners i flödet (efter kundnyttan och efter kalkylatorn) som leder till formuläret. Mindre säljtryck inför ett stort beslut.", status: "klar" },
  { slug: "startsida-nyhetsrum", title: "Startsida - Nyhetsrum", subtitle: "Pressmeddelanden, nyheter och artiklar i samma flöde. Filtrera på typ och kategori eller sök. Presskontakter och prenumeration. (Skiss, förfinas i nästa steg)", status: "klar" },
  { slug: "pressmeddelande", title: "Pressmeddelande", subtitle: "Formell nyhetslayout med ort och datum, presskontakt som följer med, bildbank och företagsfakta. Skiss för journalister.", status: "klar" },
  { slug: "nyhet", title: "Nyhet", subtitle: "Kort informationsnyhet med sammanfattning, 'Vad innebär det här för dig?' och FAQ. Skiss för kunder.", status: "klar" },
  { slug: "artikel", title: "Artikel", subtitle: "Vardagligt format: hero, ingress, två eller tre textavsnitt med ett lyft citat, källor, kort presentation av skribenten, prenumeration och relaterat. Skiss som ersätter bloggen.", status: "klar" },
  { slug: "artikel-galleri", title: "Artikel - format-galleri", subtitle: "Visar alla redaktionella format: innehållsförteckning, sammanfattning, faktarutor, numrerade listor, tips, statistik, kundberättelse och skribentpresentation. Elementen ligger i brödtexten.", status: "klar" },
  { slug: "artikel-marginalia", title: "Artikel - marginalia-format", subtitle: "Som formatgalleriet, men statistik, faktaruta, tips och kundberättelse ligger i högermarginalen i stället för i texten. Hypotes: längre texter blir lättare att läsa. Testa parallellt med galleriet.", status: "klar" },
];

export const moduler: CatalogEntry[] = [
  { slug: "elavtal-jamfor", title: "Jämför elavtal", subtitle: "Trygg tabell / Progressiv kort / Experimentell kalkylator", status: "klar" },
  { slug: "produktlisting", title: "Produktlisting", subtitle: "Rutnät / Filtrerat rutnät", status: "klar" },
  { slug: "produktinfo", title: "Produktinfo", subtitle: "Trygg i två kolumner / Progressiv med flikar / Köpfokuserad med fast sidokolumn", status: "klar" },
  { slug: "formular-kop", title: "Formulär-köp", subtitle: "Klassiskt / Stegvis / Konversation", status: "klar" },
  { slug: "avbrottslista", title: "Avbrottslista", subtitle: "Samlad lista / Filtrerbar lista / Kartfokuserad", status: "klar" },
  { slug: "kundservice-triage", title: "Kundservice-triage", subtitle: "Ämneslista / Stegvis / Samtal", status: "klar" },
  { slug: "hero", title: "Hero", subtitle: "Handlingsfokuserad / Varumärkesfokuserad / Statusfokuserad", status: "klar" },
  { slug: "faq", title: "Vanliga frågor (FAQ)", subtitle: "Utfällbar lista / Grupperad / Sök och topplista", status: "klar" },
  { slug: "nyheter", title: "Nyhets- och artikelkort", subtitle: "Likvärdigt rutnät / Utvald nyhet / Tidslinje", status: "klar" },
  { slug: "kampanj", title: "Kampanj och berättelse", subtitle: "Stor banner / Berättelse / Remsa", status: "klar" },
  { slug: "kundcase", title: "Kundcase och omdömen", subtitle: "Citatkort / Stort citat / Kundberättelse", status: "klar" },
  { slug: "tjanster", title: "Tjänsteöversikt", subtitle: "Ikonkort / Bildkort / Kompakt lista", status: "klar" },
  { slug: "driftstatus", title: "Driftstatus", subtitle: "Toppbanner / I sidan / Märke", status: "klar" },
  { slug: "mina-sidor", title: "Mina sidor och appen", subtitle: "Stor banner / Webb och app / Kompakt remsa", status: "klar" },
  { slug: "impact", title: "Hållbarhet", subtitle: "Nyckeltal / Berättelse / Tidslinje", status: "klar" },
];
