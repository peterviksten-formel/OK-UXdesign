# Öresundskraft · UX-prototyp (Fas 1)

Klickbar prototyp för att diskutera **innehållshierarki per sidtyp** och **wireframes per nyckelmodul** för redesignen av oresundskraft.se.

Innehållet är placeholder. Aktivera *designanteckningar* i sidhuvudet för att se motivering per element (per användare / redaktör / design).

## Snabbstart

```bash
npm install
npm run dev          # http://localhost:5173 (eller :5174 om upptaget)
npm run build
npx tsc --noEmit     # typecheck
```

## Struktur

```
src/
├── App.tsx                    # router + providers
├── index.css                  # Centra No1 + tokens (light/dark) + Tailwind
├── lib/
│   ├── ThemeContext.tsx       # ljus/mörk + localStorage
│   └── AnnotationContext.tsx  # designanteckningar (på/av + lista)
├── components/
│   ├── Layout.tsx             # header, footer, skip-link
│   ├── Annotation.tsx         # wrapper som markerar element
│   └── AnnotationPanel.tsx    # slide-in lista över alla anteckningar
└── routes/
    ├── catalog.ts             # alla sidtyper + moduler
    ├── Index.tsx              # översikt
    ├── Stub.tsx               # placeholder för icke-byggda sidor
    └── moduler/
        └── ElavtalJamfor.tsx  # första riktiga modulen
```

## Designsystem

- **Font:** Centra No1 (300 / 400 / 500 / 700) — laddad från `/public/fonts/`. Licensierad.
- **Brand:** `#00205B` (navy), `#00A2E2` (cyan), `#FF3F56` (coral).
- **Tints:** `#DFF7FF` (info), `#FFEDF5` (highlight), `#FFF5D4` (notice).
- **Mörkt läge:** Djupt navy som canvas, cyan som primary, tints blir låg-opacity overlays.
- **Tokens:** alla färger via CSS-variabler i `src/index.css` → exponerade som Tailwind-klasser i `tailwind.config.ts`. Inga hårdkodade hex i komponenter.

## Designanteckningar — så funkar det

Wrappa ett element med `<Annotation>`:

```tsx
<Annotation
  label="Boendeväljare"
  audience="user"  // "user" | "redaktör" | "design"
  rationale="Två tydliga val istället för sliderfält. ..."
>
  <div>...</div>
</Annotation>
```

Med anteckningar PÅ ritar CSS automatiskt en streckad ram + numrerad chip
runt elementet. Sidopanelen listar alla anteckningar på sidan; klick =
scrolla till elementet.

## Status (16 april 2026)

| Sidtyp                                    | Status |
|-------------------------------------------|--------|
| Startsida undersida (privat elhandel)     | stub   |
| Avbrottsinformation                       | stub   |
| Kundservice                               | stub   |
| Produktsida                               | stub   |
| Nyhetsrum                                 | stub   |
| Artikel / blogg / nyhet / pressmeddelande | stub   |

| Modul                  | Status |
|------------------------|--------|
| Jämför elavtal         | pågår  |
| Produktlisting         | stub   |
| Produktinfo            | stub   |
| Formulär-köp           | stub   |
| Avbrottslista          | stub   |
| Kundservice-triage     | stub   |

## Deploy (Vercel)

1. Vercel → Add New Project → Import `peterviksten-formel/OK-UXdesign`
2. Framework preset: **Vite** (auto-detected)
3. Build command: `npm run build` · Output: `dist`
4. Inga env-variabler behövs.
