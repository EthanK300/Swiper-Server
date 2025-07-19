import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import swiperlogo from '../assets/swiperlogobetter.png';
import blankprofile from '../assets/blank_profile.png';
// import { AuthContext } from '../context/AuthContext';

import '../styles/navbar.css'

function Navbar() {

    const navigate = useNavigate();
    /*
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    */

    const home = () => {
        navigate('/');
        console.log('navigating to home');
    }

    const about = () => {
        navigate('/about');
        console.log('navigating to about');
    }

    const profile = () => {
        console.log('profile clicked');
    }

    return (
        <nav id="navbar">
            <div id="nav-left">
                <button id="home-button" onClick={home}>
                    <img src={swiperlogo} alt="Swiper Home Icon" id="swiper-icon"/>
                    <span>WIPER</span>
                </button>
            </div>
            <div id="nav-right">
                <button id="about-button" onClick={about}>About</button>
                <button id="profile-button" onClick={profile}>
                    <img src={blankprofile} alt="Profile" id="profile-icon"/>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;