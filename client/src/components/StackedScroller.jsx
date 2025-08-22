import React, { useState, useEffect } from "react";
import "../styles/stacked-scroller.css";

const messages = [
    "Manage Tasks Effortlessly",
    "Smart Reminders",
    "Clean, Intuitive Design",
    "Natural Movements",
    "Stay Organized",
    "Boost Productivity",
    "Super Convenient",
];

function StackedScroll( { id, className } ) {
    // store active center card index
    const [activeIndex, setActiveIndex] = useState(0);

    const name = className;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev === messages.length - 1 ? 0 : prev + 1));
        }, 2000); 
        // scroll every 3 seconds
        return () => clearInterval(interval);
    }, []);

    // calculate opacity for fading
    const getStyle = (index) => {
        if (index === activeIndex) {
            return { transform: "translateY(0%)", opacity: 1, zIndex: 2 , border: '2px solid #6495ed'};
        } else if (index === (activeIndex + 1) % messages.length) {
            return { transform: "translateY(150%)", opacity: 0.75, zIndex: 1 };
        } else if (index === (activeIndex - 1 + messages.length) % messages.length) {
            return { transform: "translateY(-150%)", opacity: 0.75, zIndex: 1 };
        } else if (index === (activeIndex + 2) % messages.length) {
            return { transform: "translateY(300%)", opacity: 0.5, zIndex: 1 };
        } else if (index === (activeIndex - 2 + messages.length) % messages.length) {
            return { transform: "translateY(-300%)", opacity: 0.5, zIndex: 1 };
        } else {
            return { transform: "translateY(400%)", opacity: 0, zIndex: 0 }; // hidden if too far
        }
    };

    return (
        <div className={`stack-container ${name}`} id={id}>
        <div className="stacked-cards">
            {messages.map((msg, i) => (
            <div
                key={i}
                className="card"
                style={{
                ...getStyle(i),
                transition: "transform 1s ease, opacity 0.25s ease, border-color 0.5s ease",
                }}
            >
                {msg}
            </div>
            ))}
        </div>
        </div>
    );
}

export default StackedScroll;