import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";
import type { Produkt } from "../produkt-data";

/**
 * VARIANT B, Progressiv
 *
 * E-commerce inspired. Hero with image + price badge + CTA. Below:
 * tab-style sections (Vad ingår / Villkor / Varför välja).
 * "Passar för" as a highlighted callout. Sticky bottom CTA on mobile.
 */
export function ProduktinfoProgressiv({
  produkt,
  inline = false,
}: {
  produkt: Produkt;
  /** När true: dölj kategori-pill + namn + tagline (ligger redan i sidans hero). */
  inline?: boolean;
}) {
  const p = produkt;
  const [activeTab, setActiveTab] = useState<"ingar" | "villkor" | "varfor">("ingar");

  const tabs = [
    { id: "ingar" as const, label: "Vad ingår", items: p.inkluderar, icon: "check", iconFilled: false, iconColor: "text-brand-accent" },
    { id: "villkor" as const, label: "Villkor", items: p.villkor, icon: "circle", iconFilled: true, iconColor: "text-ink-muted" },
    { id: "varfor" as const, label: `Varför ${p.namn}?`, items: p.uspar, icon: "star", iconFilled: true, iconColor: "text-brand-accent" },
  ];

  const activeItems = tabs.find((t) => t.id === activeTab)!;

  return (
    <div>
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <Annotation
        label="Produkt-hero"
        audience="design"
        rationale="Bild med prisöverlägg + CTA i samma vy. E-commerce-känsla: priset är inte gömt i en tabell, det syns direkt. 'Passar för'-rutan under priset gör att användaren snabbt bekräftar 'detta är för mig'."
      >
        <div className="rounded-lg overflow-hidden border border-border-subtle mb-6">
          {/* Image area */}
          <div className="relative bg-tint-info aspect-[16/7] flex items-center justify-center">
            <div className="text-center text-ink-muted">
              <Icon name="image" size={56} className="mb-2" />
              <p className="text-xs">{p.bildAlt}</p>
            </div>
            {/* Price badge */}
            <div className="absolute bottom-4 right-4 bg-canvas/95 backdrop-blur rounded-md px-4 py-2 shadow-lg border border-border-subtle">
              {p.pris.typ === "offert" ? (
                <p className="font-medium text-sm">Begär offert</p>
              ) : (
                <>
                  <p className="text-xs text-ink-muted">{p.pris.typ === "fran" ? "Från" : "Pris"}</p>
                  <p className="text-h3 font-medium leading-none">{p.pris.belopp} <span className="text-xs text-ink-muted">{p.pris.enhet}</span></p>
                </>
              )}
            </div>
            {/* Category pill, döljs inline (kategorin står redan i sidans hero) */}
            {!inline && (
              <div className="absolute top-4 left-4">
                <span className="bg-brand-primary text-white text-xs font-medium px-3 py-1 rounded-full">{p.kategori}</span>
              </div>
            )}
          </div>

          {/* Info area */}
          <div className="p-5 sm:p-6">
            {/* Namn + tagline döljs inline (står redan i sidans hero) */}
            {!inline && (
              <>
                <h2 className="text-h2 mb-1">{p.namn}</h2>
                <p className="text-ink-secondary mb-4">{p.tagline}</p>
              </>
            )}

            {/* "Passar för" callout */}
            <div className="rounded-md bg-tint-info px-4 py-3 mb-5 text-sm">
              <span className="font-medium">Passar för: </span>
              <span className="text-ink-secondary">{p.passarFor}</span>
            </div>

            <p className="text-sm text-ink-secondary mb-5 leading-relaxed">{p.beskrivning}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="flex-1 bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity"
              >
                {p.cta.label}
              </button>
              <button
                type="button"
                className="flex-1 border border-border-strong text-ink-secondary font-medium py-3 rounded hover:bg-tint-info transition-colors"
              >
                Ställ en fråga
              </button>
            </div>
            <p className="text-xs text-ink-muted text-center mt-2">
              {p.cta.typ === "kop" ? "Tar ca 5 min · Personnummer + adress" :
               p.cta.typ === "offert" ? "Kostnadsfritt · Svar inom 3 arbetsdagar" :
               "Kostnadsfritt · Inga åtaganden"}
            </p>
          </div>
        </div>
      </Annotation>

      {/* ─── Tabs ──────────────────────────────────────────────────────── */}
      <Annotation
        label="Detalj-tabs"
        audience="design"
        rationale="Tabs istället för tre synliga sektioner. Sparar yta, läsaren väljer vad de vill se. Aktivt tab = djupare info utan att scrolla. Mobil: tabs scrollar horisontellt."
      >
        <div className="border border-border-subtle rounded-md overflow-hidden">
          <div className="flex border-b border-border-subtle" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={activeTab === t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === t.id
                    ? "bg-surface text-brand-primary border-b-2 border-brand-primary"
                    : "text-ink-muted hover:text-ink hover:bg-tint-info"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="p-5" role="tabpanel">
            <ul className="space-y-2 text-sm text-ink-secondary">
              {activeItems.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <Icon
                    name={activeItems.icon}
                    size={activeItems.icon === "circle" ? 6 : 16}
                    filled={activeItems.iconFilled}
                    className={`${activeItems.iconColor} mt-0.5`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Annotation>
    </div>
  );
}
