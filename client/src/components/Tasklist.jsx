import { useEffect, useState, useRef } from 'react';
import axios from "axios";

import '../styles/tasklist.css'

function Tasklist({ tasks }) {

    // let tasks = useState(null);
    tasks = [
        { title: "task 1", desc: "task 1 description", dueDate: 100001010101 },
        { title: "task 2", desc: "task 2 description", dueDate: 398498324598 },
    ];

    return(
        <div id="container-box">
            {tasks.map((task, index) => {
                let time = (new Date(task.dueDate)).toDateString();

                return(
                    <div className="task-card">{task.title + " " + task.desc + " " + time}</div>
                );
            })}
        </div>
    );
}

export default Tasklist;