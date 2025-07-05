import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    try {
      const res = await axios.get("https://localhost:7290/api/project");
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    await axios.delete(`https://localhost:7290/api/project/${id}`);
    loadProjects();
  };

  const baseUrl = "https://localhost:7290";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-800">📂 Project List</h2>
          <Link
            to="/admin/projects/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          >
            ➕ Add Project
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition duration-300"
            >
              <img
                src={`https://localhost:7290${project.imageUrl}`}
                alt={project.title}
                className="h-48 w-full object-cover"
                />

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600 flex-grow">
                  {project.description.length > 100
                    ? project.description.slice(0, 100) + "..."
                    : project.description}
                </p>
                <div className="mt-3 text-sm text-indigo-700">
                  <strong>Stack:</strong> {project.techStack}
                </div>

                <div className="mt-3 flex space-x-2 text-sm">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      🔗 GitHub
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      🌐 Live
                    </a>
                  )}
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <Link
                    to={`/admin/projects/edit/${project.id}`}
                    className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
