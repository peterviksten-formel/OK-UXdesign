import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { AVBROTT, STATUS_META, TYP_LABEL, formatTid, type AvbrottStatus } from "../avbrott-data";

/**
 * VARIANT B, Filtrerbar lista
 *
 * Idé: en lista som besökaren kan filtrera efter läge, med antal per filter.
 * Varje avbrott visas som ett kompakt kort som går att fälla ut för att se
 * beskrivning och tidslinje. Överst finns en varningsrad som visar hur många
 * avbrott som pågår just nu och länkar till felanmälan.
 */

type Filter = AvbrottStatus | "alla";

const TOMT_FILTER: Record<Filter, string> = {
  alla: "Just nu finns inga avbrott i el, fjärrvärme eller fiber.",
  pagaende: "Just nu finns inga pågående avbrott.",
  planerat: "Just nu finns inga planerade avbrott.",
  avslutat: "Det finns inga avslutade avbrott att visa.",
};

export function AvbrottProgressiv() {
  const [filter, setFilter] = useState<Filter>("alla");
  const [expanded, setExpanded] = useState<string | null>(null);

  const counts = {
    alla: AVBROTT.length,
    pagaende: AVBROTT.filter((a) => a.status === "pagaende").length,
    planerat: AVBROTT.filter((a) => a.status === "planerat").length,
    avslutat: AVBROTT.filter((a) => a.status === "avslutat").length,
  };

  const filtered = filter === "alla" ? AVBROTT : AVBROTT.filter((a) => a.status === filter);
  const pagaendeCount = counts.pagaende;
  const forstaMedTidslinje = filtered.find((a) => a.uppdateringar && a.uppdateringar.length > 0)?.id;

  return (
    <div>
      {/* Varningsrad för pågående avbrott */}
      {pagaendeCount > 0 ? (
        <Annotation
          label="Varningsrad för pågående avbrott"
          audience="user"
          rationale="Syns bara när något pågår just nu. Besökaren ser direkt hur många avbrott det gäller och kan gå vidare till felanmälan om det egna problemet inte finns i listan."
        >
          <div className="mb-6 p-4 rounded-md bg-brand-highlight text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <Copy
                label="Varningsrad, statusmeddelande"
                category="rubrik"
                text={`${pagaendeCount} pågående avbrott just nu`}
                rationale="Siffran först, eftersom antalet är det besökaren vill veta. 'Just nu' visar att uppgiften gäller i detta ögonblick. Undvik 'Driftstörningar förekommer', som är vagt och formellt."
              >
                <span className="font-medium">
                  {pagaendeCount} pågående avbrott just nu
                </span>
              </Copy>
            </div>
            <Copy
              label="Varningsrad, länk till felanmälan"
              category="cta"
              text="Gör en felanmälan →"
              rationale="Verb plus objekt säger exakt vad som händer. Länken riktar sig till den som inte hittar sitt problem i listan. Undvik 'Läs mer' eller 'Klicka här'."
            >
              <a
                href="#"
                className="text-sm underline underline-offset-2 hover:opacity-80"
              >
                Gör en felanmälan →
              </a>
            </Copy>
          </div>
        </Annotation>
      ) : (
        <Copy
          label="Statusmeddelande: inga pågående avbrott"
          category="reassurance"
          text="Just nu finns inga pågående avbrott."
          rationale="När inget pågår ersätts varningsraden av ett lugnt besked. Besökaren får ett svar i stället för en tom yta. Skriv 'just nu', eftersom läget kan ändras."
        >
          <p className="mb-6 p-4 rounded-md bg-tint-info text-brand-primary font-medium">
            Just nu finns inga pågående avbrott.
          </p>
        </Copy>
      )}

      {/* Filter efter läge */}
      <Annotation
        label="Filter efter läge"
        audience="design"
        rationale="Filterknappar med antal i varje läge. 'Alla' är förvalt. Pågående har en pulserande röd punkt. Besökaren kan snabbt korta listan utan att läsa igenom allt."
      >
        <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filtrera avbrott efter läge">
          {(["alla", "pagaende", "planerat", "avslutat"] as const).map((s) => {
            const isActive = filter === s;
            const label = s === "alla" ? "Alla" : STATUS_META[s].label;
            const knapp = (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => { setFilter(s); setExpanded(null); }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border transition-colors ${
                  isActive
                    ? "bg-brand-primary text-ink-onbrand border-brand-primary"
                    : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent"
                }`}
              >
                {s !== "alla" && (
                  <span className={`w-2 h-2 rounded-full ${STATUS_META[s].dotColor} ${s === "pagaende" ? "animate-pulse" : ""}`} />
                )}
                {label}
                <span className={`text-xs ${isActive ? "opacity-70" : "text-ink-muted"}`}>
                  ({counts[s]})
                </span>
              </button>
            );
            return s === "alla" ? (
              <Copy
                key={s}
                label="Filterknappar"
                category="metadata"
                text="Alla"
                rationale="Ett ord per läge, samma ord som på korten: Alla, Pågående, Planerat, Avslutat. Antalet inom parentes visar innan klicket om filtret ger något att se."
              >
                {knapp}
              </Copy>
            ) : (
              knapp
            );
          })}
        </div>
      </Annotation>

      {/* Tomt filter */}
      {filtered.length === 0 && (
        <Annotation
          label="Tomt läge: inga avbrott i valt filter"
          audience="user"
          rationale="Visas när filtret inte ger några träffar. Besökaren får veta att det är filtret som är tomt, inte sidan, och kommer tillbaka till hela listan med ett klick."
        >
          <div className="rounded-md border border-border-subtle bg-surface p-5">
            <Copy
              label="Tomt läge, meddelande"
              category="ton"
              text={TOMT_FILTER[filter]}
              rationale="Ett sakligt besked för varje filter. 'Just nu' visar att läget kan ändras. Undvik 'Inga resultat hittades', som låter som ett fel."
            >
              <p className="text-sm text-ink-secondary mb-3">{TOMT_FILTER[filter]}</p>
            </Copy>
            {filter !== "alla" && (
              <Copy
                label="Tomt läge, visa alla"
                category="cta"
                text="Visa alla avbrott"
                rationale="Verb plus objekt. Ger en väg vidare i stället för en återvändsgränd."
              >
                <button
                  type="button"
                  onClick={() => setFilter("alla")}
                  className="text-sm font-medium text-brand-accent underline underline-offset-2"
                >
                  Visa alla avbrott
                </button>
              </Copy>
            )}
          </div>
        </Annotation>
      )}

      {/* Avbrottskort */}
      {filtered.length > 0 && (
        <Annotation
          label="Avbrottskort som går att fälla ut"
          audience="design"
          rationale="Kompakta kort med det viktigaste synligt direkt: läge, typ, område och antal berörda. Ett klick fäller ut beskrivning och tidslinje. Pågående avbrott har en färgad kant. Allt visas i sidan, inga popup-fönster."
        >
          <div className="space-y-3">
            {filtered.map((a, idx) => {
              const meta = STATUS_META[a.status];
              const isOpen = expanded === a.id;
              const hasTL = a.uppdateringar && a.uppdateringar.length > 0;
              const forsta = idx === 0;
              const visaText = isOpen ? "Dölj tidslinje" : "Visa tidslinje";
              const startText = `${a.status === "planerat" ? "Börjar" : "Började"} ${formatTid(a.start)}`;
              const slutTid = a.slutFaktiskt ?? a.slutBeraknat;
              const slutText = a.slutFaktiskt
                ? `Klart ${formatTid(a.slutFaktiskt)}`
                : slutTid
                  ? `Beräknas klart ${formatTid(slutTid)}`
                  : "Sluttid meddelas senare";

              const rubrik = <h4 className="font-medium truncate">{a.rubrik}</h4>;
              const visaKnapp = <span className="text-sm">{visaText}</span>;

              const tidslinje = isOpen && a.uppdateringar ? (
                <div className="px-5 pb-4 border-t border-border-subtle pt-3">
                  <p className="text-sm text-ink-secondary mb-3">{a.beskrivning}</p>
                  <div className="relative pl-4 border-l-2 border-border-subtle space-y-3">
                    {a.uppdateringar.map((u, i) => (
                      <div key={u.tid} className="relative">
                        <span className={`absolute -left-[calc(1rem+5px)] w-2.5 h-2.5 rounded-full border-2 border-canvas ${
                          i === a.uppdateringar!.length - 1 ? meta.dotColor : "bg-border-strong"
                        }`} />
                        <p className="text-sm">
                          <span className="font-medium text-ink-muted mr-2">{u.tid}</span>
                          <span className="text-ink-secondary">{u.text}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3 text-sm">
                    <Copy
                      label="Tidsangivelse, start"
                      category="metadata"
                      text={startText}
                      rationale="Datum med månadens namn och 'kl.' läses snabbare än en sifferkod. 'Började' eller 'Börjar' beroende på läge, så att tiden aldrig kan missförstås."
                    >
                      <span className="text-ink-muted">{startText}</span>
                    </Copy>
                    <Copy
                      label="Tidsangivelse, slut"
                      category="metadata"
                      text={slutText}
                      rationale="'Beräknas klart' visar att tiden är en bedömning, 'Klart' att det är avslutat. Saknas tid skriver vi att den meddelas senare i stället för att lämna fältet tomt."
                    >
                      <span className="text-ink-muted">{slutText}</span>
                    </Copy>
                  </div>
                </div>
              ) : null;

              const kort = (
                <article
                  key={a.id}
                  className={`rounded-md border bg-surface overflow-hidden transition-colors ${
                    a.status === "pagaende" ? "border-brand-highlight" : "border-border-subtle"
                  }`}
                >
                  <div
                    className="px-5 py-4 flex flex-wrap items-start gap-x-6 gap-y-2 cursor-pointer hover:bg-tint-info/50 transition-colors"
                    onClick={() => hasTL && setExpanded(isOpen ? null : a.id)}
                    role={hasTL ? "button" : undefined}
                    aria-expanded={hasTL ? isOpen : undefined}
                    tabIndex={hasTL ? 0 : undefined}
                    onKeyDown={(e) => hasTL && e.key === "Enter" && setExpanded(isOpen ? null : a.id)}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${meta.dotColor} ${a.status === "pagaende" ? "animate-pulse" : ""}`} />
                      {forsta ? (
                        <Copy
                          label="Avbrottets rubrik"
                          category="rubrik"
                          text={a.rubrik}
                          rationale="Vad som hänt och var. Rubriken kortas av på smala skärmar, så det viktigaste måste stå först. Undvik interna namn på anläggningar."
                        >
                          {rubrik}
                        </Copy>
                      ) : (
                        rubrik
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                      <span className={`uppercase tracking-wider font-medium px-2 py-0.5 rounded ${meta.color}`}>
                        {meta.label}
                      </span>
                      <span>{TYP_LABEL[a.typ]}</span>
                      <span>{a.omrade}</span>
                      <span>cirka {a.berordaKunder} kunder</span>
                      {hasTL && (
                        <>
                          {a.id === forstaMedTidslinje ? (
                            <Copy
                              label="Visa eller dölj tidslinje"
                              category="cta"
                              text={visaText}
                              rationale="Säger vad som händer vid klick. En pil ensam är lätt att missa och säger inget till skärmläsare. Texten växlar mellan 'Visa' och 'Dölj'."
                            >
                              {visaKnapp}
                            </Copy>
                          ) : (
                            visaKnapp
                          )}
                          <span aria-hidden="true" className={`text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Utfälld detalj */}
                  {tidslinje && a.id === forstaMedTidslinje ? (
                    <Annotation
                      label="Tidslinje med uppdateringar"
                      audience="user"
                      rationale="Beskrivning, uppdateringar med klockslag och start- och sluttid. Den senaste uppdateringen är markerad. Besökaren ser att arbetet går framåt och när det beräknas vara klart."
                    >
                      {tidslinje}
                    </Annotation>
                  ) : (
                    tidslinje
                  )}
                </article>
              );

              return forsta ? (
                <Annotation
                  key={a.id}
                  label="Avbrottskort, innehåll"
                  audience="redaktör"
                  rationale="Fyll i rubrik, typ, område och antal berörda. Beskrivningen och tidslinjen visas när kortet fälls ut. Lägg till en uppdatering med klockslag varje gång läget ändras, annars går kortet inte att fälla ut."
                >
                  {kort}
                </Annotation>
              ) : (
                kort
              );
            })}
          </div>
        </Annotation>
      )}
    </div>
  );
}
