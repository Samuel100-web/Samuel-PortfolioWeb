import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [techStack, setTechStack] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // 👉 Load data on edit
  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:7290/api/project/${id}`).then((res) => {
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setGithubLink(data.githubLink);
        setLiveLink(data.liveLink);
        setTechStack(data.techStack);
        setPreviewUrl(data.imageUrl); // just the relative path
      });
    }
  }, [id]);

  // 👉 On file select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result); // data URI
      reader.readAsDataURL(file);
    }
  };

  // 👉 On form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !techStack) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("githubLink", githubLink);
    formData.append("liveLink", liveLink);
    formData.append("techStack", techStack);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (id) {
        await axios.put(`https://localhost:7290/api/project/${id}`, formData);
        alert("✅ Project updated successfully");
      } else {
        await axios.post("https://localhost:7290/api/project", formData);
        alert("✅ Project created successfully");
      }
      navigate("/admin/projects");
    } catch (error) {
      console.error("Save error:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          {id ? "✏️ Edit Project" : "🚀 Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-semibold text-gray-700">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter project title"
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
              placeholder="Describe the project"
              required
            />
          </div>

          {/* GitHub Link */}
          <div>
            <label className="block font-semibold text-gray-700">GitHub Link</label>
            <input
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://github.com/yourproject"
            />
          </div>

          {/* Live Link */}
          <div>
            <label className="block font-semibold text-gray-700">Live Link</label>
            <input
              type="url"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://yourproject.live"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block font-semibold text-gray-700">Tech Stack *</label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="React, ASP.NET Core, SQL"
              required
            />
          </div>

          {/* Image Upload + Preview */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {previewUrl && (
              <img
                src={
                  previewUrl.startsWith("data:")
                    ? previewUrl
                    : `https://localhost:7290${previewUrl}`
                }
                alt="Preview"
                className="mt-4 h-48 object-cover rounded-lg border shadow-md"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition"
          >
            {id ? "Update Project" : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
