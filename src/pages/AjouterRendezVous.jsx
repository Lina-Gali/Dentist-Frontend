import AddRendezVousForm from "../components/AddRendezVousForm";
import { useNavigate } from "react-router-dom";

export default function AjouterRendezVousPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <AddRendezVousForm
        onAdd={() => {
          navigate("/rendezvous");
        }}
        onCancel={() => navigate("/rendezvous")}
      />
    </div>
  );
}

