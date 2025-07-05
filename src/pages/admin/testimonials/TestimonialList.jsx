import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);

  const loadTestimonials = async () => {
    try {
      const res = await axios.get("https://localhost:7290/api/testimonial");
      setTestimonials(res.data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this testimonial?");
    if (!confirm) return;

    await axios.delete(`https://localhost:7290/api/testimonial/${id}`);
    loadTestimonials();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-800">💬 Testimonials</h2>
          <Link
            to="/admin/testimonials/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          >
            ➕ Add Testimonial
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              {t.profileImageUrl && (
                <img
                  src={`https://localhost:7290${t.profileImageUrl}`}
                  alt={t.name}
                  className="h-20 w-20 rounded-full object-cover mb-3"
                />
              )}
              <h3 className="text-xl font-bold text-gray-800 mb-1">{t.name}</h3>
              <p className="text-sm text-gray-600 italic">{t.designation}</p>
              <p className="text-sm text-gray-700 mt-3">
                {t.feedback.length > 100
                  ? t.feedback.slice(0, 100) + "..."
                  : t.feedback}
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <Link
                  to={`/admin/testimonials/edit/${t.id}`}
                  className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No testimonials found.</p>
        )}
      </div>
    </div>
  );
};

export default TestimonialList;
