import { useNavigate } from "react-router-dom";
import StackedScroll from "../components/StackedScroller";
import DeviceScroll from "../components/DeviceScroller";
import "../styles/landingpage.css";

import personphoneimg from "../assets/persononphone.jpg"


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
                <h1 id="headline">What is Swiper?</h1>
                <div id="left-right">
                    <div id="circle-wrapper">
                        <img src={personphoneimg} alt="person on phone" id="popimg"/>
                    </div>
                    <p id="general">test test test 
                    test test test 
                    test test test 
                    test test test 
                    test test test 
                    test test test 
                    test test test 
                    test test test 
                    test test test 
                    test test test 
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;