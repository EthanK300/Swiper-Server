import React, { useState, useEffect } from "react";
import "../styles/stacked-scroller.css";

const messages = [
    "Manage Tasks Effortlessly",
    "Smart Reminders",
    "Clean, Intuitive Design",
    "Get Started Now",
    "Stay Organized",
    "Boost Productivity",
    "Super Convenient",
];

const range = 2;

function withinBounds(index, activeIndex){
    const direct = index - activeIndex;
  const alt = direct > 0 ? direct - messages.length : direct + messages.length;
  // Choose the smaller absolute distance
  return Math.abs(direct) < Math.abs(alt) ? direct : alt;
}

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
        const dist = withinBounds(index, activeIndex);
        if (dist === 0) {
            return { transform: 'scale(1)', opacity: 1, border: '2px solid blue' };
        }
        
        if (Math.abs(dist) <= range) {
            const translatePercent = dist * 150; // vertical offset in %
            const scale = 1 - Math.abs(dist * 0.1);
            const opacity = 1 - Math.abs(dist * 0.2);
            return {
                transform: `translateY(${translatePercent}%) scale(${scale * scale})`,
                opacity: opacity,
            };
            // translateX(${Math.abs(dist) * 5}%) <- this is for shifting horizontally
        }
        
        return { opacity: 0 };
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
                transition: "transform 1s ease, opacity 0.25s ease",
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