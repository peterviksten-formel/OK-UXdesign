import { Fragment } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";
import { KATEGORIER } from "../kundservice-data";

/**
 * VARIANT A, Ämneslista
 *
 * Alla ämnen syns direkt som en lista. Kunden fäller ut ett ämne, ser
 * frågorna och klickar på den som passar. Inget döljs och inget beror på
 * tidigare val. Liknar ett vanligt hjälpcenter och är enklast att bygga och
 * underhålla. Kontaktuppgifterna ligger alltid sist på sidan.
 */

// Första frågan som leder till Mina sidor får en förklaring i UX-guiden.
const FORSTA_MINA_SIDOR = KATEGORIER.flatMap((k) => k.underkategorier).find(
  (u) => u.action.type === "mina-sidor",
)?.id;

export function KundserviceTrygg() {
  return (
    <div>
      <Annotation
        label="Ingress"
        audience="user"
        rationale="En lugn inledning som säger vad kunden ska göra: välja ett ämne. Två genvägar finns för den som hellre söker eller vill logga in direkt."
      >
        <div className="mb-8 max-w-reading">
          <Copy
            label="Ingress med genvägar"
            category="ton"
            text="Välj det ämne som passar din fråga. Du kan också söka bland vanliga frågor eller logga in på Mina sidor."
            rationale="Börjar med vad kunden ska göra. Länktexterna säger exakt vad som händer. Undvik 'Välkommen till kundservice', som inte hjälper kunden vidare."
          >
            <p className="text-lede text-ink-secondary leading-relaxed">
              Välj det ämne som passar din fråga. Du kan också{" "}
              <a href="#" className="text-brand-accent underline underline-offset-2">söka bland vanliga frågor</a>{" "}
              eller{" "}
              <a href="#" className="text-brand-accent underline underline-offset-2">logga in på Mina sidor</a>.
            </p>
          </Copy>
        </div>
      </Annotation>

      <Annotation
        label="Ämneslista"
        audience="design"
        rationale="Alla sex ämnen syns direkt, utan steg. Kunden fäller ut ett ämne i taget och får frågorna under. Listan fungerar även med skärmläsare och tangentbord."
      >
        <div className="space-y-3 max-w-reading">
          {KATEGORIER.map((k, idx) => {
            const details = (
              <details
                className="group border border-border-subtle rounded-md bg-surface"
              >
                <summary className="px-5 py-4 cursor-pointer list-none flex items-center gap-3 hover:bg-tint-info focus-visible:ring-2 focus-visible:ring-focus rounded-md">
                  <Icon name={k.ikon} size={24} className="text-brand-accent" />
                  <div className="flex-1">
                    <span className="font-medium block">{k.label}</span>
                    <span className="text-sm text-ink-muted">{k.beskrivning}</span>
                  </div>
                  <Icon name="expand_more" size={20} className="text-ink-muted group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-4 border-t border-border-subtle">
                  <ul className="divide-y divide-border-subtle">
                    {k.underkategorier.map((u, uIdx) => {
                      const fraga = <span className="font-medium block group-hover/link:underline">{u.label}</span>;
                      return (
                        <li key={u.id} className="py-3">
                          <a
                            href={u.action.type === "link" ? u.action.href : "#"}
                            className="flex items-start gap-3 group/link hover:text-brand-accent"
                          >
                            <Icon name="arrow_forward" size={14} className="mt-1 text-ink-muted" />
                            <div>
                              {idx === 0 && uIdx === 0 ? (
                                <Copy
                                  label="Fråga i kundens egna ord"
                                  category="rubrik"
                                  text={u.label}
                                  rationale="Frågorna skrivs som kunden själv skulle säga dem ('Jag förstår inte min faktura'). Kunden känner igen sitt problem direkt. Undvik interna ord som 'Fakturaförfrågan'."
                                >
                                  {fraga}
                                </Copy>
                              ) : (
                                fraga
                              )}
                              <span className="text-sm text-ink-secondary block">{u.action.description}</span>
                              {u.action.type === "kontakt" && u.action.tid && (
                                <span className="text-xs text-ink-muted mt-1 block">{u.action.tid}</span>
                              )}
                              {u.action.type === "mina-sidor" && (
                                u.id === FORSTA_MINA_SIDOR ? (
                                  <Copy
                                    label="Märke: görs på Mina sidor"
                                    category="metadata"
                                    text="Görs på Mina sidor"
                                    rationale="Säger i förväg att kunden behöver logga in. Då blir inloggningen ingen överraskning. Bara 'Mina sidor' säger inte vad som händer."
                                  >
                                    <span className="text-xs text-brand-accent mt-1 flex items-center gap-1">
                                      <Icon name="arrow_forward" size={12} /> Görs på Mina sidor
                                    </span>
                                  </Copy>
                                ) : (
                                  <span className="text-xs text-brand-accent mt-1 flex items-center gap-1">
                                    <Icon name="arrow_forward" size={12} /> Görs på Mina sidor
                                  </span>
                                )
                              )}
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </details>
            );

            return (
              <Fragment key={k.id}>
                {idx === 0 ? (
                  <Annotation
                    label="Ett ämne med frågor och svar"
                    audience="redaktör"
                    rationale="Varje ämne har ett namn, en kort beskrivning och 3-4 frågor. Skriv frågan som kunden säger den och svaret i en eller två meningar. Innehållet är gemensamt för alla tre varianter."
                  >
                    {details}
                  </Annotation>
                ) : (
                  details
                )}
              </Fragment>
            );
          })}
        </div>
      </Annotation>

      <Annotation
        label="Kontaktuppgifter sist"
        audience="user"
        rationale="Den som inte hittade svaret ser direkt hur man når oss: telefon, chatt och e-post med öppettider och svarstider. Kunden ska aldrig behöva leta efter 'Kontakta oss'."
      >
        <aside className="mt-8 p-5 border border-border-strong rounded-md max-w-reading">
          <Copy
            label="Rubrik för kontaktvägar"
            category="rubrik"
            text="Hittade du inte svaret?"
            rationale="En fråga som speglar kundens läge just då. Tydligare än 'Kontakta oss', som inte säger varför man ska göra det."
          >
            <h3 className="text-h5 font-medium mb-2">Hittade du inte svaret?</h3>
          </Copy>
          <Annotation
            label="Kontaktvägar och öppettider"
            audience="redaktör"
            rationale="Håll telefonnummer, öppettider och svarstider aktuella. Använd samma uppgifter som på övriga kundservicesidor, annars tappar kunden förtroendet."
          >
            <div className="text-sm text-ink-secondary space-y-2">
              <Copy
                label="Telefon och öppettider"
                category="reassurance"
                text="Ring oss: [08-455 44 00] · Vardagar 08-17"
                rationale="Numret och öppettiderna på samma rad. Kunden vet direkt om det lönar sig att ringa nu."
              >
                <p className="flex items-center gap-2"><Icon name="call" size={16} className="text-brand-accent" /> Ring oss: <strong>[08-455 44 00]</strong> · Vardagar 08-17</p>
              </Copy>
              <p className="flex items-center gap-2">
                <Icon name="chat_bubble" size={16} className="text-brand-accent" />{" "}
                <Copy
                  label="Chattlänk"
                  category="cta"
                  text="Chatta med oss"
                  rationale="Verb + objekt. Öppettid och svarstid (cirka 2 min) står intill, så chatten blir ett tryggt val för den som har bråttom."
                >
                  <a href="#" className="text-brand-accent underline underline-offset-2">Chatta med oss</a>
                </Copy>{" "}
                · Vardagar 08-17 · Svarstid cirka 2 min
              </p>
              <p className="flex items-center gap-2"><Icon name="mail" size={16} className="text-brand-accent" /> <a href="#" className="text-brand-accent underline underline-offset-2">Skicka e-post</a> · Svar inom 1 arbetsdag</p>
            </div>
          </Annotation>
        </aside>
      </Annotation>
    </div>
  );
}
