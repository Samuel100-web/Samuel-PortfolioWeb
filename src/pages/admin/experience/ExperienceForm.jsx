import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ExperienceForm = () => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // 👉 Load data if editing
  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:7290/api/experience/${id}`).then((res) => {
        const data = res.data;
        setCompany(data.company);
        setRole(data.role);
        setFrom(data.from); // ✅ fix
        setTo(data.to);
        setDescription(data.description);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company || !role || !from || !to || !description) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = { company, role, from, to, description };

    try {
      if (id) {
        await axios.put(`https://localhost:7290/api/experience/${id}`, payload);
        alert("✅ Experience updated successfully");
      } else {
        await axios.post("https://localhost:7290/api/experience", payload);
        alert("✅ Experience created successfully");
      }
      navigate("/admin/experience");
    } catch (error) {
      console.error("Save error:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          {id ? "✏️ Edit Experience" : "🧑‍💼 Add New Experience"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company */}
          <div>
            <label className="block font-semibold text-gray-700">Company *</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Microsoft"
              required
            />
          </div>

          {/* Role / Position */}
          <div>
            <label className="block font-semibold text-gray-700">Position *</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Software Engineer"
              required
            />
          </div>

          {/* From Date */}
          <div>
            <label className="block font-semibold text-gray-700">From Date *</label>
            <input
                type="date"
                value={from}
                onChange={(e) => {
                console.log("📅 From Date:", e.target.value);
                setFrom(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
            />
            </div>

            <div>
            <label className="block font-semibold text-gray-700">To Date *</label>
            <input
                type="date"
                value={to}
                onChange={(e) => {
                console.log("📅 To Date:", e.target.value);
                setTo(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
            />
        </div>


          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700">Description *</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe your responsibilities and achievements"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition"
          >
            {id ? "Update Experience" : "Create Experience"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
