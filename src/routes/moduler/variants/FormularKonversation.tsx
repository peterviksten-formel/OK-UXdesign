import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C — Konversations-form (Typeform-stil)
 *
 * En fråga per "skärm". Stor input, stor knapp. Känns som en chatt/wizard.
 * Minskar upplevd ansträngning och avhopp, men tar längre tid för power-users.
 *
 * Pro: Hög completion rate. Mindre överväldigande för ovana användare.
 * Kontra: Långsamt för power users. Kräver validering per steg.
 */
type Steg = {
  id: string;
  fraga: string;
  hjalp?: string;
  typ: "text" | "val" | "nummer" | "bekrafta";
  placeholder?: string;
  alternativ?: string[];
};

const STEG: Steg[] = [
  { id: "bostad", fraga: "Vad bor du i?", typ: "val", alternativ: ["Lägenhet", "Villa", "Radhus", "Fritidshus"] },
  { id: "storlek", fraga: "Hur stor är bostaden?", hjalp: "Ungefär räcker. Vi använder det för att uppskatta kostnaden.", typ: "val", alternativ: ["< 50 m²", "50–100 m²", "100–150 m²", "> 150 m²"] },
  { id: "namn", fraga: "Vad heter du?", typ: "text", placeholder: "Förnamn Efternamn" },
  { id: "adress", fraga: "Vilken adress gäller det?", typ: "text", placeholder: "Gatuadress" },
  { id: "postnr", fraga: "Postnummer", typ: "nummer", placeholder: "252 25" },
  { id: "personnr", fraga: "Ditt personnummer", hjalp: "Vi använder det för kreditupplysning och avtalsidentifiering. Hanteras enligt GDPR.", typ: "text", placeholder: "ÅÅÅÅMMDD-XXXX" },
  { id: "epost", fraga: "Din e-post", typ: "text", placeholder: "namn@exempel.se" },
  { id: "bekrafta", fraga: "Klart att teckna?", hjalp: "Vi skickar en bekräftelse till din e-post. 14 dagars ångerrätt.", typ: "bekrafta" },
];

export function FormularKonversation() {
  const [stegIndex, setStegIndex] = useState(0);
  const [svar, setSvar] = useState<Record<string, string>>({});
  const aktiv = STEG[stegIndex];
  const sista = stegIndex === STEG.length - 1;
  const klar = stegIndex >= STEG.length;

  function svara(varde: string) {
    setSvar({ ...svar, [aktiv.id]: varde });
    if (stegIndex < STEG.length) setStegIndex(stegIndex + 1);
  }

  function tillbaka() {
    if (stegIndex > 0) setStegIndex(stegIndex - 1);
  }

  if (klar) {
    return (
      <div className="max-w-reading rounded-lg border-2 border-brand-accent bg-tint-info/40 p-8 text-center">
        <Icon name="check_circle" size={48} className="text-brand-accent mx-auto mb-3" />
        <h2 className="text-h2 mb-2">Klart! Vi har fått din beställning.</h2>
        <p className="text-ink-secondary mb-5">
          En bekräftelse skickas till <strong>{svar.epost || "[din e-post]"}</strong> inom en minut.
        </p>
        <button
          type="button"
          onClick={() => { setStegIndex(0); setSvar({}); }}
          className="text-sm text-brand-accent hover:underline"
        >
          Börja om demo
        </button>
      </div>
    );
  }

  return (
    <Annotation
      label="Konversations-form (Typeform-stil)"
      audience="design"
      rationale="En fråga per skärm. Stor input. Progress-indikator överst. Hjälp-text efter behov. Kräver validering per steg — felmeddelanden inline direkt under input. 'Tillbaka' alltid tillgängligt så användaren kan ändra svar."
    >
      <div className="max-w-reading">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
            <span>Steg {stegIndex + 1} av {STEG.length}</span>
            <span>{Math.round(((stegIndex + 1) / STEG.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-border-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-accent transition-all duration-300"
              style={{ width: `${((stegIndex + 1) / STEG.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <p className="text-eyebrow uppercase text-ink-muted mb-2">Fråga {stegIndex + 1}</p>
        <h2 className="text-h2 mb-3">{aktiv.fraga}</h2>
        {aktiv.hjalp && (
          <p className="text-sm text-ink-secondary mb-5 max-w-reading leading-relaxed">
            {aktiv.hjalp}
          </p>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const input = form.elements.namedItem("svar") as HTMLInputElement;
            if (input?.value) svara(input.value);
          }}
          className="space-y-3"
        >
          {aktiv.typ === "val" && aktiv.alternativ && (
            <div className="grid grid-cols-2 gap-3">
              {aktiv.alternativ.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => svara(a)}
                  className="group px-5 py-4 border-2 border-border-subtle bg-surface rounded-md text-left font-medium hover:border-brand-accent hover:bg-tint-info transition-all"
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-tint-info text-brand-primary text-xs font-bold mr-3 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    {a.charAt(0).toUpperCase()}
                  </span>
                  {a}
                </button>
              ))}
            </div>
          )}

          {(aktiv.typ === "text" || aktiv.typ === "nummer") && (
            <div className="flex gap-3">
              <input
                name="svar"
                type={aktiv.typ === "nummer" ? "tel" : "text"}
                defaultValue={svar[aktiv.id] ?? ""}
                placeholder={aktiv.placeholder}
                autoFocus
                className="flex-1 border-2 border-border-strong rounded-md px-4 py-3 text-lg bg-surface focus:border-brand-accent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-brand-primary text-ink-onbrand font-medium px-5 rounded hover:opacity-90 inline-flex items-center gap-2"
              >
                {sista ? "Skicka" : "OK"}
                <Icon name="arrow_forward" size={18} />
              </button>
            </div>
          )}

          {aktiv.typ === "bekrafta" && (
            <button
              type="button"
              onClick={() => svara("bekraftat")}
              className="w-full bg-brand-primary text-ink-onbrand font-medium px-5 py-4 rounded hover:opacity-90 inline-flex items-center justify-center gap-2 text-lg"
            >
              Teckna avtal
              <Icon name="arrow_forward" size={20} />
            </button>
          )}
        </form>

        {/* Back */}
        {stegIndex > 0 && (
          <button
            type="button"
            onClick={tillbaka}
            className="text-sm text-ink-muted hover:text-brand-accent inline-flex items-center gap-1 mt-6"
          >
            <Icon name="arrow_back" size={14} />
            Gå tillbaka
          </button>
        )}
      </div>
    </Annotation>
  );
}
