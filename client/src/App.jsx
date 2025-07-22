import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./components/AuthContext";

import Main from "./pages/Main";
import LandingPage from "./pages/LandingPage";
import LoginRegister from "./pages/LoginRegister";
import About from "./pages/About";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
        <Router>
        <Navbar />
        
        <main>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/swiper" element={<Main/>} />
                <Route path="/login" element={<LoginRegister/>} />
                <Route path="/about" element={<About/>} />
            </Routes>
        </main>

        <Footer />
        </Router>
    </AuthProvider>
  );
}

export default App;
