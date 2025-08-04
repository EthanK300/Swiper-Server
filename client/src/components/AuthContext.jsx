import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpred = decoded.eco * 1000 < Date.now();
                if (isExpred) {
                    logout();
                }else{
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

    const logout = () => {
        localStorage.removeItem('jwt');
        setUser(false);
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
