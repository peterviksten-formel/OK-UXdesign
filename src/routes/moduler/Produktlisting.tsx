import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import type { CopyCategory } from "../../lib/EditorialGuideContext";
import type { AnnotationAudience } from "../../lib/AnnotationContext";
import { Icon } from "../../components/Icon";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { PRODUKTER, type Produkt } from "./produkt-data";

/* Variant A: rutnät. Alla produkter syns direkt, utan filter. */
function ListingGrid() {
  return (
    <Annotation
      label="Produktrutnät"
      audience="design"
      rationale="Alla produkter syns på en gång, så besökaren kan jämföra genom att skumma utan att klicka. Passar 4 till 6 produkter. Blir det fler än 8 bör sidan ha filter i stället."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUKTER.map((p, idx) => <ProductCard key={p.id} produkt={p} guide={idx === 0} />)}
      </div>
    </Annotation>
  );
}

/* Variant B: filtrerat rutnät. Kategoriknappar ovanför rutnätet. */
function ListingFiltered() {
  const categories = [...new Set(PRODUKTER.map((p) => p.kategori))];
  const [cat, setCat] = useState<string | null>(null);
  const filtered = cat ? PRODUKTER.filter((p) => p.kategori === cat) : PRODUKTER;

  return (
    <div>
      <Annotation
        label="Kategorifilter"
        audience="design"
        rationale="En knapp per kategori, med antal produkter i varje. Alla produkter visas som förval. Listan uppdateras direkt utan att sidan laddas om. Passar när det finns fler än 6 produkter."
      >
        <div className="flex flex-wrap gap-2 mb-6">
          <Copy
            label="Filterknapp för alla produkter"
            category="metadata"
            text={`Alla (${PRODUKTER.length})`}
            rationale="Kort ord och antalet produkter inom parentes, så besökaren ser hur mycket som finns innan hen väljer. Undvik Visa alla eller Rensa filter: knappen är ett läge, inte en handling."
          >
            <button
              type="button"
              aria-pressed={cat === null}
              onClick={() => setCat(null)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                cat === null
                  ? "bg-brand-primary text-ink-onbrand border-brand-primary"
                  : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent"
              }`}
            >
              Alla ({PRODUKTER.length})
            </button>
          </Copy>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(cat === c ? null : c)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                cat === c
                  ? "bg-brand-primary text-ink-onbrand border-brand-primary"
                  : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent"
              }`}
            >
              {c} ({PRODUKTER.filter((p) => p.kategori === c).length})
            </button>
          ))}
        </div>
      </Annotation>

      <Annotation
        label="Filtrerad produktlista"
        audience="user"
        rationale="Besökaren ser bara produkterna i den kategori hen valt och slipper leta bland resten. Korten som inte matchar försvinner och de kvarvarande fyller ut rutnätet, lugnt och utan effekter."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, idx) => <ProductCard key={p.id} produkt={p} guide={idx === 0} />)}
        </div>
      </Annotation>
    </div>
  );
}

/* Hjälpare: visar anteckningar och copy-poster bara på första kortet,
   så att UX-guiden inte fylls med likadana poster för varje produkt. */
function KortAnnotation(props: { on: boolean; label: string; audience: AnnotationAudience; rationale: string; children: ReactElement }) {
  const { on, children, ...rest } = props;
  return on ? <Annotation {...rest}>{children}</Annotation> : children;
}

function KortCopy(props: { on: boolean; label: string; category: CopyCategory; text: string; rationale: string; children: ReactElement }) {
  const { on, children, ...rest } = props;
  return on ? <Copy {...rest}>{children}</Copy> : children;
}

/* Produktkort som båda varianterna använder. */
function ProductCard({ produkt: p, guide = false }: { produkt: Produkt; guide?: boolean }) {
  const prisText = [p.pris.typ === "fran" ? `Från ${p.pris.belopp}` : p.pris.belopp, p.pris.enhet]
    .filter(Boolean)
    .join(" ");

  return (
    <KortAnnotation
      on={guide}
      label="Produktkort"
      audience="design"
      rationale="Samma kort i båda varianterna: bild, kategori, pris, namn, en mening om nyttan och en knapp. Lika uppbyggda kort gör det lätt att jämföra produkterna sida vid sida."
    >
      <article className="rounded-md border border-border-subtle bg-surface overflow-hidden flex flex-col hover:shadow-sm hover:border-brand-accent transition-all group">
        <KortAnnotation
          on={guide}
          label="Kategori och pris på bilden"
          audience="user"
          rationale="Besökaren ser direkt vilken sorts produkt det är och ungefär vad den kostar, utan att läsa vidare. Produkter som säljs via offert visar inget pris här."
        >
          <div className="bg-tint-info aspect-[3/2] flex items-center justify-center relative">
            <Icon name="image" size={40} className="text-ink-muted" />
            <KortCopy
              on={guide}
              label="Kategoriemärke"
              category="metadata"
              text={p.kategori}
              rationale="Kategorinamnet är samma som i filtret, så besökaren känner igen det. Använd kundens ord, till exempel Elbil & laddning, inte interna produktområden."
            >
              <span className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                {p.kategori}
              </span>
            </KortCopy>
            {p.pris.typ !== "offert" && (
              <KortCopy
                on={guide}
                label="Prisetikett"
                category="metadata"
                text={prisText}
                rationale="Från och vad som ingår i priset (till exempel inkl. installation) gör att priset inte känns missvisande. Skriv alltid ut vad priset avser, aldrig bara en siffra."
              >
                <span className="absolute bottom-3 right-3 bg-canvas/90 backdrop-blur text-xs font-medium px-2 py-1 rounded border border-border-subtle">
                  {prisText}
                </span>
              </KortCopy>
            )}
          </div>
        </KortAnnotation>
        <KortAnnotation
          on={guide}
          label="Namn, nytta och knapp"
          audience="redaktör"
          rationale="Fyll i produktens namn, en mening som säger vad kunden får (högst cirka 60 tecken) och en knapptext med verb och produktnamn. Texterna hämtas från produktens uppgifter och är desamma överallt där produkten visas."
        >
          <div className="p-4 flex-1 flex flex-col">
            <KortCopy
              on={guide}
              label="Produktnamn"
              category="rubrik"
              text={p.namn}
              rationale="Produktens egennamn, utan tillägg. Samma namn som på produktsidan och i knappen, så besökaren vet att hen hamnar rätt."
            >
              <h3 className="font-medium mb-1 group-hover:text-brand-accent">{p.namn}</h3>
            </KortCopy>
            <KortCopy
              on={guide}
              label="Kort beskrivning"
              category="ton"
              text={p.tagline}
              rationale="En mening i du-form om vad produkten gör för kunden. Undvik tekniska detaljer och säljord som smidig eller revolutionerande: de säger inget om nyttan."
            >
              <p className="text-sm text-ink-secondary mb-3 flex-1">{p.tagline}</p>
            </KortCopy>
            <div className="flex gap-2">
              <KortCopy
                on={guide}
                label="Produktknapp"
                category="cta"
                text={p.cta.label}
                rationale="Verb plus produktnamn, till exempel Beställ Ladda Smart eller Boka rådgivning. Knappen säger vad som händer. Undvik Läs mer, som inte skiljer korten åt."
              >
                <Link
                  to={`/moduler/produktinfo`}
                  className="flex-1 text-center bg-brand-primary text-ink-onbrand text-sm font-medium py-2 rounded hover:opacity-90 transition-opacity"
                >
                  {p.cta.label}
                </Link>
              </KortCopy>
            </div>
          </div>
        </KortAnnotation>
      </article>
    </KortAnnotation>
  );
}

/* Modulsidan */

const VARIANTS: Variant[] = [
  {
    id: "trygg",
    shortName: "A",
    label: "Rutnät",
    riskLevel: "låg",
    oneLiner: "Alla produkter syns direkt i ett rutnät. Inget filter.",
    bestFor: "4 till 6 produkter, när besökaren vill få överblick snabbt.",
    render: () => <ListingGrid />,
  },
  {
    id: "progressiv",
    shortName: "B",
    label: "Filtrerat rutnät",
    riskLevel: "medel",
    oneLiner: "Kategoriknappar ovanför rutnätet. Besökaren filtrerar utan att sidan laddas om.",
    bestFor: "Fler än 6 produkter, när besökaren vet vilken sorts produkt hen letar efter.",
    render: () => <ListingFiltered />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Känsla",
    values: {
      trygg: "Som en katalog. Allt syns, lätt att skumma.",
      progressiv: "Som en välordnad butik. Filtret tar bort brus och gör valet tydligare.",
    },
  },
  {
    aspect: "Antal produkter",
    values: {
      trygg: "Fungerar upp till cirka 8 produkter. Fler än så blir svåröverskådligt.",
      progressiv: "Klarar 20 produkter eller fler tack vare kategorier med antal.",
    },
  },
  {
    aspect: "Mobil",
    values: {
      trygg: "Korten ligger i en kolumn och besökaren scrollar. Inga överraskningar.",
      progressiv: "Filterknapparna radbryts ovanför korten, som ligger i en kolumn.",
    },
  },
  {
    aspect: "Tillgänglighet",
    values: {
      trygg: "Mycket bra. Inget innehåll är dolt.",
      progressiv: "Bra. Filterknapparna talar om för skärmläsare vilket filter som är valt.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      trygg: "Små urval (högst 8 produkter), till exempel avsnittet Fler produkter på en produktsida.",
      progressiv: "Förval för sidan Smarta produkter och tjänster.",
    },
  },
];

export function Produktlisting() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Produktlisting</p>
        <h1 className="text-h1 mb-3">Produktlista: så visar vi flera produkter</h1>
        <p className="text-lede text-ink-secondary">
          Två sätt att visa många produkter på en sida: ett rutnät med allt synligt, eller
          ett rutnät med filter per kategori. Varje kort leder vidare till produktens egen
          sida. Växla mellan A och B och jämför.
        </p>
      </header>

      <VariantSwitcher
        variants={VARIANTS}
        argumentation={ARGUMENTATION}
        defaultId="progressiv"
      />

      <section className="mt-16 pt-8 border-t border-border-subtle">
        <h2 className="text-h3 mb-4">Designnotering</h2>
        <div className="text-ink-secondary text-sm space-y-3 max-w-reading">
          <p>
            <strong>Ingen karusell.</strong> Karuseller ger ofta få klick, eftersom besökare
            sällan bläddrar förbi de första 3-4 korten. Ett rutnät med filter ger samma
            överblick utan att gömma produkter.
          </p>
          <p>
            <strong>Koppling till Produktinfo:</strong> I prototypen leder knappen på varje
            kort till modulen Produktinfo. På den riktiga webbplatsen leder den till
            produktens egen sida.
          </p>
        </div>
      </section>
    </div>
  );
}
