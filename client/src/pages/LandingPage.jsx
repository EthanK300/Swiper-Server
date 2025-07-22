import { useNavigate } from "react-router-dom";
import StackedScroll from "../components/StackedScroller";
import "../styles/landingpage.css";


function LandingPage() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div id="cta">
            <div id="left">
                <div id="cta-circle">
                    <span id="cta-text">Supercharging your productivity</span>
                </div>
            </div>
            <div id="right">
                <StackedScroll/>
            </div>
        </div>
    );
}

export default LandingPage;