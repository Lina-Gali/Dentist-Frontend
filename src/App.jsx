import { Routes, Route } from "react-router-dom";
import PatientsPage from "./pages/PatientsPage";
import RendezVousPage from "./pages/RendezVousPage";
import RendezVousAujourdhui from "./components/RendzVousAujoudhui";
import MainLayout from "./layouts/MainLayout";
import AjouterRendezVousPage from "./pages/AjouterRendezVous";
import AjouterPatientPage from "./pages/AjoutetPatientPage";
export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/rendezvous" element={<RendezVousPage />} />
        <Route path="/aujourdhui" element={<RendezVousAujourdhui />} />
        <Route path="/rendezvous/ajouter" element={<AjouterRendezVousPage />} />
        <Route path="/patients/ajouter" element={<AjouterPatientPage />} />
      </Routes>
    </MainLayout>
  );
}
