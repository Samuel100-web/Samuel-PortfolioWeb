import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SkillForm = () => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Beginner");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:7290/api/skills/${id}`).then((res) => {
        setName(res.data.name);
        setLevel(res.data.level);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skill = { name, level };

    try {
      if (id) {
        await axios.put(`https://localhost:7290/api/skill/${id}`, skill);
        alert("Skill updated successfully");
      } else {
        await axios.post("https://localhost:7290/api/skill", skill);
        alert("Skill created successfully");
      }
      navigate("/admin/skills");
    } catch (err) {
      console.error("Error saving skill:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {id ? "✏️ Edit Skill" : "➕ Add New Skill"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Skill Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. React, C#, Tailwind"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Skill Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {id ? "Update Skill" : "Create Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
