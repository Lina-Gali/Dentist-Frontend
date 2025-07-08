import { useEffect, useState } from "react";
import api from "../api";
import AddPatientForm from "./AddPatientForm";
import "./PatientList.css";
import EditPatientForm from "./EditPatientForm";
import { Link } from "react-router-dom";
export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Erreur de chargement des patients", error);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce patient ?")) return;

    try {
      await api.delete(`/patients/${id}`);
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleAddPatient = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
    setShowForm(false);
  };

  return (
    <div className="patient-container">
      <div className="header">
        <h2>Patients</h2>
        <button className="add-button" onClick={() => setShowForm(true)}>
          Add Patient
        </button>
      </div>

      <Link to="/patients/ajouter">
        <button className="add-button">+ Add Patient</button>
      </Link>
      
      <table className="patient-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Âge</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.nom}</td>
              <td>{patient.prenom}</td>
              <td>{patient.telephone}</td>
              <td>{patient.age}</td>
              <td>{patient.notes}</td>
              <td className="actions">
                <div style={{ marginBottom: "15px" }}>
                  <Link to="/">
                    <button className="add-button">modifier Patient</button>
                  </Link>
                </div>
                <button className="view">👁️</button>
                <button
                  className="delete"
                  onClick={() => handleDelete(patient.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
