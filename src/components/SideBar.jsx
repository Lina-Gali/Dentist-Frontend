import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // On va y mettre du style propre

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🦷 DentalCab</h2>
      <nav>
        <NavLink
          to="/patients"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          👥 Patients
        </NavLink>
        <NavLink
          to="/rendezvous"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          📅 Tous les rendez-vous
        </NavLink>
        <NavLink
          to="/aujourdhui"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          📆 Aujourd'hui
        </NavLink>
      </nav>
    </div>
  );
}
