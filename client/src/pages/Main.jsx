import axios from "axios";
import { useEffect, useState } from 'react';
import { useAuth } from "../components/AuthContext";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

import '../styles/main.css';

function Main() {
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    let URL = "";
    if (process.env.REACT_APP_DEV === "true") {
        URL = process.env.REACT_APP_IP + ":" + process.env.REACT_APP_PORT;
    } else {
        URL = process.env.REACT_APP_PUBLIC_IP;
    }

    async function fetchData() {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    console.log("EXPIRED TOKEN! KICKED BACK TO LANDING PAGE");
                    logout();
                    navigate('/');
                    return;
                }else{
                    console.log("token renewed");
                    login(token);
                }
            } catch {
                console.log("ERROR HANDLING TOKEN");
                logout();
                navigate('/');
                return;
            }
        } else {
            console.log("NO TOKEN! KICKED BACK TO LANDING PAGE");
            logout();
            navigate('/');
            return;
        }

        console.log("got to the dashboard");

        const data = {
            testKey: "testValue"
        }
        try {
            const response = axios.post(`${URL}/api/data`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            });

            console.log("response: " + response.data);

        } catch (err) {
            if (err.response) {
                // server returned non-200 error
                console.error('data fetch error:', err.response.data);
            } else {
                // other error
                console.error('error:', err);
            }
        }
    }

    useEffect(() => {

        fetchData();
        // TODO: uncomment this when committing

    }, []);

    return(
        <div id="main">
            <h1>test</h1>
            <div id="left">

            </div>
            <div id="tasklist-main">

            </div>
            <div id="bottom">

            </div>
        </div>
    );
}

export default Main;