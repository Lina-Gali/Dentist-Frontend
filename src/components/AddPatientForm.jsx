import { useState } from "react";
import api from "../api";

export default function AddPatientForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    age: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await api.post("/patients", formData);
      onAdd(response.data); // Met à jour la liste
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur ajout patient", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Ajouter un Patient</h3>
      <div>
        <label>Nom: </label>
        <input
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        {errors.nom && <div style={{ color: "red" }}>{errors.nom[0]}</div>}
      </div>
      <div>
        <label>Prénom: </label>
        <input
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        {errors.prenom && (
          <div style={{ color: "red" }}>{errors.prenom[0]}</div>
        )}
      </div>
      <div>
        <label>Téléphone: </label>
        <input
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
        />
        {errors.telephone && (
          <div style={{ color: "red" }}>{errors.telephone[0]}</div>
        )}
      </div>
      <div>
        <label>Âge: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Notes: </label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </div>
      <button type="submit">Ajouter</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
        Annuler
      </button>
    </form>
  );
}
