import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { AVBROTT, STATUS_META, TYP_LABEL, formatTid, type AvbrottStatus } from "../avbrott-data";

/**
 * VARIANT A, Samlad lista
 *
 * Idé: en enkel lista där avbrotten är grupperade efter läge, med pågående
 * överst, sedan planerade och sist avslutade. Inga filter, ingen karta och
 * inget som behöver klickas fram. Allt om varje avbrott syns direkt, som på
 * en anslagstavla. Fungerar bra för utskrift och skärmläsare.
 */

const GRUPP_RUBRIK: Record<AvbrottStatus, string> = {
  pagaende: "Pågående avbrott",
  planerat: "Planerade avbrott",
  avslutat: "Avslutade avbrott",
};

const INGA_PAGAENDE = "Just nu finns inga pågående avbrott.";
const TOM_RUBRIK = "Inga avbrott just nu";
const TOM_TEXT =
  "Vi känner inte till några avbrott i el, fjärrvärme eller fiber. Är du ändå utan ström eller värme? Kontrollera dina säkringar och gör sedan en felanmälan.";

export function AvbrottTrygg() {
  const groups: AvbrottStatus[] = ["pagaende", "planerat", "avslutat"];
  const forstaMedUppdateringar = AVBROTT.find((a) => a.uppdateringar && a.uppdateringar.length > 0)?.id;

  if (AVBROTT.length === 0) {
    return (
      <Annotation
        label="Tomt läge: inga avbrott"
        audience="user"
        rationale="Visas när det inte finns några avbrott alls. Besökaren får ett tydligt besked och vet vad nästa steg är om problemet ändå finns kvar hemma."
      >
        <div className="border border-border-subtle rounded-md bg-surface p-6 max-w-reading">
          <Copy
            label="Tomt läge, rubrik"
            category="rubrik"
            text={TOM_RUBRIK}
            rationale="Ett direkt besked som svarar på frågan besökaren kom med. Undvik 'Inga resultat', som låter som ett tekniskt fel."
          >
            <h3 className="text-h4 font-medium mb-2">{TOM_RUBRIK}</h3>
          </Copy>
          <Copy
            label="Tomt läge, nästa steg"
            category="ton"
            text={TOM_TEXT}
            rationale="Utgår från att besökaren kan ha ett verkligt problem. Säkringarna först, eftersom det är den vanligaste orsaken, sedan felanmälan."
          >
            <p className="text-sm text-ink-secondary">{TOM_TEXT}</p>
          </Copy>
        </div>
      </Annotation>
    );
  }

  return (
    <Annotation
      label="Samlad lista grupperad efter läge"
      audience="design"
      rationale="Pågående avbrott först, sedan planerade och sist avslutade. Ordningen följer hur brådskande det är. Inga filter eller flikar, allt syns i en enda lista och besökaren behöver inte lära sig något."
    >
      <div className="space-y-8">
          {groups.map((status, gIdx) => {
            const items = AVBROTT.filter((a) => a.status === status);
            const meta = STATUS_META[status];

            if (items.length === 0) {
              if (status !== "pagaende") return null;
              return (
                <section key={status}>
                  <Copy
                    label="Statusmeddelande: inga pågående avbrott"
                    category="reassurance"
                    text={INGA_PAGAENDE}
                    rationale="Besökaren letar i första hand efter pågående avbrott. Ett uttryckligt besked lugnar mer än en tom rubrik. Skriv 'just nu' så att det är tydligt att läget kan ändras."
                  >
                    <p className="text-sm text-ink-secondary">{INGA_PAGAENDE}</p>
                  </Copy>
                </section>
              );
            }

            const rubrik = <h3 className="text-h4 font-medium">{GRUPP_RUBRIK[status]}</h3>;
            const rubrikrad = (
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${meta.dotColor}`} />
                {gIdx === 0 ? (
                  <Copy
                    label="Grupprubrik"
                    category="rubrik"
                    text={GRUPP_RUBRIK[status]}
                    rationale="Läge plus ordet 'avbrott' gör att rubriken går att förstå även när besökaren hoppar direkt till den med skärmläsare. Samma mönster för alla tre grupper."
                  >
                    {rubrik}
                  </Copy>
                ) : (
                  rubrik
                )}
                <span className="text-xs text-ink-muted">({items.length})</span>
              </div>
            );

            return (
              <section key={status}>
                {gIdx === 0 ? (
                  <Annotation
                    label="Grupprubrik med färg och antal"
                    audience="user"
                    rationale="Färgpunkten, rubriken och antalet visar läget på en gång. Läget står alltid i text, så att det går att förstå även utan att se färgen."
                  >
                    {rubrikrad}
                  </Annotation>
                ) : (
                  rubrikrad
                )}
                <div className="space-y-3">
                  {items.map((a, idx) => {
                    const forsta = gIdx === 0 && idx === 0;
                    const startEtikett = a.status === "planerat" ? "Börjar" : "Började";
                    const slutEtikett = a.slutFaktiskt ? "Klart" : "Beräknas klart";
                    const slutTid = a.slutFaktiskt ?? a.slutBeraknat;
                    const kortRubrik = <h4 className="font-medium">{a.rubrik}</h4>;
                    const startTid = <dd>{formatTid(a.start)}</dd>;

                    const kort = (
                      <article key={a.id} className="border border-border-subtle rounded-md bg-surface p-5">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          {forsta ? (
                            <Copy
                              label="Avbrottets rubrik"
                              category="rubrik"
                              text={a.rubrik}
                              rationale="Vad som hänt och var, i den ordningen. Besökaren känner igen sitt område direkt. Undvik interna namn på anläggningar i rubriken, de hör hemma i beskrivningen."
                            >
                              {kortRubrik}
                            </Copy>
                          ) : (
                            kortRubrik
                          )}
                          <div className="flex gap-2">
                            <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${meta.color}`}>
                              {meta.label}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded bg-tint-info text-brand-primary">
                              {TYP_LABEL[a.typ]}
                            </span>
                          </div>
                        </div>
                        <dl className="text-sm grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 mb-3">
                          <div>
                            <dt className="text-ink-muted">Område</dt>
                            <dd>{a.omrade}</dd>
                          </div>
                          <div>
                            <dt className="text-ink-muted">{startEtikett}</dt>
                            {forsta ? (
                              <Copy
                                label="Tidsangivelse"
                                category="metadata"
                                text={formatTid(a.start)}
                                rationale="Datum med månadens namn och 'kl.' läses snabbare än en sifferkod som 2026-04-19. Etiketten ändras efter läget: 'Börjar' för planerade, 'Började' för övriga."
                              >
                                {startTid}
                              </Copy>
                            ) : (
                              startTid
                            )}
                          </div>
                          <div>
                            <dt className="text-ink-muted">{slutEtikett}</dt>
                            <dd>{slutTid ? formatTid(slutTid) : "Meddelas senare"}</dd>
                          </div>
                          <div>
                            <dt className="text-ink-muted">Berörda kunder</dt>
                            <dd>cirka {a.berordaKunder}</dd>
                          </div>
                        </dl>
                        <p className="text-sm text-ink-secondary">{a.beskrivning}</p>
                        {a.uppdateringar && a.uppdateringar.length > 0 && (() => {
                          const uppdateringar = (
                            <div className="mt-3 pt-3 border-t border-border-subtle">
                              <p className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-2">Uppdateringar</p>
                              <ul className="space-y-1 text-sm text-ink-secondary">
                                {a.uppdateringar.map((u) => (
                                  <li key={u.tid} className="flex gap-2">
                                    <span className="text-ink-muted font-medium w-12 flex-shrink-0">{u.tid}</span>
                                    <span>{u.text}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                          return a.id === forstaMedUppdateringar ? (
                            <Annotation
                              label="Uppdateringar med klockslag"
                              audience="user"
                              rationale="Visar vad som hänt hittills och när. Besökaren ser att arbetet går framåt och slipper ringa kundservice för att fråga."
                            >
                              {uppdateringar}
                            </Annotation>
                          ) : (
                            uppdateringar
                          );
                        })()}
                      </article>
                    );

                    return forsta ? (
                      <Annotation
                        key={a.id}
                        label="Avbrottskort"
                        audience="redaktör"
                        rationale="Fyll i rubrik (vad och var), område, start, beräknat slut, antal berörda kunder och en kort beskrivning av orsak och vad vi gör. Lägg till en uppdatering med klockslag varje gång läget ändras."
                      >
                        {kort}
                      </Annotation>
                    ) : (
                      kort
                    );
                  })}
                </div>
              </section>
            );
          })}
      </div>
    </Annotation>
  );
}
