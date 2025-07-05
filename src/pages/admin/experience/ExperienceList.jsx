import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);

  const loadExperiences = async () => {
    try {
      const res = await axios.get("https://localhost:7290/api/experience");
      setExperiences(res.data);
    } catch (error) {
      console.error("Failed to load experiences:", error);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this experience?");
    if (!confirmDelete) return;

    await axios.delete(`https://localhost:7290/api/experience/${id}`);
    loadExperiences();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-800">📋 Experience List</h2>
          <Link
            to="/admin/experience/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          >
            ➕ Add Experience
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.position}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Company:</strong> {exp.company}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Role:</strong> {exp.role}
              </p>
              <p className="text-sm text-gray-600 mb-1">
  <strong>From:</strong>{" "}
  {exp.from && exp.from !== "0001-01-01T00:00:00"
    ? new Date(exp.from).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "N/A"}
</p>

<p className="text-sm text-gray-600 mb-1">
  <strong>To:</strong>{" "}
  {exp.to
    ? new Date(exp.to).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Present"}
</p>
              <p className="text-sm text-gray-600">
                {exp.description.length > 100
                  ? exp.description.slice(0, 100) + "..."
                  : exp.description}
              </p>

              <div className="mt-4 flex justify-end space-x-2">
                <Link
                  to={`/admin/experience/edit/${exp.id}`}
                  className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {experiences.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No experiences found.</p>
        )}
      </div>
    </div>
  );
};

export default ExperienceList;
