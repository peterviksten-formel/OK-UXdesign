import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Icon } from "../../components/Icon";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { PRODUKTER, type Produkt } from "./produkt-data";

/* ─── Variant A: Grid ───────────────────────────────────────────────── */
function ListingGrid() {
  return (
    <Annotation
      label="Produktgrid"
      audience="design"
      rationale="Alla produkter synliga i ett grid. Ingen interaktion krävs — användaren scannar visuellt. Bra för 4–6 produkter. Mer än 8? Filtrera istället."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUKTER.map((p) => <ProductCard key={p.id} produkt={p} />)}
      </div>
    </Annotation>
  );
}

/* ─── Variant B: Category-filtered grid ─────────────────────────────── */
function ListingFiltered() {
  const categories = [...new Set(PRODUKTER.map((p) => p.kategori))];
  const [cat, setCat] = useState<string | null>(null);
  const filtered = cat ? PRODUKTER.filter((p) => p.kategori === cat) : PRODUKTER;

  return (
    <div>
      <Annotation
        label="Kategorifilter"
        audience="design"
        rationale="Pill-filter per kategori. 'Alla' som default. Filteringen sker client-side utan sidladdning. Bra om antalet produkter > 6."
      >
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => setCat(null)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
              cat === null
                ? "bg-brand-primary text-ink-onbrand border-brand-primary"
                : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent"
            }`}
          >
            Alla ({PRODUKTER.length})
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(cat === c ? null : c)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                cat === c
                  ? "bg-brand-primary text-ink-onbrand border-brand-primary"
                  : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent"
              }`}
            >
              {c} ({PRODUKTER.filter((p) => p.kategori === c).length})
            </button>
          ))}
        </div>
      </Annotation>

      <Annotation
        label="Filtrerad produktlista"
        audience="user"
        rationale="Korten anpassar sig efter filtret. Övergång: kort som inte matchar försvinner, resterande fyller griden. Smooth men inte flashy."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => <ProductCard key={p.id} produkt={p} />)}
        </div>
      </Annotation>
    </div>
  );
}

/* ─── Variant C: Karusell (row-scroll) ─────────────────────────────── */
function ListingKarusell() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const node = ref.current;
    if (!node) return;
    const cardWidth = node.firstElementChild?.clientWidth ?? 280;
    node.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <Annotation
      label="Produkt-karusell (row-scroll)"
      audience="design"
      rationale="Horisontell scroll med pil-knappar + native scroll-snap. Använd sparsamt — användaren ser bara 3-4 produkter, resten är dolt bakom swipe/klick. Bäst som 'Fler produkter'-sektion efter ett prominent grid, inte som huvudingång."
    >
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-ink-muted">
            {PRODUKTER.length} produkter — svep eller använd pilarna.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-border-strong text-ink-secondary hover:bg-tint-info hover:border-brand-accent grid place-items-center"
              aria-label="Föregående produkter"
            >
              <Icon name="arrow_back" size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-border-strong text-ink-secondary hover:bg-tint-info hover:border-brand-accent grid place-items-center"
              aria-label="Nästa produkter"
            >
              <Icon name="arrow_forward" size={18} />
            </button>
          </div>
        </div>
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin"
          style={{ scrollbarWidth: "thin" }}
        >
          {PRODUKTER.map((p) => (
            <div
              key={p.id}
              className="flex-none w-[280px] snap-start"
            >
              <ProductCard produkt={p} />
            </div>
          ))}
        </div>
      </div>
    </Annotation>
  );
}

/* ─── Shared card component ─────────────────────────────────────────── */
function ProductCard({ produkt: p }: { produkt: Produkt }) {
  return (
    <article className="rounded-md border border-border-subtle bg-surface overflow-hidden flex flex-col hover:shadow-sm hover:border-brand-accent transition-all group">
      <div className="bg-tint-info aspect-[3/2] flex items-center justify-center relative">
        <Icon name="image" size={40} className="text-ink-muted" />
        <span className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          {p.kategori}
        </span>
        {p.pris.typ !== "offert" && (
          <span className="absolute bottom-3 right-3 bg-canvas/90 backdrop-blur text-xs font-medium px-2 py-1 rounded border border-border-subtle">
            {p.pris.typ === "fran" ? `Från ${p.pris.belopp}` : p.pris.belopp} {p.pris.enhet}
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium mb-1 group-hover:text-brand-accent">{p.namn}</h3>
        <p className="text-sm text-ink-secondary mb-3 flex-1">{p.tagline}</p>
        <div className="flex gap-2">
          <Link
            to={`/moduler/produktinfo`}
            className="flex-1 text-center bg-brand-primary text-ink-onbrand text-sm font-medium py-2 rounded hover:opacity-90 transition-opacity"
          >
            {p.cta.label}
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─── Host page ─────────────────────────────────────────────────────── */

const VARIANTS: Variant[] = [
  {
    id: "trygg",
    shortName: "A",
    label: "Grid",
    riskLevel: "låg",
    oneLiner: "Alla produkter synliga i ett grid. Inget filter.",
    bestFor: "4–6 produkter. Snabb scanning.",
    render: () => <ListingGrid />,
  },
  {
    id: "progressiv",
    shortName: "B",
    label: "Filter + grid",
    riskLevel: "medel",
    oneLiner: "Kategori-pills ovanför gridet. Filtrera utan sidladdning.",
    bestFor: "6+ produkter. Användaren väljer vilken kategori de bryr sig om.",
    render: () => <ListingFiltered />,
  },
  {
    id: "experimentell",
    shortName: "C",
    label: "Karusell",
    riskLevel: "hög",
    oneLiner: "Horisontell scroll-carousel med pilar + native snap.",
    bestFor: "\"Fler produkter\"-sektion på produktsidor. Aldrig som huvudingång.",
    render: () => <ListingKarusell />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Känsla",
    values: {
      trygg: "Produktkatalog. Allt synligt — bra för snabb scanning.",
      progressiv: "Smart butik. Filtret minskar brus och gör valet tydligare.",
      experimentell: "Redaktionellt urval. Känns som en Netflix-rad.",
    },
  },
  {
    aspect: "Skala",
    values: {
      trygg: "Fungerar bra till ~8 produkter. Sedan blir gridet oöverskådligt.",
      progressiv: "Skalbart. Kategorifilter + räknare gör att 20+ produkter funkar.",
      experimentell: "Obegränsat — men användaren ser bara 3-4 åt gången.",
    },
  },
  {
    aspect: "Mobil",
    values: {
      trygg: "En kolumn, lång scroll. Inga överraskningar.",
      progressiv: "Filter-pills scrollar horisontellt. Grid anpassar sig.",
      experimentell: "Swipe är naturligt på mobil. Bäst av de tre för mobilhand.",
    },
  },
  {
    aspect: "Tillgänglighet",
    values: {
      trygg: "Perfekt — inget dolt innehåll.",
      progressiv: "Bra — filter har aria-pressed.",
      experimentell: "Svår — dolda produkter bakom scroll. Behöver aria-roles, keyboard-stöd.",
    },
  },
  {
    aspect: "Konvertering (hypotes)",
    values: {
      trygg: "Moderat — ingen gömd produkt.",
      progressiv: "Bäst — användaren filtrerar bort brus.",
      experimentell: "Lägst — branschdata visar att karuseller konverterar sämre.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      trygg: "Liten katalog (≤8 produkter). Produktsida-sektion 'Fler produkter'.",
      progressiv: "Default för Smarta produkter-sida.",
      experimentell: "Sparsamt: som 'Relaterat'-sektion EFTER primär listing. Aldrig huvudingång.",
    },
  },
];

export function Produktlisting() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Produktlisting</p>
        <h1 className="text-h1 mb-3">Smarta produkter och tjänster</h1>
        <p className="text-lede text-ink-secondary">
          Grid eller filtrerat grid — hur vi visar flera produkter. Varje kort länkar till
          Produktinfo-modulen.
        </p>
      </header>

      <VariantSwitcher
        variants={VARIANTS}
        argumentation={ARGUMENTATION}
        defaultId="progressiv"
      />

      <section className="mt-16 pt-8 border-t border-border-subtle">
        <h2 className="text-h3 mb-4">Designnotering</h2>
        <div className="text-ink-secondary text-sm space-y-3 max-w-reading">
          <p>
            <strong>Karusellen (C) finns nu — men med reservation.</strong> Karuseller har
            historiskt låg konverteringsgrad eftersom innehåll bortom de första 3-4 korten
            sällan ses. Vi bygger den ändå för att kunna använda som "Relaterade produkter"-
            sektion efter huvud-listningen — inte som primär ingång.
          </p>
          <p>
            <strong>Koppling till Produktinfo:</strong> CTA-knappen på varje kort pekar till
            /moduler/produktinfo. I produktion pekar den till den specifika produktens sida.
          </p>
        </div>
      </section>
    </div>
  );
}
