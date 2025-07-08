import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaCode, FaChartBar } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    // Dummy visitor count (optional: replace with real API later)
    setVisitorCount(Math.floor(Math.random() * 100) + 1);

    // GA: Track scroll events
    const handleScroll = () => {
      if (window.gtag) {
        window.gtag("event", "scroll", {
          event_category: "Interaction",
          event_label: "User scrolled the page",
        });
      }
    };

    // GA: Track click events
    const handleClick = () => {
      if (window.gtag) {
        window.gtag("event", "click", {
          event_category: "Interaction",
          event_label: "User clicked on the page",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex gap-2 text-lg sm:text-xl font-bold text-yellow-400 tracking-wide items-center hover:text-yellow-300 transition">
          PORTFOLIO
          <FaCode className="text-orange-600 text-2xl sm:text-3xl" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-base font-medium">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About Me</Link>
          <Link className="nav-link" to="/contact">Contact</Link>

          {/* Analytics Icon */}
          <button
            onClick={() => setShowAnalytics(true)}
            className="relative text-white hover:text-yellow-400 transition"
            title="Analytics"
          >
            <FaChartBar className="text-xl" />
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-1">
              {visitorCount}
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 space-y-4 text-base font-medium bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 origin-top ${
          isMenuOpen ? "animate-fade-in-down scale-100 opacity-100" : "hidden"
        } text-center`}
      >
        <Link onClick={toggleMenu} className="nav-link block" to="/">Home</Link>
        <Link onClick={toggleMenu} className="nav-link block" to="/about">About Me</Link>
        <Link onClick={toggleMenu} className="nav-link block" to="/contact">Contact</Link>

        {/* Optional: Analytics in mobile menu too */}
        <button
          onClick={() => {
            toggleMenu();
            setShowAnalytics(true);
          }}
          className="nav-link block text-yellow-400"
        >
          <FaChartBar className="inline mr-2" />
          Analytics
        </button>
      </div>

      {/* Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setShowAnalytics(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-indigo-800 mb-4">📊 Site Analytics</h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>👥 Visitors: {visitorCount}</li>
              <li>🖱️ Clicks & scrolls tracked via Google Analytics</li>
              <li>🌍 Region/Device: Check GA Dashboard</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              Visit <strong>analytics.google.com</strong> for full report.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
