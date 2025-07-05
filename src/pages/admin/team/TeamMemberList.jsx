import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeamMemberList = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const res = await axios.get("https://localhost:7290/api/teammembers");
      setMembers(res.data);
    } catch (err) {
      console.error("Failed to load team members", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this member?");
    if (!confirm) return;

    try {
      await axios.delete(`https://localhost:7290/api/teammembers/${id}`);
      alert("✅ Member deleted successfully!");
      loadTeamMembers(); // Refresh list
    } catch (err) {
      console.error("Delete failed:", err);
      alert("❌ Delete failed");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">👥 Team Members</h2>
        <button
          onClick={() => navigate("/admin/team/create")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        >
          ➕ Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <p className="text-gray-500">No team members found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={
                  member.imageUrl
                    ? `https://localhost:7290${member.imageUrl}`
                    : "/placeholder.png"
                }
                alt={member.fullName}
                className="w-24 h-24 rounded-full object-cover border"
              />
              <h3 className="text-xl font-semibold mt-3">{member.fullName}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>

              <div className="mt-2 text-sm text-gray-600 text-center">{member.bio}</div>

              {/* <div className="flex gap-3 mt-3">
                {member.linkedInUrl && (
                  <a href={member.linkedInUrl} target="_blank" rel="noreferrer">
                    <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                  </a>
                )}
                {member.gitHubUrl && (
                  <a href={member.gitHubUrl} target="_blank" rel="noreferrer">
                    <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5" />
                  </a>
                )}
                {member.mobile && (
                  <a href={`https://wa.me/${member.mobile}`} target="_blank" rel="noreferrer">
                    <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
                  </a>
                )}
              </div> */}

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate(`/admin/team/edit/${member.id}`)}
                  className="text-blue-600 font-medium"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-red-600 font-medium"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMemberList;
