import { useNavigate } from "react-router-dom";
import StackedScroll from "../components/StackedScroller";
import DeviceScroll from "../components/DeviceScroller";
import "../styles/landingpage.css";

import personphoneimg from "../assets/persononphone.jpg"
import cityscape from "../assets/cityscape2.jpeg"

function LandingPage() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div id="content">
            <div id="cta">
                <div id="left">
                    <div id="cta-circle">
                        <span id="cta-text">Supercharging your productivity.</span>
                    </div>
                </div>
                <div id="right">
                    <DeviceScroll/>
                </div>
            </div>
            <div id="whatis">
                <h1 class="headline">What is Swiper?</h1>
                <div class="left-right">
                    <img src={personphoneimg} alt="person on phone" class="popimg"/>
                    <ul class="general">Swiper is a sleek, task-oriented app designed to 
                    help you track and manage time-sensitive activities with ease.
                        <li>
                        Create and organize items with intuitive forms
                        </li>
                        <li>
                        Easy scheduling using built-in date and time pickers, and view tasks in a clean,
                        responsive layout
                        </li>
                        <li>
                        Optimized for speed and simplicity
                        </li>
                        Swiper 
                        keeps you focused on what matters most - getting things done.
                    </ul>
                </div>
                <h1 class="headline">Our Mission</h1>
                <div class="right-left">
                    <p class="general" id="mission-text">
                        Our mission at the Swiper team is to build tools optimized for clarity, efficiency, and usability. 
                        Even small conveniences we take seriously to ensure a smooth user experience. 
                    </p>
                    <img src={cityscape} alt="city scape" class="popimg" id="city"/>
                </div>
            </div>
            {/* <StackedScroll id="test"/> */}
        </div>
    );
}

export default LandingPage;