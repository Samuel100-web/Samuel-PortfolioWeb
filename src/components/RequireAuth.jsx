// src/components/RequireAuth.jsx
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth.js";

function RequireAuth({ children }) {
  return isLoggedIn() ? children : <Navigate to="/admin/login" />;
}

export default RequireAuth;