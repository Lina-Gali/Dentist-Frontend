import Sidebar from "../components/SideBar";

export default function MainLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}
