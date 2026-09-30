import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { WizardProgress, type WizardVariant } from "../../components/WizardProgress";
import { StickyPurchaseBottomBar } from "../../components/StickyPurchasePanel";
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
 * SIDTYP 10b: Produktsida direktköp v2 (köprad i botten)
 *
 * Variant av Direktköp där den fasta köppanelen till höger är ersatt med en
 * fast köprad längst ned, som visas på alla skärmstorlekar. Hero och alla
 * innehållsblock får full bredd i stället för två kolumner.
 *
 * UX-motivering (Spool/Krug): direktköp är en transaktion. Användaren har
 * bestämt sig och behöver bara nå beställningen. En köprad i botten är ett
 * etablerat mönster i e-handel (Klarna, Ikea, Apple Store) och ger:
 *  - en CTA som alltid syns utan att ta yta från innehållet
 *  - mindre visuellt brus än en sidopanel
 *  - samma mönster på dator och mobil, vilket gör sidan konsekvent.
 *
 * Köpraden döljs automatiskt när formuläret kommer i bild, precis som
 * köpraden på mobil i originalvarianten.
 *
 * UX-principer:
 *  1. Hero äger värdeerbjudandet: produktnamn, en mening om nyttan och
 *     klickbara punkter till sidans fördjupning. Pris och CTA ligger i köpraden.
 *  2. Skanningsbarhet: USP-raden direkt under hero ger fyra fakta på fem sekunder.
 *  3. Transparent pris: priset syns vid CTA:n, inte gömt i en fotnot.
 *  4. Så här går det till: sänker tröskeln ("vad händer efter beställningen?").
 *  5. Kundcase före formuläret, för den som ännu inte har bestämt sig.
 *  6. Formulär som kassa: tre steg med samma mönster som kontaktflödet,
 *     så användaren känner igen det.
 *  7. FAQ sist, för mer ovanliga frågor som den tveksamme har.
 */

type Steg = { ikon: string; titel: string; text: string; tid?: string };

const STEG: Steg[] = [
  { ikon: "shopping_cart", titel: "1. Beställ", text: "Fyll i adressen och dina kontaktuppgifter. Det tar ungefär 5 minuter.", tid: "5 min" },
  { ikon: "home_repair_service", titel: "2. Besiktning", text: "Vi kontaktar dig inom 3 arbetsdagar och bokar en besiktning hemma hos dig. Den är kostnadsfri.", tid: "Inom 3 arbetsdagar" },
  { ikon: "build", titel: "3. Installation", text: "En certifierad elektriker monterar laddboxen. Samma dag kan du styra laddningen i appen.", tid: "1 dag" },
];

const USP_DATA = [
  { ikon: "savings", titel: "Lägre laddningspris", text: "Laddboxen laddar automatiskt när elen är som billigast." },
  { ikon: "verified", titel: "Vi sköter rotavdraget", text: "Vi drar av 30 % av arbetskostnaden direkt på fakturan." },
  { ikon: "schedule", titel: "Klart inom 2 veckor", text: "Från beställning till färdig installation. Ingen väntelista." },
  { ikon: "shield", titel: "5 års garanti", text: "Gäller både laddbox och installation. Om något går fel tar vi hand om servicen." },
];

// Produkten som hela sidan handlar om. Ladda Smart valdes som
// representativt exempel på direktköp.
const PRODUKT = PRODUKTER.find((p) => p.id === "ladda-smart")!;

export function ProduktsidaDirektkop2() {
  /* ─── Köpflödets tillstånd ────────────────────────────────────── */
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

  // Fokus flyttas till stegets rubrik vid stegbyte, samma mönster som kontaktflödet
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

  /* ─── Beställningsflöde i tre steg ───────────────────────────── */
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
        label="Beställningsflöde i tre steg"
        audience="user"
        rationale="Direktköp kräver mer förtroende än ett kontaktformulär, eftersom kunden lämnar adress och personnummer. Flödet börjar därför med adressen (lågt hinder), fortsätter med personuppgifter och avslutas med ordernummer och nästa steg. Stegmönstret är detsamma som i kontaktflödet."
      >
        <section id="bestall" className="py-10 border-t border-border-subtle">
          <Copy
            label="Formulärets rubrik och ingress"
            category="rubrik"
            text="Beställ Ladda Smart. Tre korta steg. Du får en orderbekräftelse direkt och vi kontaktar dig inom 3 arbetsdagar."
            rationale="Rubriken upprepar köpknappens ord, så kunden ser att hen kommit rätt. Ingressen svarar på två oro-frågor innan de ställs: hur lång tid det tar och vad som händer sedan. Undvik 'Fyll i formuläret', det beskriver jobbet i stället för målet."
          >
            <div>
              <WizardProgress
                variant={progressVariant}
                title="Beställ Ladda Smart"
                subtitle="Tre korta steg. Du får en orderbekräftelse direkt och vi kontaktar dig inom 3 arbetsdagar."
                steps={[
                  { key: "adress", label: "Adress" },
                  { key: "uppgifter", label: "Uppgifter" },
                  { key: "klart", label: "Klart" },
                ]}
                current={orderStep}
              />
            </div>
          </Copy>

          <div className="rounded-md border-2 border-border-subtle bg-surface p-5 sm:p-6">
            {/* Sammanfattning av beställningen, syns i steg 1 och 2 */}
            {orderStep < 3 && (
              <Annotation
                label="Sammanfattning av beställningen"
                audience="user"
                rationale="Visar produkt och pris under steg 1 och 2. Kunden ser hela tiden vad hen beställer och vad det kostar, och behöver inte skrolla tillbaka för att kontrollera."
              >
                <div className="mb-5 pb-4 border-b border-border-subtle">
                  <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-1">
                    Din beställning
                  </p>
                  <p className="font-medium">Ladda Smart</p>
                  <Copy
                    label="Pris i sammanfattningen"
                    category="metadata"
                    text="14 900 kr inkl. installation · rotavdraget dras av direkt på fakturan"
                    rationale="Samma pris och samma ordval som i köpraden, så kunden inte undrar om det är två olika belopp. 'Direkt på fakturan' förklarar att kunden inte behöver ansöka om rotavdraget själv."
                  >
                    <p className="text-sm text-ink-secondary">14 900 kr inkl. installation · rotavdraget dras av direkt på fakturan</p>
                  </Copy>
                </div>
              </Annotation>
            )}

            {/* Steg 1: Installationsadress */}
            {orderStep === 1 && (
              <Annotation
                label="Steg 1: installationsadress"
                audience="user"
                rationale="Första steget frågar bara efter adressen, något kunden kan svara på utan att tveka. Knappen blir aktiv när alla tre fälten är ifyllda. I en skarp version behövs felmeddelanden vid fälten, så kunden förstår varför knappen inte går att klicka på."
              >
                <div>
                  <Copy
                    label="Steg 1, rubrik"
                    category="rubrik"
                    text="Var ska laddboxen sitta?"
                    rationale="En fråga i vardagsspråk i stället för fältnamnet 'Installationsadress'. Kunden tänker på sitt garage, inte på en adress i ett system."
                  >
                    <h3
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
                    >
                      Var ska laddboxen sitta?
                    </h3>
                  </Copy>
                  <Copy
                    label="Steg 1, hjälptext"
                    category="reassurance"
                    text="Ange adressen där laddboxen ska installeras. Vid besiktningen kontrollerar vi att elcentralen klarar installationen."
                    rationale="Förklarar varför adressen behövs och att kunden inte själv behöver veta om elen räcker. Det tar bort ett vanligt skäl att avbryta. Undvik tekniska krav här; de står under Villkor."
                  >
                    <p className="text-sm text-ink-secondary mb-4">
                      Ange adressen där laddboxen ska installeras. Vid besiktningen kontrollerar vi att elcentralen klarar installationen.
                    </p>
                  </Copy>
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
                  <Copy
                    label="Steg 1, knapp"
                    category="cta"
                    text="Fortsätt till dina uppgifter"
                    rationale="Säger vart knappen leder, inte bara att det finns mer. Kunden vet att nästa steg handlar om personuppgifter och blir inte överraskad. Undvik 'Nästa' eller 'Skicka'."
                  >
                    <button
                      type="button"
                      disabled={!kanFortsattaSteg1}
                      onClick={() => setOrderStep(2)}
                      className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Fortsätt till dina uppgifter
                      <Icon name="arrow_forward" size={16} />
                    </button>
                  </Copy>
                </div>
              </Annotation>
            )}

            {/* Steg 2: Personliga uppgifter */}
            {orderStep === 2 && (
              <Annotation
                label="Steg 2: personuppgifter och godkännande"
                audience="user"
                rationale="Här lämnar kunden de känsligaste uppgifterna, så varje fält motiveras och trygghetsraden står intill knappen. Knappen blir aktiv när alla fält är ifyllda och villkoren godkända. I en skarp version behövs felmeddelanden vid fälten."
              >
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
                  <Copy
                    label="Varför vi behöver personnummer"
                    category="reassurance"
                    text="Vi behöver ditt personnummer för rotavdraget och en kreditupplysning. Vi sparar bara de uppgifter vi måste."
                    rationale="Personnummer är det fält där flest tvekar. Att säga varför ('för rotavdraget') innan kunden frågar minskar avhoppen. Skriv konkret vad uppgiften används till, inte bara 'av säkerhetsskäl'."
                  >
                    <p className="text-sm text-ink-secondary mb-4">
                      Vi behöver ditt personnummer för rotavdraget och en kreditupplysning. Vi sparar bara de uppgifter vi måste.
                    </p>
                  </Copy>
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
                          Telefonnummer
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
                    <Copy
                      label="Godkännande av villkor"
                      category="metadata"
                      text="Jag godkänner avtalsvillkoren och har läst integritetspolicyn."
                      rationale="Kunden godkänner avtalet men läser integritetspolicyn, den är information och inget man samtycker till. Formuleringen är juridiskt korrekt och ärlig. Båda länkarna ska öppnas i nytt fönster så att ifyllda uppgifter inte försvinner."
                    >
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
                          och har läst{" "}
                          <a href="#" className="text-brand-accent underline underline-offset-2">integritetspolicyn</a>.
                        </span>
                      </label>
                    </Copy>
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
                    <Copy
                      label="Skicka beställningen, knapp"
                      category="cta"
                      text="Skicka beställning"
                      rationale="Beskriver exakt vad som händer: beställningen skickas, men inga pengar dras. Undvik 'Köp' och 'Betala', eftersom kunden inte betalar förrän efter installationen."
                    >
                      <button
                        type="submit"
                        disabled={!kanSkicka}
                        className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Skicka beställning
                        <Icon name="check" size={16} />
                      </button>
                    </Copy>
                  </div>
                  <Copy
                    label="Trygghetsrad vid knappen"
                    category="reassurance"
                    text="Du betalar ingenting nu. Fakturan kommer när installationen är klar. Inga dolda avgifter."
                    rationale="Står direkt under knappen, där oron för att binda sig är som störst. Tre korta meningar: inget dras nu, när fakturan kommer och att inget tillkommer i hemlighet."
                  >
                    <p className="text-xs text-ink-muted mt-3">
                      Du betalar ingenting nu. Fakturan kommer när installationen är klar. Inga dolda avgifter.
                    </p>
                  </Copy>
                </form>
              </Annotation>
            )}

            {/* Steg 3: Bekräftelse */}
            {orderStep === 3 && (
              <Annotation
                label="Steg 3: orderbekräftelse"
                audience="user"
                rationale="Bekräftar att beställningen har kommit fram och visar ordernummer, adress och när kunden betalar. Listan med nästa steg svarar på 'vad händer nu?' så att kunden inte behöver ringa kundservice."
              >
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
                        label="Orderbekräftelse, rubrik"
                        category="rubrik"
                        text="Tack, vi har tagit emot din beställning"
                        rationale="'Tack' först, för att det låter mänskligt, sedan beskedet. 'Vi har tagit emot' säger att det är klart och att kunden kan släppa oron. Undvik passiv myndighetssvenska som 'Beställningen är registrerad'."
                      >
                        <h3
                          ref={stepHeadingRef}
                          tabIndex={-1}
                          className="text-h5 font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
                        >
                          Tack, vi har tagit emot din beställning
                        </h3>
                      </Copy>
                      <Copy
                        label="Bekräftelse via e-post"
                        category="reassurance"
                        text="Vi har skickat en orderbekräftelse till din e-post."
                        rationale="Visar kundens egen e-postadress, så hen kan se att den är rätt stavad och vet var bekräftelsen hamnar. Aktiv form ('Vi har skickat') i stället för 'En bekräftelse är skickad'."
                      >
                        <p className="text-sm text-ink-secondary">
                          Vi har skickat en orderbekräftelse till <strong className="text-ink">{epost || "din e-post"}</strong>.
                        </p>
                      </Copy>
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
                      <dt className="text-xs uppercase tracking-wider text-ink-muted font-medium">Installationsadress</dt>
                      <dd className="font-medium">{adress}, {postnr} {ort}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ink-muted font-medium">Du betalar</dt>
                      <dd className="font-medium">När installationen är klar</dd>
                    </div>
                  </dl>
                  <Copy
                    label="Nästa steg efter beställningen"
                    category="reassurance"
                    text="Det här händer nu: Vi har tagit emot din beställning (klart). Vi kontaktar dig inom 3 arbetsdagar och bokar besiktning. Kostnadsfri besiktning hemma hos dig. En certifierad elektriker installerar laddboxen, oftast inom 2 veckor. Du får fakturan när installationen är klar, med rotavdraget redan avdraget."
                    rationale="Samma tider och ordval som i 'Så här går det till', så beskeden stämmer överens. Första punkten är överstruken och märkt 'klart', så kunden ser att processen redan är igång. Varje punkt börjar med vem som gör vad."
                  >
                    <div className="mb-5">
                      <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                        Det här händer nu
                      </p>
                      <ol className="space-y-2">
                        {[
                          "Vi har tagit emot din beställning (klart)",
                          "Vi kontaktar dig inom 3 arbetsdagar och bokar besiktning",
                          "Kostnadsfri besiktning hemma hos dig",
                          "En certifierad elektriker installerar laddboxen, oftast inom 2 veckor",
                          "Du får fakturan när installationen är klar, med rotavdraget redan avdraget",
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
                  </Copy>
                  <div className="flex flex-wrap gap-2">
                    <Copy
                      label="Följ ordern, knapp"
                      category="cta"
                      text="Följ ordern på Mina sidor"
                      rationale="Ger kunden något att göra efter köpet och visar var hen hittar sin order senare. Verb och mål i samma knapp, så man vet vad som händer vid klick."
                    >
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 border border-border-strong text-brand-primary font-medium px-4 py-2.5 rounded hover:bg-tint-info text-sm"
                      >
                        <Icon name="person" size={16} />
                        Följ ordern på Mina sidor
                      </a>
                    </Copy>
                    <button
                      type="button"
                      onClick={reinitOrder}
                      className="inline-flex items-center gap-1.5 text-ink-secondary hover:text-brand-accent text-sm px-3 py-2.5"
                    >
                      <Icon name="restart_alt" size={16} />
                      Gör en ny beställning
                    </button>
                  </div>
                </div>
              </Annotation>
            )}
          </div>
        </section>
      </Annotation>
    );
  }

  /* ─── Sidans block ─────────────────────────────────────────────── */

  const blocks: BlockDef[] = [
    /* ─── 1. HERO: produktnamn och nytta ──────────────────────── */
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "produkt",
          label: "Produkthero: namn och USP",
          render: () => (
            <Annotation
              label="Hero: produktnamn och nytta"
              audience="user"
              rationale="Hero säger direkt vad produkten är och vad den löser: produktnamnet som rubrik och en mening om nyttan. Bilden visar produkten, inte en livsstil, eftersom besökaren redan valt att titta på den. Pris och köpknapp finns i köpraden längst ned."
            >
              <section className="py-8 sm:py-12 grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-eyebrow uppercase text-ink-muted mb-3">Elbil & laddning</p>
                  <Copy
                    label="H1, produktnamn"
                    category="rubrik"
                    text="Ladda Smart"
                    rationale="Produktnamnet räcker som rubrik. Besökaren har klickat på just Ladda Smart och vill få bekräftat att hen kommit rätt. Undvik beskrivande rubriker som 'Hemmaladdning för elbil'; nyttan hör hemma i ingressen."
                  >
                    <h1 className="text-display leading-tight mb-3">Ladda Smart</h1>
                  </Copy>
                  <Copy
                    label="Ingress, nyttan i en mening"
                    category="reassurance"
                    text="Ladda elbilen hemma på natten, när elen är billigast. Vi installerar allt inom 2 veckor."
                    rationale="Två korta meningar med tre fakta: var (hemma), varför (billigare el på natten) och hur snabbt (2 veckor). Du-tilltal och konkreta löften i stället för adjektiv som 'smidig' eller 'smart'."
                  >
                    <p className="text-lede text-ink-secondary mb-5 leading-relaxed">
                      Ladda elbilen hemma på natten, när elen är billigast. Vi installerar allt inom 2 veckor.
                    </p>
                  </Copy>

                  {/* Punktlista med länkar till sidans fördjupande sektioner.
                     Fyller två funktioner: snabb, skanningsbar trygghet och
                     genvägar till rätt sektion längre ned. */}
                  <Annotation
                    label="Hero-punkter: genvägar in på sidan"
                    audience="user"
                    rationale="Hero har ingen köpknapp, den finns i köpraden. Punkterna ger i stället snabba fakta och genvägar: den som undrar över priset hoppar till produktinfo, andra till processen eller FAQ. Besökaren väljer själv sin väg in."
                  >
                    <div>
                      <Copy
                        label="Hero-punkter"
                        category="reassurance"
                        text="14 900 kr inkl. installation, rotavdraget dras av direkt · Klart inom 2 veckor, från beställning till färdig installation · 5 års garanti och 14 dagars ångerrätt"
                        rationale="Varje punkt svarar på en vanlig fråga före köp: vad det kostar, hur lång tid det tar och vad som händer om något går fel. Siffrorna står först så att de syns när man skummar. Samma belopp och tider som i resten av sidan."
                      >
                        <ul className="space-y-2">
                          {[
                            { ikon: "savings", text: "14 900 kr inkl. installation, rotavdraget dras av direkt", anchor: "#produktinfo" },
                            { ikon: "schedule", text: "Klart inom 2 veckor, från beställning till färdig installation", anchor: "#process" },
                            { ikon: "shield", text: "5 års garanti och 14 dagars ångerrätt", anchor: "#faq" },
                          ].map((b) => (
                            <li key={b.text}>
                              <a
                                href={b.anchor}
                                className="group flex items-center gap-3 py-2 -mx-2 px-2 rounded hover:bg-tint-info focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors"
                              >
                                <Icon name={b.ikon} size={20} className="text-brand-accent shrink-0" />
                                <span className="flex-1 text-base text-ink-secondary group-hover:text-ink">
                                  {b.text}
                                </span>
                                <Icon
                                  name="arrow_forward"
                                  size={14}
                                  className="text-ink-muted shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-brand-accent motion-reduce:transition-none"
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </Copy>
                    </div>
                  </Annotation>
                  {/* Pris, primär CTA och trygghetsrader ligger i köpraden i botten.
                     Hero håller värdeerbjudandet och genvägarna. */}
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

    /* ─── 2. USP-RAD: fyra faktakort ──────────────────────────── */
    {
      id: "usp",
      label: "USP-rad, fyra fakta",
      variants: [
        {
          key: "ikoner",
          label: "Ikonkort i rutnät",
          render: () => (
            <Annotation
              label="USP-kort: fyra snabba fakta"
              audience="user"
              rationale="Ligger direkt under hero, så besökaren får fyra konkreta fördelar utan att skrolla långt. Ikonerna gör korten lätta att skilja åt. Samma kortmönster som på startsidorna, så besökaren känner igen det."
            >
              <section className="py-8 border-t border-border-subtle">
                <Copy
                  label="USP-kortens rubriker"
                  category="rubrik"
                  text="Lägre laddningspris · Vi sköter rotavdraget · Klart inom 2 veckor · 5 års garanti"
                  rationale="Varje rubrik är en fördel som går att läsa på en sekund, med siffra där det finns en. Brödtexten under förklarar hur. Undvik abstrakta ord som 'Trygghet' eller 'Enkelhet' som rubrik; de säger inget om vad kunden får."
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    {USP_DATA.map((u) => (
                      <div key={u.titel} className="p-4 rounded-md bg-surface border border-border-subtle">
                        <Icon name={u.ikon} size={28} className="text-brand-accent mb-2" />
                        <h3 className="font-medium mb-1 text-sm">{u.titel}</h3>
                        <p className="text-sm text-ink-secondary leading-snug">{u.text}</p>
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

    /* ─── 3. PRODUKTINFO: information utan pris och CTA ─────────
     * Standard: ren informationsvariant utan pris och CTA, eftersom
     * köpraden ansvarar för pris och beställning. Trygg, Progressiv
     * och Köp finns kvar som alternativ för sidor utan köprad. */
    {
      id: "produktinfo",
      label: "Produktinfo",
      variants: [
        {
          key: "info-only",
          label: "Bara information: bild, ingår, villkor, varför (standard)",
          render: () => (
            <Annotation
              label="Produktinfo: bara information"
              audience="design"
              rationale="Här finns bara information: bild, beskrivning, vad som ingår, villkor och varför produkten passar. Pris och köpknapp ligger i köpraden längst ned. En plats för köp och en för information gör sidan lättare att överblicka."
            >
              <section id="produktinfo" className="py-10 border-t border-border-subtle">
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
                    <Copy
                      label="Villkor, rubrik"
                      category="rubrik"
                      text="Villkor"
                      rationale="Rak rubrik som är lätt att hitta för den som letar efter förbehåll innan köpet. Undvik mjukare varianter som 'Bra att veta', de döljer att det handlar om krav på bostaden."
                    >
                      <h3 className="text-h5 font-medium mb-3">Villkor</h3>
                    </Copy>
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
                    <Copy
                      label="Varför-rubrik"
                      category="rubrik"
                      text={`Varför ${PRODUKT.namn}?`}
                      rationale="Formulerad som kundens egen fråga, så listan under läses som svar och inte som reklam. Redaktören byter produktnamn i produktdatan; rubriken följer med."
                    >
                      <h3 className="text-h5 font-medium mb-3">Varför {PRODUKT.namn}?</h3>
                    </Copy>
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
          label: "Progressiv: flikar med pris och CTA (dubblerar köpraden)",
          render: () => (
            <section id="produktinfo" className="py-10 border-t border-border-subtle">
              <ProduktinfoProgressiv produkt={PRODUKT} inline />
            </section>
          ),
        },
        {
          key: "trygg",
          label: "Trygg: två kolumner med pris och CTA (dubblerar köpraden)",
          render: () => (
            <section id="produktinfo" className="py-10 border-t border-border-subtle">
              <ProduktinfoTrygg produkt={PRODUKT} inline />
            </section>
          ),
        },
        {
          key: "kop",
          label: "Köpfokuserad: egen fast sidopanel (dubblerar köpraden)",
          render: () => (
            <section id="produktinfo" className="py-10 border-t border-border-subtle">
              <ProduktinfoKop produkt={PRODUKT} inline />
            </section>
          ),
        },
      ],
    },

    /* ─── 4. SÅ HÄR GÅR DET TILL: tre steg ──────────────────── */
    {
      id: "process",
      label: "Så här går det till",
      variants: [
        {
          key: "tre-steg",
          label: "Tre steg bredvid varandra",
          render: () => (
            <Annotation
              label="Så här går det till: tre steg"
              audience="user"
              rationale="Vid direktköp lämnar kunden adress och personnummer, så tröskeln är högre än för ett kontaktformulär. Här visas exakt vad som händer efter beställningen, så det inte känns som att hoppa i blindo. Tidsangivelserna sätter rätt förväntningar."
            >
              <section id="process" className="py-10 border-t border-border-subtle">
                <Copy
                  label="Processens rubrik"
                  category="rubrik"
                  text="Så här går det till"
                  rationale="Välkänd formulering som alla förstår direkt. 'Vad händer när du har beställt?' är mer specifik men längre och passar bättre som FAQ-fråga."
                >
                  <h2 className="text-h3 font-medium mb-2">Så här går det till</h2>
                </Copy>
                <Copy
                  label="Processens ingress"
                  category="reassurance"
                  text="Från beställning till färdig installation tar det oftast 2 veckor."
                  rationale="Svarar på den viktigaste frågan, hur lång tid det tar, innan stegen visas. 'Oftast' är ärligt: ledtiden kan variera och vi lovar inte mer än vi kan hålla."
                >
                  <p className="text-ink-secondary mb-6 max-w-reading">
                    Från beställning till färdig installation tar det oftast 2 veckor.
                  </p>
                </Copy>
                <Copy
                  label="Stegen och tidsangivelserna"
                  category="reassurance"
                  text="1. Beställ · 2. Besiktning · 3. Installation"
                  rationale="Varje steg har en kort rubrik, en mening om vad som händer och en tid. Tiderna ska stämma med orderbekräftelsen (3 arbetsdagar, 2 veckor). Ändrar redaktören en tid här ska den ändras på båda ställena."
                >
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
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. KUNDCASE: modul med tre varianter ───────────────── */
    {
      id: "kundcase",
      label: "Kundcase",
      variants: [
        {
          key: "story",
          label: "Kundberättelse (standard, fördjupning)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <KundcaseStory />
            </section>
          ),
        },
        {
          key: "grid",
          label: "Citatkort i rutnät, bredd",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <KundcaseGrid />
            </section>
          ),
        },
        {
          key: "hero",
          label: "Ett stort citat",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <KundcaseHero />
            </section>
          ),
        },
      ],
    },

    /* ─── 6. BESTÄLLNINGSFLÖDE: tre steg ─────────────────────── */
    {
      id: "bestall",
      label: "Beställningsflöde",
      variants: [
        {
          key: "stepper",
          label: "Stegindikator med cirklar och etiketter (standard)",
          render: () => renderOrderFlow("stepper"),
        },
        {
          key: "bar",
          label: "Förloppsindikator, kompakt",
          render: () => renderOrderFlow("bar"),
        },
        {
          key: "chips",
          label: "Stegindikator med etiketter i rad",
          render: () => renderOrderFlow("chips"),
        },
      ],
    },

    /* ─── 7. FAQ: modul ──────────────────────────────────────── */
    {
      id: "faq",
      label: "FAQ",
      variants: [
        {
          key: "accordion",
          label: "Utfällbar lista (standard)",
          render: () => (
            <section id="faq" className="py-10 border-t border-border-subtle [&_section]:max-w-none">
              <FaqAccordion />
            </section>
          ),
        },
        {
          key: "grupperad",
          label: "Grupperad: före, under och efter köpet",
          render: () => (
            <section id="faq" className="py-10 border-t border-border-subtle">
              <FaqGrupperad />
            </section>
          ),
        },
        {
          key: "sok",
          label: "Sökfält och vanligaste frågorna",
          render: () => (
            <section id="faq" className="py-10 border-t border-border-subtle [&_section]:max-w-none">
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
          label: "Produkter som kompletterar, tre ikonkort",
          render: () => (
            <RelateradeProdukter
              produkter={[
                {
                  ikon: "solar_power",
                  titel: "Solceller",
                  text: "Gör din egen el och ladda bilen med solkraft när solen skiner.",
                  href: "/sidtyper/produktsida-leadsgen",
                },
                {
                  ikon: "support_agent",
                  titel: "Energirådgivning",
                  text: "Gratis genomgång av hushållets elanvändning. Vi visar var du kan spara mest.",
                  href: "#",
                },
                {
                  ikon: "heat_pump",
                  titel: "Värmepump",
                  text: "Styr både laddning och uppvärmning efter elpriset. Huset värms när elen är billigast.",
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
        kategori="Produktsida direktköp v2 (Ladda Smart, köprad i botten)"
        syfte="Sälja Ladda Smart direkt via ett beställningsformulär på sidan. Ordningen är värde (hero och USP-rad), produktinfo, så här går det till, kundcase, beställning och FAQ. Pris och köpknapp syns hela tiden i en fast köprad längst ned, på både dator och mobil. Punkterna i hero leder vidare till produktinfo, process och FAQ. Formuläret har tre steg, så att avhopp kan mätas per steg."
        malgrupp="Privatkund som har bestämt sig för att ladda elbilen hemma och jämför alternativ. Har ofta redan läst på och vill snabbt se pris, villkor och vad som händer efter beställningen."
        primarHandling="Klicka på 'Beställ Ladda Smart' i köpraden längst ned och skicka beställningen i formuläret."
        ton="Konkret och säljande utan att vara påträngande. Pris och tider syns alltid och inga steg är dolda. Undvik värdeladdade ord som 'fantastisk' och 'banbrytande'."
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

      <Annotation
        label="Brödsmulor"
        audience="design"
        rationale="Visar var sidan ligger på webbplatsen och ger en väg tillbaka till Smarta produkter, för den som vill jämföra med andra produkter innan köpet."
      >
        <nav aria-label="Brödsmulor" className="text-xs text-ink-muted mt-4 mb-2">
          <ol className="flex gap-1">
            <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
            <li aria-hidden="true">›</li>
            <li><a href="#" className="hover:text-brand-accent">Smarta produkter</a></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="font-medium text-ink">Ladda Smart</li>
          </ol>
        </nav>
      </Annotation>

      {/* Layout i full bredd. Ingen sidopanel i två kolumner, i stället en fast
          köprad längst ned (synlig på dator och mobil) som äger beställningen.
          Köpraden döljs när formuläret kommer i bild. */}
      <BlockList pageId="produktsida-direktkop2" blocks={blocks} />

      {/* Tomrum längst ned så att den större köpraden inte täcker det sista innehållet */}
      <div className="h-32" aria-hidden="true" />

      <Annotation
        label="Fast köprad: pris och CTA"
        audience="design"
        rationale="Köpraden ligger kvar längst ned när man skrollar, på både dator och mobil, så pris och köpknapp alltid syns utan att ta plats från innehållet. Den döljs när formuläret kommer i bild, så att köpknappen inte finns på två ställen."
      >
        <div>
          <Copy
            label="Köprad, pris och CTA"
            category="cta"
            text="Ladda Smart · 14 900 kr · inkl. installation · rotavdraget dras av direkt · Beställ Ladda Smart"
            rationale="Knappen upprepar produktnamnet, så den går att förstå även utan sammanhang, till exempel med skärmläsare. Undvik 'Köp nu', kunden betalar först efter installationen. Prisraden använder samma ord som i formulärets sammanfattning."
          >
            <div>
              <StickyPurchaseBottomBar
                eyebrow="Ladda Smart"
                title="14 900 kr"
                subtitle="inkl. installation · rotavdraget dras av direkt"
                ctaLabel="Beställ Ladda Smart"
                ctaHref="#bestall"
                hideWhenSelector="#bestall"
                desktopVisible
                size="lg"
              />
            </div>
          </Copy>
        </div>
      </Annotation>
    </div>
  );
}
