# Figma-export — sidtyper

Self-contained HTML-filer för import via **html-to-figma**-plugin
(eller liknande HTML→Figma-verktyg).

## Innehåll

| Fil | Sidtyp | Status | URL i prototypen |
|---|---|---|---|
| `startsida-nyhetsrum.html` | Startsida Nyhetsrum | wip | `/sidtyper/startsida-nyhetsrum` |
| `pressmeddelande.html` | Pressmeddelande | wip | `/sidtyper/pressmeddelande` |
| `nyhet.html` | Nyhet | wip | `/sidtyper/nyhet` |
| `artikel.html` | Artikel — vardagsformat | wip | `/sidtyper/artikel` |
| `artikel-galleri.html` | Artikel — format-galleri (inline) | wip | `/sidtyper/artikel-galleri` |
| `artikel-marginalia.html` | Artikel — marginalia-format | wip | `/sidtyper/artikel-marginalia` |
| `produktsida-direktkop.html` | Produktsida direktköp (Ladda Smart) | klar | `/sidtyper/produktsida-direktkop` |
| `produktsida-leadsgen.html` | Produktsida leadsgenerering (Solceller) | klar | `/sidtyper/produktsida-leadsgen` |

## Hur de skapades

Genererade via `single-file-cli` mot live-URL:erna på
`ok-u-xdesign.vercel.app`. Headless Chrome renderar SPA:n,
all CSS, fonts och bilder inline:as i en enda HTML-fil.

UX-guide-overlays (annotation-chips, copy-numreringar,
edit-läge) deaktiverades innan capture, **och tema sätts
explicit till light** så exporten inte påverkas av
operativsystemets `prefers-color-scheme`-inställning:

```js
localStorage.setItem('ok-ux-annotations', 'off');
localStorage.setItem('ok-ux-editorial-guide', 'off');
localStorage.setItem('ok-ux-edit-mode', 'off');
localStorage.setItem('ok-ux-inspector', 'closed');
localStorage.setItem('ok-ux-theme', 'light');
```

Capture-viewport: 1440×1024 (desktop). Filerna är ca 7 MB
styck — de innehåller hela Tailwind-CSS-bundlen plus base64-
inline:ade fonts.

## Om du vill regenerera

Från `/Users/peterviksten/OK-UXdesign/Figma`:

```bash
# En sidtyp:
npx --yes single-file-cli \
  "https://ok-u-xdesign.vercel.app/sidtyper/<SLUG>" \
  "<SLUG>.html" \
  --browser-script /tmp/disable-overlays.js \
  --browser-width 1440 \
  --browser-height 1024 \
  --browser-wait-until networkIdle \
  --browser-wait-delay 2000

# Alla sidtyper i ett svep:
for slug in startsida-nyhetsrum pressmeddelande nyhet artikel \
            artikel-galleri artikel-marginalia \
            produktsida-direktkop produktsida-leadsgen; do
  npx --yes single-file-cli \
    "https://ok-u-xdesign.vercel.app/sidtyper/$slug" \
    "${slug}.html" \
    --browser-script /tmp/disable-overlays.js \
    --browser-width 1440 --browser-height 1024 \
    --browser-wait-until networkIdle --browser-wait-delay 2000
done
```

Browser-scriptet (`/tmp/disable-overlays.js`) finns inline ovan —
skapa filen om den inte finns.

**Obs!** `single-file-cli` skriver inte över existerande filer —
den lägger till "(2)", "(3)" etc i filnamnet. Ta bort gamla
filer först om du vill regenerera över befintliga.

## Import till Figma

1. Öppna Figma → installera plugin **html.to.design** eller
   **HTML to Figma**
2. Pluginen accepterar antingen URL eller pasted HTML/file
3. Dra in eller välj en av filerna i denna mapp
4. Pluginen konverterar till Figma frames + auto-layout
5. Vissa subtila stilar (custom CSS-variables, vissa
   `var(--color-*)`-tokens) kan behöva justeras manuellt

## Ej i exporten

- Mobil-vy — capture är gjord på desktop-bredd 1440px.
  För mobil-export: kör om med `--browser-width 390` (iPhone)
  eller `--browser-width 768` (iPad).
- Modul-bibliotek (`/moduler/*`) — inte sidtyper.
- Stub-sidtyper — bara byggda sidtyper är med.
