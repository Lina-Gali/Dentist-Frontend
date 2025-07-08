import { useEffect, useState } from "react";
import api from "../api";

export default function RendezVousAujourdhui() {
  const [rdvs, setRdvs] = useState([]);

  useEffect(() => {
    fetchTodayRdvs();
  }, []);

  const fetchTodayRdvs = async () => {
    try {
      const response = await api.get("/rendezvous/aujourdhui");
      setRdvs(response.data);
    } catch (error) {
      console.error("Erreur chargement rendez-vous du jour", error);
    }
  };

  return (
    <div>
      <h2>📅 Rendez-vous d'aujourd'hui</h2>
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date & Heure</th>
            <th>Motif</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rdvs.map((rdv) => (
            <tr key={rdv.id}>
              <td>
                {rdv.patient ? `${rdv.patient.nom} ${rdv.patient.prenom}` : "-"}
              </td>
              <td>{new Date(rdv.date_heure).toLocaleTimeString()}</td>
              <td>{rdv.motif}</td>
              <td>{rdv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
