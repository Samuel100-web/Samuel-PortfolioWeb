import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="overflow-x-hidden bg-gradient-to-b from-gray-900 via-purple-800 to-black py-5 px-2 text-white mt-2">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        {/* 🔤 Left - Text */}
        <p className="text-xs sm:text-sm md:text-base text-whiate">
          © {new Date().getFullYear()} Designed & Developed by Samuel Yaqoob
        </p>

        {/* 🔗 Right - Social Icons */}
        <div className="flex gap-4 sm:gap-6 justify-center">
          <a
            href="https://www.linkedin.com/in/samuel-yaqoob-0836a8325/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin className="text-xl sm:text-2xl md:text-3xl" />
          </a>

          <a
            href="https://github.com/Samuel100-web"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaGithub className="text-xl sm:text-2xl md:text-3xl" />
          </a>

          <a
            href="https://wa.me/923075941955?text=Hi%20Samuel,%20I%20visited%20your%20portfolio%20and%20wanted%20to%20connect!"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            <FaWhatsapp className="text-xl sm:text-2xl md:text-3xl" />
          </a>

          <a
            href="https://www.upwork.com/freelancers/~010b30422e41cc368e"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-300 transition-colors"
          >
            <SiUpwork className="text-xl sm:text-2xl md:text-3xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
