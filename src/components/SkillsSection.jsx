// src/components/SkillsSection.jsx
import { skills } from "../data/skillsData"; // <-- Adjust path as needed
import { motion } from "framer-motion";

const SkillsSection = () => {
  return (
    <section className="overflow-x-hidden bg-gradient-to-b from-gray-900 via-blue-600 to-gray-700 py-20 px-4 text-white mt-2">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-12">🛠️ Skills</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-16 h-16 object-contain mb-4 transition-transform duration-300 hover:scale-110"
            />
            <p className="font-semibold text-lg text-white">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
