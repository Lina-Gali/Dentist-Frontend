import { useState } from "react";
import api from "../api";

export default function EditPatientForm({ patient, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({ ...patient });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await api.put(`/patients/${patient.id}`, formData);
      onUpdate(response.data);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Modifier Patient</h3>
      <div>
        <label>Nom: </label>
        <input name="nom" value={formData.nom} onChange={handleChange} />
        {errors.nom && <div style={{ color: "red" }}>{errors.nom[0]}</div>}
      </div>
      <div>
        <label>Prénom: </label>
        <input name="prenom" value={formData.prenom} onChange={handleChange} />
      </div>
      <div>
        <label>Téléphone: </label>
        <input
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
        />
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
      <button type="submit">Mettre à jour</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
        Annuler
      </button>
    </form>
  );
}
