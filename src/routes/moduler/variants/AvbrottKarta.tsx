import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";
import { AVBROTT, STATUS_META, TYP_LABEL, formatTid } from "../avbrott-data";

/**
 * VARIANT C, Kartfokuserad
 *
 * Idé: kartan är huvudytan och listan finns bredvid. Markeringar för
 * pågående avbrott pulserar. Klick på en markering eller i listan visar
 * en informationsruta om avbrottet.
 *
 * Fördel: ger ett direkt svar på frågan "Berörs mitt område?".
 * Nackdel: kräver ett riktigt kartunderlag och fungerar sämre för den som
 * inte ser kartan. Listan måste därför alltid finnas med.
 */

const pagaende = AVBROTT.filter((a) => a.status === "pagaende");
const planerat = AVBROTT.filter((a) => a.status === "planerat");

// Påhittade positioner för skissen, angivna i procent av kartans bredd och höjd.
const LIST_RUBRIK = "Pågående och planerade avbrott";
const TOM_LISTA = "Just nu finns inga pågående eller planerade avbrott.";
const VALJ_HINT = "Välj en markering på kartan eller ett avbrott i listan för att se mer.";

const PINS = [
  { id: "a1", x: 42, y: 58, status: "pagaende" as const },
  { id: "a2", x: 32, y: 48, status: "pagaende" as const },
  { id: "a3", x: 68, y: 62, status: "planerat" as const },
  { id: "a4", x: 55, y: 78, status: "planerat" as const },
];

export function AvbrottKarta() {
  const [valt, setValt] = useState<string | null>("a1");
  const valtAvbrott = valt ? AVBROTT.find((a) => a.id === valt) : null;
  const aktuella = AVBROTT.filter((a) => a.status !== "avslutat");
  const tidText = !valtAvbrott
    ? ""
    : valtAvbrott.slutFaktiskt
      ? `Klart ${formatTid(valtAvbrott.slutFaktiskt)}`
      : valtAvbrott.status === "planerat"
        ? `Börjar ${formatTid(valtAvbrott.start)}`
        : valtAvbrott.slutBeraknat
          ? `Beräknas klart ${formatTid(valtAvbrott.slutBeraknat)}`
          : "Sluttid meddelas senare";

  return (
    <Annotation
      label="Karta med lista bredvid"
      audience="design"
      rationale="Kartan är huvudytan och svarar på frågan 'Berörs mitt område?'. Listan bredvid visar samma avbrott i text och är nödvändig för den som inte ser kartan. Pågående avbrott pulserar på kartan."
    >
      <div className="grid lg:grid-cols-[1fr_380px] gap-4">
        {/* Map */}
        <div className="relative rounded-lg border border-border-strong bg-tint-info overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
          {/* Rutmönster som föreställer en karta i skissen */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-border-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border-strong) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Områdesnamn */}
          <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur rounded px-2 py-1 text-xs font-medium text-ink-secondary flex items-center gap-1.5">
            <Icon name="map" size={14} />
            Helsingborg och Ängelholm
          </div>
          {/* Teckenförklaring */}
          <Annotation
            label="Teckenförklaring"
            audience="user"
            rationale="Förklarar vad färgerna betyder och hur många avbrott det finns i varje läge. Läget står i text, så kartan går att förstå även utan att skilja på färgerna."
          >
            <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur rounded p-2 text-xs space-y-1">
              <Copy
                label="Teckenförklaring, läge och antal"
                category="metadata"
                text={`Pågående (${pagaende.length})`}
                rationale="Samma ord för läget som i listan och på etiketterna, så att besökaren känner igen det. Antalet visar direkt hur stort läget är."
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-highlight animate-pulse" />
                  Pågående ({pagaende.length})
                </div>
              </Copy>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                Planerat ({planerat.length})
              </div>
            </div>
          </Annotation>
          {/* Markeringar */}
          {PINS.map((pin) => {
            const avbrott = AVBROTT.find((a) => a.id === pin.id);
            if (!avbrott) return null;
            const aktiv = valt === pin.id;
            const pulsing = pin.status === "pagaende";
            return (
              <button
                key={pin.id}
                type="button"
                onClick={() => setValt(pin.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                aria-label={`${avbrott.rubrik}, ${avbrott.omrade}`}
              >
                <span
                  className={`block relative ${aktiv ? "scale-125" : "scale-100"} transition-transform`}
                >
                  <span
                    className={`absolute inset-0 rounded-full ${
                      pulsing ? "bg-brand-highlight/40 animate-ping" : ""
                    }`}
                  />
                  <span
                    className={`relative block w-4 h-4 rounded-full border-2 border-white shadow-md ${
                      pin.status === "pagaende" ? "bg-brand-highlight" : "bg-yellow-500"
                    }`}
                  />
                </span>
              </button>
            );
          })}
          {/* Informationsruta för vald markering */}
          {valtAvbrott ? (
            <Annotation
              label="Informationsruta för valt avbrott"
              audience="user"
              rationale="Visar rubrik, område, antal berörda, när avbrottet beräknas vara klart och en kort beskrivning. Besökaren får svar utan att lämna kartan."
            >
            <div
              className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-surface rounded-md border border-border-strong shadow-xl p-4"
              role="status"
            >
              <div className="flex items-start gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 ${STATUS_META[valtAvbrott.status].dotColor} ${valtAvbrott.status === "pagaende" ? "animate-pulse" : ""}`}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-0.5">{valtAvbrott.rubrik}</h4>
                  <p className="text-xs text-ink-muted mb-1">
                    {valtAvbrott.omrade} · cirka {valtAvbrott.berordaKunder} berörda kunder
                  </p>
                  <Copy
                    label="Tidsangivelse i informationsrutan"
                    category="metadata"
                    text={tidText}
                    rationale="Det besökaren oftast vill veta efter 'var' är 'när'. 'Beräknas klart' visar att tiden är en bedömning. Planerade avbrott visar i stället när arbetet börjar."
                  >
                    <p className="text-xs font-medium text-ink-secondary mb-2">{tidText}</p>
                  </Copy>
                  <p className="text-xs text-ink-secondary leading-relaxed">{valtAvbrott.beskrivning}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setValt(null)}
                  className="text-ink-muted hover:text-ink p-0.5 -mt-1 -mr-1"
                  aria-label="Stäng informationsrutan"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            </div>
            </Annotation>
          ) : (
            <Copy
              label="Hjälptext när inget avbrott är valt"
              category="ton"
              text={VALJ_HINT}
              rationale="Visar vad besökaren kan göra i stället för en tom yta. Nämner både kartan och listan, så att det fungerar även för den som inte använder kartan."
            >
              <p className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-surface/90 rounded-md border border-border-subtle p-3 text-xs text-ink-secondary">
                {VALJ_HINT}
              </p>
            </Copy>
          )}
        </div>

        {/* Lista bredvid kartan */}
        <Annotation
          label="Lista bredvid kartan"
          audience="redaktör"
          rationale="Visar pågående och planerade avbrott, avslutade visas inte här. Varje avbrott behöver en plats på kartan för att få en markering. Utan plats syns det bara i listan, så fyll alltid i området."
        >
        <aside className="space-y-2 lg:max-h-[520px] lg:overflow-y-auto pr-1">
          <Copy
            label="Listans rubrik"
            category="rubrik"
            text={LIST_RUBRIK}
            rationale="Säger exakt vad listan innehåller, så att ingen letar efter avslutade avbrott här. Sentence case, som i övriga rubriker."
          >
            <h3 className="text-sm font-medium text-ink-secondary mb-1">{LIST_RUBRIK}</h3>
          </Copy>
          {aktuella.length === 0 && (
            <Copy
              label="Tomt läge: inga aktuella avbrott"
              category="reassurance"
              text={TOM_LISTA}
              rationale="Ett tydligt besked i stället för en tom lista. 'Just nu' visar att läget kan ändras."
            >
              <p className="text-sm text-ink-secondary p-3 rounded-md border border-border-subtle bg-surface">{TOM_LISTA}</p>
            </Copy>
          )}
          {aktuella.map((a) => {
            const meta = STATUS_META[a.status];
            const aktiv = valt === a.id;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setValt(a.id)}
                className={`w-full text-left p-3 rounded-md border-2 bg-surface flex items-start gap-3 transition-colors ${
                  aktiv
                    ? "border-brand-accent bg-tint-info"
                    : "border-border-subtle hover:border-brand-accent"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mt-2 ${meta.dotColor} ${a.status === "pagaende" ? "animate-pulse" : ""}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{a.rubrik}</p>
                  <p className="text-xs text-ink-muted">
                    {a.omrade} · {TYP_LABEL[a.typ]}
                  </p>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded ${meta.color}`}
                >
                  {meta.label}
                </span>
              </button>
            );
          })}
        </aside>
        </Annotation>
      </div>
    </Annotation>
  );
}
