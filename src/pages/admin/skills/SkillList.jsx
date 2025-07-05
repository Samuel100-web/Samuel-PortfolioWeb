import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SkillList = () => {
  const [skills, setSkills] = useState([]);

  const loadSkills = async () => {
    const res = await axios.get("https://localhost:7290/api/skill");
    setSkills(res.data);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const deleteSkill = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      await axios.delete(`https://localhost:7290/api/skill/${id}`);
      loadSkills();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">🛠️ Skills List</h2>
          <Link
            to="/admin/skills/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
          >
            ➕ Add Skill
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800">{skill.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Level: {skill.level}</p>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Link
                  to={`/admin/skills/edit/${skill.id}`}
                  className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold rounded"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No skills found.</p>
        )}
      </div>
    </div>
  );
};

export default SkillList;
