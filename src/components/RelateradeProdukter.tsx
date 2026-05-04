import { Link } from "react-router-dom";
import { Annotation } from "./Annotation";
import { Copy } from "./Copy";
import { Icon } from "./Icon";

/**
 * Modul: Relaterade produkter / tjänster
 *
 * Synergi-curering, inte alternativ. Ligger sist på produktsidor (efter
 * FAQ) som "vägar vidare", inte för att konkurrera med primary CTA.
 *
 * Designval:
 *  - Små ikon-kort (ingen produktbild, inget pris), signalerar "länk
 *    vidare", inte "ny produktsida".
 *  - 3 kort i grid på desktop, stack på mobil.
 *  - Synergi-tone i copy: "produkten du tittar på + det här =
 *    bättre", inte "andra köpte också".
 */

export type RelateradProdukt = {
  ikon: string;
  titel: string;
  /** En kort mening som beskriver synergin med huvudprodukten. */
  text: string;
  /** Länk till relaterad produktsida eller stub. Använd "#" för icke-byggda. */
  href: string;
};

type Props = {
  /** Sektionsrubrik. Default "Komplettera med", synergi-frame. */
  rubrik?: string;
  produkter: RelateradProdukt[];
};

export function RelateradeProdukter({
  rubrik = "Komplettera med",
  produkter,
}: Props) {
  if (produkter.length === 0) return null;

  const isExternal = (href: string) =>
    href.startsWith("http") || href === "#" || href.startsWith("mailto:");

  return (
    <Annotation
      label="Relaterade produkter, synergi-curering"
      audience="design"
      rationale="Ligger efter FAQ (på direktköp efter formuläret, på leadsgen före lead-formet) som 'vägar vidare', inte för att konkurrera med primary CTA. Små ikon-kort utan pris och utan köp-CTA, signalerar 'klicka för att utforska', inte 'ny butikssida'. Curering är synergi (kompletterande), inte alternativ, frågar inte 'kanske vill du backa?' utan 'tillsammans med detta blir det bättre'."
    >
      <section className="py-10 border-t border-border-subtle">
        <Copy
          label="Relaterade, rubrik"
          category="rubrik"
          text={rubrik}
          rationale="'Komplettera med' är synergi-frame, den säger 'du har en grund, lägg till'. Undviker e-com-floskeln 'Andra köpte också' (som passar dåligt för utility-bolag) och alternativ-tone 'Vill du jämföra?' (som triggar tvivel inför primary CTA)."
        >
          <h2 className="text-h3 font-medium mb-2">{rubrik}</h2>
        </Copy>
        <p className="text-ink-secondary mb-6 max-w-reading">
          Andra produkter och tjänster som ofta passar ihop.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {produkter.map((p) => {
            const cardClass =
              "group flex flex-col p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all";
            const cardContent = (
              <>
                <Icon
                  name={p.ikon}
                  size={32}
                  className="text-brand-accent mb-3"
                />
                <h3 className="font-medium mb-1.5 group-hover:text-brand-accent">
                  {p.titel}
                </h3>
                <p className="text-sm text-ink-secondary leading-snug flex-1 mb-3">
                  {p.text}
                </p>
                <span className="text-sm text-brand-accent inline-flex items-center gap-1.5 font-medium">
                  Läs mer
                  <Icon name="arrow_forward" size={14} />
                </span>
              </>
            );

            return isExternal(p.href) ? (
              <a key={p.titel} href={p.href} className={cardClass}>
                {cardContent}
              </a>
            ) : (
              <Link key={p.titel} to={p.href} className={cardClass}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>
    </Annotation>
  );
}
