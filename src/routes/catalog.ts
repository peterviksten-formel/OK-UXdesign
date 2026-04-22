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
  { slug: "startsida-undersida-ux", title: "Startsida undersida UX", subtitle: "UX-audit-driven: elnät före intent, klickbara jämförelsekort, FAQ efter jämförelse", status: "klar" },
  { slug: "kundservice-ny", title: "Kundservice (ny)", subtitle: "KC + kontakt på samma sida — statusbanner, snabbknappar, triage, 4 kontaktvägar", status: "klar" },
  { slug: "avbrott-ny", title: "Avbrottsinformation (ny)", subtitle: "Dynamisk status-hero, adresskontroll, tidslinje per avbrott, interaktiv felsökningsguide", status: "klar" },
];

export const moduler: CatalogEntry[] = [
  { slug: "elavtal-jamfor", title: "Jämför elavtal", subtitle: "Trygg tabell / Progressiv kort / Experimentell kalkylator", status: "klar" },
  { slug: "produktlisting", title: "Produktlisting", subtitle: "Grid / Filter+grid", status: "klar" },
  { slug: "produktinfo", title: "Produktinfo", subtitle: "Trygg 2-col / Progressiv tabs / Köp-fokuserad sticky sidebar", status: "klar" },
  { slug: "formular-kop", title: "Formulär-köp", subtitle: "Formulär / 3-stegs checkout / Konversationsform", status: "klar" },
  { slug: "avbrottslista", title: "Avbrottslista", subtitle: "Trygg lista / Progressiv tabs+tidslinje / Karta-first", status: "klar" },
  { slug: "kundservice-triage", title: "Kundservice-triage", subtitle: "Accordion / Kort-triage / Konversation", status: "klar" },
  { slug: "hero", title: "Hero", subtitle: "Action-first / Brand-first / Status-first", status: "klar" },
  { slug: "faq", title: "FAQ — vanliga frågor", subtitle: "Accordion / Grupperad per tidslinje / Sök + topplista", status: "klar" },
  { slug: "nyheter", title: "Nyhets- / artikelkort", subtitle: "Grid likvärdig / Utvald + 2 små / Tidslinje", status: "klar" },
  { slug: "kampanj", title: "Kampanj- och story-banner", subtitle: "Hero-banner / Story-block / Strip med tidsmarkör", status: "klar" },
  { slug: "kundcase", title: "Kundcase / testimonials", subtitle: "Citatkort-grid / Hero-citat / Case-story med siffror", status: "klar" },
  { slug: "tjanster", title: "Tjänstegrid", subtitle: "Ikon-kort / Bildkort / Kompakt lista", status: "klar" },
  { slug: "driftstatus", title: "Driftstatus-banner", subtitle: "Global topbar / Inline-sektion / Badge + drawer", status: "klar" },
  { slug: "mina-sidor", title: "Mina sidor / App-hub", subtitle: "Hero-banner / Split webb+app / Kompakt strip", status: "klar" },
  { slug: "impact", title: "Hållbarhet och impact", subtitle: "Statistik-grid / Story-narrative / Tidslinje med status", status: "klar" },
];
