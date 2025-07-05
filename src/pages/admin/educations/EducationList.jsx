import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EducationList = () => {
  const [educations, setEducations] = useState([]);

  const loadEducations = async () => {
    try {
      const res = await axios.get("https://localhost:7290/api/education");
      setEducations(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    loadEducations();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this education?");
    if (!confirm) return;

    await axios.delete(`https://localhost:7290/api/education/${id}`);
    loadEducations();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-800">🎓 Education List</h2>
          <Link
            to="/admin/education/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          >
            ➕ Add Education
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">{edu.degree}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Institute:</strong> {edu.institute}
              </p>
              {edu.year && (
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Year:</strong> {edu.year}
                </p>
              )}
              {edu.grade && (
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Grade:</strong> {edu.grade}
                </p>
              )}

              <div className="mt-4 flex justify-end space-x-2">
                <Link
                  to={`/admin/education/edit/${edu.id}`}
                  className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {educations.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No education records found.</p>
        )}
      </div>
    </div>
  );
};

export default EducationList;
