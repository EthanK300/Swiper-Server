import DeviceScroll from "../components/DeviceScroller";
import SignupForm from "../components/SignupForm";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../components/AuthContext";
import { useEffect } from 'react';

import "../styles/landingpage.css";

function LandingPage() {
    const token = localStorage.getItem('jwt');
    const location = useLocation();
    const navigate = useNavigate();
    const { login, logout } = useAuth();

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    console.log("EXPIRED TOKEN! KICKED BACK TO LANDING PAGE");
                    logout();
                }else{
                    console.log("token renewed on dashboard");
                    login(token);
                    navigate('/dashboard');
                }
            } catch {
                console.log("ERROR HANDLING TOKEN");
                logout();
            }
        } else {
            console.log("NO TOKEN! KICKED BACK TO LANDING PAGE");
            logout();
        }

        const scrollTarget = location.state?.scrollTo;
        if(scrollTarget){
            setTimeout(() => {
                const offset = window.innerHeight * 0.1;
                const element = document.getElementById(scrollTarget);
                if(element){
                    const y = element.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                    console.log(`scrolled to: ${scrollTarget}`);
                } else {
                    console.log(`element #${scrollTarget} not found`);
                }
            }, 0);

            navigate(location.pathname, {replace: true, state: {}});
        }
    }, [location]);

    return (
        <div id="content">
            <div id="cta">
                <div id="left">
                    <div id="cta-circle">
                        <span id="cta-text">Supercharging your productivity.</span>
                        <div id="encourage">
                            <p id="encourage-text">Download the app!</p>
                            <div id="button-row">
                                <a href="https://github.com/EthanK300/Swiper" rel="noreferrer" target="_blank" class="download-button" id="android-button">Android</a>
                                {/* <a href="/" target="_blank" class="download-button" id="ios-button">iOS</a> */}
                                {/* TODO: need to update these links with potential actual download links later */}
                            </div>
                        </div>
                    </div>
                    <div id="support" onClick={() => {window.location.href = "mailto:support@swipersystems.com";}}>
                        We’re in early access 🚀!<br/>Feedback welcome at support@swipersystems.com<br/>(Click to open mailto link)
                    </div>
                </div>
                <div id="right">
                    <DeviceScroll/>
                </div>
            </div>
            <div id="sign-up">
                <SignupForm/>
            </div>
        </div>
    );
}

export default LandingPage;