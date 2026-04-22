import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { IntentCardGrid, type IntentCardItem, type IntentCardVariant } from "../../components/IntentCardGrid";

// Modul-varianter — sidtyp-blocken komponerar modulens faktiska komponenter
// istället för att duplicera inline-JSX. När en variant ändras i en modul
// uppdateras den här sidan automatiskt.
import { HeroAction } from "../moduler/variants/HeroAction";
import { HeroBrand } from "../moduler/variants/HeroBrand";
import { HeroStatus } from "../moduler/variants/HeroStatus";
import { VariantTrygg } from "../moduler/variants/Trygg";
import { VariantProgressiv } from "../moduler/variants/Progressiv";
import { VariantExperimentell } from "../moduler/variants/Experimentell";
import { FaqAccordion } from "../moduler/variants/FaqAccordion";
import { FaqGrupperad } from "../moduler/variants/FaqGrupperad";
import { FaqSokTopplista } from "../moduler/variants/FaqSokTopplista";
import { NyhetsGrid } from "../moduler/variants/NyhetsGrid";
import { NyhetsUtvald } from "../moduler/variants/NyhetsUtvald";
import { NyhetsTidslinje } from "../moduler/variants/NyhetsTidslinje";

/**
 * SIDTYP 7 — Startsida undersida, UX-optimerad
 *
 * Refaktorerad till ren modul-variant-komposition: varje block som motsvarar
 * en modul renderar modulens faktiska variant-komponenter, inte duplicerad
 * inline-JSX. I edit-läget kan alla 3 varianter väljas per modulblock.
 *
 * UX-auditens High-impact-fixar (kvar från tidigare version):
 *  1. Elnät-callouten FÖRE intentkorten — elnät ≠ elhandel adresseras innan
 *     användaren förgrenar sig.
 *  2. Jämförelsen tecknas via ElavtalJamfor-modulens varianter (A/B/C).
 *  3. "Logga in på Mina sidor" är flyttad till utility-raden vid breadcrumb.
 *     Hero:ns Action-variant har ingen konkurrerande persona-CTA.
 *  4. FAQ ligger direkt efter jämförelsen — Accordion by default.
 *  5. Relaterade teman + genvägar är komprimerade till en custom footer-sektion.
 *     Nyheter är ett eget modulblock (3 varianter) efter genvägarna.
 */

export function StartsidaUndersidaUX() {
  const blocks: BlockDef[] = [
    /* ─── 1. HERO — modul med 3 varianter ────────────────────────── */
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "action",
          label: "Action-first (default för denna sidtyp)",
          render: () => <HeroAction />,
        },
        {
          key: "brand",
          label: "Brand-first",
          render: () => <HeroBrand />,
        },
        {
          key: "status",
          label: "Status-first",
          render: () => <HeroStatus pagaende={0} />,
        },
      ],
    },

    /* ─── 2. ELNÄT-CALLOUT — sidtyp-specifikt (ej modul) ───────── */
    {
      id: "elnat-callout",
      label: "Elnät-callout — före intentkort",
      variants: [
        {
          key: "ovanfor-intent",
          label: "Före intentkorten",
          render: () => (
            <Annotation
              label="Elnät vs elhandel — före intentkort"
              audience="user"
              rationale="UX-audit fix #1: I Sidtyp 1 låg den här efter intentkorten. En användare som klickade 'Jag ska flytta' eller 'Jag vill teckna' missade den helt. Här är den det första de möter efter hero:n — innan de förgrenar sig."
            >
              <section className="py-6">
                <div className="p-5 rounded-md bg-tint-info border-l-4 border-brand-accent flex gap-4">
                  <Icon name="lightbulb" size={28} className="text-brand-accent" />
                  <div className="flex-1">
                    <p className="font-medium mb-1">Bor du i Helsingborg eller Ängelholm?</p>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      Då är vi redan ditt elnätsbolag — du väljer bara elhandelsavtal här.{" "}
                      <a href="#" className="text-brand-accent underline underline-offset-2 hover:no-underline">
                        Vad är skillnaden?
                      </a>
                    </p>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. INTENTKORT — delad komponent, 3 layout-varianter ───── */
    {
      id: "intent",
      label: "Intentkort",
      variants: (() => {
        const items: IntentCardItem[] = [
          { ikon: "edit", label: "Jag vill teckna elavtal", desc: "Ny kund eller saknar avtal", href: "/moduler/elavtal-jamfor" },
          { ikon: "sync", label: "Jag vill byta elavtal", desc: "Befintlig kund — jämför och byt direkt", href: "#" },
          { ikon: "home", label: "Jag ska flytta", desc: "Flytta inom, till eller från nätet", href: "#" },
          { ikon: "monitoring", label: "Jag vill förstå min elkostnad", desc: "Prishistorik, påslag och förbrukning", href: "#" },
          { ikon: "chat_bubble", label: "Jag har en fråga", desc: "Vanliga frågor och kundservice", href: "/moduler/kundservice-triage" },
        ];
        const renderWith = (v: IntentCardVariant) => (
          <Annotation
            label="Intentkort — alternativ ingång efter hero"
            audience="user"
            rationale="Intentioner, inte produkter — skiljer sig från Tjanster-modulen. Delar mönster med Kundservice-sidtypens 'Vad gäller det?'-block via IntentCardGrid-komponenten. Välj layout (horisontell / vertikal / chips) beroende på täthet."
          >
            <section className="py-10 border-t border-border-subtle">
              <h2 className="text-h2 mb-6">Eller välj efter vad du vill göra</h2>
              <IntentCardGrid items={items} variant={v} columns={5} />
            </section>
          </Annotation>
        );
        return [
          { key: "horizontal", label: "Horisontell — ikon vänster om text", render: () => renderWith("horizontal") },
          { key: "vertical", label: "Vertikal — ikon över text", render: () => renderWith("vertical") },
          { key: "chips", label: "Chips — kompakt pill-rad", render: () => renderWith("chips") },
        ];
      })(),
    },

    /* ─── 4. JÄMFÖRELSE — ElavtalJamfor-modul, 3 varianter ──────── */
    {
      id: "jamforelse",
      label: "Avtalsjämförelse",
      variants: [
        {
          key: "progressiv",
          label: "Progressiv (default)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <VariantProgressiv />
            </section>
          ),
        },
        {
          key: "trygg",
          label: "Trygg — semantisk tabell",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <VariantTrygg />
            </section>
          ),
        },
        {
          key: "experimentell",
          label: "Experimentell — live-kalkylator",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <VariantExperimentell />
            </section>
          ),
        },
      ],
    },

    /* ─── 5. FAQ — Faq-modul, 3 varianter ───────────────────────── */
    {
      id: "faq",
      label: "FAQ",
      variants: [
        {
          key: "accordion",
          label: "Accordion (default)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <FaqAccordion />
            </section>
          ),
        },
        {
          key: "grupperad",
          label: "Grupperad — innan/under/efter",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <FaqGrupperad />
            </section>
          ),
        },
        {
          key: "sok",
          label: "Sök + topplista",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <FaqSokTopplista />
            </section>
          ),
        },
      ],
    },

    /* ─── 6. VÄRDEERBJUDANDE — sidtyp-specifikt (ej modul) ──────── */
    {
      id: "varde",
      label: "Värdeerbjudande",
      variants: [
        {
          key: "banner",
          label: "Horisontell banner — lätt närvaro",
          render: () => (
            <Annotation
              label="Värdeerbjudande — lätt banner efter beslutet"
              audience="user"
              rationale="Placerad efter FAQ (inte före) eftersom värde-argument påverkar tecknings-beslut mindre än svar på loss aversion. Banner-format istället för tre spalter — tar mindre yta när det inte är huvudbeslut."
            >
              <section className="py-8 border-t border-border-subtle">
                <div className="rounded-md bg-tint-info p-5 grid sm:grid-cols-3 gap-4 text-sm">
                  {[
                    { ikon: "location_city", t: "Lokalt · Kommunägt sedan 1892" },
                    { ikon: "payments", t: "Transparent · 4,5 öre/kWh påslag" },
                    { ikon: "smartphone", t: "Allt samlat · App + Mina sidor" },
                  ].map((v) => (
                    <div key={v.t} className="flex items-center gap-2">
                      <Icon name={v.ikon} size={20} className="text-brand-accent" />
                      <span className="font-medium text-brand-primary">{v.t}</span>
                    </div>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. GENVÄGAR — relaterade + bra-att-veta (ej modul) ────── */
    {
      id: "genvagar",
      label: "Genvägar — relaterade & bra att veta",
      variants: [
        {
          key: "kompakt",
          label: "Kompakt dubbelspalt",
          render: () => (
            <Annotation
              label="Long-tail-ingångar komprimerade"
              audience="redaktör"
              rationale="UX-audit fix #5: Sidtyp 1 hade separata sektioner för relaterade teman och genvägar med stora H2:s. Här är båda samlade i en sektion med H3:s så de finns kvar för SEO/long-tail men inte konkurrerar med huvudbeslutet. Nyheter är numera ett eget modulblock efter detta."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-h5 font-medium mb-3">Utforska mer</h3>
                    <ul className="space-y-2 text-sm">
                      {[
                        { titel: "Det energismarta hemmet", href: "#" },
                        { titel: "Solceller", href: "/moduler/produktinfo" },
                        { titel: "Ladda Smart", href: "/moduler/produktinfo" },
                      ].map((t) => (
                        <li key={t.titel}>
                          <Link to={t.href} className="group inline-flex items-center gap-1.5 hover:text-brand-accent">
                            <Icon name="arrow_forward" size={14} className="text-ink-muted group-hover:text-brand-accent" />
                            <span>{t.titel}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-h5 font-medium mb-3">Bra att veta</h3>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Prishistorik",
                        "Anvisat avtal",
                        "Elens ursprung",
                        "Ångerrätt",
                      ].map((label) => (
                        <li key={label}>
                          <a href="#" className="group inline-flex items-center gap-1.5 hover:text-brand-accent">
                            <Icon name="arrow_forward" size={14} className="text-ink-muted group-hover:text-brand-accent" />
                            <span>{label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 8. NYHETER — Nyheter-modul, 3 varianter ──────────────── */
    {
      id: "nyheter",
      label: "Nyheter",
      variants: [
        {
          key: "grid",
          label: "Grid likvärdig (default)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <NyhetsGrid />
            </section>
          ),
        },
        {
          key: "utvald",
          label: "Utvald + 2 små",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <NyhetsUtvald />
            </section>
          ),
        },
        {
          key: "tidslinje",
          label: "Tidslinje",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <NyhetsTidslinje />
            </section>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <PageBrief
        kategori="Startsida undersida (Sidtyp 7 — UX-optimerad)"
        syfte="UX-audit-driven variant av Sidtyp 1, nu med ren modul-variant-komposition. Varje block som motsvarar en modul (Hero, ElavtalJamfor, Faq, Nyheter) renderar modulens faktiska variant-komponenter — växla mellan varianter i edit-läget för att jämföra."
        malgrupp="Samma som Sidtyp 1: privatperson i Helsingborg/Ängelholm som ska teckna/byta elavtal."
        primarHandling="Klicka Hero-CTA eller ett jämförelsekort → jämförelse-modul."
        ton="Samma som Sidtyp 1. UX-skillnaden ligger i struktur och affordances, inte i ton."
      />

      {/* Utility-rad — 'Logga in' har flyttats HIT från hero */}
      <div className="flex items-center justify-between pt-6">
        <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Översikt
        </Link>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-brand-accent"
        >
          <Icon name="person" size={16} />
          Logga in på Mina sidor
        </a>
      </div>

      <BlockList pageId="startsida-undersida-ux" blocks={blocks} />
    </div>
  );
}
