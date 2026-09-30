import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";
import type { Produkt } from "../produkt-data";

/**
 * VARIANT B, Progressiv
 *
 * Inspirerad av webbshoppar. Överst en stor bild med priset som etikett,
 * en ruta som säger vem produkten passar för och två knappar (köp och fråga).
 * Under det ligger detaljerna i flikar: Vad ingår, Villkor och Varför.
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
  const trygghetsrad =
    p.cta.typ === "kop" ? "Tar cirka 5 minuter · Du behöver personnummer och adress" :
    p.cta.typ === "offert" ? "Kostnadsfritt · Svar inom 3 arbetsdagar" :
    "Kostnadsfritt · Du förbinder dig inte till något";

  const renderTab = (t: (typeof tabs)[number]) => (
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
  );

  return (
    <div>
      {/* Produktens hero */}
      <Annotation
        label="Produktens hero"
        audience="design"
        rationale="Bild, pris och knappar i samma vy, som i en webbshop. Priset ligger inte gömt i en tabell utan syns direkt, och kunden kan köpa eller ställa en fråga utan att scrolla."
      >
        <div className="rounded-lg overflow-hidden border border-border-subtle mb-6">
          {/* Bildyta */}
          <div className="relative bg-tint-info aspect-[16/7] flex items-center justify-center">
            <div className="text-center text-ink-muted">
              <Icon name="image" size={56} className="mb-2" />
              <p className="text-xs">{p.bildAlt}</p>
            </div>
            {/* Prisetikett */}
            <Annotation
              label="Prisetikett på bilden"
              audience="user"
              rationale="Priset ligger som en etikett ovanpå bilden och är det första kunden ser. Den som bara vill veta vad det kostar får svaret direkt, utan att leta i texten."
            >
            <div className="absolute bottom-4 right-4 bg-canvas/95 backdrop-blur rounded-md px-4 py-2 shadow-lg border border-border-subtle">
              {p.pris.typ === "offert" ? (
                <Copy
                  label="Prisetikett vid offert"
                  category="metadata"
                  text="Pris enligt offert"
                  rationale="Säger att priset tas fram i en offert, i stället för att lämna etiketten tom. Formuleras som ett besked om priset och inte som en uppmaning, eftersom knapparna längre ned står för handlingen."
                >
                  <p className="font-medium text-sm">Pris enligt offert</p>
                </Copy>
              ) : (
                <>
                  <p className="text-xs text-ink-muted">{p.pris.typ === "fran" ? "Från" : "Pris"}</p>
                  <Copy
                    label="Belopp på prisetiketten"
                    category="metadata"
                    text={`${p.pris.belopp} ${p.pris.enhet}`}
                    rationale="Beloppet står störst och enheten bredvid, till exempel kr inkl. installation. Ordet Från ovanför används bara när slutpriset kan bli högre, så att kunden inte blir överraskad."
                  >
                    <p className="text-h3 font-medium leading-none">{p.pris.belopp} <span className="text-xs text-ink-muted">{p.pris.enhet}</span></p>
                  </Copy>
                </>
              )}
            </div>
            </Annotation>
            {/* Kategorietikett, döljs när modulen ligger i en produktsida (kategorin står redan i sidans hero) */}
            {!inline && (
              <div className="absolute top-4 left-4">
                <span className="bg-brand-primary text-white text-xs font-medium px-3 py-1 rounded-full">{p.kategori}</span>
              </div>
            )}
          </div>

          {/* Informationsyta */}
          <div className="p-5 sm:p-6">
            {/* Namn och nyttomening döljs när modulen ligger i en produktsida (de står redan i sidans hero) */}
            {!inline && (
              <>
                <h2 className="text-h2 mb-1">{p.namn}</h2>
                <p className="text-ink-secondary mb-4">{p.tagline}</p>
              </>
            )}

            {/* Ruta: Passar för */}
            <Annotation
              label="Passar för"
              audience="redaktör"
              rationale="En mening som beskriver vem produkten är till för, så att kunden snabbt kan känna igen sig. Börja med Dig som eller Villaägare som, och beskriv kundens situation och inte produktens egenskaper."
            >
            <div className="rounded-md bg-tint-info px-4 py-3 mb-5 text-sm">
              <Copy
                label="Passar för, etikett"
                category="ton"
                text="Passar för: "
                rationale="Två ord som låter kunden pröva sig själv mot beskrivningen: är det här för mig? Tydligare och mer personligt än Målgrupp eller Rekommenderas för."
              >
                <span className="font-medium">Passar för: </span>
              </Copy>
              <span className="text-ink-secondary">{p.passarFor}</span>
            </div>
            </Annotation>

            <p className="text-sm text-ink-secondary mb-5 leading-relaxed">{p.beskrivning}</p>

            <Annotation
              label="Knappar: köp och fråga"
              audience="user"
              rationale="Två vägar vidare. Den som är redo köper eller bokar direkt, den som är osäker kan ställa en fråga i stället för att lämna sidan. Huvudknappen är tydligast så att valet blir enkelt."
            >
            <div className="flex flex-col sm:flex-row gap-3">
              <Copy
                label="Huvudknapp"
                category="cta"
                text={p.cta.label}
                rationale="Verb plus produktnamn, till exempel Beställ Ladda Smart eller Boka rådgivning. Kunden vet exakt vad som händer vid klick. Undvik Läs mer, Skicka och Gå vidare."
              >
                <button
                  type="button"
                  className="flex-1 bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity"
                >
                  {p.cta.label}
                </button>
              </Copy>
              <Copy
                label="Sekundär knapp"
                category="cta"
                text="Ställ en fråga"
                rationale="Ett lågt steg för den som inte är redo att köpa. Verb plus objekt som säger vad kunden gör. Kontakta oss låter mer formellt och säger inte att det går bra att bara fråga."
              >
                <button
                  type="button"
                  className="flex-1 border border-border-strong text-ink-secondary font-medium py-3 rounded hover:bg-tint-info transition-colors"
                >
                  Ställ en fråga
                </button>
              </Copy>
            </div>
            </Annotation>
            <Copy
              label="Trygghetsrad under knapparna"
              category="reassurance"
              text={trygghetsrad}
              rationale="Svarar på frågan kunden har precis innan klicket: hur lång tid tar det, vad behöver jag och kostar det något. Raden ändras efter om knappen leder till köp, offert eller kontakt."
            >
              <p className="text-xs text-ink-muted text-center mt-2">{trygghetsrad}</p>
            </Copy>
          </div>
        </div>
      </Annotation>

      {/* Flikar med detaljer */}
      <Annotation
        label="Flikar med detaljer"
        audience="design"
        rationale="Detaljerna ligger i tre flikar i stället för tre listor efter varandra. Sidan blir kortare och kunden väljer själv vad hen vill läsa om, utan att behöva scrolla förbi resten."
      >
        <div className="border border-border-subtle rounded-md overflow-hidden">
          <div className="flex border-b border-border-subtle" role="tablist">
            {tabs.map((t, idx) =>
              idx === 0 ? (
                <Copy
                  key={t.id}
                  label="Fliknamn"
                  category="rubrik"
                  text={t.label}
                  rationale="Fliknamnen är korta och säger vad kunden hittar: Vad ingår, Villkor och Varför följt av produktnamnet. Undvik interna ord som Specifikation eller Produktinformation."
                >
                  {renderTab(t)}
                </Copy>
              ) : (
                renderTab(t)
              ),
            )}
          </div>
          <Annotation
            label="Flikens innehåll"
            audience="redaktör"
            rationale="Listorna hämtas från produktens grunddata: vad som ingår, villkor och fördelar. Skriv 2-5 korta punkter per flik. Varje punkt ska kunna läsas för sig, eftersom kunden bara ser en flik i taget."
          >
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
          </Annotation>
        </div>
      </Annotation>
    </div>
  );
}
