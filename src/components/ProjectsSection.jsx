import { useState } from "react";
import { motion } from "framer-motion";
import ProjectModal from "../components/ProjectModal";
import projects from "../data/projectData"; // ✅ static import

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="overflow-x-hidden bg-gradient-to-b from-gray-800 via-blue-800 to-gray-900 py-20 px-4 text-white mt-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-12">
          🚀 Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-12 text-white shadow-lg">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-500"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">
                  {project.description.slice(0, 70)}...
                </p>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
                >
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
