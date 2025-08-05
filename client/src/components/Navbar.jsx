import { useNavigate, useSearchParams } from 'react-router-dom';
import swiperlogo from '../assets/swiperlogobetter.png';
import { useAuth } from './AuthContext';
import ProfileMenu from './ProfileMenu';

import '../styles/navbar.css'

function Navbar() {

    const navigate = useNavigate();
    const { user } = useAuth();

    const home = () => {
        navigate('/');
        console.log('navigating to home');
    }

    const about = () => {
        const offset = window.innerHeight * 0.1;
        const element = document.getElementById('whatis');
        const y = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth'});
        console.log('navigating to about');
    }

    const getstarted = () => {
        const offset = window.innerHeight * 0.1;
        const element = document.getElementById('sign-up');
        const y = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth'});
        console.log("getting started");
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
                <div id="user-status">
                    {/* {user ? ( */}
                        <ProfileMenu/>
                    {/* ) : (
                        <button id="get-started" onClick={getstarted}>Get Started</button>
                    )} */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;