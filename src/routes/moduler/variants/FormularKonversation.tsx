import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C, Konversation (en fråga i taget)
 *
 * Idé: kunden får en fråga per skärm med stora svarsknappar och stora fält,
 * ungefär som ett samtal. Det känns mindre som att fylla i ett formulär och
 * mer som att svara på frågor.
 *
 * Fördel: färre avhopp bland ovana användare. Mindre överväldigande.
 * Nackdel: långsammare för den som vill se allt och fylla i snabbt.
 * Varje svar måste kontrolleras innan kunden går vidare.
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
  { id: "storlek", fraga: "Hur stor är bostaden?", hjalp: "Det räcker med ungefär. Vi använder det för att räkna ut vad det kostar.", typ: "val", alternativ: ["Under 50 m²", "50-100 m²", "100-150 m²", "Över 150 m²"] },
  { id: "namn", fraga: "Vad heter du?", typ: "text", placeholder: "t.ex. Anna Andersson" },
  { id: "adress", fraga: "Vilken adress gäller det?", typ: "text", placeholder: "t.ex. Storgatan 12" },
  { id: "postnr", fraga: "Vilket postnummer har adressen?", typ: "nummer", placeholder: "t.ex. 252 25" },
  { id: "personnr", fraga: "Vad är ditt personnummer?", hjalp: "Vi behöver det för kreditupplysningen och för att koppla avtalet till dig. Vi hanterar det enligt GDPR.", typ: "text", placeholder: "ÅÅÅÅMMDD-XXXX" },
  { id: "epost", fraga: "Vilken e-postadress vill du använda?", hjalp: "Hit skickar vi bekräftelsen.", typ: "text", placeholder: "t.ex. anna@exempel.se" },
  { id: "bekrafta", fraga: "Vill du teckna avtalet?", hjalp: "Du får en bekräftelse via e-post och har 14 dagars ångerrätt.", typ: "bekrafta" },
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
      <Annotation
        label="Kvitto efter beställning"
        audience="user"
        rationale="Kunden får direkt ett tydligt besked om att beställningen har kommit fram och var bekräftelsen hamnar. Det tar bort oron för att något gick fel."
      >
        <div className="max-w-reading rounded-lg border-2 border-brand-accent bg-tint-info/40 p-8 text-center">
          <Icon name="check_circle" size={48} className="text-brand-accent mx-auto mb-3" />
          <Copy
            label="Kvitto, rubrik"
            category="rubrik"
            text="Tack! Vi har tagit emot din beställning."
            rationale="Bekräftar det viktigaste först: beställningen är mottagen. 'Tagit emot' är tydligare än 'fått'. Undvik tekniska ord som 'skickad' eller 'registrerad'."
          >
            <h2 className="text-h2 mb-2">Tack! Vi har tagit emot din beställning.</h2>
          </Copy>
          <Copy
            label="Kvitto, bekräftelse via e-post"
            category="reassurance"
            text={`Vi skickar en bekräftelse till ${svar.epost || "din e-postadress"} inom en minut.`}
            rationale="Visar adressen kunden angav, så att hen kan upptäcka ett stavfel direkt. 'Vi skickar' i aktiv form säger vem som gör vad och när."
          >
            <p className="text-ink-secondary mb-5">
              Vi skickar en bekräftelse till <strong>{svar.epost || "din e-postadress"}</strong> inom en minut.
            </p>
          </Copy>
          <button
            type="button"
            onClick={() => { setStegIndex(0); setSvar({}); }}
            className="text-sm text-brand-accent hover:underline"
          >
            Starta om demon
          </button>
        </div>
      </Annotation>
    );
  }

  return (
    <Annotation
      label="Konversationsformulär"
      audience="design"
      rationale="En fråga per skärm med stora fält och knappar och en förloppsmätare överst. Varje svar kontrolleras innan kunden går vidare, och felmeddelandet ska stå direkt under fältet. Kunden kan alltid gå tillbaka och ändra ett svar."
    >
      <div className="max-w-reading">
        {/* Förlopp */}
        <Annotation
          label="Förloppsmätare"
          audience="user"
          rationale="Visar hur många frågor som är kvar. När kunden ser att slutet närmar sig minskar risken att hen hoppar av halvvägs."
        >
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
              <Copy
                label="Förlopp, steg av totalt"
                category="metadata"
                text={`Steg ${stegIndex + 1} av ${STEG.length}`}
                rationale="'Steg 3 av 8' är konkret och går att räkna med. Procenten bredvid är ett komplement, inte en ersättning."
              >
                <span>Steg {stegIndex + 1} av {STEG.length}</span>
              </Copy>
              <span>{Math.round(((stegIndex + 1) / STEG.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-border-subtle rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-accent transition-all duration-300"
                style={{ width: `${((stegIndex + 1) / STEG.length) * 100}%` }}
              />
            </div>
          </div>
        </Annotation>

        {/* Fråga */}
        <p className="text-eyebrow uppercase text-ink-muted mb-2">Fråga {stegIndex + 1}</p>
        <Copy
          label="Frågan"
          category="ton"
          text={aktiv.fraga}
          rationale="Varje steg är en hel fråga i du-form ('Vad heter du?'), inte en fältetikett ('Namn'). Det är det som gör att flödet känns som ett samtal. Undvik formella ord som 'Ange' eller 'Uppge'."
        >
          <h2 className="text-h2 mb-3">{aktiv.fraga}</h2>
        </Copy>
        {aktiv.hjalp && (
          <Copy
            label="Hjälptext under frågan"
            category="reassurance"
            text={aktiv.hjalp}
            rationale="Hjälptext visas bara där kunden kan tveka, till exempel om varför vi frågar efter personnummer. En eller två korta meningar som svarar på 'varför behöver ni det?'."
          >
            <p className="text-sm text-ink-secondary mb-5 max-w-reading leading-relaxed">
              {aktiv.hjalp}
            </p>
          </Copy>
        )}

        {/* Svar */}
        <Annotation
          label="Svarsalternativ och fält"
          audience="redaktör"
          rationale="Skriv svarsalternativen kort och ömsesidigt uteslutande, högst fyra per fråga. Skriv exempel i fälten ('t.ex. Anna Andersson'), inte instruktioner. Hjälptext lägger du bara till där kunden kan undra varför vi frågar."
        >
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
                <Copy
                  label="Knapp, gå till nästa fråga"
                  category="cta"
                  text={sista ? "Skicka" : "Fortsätt"}
                  rationale="'Fortsätt' säger vad som händer: kunden kommer till nästa fråga. 'OK' bekräftar bara och säger ingenting om nästa steg."
                >
                  <button
                    type="submit"
                    className="bg-brand-primary text-ink-onbrand font-medium px-5 rounded hover:opacity-90 inline-flex items-center gap-2"
                  >
                    {sista ? "Skicka" : "Fortsätt"}
                    <Icon name="arrow_forward" size={18} />
                  </button>
                </Copy>
              </div>
            )}

            {aktiv.typ === "bekrafta" && (
              <Copy
                label="Knapp, teckna avtal"
                category="cta"
                text="Teckna avtal"
                rationale="Verb plus objekt som säger exakt vad kunden gör: ingår ett avtal. Tydligare och ärligare än 'Skicka' eller 'Klar'."
              >
                <button
                  type="button"
                  onClick={() => svara("bekraftat")}
                  className="w-full bg-brand-primary text-ink-onbrand font-medium px-5 py-4 rounded hover:opacity-90 inline-flex items-center justify-center gap-2 text-lg"
                >
                  Teckna avtal
                  <Icon name="arrow_forward" size={20} />
                </button>
              </Copy>
            )}
          </form>
        </Annotation>

        {/* Tillbaka */}
        {stegIndex > 0 && (
          <Copy
            label="Tillbaka till förra frågan"
            category="cta"
            text="Ändra förra svaret"
            rationale="Säger varför man går tillbaka: för att ändra ett svar. Det lugnar kunden att inget är låst förrän avtalet är tecknat."
          >
            <button
              type="button"
              onClick={tillbaka}
              className="text-sm text-ink-muted hover:text-brand-accent inline-flex items-center gap-1 mt-6"
            >
              <Icon name="arrow_back" size={14} />
              Ändra förra svaret
            </button>
          </Copy>
        )}
      </div>
    </Annotation>
  );
}
