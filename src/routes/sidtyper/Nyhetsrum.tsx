import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";

/**
 * SIDTYP 5 — Nyhetsrum
 *
 * News hub landing page. Category filter + article cards + pagination.
 */

type Nyhet = {
  id: string;
  datum: string;
  kategori: string;
  rubrik: string;
  utdrag: string;
  typ: "nyhet" | "pressmeddelande" | "blogg" | "artikel";
};

const NYHETER: Nyhet[] = [
  { id: "n1", datum: "2026-04-15", kategori: "Marknad", rubrik: "Elpriset sjunker inför sommaren — vad betyder det för dig?", utdrag: "Spotpriset i SE4 har fallit med 20% sedan mars. Vi förklarar varför och vad det innebär för ditt avtal.", typ: "nyhet" },
  { id: "n2", datum: "2026-04-08", kategori: "Tjänster", rubrik: "Nu kan du följa din förbrukning i realtid via appen", utdrag: "Nya funktionen 'Livekoll' ger dig insyn i din elanvändning timme för timme.", typ: "nyhet" },
  { id: "n3", datum: "2026-03-28", kategori: "Hållbarhet", rubrik: "Framtidspengen finansierade 3 nya laddstationer i Helsingborg", utdrag: "Tack vare Framtidspengen har vi nu installerat laddstationer vid Helsingborg Arena, Kullavägen och Stattena centrum.", typ: "pressmeddelande" },
  { id: "n4", datum: "2026-03-15", kategori: "Tips", rubrik: "5 sätt att sänka din elräkning utan att frysa", utdrag: "Enkla vardagstips som kan spara hundratals kronor per år — utan att sänka komforten.", typ: "blogg" },
  { id: "n5", datum: "2026-03-01", kategori: "Marknad", rubrik: "Kvartspris Q2 2026: så sätts ditt nya pris", utdrag: "Vi förklarar hur kvartspriset beräknas och vad du kan förvänta dig de kommande tre månaderna.", typ: "artikel" },
  { id: "n6", datum: "2026-02-20", kategori: "Hållbarhet", rubrik: "Öresundskraft investerar i havsbaserad vindkraft", utdrag: "Tillsammans med Helsingborg Energi bygger vi nordvästra Skånes första havsbaserade vindkraftpark.", typ: "pressmeddelande" },
];

const TYP_LABEL: Record<Nyhet["typ"], string> = {
  nyhet: "Nyhet",
  pressmeddelande: "Pressmeddelande",
  blogg: "Blogginlägg",
  artikel: "Artikel",
};

export function Nyhetsrum() {
  const categories = [...new Set(NYHETER.map((n) => n.kategori))];
  const [cat, setCat] = useState<string | null>(null);
  const filtered = cat ? NYHETER.filter((n) => n.kategori === cat) : NYHETER;

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent inline-block pt-6">← Översikt</Link>

      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <Annotation
        label="Nyhetsrum-hero"
        audience="redaktör"
        rationale="Enkel, informativ hero. Ingen bild — rubriken och filtret tar fokus. Senaste publicerat datum synligt för att visa att sidan lever."
      >
        <section className="py-10 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-4">
            <ol className="flex gap-1">
              <li><a href="#" className="hover:text-brand-accent">Öresundskraft</a></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="font-medium text-ink">Nyhetsrum</li>
            </ol>
          </nav>
          <h1 className="text-h1 mb-3">Nyhetsrum</h1>
          <p className="text-lede text-ink-secondary">
            Nyheter, pressmeddelanden och blogginlägg från Öresundskraft.
          </p>
        </section>
      </Annotation>

      {/* ─── Category filter ───────────────────────────────────────── */}
      <Annotation
        label="Kategorifilter"
        audience="design"
        rationale="Pill-filter per ämne. Samma mönster som Produktlisting — bekant för användaren. 'Alla' som default."
      >
        <div className="flex flex-wrap gap-2 mb-8 border-t border-border-subtle pt-6">
          <button
            type="button"
            onClick={() => setCat(null)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${!cat ? "bg-brand-primary text-ink-onbrand border-brand-primary" : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent"}`}
          >
            Alla ({NYHETER.length})
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(cat === c ? null : c)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${cat === c ? "bg-brand-primary text-ink-onbrand border-brand-primary" : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </Annotation>

      {/* ─── Article list ──────────────────────────────────────────── */}
      <Annotation
        label="Nyhetslistning"
        audience="design"
        rationale="Kompakta kort med datum, typ-badge, rubrik och utdrag. Rubriken är länken — inte 'Läs mer'. Datum i <time>. Typ-badge visar nyhet/press/blogg/artikel."
      >
        <div className="space-y-4 pb-10">
          {filtered.map((n) => (
            <Link
              key={n.id}
              to={`/sidtyper/artikel`}
              className="group block p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-ink-muted">
                <time dateTime={n.datum}>{n.datum}</time>
                <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">
                  {n.kategori}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-tint-notice text-brand-primary font-medium uppercase tracking-wider text-[10px]">
                  {TYP_LABEL[n.typ]}
                </span>
              </div>
              <h2 className="font-medium text-h5 group-hover:text-brand-accent mb-1 leading-snug">{n.rubrik}</h2>
              <p className="text-sm text-ink-secondary leading-relaxed">{n.utdrag}</p>
            </Link>
          ))}
        </div>
      </Annotation>
    </div>
  );
}
