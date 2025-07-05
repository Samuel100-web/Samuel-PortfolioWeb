import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EducationForm = () => {
  const [degree, setDegree] = useState("");
  const [institute, setInstitute] = useState("");
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // Load data if editing
  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:7290/api/education/${id}`).then((res) => {
        const data = res.data;
        setDegree(data.degree);
        setInstitute(data.institute);
        setYear(data.year);
        setGrade(data.grade);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!degree || !institute) {
      alert("Please fill required fields.");
      return;
    }

    const payload = { degree, institute, year, grade };

    try {
      if (id) {
        await axios.put(`https://localhost:7290/api/education/${id}`, payload);
        alert("✅ Education updated");
      } else {
        await axios.post("https://localhost:7290/api/education", payload);
        alert("✅ Education added");
      }
      navigate("/admin/education");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          {id ? "✏️ Edit Education" : "🎓 Add New Education"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Degree */}
          <div>
            <label className="block font-semibold text-gray-700">Degree *</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. BS Computer Science"
              required
            />
          </div>

          {/* Institute */}
          <div>
            <label className="block font-semibold text-gray-700">Institute *</label>
            <input
              type="text"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. University of XYZ"
              required
            />
          </div>

          {/* Year */}
          <div>
            <label className="block font-semibold text-gray-700">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 2022"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="block font-semibold text-gray-700">Grade</label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. A+ or 3.8 CGPA"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition"
          >
            {id ? "Update Education" : "Create Education"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;
