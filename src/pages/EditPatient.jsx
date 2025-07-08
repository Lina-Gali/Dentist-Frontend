import { useNavigate } from "react-router-dom";
import EditPatientForm from "../components/EditPatientForm";

export default function AjouterRendezVousPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <EditPatientForm
        onAdd={() => {
          navigate("/patients");
        }}
        onCancel={() => navigate("/patients")}
      />
    </div>
  );
}
