import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

function Navbar() {

    /*
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    */

    return (
        <nav className="navbar">
            <div className="nav-left">
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