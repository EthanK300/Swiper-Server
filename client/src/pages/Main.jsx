import axios from "axios";
import { useEffect, useState, useRef } from 'react';
import { useAuth } from "../components/AuthContext";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

import FilterMenu from "../components/FilterMenu";
import '../styles/main.css';

function Main() {
    const { login, logout } = useAuth();
    const navigate = useNavigate();
    const [active, setActive] = useState("Today");

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

        const data = {
            testKey: "testValue"
        }
        try {
            const response = await axios.post(`${URL}/api/data`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            });

            // TODO: do stuff with the response data

            console.log("response: " + response.data);
            console.log(response);

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

        // fetchData();
        // TODO: uncomment this when committing, comment this when testing /dashboard frontend

    }, []);

    const [open, setOpen] = useState(false);    // false is not open, true is open
    const handlerRef = useRef(null);

    const resetAddMenu = () => {
        console.log("reset called: " + handlerRef.current);
        document.getElementById('add-bar').innerHTML = "+";
        window.removeEventListener("keydown", handlerRef.current);
        setOpen(false);
        handlerRef.current = null;
    }

    const addTask = () => {
        // TODO: make this submit and add the task (need to make the actual task stuff first)
        console.log("addTask called");
    }

    const addClickHandler = () => {
        if (!open) {
            // open the add menu
            setOpen(true);
            const element = document.getElementById('add-bar');
            element.innerHTML = "Add";
            element.blur();

            const handleKeypress = (event) => {
                console.log("keypress: " + event.key);
        
                if (event.key === "Enter") {
                    resetAddMenu();
                    addTask();
                    // TODO: exit and add task to db
        
                } else if (event.key === "Escape") {
                    resetAddMenu();

                    // TODO: exit and cancel
                    
                }
            };
            handlerRef.current = handleKeypress;
            window.addEventListener("keydown", handleKeypress);

        } else {
            // add clicked
            console.log("actual add button clicked");
            addTask();
            resetAddMenu();
        }
    }

    return(
        <div id="main">
            <div id="top-bar">
                <FilterMenu activeFilter={active} setFilter={setActive}/>
            </div>
            <div id="tasklist-main">

            </div>
            <div id="bottom">
                <div id="add-bar" onClick={addClickHandler}>+</div>
            </div>
        </div>
    );
}

export default Main;