import { useEffect, useState } from 'react';
import api from '../api';

export default function AddRendezVousForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    patient_id: '',
    date_heure: '',
    motif: '',
    status: 'prévu',
  });

  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients');
      setPatients(response.data);
    } catch (err) {
      console.error('Erreur chargement patients', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await api.post('/rendezvous', formData);
      onAdd(response.data);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Ajouter un Rendez-vous</h3>

      <div>
        <label>Patient :</label>
        <select name="patient_id" value={formData.patient_id} onChange={handleChange} required>
          <option value="">-- Sélectionner --</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nom} {p.prenom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Date & Heure :</label>
        <input
          type="datetime-local"
          name="date_heure"
          value={formData.date_heure}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Motif :</label>
        <input name="motif" value={formData.motif} onChange={handleChange} />
      </div>

      <div>
        <label>Status :</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="prévu">Prévu</option>
          <option value="terminé">Terminé</option>
          <option value="annulé">Annulé</option>
        </select>
      </div>

      <button type="submit">Ajouter</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Annuler
      </button>
    </form>
  );
}
