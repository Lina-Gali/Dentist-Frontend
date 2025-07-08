import AddPatientForm from "../components/AddPatientForm";
import { useNavigate } from "react-router-dom";

export default function AjouterPatientPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <AddPatientForm
        onAdd={() => navigate("/patients")}
        onCancel={() => navigate("/patients")}
      />
    </div>
  );
}
