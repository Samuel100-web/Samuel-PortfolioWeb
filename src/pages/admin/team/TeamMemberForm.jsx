import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TeamMemberForm = () => {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");
  const [mobile, setMobile] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [memberId, setMemberId] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://localhost:7290/api/teammembers/${id}`)
        .then((res) => {
          const data = res.data;
          setFullName(data.fullName || "");
          setRole(data.role || "");
          setBio(data.bio || "");
          setLinkedInUrl(data.linkedInUrl || "");
          setGitHubUrl(data.gitHubUrl || "");
          setMobile(data.mobile || "");
          setPreviewUrl(data.imageUrl || null);
          setMemberId(data.id);
        })
        .catch((err) => {
          console.log("No TeamMember found:", err);
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

  const formData = new FormData();
  formData.append("id", memberId || 0);
  formData.append("fullName", fullName);
  formData.append("role", role);
  formData.append("bio", bio);
  formData.append("linkedInUrl", linkedInUrl);
  formData.append("gitHubUrl", gitHubUrl);
  formData.append("mobile", mobile);

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  try {
    await axios.post("https://localhost:7290/api/teammembers/save", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    alert(`✅ Team Member ${memberId ? "updated" : "created"} successfully`);
  } catch (err) {
    console.error("Save error:", err.response?.data || err.message);
    alert("❌ Something went wrong!");
  }
};



  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          {memberId ? "✏️ Edit Team Member" : "👨‍💼 Add Team Member"}
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
            <label className="block font-semibold text-gray-700">Role *</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
              required
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
            <label className="block font-semibold text-gray-700">LinkedIn URL</label>
            <input
              type="text"
              value={linkedInUrl}
              onChange={(e) => setLinkedInUrl(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">GitHub URL</label>
            <input
              type="text"
              value={gitHubUrl}
              onChange={(e) => setGitHubUrl(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Mobile</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
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
                className="mt-4 h-32 w-32 object-cover rounded-full border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
          >
            {memberId ? "Update" : "Create"} Team Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamMemberForm;
