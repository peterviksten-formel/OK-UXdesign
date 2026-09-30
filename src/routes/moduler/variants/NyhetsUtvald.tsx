import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Utvald nyhet
 *
 * En stor nyhet och två mindre. Redaktören kan lyfta en nyhet när den är
 * tidskritisk, till exempel en prisändring, en kampanj eller en uppföljning
 * efter ett avbrott.
 *
 * Fördel: redaktören kan prioritera. Mer levande att titta på.
 * Nackdel: risk att den utvalda nyheten står kvar för länge.
 */
export function NyhetsUtvald() {
  return (
    <Annotation
      label="Utvald nyhet och två mindre"
      audience="design"
      rationale="Den utvalda nyheten tar två tredjedelar av bredden och har större bild och en ingress. De två mindre står bredvid. Besökaren ser direkt vad som är viktigast just nu utan att missa resten."
    >
      <section>
        <Copy
          label="Blockrubrik"
          category="rubrik"
          text="Senaste nytt om el"
          rationale="Samma rubrik som i rutnätet, så att blocket känns igen oavsett form. Ämnet ändras efter sidan. Undvik bara 'Nyheter', som inte säger vilka."
        >
          <h2 className="text-h3 font-medium mb-6">Senaste nytt om el</h2>
        </Copy>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <Annotation
            label="Den utvalda nyheten"
            audience="redaktör"
            rationale="Välj en nyhet som är viktig för många just nu och byt den minst en gång i veckan. Skriv en ingress på högst två meningar som säger vad nyheten betyder för läsaren. Ta bort märket Utvald när nyheten inte längre är aktuell."
          >
            <a href="#" className="group md:col-span-2 block rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent">
              <div className="bg-tint-info aspect-[21/9] flex items-center justify-center text-ink-muted">
                <Icon name="image" size={56} />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 text-xs text-ink-muted">
                  <time dateTime="2026-04-15">2026-04-15</time>
                  <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">Marknad</span>
                  <Copy
                    label="Märket Utvald"
                    category="metadata"
                    text="Utvald"
                    rationale="Ett ord som förklarar varför nyheten är större än de andra. Undvik 'Viktigt' eller 'Nyhet!', som låter som en varning eller reklam."
                  >
                    <span className="ml-auto text-[10px] uppercase tracking-wider font-bold text-brand-highlight">Utvald</span>
                  </Copy>
                </div>
                <Copy
                  label="Rubrik för utvald nyhet"
                  category="rubrik"
                  text="Elpriset sjunker inför sommaren: så påverkas du"
                  rationale="Först nyheten, sedan löftet om vad den betyder för läsaren. Kolonet ersätter en fråga, så att rubriken blir ett påstående. Undvik frågor i rubriker, som tvingar läsaren att gissa svaret."
                >
                  <h3 className="text-h4 font-medium group-hover:text-brand-accent leading-snug">
                    Elpriset sjunker inför sommaren: så påverkas du
                  </h3>
                </Copy>
                <Copy
                  label="Ingress för utvald nyhet"
                  category="rubrik"
                  text="Spotpriset har varit lågt hela mars och prognosen pekar mot en fortsatt mild sommar. Vi förklarar vad det betyder för dig med rörligt eller fast avtal."
                  rationale="Första meningen säger vad som hänt, den andra vem som berörs. 'Vi förklarar' är vardagligare än 'Vi reder ut'. Nämn avtalsformerna så att läsaren direkt ser om texten gäller dem."
                >
                  <p className="text-sm text-ink-secondary mt-2 leading-relaxed">
                    Spotpriset har varit lågt hela mars och prognosen pekar mot en fortsatt mild sommar.
                    Vi förklarar vad det betyder för dig med rörligt eller fast avtal.
                  </p>
                </Copy>
              </div>
            </a>
          </Annotation>
          <Annotation
            label="Två mindre nyheter"
            audience="user"
            rationale="De två senaste nyheterna efter den utvalda står i en smal kolumn utan bild. Besökaren kan snabbt se vad mer som hänt utan att den utvalda nyheten tappar fokus."
          >
            <div className="space-y-3">
              {[
                { datum: "2026-04-08", tag: "Tjänster", rubrik: "Följ din elförbrukning i realtid" },
                { datum: "2026-03-28", tag: "Hållbarhet", rubrik: "Framtidspengen gav 3 nya laddstationer" },
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
          </Annotation>
        </div>
        <Copy
          label="Länk till alla nyheter"
          category="cta"
          text="Se alla nyheter om el →"
          rationale="Verb plus objekt och samma ämne som rubriken, så att besökaren vet vad listan innehåller. Undvik 'Visa fler' eller 'Arkiv', som inte säger vad man får se."
        >
          <a href="#" className="text-sm text-brand-accent hover:underline">Se alla nyheter om el →</a>
        </Copy>
      </section>
    </Annotation>
  );
}
