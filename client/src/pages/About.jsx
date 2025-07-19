import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();
    const home = () => {
        navigate("/");
    };

    return (
        <>
            <h1>test about page</h1>
            <button onClick={home}>home</button>
        </>
    );
}

export default About;