import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const HeroBanner = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:7290/api/about")
      .then((res) => setAbout(res.data))
      .catch((err) => console.log("Failed to load About data", err));
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    fullScreen: { enable: false },
    background: {
      color: {
        value: "#000000",
      },
    },
    particles: {
      number: { value: 60 },
      color: { value: "#ffffff" },
      shape: { type: ["circle", "triangle", "edge"] },
      opacity: { value: 0.2 },
      size: { value: { min: 1, max: 5 } },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: true,
        straight: false,
        outModes: "out",
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  };

  if (!about) {
    return <div className="text-center text-gray-500 py-10">Loading...</div>;
  }

  return (
    <section className="relative bg-gradient-to-r mt-2 from-gray-800 via-gray-900 to-black text-white py-28 px-6 overflow-hidden">
    
      {/* ✨ Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 w-full h-full z-0"
      />

      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-12  text-white shadow-lg relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Profile Image */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-shrink-0"
        >
          <motion.img
            whileHover={{ rotate: [0, 5, -5, 0], scale: 1.05 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            src={`https://localhost:7290${about.profileImageUrl}`}
            alt="Profile"
            className="w-72 h-72 rounded-full object-cover border-4 border-indigo-500 shadow-xl"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl font-bold mb-4">{about.fullName}</h1>

          <h2 className="text-2xl md:text-3xl text-green-500 font-semibold mb-6">
            <TypeAnimation
              sequence={[
                "Full Stack .NET Developer",
                2000,
                "React Frontend Developer",
                2000,
                "ASP.NET + React Enthusiast",
                2000,                
                "MERN Stack Explorer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>

          <p className="text-gray-300 max-w-xl leading-relaxed">{about.bio}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
