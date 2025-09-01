import { useNavigate } from 'react-router-dom';
import swiperlogo from '../assets/swiperlogobee.png';
import { useAuth } from './AuthContext';
import ProfileMenu from './ProfileMenu';

import '../styles/navbar.css'

function Navbar() {

    const navigate = useNavigate();
    const { user } = useAuth();

    const home = () => {
        navigate('/');
        const element = document.getElementById('root');
        window.scrollTo({ top: element.getBoundingClientRect().top, behavior: 'smooth'});
        console.log('navigating to home');
    }

    const about = () => {
        navigate('/about')
        console.log('navigating to about');
    }

    const getstarted = () => {
        navigate('/', {state: {scrollTo: 'sign-up'}});
        console.log("getting started");
    }

    return (
        <nav id="navbar">
            <div id="nav-left">
                <button id="home-button" onClick={home}>
                    <img src={swiperlogo} alt="Swiper Home Icon" id="swiper-icon"/>
                    {/* <span>WIPER</span> */}
                </button>
            </div>
            <div id="nav-right">
                {user ? "" : <button id="about-button" onClick={about}>About</button>}
                <div id="user-status">
                    {user ? (
                        <ProfileMenu/>
                    ) : (
                        <button id="get-started" onClick={getstarted}>Get Started</button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;