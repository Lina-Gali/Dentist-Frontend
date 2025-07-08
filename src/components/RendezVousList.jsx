import { useEffect, useState } from "react";
import api from "../api";
import AddRendezVousForm from "./AddRendezVousForm";
import { Link } from "react-router-dom";
("");
export default function RendezVousList() {
  const [rdvs, setRdvs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchRdvs();
  }, []);

  const fetchRdvs = async () => {
    try {
      const response = await api.get("/rendezvous");
      setRdvs(response.data);
    } catch (error) {
      console.error("Erreur chargement rendez-vous", error);
    }
  };

  return (
    <div>
      <h2>Liste des Rendez-vous</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Date & Heure</th>
            <th>Motif</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rdvs.map((rdv) => (
            <tr key={rdv.id}>
              <td>{rdv.id}</td>
              <td>
                {rdv.patient ? `${rdv.patient.nom} ${rdv.patient.prenom}` : "-"}
              </td>
              <td>{new Date(rdv.date_heure).toLocaleString()}</td>
              <td>{rdv.motif}</td>
              <td>{rdv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      

      <div style={{ marginBottom: "15px" }}>
        <Link to="/rendezvous/ajouter">
          <button className="add-button">+ Ajouter un rendez-vous</button>
        </Link>
      </div>
    </div>
  );
}
