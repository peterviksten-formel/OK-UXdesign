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
  { slug: "startsida-undersida-ux", title: "Start - Elavtal", subtitle: "UX-audit-driven: elnät före intent, klickbara jämförelsekort, FAQ efter jämförelse", status: "klar" },
  { slug: "kundservice-ny", title: "Start - Kundservice", subtitle: "KC + kontakt på samma sida, statusbanner, snabbknappar, 4 kontaktvägar, kontaktflöde", status: "klar" },
  { slug: "avbrott-ny", title: "Start - Avbrott", subtitle: "Adress först → statuskort med påverkan per infrastruktur, kontextuella CTAs, karta under fördjupning", status: "klar" },
  { slug: "produktsida-direktkop", title: "Produktsida - direktköp", subtitle: "Säljande produktsida med 3-stegs beställningsformulär (Ladda Smart). Hero + USP + Produktinfo + Process + Case + Beställning + FAQ. Sticky pris-modul i höger kolumn.", status: "klar" },
  { slug: "produktsida-direktkop2", title: "Produktsida - direktköp v2", subtitle: "Variant av direktköp där sticky-kolumnen är ersatt med sticky bottom-bar (synlig på alla viewports). Full-bredds-content-layout. E-com-pattern (Klarna/Ikea) för transaktionellt intent.", status: "klar" },
  { slug: "produktsida-leadsgen", title: "Produktsida - leadsgenerering", subtitle: "Konsultativ produktsida för stora investeringar (Solceller). Hero + USP + Process + Spar-kalkylator + Case + Specs + Säljkontakt + FAQ + Lead-form. Sticky säljkontakt-modul i höger kolumn.", status: "klar" },
  { slug: "produktsida-leadsgen2", title: "Produktsida - leadsgenerering v2", subtitle: "Variant av leadsgen där sticky-panelen är borttagen helt. Inline-in-flow med två kontextuella CTA-banner (efter kundvärde + efter kalkylator) som leder till lead-form. Lägre upplevd säljpress för stora investeringsbeslut.", status: "klar" },
  { slug: "startsida-nyhetsrum", title: "Startsida - Nyhetsrum", subtitle: "Press + Nyheter + Artiklar i samma flöde. Filter på typ, kategori och sök. Presskontakter + prenumerera. (Skiss, förfinas i nästa steg)", status: "wip" },
  { slug: "pressmeddelande", title: "Pressmeddelande", subtitle: "Formell publicistisk layout med dateline, sticky press-kontakt, bildbank och boilerplate. Skiss för journalist-målgrupp.", status: "wip" },
  { slug: "nyhet", title: "Nyhet", subtitle: "Kortfattad informationsnyhet med TL;DR, 'Vad innebär det för dig?' och FAQ. Skiss för kund-målgrupp.", status: "wip" },
  { slug: "artikel", title: "Artikel", subtitle: "Vardagsformat: hero, lead-stycke, två-tre brödtext-sektioner med en pull-quote, källor, kort bio, prenumerera, related. Skiss, ersätter blogg-konceptet.", status: "wip" },
  { slug: "artikel-galleri", title: "Artikel - format-galleri", subtitle: "Showcase av editorial-format: TOC, sammanfattning, faktarutor, fancy numrerade listor, tips & trick, statistik-highlights, kundberättelse, författarbio. Element infällda i brödtexten.", status: "wip" },
  { slug: "artikel-marginalia", title: "Artikel - marginalia-format", subtitle: "Variant av Galleri där statistik, faktaruta, tips & trick och kundberättelse ligger i höger marginal istället för infällda. Hypotes: bättre läsflöde i längre texter, testa parallellt med inline-versionen.", status: "wip" },
];

export const moduler: CatalogEntry[] = [
  { slug: "elavtal-jamfor", title: "Jämför elavtal", subtitle: "Trygg tabell / Progressiv kort / Experimentell kalkylator", status: "klar" },
  { slug: "produktlisting", title: "Produktlisting", subtitle: "Grid / Filter+grid", status: "klar" },
  { slug: "produktinfo", title: "Produktinfo", subtitle: "Trygg 2-col / Progressiv tabs / Köp-fokuserad sticky sidebar", status: "klar" },
  { slug: "formular-kop", title: "Formulär-köp", subtitle: "Formulär / 3-stegs checkout / Konversationsform", status: "klar" },
  { slug: "avbrottslista", title: "Avbrottslista", subtitle: "Trygg lista / Progressiv tabs+tidslinje / Karta-first", status: "klar" },
  { slug: "kundservice-triage", title: "Kundservice-triage", subtitle: "Accordion / Kort-triage / Konversation", status: "klar" },
  { slug: "hero", title: "Hero", subtitle: "Action-first / Brand-first / Status-first", status: "klar" },
  { slug: "faq", title: "FAQ, vanliga frågor", subtitle: "Accordion / Grupperad per tidslinje / Sök + topplista", status: "klar" },
  { slug: "nyheter", title: "Nyhets- / artikelkort", subtitle: "Grid likvärdig / Utvald + 2 små / Tidslinje", status: "klar" },
  { slug: "kampanj", title: "Kampanj- och story-banner", subtitle: "Hero-banner / Story-block / Strip med tidsmarkör", status: "klar" },
  { slug: "kundcase", title: "Kundcase / testimonials", subtitle: "Citatkort-grid / Hero-citat / Case-story med siffror", status: "klar" },
  { slug: "tjanster", title: "Tjänstegrid", subtitle: "Ikon-kort / Bildkort / Kompakt lista", status: "klar" },
  { slug: "driftstatus", title: "Driftstatus-banner", subtitle: "Global topbar / Inline-sektion / Badge + drawer", status: "klar" },
  { slug: "mina-sidor", title: "Mina sidor / App-hub", subtitle: "Hero-banner / Split webb+app / Kompakt strip", status: "klar" },
  { slug: "impact", title: "Hållbarhet och impact", subtitle: "Statistik-grid / Story-narrative / Tidslinje med status", status: "klar" },
];
