import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

import "../styles/task-form.css";
import "react-datepicker/dist/react-datepicker.css";

function TaskForm(props, ref) {

    const { register, handleSubmit } = useForm();
    const [dateTime, setDateTime] = useState(null);
    const { id } = props;

    useImperativeHandle(ref, () => ({
        triggerSubmit: () => {
            return new Promise((resolve, reject) => {
                handleSubmit(
                    (data) => resolve({
                        ...data,
                        date: dateTime == null ? (new Date()).getTime() : dateTime.getTime(),
                    }), // success
                    (errors) => reject(errors) // error
                )();
            });
        },
    }));

    return (
        <div id={id} className="main-form">
            <form id="real-form">
                <div id="left-form-card">
                    <div className="form-card">
                        <label for="title">Title</label>
                        <input
                            id="title"
                            {...register("title")}
                            placeholder="Title"
                        />
                    </div>

                    <div className="form-card" id="description-card">
                        <label for="description">description</label>
                        <input
                            id="description"
                            {...register("description")}
                            placeholder="Description"
                        />
                    </div>
                </div>

                <div className="form-card">
                    <DatePicker id="date" selected={dateTime} onChange={(date) => setDateTime(date)} showTimeInput inline dateFormat="Pp" />
                </div>

            </form>
        </div>
    );
}

export default forwardRef(TaskForm);
