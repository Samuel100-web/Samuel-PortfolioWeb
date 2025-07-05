import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

const HomeTeamSlider = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7290/api/teammembers")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error("Failed to load team members", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="bg-gradient-to-br from-gray-800 via-gray-800 to-indigo-600 text-white py-20 px-4 mt-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">👥 Meet Our Team</h2>

      <Slider {...settings}>
        {members.map((member) => (
          <div key={member.id} className="px-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
              <img
                src={`https://localhost:7290${member.imageUrl}`}
                alt={member.fullName}
                className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-white/30 shadow mb-4"
              />
              <h3 className="text-xl font-semibold text-white">{member.fullName}</h3>
              <p className="text-sm text-indigo-200">{member.role}</p>
              <p className="mt-2 text-sm text-gray-200">{member.bio}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HomeTeamSlider;
