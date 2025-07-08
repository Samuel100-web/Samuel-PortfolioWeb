import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaLinkedin
} from "react-icons/fa";

const ProjectModal = ({ project, onClose }) => {
  const [selectedRating, setSelectedRating] = useState(4); // ✅ Default rating

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-5xl p-6 sm:p-10 relative shadow-2xl overflow-hidden"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-red-600 text-2xl font-bold hover:text-red-800"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* 📸 Image */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full md:w-1/2 h-72 object-cover rounded-xl border-4 border-indigo-600 shadow-lg"
          />

          {/* 📄 Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-indigo-700 mb-2">{project.title}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>

            {project.techStack && (
              <p className="mb-3 text-sm text-gray-600">
                <strong>Tech Stack:</strong> {project.techStack}
              </p>
            )}

            {/* ⭐ Rating (Default 4 stars) */}
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <FaStar
                  key={n}
                  className={`text-xl cursor-pointer transition ${
                    n <= selectedRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setSelectedRating(n)}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                Your Rating: {selectedRating}/5
              </span>
            </div>

            {/* 🔗 Links */}
            <div className="flex flex-wrap gap-4 mt-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white bg-gray-800 hover:bg-black px-4 py-2 rounded-md"
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
                >
                  <FaExternalLinkAlt /> Live Preview
                </a>
              )}
              <a
                href="https://github.com/Samuel100-web"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md"
              >
                <FaGithub /> My GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/samuel-yaqoob-0836a8325/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md"
              >
                <FaLinkedin /> My LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
