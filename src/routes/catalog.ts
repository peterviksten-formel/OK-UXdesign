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
  { slug: "privat-elhandel", title: "Startsida undersida", subtitle: "Det arbetade exemplet — hero, intentkort, jämförelse, FAQ, genvägar", status: "klar" },
  { slug: "startsida-undersida-ux", title: "Startsida undersida UX", subtitle: "UX-audit-driven variant: elnät före intent, klickbara jämförelsekort, FAQ efter jämförelse", status: "klar" },
  { slug: "avbrottsinformation", title: "Avbrottsinformation", subtitle: "Dynamisk hero + avbrottslista inline + FAQ", status: "klar" },
  { slug: "kundservice", title: "Kundservice", subtitle: "Triage + kontaktkanaler + Mina sidor CTA", status: "klar" },
  { slug: "produktsida", title: "Produktsida", subtitle: "Produkt-hero + detaljer + relaterade produkter", status: "klar" },
  { slug: "nyhetsrum", title: "Nyhetsrum", subtitle: "Kategorifilter + nyhetskort med typ-badges", status: "klar" },
  { slug: "artikel", title: "Artikel / blogg / nyhet / pressmeddelande", subtitle: "4 innehållstyper, en mall — ton-guide för redaktör", status: "klar" },
];

export const moduler: CatalogEntry[] = [
  { slug: "elavtal-jamfor", title: "Jämför elavtal", subtitle: "Tre varianter (Trygg / Progressiv / Experimentell) med argumentation", status: "klar" },
  { slug: "produktlisting", title: "Produktlisting", subtitle: "Grid vs filtrerat grid — 6 placeholder-produkter", status: "klar" },
  { slug: "produktinfo", title: "Produktinfo", subtitle: "E-commerce-stil — prisbadge, hero, tabs. 6 produkter att välja", status: "klar" },
  { slug: "formular-kop", title: "Formulär-köp", subtitle: "Formulär vs 3-stegs checkout — 'mindre formulär, mer köp'", status: "klar" },
  { slug: "avbrottslista", title: "Avbrottslista", subtitle: "Två varianter (Trygg / Progressiv) — status + tidslinje", status: "klar" },
  { slug: "kundservice-triage", title: "Kundservice-triage", subtitle: "Tre varianter — accordion / kort / konversation", status: "klar" },
];
