import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo / Title */}
        <div className="flex gap-2 text-xl font-bold text-white tracking-wide">PORTFOLIO<FaCode className="text-white text-3xl" /></div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-base font-medium">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About Me</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
          

          {isLoggedIn() ? (
            <>
              <Link className="nav-link-admin" to="/admin/dashboard">Admin</Link>
              <Link className="nav-link-admin" to="/admin/skills">Skills</Link>
              <Link className="nav-link-admin" to="/admin/projects">Projects</Link>
              <Link className="nav-link-admin" to="/admin/experience">Experience</Link>
              <Link className="nav-link-admin" to="/admin/education">Education</Link>
              <Link className="nav-link-admin" to="/admin/testimonials">Testimonials</Link>
              <Link className="nav-link-admin" to="/admin/about">About Us</Link>
              <Link className="nav-link-admin" to="/admin/team">Team</Link>
              <Link className="nav-link-admin" to="/admin/contact-messages">Messages</Link>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-200 transition-all duration-200">Logout</button>
            </>
          ) : (
            <Link className="nav-link text-green-400 hover:text-green-200" to="/login">Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-base font-medium bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in-down">
          <Link onClick={toggleMenu} className="nav-link block" to="/">Home</Link>
          <Link onClick={toggleMenu} className="nav-link block" to="/about">About Me</Link>
          <Link onClick={toggleMenu} className="nav-link block" to="/contact">Contact</Link>

          {isLoggedIn() ? (
            <>
              <Link onClick={toggleMenu} className="nav-link-admin block" to="/admin/dashboard">Admin</Link>
              <Link onClick={toggleMenu} className="nav-link-admin block" to="/admin/skills">Skills</Link>
              <Link onClick={toggleMenu} className="nav-link-admin block" to="/admin/projects">Projects</Link>
              <Link onClick={toggleMenu} className="nav-link-admin block" to="/admin/experience">Experience</Link>
              <Link onClick={toggleMenu} className="nav-link-admin block" to="/admin/education">Education</Link>
              <Link onClick={toggleMenu} className="nav-link-admin block" to="/admin/testimonials">Testimonials</Link>
              <Link onClick={toggleMenu} className="nav-link-admin block" to="/admin/about">About Us</Link>
              <Link onClick={toggleMenu} className="nav-link-admin block" to="/admin/contact-messages">Messages</Link>
              <button onClick={handleLogout} className="block text-red-400 hover:text-red-200 transition-all duration-200">Logout</button>
            </>
          ) : (
            <Link onClick={toggleMenu} className="nav-link block text-green-400 hover:text-green-200" to="/login">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
