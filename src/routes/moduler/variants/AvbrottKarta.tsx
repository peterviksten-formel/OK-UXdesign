import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";
import { AVBROTT, STATUS_META, TYP_LABEL } from "../avbrott-data";

/**
 * VARIANT C, Karta-first
 *
 * Kartan är huvudytan. Lista som sekundär vy bredvid. Pinns på kartan
 * pulserar vid pågående avbrott.
 *
 * Pro: Direkt svar "är mitt område påverkat?". Visuellt tydligt.
 * Kontra: Kräver kart-data/API. Fungerar sämre utan webbläsarposition.
 */

const pagaende = AVBROTT.filter((a) => a.status === "pagaende");
const planerat = AVBROTT.filter((a) => a.status === "planerat");

// Fake koordinater för demo-syfte. Positioner i %.
const PINS = [
  { id: "a1", x: 42, y: 58, status: "pagaende" as const },
  { id: "a2", x: 32, y: 48, status: "pagaende" as const },
  { id: "a3", x: 68, y: 62, status: "planerat" as const },
  { id: "a4", x: 55, y: 78, status: "planerat" as const },
];

export function AvbrottKarta() {
  const [valt, setValt] = useState<string | null>("a1");
  const valtAvbrott = valt ? AVBROTT.find((a) => a.id === valt) : null;

  return (
    <Annotation
      label="Avbrottslista, karta-first"
      audience="design"
      rationale="Karta som primär yta. Pinns klickbara → listan scrollar till detaljerna. Pulsande pin vid pågående avbrott. Listan är synlig bredvid men kartan äger beslutet 'är det nära mig?'. I produktion: riktig kartdata (Mapbox/Leaflet/MapLibre)."
    >
      <div className="grid lg:grid-cols-[1fr_380px] gap-4">
        {/* Map */}
        <div className="relative rounded-lg border border-border-strong bg-tint-info overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
          {/* Grid backdrop simulating map */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-border-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border-strong) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Label */}
          <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur rounded px-2 py-1 text-xs font-medium text-ink-secondary flex items-center gap-1.5">
            <Icon name="map" size={14} />
            Helsingborg / Ängelholm
          </div>
          {/* Legend */}
          <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur rounded p-2 text-xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-highlight animate-pulse" />
              Pågående ({pagaende.length})
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              Planerat ({planerat.length})
            </div>
          </div>
          {/* Pins */}
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
          {/* Selected pin info bubble */}
          {valtAvbrott && (
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
                  <p className="text-xs text-ink-muted mb-2">
                    {valtAvbrott.omrade} · {valtAvbrott.berordaKunder} kunder
                  </p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{valtAvbrott.beskrivning}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setValt(null)}
                  className="text-ink-muted hover:text-ink p-0.5 -mt-1 -mr-1"
                  aria-label="Stäng"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* List sidebar */}
        <aside className="space-y-2 lg:max-h-[520px] lg:overflow-y-auto pr-1">
          {AVBROTT.filter((a) => a.status !== "avslutat").map((a) => {
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
      </div>
    </Annotation>
  );
}
