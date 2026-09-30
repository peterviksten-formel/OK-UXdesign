/**
 * Gemensamma exempeldata för modulen Avbrottslista (används även av sidtypen
 * för avbrott). Alla datum, områden och kundantal är påhittade exempel.
 *
 * Skrivregler för texterna:
 * - rubrik: vad som hänt + var, t.ex. "Strömavbrott i centrala Helsingborg".
 * - beskrivning: orsak och vad vi gör nu, i korta meningar med vi-form.
 * - uppdateringar: en händelse per rad, klockslag skrivs som 08:22.
 */

export type AvbrottStatus = "pagaende" | "planerat" | "avslutat";

export type Avbrott = {
  id: string;
  status: AvbrottStatus;
  typ: "el" | "fjarrvarme" | "fiber";
  rubrik: string;
  omrade: string;
  start: string;          // "ÅÅÅÅ-MM-DD TT:MM", visas via formatTid()
  slutBeraknat?: string;  // beräknat slut, för pågående och planerade
  slutFaktiskt?: string;  // faktiskt slut, för avslutade
  berordaKunder: number;
  beskrivning: string;
  uppdateringar?: { tid: string; text: string }[];
};

export const AVBROTT: Avbrott[] = [
  {
    id: "a1",
    status: "pagaende",
    typ: "el",
    rubrik: "Strömavbrott i centrala Helsingborg",
    omrade: "Söder, Planteringen, Tågaborg",
    start: "2026-04-19 08:22",
    slutBeraknat: "2026-04-19 12:00",
    berordaKunder: 340,
    beskrivning: "Felet sitter i en kabel vid nätstationen Söder T4. Vi reparerar den nu.",
    uppdateringar: [
      { tid: "08:22", text: "Vi upptäckte avbrottet via en automatisk felanmälan." },
      { tid: "08:45", text: "Våra montörer är på plats och har hittat kabelfelet." },
      { tid: "09:30", text: "Reparationen har börjat. Vi räknar med att strömmen är tillbaka cirka 12:00." },
    ],
  },
  {
    id: "a2",
    status: "pagaende",
    typ: "fjarrvarme",
    rubrik: "Driftstörning fjärrvärme, Stattena",
    omrade: "Stattena, Drottninghög",
    start: "2026-04-19 06:00",
    slutBeraknat: "2026-04-19 14:00",
    berordaKunder: 120,
    beskrivning: "Vi byter en ventil i fjärrvärmenätet. Under tiden kan värmen och varmvattnet bli svalare i berörda fastigheter.",
  },
  {
    id: "a3",
    status: "planerat",
    typ: "el",
    rubrik: "Planerat underhåll, Ättekulla",
    omrade: "Ättekulla industriområde",
    start: "2026-04-22 07:00",
    slutBeraknat: "2026-04-22 16:00",
    berordaKunder: 45,
    beskrivning: "Vi byter en elkabel i området. Berörda kunder får ett sms innan arbetet börjar.",
  },
  {
    id: "a4",
    status: "planerat",
    typ: "el",
    rubrik: "Planerat underhåll, Rydebäck",
    omrade: "Rydebäck, Gantofta",
    start: "2026-04-25 08:00",
    slutBeraknat: "2026-04-25 15:00",
    berordaKunder: 210,
    beskrivning: "Vi förstärker elnätet så att det räcker till de nya bostäderna i området.",
  },
  {
    id: "a5",
    status: "avslutat",
    typ: "el",
    rubrik: "Strömavbrott, Väla",
    omrade: "Väla, Kattarp",
    start: "2026-04-18 14:10",
    slutFaktiskt: "2026-04-18 16:45",
    berordaKunder: 85,
    beskrivning: "Ett träd föll över en elledning. Ledningen är lagad och strömmen är tillbaka.",
  },
  {
    id: "a6",
    status: "avslutat",
    typ: "fjarrvarme",
    rubrik: "Planerat underhåll, Kullavägen",
    omrade: "Kullavägen, Pålsjö",
    start: "2026-04-17 06:00",
    slutFaktiskt: "2026-04-17 14:30",
    berordaKunder: 60,
    beskrivning: "Ventilen är bytt och fjärrvärmen fungerar som vanligt igen.",
  },
];

export const STATUS_META: Record<AvbrottStatus, { label: string; color: string; dotColor: string }> = {
  pagaende: { label: "Pågående", color: "bg-brand-highlight text-white", dotColor: "bg-brand-highlight" },
  planerat: { label: "Planerat", color: "bg-tint-notice text-brand-primary", dotColor: "bg-yellow-500" },
  avslutat: { label: "Avslutat", color: "bg-tint-info text-brand-primary", dotColor: "bg-green-500" },
};

export const TYP_LABEL: Record<Avbrott["typ"], string> = {
  el: "El",
  fjarrvarme: "Fjärrvärme",
  fiber: "Fiber",
};

const MANADER = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

/**
 * Gör om "2026-04-19 08:22" till "19 april kl. 08:22".
 * Okänt format visas som det är.
 */
export function formatTid(tid: string): string {
  const m = tid.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/);
  if (!m) return tid;
  const datum = `${Number(m[3])} ${MANADER[Number(m[2]) - 1]}`;
  return m[4] ? `${datum} kl. ${m[4]}:${m[5]}` : datum;
}

/**
 * Tidsspann för ett avbrott, t.ex. "19 april kl. 08:22 till 12:00" eller
 * "22 april kl. 07:00 till 23 april kl. 16:00". Utan sluttid: "från 19 april kl. 08:22".
 */
export function formatIntervall(start: string, slut?: string): string {
  if (!slut) return `från ${formatTid(start)}`;
  const sammaDag = start.slice(0, 10) === slut.slice(0, 10);
  const slutText = sammaDag && slut.length >= 16 ? slut.slice(11, 16) : formatTid(slut);
  return `${formatTid(start)} till ${slutText}`;
}
