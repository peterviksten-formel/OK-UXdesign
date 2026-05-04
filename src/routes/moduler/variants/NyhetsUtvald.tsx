import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Utvald + 2 små
 *
 * Hierarkisk. En stor, två små. Redaktören kan lyfta en nyhet när det
 * är tidskritiskt (prisförändring, kampanj, avbrott-uppföljning).
 *
 * Pro: Låter redaktören prioritera. Mer visuellt intressant.
 * Kontra: Risk att den utvalda inte byts ut ofta nog.
 */
export function NyhetsUtvald() {
  return (
    <Annotation
      label="Nyhets-utvald + 2 små"
      audience="redaktör"
      rationale="Asymmetrisk layout. Den utvalda artikeln får 2/3 bredd och större bild; de två mindre staplas i sidokolumnen. Signalerar 'denna är viktig idag'. Redaktören behöver riktlinjer för när man byter utvald."
    >
      <section>
        <h2 className="text-h3 font-medium mb-6">Senaste nytt om el</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <a href="#" className="group md:col-span-2 block rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent">
            <div className="bg-tint-info aspect-[21/9] flex items-center justify-center text-ink-muted">
              <Icon name="image" size={56} />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2 text-xs text-ink-muted">
                <time dateTime="2026-04-15">2026-04-15</time>
                <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">Marknad</span>
                <span className="ml-auto text-[10px] uppercase tracking-wider font-bold text-brand-highlight">Utvald</span>
              </div>
              <h3 className="text-h4 font-medium group-hover:text-brand-accent leading-snug">
                Elpriset sjunker inför sommaren, vad betyder det för dig?
              </h3>
              <p className="text-sm text-ink-secondary mt-2 leading-relaxed">
                Spotpriset har varit lågt hela mars och prognosen pekar mot en fortsatt mild sommar.
                Vi reder ut vad det innebär om du har rörligt eller fast avtal.
              </p>
            </div>
          </a>
          <div className="space-y-3">
            {[
              { datum: "2026-04-08", tag: "Tjänster", rubrik: "Följ din förbrukning i realtid" },
              { datum: "2026-03-28", tag: "Hållbarhet", rubrik: "Framtidspengen finansierade 3 nya laddstationer" },
            ].map((n) => (
              <a key={n.rubrik} href="#" className="group block p-3 rounded-md border border-border-subtle bg-surface hover:border-brand-accent">
                <div className="flex items-center gap-2 mb-1 text-xs text-ink-muted">
                  <time dateTime={n.datum}>{n.datum}</time>
                  <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">{n.tag}</span>
                </div>
                <h3 className="text-sm font-medium group-hover:text-brand-accent leading-snug">{n.rubrik}</h3>
              </a>
            ))}
          </div>
        </div>
        <a href="#" className="text-sm text-brand-accent hover:underline">Visa alla nyheter om el →</a>
      </section>
    </Annotation>
  );
}
