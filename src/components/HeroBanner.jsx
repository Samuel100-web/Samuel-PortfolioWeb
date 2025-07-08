import { Link } from "react-router-dom";
import { FaFileDownload, FaPaperPlane } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";


const HeroBanner = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "#000000" } },
    particles: {
      number: { value: 60 },
      color: { value: "#ffffff" },
      shape: { type: ["circle", "triangle", "edge"] },
      opacity: { value: 0.2 },
      size: { value: { min: 1, max: 5 } },
      move: { enable: true, speed: 1.2, random: true, outModes: "out" },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    detectRetina: true,
  };

  // ✅ Static Data
  const fullName = "SAMUEL YAQOOB";
  const email = "yaqoobsamuel100@outlook.com";
  const phone = "+92 307 5941977";
  const profileImageUrl = "../../src/images/portfolioPic.jpg"; // put image in public folder

  return (
    <section className="relative overflow-x-hidden bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white px-4 sm:px-6 pt-12 sm:pt-16 pb-10 mt-2">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 w-full h-full z-0"
      />

      <div className="bg-transparent rounded-xl p-6 sm:p-10 md:p-12 text-white shadow-lg relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
        {/* Profile Image */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-shrink-0"
        >
          <motion.img
            whileHover={{ rotate: [0, 5, -5, 0], scale: 1.05 }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            src={profileImageUrl}
            alt="Profile"
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-indigo-500 shadow-xl"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left w-full"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {fullName}
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-400 font-semibold mb-4 sm:mb-6">
            <TypeAnimation
              sequence={[
                "Full Stack .NET Developer", 2000,
                "React Frontend Developer", 2000,
                "ASP.NET + React Enthusiast", 2000,
                "MERN Stack Explorer", 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>

          <div className="text-sm sm:text-base text-left space-y-1 mb-6">
            <p>
              📧 <a href={`mailto:${email}`} className="underline hover:text-indigo-400">{email}</a>
            </p>
            <p>
              📞 <a href={`tel:${phone}`} className="underline hover:text-indigo-400">{phone}</a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
            >
              <FaPaperPlane /> Hire Me
            </Link>

            <a
              href="/Samuel_Yaqoob_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-indigo-400 hover:bg-indigo-500 hover:text-white text-indigo-300 px-5 py-2.5 rounded-lg font-medium transition"
              download
            >
              <FaFileDownload /> View CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
