import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { IntentCardGrid, type IntentCardItem, type IntentCardVariant } from "../../components/IntentCardGrid";

// Modulvarianter: sidtypens block använder modulernas egna komponenter
// i stället för att kopiera deras JSX. När en variant ändras i en modul
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
 * SIDTYP 7: Startsida undersida, UX-optimerad
 *
 * Sidan är byggd av modulernas egna varianter. Varje block som motsvarar
 * en modul visar modulens riktiga komponenter, och i redigeringsläget kan
 * alla tre varianter väljas per block.
 *
 * Viktigaste åtgärderna från UX-granskningen:
 *  1. Elnätsrutan ligger FÖRE intentkorten, så skillnaden mellan elnät och
 *     elhandel är tydlig innan användaren väljer väg.
 *  2. Jämförelsen visas med ElavtalJamfor-modulens varianter (A/B/C).
 *  3. "Logga in på Mina sidor" är flyttad till raden vid tillbakalänken.
 *     Heron har därför ingen konkurrerande knapp för inloggade kunder.
 *  4. FAQ ligger direkt efter jämförelsen, som dragspel som standard.
 *  5. Relaterade teman och genvägar är samlade i en kompakt sektion.
 *     Nyheter är ett eget modulblock (tre varianter) efter genvägarna.
 */

export function StartsidaUndersidaUX() {
  const blocks: BlockDef[] = [
    /* ─── 1. HERO: modul med tre varianter ─────────────────────── */
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "action",
          label: "Handlingsfokuserad (standard för sidtypen)",
          render: () => <HeroAction />,
        },
        {
          key: "brand",
          label: "Varumärkesfokuserad",
          render: () => <HeroBrand />,
        },
        {
          key: "status",
          label: "Statusfokuserad",
          render: () => <HeroStatus pagaende={0} />,
        },
      ],
    },

    /* ─── 2. ELNÄTSRUTA: bara för den här sidtypen (ej modul) ─── */
    {
      id: "elnat-callout",
      label: "Elnätsruta före intentkort",
      variants: [
        {
          key: "ovanfor-intent",
          label: "Före intentkorten",
          render: () => (
            <Annotation
              label="Elnät eller elhandel, före valen"
              audience="user"
              rationale="Många tror att de måste byta elnätsbolag när de byter elavtal. Rutan reder ut det direkt efter heron, innan besökaren väljer väg. I Sidtyp 1 låg den efter korten och missades av den som klickade vidare."
            >
              <section className="py-6">
                <div className="p-5 rounded-md bg-tint-info border-l-4 border-brand-accent flex gap-4">
                  <Icon name="lightbulb" size={28} className="text-brand-accent" />
                  <div className="flex-1">
                    <Copy
                      label="Lokal trygghetsrad, rubrik"
                      category="reassurance"
                      text="Bor du i Helsingborg eller Ängelholm?"
                      rationale="En fråga i stället för ett påstående låter läsaren själv avgöra om rutan gäller hen. Riktiga ortnamn känns igen direkt. Undvik vaga uttryck som 'i vårt område'."
                    >
                      <p className="font-medium mb-1">Bor du i Helsingborg eller Ängelholm?</p>
                    </Copy>
                    <Copy
                      label="Lokal trygghetsrad, brödtext"
                      category="reassurance"
                      text="Då är vi redan ditt elnätsbolag. Här väljer du bara elavtal. Vad är skillnaden?"
                      rationale="En mening, ett budskap: elnätet har du redan, här väljer du bara elavtal. 'Bara' visar att valet är enklare än man tror. Den längre förklaringen ligger bakom länken 'Vad är skillnaden?' så den inte stoppar den som vill vidare."
                    >
                      <p className="text-sm text-ink-secondary leading-relaxed">
                        Då är vi redan ditt elnätsbolag. Här väljer du bara elavtal.{" "}
                        <a href="#" className="text-brand-accent underline underline-offset-2 hover:no-underline">
                          Vad är skillnaden?
                        </a>
                      </p>
                    </Copy>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. INTENTKORT: delad komponent med tre layouter ──────── */
    {
      id: "intent",
      label: "Intentkort",
      variants: (() => {
        const items: IntentCardItem[] = [
          { ikon: "edit", label: "Jag vill teckna elavtal", desc: "Ny kund eller saknar avtal", href: "/moduler/elavtal-jamfor" },
          { ikon: "sync", label: "Jag vill byta elavtal", desc: "Redan kund? Jämför och byt direkt", href: "#" },
          { ikon: "home", label: "Jag ska flytta", desc: "Inom, till eller från vårt elnätsområde", href: "#" },
          { ikon: "monitoring", label: "Jag vill förstå min elkostnad", desc: "Se prishistorik, påslag och förbrukning", href: "#" },
          { ikon: "chat_bubble", label: "Jag har en fråga", desc: "Vanliga frågor och kundservice", href: "/moduler/kundservice-triage" },
        ];
        const renderWith = (v: IntentCardVariant) => (
          <Annotation
            label="Intentkort: välj efter vad du vill göra"
            audience="user"
            rationale="Korten utgår från vad besökaren vill göra, inte från våra produkter. Samma mönster finns på Kundservice ('Vad gäller det?'), så det känns igen. Välj layout efter hur mycket plats som finns: horisontell, vertikal eller kompakta knappar."
          >
            <section className="py-10 border-t border-border-subtle">
              <Copy
                label="Sektionsrubrik, intentkort"
                category="rubrik"
                text="Eller välj efter vad du vill göra"
                rationale="'Eller' visar att korten är ett alternativ till heroknappen, inte ett nästa steg. 'Vad du vill göra' utgår från besökarens ärende, precis som på Kundservice."
              >
                <h2 className="text-h2 mb-6">Eller välj efter vad du vill göra</h2>
              </Copy>
              <Copy
                label="Intentkortens etiketter"
                category="cta"
                text={items.map((i) => i.label).join(" / ")}
                rationale="Varje kort börjar med 'Jag vill' eller 'Jag ska', så besökaren känner igen sitt eget ärende. Beskrivningen under säger vem kortet passar. Skriv inte produktnamn här, de hör hemma i jämförelsen."
              >
                <div>
                  <IntentCardGrid items={items} variant={v} columns={5} />
                </div>
              </Copy>
            </section>
          </Annotation>
        );
        return [
          { key: "horizontal", label: "Horisontell, ikon till vänster om texten", render: () => renderWith("horizontal") },
          { key: "vertical", label: "Vertikal, ikon ovanför texten", render: () => renderWith("vertical") },
          { key: "chips", label: "Kompakta knappar på en rad", render: () => renderWith("chips") },
        ];
      })(),
    },

    /* ─── 4. JÄMFÖRELSE: ElavtalJamfor-modulen, tre varianter ──── */
    {
      id: "jamforelse",
      label: "Avtalsjämförelse",
      variants: [
        {
          key: "progressiv",
          label: "Progressiv (standard)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <VariantProgressiv />
            </section>
          ),
        },
        {
          key: "trygg",
          label: "Trygg, tabell",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <VariantTrygg />
            </section>
          ),
        },
        {
          key: "experimentell",
          label: "Experimentell, kalkylator",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <VariantExperimentell />
            </section>
          ),
        },
      ],
    },

    /* ─── 5. FAQ: Faq-modulen, tre varianter ───────────────────── */
    {
      id: "faq",
      label: "FAQ",
      variants: [
        {
          key: "accordion",
          label: "Dragspel (standard)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <FaqAccordion />
            </section>
          ),
        },
        {
          key: "grupperad",
          label: "Grupperad: före, under och efter",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <FaqGrupperad />
            </section>
          ),
        },
        {
          key: "sok",
          label: "Sök och topplista",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <FaqSokTopplista />
            </section>
          ),
        },
      ],
    },

    /* ─── 6. VÄRDEERBJUDANDE: bara för den här sidtypen (ej modul) */
    {
      id: "varde",
      label: "Värdeerbjudande",
      variants: [
        {
          key: "banner",
          label: "Diskret banner",
          render: () => (
            <Annotation
              label="Värdeerbjudande som diskret banner"
              audience="user"
              rationale="Ligger efter FAQ eftersom svar på oron att välja fel väger tyngre i beslutet än argument om oss. Bannern tar liten plats och bekräftar valet utan att konkurrera med jämförelsen."
            >
              <section className="py-8 border-t border-border-subtle">
                <Copy
                  label="Värdeerbjudande, tre korta fakta"
                  category="reassurance"
                  text="Lokalt · Kommunägt sedan 1892 / Tydligt pris · 4,5 öre/kWh i påslag / Allt samlat · App och Mina sidor"
                  rationale="Tre fakta, inga adjektiv. 'Kommunägt sedan 1892' bevisar att vi är lokala utan att vi behöver säga det. Påslaget står som en siffra, för siffran är beviset på ett tydligt pris. Undvik ord som 'transparent' och 'unik'."
                >
                  <div className="rounded-md bg-tint-info p-5 grid sm:grid-cols-3 gap-4 text-sm">
                    {[
                      { ikon: "location_city", t: "Lokalt · Kommunägt sedan 1892" },
                      { ikon: "payments", t: "Tydligt pris · 4,5 öre/kWh i påslag" },
                      { ikon: "smartphone", t: "Allt samlat · App och Mina sidor" },
                    ].map((v) => (
                      <div key={v.t} className="flex items-center gap-2">
                        <Icon name={v.ikon} size={20} className="text-brand-accent" />
                        <span className="font-medium text-brand-primary">{v.t}</span>
                      </div>
                    ))}
                  </div>
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. GENVÄGAR: relaterat och bra att veta (ej modul) ───── */
    {
      id: "genvagar",
      label: "Genvägar: relaterat och bra att veta",
      variants: [
        {
          key: "kompakt",
          label: "Kompakt dubbelspalt",
          render: () => (
            <Annotation
              label="Genvägar samlade i en kompakt sektion"
              audience="redaktör"
              rationale="Här samlas länkar för den som vill läsa vidare. Håll varje lista till tre eller fyra länkar och använd sidornas egna namn. Mindre rubriker gör att genvägarna finns kvar för sökning utan att ta fokus från elavtalet."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Copy
                      label="Kolumnrubrik, relaterade teman"
                      category="rubrik"
                      text="Utforska mer"
                      rationale="'Utforska' visar att det här är läsning, inte ett köp, och skiljer listan från teckningsflödet. Två ord räcker för en kort lista."
                    >
                      <h3 className="text-h5 font-medium mb-3">Utforska mer</h3>
                    </Copy>
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
                    <Copy
                      label="Kolumnrubrik, praktiska begrepp"
                      category="rubrik"
                      text="Bra att veta"
                      rationale="Neutral rubrik för korta förklaringar av begrepp som 'Anvisat avtal' och 'Elens ursprung'. Undvik 'Ordlista' (låter som en lärobok) och 'Vanliga frågor' (finns redan som egen sektion)."
                    >
                      <h3 className="text-h5 font-medium mb-3">Bra att veta</h3>
                    </Copy>
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

    /* ─── 8. NYHETER: Nyheter-modulen, tre varianter ───────────── */
    {
      id: "nyheter",
      label: "Nyheter",
      variants: [
        {
          key: "grid",
          label: "Rutnät med likvärdiga nyheter (standard)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <NyhetsGrid />
            </section>
          ),
        },
        {
          key: "utvald",
          label: "En utvald och två mindre",
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
        kategori="Startsida undersida (Sidtyp 7, UX-optimerad)"
        syfte="Hjälpa privatpersoner att välja och teckna rätt elavtal. Sidan är en förbättrad version av Sidtyp 1 efter en UX-granskning: elnätsfrågan reds ut tidigt, jämförelsen och svaren på vanliga frågor kommer före allt annat. Modulerna (hero, jämförelse, FAQ, nyheter) kan bytas mellan tre varianter i redigeringsläget."
        malgrupp="Privatpersoner i Helsingborg och Ängelholm som ska teckna eller byta elavtal, samma som för Sidtyp 1."
        primarHandling="Klicka på heroknappen eller ett avtal i jämförelsen och gå vidare till teckning."
        ton="Samma som Sidtyp 1: vardaglig, tydlig och trygg. Skillnaden mot Sidtyp 1 ligger i ordningen och strukturen, inte i tonen."
      />

      {/* Rad med tillbakalänk och inloggning. 'Logga in' är flyttad hit från heron. */}
      <Annotation
        label="Inloggning flyttad ur heron"
        audience="design"
        rationale="Befintliga kunder hittar inloggningen uppe till höger, där de brukar leta. Heron kan då fokusera på en enda handling för den som vill teckna eller byta avtal."
      >
      <div className="flex items-center justify-between pt-6">
        <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Översikt
        </Link>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-brand-accent"
        >
          <Icon name="person" size={16} />
          <Copy
            label="Inloggningslänk"
            category="cta"
            text="Logga in på Mina sidor"
            rationale="Verb plus plats: besökaren vet vart länken leder. Använd alltid namnet 'Mina sidor', inte 'kontot' eller 'kundportalen', så det stämmer med resten av webben och appen."
          >
            Logga in på Mina sidor
          </Copy>
        </a>
      </div>
      </Annotation>

      <BlockList pageId="startsida-undersida-ux" blocks={blocks} />
    </div>
  );
}
