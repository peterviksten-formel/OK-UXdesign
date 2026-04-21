import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Icon } from "../../components/Icon";
import { KATEGORIER, type KategoriId } from "../moduler/kundservice-data";

/**
 * SIDTYP 3 — Kundservice
 *
 * Full customer service landing page. Composes:
 * - Hero with search
 * - Triage module (Progressiv variant inline)
 * - Contact channels
 * - Opening hours
 * - FAQ top-hitters
 */
export function Kundservice() {
  const [activeKat, setActiveKat] = useState<KategoriId | null>(null);
  const kategori = activeKat ? KATEGORIER.find((k) => k.id === activeKat) : null;

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent inline-block pt-6">← Översikt</Link>

      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <Annotation
        label="Kundservice-hero"
        audience="user"
        rationale="Frågedriven: 'Hur kan vi hjälpa dig?' + sökfält. Inte 'Kontakta oss' — det signalerar att vi vill att de hittar svaret själva först."
      >
        <section className="py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-4">
            <ol className="flex gap-1">
              <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="font-medium text-ink">Kundservice</li>
            </ol>
          </nav>
          <h1 className="text-h1 mb-4">Hur kan vi hjälpa dig?</h1>
          <p className="text-lede text-ink-secondary mb-6 max-w-reading">
            Hitta svar, hantera ditt konto, eller nå oss direkt. De flesta ärenden löser du
            snabbast via Mina sidor.
          </p>
        </section>
      </Annotation>

      {/* ─── Triage (inline) ───────────────────────────────────────── */}
      <Annotation
        label="Interaktiv triage"
        audience="design"
        rationale="Progressiv-varianten av kundservice-triage inbäddad. Kategori-kort → underkategorier inline. Se den fristående modulen med alla varianter: /moduler/kundservice-triage"
      >
        <section className="py-8 border-t border-border-subtle">
          <h2 className="text-h2 mb-6">Jag behöver hjälp med…</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {KATEGORIER.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setActiveKat(activeKat === k.id ? null : k.id)}
                className={`p-4 rounded-md border-2 text-left transition-all ${activeKat === k.id ? "border-brand-accent bg-tint-info" : "border-border-subtle bg-surface hover:border-brand-accent"}`}
                aria-pressed={activeKat === k.id}
              >
                <span className="text-2xl block mb-2" aria-hidden="true">{k.ikon}</span>
                <span className="font-medium block text-sm">{k.label}</span>
              </button>
            ))}
          </div>
          {kategori && (
            <div className="rounded-md border border-brand-accent bg-surface p-5 mb-6">
              <h3 className="font-medium mb-3">{kategori.label}</h3>
              <ul className="space-y-2">
                {kategori.underkategorier.map((u) => (
                  <li key={u.id}>
                    <a href={u.action.type === "link" ? u.action.href : "#"} className="flex items-center gap-2 text-sm hover:text-brand-accent py-1.5">
                      <span className="text-ink-muted">→</span>
                      <span className="font-medium">{u.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs text-ink-muted">
            Se alla varianter av denna modul:{" "}
            <Link to="/moduler/kundservice-triage" className="text-brand-accent hover:underline">
              Kundservice-triage →
            </Link>
          </p>
        </section>
      </Annotation>

      {/* ─── Kontaktkanaler ────────────────────────────────────────── */}
      <Annotation
        label="Kontaktkanaler"
        audience="user"
        rationale="Alltid synliga, aldrig gömda. Tre kanaler med öppettider och förväntad svarstid. Chatt → snabbast, telefon → komplext, e-post → kan vänta."
      >
        <section className="py-10 border-t border-border-subtle">
          <h2 className="text-h2 mb-6">Kontakta oss</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { ikon: "chat_bubble", kanal: "Chatt", tid: "Vardagar 08–17", svar: "Svarstid ~2 min", desc: "Snabbaste vägen för enkla frågor." },
              { ikon: "call", kanal: "Telefon", tid: "Vardagar 08–17", svar: "[08-455 44 00]", desc: "För komplexa ärenden och felanmälan." },
              { ikon: "mail", kanal: "E-post", tid: "Dygnet runt", svar: "Svar inom 1 arbetsdag", desc: "När det inte är bråttom." },
            ].map((k) => (
              <a key={k.kanal} href="#" className="p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all block">
                <Icon name={k.ikon} size={28} className="text-brand-accent mb-2" />
                <h3 className="font-medium mb-1">{k.kanal}</h3>
                <p className="text-sm text-ink-secondary mb-2">{k.desc}</p>
                <p className="text-xs text-ink-muted">{k.tid} · {k.svar}</p>
              </a>
            ))}
          </div>
        </section>
      </Annotation>

      {/* ─── Mina sidor CTA ────────────────────────────────────────── */}
      <Annotation
        label="Mina sidor-block"
        audience="user"
        rationale="Påminnelse: de flesta ärenden löser du snabbast själv. Byta avtal, rapportera mätarställning, ändra betalsätt."
      >
        <section className="py-8 border-t border-border-subtle">
          <div className="rounded-md bg-tint-info p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-h4 font-medium mb-1">Gör det själv på Mina sidor</h2>
              <p className="text-sm text-ink-secondary">
                Byta avtal, se fakturor, rapportera mätarställning, ändra betalsätt — allt
                utan att vänta i kö.
              </p>
            </div>
            <a href="#" className="bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity whitespace-nowrap">
              Logga in →
            </a>
          </div>
        </section>
      </Annotation>
    </div>
  );
}
