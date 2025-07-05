import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AboutPage = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:7290/api/about")
      .then(res => setAbout(res.data))
      .catch(err => console.log("Failed to fetch about info", err));
  }, []);

  if (!about) {
    return <div className="text-center text-gray-500 py-20">Loading...</div>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white px-6 pt-20 mt-2 pb-10">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

    {/* Left: Profile Image */}
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="md:col-span-1 flex justify-start"
    >
      <img
        src={`https://localhost:7290${about.profileImageUrl}`}
        alt={about.fullName}
        className="w-64 h-64 rounded-full object-cover border-4 border-indigo-500 shadow-xl"
      />
    </motion.div>

    {/* Right: Info Card */}
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="md:col-span-2 backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-8"
    >
      <h2 className="text-4xl font-bold text-indigo-400 mb-4">{about.fullName}</h2>
      <p className="text-gray-300 text-xl mb-6 leading-relaxed">{about.bio}</p>
      <div className="text-lg space-y-2">
        <p><span className="font-medium text-white">📧 Email:</span> {about.email}</p>
        <p><span className="font-medium text-white">📞 Phone:</span> {about.phone}</p>
      </div>
    </motion.div>

  </div>
</section>


  );
};

export default AboutPage;
