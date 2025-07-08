import { motion } from "framer-motion";
import { aboutData } from "../data/aboutData";
import samiImage from "../images/portfolioPic.jpg";
import bgRightImage from "../images/programming2.jpg"; // Background image

const AboutPage = () => {
  const about = aboutData;

  return (
    <div className="overflow-x-hidden min-h-screen mt-2 bg-gradient-to-b from-black via-gray-900 to-indigo-900 text-white">
      
      {/* 🔷 Banner Section with Background */}
      <section
        className="relative w-full h-[500px] sm:h-[600px] flex items-center px-6 sm:px-12"
        style={{
          backgroundImage: `url(${bgRightImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="relative inset-0 bg-black bg-opacity-60 z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start gap-4">
          <motion.img
            src={samiImage}
            alt="Samuel Yaqoob"
            className="w-36 h-36 sm:w-48 md:ml-50 sm:h-48 md:w-56 md:h-56 rounded-full object-cover shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.h1
            className="text-3xl sm:text-4xl md:ml-50 md:text-5xl font-extrabold text-white drop-shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            About Me
          </motion.h1>

          <motion.p
            className="text-indigo-300 md:ml-50 text-sm sm:text-base max-w-md"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Full Stack .NET & React Developer
          </motion.p>
        </div>
      </section>

      {/* 🔽 Bio Section */}
      <section className="relative w-full px-6 mt-2 sm:px-8 md:px-16 py-10 sm:py-14">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-400 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {about.fullName}
        </motion.h2>

        <motion.div
          className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed space-y-4 w-full"
          dangerouslySetInnerHTML={{ __html: about.bio }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        {/* 📧 Contact Info */}
        <div className="mt-6 space-y-2 text-white">
          <p>
            📧{" "}
            <a
              href={`mailto:${about.email}`}
              className="underline text-indigo-300 hover:text-indigo-400"
            >
              {about.email}
            </a>
          </p>
          <p>
            📞{" "}
            <a
              href={`tel:${about.phone}`}
              className="underline text-indigo-300 hover:text-indigo-400"
            >
              {about.phone}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
