import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <h1>test landing page</h1>
            <button onClick={handleLogin}>Login</button>
        </>
    );
}

export default LandingPage;