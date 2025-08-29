import axios from "axios";
import { useEffect, useState, useRef } from 'react';
import { useAuth } from "../components/AuthContext";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

import TaskForm from "../components/TaskForm";
import FilterMenu from "../components/FilterMenu";
import '../styles/main.css';

function Main() {
    const { login, logout } = useAuth();
    const navigate = useNavigate();
    const [active, setActive] = useState("Today");
    const [empty, setEmpty] = useState(true);
    
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
            // TODO: set empty in here
            if (response.data.tasks.length === 0) {
                setEmpty(true);
            } else {
                setEmpty(false);
            }

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
        // console.log("reset called: " + handlerRef.current);
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
            setVisible(true);

            const handleKeypress = (event) => {
                console.log("keypress: " + event.key);
        
                if (event.key === "Enter") {
                    resetAddMenu();
                    addTask();
                    setVisible(false);
                    // TODO: exit and add task to db
                    
                } else if (event.key === "Escape") {
                    resetAddMenu();
                    setVisible(false);
                    // TODO: exit and cancel
                    
                }
            };
            handlerRef.current = handleKeypress;
            window.addEventListener("keydown", handleKeypress);

        } else {
            // add clicked
            addTask();
            setVisible(false);
            resetAddMenu();
        }
    }

    const [isVisible, setVisible] = useState(false);
    
    useEffect(() => {   
        if (isVisible) {
            // if the form is shown
            document.getElementById('add-bar').style.zIndex = 11;
            document.getElementById('add-form').style.display = 'block';
        } else {
            // if the form is hidden
            document.getElementById('add-form').style.display = 'none';
            document.getElementById('add-bar').style.zIndex = 9;
        }
    }, [isVisible]);
    
    const formRef = useRef(null);
    const addTask = async () => {
        const handler = formRef.current;
        let ret;
        if (!handler) {
            console.log("no form handler attached");
            return;
        } else {
            try{
                ret = await handler.triggerSubmit();
            } catch (e) {
                console.log("error: " + e);
            }
        }
        console.log("addTask called: " + ret.title + "," + ret.description);
        // TODO: make this submit and add the task (need to make the actual task stuff first)
        
        // testing add
        // tasks.push({ title: "task 5", desc: "task 5000 description", dueDate: 39408324598, id: 1872182828728282 });
    }

    const completeTask = async (element) => {
        console.log("complete clicked");
        // animation
        element.style.opacity = "0";
        element.style.transform = "translateX(-100%)";
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("await animation done");

        // re-create and remove the task and update tasks array
        const newTaskArray = [...tasks];
        newTaskArray.splice(activeCard, 1);
        setTasks(newTaskArray);

    }

    const [delayAmount, setDelayAmount] = useState(86400000);
    const delayTask = async (element) => {
        console.log("delay clicked");
        
        element.style.opacity = "0";
        element.style.transform = "translateX(100%)";
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("await animation done");

        // update the element
        const newTaskArray = [...tasks];
        const task = { ...newTaskArray[activeCard], dueDate: newTaskArray[activeCard].dueDate + delayAmount };
        newTaskArray[activeCard] = task;
        setTasks(newTaskArray);

        // re-show the element
        element.style.opacity = "1";
        element.style.transform = "";
        console.log("update?");
    }
    

    const containerRef = useRef(null);
    const [activeCard, setActiveCard] = useState(0);
    const cardRef = useRef(null);
    let scrollTimeout;

    async function snapScroll() {
        if (!containerRef.current) return;
            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.top + (containerRect.height / 2);
    
            const cardElements = container.querySelectorAll(".task-card");
            let closestIndex = 0;
            let minDistance = Infinity;
    
            cardElements.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const distance = (cardCenter - containerCenter);
    
                if (Math.abs(distance) < Math.abs(minDistance)) {
                    minDistance = distance;
                    closestIndex = index;
                }
    
            });
            setActiveCard(closestIndex);
            container.scrollBy({ behavior: "smooth", top: minDistance });
    }
    
    const handleScroll = () => {
        // console.log("attempting to scroll");
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            snapScroll();
        }, 50);
    };

    const [animationStatus, setAnimationStatus] = useState(false);

    const [tasks, setTasks] = useState([
        { title: "task 1", desc: "task 1 description", dueDate: 100001010101, id: 0},
        { title: "task 2", desc: "task 2 description", dueDate: 388498324598, id: 1},
        { title: "task 3", desc: "task 3 description", dueDate: 2092468324598, id: 2},
        { title: "task 4", desc: "task 4 description", dueDate: 396488324598, id: 3},
        { title: "task 5", desc: "task 5 description", dueDate: 0, id: 4},
        { title: "task 5", desc: "task 5 description", dueDate: 86400000, id: 5},
        { title: "task 5", desc: "task 5 description", dueDate: (2 * 86400000), id: 6},
        { title: "task 5", desc: "task x description", dueDate: (3 * 86400000), id: 7},
        { title: "task 5", desc: "task 5 description", dueDate: (4 * 86400000), id: 8},
        { title: "task 5", desc: "task 5 description", dueDate: (5 * 86400000), id: 9},
        { title: "task 5", desc: "task 5 description", dueDate: (6 * 86400000), id: 10},
        { title: "task 5", desc: "task 5 description", dueDate: 39408324598, id: 11},
    ]);

    const handleActionButton = async (button) => {
        if (animationStatus) return;
        setAnimationStatus(true);

        if (!cardRef.current) {
            console.log("card reference error!");
        }

        if (button === "complete") {
            await completeTask(cardRef.current);
        } else {
            await delayTask(cardRef.current);
        }
        setTasks(prevTasks =>
            [...prevTasks].sort((a, b) => a.dueDate - b.dueDate)
        );

        setAnimationStatus(false);
    };


    useEffect(() => {
        updateMiddleHeight();
        window.addEventListener('resize', updateMiddleHeight);
        const container = containerRef.current;

        if (container) {
            container.addEventListener("scroll", handleScroll);
        }
        
        // fetchData();
        // TODO: uncomment this when committing, comment this when testing /dashboard frontend

        return () => {
            window.removeEventListener("resize", updateMiddleHeight);
            container.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return(
        <div id="main">
            <div id="top-bar" ref={topbar}>
                <FilterMenu activeFilter={active} setFilter={setActive}/>
            </div>
            <div id="tasklist-main" ref={tasklistmain} style={{ height: `${middle}px` }}>
                <div id="main-left" className="side-buttons">
                    <svg id="complete-button" viewBox="0 0 106.6 100" onClick={() => handleActionButton('complete')}>
                        <polygon points="0,50 66.6,0 106.6,0 106.6, 100 66.6,100" fill="green" className="arrow"/>
                    </svg>
                </div>
                <div id="main-middle">
                    <div id="task-container" ref={containerRef}>
                        {empty ? (
                            <div id="empty">No tasks yet. Click the + button below to add some!</div>
                        ) : 
                        tasks.map((task, index) => {
                            let time = (new Date(task.dueDate)).toDateString();
                            return(
                                <div ref={index === activeCard ? cardRef : null } className={`task-card ${index === activeCard ? "active-card" : ""}`} key={task.id}>{task.title + " " + task.desc + " " + time}</div>
                            );
                        })}
                    </div>
                </div>
                <div id="main-right" className="side-buttons">
                    <svg id="delay-button" viewBox="0 0 106.6 100" onClick={() => handleActionButton('delay')}>
                        <polygon points="0,0 40,0 106.6,50 40,100 0,100" fill="red" className="arrow"/>
                    </svg>
                </div>
            </div>
            <div id="bottom">
                <div id="add-bar" ref={bottom} onClick={addClickHandler}>+</div>
            </div>
            <TaskForm id="add-form" ref={formRef}/>
        </div>
    );
}

export default Main;