
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import HeroBanner from "../components/HeroBanner"; // path adjust karo agar file aur folder ka naam different hai
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import Footer from "../components/Footer";
import HomeTeamSlider from "../components/HomeTeamSlider";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <ProjectsSection/>
      <EducationSection/>
      <ExperienceSection/>
      <SkillsSection />
      <HomeTeamSlider/>
      <Footer/>
      {/* Aage aap Projects, Education, Skills waghera call kar sakte ho */}
    </div>
  );
};

export default Home;