import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TestimonialForm = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [ImageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:7290/api/testimonial/${id}`).then((res) => {
        const data = res.data;
        setName(data.name);
        setDesignation(data.designation);
        setFeedback(data.feedback);
        setPreviewUrl(data.profileImageUrl);
      });
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !feedback) {
      alert("Name and Feedback are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("feedback", feedback);
    if (ImageFile) formData.append("imageFile", ImageFile);

    try {
      if (id) {
        await axios.put(`https://localhost:7290/api/testimonial/${id}`, formData);
        alert("✅ Testimonial updated");
      } else {
        await axios.post(`https://localhost:7290/api/testimonial`, formData);
        alert("✅ Testimonial created");
      }
      navigate("/admin/testimonials");
    } catch (error) {
      console.error("Save error:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          {id ? "✏️ Edit Testimonial" : "💬 Add Testimonial"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Feedback *</label>
            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && (
              <img
                src={
                  previewUrl.startsWith("data:")
                    ? previewUrl
                    : `https://localhost:7290${previewUrl}`
                }
                alt="Preview"
                className="mt-4 h-32 object-cover rounded-full border shadow-md"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg"
          >
            {id ? "Update" : "Create"} Testimonial
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
