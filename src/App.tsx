import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "./lib/ThemeContext";
import { AnnotationProvider } from "./lib/AnnotationContext";
import { Layout } from "./components/Layout";
import { IndexPage } from "./routes/Index";
import { StubPage } from "./routes/Stub";
import { ElavtalJamfor } from "./routes/moduler/ElavtalJamfor";
import { KundserviceTriage } from "./routes/moduler/KundserviceTriage";
import { Avbrottslista } from "./routes/moduler/Avbrottslista";
import { Produktinfo } from "./routes/moduler/Produktinfo";
import { Produktlisting } from "./routes/moduler/Produktlisting";
import { FormularKop } from "./routes/moduler/FormularKop";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RouteShell />}>
            <Route path="/" element={<IndexPage />} />

            {/* Sidtyper */}
            <Route path="/sidtyper" element={<Navigate to="/" replace />} />
            <Route path="/sidtyper/:slug" element={<StubPage kind="sidtyp" />} />

            {/* Moduler */}
            <Route path="/moduler" element={<Navigate to="/" replace />} />
            <Route path="/moduler/elavtal-jamfor" element={<ElavtalJamfor />} />
            <Route path="/moduler/kundservice-triage" element={<KundserviceTriage />} />
            <Route path="/moduler/avbrottslista" element={<Avbrottslista />} />
            <Route path="/moduler/produktinfo" element={<Produktinfo />} />
            <Route path="/moduler/produktlisting" element={<Produktlisting />} />
            <Route path="/moduler/formular-kop" element={<FormularKop />} />
            <Route path="/moduler/:slug" element={<StubPage kind="modul" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
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
      <Layout />
    </AnnotationProvider>
  );
}
