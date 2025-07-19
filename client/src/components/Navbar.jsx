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
    }

    return (
        <nav className="navbar">
            <div className="nav-left">
                <button className="home-button" onClick={home}>
                    <img src={swiperlogo} alt="Swiper Home Icon" id="swiper-icon"/>
                    <span>wiper</span>
                </button>
                <Link to="/">Home</Link> 
                {/* TODO: replace these link with actual buttons later */}
            </div>
            <div className="nav-right">
                <Link to="/login"></Link>
                <Link to="/about"></Link>
            </div>
        </nav>
    );
}

export default Navbar;