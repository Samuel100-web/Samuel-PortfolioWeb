import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";

import Contact from "./pages/Contact";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />        
        <Route path="/contact" element={<Contact />} />        
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
