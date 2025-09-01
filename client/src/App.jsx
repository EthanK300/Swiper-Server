import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./components/AuthContext";

import Main from "./pages/Main";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <AuthProvider>
        <Router>
            <Navbar />

            <main style={{ paddingTop: "calc(10vh + 32px)" }}>
            <Routes>
                <Route path="/" element={
                    <>
                        <LandingPage />
                        <Footer />
                    </>
            } />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Main />} />
            </Routes>
            </main>

        </Router>
        </AuthProvider>
    );
}

export default App;
