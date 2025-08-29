import React, { forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';

import '../styles/task-form.css';

function TaskForm(props, ref) {

    // const {
    //     register: registerLogin,
    //     handleSubmit: triggerSubmit,
    //     formState: { errors: loginErrors },
    // } = useForm();
    // const {
    //     register: registerRegister,
    //     handleSubmit: handleRegisterSubmit,
    //     watch: watchRegister,
    //     formState: { errors: registerErrors },
    //     setError,
    // } = useForm();

    const { register, handleSubmit} = useForm();
    const { id } = props;

    useImperativeHandle(ref, () => ({
        triggerSubmit: () => {
            return new Promise((resolve, reject) => {
                handleSubmit(
                    (data) => resolve(data),   // success
                    (errors) => reject(errors) // error
                )();
            });
        },
    }));
    
    return(
        <div id={id} className="main-form">
            <form id="real-form">
                <div className="form-card">
                    <label for="title">Title</label>
                    <input id="title" {...register("title")} placeholder="Title"/>
                </div>

                <div className="form-card">
                    <label for="description">description</label>
                    <input id="description" {...register("description")} placeholder="Description"/>
                </div>


                {/* TODO: add datepick and timepicker */}
            </form>
        </div>
    );
}

// export function triggerSubmit() {
//     console.log("triggered form submit");
//     TaskForm.handleSubmit(TaskForm.onSubmit);
//     return{
//         obj: "test"
//     };
// };

export default forwardRef(TaskForm);