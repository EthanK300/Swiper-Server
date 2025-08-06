import React from "react";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import "../styles/signup-form.css";

function SignupForm() {
    const login = useAuth();
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    
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
    const password = watchRegister("password", "");

    const URL = process.env.REACT_APP_BACKEND_URL;

    const onLogin = async (data) => {
        // TODO: INTEGRATE LOGIN SEND API REQUEST TO SERVER AND HANDLE JWT TOKEN
        console.log("test login");
        console.log(data);

        /*
        const data = await response.json();
        if (data.token) {
            login(data.token);
        }
        */

        try {
            console.log(`${URL}/api/login`);
            const response = await fetch(`${URL}/api/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if(!response.ok){
                console.error('login error:', responseData);
                return;
            }
            
            console.log('login good:', responseData);

            // token
            // if(responseData.token){
            //     login(responseData.token);
                // navigate('insert url');
            // }
        } catch (err) {
            console.error('error:', err);
        }

        document.getElementById("login-button").blur();
    };

    const onRegister = async (data) => {
        // TODO: INTEGRATE REGISTER SEND API REQUEST TO SERVER AND HANDLE JWT TOKEN
        console.log("test register");
        console.log(data);
        /*
        const data = await response.json();
        if (data.token) {
            login(data.token);
        }
        */

        try {
            console.log(`${URL}/api/register`);
            const response = await fetch(`${URL}/api/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if(!response.ok){
                console.error('registration error:', responseData);
                return;
            }

            console.log('registration good:', responseData);

            // token
            // if(responseData.token){
            //     login(responseData.token);
            //     navigate('insert url');
            // }
        } catch (err) {
            console.error('error:', err);
        }

        document.getElementById("register-button").blur();
    };

    const loginGuest = () => {
        console.log("log in as guest");
        navigate("/");
        document.getElementById("login-guest").blur();
        // TODO: HANDLE LOGIN AS GUEST WITH JWT TOKEN BUT NO SERVER REQUEST ONLY LOCAL
    };

    return(
        <div id="form-container">
            <div id="slider" style={{ transform: `translateX(${register ? '-50%' : '0'})` }}>
                <div id="login" class="panel">  
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit(onLogin)} noValidate>
                        <label for="lemail">Email</label>
                        <input type="email" placeholder="eg: jeff@gmail.com" id="lemail" {...registerLogin("email", { required: "Email is required"})}/>
                        {loginErrors.email && <p class="error">{loginErrors.email.message}</p>}

                        <label for="lpassword">Password</label>
                        <input type="password" placeholder="eg: jeff999iscool" id="lpassword" {...registerLogin("password", { required: "Password is required"})}/>
                        {loginErrors.password && <p class="error">{loginErrors.password.message}</p>}

                        <button type="submit" id="login-button" class="primary">Login</button>
                    </form>
                    <p id="login-secondaries">
                        Don't have an account?
                    </p>
                    <div id="dual-button">
                        <button onClick={() => setRegister(true)} class="secondary" id="to-register">Register</button>
                        <button onClick={loginGuest} id="login-guest" class="secondary">Login as a guest</button>
                    </div>
                </div>
                <div id="register" class="panel">
                    <h2>Register</h2>
                    <form onSubmit={handleRegisterSubmit(onRegister)} noValidate>
                        <label for="rname">Name</label>
                        <input type="text" placeholder="eg: Jeff" id="rname" {...registerRegister("name", { required: "You don't have a name?"})}/>
                        {registerErrors.name && <p class="error">{registerErrors.name.message}</p>}

                        <label for="remail">Email</label>
                        <input type="email" placeholder="eg: jeff@gmail.com" id="remail" {...registerRegister("email", { required : "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format"}})}/>
                        {registerErrors.email && <p class="error">{registerErrors.email.message}</p>}
                        
                        <label for="rpassword">Password</label>
                        <input type="password" placeholder="eg: jeff999iscool" id="rpassword" {...registerRegister("password", { required: "Password is required"})}/>
                        {registerErrors.password && <p class="error">{registerErrors.password.message}</p>}
                        
                        <label for="rcpassword">Confirm Password</label>
                        <input type="password" id="rcpassword" {...registerRegister("cpassword", { required: "Password confirmation required", validate: (value) =>
                            value === password || "Passwords do not match"
                        })}/>
                        {registerErrors.cpassword && <p class="error">{registerErrors.cpassword.message}</p>}
                        
                        <button type="submit" id="register-button" class="primary">Register</button>
                    </form>
                    <p>
                        Already have an account?
                    </p>
                    <button onClick={() => setRegister(false)} class="secondary" id="to-login">Login</button>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;