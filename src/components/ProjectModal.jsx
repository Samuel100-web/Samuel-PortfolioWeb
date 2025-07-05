import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaTimes,
  FaThumbsUp,
  FaThumbsDown,
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
} from "react-icons/fa";

const ProjectModal = ({ project, onClose }) => {
  const [reaction, setReaction] = useState({ likes: 0, dislikes: 0, avgRating: 0 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch current project reactions
  useEffect(() => {
    axios
      .get(`https://localhost:7290/api/projectreactions/${project.id}`)
      .then((res) => setReaction(res.data))
      .catch((err) => console.log(err));
  }, [project]);

  // Submit like/dislike + rating
  const submitReaction = async (isLike) => {
    if (selectedRating === 0) {
      alert("⭐ Please select a star rating before reacting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("https://localhost:7290/api/projectreaction", {
        projectId: project.id,
        isLike,
        rating: selectedRating,
      });

      // Fetch updated reaction data
      const res = await axios.get(`https://localhost:7290/api/projectreactions/${project.id}`);
      setReaction(res.data);
    } catch (err) {
      console.error("Reaction submit error:", err);
      alert("❌ Failed to submit reaction");
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-xl w-full max-w-3xl p-6 relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-red-600 text-xl">
          <FaTimes />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`https://localhost:7290${project.imageUrl}`}
            alt={project.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-xl"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-indigo-700 mb-2">{project.title}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>

            <p className="mb-3">
              <strong>Tech Stack:</strong> {project.techStack}
            </p>

            <div className="flex gap-4 items-center mb-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 hover:text-black flex items-center gap-2"
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-700 hover:text-green-900 flex items-center gap-2"
                >
                  <FaExternalLinkAlt /> Live
                </a>
              )}
            </div>

            {/* Like/Dislike Buttons */}
            <div className="flex gap-6 mb-4">
              <button
                onClick={() => submitReaction(true)}
                disabled={isSubmitting}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 disabled:opacity-50"
              >
                <FaThumbsUp /> Like ({reaction.likes})
              </button>
              <button
                onClick={() => submitReaction(false)}
                disabled={isSubmitting}
                className="flex items-center gap-1 text-gray-600 hover:text-red-600 disabled:opacity-50"
              >
                <FaThumbsDown /> Dislike ({reaction.dislikes})
              </button>
            </div>

            {/* Star Rating */}
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <FaStar
                  key={n}
                  className={`cursor-pointer text-xl ${
                    n <= selectedRating ? "text-yellow-400" : "text-gray-400"
                  }`}
                  onClick={() => setSelectedRating(n)}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">Average: {reaction.avgRating.toFixed(1)} ⭐</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
