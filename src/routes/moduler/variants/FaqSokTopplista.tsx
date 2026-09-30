import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C, Sök och topplista
 *
 * För stora samlingar av frågor. Överst ett sökfält som filtrerar
 * frågorna medan besökaren skriver. Under det en lista, "Just nu frågar
 * många om", som redaktören väljer ut. Listan visar att sidan hålls aktuell.
 *
 * Fördel: fungerar med 50 frågor eller fler. Känns uppdaterad.
 * Nackdel: kräver en stor samling frågor. Känns övergiven om topplistan sällan byts ut.
 */
const ALL_Q = [
  "Vad händer om jag inte väljer avtal?",
  "Vilket elavtal passar mig bäst?",
  "Varför är min faktura högre än vanligt?",
  "Hur säger jag upp mitt avtal?",
  "Hur rapporterar jag mätarställning?",
  "Vad är skillnaden mellan elnät och elhandel?",
  "Vad är bindningstid?",
  "Hur snabbt börjar avtalet gälla?",
];

export function FaqSokTopplista() {
  const [q, setQ] = useState("");
  const filtered = q.length >= 2 ? ALL_Q.filter((x) => x.toLowerCase().includes(q.toLowerCase())) : null;
  return (
    <Annotation
      label="FAQ med sök och topplista"
      audience="design"
      rationale="Den som vet vad den letar efter söker, den som inte vet tittar i topplistan. Resultaten visas medan besökaren skriver, och hittas inget finns alltid en väg vidare till kundservice."
    >
      <section className="max-w-reading">
        <Copy
          label="Rubrik för FAQ-blocket"
          category="rubrik"
          text="Vanliga frågor"
          rationale="Samma rubrik som i de andra varianterna, så att besökaren känner igen blocket. Undvik 'Hjälpcenter' eller 'Kunskapsbank', som låter som ett system snarare än svar."
        >
          <h2 className="text-h3 font-medium mb-2">Vanliga frågor</h2>
        </Copy>
        <Copy
          label="Ingress, två sätt att hitta"
          category="rubrik"
          text={`Sök bland ${ALL_Q.length}+ frågor eller se vad andra undrar över just nu.`}
          rationale="Säger vad besökaren kan göra här, med två tydliga vägar. Antalet frågor visar att det lönar sig att söka. Undvik 'Här hittar du svar på det mesta', som lovar för mycket."
        >
          <p className="text-ink-secondary mb-6">
            Sök bland {ALL_Q.length}+ frågor eller se vad andra undrar över just nu.
          </p>
        </Copy>

        <Annotation
          label="Sökfält med direkta träffar"
          audience="user"
          rationale="Träffarna visas redan efter två bokstäver, så besökaren behöver inte trycka på någon knapp. Antalet träffar står överst så att det syns direkt om sökningen gav något."
        >
        <div>
        <form onSubmit={(e) => e.preventDefault()} role="search" className="mb-6">
          <label htmlFor="faq-sok" className="sr-only">Sök bland frågor</label>
          <div className="relative">
            <Icon
              name="search"
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
            />
            <Copy
              label="Platshållartext i sökfältet"
              category="faq"
              text="Till exempel mätarställning"
              rationale="Ett konkret exempel på ett ord kunder faktiskt söker på visar hur man söker. Fältets namn läses upp för skärmläsare separat, så platshållaren behöver inte säga 'Sök'."
            >
            <input
              id="faq-sok"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Till exempel mätarställning"
              className="w-full border border-border-strong rounded-md pl-10 pr-4 py-3 bg-surface text-base focus:border-brand-accent focus:outline-none"
            />
            </Copy>
          </div>
        </form>

        {filtered ? (
          filtered.length > 0 ? (
            <div>
              <Copy
                label="Antal träffar"
                category="metadata"
                text={`${filtered.length} träff${filtered.length === 1 ? "" : "ar"}`}
                rationale="Kort besked om hur många frågor som matchar. Rätt böjning, '1 träff' och '3 träffar', gör att texten känns skriven och inte automatisk."
              >
                <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                  {filtered.length} träff{filtered.length === 1 ? "" : "ar"}
                </p>
              </Copy>
              <ul className="divide-y divide-border-subtle rounded-md border border-border-subtle bg-surface">
                {filtered.map((f) => (
                  <li key={f}>
                    <a href="#" className="group flex items-center justify-between px-4 py-3 hover:bg-tint-info">
                      <span className="font-medium text-sm">{f}</span>
                      <Icon name="arrow_forward" size={16} className="text-ink-muted group-hover:text-brand-accent" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Copy
              label="Inga träffar"
              category="faq"
              text={`Vi hittade inget om "${q}". Prova ett annat ord eller kontakta kundservice.`}
              rationale="Tar ansvar ('Vi hittade inget') i stället för att lägga felet på besökaren. Upprepar sökordet så att det går att se om det blev fel. Ger två vägar vidare, så att besökaren aldrig lämnas utan hjälp."
            >
              <div className="rounded-md border border-border-subtle bg-surface p-5 text-sm text-ink-secondary">
                Vi hittade inget om "<strong>{q}</strong>". Prova ett annat ord eller{" "}
                <a href="#" className="text-brand-accent underline underline-offset-2">kontakta kundservice</a>.
              </div>
            </Copy>
          )
        ) : (
          <div>
            <Copy
              label="Rubrik för topplistan"
              category="rubrik"
              text="Just nu frågar många om"
              rationale="'Just nu' visar att listan är aktuell och 'många' att besökaren inte är ensam om frågan. Undvik 'Populära frågor', som låter statiskt."
            >
              <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                Just nu frågar många om
              </p>
            </Copy>
            <Annotation
              label="Topplistan"
              audience="redaktör"
              rationale="Välj de fem frågor kundservice får flest av just nu och se över listan varje eller varannan vecka. Byt snabbt vid händelser som höga elpriser eller större avbrott."
            >
            <ul className="divide-y divide-border-subtle rounded-md border border-border-subtle bg-surface">
              {ALL_Q.slice(0, 5).map((f, i) => (
                <li key={f}>
                  <a href="#" className="group flex items-center gap-3 px-4 py-3 hover:bg-tint-info">
                    <span className="text-xs font-bold text-ink-muted w-4">{i + 1}</span>
                    <span className="font-medium text-sm flex-1">{f}</span>
                    <Icon name="arrow_forward" size={16} className="text-ink-muted group-hover:text-brand-accent" />
                  </a>
                </li>
              ))}
            </ul>
            </Annotation>
          </div>
        )}
        </div>
        </Annotation>
      </section>
    </Annotation>
  );
}
