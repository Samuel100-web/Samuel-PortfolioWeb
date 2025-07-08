import { FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import { educationData } from "../data/educationData";

const EducationSection = () => {
  return (
    <section className="overflow-x-hidden bg-gradient-to-b from-gray-900 via-indigo-800 to-gray-500 py-20 px-4 text-white mt-2">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-12">
        🎓 My Education
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Timeline Line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-300" />

        <div className="flex flex-col gap-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-xl shadow-md p-6 text-black w-full md:w-[48%]
                ${index % 2 === 0 ? "self-start" : "self-end"}
              `}
            >
              <div className="hidden md:flex absolute -left-9 top-6 bg-indigo-600 text-white p-3 rounded-full shadow-md">
                <FaGraduationCap size={20} />
              </div>

              <h3 className="text-xl font-semibold text-indigo-700">{edu.degree}</h3>
              <p className="text-gray-700">{edu.institute}</p>
              <p className="text-gray-600 text-sm">
                {edu.year} — Grade: {edu.grade}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
