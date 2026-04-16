import { Link, useParams } from "react-router-dom";
import { sidtyper, moduler } from "./catalog";

export function StubPage({ kind }: { kind: "sidtyp" | "modul" }) {
  const { slug } = useParams<{ slug: string }>();
  const list = kind === "sidtyp" ? sidtyper : moduler;
  const entry = list.find((e) => e.slug === slug);

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>
      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">
          {kind === "sidtyp" ? "Sidtyp" : "Modul"} · {slug}
        </p>
        <h1 className="text-h1 mb-3">{entry?.title ?? "Okänd"}</h1>
        <p className="text-lede text-ink-secondary">{entry?.subtitle ?? ""}</p>
      </header>
      <div className="rounded-md border border-dashed border-border-strong bg-surface p-10 text-center">
        <p className="text-ink-muted">Wireframe + motivering kommer i nästa iteration.</p>
        <p className="text-xs text-ink-muted mt-2">
          Status: <span className="font-medium uppercase tracking-wider">{entry?.status ?? "stub"}</span>
        </p>
      </div>
    </div>
  );
}
