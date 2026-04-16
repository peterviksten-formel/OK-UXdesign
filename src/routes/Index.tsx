import { Link } from "react-router-dom";
import { sidtyper, moduler, type CatalogEntry } from "./catalog";

const statusStyle: Record<CatalogEntry["status"], string> = {
  klar: "bg-tint-info text-brand-primary",
  wip: "bg-tint-notice text-brand-primary",
  stub: "bg-border-subtle text-ink-muted",
};
const statusLabel: Record<CatalogEntry["status"], string> = {
  klar: "Klar",
  wip: "Pågår",
  stub: "Stub",
};

function Card({ to, e }: { to: string; e: CatalogEntry }) {
  return (
    <Link
      to={to}
      className="group block p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-medium leading-snug group-hover:text-brand-accent">{e.title}</h3>
        <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${statusStyle[e.status]}`}>
          {statusLabel[e.status]}
        </span>
      </div>
      <p className="text-sm text-ink-secondary leading-relaxed">{e.subtitle}</p>
    </Link>
  );
}

export function IndexPage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <header className="mb-12 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Öresundskraft · UX-prototyp · Fas 1</p>
        <h1 className="text-h1 mb-4">Innehållshierarki, sidtyper och nyckelmoduler</h1>
        <p className="text-lede text-ink-secondary">
          Klickbar prototyp för diskussion kring sidtyper och kritiska block. Innehållet är
          placeholder. Aktivera <em>designanteckningar</em> i sidhuvudet för att se motivering
          per element.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <span className="px-3 py-1.5 rounded-full bg-tint-info text-brand-primary">Användare</span>
          <span className="px-3 py-1.5 rounded-full bg-tint-notice text-brand-primary">Redaktör</span>
          <span className="px-3 py-1.5 rounded-full bg-tint-highlight text-brand-primary">Design</span>
        </div>
      </header>

      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-h3">Sidtyper</h2>
          <span className="text-sm text-ink-muted">{sidtyper.length} st</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sidtyper.map((e) => (
            <Card key={e.slug} to={`/sidtyper/${e.slug}`} e={e} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-h3">Moduler</h2>
          <span className="text-sm text-ink-muted">{moduler.length} st</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduler.map((e) => (
            <Card key={e.slug} to={`/moduler/${e.slug}`} e={e} />
          ))}
        </div>
      </section>
    </div>
  );
}
