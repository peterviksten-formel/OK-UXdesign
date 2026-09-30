import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";
import { KATEGORIER, type KategoriId, type Underkategori } from "../kundservice-data";

/**
 * VARIANT C, Samtal
 *
 * Frågorna ställs som i en chatt, men det finns ingen chattrobot: alla svar
 * är färdigskrivna. Kunden skriver ett ord eller klickar sig fram steg för
 * steg, och varje val visas som en egen bubbla. Sista steget ger svaret
 * direkt i sidan, utan ny sida eller popupfönster. Kunden hänvisas till en
 * person bara när det verkligen behövs.
 */
export function KundserviceExperimentell() {
  const [step, setStep] = useState<"start" | "kategori" | "under" | "svar">("start");
  const [query, setQuery] = useState("");
  const [valKategori, setValKategori] = useState<KategoriId | null>(null);
  const [valUnder, setValUnder] = useState<Underkategori | null>(null);

  const kategori = valKategori ? KATEGORIER.find((k) => k.id === valKategori) : null;

  // Enkel sökning: matchar ordet mot ämnen, beskrivningar och frågor
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
      {/* Samtalet, steg för steg */}
      <Annotation
        label="Samtal i steg"
        audience="design"
        rationale="Varje val lägger till en ny bubbla, som i en chatt. Kunden ser hela sin väg och kan börja om. Känns personligt, men svaren är färdigskrivna, så det finns ingen risk för felaktiga svar från en chattrobot."
      >
        <div className="space-y-4">
          {/* Steg 1: hälsning, sökfält och ämnen */}
          <Annotation
            label="Hälsning och sökfält"
            audience="user"
            rationale="Samtalet börjar med en öppen fråga. Kunden kan skriva ett eget ord eller välja ett ämne direkt, beroende på vad som går snabbast."
          >
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white grid place-items-center text-sm font-bold flex-shrink-0">
              Ö
            </div>
            <div className="flex-1">
              <div className="rounded-lg rounded-tl-none bg-tint-info p-4">
                <Copy
                  label="Hälsning"
                  category="ton"
                  text="Hej! Vad kan vi hjälpa dig med?"
                  rationale="Vänlig och öppen fråga som i ett samtal. Undvik att låta som en person, till exempel 'Jag heter Anna', eftersom ingen människa svarar."
                >
                  <p className="font-medium mb-2">Hej! Vad kan vi hjälpa dig med?</p>
                </Copy>
                <Copy
                  label="Instruktion under hälsningen"
                  category="rubrik"
                  text="Skriv ett ord eller välj ett ämne nedan."
                  rationale="Visar de två sätten att gå vidare i en kort mening. 'Ämne' används i alla varianter i stället för 'kategori'."
                >
                  <p className="text-sm text-ink-secondary mb-3">
                    Skriv ett ord eller välj ett ämne nedan.
                  </p>
                </Copy>
                <Copy
                  label="Exempel i sökfältet"
                  category="metadata"
                  text="Till exempel faktura, flytta eller strömavbrott"
                  rationale="Exemplen visar att ett enda vardagligt ord räcker. Exemplen är några av de vanligaste ärendena. Skriv inte 'Sök här', det säger inget om vad man kan söka på."
                >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); if (step !== "start") reset(); }}
                  placeholder="Till exempel faktura, flytta eller strömavbrott"
                  className="w-full px-3 py-2 rounded border border-border-strong bg-canvas text-sm placeholder:text-ink-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus"
                  aria-label="Sök bland ämnen"
                />
                </Copy>

                {/* Sökträffar */}
                {query.length >= 2 && matchingKategorier.length > 0 && step === "start" && (
                  <div className="mt-3 space-y-1">
                    {matchingKategorier.map((k) => (
                      <button
                        key={k.id}
                        type="button"
                        onClick={() => pickKategori(k.id)}
                        className="w-full text-left px-3 py-2 rounded hover:bg-surface text-sm flex items-center gap-2"
                      >
                        <Icon name={k.ikon} size={16} className="text-brand-accent" />
                        <span className="font-medium">{k.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Inga sökträffar */}
                {query.length >= 2 && matchingKategorier.length === 0 && step === "start" && (
                  <Copy
                    label="Inga sökträffar"
                    category="reassurance"
                    text={`Vi hittade inget om "${query}". Prova ett annat ord eller töm fältet för att se alla ämnen. Du kan också chatta med oss vardagar 08-17.`}
                    rationale="Kunden får aldrig en återvändsgränd. Meddelandet säger vad som hände, vad kunden kan göra och att chatten finns. Skriv inte 'Inga resultat', det hjälper inte kunden vidare."
                  >
                    <p className="mt-3 text-sm text-ink-secondary">
                      Vi hittade inget om "{query}". Prova ett annat ord eller töm fältet för att se alla ämnen. Du kan också{" "}
                      <a href="#" className="text-brand-accent underline underline-offset-2">chatta med oss</a> vardagar 08-17.
                    </p>
                  </Copy>
                )}

                {/* Ämnen att välja bland */}
                {(step === "start" && query.length < 2) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {KATEGORIER.map((k) => (
                      <button
                        key={k.id}
                        type="button"
                        onClick={() => pickKategori(k.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle bg-surface text-sm hover:border-brand-accent hover:bg-tint-info transition-colors"
                      >
                        <Icon name={k.ikon} size={14} className="text-brand-accent" />
                        {k.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          </Annotation>

          {/* Steg 2: kunden har valt ämne */}
          {valKategori && kategori && (
            <>
              {/* Kundens val */}
              <Annotation
                label="Kundens val som bubbla"
                audience="user"
                rationale="Det kunden valde visas som ett eget meddelande till höger. Kunden ser hela tiden vad hen har svarat och kan lätt se om något blev fel."
              >
              <div className="flex gap-3 justify-end">
                <div className="rounded-lg rounded-tr-none bg-brand-primary text-ink-onbrand px-4 py-2 text-sm flex items-center gap-2">
                  <Icon name={kategori.ikon} size={16} />
                  {kategori.label}
                </div>
              </div>
              </Annotation>

              {/* Följdfråga */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-white grid place-items-center text-sm font-bold flex-shrink-0">
                  Ö
                </div>
                <div className="flex-1">
                  <div className="rounded-lg rounded-tl-none bg-tint-info p-4">
                    <Copy
                      label="Följdfråga"
                      category="ton"
                      text={`Okej, ${kategori.label.toLowerCase()}. Vad gäller din fråga?`}
                      rationale="Upprepar ämnet så att kunden ser att valet gick fram, och ställer sedan nästa fråga. Kort och vardagligt, som i ett riktigt samtal."
                    >
                      <p className="font-medium mb-2">Okej, {kategori.label.toLowerCase()}. Vad gäller din fråga?</p>
                    </Copy>
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

          {/* Steg 3: kunden har valt fråga och får svar */}
          {valUnder && (
            <>
              {/* Kundens val */}
              <div className="flex gap-3 justify-end">
                <div className="rounded-lg rounded-tr-none bg-brand-primary text-ink-onbrand px-4 py-2 text-sm">
                  {valUnder.label}
                </div>
              </div>

              {/* Svaret */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-white grid place-items-center text-sm font-bold flex-shrink-0">
                  Ö
                </div>
                <div className="flex-1">
                  <Annotation
                    label="Svar med knapp"
                    audience="redaktör"
                    rationale="Svaret ska kunna läsas som ett meddelande: en eller två korta meningar i du-form och en knapp med verb + objekt. Varje fråga behöver ett eget svar."
                  >
                  <div className="rounded-lg rounded-tl-none bg-tint-notice p-4">
                    <p className="text-sm text-ink-secondary mb-3">{valUnder.action.description}</p>
                    {valUnder.action.type === "kontakt" && valUnder.action.tid && (
                      <Copy
                        label="Svarstid eller telefonnummer"
                        category="reassurance"
                        text={valUnder.action.tid}
                        rationale="Visar direkt vad som väntar: hur snabbt chatten svarar eller vilket nummer som gäller. Kunden behöver inte leta vidare."
                      >
                        <p className="text-xs text-ink-muted mb-3">{valUnder.action.tid}</p>
                      </Copy>
                    )}
                    <Copy
                      label="Knapp i svaret"
                      category="cta"
                      text={valUnder.action.label}
                      rationale="Knappen säger vad kunden gör, till exempel 'Anmäl inflyttning'. Undvik 'Läs mer' och 'Gå vidare', som inte säger vart knappen leder."
                    >
                    <a
                      href={valUnder.action.type === "link" ? valUnder.action.href : "#"}
                      className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand text-sm font-medium px-4 py-2.5 rounded hover:opacity-90 transition-opacity"
                    >
                      {valUnder.action.label} <span aria-hidden="true">→</span>
                    </a>
                    </Copy>
                  </div>
                  </Annotation>
                </div>
              </div>

              {/* Börja om */}
              <div className="pt-2 text-center">
                <Copy
                  label="Börja om"
                  category="cta"
                  text="Börja om med en ny fråga"
                  rationale="Säger både vad som händer och varför man vill klicka. Bättre än bara 'Återställ', som låter tekniskt."
                >
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm text-ink-muted hover:text-brand-accent underline underline-offset-2"
                >
                  Börja om med en ny fråga
                </button>
                </Copy>
              </div>
            </>
          )}
        </div>
      </Annotation>
    </div>
  );
}
