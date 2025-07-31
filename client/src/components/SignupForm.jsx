import { useState } from 'react';
import "../styles/signup-form.css";

const loginGuest = () => {

};

function SignupForm() {

    const [register, setRegister] = useState(false);

    return(
        <div id="form-container">
            <div id="slider" style={{ transform: `translateX(${register ? '-100%' : '0'})` }}>
                <div id="login" class="panel">
                    <h2>Login</h2>
                    <form>
                        <input type="email" placeholder="Email/Username"/>
                        <input type="password" placeholder="Password"/>
                        <button type="submit">Login</button>
                    </form>
                    <p>
                        Don't have an account?
                        <button onClick={() => setRegister(true)}>Register</button>
                    </p>
                    <button onClick={loginGuest}>Login as a guest</button>
                </div>
                <div id="register" class="panel">
                    <h2>Register</h2>
                    <form>
                        <input type="text" placeholder="Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <input type="password" placeholder="Confirm Password"/>
                        <button type="submit">Register</button>
                    </form>
                    <p>
                        Already have an account?
                        <button onClick={() => setRegister(false)}>Login</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;