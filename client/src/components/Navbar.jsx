import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import swiperlogo from '../assets/swiperlogobetter.png';
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
        console.log('aaaa');
    }

    return (
        <nav id="navbar">
            <div className="nav-left">
                <button className="home-button" onClick={home}>
                    <img src={swiperlogo} alt="Swiper Home Icon" id="swiper-icon"/>
                    <span>wiper</span>
                </button>
                {/* TODO: replace these link with actual buttons later */}
            </div>
            <div className="nav-right">
            </div>
        </nav>
    );
}

export default Navbar;