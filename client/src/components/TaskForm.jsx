import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';

import '../styles/task-form.css';

function TaskForm({ id }) {
    
    return(
        <div id={id} className="main-form">
            <p>aaaaaa</p>

        </div>
    );
}

export function triggerSubmit() {
    console.log("triggered form submit");
    return{
        obj: "test"
    };
};

export default TaskForm;