import DeviceScroll from "../components/DeviceScroller";
import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../components/AuthContext";
import { useEffect } from 'react';

import "../styles/landingpage.css";

import personphoneimg from "../assets/persononphone.jpg"
import cityscape from "../assets/cityscape2.jpeg"

function LandingPage() {
    const token = localStorage.getItem('jwt');
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
    }, []);

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
                        Even small conveniences we take seriously to ensure a smooth user experience. Built with calm and
                        refreshing colors, we aim to enhance and streamline your productivity.
                    </p>
                    <img src={cityscape} alt="city scape" class="popimg" id="city"/>
                </div>
            </div>
            <div id="sign-up">
                <SignupForm/>
            </div>
        </div>
    );
}

export default LandingPage;