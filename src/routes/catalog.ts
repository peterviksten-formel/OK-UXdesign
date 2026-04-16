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
  { slug: "elavtal-jamfor", title: "Jämför elavtal", subtitle: "Lägenhet / villa — sida-vid-sida", status: "wip" },
  { slug: "produktlisting", title: "Produktlisting", subtitle: "Karusell / grid för smarta produkter", status: "stub" },
  { slug: "produktinfo", title: "Produktinfo", subtitle: "Pris, villkor, ehandel-känsla", status: "stub" },
  { slug: "formular-kop", title: "Formulär-köp", subtitle: "Beställningsflöde som känns som checkout", status: "stub" },
  { slug: "avbrottslista", title: "Avbrottslista", subtitle: "Planerade · pågående · avslutade", status: "stub" },
  { slug: "kundservice-triage", title: "Kundservice-triage", subtitle: "'Jag behöver hjälp med…' interaktivt", status: "stub" },
];
