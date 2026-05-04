import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { WizardProgress, type WizardVariant } from "../../components/WizardProgress";
import {
  StickyPurchaseSidebar,
  StickyPurchaseBottomBar,
} from "../../components/StickyPurchasePanel";
import { RelateradeProdukter } from "../../components/RelateradeProdukter";
import { ProduktinfoKop } from "../moduler/variants/ProduktinfoKop";
import { ProduktinfoProgressiv } from "../moduler/variants/ProduktinfoProgressiv";
import { ProduktinfoTrygg } from "../moduler/variants/ProduktinfoTrygg";
import { PRODUKTER } from "../moduler/produkt-data";
import { KundcaseGrid } from "../moduler/variants/KundcaseGrid";
import { KundcaseHero } from "../moduler/variants/KundcaseHero";
import { KundcaseStory } from "../moduler/variants/KundcaseStory";
import { FaqAccordion } from "../moduler/variants/FaqAccordion";
import { FaqGrupperad } from "../moduler/variants/FaqGrupperad";
import { FaqSokTopplista } from "../moduler/variants/FaqSokTopplista";

/**
 * SIDTYP 10, Produktsida direktköp
 *
 * Säljande produktsida för tjänster som köps direkt via formulär (laddbox,
 * realtidsmätare). Konvertering är primärt, strukturen är hierarkisk så
 * läsaren kan stoppa när som helst och fortfarande nå CTA.
 *
 * UX-principer:
 *  1. Hero äger värdepropositionen, namn, en USP, primär CTA i hero.
 *  2. Skanningsbarhet, USP-rad direkt under hero ger 3 fakta på 5 sek.
 *  3. Pris transparent, finns synligt vid CTA, inte gömt i fotnot.
 *  4. Hur det fungerar, sänker tröskel ("vad händer efter beställning?").
 *  5. Social proof, case innan formulär, för obeslutna.
 *  6. Formulär som checkout, 3-stegs wizard, samma grammatik som
 *     kontaktflödet, så användaren känner igen mönstret.
 *  7. FAQ sist, för långa-svans-frågor som tvekande har.
 */

type Steg = { ikon: string; titel: string; text: string; tid?: string };

const STEG: Steg[] = [
  { ikon: "shopping_cart", titel: "1. Beställ", text: "Fyll i adress och betalningsuppgifter. Tar ca 5 min.", tid: "5 min" },
  { ikon: "home_repair_service", titel: "2. Besiktning", text: "Vi kontaktar dig inom 3 arbetsdagar och bokar en besiktning på plats. Kostnadsfritt.", tid: "Inom 3 dagar" },
  { ikon: "build", titel: "3. Installation", text: "Certifierad elektriker monterar laddboxen. Du får full styrning via appen samma dag.", tid: "1 dag" },
];

const USP_DATA = [
  { ikon: "savings", titel: "Lägre laddningspris", text: "Smart styrning hittar billigaste timmen och laddar då." },
  { ikon: "verified", titel: "Rotavdrag hanterat", text: "Vi drar av 30 % av arbetskostnaden direkt på fakturan." },
  { ikon: "schedule", titel: "Klart inom 2 veckor", text: "Från beställning till färdig installation. Inga väntelistor." },
  { ikon: "shield", titel: "5 års garanti", text: "På laddbox och installation. Vi tar hand om service om något händer." },
];

// Produkt-instans som hela sidan handlar om, Ladda Smart valdes som
// representativt direktköp-exempel.
const PRODUKT = PRODUKTER.find((p) => p.id === "ladda-smart")!;

export function ProduktsidaDirektkop() {
  /* ─── Köp-flöde state ─────────────────────────────────────────── */
  const [orderStep, setOrderStep] = useState<1 | 2 | 3>(1);
  const [adress, setAdress] = useState("");
  const [postnr, setPostnr] = useState("");
  const [ort, setOrt] = useState("");
  const [namn, setNamn] = useState("");
  const [personnr, setPersonnr] = useState("");
  const [epost, setEpost] = useState("");
  const [telefon, setTelefon] = useState("");
  const [godkant, setGodkant] = useState(false);

  const ordernr = useMemo(
    () => "OK-2026-" + (Math.floor(Math.random() * 90000) + 10000),
    [orderStep],
  );

  // Focus management mellan steg, samma mönster som kontaktflödet
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [orderStep]);

  function reinitOrder() {
    setOrderStep(1);
    setAdress("");
    setPostnr("");
    setOrt("");
    setNamn("");
    setPersonnr("");
    setEpost("");
    setTelefon("");
    setGodkant(false);
  }

  /* ─── Beställningsflöde, 3-stegs wizard ──────────────────────── */
  function renderOrderFlow(progressVariant: WizardVariant) {
    const kanFortsattaSteg1 = adress.trim() !== "" && postnr.trim() !== "" && ort.trim() !== "";
    const kanSkicka =
      namn.trim() !== "" &&
      personnr.trim() !== "" &&
      epost.trim() !== "" &&
      telefon.trim() !== "" &&
      godkant;

    return (
      <Annotation
        label="Beställningsflöde, 3-stegs wizard"
        audience="user"
        rationale="Direktköp är ett känsligare moment än kontaktformulär, kund delar personnr och adress. Steg 1 (adress) är lågrisk; steg 2 (personliga uppgifter) kräver förtroende; steg 3 (bekräftelse) stänger loopen med ordernummer + nästa steg. Samma WizardProgress-grammatik som kontaktflödet i Start-Kundservice, användaren känner igen mönstret."
      >
        <section id="bestall" className="py-10 border-t border-border-subtle">
          <WizardProgress
            variant={progressVariant}
            title="Beställ Ladda Smart"
            subtitle="Tre korta steg. Du får orderbekräftelse direkt och vi kontaktar dig inom 3 arbetsdagar."
            steps={[
              { key: "adress", label: "Adress" },
              { key: "uppgifter", label: "Uppgifter" },
              { key: "klart", label: "Klart" },
            ]}
            current={orderStep}
          />

          <div className="rounded-md border-2 border-border-subtle bg-surface p-5 sm:p-6">
            {/* Order summary, alltid synlig */}
            {orderStep < 3 && (
              <div className="mb-5 pb-4 border-b border-border-subtle">
                <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-1">
                  Din beställning
                </p>
                <p className="font-medium">Ladda Smart</p>
                <p className="text-sm text-ink-secondary">14 900 kr inkl. installation · Rotavdrag dras av direkt</p>
              </div>
            )}

            {/* Steg 1: Installationsadress */}
            {orderStep === 1 && (
              <div>
                <h3
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className="font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
                >
                  Var ska laddboxen sitta?
                </h3>
                <p className="text-sm text-ink-secondary mb-4">
                  Adressen där installationen ska ske. Behöver vara godkänd för installation.
                </p>
                <div className="space-y-3 mb-5">
                  <div>
                    <label htmlFor="ord-adress" className="text-sm font-medium block mb-1">
                      Gatuadress
                    </label>
                    <input
                      id="ord-adress"
                      type="text"
                      value={adress}
                      onChange={(e) => setAdress(e.target.value)}
                      required
                      placeholder="Storgatan 12"
                      className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="ord-postnr" className="text-sm font-medium block mb-1">
                        Postnummer
                      </label>
                      <input
                        id="ord-postnr"
                        type="text"
                        inputMode="numeric"
                        value={postnr}
                        onChange={(e) => setPostnr(e.target.value)}
                        required
                        placeholder="252 25"
                        className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="ord-ort" className="text-sm font-medium block mb-1">
                        Ort
                      </label>
                      <input
                        id="ord-ort"
                        type="text"
                        value={ort}
                        onChange={(e) => setOrt(e.target.value)}
                        required
                        placeholder="Helsingborg"
                        className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!kanFortsattaSteg1}
                  onClick={() => setOrderStep(2)}
                  className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Fortsätt
                  <Icon name="arrow_forward" size={16} />
                </button>
              </div>
            )}

            {/* Steg 2: Personliga uppgifter */}
            {orderStep === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (kanSkicka) setOrderStep(3);
                }}
              >
                <h3
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className="font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
                >
                  Dina uppgifter
                </h3>
                <p className="text-sm text-ink-secondary mb-4">
                  Personnumret behövs för rotavdrag och kreditupplysning. Vi sparar inte uppgifter vi inte måste.
                </p>
                <div className="space-y-3 mb-5">
                  <div>
                    <label htmlFor="ord-namn" className="text-sm font-medium block mb-1">
                      För- och efternamn
                    </label>
                    <input
                      id="ord-namn"
                      type="text"
                      value={namn}
                      onChange={(e) => setNamn(e.target.value)}
                      required
                      className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="ord-personnr" className="text-sm font-medium block mb-1">
                      Personnummer
                    </label>
                    <input
                      id="ord-personnr"
                      type="text"
                      value={personnr}
                      onChange={(e) => setPersonnr(e.target.value)}
                      required
                      placeholder="ÅÅÅÅMMDD-XXXX"
                      className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="ord-epost" className="text-sm font-medium block mb-1">
                        E-post
                      </label>
                      <input
                        id="ord-epost"
                        type="email"
                        value={epost}
                        onChange={(e) => setEpost(e.target.value)}
                        required
                        className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="ord-telefon" className="text-sm font-medium block mb-1">
                        Telefon
                      </label>
                      <input
                        id="ord-telefon"
                        type="tel"
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                        required
                        className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                      />
                    </div>
                  </div>
                  <label className="flex items-start gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={godkant}
                      onChange={(e) => setGodkant(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-brand-primary"
                    />
                    <span className="text-sm text-ink-secondary">
                      Jag godkänner{" "}
                      <a href="#" className="text-brand-accent underline underline-offset-2">avtalsvillkoren</a>{" "}
                      och{" "}
                      <a href="#" className="text-brand-accent underline underline-offset-2">integritetspolicyn</a>.
                    </span>
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderStep(1)}
                    className="inline-flex items-center gap-1.5 border border-border-strong text-brand-primary font-medium px-4 py-2.5 rounded hover:bg-tint-info"
                  >
                    <Icon name="arrow_back" size={16} />
                    Tillbaka
                  </button>
                  <button
                    type="submit"
                    disabled={!kanSkicka}
                    className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Slutför beställning
                    <Icon name="check" size={16} />
                  </button>
                </div>
                <p className="text-xs text-ink-muted mt-3">
                  Du betalar inget förrän vi har gjort besiktning och bekräftat installationen. Inga dolda avgifter.
                </p>
              </form>
            )}

            {/* Steg 3: Bekräftelse */}
            {orderStep === 3 && (
              <div role="status" aria-live="polite">
                <div className="flex items-start gap-3 mb-4">
                  <Icon
                    name="check_circle"
                    size={28}
                    className="text-brand-accent shrink-0"
                    filled
                  />
                  <div>
                    <Copy
                      label="Order-bekräftelse, rubrik"
                      category="rubrik"
                      text="Tack, vi har tagit emot din beställning"
                      rationale="'Tack' först (mänskligt), sen faktatum. 'Vi har tagit emot' är fait accompli, användaren kan släppa oron. Inte 'Beställningen är registrerad' (passiv förvaltningssvenska)."
                    >
                      <h3
                        ref={stepHeadingRef}
                        tabIndex={-1}
                        className="text-h5 font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
                      >
                        Tack, vi har tagit emot din beställning
                      </h3>
                    </Copy>
                    <p className="text-sm text-ink-secondary">
                      En orderbekräftelse är skickad till <strong className="text-ink">{epost || "din e-post"}</strong>.
                    </p>
                  </div>
                </div>
                <dl className="text-sm grid sm:grid-cols-2 gap-3 mb-5 p-4 rounded-md bg-tint-info">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-muted font-medium">Ordernummer</dt>
                    <dd className="font-medium font-mono">{ordernr}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-muted font-medium">Produkt</dt>
                    <dd className="font-medium">Ladda Smart · 14 900 kr</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-muted font-medium">Adress</dt>
                    <dd className="font-medium">{adress}, {postnr} {ort}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-muted font-medium">Du betalar</dt>
                    <dd className="font-medium">Efter besiktning</dd>
                  </div>
                </dl>
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                    Så här händer det härnäst
                  </p>
                  <ol className="space-y-2">
                    {[
                      "Beställningen är registrerad (redan klart)",
                      "Vi kontaktar dig inom 3 arbetsdagar för att boka besiktning",
                      "Besiktning hemma hos dig, kostnadsfri",
                      "Installation av certifierad elektriker, oftast inom 2 veckor",
                      "Du får faktura efter installation, med rotavdrag avdraget",
                    ].map((t, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-brand-primary text-white grid place-items-center text-[11px] font-bold">
                          {i + 1}
                        </span>
                        <span className={i === 0 ? "text-ink-secondary line-through" : ""}>
                          {t}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 border border-border-strong text-brand-primary font-medium px-4 py-2.5 rounded hover:bg-tint-info text-sm"
                  >
                    <Icon name="person" size={16} />
                    Följ ordern på Mina sidor
                  </a>
                  <button
                    type="button"
                    onClick={reinitOrder}
                    className="inline-flex items-center gap-1.5 text-ink-secondary hover:text-brand-accent text-sm px-3 py-2.5"
                  >
                    <Icon name="restart_alt" size={16} />
                    Ny beställning
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </Annotation>
    );
  }

  /* ─── Block-arrayen ────────────────────────────────────────────── */

  const blocks: BlockDef[] = [
    /* ─── 1. HERO, produktspecifik ────────────────────────────── */
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "produkt",
          label: "Produkt-hero, namn + USP + CTA",
          render: () => (
            <Annotation
              label="Hero, säljande, en tydlig CTA"
              audience="user"
              rationale="Inget bilduppslag som dröjer, inget marknadsspråk i H1. Direkt: produktnamn (vad det är) + en USP-mening (vad det löser) + pris (transparent) + en CTA. Bilden är produktillustration, inte livstilsbild, användare som klickade hit har redan bestämt sig för att kolla produkten."
            >
              <section className="py-8 sm:py-12 grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-eyebrow uppercase text-ink-muted mb-3">Elbil & laddning</p>
                  <Copy
                    label="H1, produktnamn"
                    category="rubrik"
                    text="Ladda Smart"
                    rationale="Produktnamnet räcker som rubrik. 'Hemma-laddning för elbil' skulle vara redaktörens språk; 'Ladda Smart' är produktens egennamn, kortast möjliga och kategoriskt entydigt."
                  >
                    <h1 className="text-display leading-tight mb-3">Ladda Smart</h1>
                  </Copy>
                  <Copy
                    label="USP-mening"
                    category="reassurance"
                    text="Smart laddning för elbil, hemma. Ladda billigare på natten, allt installerat på två veckor."
                    rationale="Tre fakta i en mening: vad det är (smart laddning), vad det sparar (billigare nattladdning), vad du får (installation klar inom 2 veckor). Inga adjektiv, bara konkreta löften."
                  >
                    <p className="text-lede text-ink-secondary mb-6 leading-relaxed">
                      Smart laddning för elbil, hemma. Ladda billigare på natten, allt installerat på två veckor.
                    </p>
                  </Copy>
                  {/* Pris, primär CTA och reassurance ligger i sticky-panelen
                     höger (eller fixed bottom-bar på mobil). Hero håller bara
                     värdepropositionen, inte ett duplicerat köp. */}
                </div>

                <div className="bg-tint-info aspect-[4/3] rounded-md flex items-center justify-center">
                  <Icon name="ev_station" size={120} className="text-brand-accent" />
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. USP-RAD, fyra fakta-kort ─────────────────────────── */
    {
      id: "usp",
      label: "USP-rad, fyra fakta",
      variants: [
        {
          key: "ikoner",
          label: "Ikon-kort, fyra kolumner",
          render: () => (
            <Annotation
              label="USP-kort, skannbara fakta"
              audience="user"
              rationale="Direkt under hero så läsaren får tre/fyra konkreta fördelar utan att skrolla djupt. Ikoner gör korten visuellt distinkta. Samma layout-grammatik som IntentCardGrid på Start-sidor, användaren känner igen mönstret."
            >
              <section className="py-8 border-t border-border-subtle">
                <div className="grid sm:grid-cols-2 gap-4">
                  {USP_DATA.map((u) => (
                    <div key={u.titel} className="p-4 rounded-md bg-surface border border-border-subtle">
                      <Icon name={u.ikon} size={28} className="text-brand-accent mb-2" />
                      <h3 className="font-medium mb-1 text-sm">{u.titel}</h3>
                      <p className="text-sm text-ink-secondary leading-snug">{u.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. PRODUKTINFO, info utan pris/CTA (sticky-panel äger köpet) ─
     * Default: ren info-variant utan pris och CTA, sticky-panelen
     * ansvarar för pris och beställning. Trygg/Progressiv/Köp finns kvar
     * som alternativ för sidor utan sticky-panel (fallback om man väljer
     * att stänga av panelen). */
    {
      id: "produktinfo",
      label: "Produktinfo",
      variants: [
        {
          key: "info-only",
          label: "Renodlad info, bild + ingår + villkor + varför (default)",
          render: () => (
            <Annotation
              label="Produktinfo, renodlad till information"
              audience="design"
              rationale="Pris och CTA är borttaget från detta block, sticky-panelen i höger kolumn ansvarar för köpet. Här bara: bild, beskrivning, vad som ingår, villkor, varför produkten passar. Renar hierarkin: en plats för köp, en plats för information."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div className="rounded-md bg-tint-info aspect-[4/3] flex items-center justify-center border border-border-subtle">
                    <div className="text-center text-ink-muted">
                      <Icon name="ev_station" size={64} className="mb-2 text-brand-accent" />
                      <p className="text-xs">{PRODUKT.bildAlt}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-eyebrow uppercase text-ink-muted mb-1">{PRODUKT.kategori}</p>
                    <h2 className="text-h3 mb-2">{PRODUKT.namn}</h2>
                    <p className="text-lede text-ink-secondary mb-3">{PRODUKT.tagline}</p>
                    <p className="text-sm text-ink-secondary leading-relaxed">{PRODUKT.beskrivning}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6 border-t border-border-subtle pt-6">
                  <div>
                    <h3 className="text-h5 font-medium mb-3">Ingår</h3>
                    <ul className="space-y-1.5 text-sm text-ink-secondary">
                      {PRODUKT.inkluderar.map((i) => (
                        <li key={i} className="flex gap-2">
                          <Icon name="check" size={16} className="text-brand-accent shrink-0 mt-0.5" />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-h5 font-medium mb-3">Villkor</h3>
                    <ul className="space-y-1.5 text-sm text-ink-secondary">
                      {PRODUKT.villkor.map((v) => (
                        <li key={v} className="flex gap-2">
                          <span className="text-ink-muted shrink-0">·</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-h5 font-medium mb-3">Varför {PRODUKT.namn}?</h3>
                    <ul className="space-y-1.5 text-sm text-ink-secondary">
                      {PRODUKT.uspar.map((u) => (
                        <li key={u} className="flex gap-2">
                          <Icon name="star" size={16} filled className="text-brand-accent shrink-0 mt-0.5" />
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "progressiv",
          label: "Progressiv, tabs med pris/CTA (dubblerar panelen)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <ProduktinfoProgressiv produkt={PRODUKT} inline />
            </section>
          ),
        },
        {
          key: "trygg",
          label: "Trygg, 2-kolumns med pris/CTA (dubblerar panelen)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <ProduktinfoTrygg produkt={PRODUKT} inline />
            </section>
          ),
        },
        {
          key: "kop",
          label: "Köp-fokuserad, egen sticky sidebar (dubblerar panelen)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <ProduktinfoKop produkt={PRODUKT} inline />
            </section>
          ),
        },
      ],
    },

    /* ─── 4. HUR DET FUNGERAR, 3 steg ────────────────────────── */
    {
      id: "process",
      label: "Hur det fungerar",
      variants: [
        {
          key: "tre-steg",
          label: "Tre steg horisontellt",
          render: () => (
            <Annotation
              label="Process-steg, sänk tröskel innan formulär"
              audience="user"
              rationale="Direkt-köp innebär att kund delar adress + personnr, tröskeln är högre än ett kontaktformulär. Visa exakt vad som händer EFTER beställning så det inte känns som en blindöverlämning. Tidsangivelser (5 min / 3 dagar / 1 dag) sätter förväntan."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Process-rubrik"
                  category="rubrik"
                  text="Så här går det till"
                  rationale="Standardformulering för process-sektioner, bekant och enkel. 'Vad händer efter du beställt?' skulle vara mer specifik men längre."
                >
                  <h2 className="text-h3 font-medium mb-2">Så här går det till</h2>
                </Copy>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Från beställning till färdig installation, oftast inom 2 veckor.
                </p>
                <ol className="grid md:grid-cols-3 gap-4">
                  {STEG.map((s) => (
                    <li
                      key={s.titel}
                      className="p-5 rounded-md border border-border-subtle bg-surface flex flex-col gap-2"
                    >
                      <Icon name={s.ikon} size={28} className="text-brand-accent" />
                      <h3 className="font-medium">{s.titel}</h3>
                      <p className="text-sm text-ink-secondary leading-snug flex-1">{s.text}</p>
                      {s.tid && (
                        <span className="text-xs text-ink-muted font-medium uppercase tracking-wider mt-2 inline-flex items-center gap-1">
                          <Icon name="schedule" size={12} />
                          {s.tid}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. KUNDCASE, modul, 3 varianter ────────────────────── */
    {
      id: "kundcase",
      label: "Kundcase",
      variants: [
        {
          key: "story",
          label: "Case-story (default, djup)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <KundcaseStory />
            </section>
          ),
        },
        {
          key: "grid",
          label: "Citatkort-grid, bredd",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <KundcaseGrid />
            </section>
          ),
        },
        {
          key: "hero",
          label: "Hero-citat, ett stort",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <KundcaseHero />
            </section>
          ),
        },
      ],
    },

    /* ─── 6. BESTÄLLNINGSFLÖDE, 3-stegs wizard ───────────────── */
    {
      id: "bestall",
      label: "Beställningsflöde",
      variants: [
        {
          key: "stepper",
          label: "Stepper, cirklar med etiketter (default)",
          render: () => renderOrderFlow("stepper"),
        },
        {
          key: "bar",
          label: "Progress-bar, kompakt",
          render: () => renderOrderFlow("bar"),
        },
        {
          key: "chips",
          label: "Pill-chips",
          render: () => renderOrderFlow("chips"),
        },
      ],
    },

    /* ─── 7. FAQ, modul ──────────────────────────────────────── */
    {
      id: "faq",
      label: "FAQ",
      variants: [
        {
          key: "accordion",
          label: "Accordion (default)",
          render: () => (
            <section className="py-10 border-t border-border-subtle [&_section]:max-w-none">
              <FaqAccordion />
            </section>
          ),
        },
        {
          key: "grupperad",
          label: "Grupperad, innan/under/efter",
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
            <section className="py-10 border-t border-border-subtle [&_section]:max-w-none">
              <FaqSokTopplista />
            </section>
          ),
        },
      ],
    },

    /* ─── 8. RELATERADE PRODUKTER ──────────────────────────────── */
    {
      id: "relaterade",
      label: "Relaterade produkter",
      variants: [
        {
          key: "default",
          label: "Synergi-curering, 3 ikon-kort",
          render: () => (
            <RelateradeProdukter
              produkter={[
                {
                  ikon: "solar_power",
                  titel: "Solceller",
                  text: "Producera elen du laddar bilen med, ladda gratis när solen står på.",
                  href: "/sidtyper/produktsida-leadsgen",
                },
                {
                  ikon: "support_agent",
                  titel: "Energirådgivning",
                  text: "Kostnadsfri genomgång av ditt hushålls elanvändning, vi hittar var du kan spara mest.",
                  href: "#",
                },
                {
                  ikon: "heat_pump",
                  titel: "Värmepump",
                  text: "Kombinera smart laddning med smart uppvärmning, värm huset när elen är som billigast.",
                  href: "#",
                },
              ]}
            />
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <PageBrief
        kategori="Produktsida direktköp (Ladda Smart)"
        syfte="Säljande produktsida som leder till direktköp via formulär. Hierarki är: värde först (hero + USP), produktinfo, process, social proof, beställning, FAQ. Konvertering är primär, pris och CTA syns högt på sidan, formuläret är 3-stegs så avhopp blir mätbara per steg."
        malgrupp="Privatkund som har bestämt sig för att skaffa elbilsladdning hemma och vill jämföra alternativ. Ofta efter en initial research-fas, vill se pris, villkor och process snabbt."
        primarHandling="Klicka 'Beställ Ladda Smart' i hero ELLER fyll i adress i formuläret längre ned."
        ton="Konkret, säljande utan att vara påflugen. Pris och tid alltid synliga, inga dolda steg. Inga adjektiv som 'fantastisk' eller 'banbrytande'."
      />

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

      <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mt-4 mb-2">
        <ol className="flex gap-1">
          <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
          <li aria-hidden="true">›</li>
          <li><a href="#" className="hover:text-brand-accent">Smarta produkter</a></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink">Ladda Smart</li>
        </ol>
      </nav>

      {/* Layouten är delad i två spår:
          1. Block FÖRE formuläret renderas i 2-col grid med sticky-panel höger.
          2. Formulär-blocket och allt efter (FAQ) renderas i full bredd,             panelen hör inte hemma där eftersom användaren redan nått köpyttan.
          Båda BlockList-instanserna delar samma pageId så preset/edit-state
          fungerar konsistent över hela sidan. */}
      {(() => {
        const formIdx = blocks.findIndex((b) => b.id === "bestall");
        const beforeForm = formIdx >= 0 ? blocks.slice(0, formIdx) : blocks;
        const formAndAfter = formIdx >= 0 ? blocks.slice(formIdx) : [];
        return (
          <>
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8 lg:mt-2">
              <div className="min-w-0">
                <BlockList pageId="produktsida-direktkop" blocks={beforeForm} />
              </div>
              <div className="hidden lg:block pt-8 sm:pt-12">
                <StickyPurchaseSidebar
                  eyebrow="Din beställning"
                  title="14 900 kr"
                  subtitle="inkl. installation · rotavdrag dras av direkt"
                  ctaLabel="Beställ Ladda Smart"
                  ctaHref="#bestall"
                  reassurance={[
                    "Du betalar först efter besiktning",
                    "14 dagars ångerrätt",
                    "Klart inom 2 veckor",
                  ]}
                  hideWhenSelector="#bestall"
                />
              </div>
            </div>

            {formAndAfter.length > 0 && (
              <BlockList pageId="produktsida-direktkop" blocks={formAndAfter} />
            )}
          </>
        );
      })()}

      <StickyPurchaseBottomBar
        eyebrow="Ladda Smart"
        title="14 900 kr"
        subtitle="inkl. installation · rotavdrag"
        ctaLabel="Beställ"
        ctaHref="#bestall"
        hideWhenSelector="#bestall"
      />
    </div>
  );
}
