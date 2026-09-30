import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { Icon } from "../../components/Icon";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { FormularKonversation } from "./variants/FormularKonversation";

/* ─── Variant A, Klassiskt formulär: allt på en sida ──────────────── */
function FormTrygg() {
  return (
    <Annotation
      label="Klassiskt formulär"
      audience="design"
      rationale="Alla fält syns på en och samma sida, uppifrån och ned, med en knapp längst ned. Kunden ser direkt hur mycket som ska fyllas i. Förutsägbart och lätt att använda med skärmläsare tack vare synliga fältetiketter."
    >
      <div className="max-w-reading">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Sammanfattning av beställningen */}
          <Annotation
            label="Sammanfattning av beställningen"
            audience="redaktör"
            rationale="Fyll i produktnamn och pris exakt som på produktsidan, och skriv vad som ingår. Kunden ska känna igen det hen valde innan hen lämnar sina uppgifter."
          >
            <div className="rounded-md bg-tint-info p-4 mb-6">
              <p className="text-sm font-medium mb-1">Din beställning</p>
              <p className="text-h4 font-medium">Ladda Smart</p>
              <Copy
                label="Pris i sammanfattningen"
                category="metadata"
                text="Från 14 900 kr, installation ingår"
                rationale="'Installation ingår' svarar på den vanligaste frågan om priset. Tydligare än förkortningen 'inkl.'."
              >
                <p className="text-sm text-ink-muted">Från 14 900 kr, installation ingår</p>
              </Copy>
            </div>
          </Annotation>

          <Annotation
            label="Kunduppgifter"
            audience="user"
            rationale="Varje fält har en etikett ovanför som syns hela tiden, även när kunden skriver. Fält som hör ihop, som förnamn och efternamn, står bredvid varandra så att formuläret känns kortare."
          >
          <fieldset>
            <Copy
              label="Rubrik för kunduppgifter"
              category="rubrik"
              text="Dina uppgifter"
              rationale="'Dina' gör det personligt och säger att det handlar om kunden. Undvik 'Personuppgifter' eller 'Kunddata', som låter som ett register."
            >
              <legend className="text-h5 font-medium mb-3">Dina uppgifter</legend>
            </Copy>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fornamn-a" className="block text-sm font-medium mb-1">Förnamn</label>
                  <input id="fornamn-a" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
                <div>
                  <label htmlFor="efternamn-a" className="block text-sm font-medium mb-1">Efternamn</label>
                  <input id="efternamn-a" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
              </div>
              <div>
                <label htmlFor="personnr-a" className="block text-sm font-medium mb-1">Personnummer</label>
                <input id="personnr-a" type="text" placeholder="ÅÅÅÅMMDD-XXXX" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm placeholder:text-ink-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                <Copy
                  label="Hjälptext, personnummer"
                  category="reassurance"
                  text="Vi behöver det för kreditupplysningen och för att dra av rotavdraget åt dig."
                  rationale="Personnummer är det känsligaste fältet. Texten säger varför vi frågar och vad kunden tjänar på det (rotavdraget), innan hen hinner tveka."
                >
                  <p className="text-xs text-ink-muted mt-1">Vi behöver det för kreditupplysningen och för att dra av rotavdraget åt dig.</p>
                </Copy>
              </div>
              <div>
                <label htmlFor="adress-a" className="block text-sm font-medium mb-1">Installationsadress</label>
                <input id="adress-a" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postnr-a" className="block text-sm font-medium mb-1">Postnummer</label>
                  <input id="postnr-a" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
                <div>
                  <label htmlFor="ort-a" className="block text-sm font-medium mb-1">Ort</label>
                  <input id="ort-a" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
              </div>
              <div>
                <label htmlFor="epost-a" className="block text-sm font-medium mb-1">E-postadress</label>
                <input id="epost-a" type="email" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
              </div>
              <div>
                <label htmlFor="telefon-a" className="block text-sm font-medium mb-1">Telefonnummer</label>
                <input id="telefon-a" type="tel" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
              </div>
            </div>
          </fieldset>
          </Annotation>

          <div className="flex items-start gap-3">
            <input type="checkbox" id="villkor-a" className="mt-1 w-4 h-4 accent-brand-primary" />
            <Copy
              label="Godkännande av villkor"
              category="ton"
              text="Jag godkänner avtalsvillkoren och har läst integritetspolicyn."
              rationale="Kunden godkänner villkoren men läser integritetspolicyn, eftersom den inte är något man godkänner. Samma formulering i alla varianter."
            >
              <label htmlFor="villkor-a" className="text-sm text-ink-secondary">
                Jag godkänner <a href="#" className="text-brand-accent underline">avtalsvillkoren</a> och har läst{" "}
                <a href="#" className="text-brand-accent underline">integritetspolicyn</a>.
              </label>
            </Copy>
          </div>

          <Copy
            label="Skicka-knapp"
            category="cta"
            text="Skicka beställning"
            rationale="Verb plus objekt: kunden vet att beställningen skickas när hen klickar. Aldrig bara 'Skicka' eller 'Submit'."
          >
            <button type="submit" className="w-full bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity">
              Skicka beställning
            </button>
          </Copy>
          <Copy
            label="Trygghetsrad under knappen"
            category="reassurance"
            text="14 dagars ångerrätt · Vi kontaktar dig inom 3 arbetsdagar"
            rationale="Svarar på två frågor precis när kunden ska bestämma sig: kan jag ångra mig, och vad händer sedan? Kort och konkret, med siffror i stället för 'snart'."
          >
            <p className="text-xs text-ink-muted text-center">
              14 dagars ångerrätt · Vi kontaktar dig inom 3 arbetsdagar
            </p>
          </Copy>
        </form>
      </div>
    </Annotation>
  );
}

/* ─── Variant B, Stegvis beställning i tre steg ───────────────────── */
function FormProgressiv() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Produkt", icon: "shopping_cart" },
    { label: "Uppgifter", icon: "person" },
    { label: "Granska", icon: "check" },
  ];

  return (
    <div className="max-w-reading">
      {/* Stegindikator */}
      <Annotation
        label="Stegindikator"
        audience="user"
        rationale="De tre stegen syns hela tiden, så kunden vet var hen är och vad som återstår. Klara steg får en bock. Stegnamnen matchar knapptexterna, så att kunden känner igen var knapparna leder."
      >
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 text-sm font-medium ${
                  i === step ? "text-brand-primary" : i < step ? "text-brand-accent" : "text-ink-muted"
                }`}
              >
                <span className={`w-8 h-8 rounded-full grid place-items-center ${
                  i === step ? "bg-brand-primary text-white" :
                  i < step ? "bg-brand-accent text-white" :
                  "bg-border-subtle text-ink-muted"
                }`}>
                  <Icon name={i < step ? "check" : s.icon} size={16} />
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-brand-accent" : "bg-border-subtle"}`} />
              )}
            </div>
          ))}
        </div>
      </Annotation>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Steg 1: produkten */}
        {step === 0 && (
          <Annotation
            label="Steg 1: Produkten"
            audience="design"
            rationale="Kunden ser vad hen köper, priset och hur det går till innan hen lämnar några uppgifter. Steget kräver ingen inmatning men gör det lättare att fortsätta, vilket minskar avhoppen i steg 2."
          >
            <div className="space-y-4">
              <div className="rounded-md border border-border-subtle bg-surface p-5">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded bg-tint-info flex items-center justify-center text-ink-muted flex-shrink-0">
                    <Icon name="image" size={32} />
                  </div>
                  <div className="flex-1">
                    <p className="text-eyebrow uppercase text-ink-muted mb-1">Elbil & laddning</p>
                    <h3 className="text-h4 font-medium mb-1">Ladda Smart</h3>
                    <p className="text-sm text-ink-secondary">Ladda elbilen smart, hemma eller på jobbet.</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-ink-muted">Från</p>
                    <p className="text-h4 font-medium">14 900 kr</p>
                  </div>
                </div>
              </div>

              <Annotation
                label="Så går det till"
                audience="redaktör"
                rationale="Beskriv vad som händer efter beställningen i tre till fem korta steg, i den ordning kunden upplever dem. Skriv vad som ingår i priset och hur lång tid det tar, med siffror."
              >
                <div className="rounded-md bg-tint-notice p-4 text-sm">
                  <Copy
                    label="Rubrik, så går det till"
                    category="rubrik"
                    text="Så går det till"
                    rationale="Vardaglig rubrik som svarar på kundens fråga 'vad händer nu?'. Undvik 'Process' eller 'Leveransflöde'."
                  >
                    <p className="font-medium mb-2">Så går det till</p>
                  </Copy>
                  <ol className="list-decimal list-inside space-y-1 text-ink-secondary">
                    <li>Du beställer och vi kontaktar dig inom 3 arbetsdagar</li>
                    <li>Vi besiktar din bostad (ingår i priset)</li>
                    <li>En certifierad elektriker installerar laddboxen</li>
                    <li>Klart, du kan börja ladda</li>
                  </ol>
                </div>
              </Annotation>

              <Copy
                label="Knapp, till steg 2"
                category="cta"
                text="Fortsätt till dina uppgifter →"
                rationale="Säger vart kunden kommer härnäst. 'Dina uppgifter' matchar rubriken i nästa steg, så kunden känner igen sig."
              >
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity"
                >
                  Fortsätt till dina uppgifter →
                </button>
              </Copy>
            </div>
          </Annotation>
        )}

        {/* Steg 2: kundens uppgifter */}
        {step === 1 && (
          <Annotation
            label="Steg 2: Dina uppgifter"
            audience="design"
            rationale="Etiketterna står ovanför fälten och syns hela tiden, inte bara som gråtext i fältet. Känsliga fält som personnummer får en hjälptext. Högst två fält per rad."
          >
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fornamn-b" className="block text-sm font-medium mb-1">Förnamn</label>
                  <input id="fornamn-b" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
                <div>
                  <label htmlFor="efternamn-b" className="block text-sm font-medium mb-1">Efternamn</label>
                  <input id="efternamn-b" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
              </div>
              <div>
                <label htmlFor="personnr-b" className="block text-sm font-medium mb-1">Personnummer</label>
                <input id="personnr-b" type="text" placeholder="ÅÅÅÅMMDD-XXXX" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm placeholder:text-ink-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                <Copy
                  label="Hjälptext, personnummer"
                  category="reassurance"
                  text="Vi behöver det för kreditupplysningen och för att dra av rotavdraget åt dig."
                  rationale="Samma text som i det klassiska formuläret. Den förklarar varför vi frågar och vad kunden tjänar på det, precis vid det fält där många tvekar."
                >
                  <p className="text-xs text-ink-muted mt-1">Vi behöver det för kreditupplysningen och för att dra av rotavdraget åt dig.</p>
                </Copy>
              </div>
              <div>
                <label htmlFor="adress-b" className="block text-sm font-medium mb-1">Installationsadress</label>
                <input id="adress-b" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postnr-b" className="block text-sm font-medium mb-1">Postnummer</label>
                  <input id="postnr-b" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
                <div>
                  <label htmlFor="ort-b" className="block text-sm font-medium mb-1">Ort</label>
                  <input id="ort-b" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="epost-b" className="block text-sm font-medium mb-1">E-postadress</label>
                  <input id="epost-b" type="email" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
                <div>
                  <label htmlFor="telefon-b" className="block text-sm font-medium mb-1">Telefonnummer</label>
                  <input id="telefon-b" type="tel" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(0)} className="flex-1 border border-border-strong text-ink-secondary font-medium py-3 rounded hover:bg-tint-info transition-colors">
                  ← Tillbaka
                </button>
                <Copy
                  label="Knapp, till steg 3"
                  category="cta"
                  text="Granska beställning →"
                  rationale="'Granska' lovar att inget skickas ännu. Kunden vågar klicka eftersom hen får se allt en gång till innan beställningen går iväg."
                >
                  <button type="button" onClick={() => setStep(2)} className="flex-1 bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity">
                    Granska beställning →
                  </button>
                </Copy>
              </div>
            </div>
          </Annotation>
        )}

        {/* Steg 3: granska och skicka */}
        {step === 2 && (
          <Annotation
            label="Steg 3: Granska och skicka"
            audience="user"
            rationale="Kunden ser allt hen har fyllt i innan beställningen skickas och kan ändra varje del med 'Ändra'. Villkoren och ångerrätten står här, precis före beslutet, inte i början."
          >
            <div className="space-y-4">
              <div className="rounded-md border border-border-subtle bg-surface p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">Produkt</h3>
                  <Copy
                    label="Ändra-länk"
                    category="cta"
                    text="Ändra"
                    rationale="Ett kort, välkänt verb som tar kunden direkt till rätt steg. Samma ord i varje ruta. Undvik 'Redigera', som låter mer tekniskt."
                  >
                    <button type="button" onClick={() => setStep(0)} className="text-sm text-brand-accent hover:underline">Ändra</button>
                  </Copy>
                </div>
                <p className="text-sm text-ink-secondary">Ladda Smart · Från 14 900 kr</p>
              </div>

              <div className="rounded-md border border-border-subtle bg-surface p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">Dina uppgifter</h3>
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-brand-accent hover:underline">Ändra</button>
                </div>
                <div className="text-sm text-ink-secondary space-y-1">
                  <p>Anna Andersson</p>
                  <p>19850412-1234</p>
                  <p>Storgatan 12, 252 25 Helsingborg</p>
                  <p>anna.andersson@example.se · 070-123 45 67</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="villkor-b" className="mt-1 w-4 h-4 accent-brand-primary" />
                <Copy
                  label="Godkännande av villkor"
                  category="ton"
                  text="Jag godkänner avtalsvillkoren och har läst integritetspolicyn."
                  rationale="Kunden godkänner villkoren men läser integritetspolicyn, eftersom den inte är något man godkänner. Samma formulering som i det klassiska formuläret."
                >
                  <label htmlFor="villkor-b" className="text-sm text-ink-secondary">
                    Jag godkänner <a href="#" className="text-brand-accent underline">avtalsvillkoren</a> och har läst{" "}
                    <a href="#" className="text-brand-accent underline">integritetspolicyn</a>.
                  </label>
                </Copy>
              </div>

              <Copy
                label="Skicka-knapp"
                category="cta"
                text="Skicka beställning"
                rationale="Första gången ordet 'Skicka' dyker upp, och först här skickas något. Samma text som i det klassiska formuläret, så att knappen betyder samma sak överallt."
              >
                <button type="submit" className="w-full bg-brand-highlight text-white font-medium py-3 rounded hover:opacity-90 transition-opacity">
                  Skicka beställning
                </button>
              </Copy>
              <Copy
                label="Trygghetsrad under knappen"
                category="reassurance"
                text="14 dagars ångerrätt enligt lag · Vi kontaktar dig inom 3 arbetsdagar"
                rationale="Står precis under knappen, där kunden bestämmer sig. 'Enligt lag' räcker för att visa att rätten är garanterad; lagens namn säger de flesta ingenting."
              >
                <p className="text-xs text-ink-muted text-center">
                  14 dagars ångerrätt enligt lag · Vi kontaktar dig inom 3 arbetsdagar
                </p>
              </Copy>
            </div>
          </Annotation>
        )}
      </form>
    </div>
  );
}

/* ─── Modulsidan ────────────────────────────────────────────────────── */

const VARIANTS: Variant[] = [
  {
    id: "trygg",
    shortName: "A",
    label: "Klassiskt",
    riskLevel: "låg",
    oneLiner: "Alla fält på en sida och en knapp för att skicka.",
    bestFor: "Korta ärenden där kunden vill se allt på en gång. Enklast att bygga och underhålla.",
    render: () => <FormTrygg />,
  },
  {
    id: "progressiv",
    shortName: "B",
    label: "Stegvis",
    riskLevel: "medel",
    oneLiner: "Tre steg som i en webbshop: produkt, uppgifter, granska.",
    bestFor: "Köp och avtal. Känns som att handla på nätet och visar färre fält åt gången.",
    render: () => <FormProgressiv />,
  },
  {
    id: "experimentell",
    shortName: "C",
    label: "Konversation",
    riskLevel: "hög",
    oneLiner: "En fråga åt gången, som ett samtal. Känns inte som ett formulär.",
    bestFor: "Ovana användare och formulär med få men specifika frågor.",
    render: () => <FormularKonversation />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Känsla",
    values: {
      trygg: "Som en blankett från en myndighet. Förutsägbart men lite tungt.",
      progressiv: "Som kassan i en webbshop. Lätt, stegvis och modernt.",
      experimentell: "Som att chatta med en assistent. Känns inte som ett formulär alls.",
    },
  },
  {
    aspect: "Fält som syns samtidigt",
    values: {
      trygg: "Alla, runt 8 fält och en kryssruta. Kan kännas mycket.",
      progressiv: "3-4 per steg. Ser lättare ut, men kunden fyller i lika mycket totalt.",
      experimentell: "En fråga åt gången. Kunden får ingen överblick.",
    },
  },
  {
    aspect: "Risk för avhopp",
    values: {
      trygg: "Högre. När alla fält syns på en gång kan formuläret kännas överväldigande.",
      progressiv: "Lägre. Första steget kräver ingen inmatning, och den som har börjat fortsätter oftare.",
      experimentell: "Lägst för ovana användare. Högre för vana användare som vill se allt och fylla i snabbt.",
    },
  },
  {
    aspect: "Upplevd tid",
    values: {
      trygg: "Snabb: se allt, fyll i, klart.",
      progressiv: "Mellan: tre vyer, men tydligt hur långt kunden har kommit.",
      experimentell: "Känns snabb eftersom det är en fråga i taget, men tar längst tid totalt.",
    },
  },
  {
    aspect: "Felmeddelanden",
    values: {
      trygg: "Kontrolleras när kunden skickar. Felen visas samlade högst upp.",
      progressiv: "Kontrolleras per steg. Kunden rättar felen innan nästa steg.",
      experimentell: "Kontrolleras per fråga. Felet visas direkt och kunden kan inte gå vidare med ett felaktigt svar.",
    },
  },
  {
    aspect: "Ångra och ändra",
    values: {
      trygg: "Kunden ändrar direkt i formuläret.",
      progressiv: "Steg 3 har en 'Ändra'-länk per del som leder till rätt steg.",
      experimentell: "Knappen 'Ändra förra svaret' finns vid varje fråga. Inget granskningssteg.",
    },
  },
  {
    aspect: "Tillgänglighet (WCAG)",
    values: {
      trygg: "Mycket god. Vanlig sidstruktur och synliga fältetiketter.",
      progressiv: "God, men vid varje stegbyte måste fokus flyttas till det nya steget så att skärmläsare hänger med.",
      experimentell: "Känslig. Varje ny fråga måste läsas upp av skärmläsaren, annars tappar kunden bort sig.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      trygg: "Enkla ärenden som felanmälan eller byte av betalsätt.",
      progressiv: "Förval för köp och avtal.",
      experimentell: "Kampanjer och introduktion för nya kunder, där det nya i sig är ett plus.",
    },
  },
];

export function FormularKop() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Formulär och köp</p>
        <h1 className="text-h1 mb-3">Beställningar som känns som ett köp</h1>
        <p className="text-lede text-ink-secondary">
          Alla köp hos Öresundskraft görs via formulär. Men de kan <em>kännas</em>{" "}
          som kassan i en webbshop i stället för en blankett. Här är tre varianter.
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
            <strong>Vad vi löser:</strong> I dag känns alla beställningar som ett långt
            kontaktformulär. Den stegvisa varianten delar upp flödet i tre steg där varje steg
            har en tydlig uppgift. Stegindikatorn visar vad som väntar, och knapptexterna säger
            vad nästa steg är: 'Fortsätt till dina uppgifter', 'Granska beställning' och till
            sist 'Skicka beställning'.
          </p>
          <p>
            <strong>Ångerrätten</strong> nämns i steg 3, där kunden granskar och skickar, inte
            i steg 1. Där fungerar den som en trygghet precis före beslutet, i stället för
            som en varning i början.
          </p>
          <p>
            <strong>Rekommendation:</strong> <em>B (Stegvis)</em>. Steg 1 ("Produkt") kräver
            ingen ansträngning, men när kunden väl har börjat beställa är hen mer benägen att
            slutföra, även när det är dags att fylla i personnummer.
          </p>
        </div>
      </section>
    </div>
  );
}
