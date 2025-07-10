import Test2 from "./test2.js";
import {useState} from 'react';

const words = ["hello", "stuff", "random", "render", "code", "cool"]



function Main() {
    const [text, setText] = useState("");

    const getText = () => {
        console.log("text gotten");
        const obj = fetch("/request")
            .then(res => res.json())
            .then(data => setText(data.text));
    }

    return(
        <>
            <div>
                <h1>a</h1>
            </div>
            <Test2/>
            <br></br>
            <h3>received text: {text === "" ? "none yet" : text}</h3>
            <br></br>
            <div>
                <h1>b</h1>
            </div>
            <Test2/>  
            <ul>{words.map(word => (<li key={word}>{word}</li>))}</ul>
            <button onClick={getText}>a button</button>
        </>
    );
}

export default Main;