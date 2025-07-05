import { useEffect, useState } from "react";
import axios from "axios";

const AboutForm = () => {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [aboutId, setAboutId] = useState(null); // if data exists

  useEffect(() => {
    axios
      .get("https://localhost:7290/api/about")
      .then((res) => {
        if (res.data) {
          const data = res.data;
          setFullName(data.fullName || "");
          setBio(data.bio || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setPreviewUrl(data.profileImageUrl || null);
          setAboutId(data.id);
        }
      })
      .catch((err) => {
        console.log("No About record yet:", err);
      });
  }, []);

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

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("bio", bio);
    formData.append("email", email);
    formData.append("phone", phone);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      if (aboutId) {
  await axios.put(`https://localhost:7290/api/about/${aboutId}`, formData);
  alert("✅ About updated successfully");
} else {
  await axios.post("https://localhost:7290/api/about", formData); // ✅ Corrected line
  alert("✅ About created successfully");
}

    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          {aboutId ? "✏️ Edit About Info" : "🧑‍💼 Add About Info"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Full Name *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Bio *</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Profile Image</label>
            <input type="file" accept="image" onChange={handleImageChange} />
            {previewUrl && (
              <img
                src={
                  previewUrl.startsWith("data:")
                    ? previewUrl
                    : `https://localhost:7290${previewUrl}`
                }
                alt="Preview"
                className="mt-4 h-32 w-32 object-cover rounded-full border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
          >
            {aboutId ? "Update" : "Create"} About Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutForm;
