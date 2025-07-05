import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SiUpwork } from "react-icons/si";
import axios from "axios";

const Footer = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:7290/api/project")
      .then(res => {
        const firstProject = res.data[0];
        setProject(firstProject);
      })
      .catch(err => console.log("Project fetch failed", err));
  }, []);

  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        {/* Left - Text */}
        <p className="text-sm sm:text-base text-gray-400">
          © {new Date().getFullYear()} Designed & Developed by Samuel Yaqoob
        </p>

        {/* Right - Social Icons */}
        <div className="flex gap-6 justify-center">
          <a
            href="https://www.linkedin.com/in/samuel-yaqoob-0836a8325/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin className="text-2xl sm:text-3xl" />
          </a>

          {project?.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <FaGithub className="text-2xl sm:text-3xl" />
            </a>
          )}

          <a
            href="https://wa.me/923075941955?text=Hi%20Samuel,%20I%20visited%20your%20portfolio%20and%20wanted%20to%20connect!"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            <FaWhatsapp className="text-2xl sm:text-3xl" />
          </a>

          <a
            href="https://www.upwork.com/freelancers/~010b30422e41cc368e"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-300 transition-colors"
          >
            <SiUpwork className="text-2xl sm:text-3xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
