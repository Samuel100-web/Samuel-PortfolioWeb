import Slider from "react-slick";
import { teamMembersData } from "../data/teamMembersData"; // ✅ Static import

const HomeTeamSlider = () => {
  const members = teamMembersData; // 🧠 No axios, no API

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
    <section className="overflow-x-hidden bg-gradient-to-b from-black via-gray-400 to-gray-700 py-20 px-4 text-white mt-2">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-12">👥 Meet Our Team</h2>

      <Slider {...settings}>
        {members.map((member) => (
          <div key={member.id} className="px-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
              <img
                src={member.imageUrl}
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
