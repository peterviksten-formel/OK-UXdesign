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
  /** Sektionsrubrik. Standard är "Komplettera med" (produkter som passar ihop). */
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
      label="Relaterade produkter"
      audience="design"
      rationale="Visar produkter som kompletterar det kunden redan tittar på, som en väg vidare efter FAQ. Små kort utan pris och köpknapp, så att de inte tävlar med sidans huvudsakliga CTA. Välj produkter som passar ihop, inte alternativ som får kunden att tveka."
    >
      <section className="py-10 border-t border-border-subtle">
        <Copy
          label="Relaterade produkter, rubrik"
          category="rubrik"
          text={rubrik}
          rationale="'Komplettera med' säger att kunden bygger vidare på det hen redan valt. Undvik e-handelsfrasen 'Andra köpte också', som passar dåligt för ett energibolag, och 'Vill du jämföra?', som väcker tvivel inför huvudvalet."
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
