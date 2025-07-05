import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { login } from "../utils/auth.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", { email, password });

      if (res.data.success) {
        login(); // ✅ localStorage me isAdmin=true set
        navigate("/admin/dashboard");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data?.message);
      alert("Login failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-gray-900 to-gray-700 text-gray-700">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-2xl px-8 py-10 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-black">🔐 Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
