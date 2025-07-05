import { useEffect, useState } from "react";
import axios from "axios";

const ContactList = () => {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    try {
      const res = await axios.get("https://localhost:7290/api/contact");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-indigo-800 mb-6 text-center">📬 Contact Messages</h2>

        <div className="overflow-x-auto shadow-2xl rounded-2xl border border-indigo-200 bg-white">
          <table className="min-w-full divide-y divide-indigo-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">ID</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">Email</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">Message</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.map((msg, index) => (
                <tr key={msg.id} className="hover:bg-indigo-50 transition duration-200">
                  <td className="px-6 py-4 font-semibold text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800">{msg.name}</td>
                  <td className="px-6 py-4 text-blue-700">{msg.email}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-pre-line max-w-xs break-words">
                    {msg.message.length > 100 ? msg.message.slice(0, 100) + "..." : msg.message}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
