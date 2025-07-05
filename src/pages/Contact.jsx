import { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer"; // adjust path if needed

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      alert("Email and message are required");
      return;
    }

    try {
      await axios.post("https://localhost:7290/api/contact", {
        name,
        email,
        message,
      });
      alert("✅ Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Send error:", error);
      alert("❌ Failed to send message");
    }
  };

  return (
    <div className=" flex flex-col min-h-screen bg-gradient-to-br from-indigo-800 via-gray-900 to-gray-700 text-gray-700">
      {/* Centered Form */}
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-center text-black mb-8">📩 Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Message *</label>
              <textarea
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Contact;
