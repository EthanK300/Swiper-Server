import { useState } from 'react';
import "../styles/signup-form.css";

const loginGuest = () => {

};

function SignupForm() {

    const [register, setRegister] = useState(false);

    return(
        <div id="form-container">
            <div id="slider" style={{ transform: `translateX(${register ? '-50%' : '0'})` }}>
                <div id="login" class="panel">  
                    <h2>Login</h2>
                    <form>
                        <label for="emailuser">Email/Username</label>
                        <input type="email" placeholder="eg: jeff@gmail.com" name="emailuser" required/>
                        <label for="lpassword">Password</label>
                        <input type="password" placeholder="eg: jeff999iscool" name="lassword" id="lpassword" required/>
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
                    <form>
                        <label for="rname">Name</label>
                        <input type="text" placeholder="eg: Jeff" name="rname" id="rname" required/>
                        <label for="remail">Email</label>
                        <input type="email" placeholder="eg: jeff@gmail.com" name="remail" id="remail"/>
                        <label for="rpassword">Password</label>
                        <input type="password" placeholder="eg: jeff999iscool" name="rpassword" id="rpassword" required/>
                        <label for="rcpassword">Confirm Password</label>
                        <input type="password" name="rcpassword" id="rcpassword" required/>
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