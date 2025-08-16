import axios from "axios";
import { useEffect, useState, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
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

    const [middle, setMiddle] = useState(0);
    const topbar = useRef(null);
    const tasklistmain = useRef(null);
    const bottom = useRef(null);

    useEffect(() => {
        updateMiddleHeight();
        window.addEventListener('resize', updateMiddleHeight);
        
        fetchData();
        // TODO: uncomment this when committing, comment this when testing /dashboard frontend

        return () => {
            window.removeEventListener("resize", updateMiddleHeight);
        }
    }, []);

    const updateMiddleHeight = () => {
        if (topbar.current && bottom.current) {

        }
        const ty = topbar.current.getBoundingClientRect().bottom;
        const by = bottom.current.getBoundingClientRect().top;
        setMiddle(by - ty);
        
    }

    const [open, setOpen] = useState(false);    // false is not open, true is open
    const handlerRef = useRef(null);

    const resetAddMenu = () => {
        console.log("reset called: " + handlerRef.current);
        document.getElementById('add-bar').innerHTML = "+";
        window.removeEventListener("keydown", handlerRef.current);
        setOpen(false);
        handlerRef.current = null;
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

    const addTask = () => {
        // TODO: make this submit and add the task (need to make the actual task stuff first)
        console.log("addTask called");
    }

    const completeTask = () => {
        console.log("complete clicked");
    }

    const delayTask = () => {
        console.log("delay clicked");
    }

    let tasks = [
        { title: "task 1", desc: "task 1 description", dueDate: 100001010101 },
        { title: "task 2", desc: "task 2 description", dueDate: 388498324598 },
        { title: "task 3", desc: "task 3 description", dueDate: 2092468324598 },
        { title: "task 4", desc: "task 4 description", dueDate: 396488324598 },
        { title: "task 5", desc: "task 5 description", dueDate: 39408324598 },
    ];

    return(
        <div id="main">
            <div id="top-bar" ref={topbar}>
                <FilterMenu activeFilter={active} setFilter={setActive}/>
            </div>
            <div id="tasklist-main" ref={tasklistmain} style={{ height: `${middle}px` }}>
                <div id="main-left" className="side-buttons">
                    <svg id="complete-button" viewBox="0 0 106.6 100" onClick={completeTask}>
                        <polygon points="0,50 66.6,0 106.6,0 106.6, 100 66.6,100" fill="green" className="arrow"/>
                    </svg>
                </div>
                <div id="main-middle">
                    {/* <div id="task-container">
                        {tasks.map((task, index) => {
                            let time = (new Date(task.dueDate)).toDateString();
                            
                            return(
                                <div className="task-card">{task.title + " " + task.desc + " " + time}</div>
                            );

                        })}
                    </div> */}
                    <List
                        className="task-container"
                        height={middle * 0.9}
                        width="100%"
                        itemCount={tasks.length}
                        itemSize={(middle * 0.9) * 0.15}
                    >
                        {({ index, style }) => {
                            let task = tasks[index];
                            let time = (new Date(task.dueDate)).toDateString();

                            return(
                                <div className="task-card">
                                    {task.title + " " + task.desc + " " + time}
                                </div>
                            );
                        }}
                    </List>
                </div>
                <div id="main-right" className="side-buttons">
                    <svg id="delay-button" viewBox="0 0 106.6 100" onClick={delayTask}>
                        <polygon points="0,0 40,0 106.6,50 40,100 0,100" fill="red" className="arrow"/>
                    </svg>
                </div>
            </div>
            <div id="bottom">
                <div id="add-bar" ref={bottom} onClick={addClickHandler}>+</div>
            </div>
        </div>
    );
}

export default Main;