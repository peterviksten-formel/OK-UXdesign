import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C — Sök + topplista
 *
 * För stora FAQ-baser. Överst: sökfält som filtrerar live. Under:
 * "Just nu frågar många om…" — en redaktionellt kuraterad topplista
 * som ger socialt bevis att sidan är levande.
 *
 * Pro: Skalar till 50+ frågor. Känsla av att sidan är uppdaterad.
 * Kontra: Kräver content-bas. Risk för tomt intryck om topp-5 sällan uppdateras.
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
      label="FAQ Sök + topplista"
      audience="design"
      rationale="Sökfält + live-filter. Under: kuraterad topplista som ersätter 'bläddra-läget'. Placeholder i sökfältet berättar vad man kan göra. Tom-state för sökresultat: 'Hittar du inte svaret? Kontakta kundservice.'"
    >
      <section className="max-w-reading">
        <h2 className="text-h3 font-medium mb-2">Vanliga frågor</h2>
        <p className="text-ink-secondary mb-6">
          Sök bland {ALL_Q.length}+ frågor, eller se vad andra undrar över just nu.
        </p>

        <form onSubmit={(e) => e.preventDefault()} role="search" className="mb-6">
          <label htmlFor="faq-sok" className="sr-only">Sök bland frågor</label>
          <div className="relative">
            <Icon
              name="search"
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
            />
            <input
              id="faq-sok"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Sök — t.ex. 'mätarställning'"
              className="w-full border border-border-strong rounded-md pl-10 pr-4 py-3 bg-surface text-base focus:border-brand-accent focus:outline-none"
            />
          </div>
        </form>

        {filtered ? (
          filtered.length > 0 ? (
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                {filtered.length} träff{filtered.length === 1 ? "" : "ar"}
              </p>
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
            <div className="rounded-md border border-border-subtle bg-surface p-5 text-sm text-ink-secondary">
              Ingen träff på "<strong>{q}</strong>". Prova andra ord, eller{" "}
              <a href="#" className="text-brand-accent underline underline-offset-2">kontakta kundservice</a>.
            </div>
          )
        ) : (
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
              Just nu frågar många om
            </p>
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
          </div>
        )}
      </section>
    </Annotation>
  );
}
