import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";
import { KATEGORIER, type KategoriId, type Underkategori } from "../kundservice-data";

/**
 * VARIANT B, Stegvis
 *
 * Två steg. Steg 1: kunden väljer ämne bland sex kort. Steg 2: kunden väljer
 * sin fråga och får svaret direkt i sidan. Ingen ny sida, inget popupfönster.
 * Kontaktvägarna syns hela tiden längst ner, men som sista utväg och inte
 * som första val.
 */
export function KundserviceProgressiv() {
  const [activeKategori, setActiveKategori] = useState<KategoriId | null>(null);
  const [activeUnder, setActiveUnder] = useState<string | null>(null);
  const kategori = activeKategori ? KATEGORIER.find((k) => k.id === activeKategori) : null;

  return (
    <div>
      {/* Steg 1: kunden väljer ämne */}
      <Annotation
        label="Ämneskort"
        audience="user"
        rationale="Sex kort, ett per vanligt ärende. Korten utgår från kundens problem, inte från hur Öresundskraft är organiserat, så kunden känner igen sig direkt."
      >
        <div className="mb-8">
          <Copy
            label="Instruktion i startläget"
            category="rubrik"
            text="Vad gäller din fråga? Välj ett ämne."
            rationale="Innan kunden valt något säger raden vad som ska hända. Kort fråga plus uppmaning. Undvik 'Välj kategori', som låter som ett formulär."
          >
            <p className="text-sm text-ink-secondary mb-3">Vad gäller din fråga? Välj ett ämne.</p>
          </Copy>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {KATEGORIER.map((k, idx) => {
              const isActive = k.id === activeKategori;
              const namn = <span className="font-medium block text-sm">{k.label}</span>;
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => {
                    setActiveKategori(isActive ? null : k.id);
                    setActiveUnder(null);
                  }}
                  className={`p-4 rounded-md border-2 text-left transition-all ${
                    isActive
                      ? "border-brand-accent bg-tint-info shadow-sm"
                      : "border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm"
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon name={k.ikon} size={28} className="text-brand-accent mb-2 block" />
                  {idx === 0 ? (
                    <Copy
                      label="Ämnesnamn"
                      category="rubrik"
                      text={k.label}
                      rationale="Korta namn med kundens ord, till exempel 'Faktura och betalning'. Skriv 'och' i stället för '&'. Beskrivningen under ger exempel på vad ämnet omfattar."
                    >
                      {namn}
                    </Copy>
                  ) : (
                    namn
                  )}
                  <span className="text-xs text-ink-muted block mt-0.5 leading-snug">{k.beskrivning}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Annotation>

      {/* Steg 2: kunden väljer fråga och får svar */}
      {kategori && (
        <Annotation
          label="Frågor inom valt ämne"
          audience="design"
          rationale="Steg 2 visas direkt under korten, utan ny sida. Kunden öppnar en fråga och får ett kort svar med en knapp som löser ärendet eller leder vidare."
        >
          <div className="rounded-md border border-brand-accent bg-surface overflow-hidden mb-8">
            <header className="px-5 py-3 bg-tint-info flex items-center gap-3">
              <Icon name={kategori.ikon} size={22} className="text-brand-accent" />
              <div>
                <h3 className="font-medium">{kategori.label}</h3>
                <Copy
                  label="Instruktion i steg 2"
                  category="rubrik"
                  text="Välj den fråga som passar bäst"
                  rationale="Säger vad kunden ska göra härnäst. Kort och konkret, utan att upprepa ämnesnamnet som redan står ovanför."
                >
                  <p className="text-xs text-ink-muted">Välj den fråga som passar bäst</p>
                </Copy>
              </div>
              <button
                type="button"
                onClick={() => { setActiveKategori(null); setActiveUnder(null); }}
                className="ml-auto text-ink-muted hover:text-ink p-1"
                aria-label="Stäng och välj ett annat ämne"
              >
                <Icon name="close" size={18} />
              </button>
            </header>
            <ul className="divide-y divide-border-subtle">
              {kategori.underkategorier.map((u, idx) => (
                <UnderItem
                  key={u.id}
                  item={u}
                  isFirst={idx === 0}
                  isOpen={activeUnder === u.id}
                  onToggle={() => setActiveUnder(activeUnder === u.id ? null : u.id)}
                />
              ))}
            </ul>
          </div>
        </Annotation>
      )}

      {/* Kontaktvägar, alltid synliga */}
      <Annotation
        label="Kontaktvägar"
        audience="user"
        rationale="Syns i alla steg och göms aldrig. Chatt, telefon och e-post finns som sista utväg, inte som första val. Öppettider och svarstider står direkt på knapparna."
      >
        <div>
          <Copy
            label="Rubrik för kontaktvägar"
            category="rubrik"
            text="Hittar du inte svaret? Kontakta oss här."
            rationale="Samma fråga som i variant A. Den förklarar när kontaktvägarna är till för, så de inte blir första valet."
          >
            <p className="text-sm text-ink-secondary mb-3">Hittar du inte svaret? Kontakta oss här.</p>
          </Copy>
          <div className="flex flex-wrap gap-3 text-sm">
            <Copy
              label="Chatt med öppettid"
              category="cta"
              text="Chatta med oss · Vardagar 08-17"
              rationale="Verb + objekt och öppettiden direkt på knappen. Kunden vet om chatten är öppen innan hen klickar."
            >
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border-subtle hover:border-brand-accent hover:bg-tint-info transition-colors">
                <Icon name="chat_bubble" size={16} className="text-brand-accent" />
                <span>Chatta med oss · Vardagar 08-17</span>
              </a>
            </Copy>
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border-subtle hover:border-brand-accent hover:bg-tint-info transition-colors">
              <Icon name="call" size={16} className="text-brand-accent" />
              <span>Ring oss · [08-455 44 00]</span>
            </a>
            <Copy
              label="E-post med svarstid"
              category="reassurance"
              text="Skicka e-post · Svar inom 1 arbetsdag"
              rationale="Svarstiden sätter rätt förväntan. Den som har bråttom väljer chatt eller telefon i stället."
            >
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border-subtle hover:border-brand-accent hover:bg-tint-info transition-colors">
                <Icon name="mail" size={16} className="text-brand-accent" />
                <span>Skicka e-post · Svar inom 1 arbetsdag</span>
              </a>
            </Copy>
          </div>
        </div>
      </Annotation>
    </div>
  );
}

function UnderItem({ item, isFirst, isOpen, onToggle }: { item: Underkategori; isFirst: boolean; isOpen: boolean; onToggle: () => void }) {
  const a = item.action;

  const actionBadge =
    a.type === "mina-sidor" ? "Mina sidor" :
    a.type === "kontakt" ? (a.kanal === "chatt" ? "Chatt" : a.kanal === "telefon" ? "Ring" : "E-post") :
    a.type === "link" ? "Guide" :
    "Info";

  const badgeColor =
    a.type === "mina-sidor" ? "bg-tint-notice text-brand-primary" :
    a.type === "kontakt" ? "bg-tint-highlight text-brand-primary" :
    "bg-tint-info text-brand-primary";

  const badge = (
    <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${badgeColor}`}>
      {actionBadge}
    </span>
  );

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-tint-info transition-colors text-left"
        aria-expanded={isOpen}
      >
        <span className="flex-1 font-medium text-sm">{item.label}</span>
        {isFirst ? (
          <Annotation
            label="Etikett: vart frågan leder"
            audience="user"
            rationale="Etiketten visar i förväg vad kunden får: en guide, Mina sidor, chatt eller telefon. Kunden slipper klicka för att se om svaret passar."
          >
            {badge}
          </Annotation>
        ) : (
          badge
        )}
        <Icon name="expand_more" size={18} className={`text-ink-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <Annotation
          label="Svar med knapp"
          audience="redaktör"
          rationale="Skriv svaret i en eller två meningar: vad kunden kan göra och vad hen behöver ha till hands. Knappen ska vara verb + objekt, till exempel 'Anmäl inflyttning'."
        >
          <div className="px-5 pb-4 flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-1">
              <p className="text-sm text-ink-secondary leading-relaxed">{a.description}</p>
              {a.type === "kontakt" && a.tid && (
                <Copy
                  label="Svarstid eller telefonnummer"
                  category="reassurance"
                  text={a.tid}
                  rationale="Står direkt under svaret så att kunden vet vad som väntar: hur snabbt chatten svarar eller vilket nummer som gäller."
                >
                  <p className="text-xs text-ink-muted mt-1">{a.tid}</p>
                </Copy>
              )}
            </div>
            <Copy
              label="Knapp i svaret"
              category="cta"
              text={a.label}
              rationale="Knappen säger vad kunden gör, till exempel 'Byt avtal på Mina sidor'. Undvik 'Läs mer' och 'Klicka här', som inte säger vart knappen leder."
            >
              <a
                href={a.type === "link" ? a.href : "#"}
                className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand text-sm font-medium px-4 py-2.5 rounded hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                {a.type === "link" || a.type === "info" ? a.label : a.label}
                <Icon name="arrow_forward" size={16} />
              </a>
            </Copy>
          </div>
        </Annotation>
      )}
    </li>
  );
}
