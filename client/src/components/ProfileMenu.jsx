import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

import blankprofile from '../assets/blank_profile.png';

import '../styles/profile-menu.css';

function ProfileMenu() {
    const [ isOpen, setOpen ] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const { logout } = useAuth();

    const toggleMenu = () => setOpen(!isOpen);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleLogout = () => {
        logout();
        setOpen(false);
        navigate('/');
        console.log("logged out");
    }

    return (
        <div id="profile-container" ref={menuRef}>
            <button id="profile-button" onClick={toggleMenu}>
                <img src={blankprofile} alt="Profile" id="profile-icon"/>
            </button>
    
            {isOpen && (
                <div id="menu-dropdown">
                    <button class="dropdown-button">Account Details</button>
                    <button class="dropdown-button" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );

}

export default ProfileMenu;