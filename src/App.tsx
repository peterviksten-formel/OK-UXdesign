import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "./lib/ThemeContext";
import { AnnotationProvider } from "./lib/AnnotationContext";
import { EditorialGuideProvider } from "./lib/EditorialGuideContext";
import { EditModeProvider } from "./lib/EditModeContext";
import { InspectorProvider } from "./lib/InspectorContext";
import { ViewportProvider } from "./lib/ViewportContext";
import { Layout } from "./components/Layout";
import { IndexPage } from "./routes/Index";
import { StubPage } from "./routes/Stub";
import { ElavtalJamfor } from "./routes/moduler/ElavtalJamfor";
import { KundserviceTriage } from "./routes/moduler/KundserviceTriage";
import { Avbrottslista } from "./routes/moduler/Avbrottslista";
import { Produktinfo } from "./routes/moduler/Produktinfo";
import { Produktlisting } from "./routes/moduler/Produktlisting";
import { FormularKop } from "./routes/moduler/FormularKop";
import { Hero } from "./routes/moduler/Hero";
import { Faq } from "./routes/moduler/Faq";
import { Nyheter } from "./routes/moduler/Nyheter";
import { Kampanj } from "./routes/moduler/Kampanj";
import { Kundcase } from "./routes/moduler/Kundcase";
import { Tjanster } from "./routes/moduler/Tjanster";
import { Driftstatus } from "./routes/moduler/Driftstatus";
import { MinaSidor } from "./routes/moduler/MinaSidor";
import { Impact } from "./routes/moduler/Impact";
import { StartsidaUndersidaUX } from "./routes/sidtyper/StartsidaUndersidaUX";
import { KundserviceNy } from "./routes/sidtyper/KundserviceNy";
import { AvbrottNy } from "./routes/sidtyper/AvbrottNy";
import { ProduktsidaDirektkop } from "./routes/sidtyper/ProduktsidaDirektkop";
import { ProduktsidaLeadsgen } from "./routes/sidtyper/ProduktsidaLeadsgen";
import { StartsidaNyhetsrum } from "./routes/sidtyper/StartsidaNyhetsrum";
import { Pressmeddelande } from "./routes/sidtyper/Pressmeddelande";
import { Nyhet } from "./routes/sidtyper/Nyhet";
import { Artikel } from "./routes/sidtyper/Artikel";
import { ArtikelGalleri } from "./routes/sidtyper/ArtikelGalleri";
import { ArtikelMarginalia } from "./routes/sidtyper/ArtikelMarginalia";

export default function App() {
  return (
    <ThemeProvider>
      <ViewportProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RouteShell />}>
            <Route path="/" element={<IndexPage />} />

            {/* Sidtyper */}
            <Route path="/sidtyper" element={<Navigate to="/" replace />} />
            <Route path="/sidtyper/startsida-undersida-ux" element={<StartsidaUndersidaUX />} />
            <Route path="/sidtyper/kundservice-ny" element={<KundserviceNy />} />
            <Route path="/sidtyper/avbrott-ny" element={<AvbrottNy />} />
            <Route path="/sidtyper/produktsida-direktkop" element={<ProduktsidaDirektkop />} />
            <Route path="/sidtyper/produktsida-leadsgen" element={<ProduktsidaLeadsgen />} />
            <Route path="/sidtyper/startsida-nyhetsrum" element={<StartsidaNyhetsrum />} />
            <Route path="/sidtyper/pressmeddelande" element={<Pressmeddelande />} />
            <Route path="/sidtyper/nyhet" element={<Nyhet />} />
            <Route path="/sidtyper/artikel" element={<Artikel />} />
            <Route path="/sidtyper/artikel-galleri" element={<ArtikelGalleri />} />
            <Route path="/sidtyper/artikel-marginalia" element={<ArtikelMarginalia />} />
            <Route path="/sidtyper/:slug" element={<StubPage kind="sidtyp" />} />

            {/* Moduler */}
            <Route path="/moduler" element={<Navigate to="/" replace />} />
            <Route path="/moduler/elavtal-jamfor" element={<ElavtalJamfor />} />
            <Route path="/moduler/kundservice-triage" element={<KundserviceTriage />} />
            <Route path="/moduler/avbrottslista" element={<Avbrottslista />} />
            <Route path="/moduler/produktinfo" element={<Produktinfo />} />
            <Route path="/moduler/produktlisting" element={<Produktlisting />} />
            <Route path="/moduler/formular-kop" element={<FormularKop />} />
            <Route path="/moduler/hero" element={<Hero />} />
            <Route path="/moduler/faq" element={<Faq />} />
            <Route path="/moduler/nyheter" element={<Nyheter />} />
            <Route path="/moduler/kampanj" element={<Kampanj />} />
            <Route path="/moduler/kundcase" element={<Kundcase />} />
            <Route path="/moduler/tjanster" element={<Tjanster />} />
            <Route path="/moduler/driftstatus" element={<Driftstatus />} />
            <Route path="/moduler/mina-sidor" element={<MinaSidor />} />
            <Route path="/moduler/impact" element={<Impact />} />
            <Route path="/moduler/:slug" element={<StubPage kind="modul" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ViewportProvider>
    </ThemeProvider>
  );
}

/**
 * Annotations live INSIDE the router so they reset per route mount.
 * Layout owns the chrome (header, footer, side panel).
 */
function RouteShell() {
  return (
    <AnnotationProvider>
      <EditorialGuideProvider>
        <EditModeProvider>
          <InspectorProvider>
            <Layout />
          </InspectorProvider>
        </EditModeProvider>
      </EditorialGuideProvider>
    </AnnotationProvider>
  );
}
