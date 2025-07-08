import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://formspree.io/f/xdkzrkll", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: new FormData(e.target),
    });

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thanks for contacting. I'll get back to you soon.",
        timer: 2500,
        showConfirmButton: false,
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });

      // Redirect after short delay
      setTimeout(() => navigate("/"), 2600);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-800 via-gray-900 to-gray-700 text-gray-700">
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-10 border border-white/10">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8">
    📩 Contact Us
  </h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
        placeholder="Your name"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
        placeholder="you@example.com"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Message *</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={5}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
        placeholder="Write your message..."
      />
    </div>

    <button
      type="submit"
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition duration-300 text-sm sm:text-base"
    >
      Send Message
    </button>
  </form>
</div>

      </div>

      <Footer />
    </div>
  );
};

export default Contact;
