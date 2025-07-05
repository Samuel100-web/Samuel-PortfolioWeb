import { logout } from "../../utils/auth.js";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Welcome Admin</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
      {/* Add CRUD buttons here later */}
    </div>
  );
}

export default Dashboard;
