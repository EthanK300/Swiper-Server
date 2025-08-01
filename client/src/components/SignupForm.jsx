import React from "react";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import "../styles/signup-form.css";

function SignupForm() {

    const [register, setRegister] = useState(false);

    const loginGuest = () => {
        console.log("log in as guest");
    };

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm();

    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        watch: watchRegister,
        formState: { errors: registerErrors },
    } = useForm();

    const onLogin = (data) => {
        console.log("test login");
        console.log(data);
    };

    const onRegister = (data) => {
        console.log("test register");
        console.log(data);
    }

    const password = watchRegister("password", "");

    return(
        <div id="form-container">
            <div id="slider" style={{ transform: `translateX(${register ? '-50%' : '0'})` }}>
                <div id="login" class="panel">  
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit(onLogin)} noValidate>
                        <label for="lemail">Email/Username</label>
                        <input type="email" placeholder="eg: jeff@gmail.com" id="lemail" {...registerLogin("email", { required: "Email is required"})}/>
                        {loginErrors.email && <p class="error">{loginErrors.email.message}</p>}

                        <label for="lpassword">Password</label>
                        <input type="password" placeholder="eg: jeff999iscool" id="lpassword" {...registerLogin("password", { required: "Password is required"})}/>
                        {loginErrors.password && <p class="error">{loginErrors.password.message}</p>}

                        <button type="submit">Login</button>
                    </form>
                    <p>
                        Don't have an account?
                        <br/>
                        <button onClick={() => setRegister(true)}>Register</button>
                        <button onClick={loginGuest}>Login as a guest</button>
                    </p>
                </div>
                <div id="register" class="panel">
                    <h2>Register</h2>
                    <form onSubmit={handleRegisterSubmit(onRegister)} noValidate>
                        <label for="rname">Name</label>
                        <input type="text" placeholder="eg: Jeff" id="rname" {...registerRegister("name", { required: "Must have a name"})}/>
                        {registerErrors.name && <p class="error">{registerErrors.name.message}</p>}

                        <label for="remail">Email</label>
                        <input type="email" placeholder="eg: jeff@gmail.com" id="remail" {...registerRegister("email", { pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format"}})}/>
                        {registerErrors.email && <p class="error">{registerErrors.email.message}</p>}
                        
                        <label for="rpassword">Password</label>
                        <input type="password" placeholder="eg: jeff999iscool" id="rpassword" {...registerRegister("password", { required: "Password is required"})}/>
                        {registerErrors.password && <p class="error">{registerErrors.password.message}</p>}
                        
                        <label for="rcpassword">Confirm Password</label>
                        <input type="password" id="rcpassword" {...registerRegister("cpassword", { required: "Password confirmation required", validate: (value) =>
                            value === password || "Passwords do not match"
                        })}/>
                        {registerErrors.cpassword && <p class="error">{registerErrors.cpassword.message}</p>}
                        
                        <button type="submit">Register</button>
                    </form>
                    <p>
                        Already have an account?
                        <br/>
                        <button onClick={() => setRegister(false)}>Login</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;