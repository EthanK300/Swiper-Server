import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    logout();
                }else{
                    console.log("token renewed");
                    setUser(decoded);
                }
            } catch {
                logout();
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('jwt', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
    };

    const logout = async () => {
        try{
            const baseURL = process.env.REACT_APP_DEV === "true"
            ? `${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}`
            : process.env.REACT_APP_PUBLIC_IP;

            const res = await axios.post(`${baseURL}/api/logout`, {}, {
                withCredentials: true,
            });
            
            console.log("Logout response:", res.status);
        } catch (err) {
            console.error("Failed to logout from server:", err);
        }

        localStorage.removeItem('jwt');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
