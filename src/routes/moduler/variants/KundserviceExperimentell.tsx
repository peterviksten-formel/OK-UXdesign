import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { KATEGORIER, type KategoriId, type Underkategori } from "../kundservice-data";

/**
 * VARIANT C — Experimentell
 *
 * Strategy: conversational triage. Mimics a chatbot-style flow but without
 * a chatbot. The user types or clicks their way through a narrowing funnel.
 * Each "message" is a step that remembers context. The final step delivers
 * the answer inline — no page change, no modal, no handoff to a support
 * agent unless truly necessary.
 */
export function KundserviceExperimentell() {
  const [step, setStep] = useState<"start" | "kategori" | "under" | "svar">("start");
  const [query, setQuery] = useState("");
  const [valKategori, setValKategori] = useState<KategoriId | null>(null);
  const [valUnder, setValUnder] = useState<Underkategori | null>(null);

  const kategori = valKategori ? KATEGORIER.find((k) => k.id === valKategori) : null;

  // Simple keyword matching for the search
  const matchingKategorier = query.length >= 2
    ? KATEGORIER.filter((k) =>
        k.label.toLowerCase().includes(query.toLowerCase()) ||
        k.beskrivning.toLowerCase().includes(query.toLowerCase()) ||
        k.underkategorier.some((u) =>
          u.label.toLowerCase().includes(query.toLowerCase())
        )
      )
    : [];

  function pickKategori(id: KategoriId) {
    setValKategori(id);
    setStep("kategori");
    setValUnder(null);
  }

  function pickUnder(u: Underkategori) {
    setValUnder(u);
    setStep("svar");
  }

  function reset() {
    setStep("start");
    setValKategori(null);
    setValUnder(null);
    setQuery("");
  }

  return (
    <div className="max-w-reading">
      {/* ─── Conversational trail ──────────────────────────────────── */}
      <Annotation
        label="Konversations-tratt"
        audience="design"
        rationale="Steg-för-steg som en chatt. Varje steg 'lägger till' en bubbla. Användaren ser hela sin väg och kan backa. Känns personligt utan att vara en faktisk chatbot (= ingen AI-risk, inga hallucinationer)."
      >
        <div className="space-y-4">
          {/* ─── Step 0: Intro + search ──────────────────────────── */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white grid place-items-center text-sm font-bold flex-shrink-0">
              Ö
            </div>
            <div className="flex-1">
              <div className="rounded-lg rounded-tl-none bg-tint-info p-4">
                <p className="font-medium mb-2">Hej! Vad kan vi hjälpa dig med?</p>
                <p className="text-sm text-ink-secondary mb-3">
                  Skriv ett ord eller välj bland kategorierna nedan.
                </p>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); if (step !== "start") reset(); }}
                  placeholder="T.ex. 'faktura', 'flytta', 'strömavbrott'..."
                  className="w-full px-3 py-2 rounded border border-border-strong bg-canvas text-sm placeholder:text-ink-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus"
                  aria-label="Sök efter hjälp"
                />

                {/* Search results */}
                {query.length >= 2 && matchingKategorier.length > 0 && step === "start" && (
                  <div className="mt-3 space-y-1">
                    {matchingKategorier.map((k) => (
                      <button
                        key={k.id}
                        type="button"
                        onClick={() => pickKategori(k.id)}
                        className="w-full text-left px-3 py-2 rounded hover:bg-surface text-sm flex items-center gap-2"
                      >
                        <span aria-hidden="true">{k.ikon}</span>
                        <span className="font-medium">{k.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Category chips */}
                {(step === "start" && query.length < 2) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {KATEGORIER.map((k) => (
                      <button
                        key={k.id}
                        type="button"
                        onClick={() => pickKategori(k.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle bg-surface text-sm hover:border-brand-accent hover:bg-tint-info transition-colors"
                      >
                        <span aria-hidden="true">{k.ikon}</span>
                        {k.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── Step 1: User picked category ───────────────────── */}
          {valKategori && kategori && (
            <>
              {/* User bubble */}
              <div className="flex gap-3 justify-end">
                <div className="rounded-lg rounded-tr-none bg-brand-primary text-ink-onbrand px-4 py-2 text-sm">
                  {kategori.ikon} {kategori.label}
                </div>
              </div>

              {/* System response */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-white grid place-items-center text-sm font-bold flex-shrink-0">
                  Ö
                </div>
                <div className="flex-1">
                  <div className="rounded-lg rounded-tl-none bg-tint-info p-4">
                    <p className="font-medium mb-2">Okej, {kategori.label.toLowerCase()}. Vad handlar det om?</p>
                    <div className="space-y-1">
                      {kategori.underkategorier.map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => pickUnder(u)}
                          className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-surface transition-colors flex items-center gap-2 ${
                            valUnder?.id === u.id ? "bg-surface font-medium" : ""
                          }`}
                        >
                          <span className="text-ink-muted">→</span>
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ─── Step 2: User picked sub-category → Answer ──────── */}
          {valUnder && (
            <>
              {/* User bubble */}
              <div className="flex gap-3 justify-end">
                <div className="rounded-lg rounded-tr-none bg-brand-primary text-ink-onbrand px-4 py-2 text-sm">
                  {valUnder.label}
                </div>
              </div>

              {/* System answer */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-white grid place-items-center text-sm font-bold flex-shrink-0">
                  Ö
                </div>
                <div className="flex-1">
                  <div className="rounded-lg rounded-tl-none bg-tint-notice p-4">
                    <p className="text-sm text-ink-secondary mb-3">{valUnder.action.description}</p>
                    {valUnder.action.type === "kontakt" && valUnder.action.tid && (
                      <p className="text-xs text-ink-muted mb-3">{valUnder.action.tid}</p>
                    )}
                    <a
                      href={valUnder.action.type === "link" ? valUnder.action.href : "#"}
                      className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand text-sm font-medium px-4 py-2.5 rounded hover:opacity-90 transition-opacity"
                    >
                      {valUnder.action.label} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Reset */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm text-ink-muted hover:text-brand-accent underline underline-offset-2"
                >
                  Börja om med en ny fråga
                </button>
              </div>
            </>
          )}
        </div>
      </Annotation>
    </div>
  );
}
