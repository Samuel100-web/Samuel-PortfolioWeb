import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "./utils/auth";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";

import Contact from "./pages/Contact";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth.jsx"; 

import Dashboard from "./pages/admin/Dashboard";

import ProjectList from "./pages/admin/projects/ProjectList.jsx";
import ProjectForm from "./pages/admin/projects/ProjectForm.jsx";

import SkillList from "./pages/admin/skills/SkillList";
import SkillForm from "./pages/admin/skills/SkillForm";

import ExperienceList from "./pages/admin/experience/ExperienceList.jsx";
import ExperienceForm from "./pages/admin/experience/ExperienceForm.jsx";

import EducationList from "./pages/admin/educations/EducationList.jsx";
import EducationForm from "./pages/admin/educations/EducationForm.jsx";

import TestimonialForm from "./pages/admin/testimonials/TestimonialForm.jsx";
import TestimonialList from "./pages/admin/testimonials/TestimonialList.jsx";

import AboutForm from "./pages/admin/about/AboutForm.jsx";

import ContectList from "./pages/admin/contact/ContactList.jsx";

import TeamMemberForm from "./pages/admin/team/TeamMemberForm.jsx";
import TeamMenberList from "./pages/admin/team/TeamMemberList.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />        
        <Route path="/contact" element={<Contact />} />        
        <Route path="/login" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route
  path="/admin/dashboard"
  element={
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  }
/>
        <Route
          path="/admin/projects"
          element={
            <PrivateRoute>
              <ProjectList />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/experience"
          element={
            <PrivateRoute>
              <ExperienceList />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/education"
          element={
            <PrivateRoute>
              <EducationList />
            </PrivateRoute>
          }
        />

        <Route 
        path="/admin/testimonials" 
        element={
          <PrivateRoute>
            <TestimonialList/>
          </PrivateRoute>
        } />

        <Route 
        path="/admin/contact" 
        element={
          <PrivateRoute>
            <AboutForm/>
          </PrivateRoute>
        } />

        <Route 
        path="/admin/contact" 
        element={
          <PrivateRoute>
            <ContectList/>
          </PrivateRoute>
        } />

        <Route 
        path="/admin/team" 
        element={
          <PrivateRoute>
            <TeamMenberList/>
          </PrivateRoute>
        } />
        <Route path="/admin/skills" element={<RequireAuth><SkillList /></RequireAuth>} />
        <Route path="/admin/skills/create" element={<RequireAuth><SkillForm /></RequireAuth>} />
        <Route path="/admin/skills/edit/:id" element={<RequireAuth><SkillForm /></RequireAuth>} />

        <Route path="/admin/projects" element={<RequireAuth><ProjectList /></RequireAuth>} />
        <Route path="/admin/projects/create" element={<RequireAuth><ProjectForm /></RequireAuth>} />
        <Route path="/admin/projects/edit/:id" element={<RequireAuth><ProjectForm /></RequireAuth>} />

        <Route path="/admin/experience" element={<RequireAuth><ExperienceList /></RequireAuth>} />
        <Route path="/admin/experience/create" element={<RequireAuth><ExperienceForm /></RequireAuth>} />
        <Route path="/admin/experience/edit/:id" element={<RequireAuth><ExperienceForm /></RequireAuth>} />

        <Route path="/admin/education" element={<RequireAuth><EducationList /></RequireAuth>} />
        <Route path="/admin/education/create" element={<RequireAuth><EducationForm /></RequireAuth>} />
        <Route path="/admin/education/edit/:id" element={<RequireAuth><EducationForm /></RequireAuth>} />

        <Route path="/admin/testimonials" element={<RequireAuth><TestimonialList /></RequireAuth>} />
        <Route path="/admin/testimonials/create" element={<RequireAuth><TestimonialForm /></RequireAuth>} />
        <Route path="/admin/testimonials/edit/:id" element={<RequireAuth><TestimonialForm /></RequireAuth>} />

        <Route path="/admin/contact-messages" element={<RequireAuth><ContectList /></RequireAuth>} />

        <Route path="/admin/about" element={<RequireAuth><AboutForm /></RequireAuth>} />

        <Route path="/admin/team" element={<RequireAuth><TeamMenberList /></RequireAuth>} />
        <Route path="/admin/team/create" element={<RequireAuth><TeamMemberForm /></RequireAuth>} />
        <Route path="/admin/team/edit/:id" element={<RequireAuth><TeamMemberForm /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
