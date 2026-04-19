/**
 * Shared placeholder data for the Avbrottslista module.
 * All dates, areas and customer counts are placeholder.
 */

export type AvbrottStatus = "pagaende" | "planerat" | "avslutat";

export type Avbrott = {
  id: string;
  status: AvbrottStatus;
  typ: "el" | "fjarrvarme" | "fiber";
  rubrik: string;
  omrade: string;
  start: string;          // ISO or display string
  slutBeraknat?: string;  // for pågående / planerat
  slutFaktiskt?: string;  // for avslutat
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
    beskrivning: "Kabelfelet lokaliserat till transformatorstation Söder T4. Reparation pågår.",
    uppdateringar: [
      { tid: "08:22", text: "Avbrott upptäckt. Automatisk felanmälan mottagen." },
      { tid: "08:45", text: "Serviceteam på plats. Kabelfelet lokaliserat." },
      { tid: "09:30", text: "Reparation påbörjad. Beräknad klar ~12:00." },
    ],
  },
  {
    id: "a2",
    status: "pagaende",
    typ: "fjarrvarme",
    rubrik: "Driftstörning fjärrvärme — Stattena",
    omrade: "Stattena, Drottninghög",
    start: "2026-04-19 06:00",
    slutBeraknat: "2026-04-19 14:00",
    berordaKunder: 120,
    beskrivning: "Ventilbyte i distributionsnätet. Tillfällig temperaturminskning i berörda fastigheter.",
  },
  {
    id: "a3",
    status: "planerat",
    typ: "el",
    rubrik: "Planerat underhåll — Ättekulla",
    omrade: "Ättekulla industriområde",
    start: "2026-04-22 07:00",
    slutBeraknat: "2026-04-22 16:00",
    berordaKunder: 45,
    beskrivning: "Byte av kabel i nätstationsområdet. Berörda kunder meddelas via SMS.",
  },
  {
    id: "a4",
    status: "planerat",
    typ: "el",
    rubrik: "Planerat underhåll — Rydebäck",
    omrade: "Rydebäck, Gantofta",
    start: "2026-04-25 08:00",
    slutBeraknat: "2026-04-25 15:00",
    berordaKunder: 210,
    beskrivning: "Förstärkning av kabelstråk för bostadsområde i expansion.",
  },
  {
    id: "a5",
    status: "avslutat",
    typ: "el",
    rubrik: "Strömavbrott — Väla",
    omrade: "Väla, Kattarp",
    start: "2026-04-18 14:10",
    slutFaktiskt: "2026-04-18 16:45",
    berordaKunder: 85,
    beskrivning: "Träd fallit över luftledning. Avhjälpt och ström återställd.",
  },
  {
    id: "a6",
    status: "avslutat",
    typ: "fjarrvarme",
    rubrik: "Planerat underhåll — Kullavägen",
    omrade: "Kullavägen, Pålsjö",
    start: "2026-04-17 06:00",
    slutFaktiskt: "2026-04-17 14:30",
    berordaKunder: 60,
    beskrivning: "Ventilbyte slutfört. Normal drift återställd.",
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
