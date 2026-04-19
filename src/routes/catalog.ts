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
  { slug: "privat-elhandel", title: "Startsida undersida", subtitle: "Nyttighet — privat elhandel som exempel", status: "stub" },
  { slug: "avbrottsinformation", title: "Avbrottsinformation", subtitle: "Status, planerade och pågående avbrott", status: "stub" },
  { slug: "kundservice", title: "Kundservice", subtitle: "Triage — vart kunden ska", status: "stub" },
  { slug: "produktsida", title: "Produktsida", subtitle: "Direktköp / leadsgenerering", status: "stub" },
  { slug: "nyhetsrum", title: "Nyhetsrum", subtitle: "Startsida för nyhetshub", status: "stub" },
  { slug: "artikel", title: "Artikel / blogg / nyhet / pressmeddelande", subtitle: "Variantmodell för redaktionellt innehåll", status: "stub" },
];

export const moduler: CatalogEntry[] = [
  { slug: "elavtal-jamfor", title: "Jämför elavtal", subtitle: "Tre varianter (Trygg / Progressiv / Experimentell) med argumentation", status: "klar" },
  { slug: "produktlisting", title: "Produktlisting", subtitle: "Grid vs filtrerat grid — 6 placeholder-produkter", status: "klar" },
  { slug: "produktinfo", title: "Produktinfo", subtitle: "E-commerce-stil — prisbadge, hero, tabs. 6 produkter att välja", status: "klar" },
  { slug: "formular-kop", title: "Formulär-köp", subtitle: "Formulär vs 3-stegs checkout — 'mindre formulär, mer köp'", status: "klar" },
  { slug: "avbrottslista", title: "Avbrottslista", subtitle: "Två varianter (Trygg / Progressiv) — status + tidslinje", status: "klar" },
  { slug: "kundservice-triage", title: "Kundservice-triage", subtitle: "Tre varianter — accordion / kort / konversation", status: "klar" },
];
