import { FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import { experienceData } from "../data/experienceData";

const ExperienceSection = () => {
  return (
    <section className="overflow-x-hidden bg-gradient-to-b from-gray-900 via-indigo-800 to-gray-700 py-20 px-4 text-white mt-2">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-12">
        💼 Experience
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline Vertical Line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-100 rounded z-30"></div>

        {/* Timeline Cards */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-12 text-white shadow-lg flex flex-col gap-12 relative z-10">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative bg-white bg-opacity-20 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full md:w-[48%] shadow-2xl hover:shadow-indigo-500/40 transition
                ${index % 2 === 0 ? "self-start ml-0 md:ml-8" : "self-end mr-0 md:mr-8"}`}
            >
              {/* Dot Icon on Timeline */}
              <div className="absolute top-6 -left-8 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <FaBriefcase size={14} />
              </div>

              <h3 className="text-xl font-bold text-indigo-700">{exp.role}</h3>
              <p className="text-lg font-medium text-gray-900">{exp.company}</p>
              <p className="text-sm text-black mt-1 mb-3">
                {new Date(exp.fromDate).toLocaleDateString()} –{" "}
                {exp.toDate
                  ? new Date(exp.toDate).toLocaleDateString()
                  : "Present"}
              </p>
              <div className="text-black text-lg">{exp.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
