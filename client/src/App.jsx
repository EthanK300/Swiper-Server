import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Main from "./pages/Main";
import LandingPage from "./pages/LandingPage";
import LoginRegister from "./pages/LoginRegister";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/swiper" element={<Main/>} />
            <Route path="/login" element={<LoginRegister/>} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
