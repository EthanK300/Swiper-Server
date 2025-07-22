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

function StackedScroll() {
    // store active center card index
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev === messages.length - 1 ? 0 : prev + 1));
        }, 2500); 
        // scroll every 3 seconds
        return () => clearInterval(interval);
    }, []);

    // calculate opacity for fading
    const getStyle = (index) => {
        const dist = withinBounds(index, activeIndex);
        if (dist === 0) {
            return { transform: 'scale(1)', opacity: 1 };
        }
        
        if (Math.abs(dist) <= range) {
            const translatePercent = dist * 150; // vertical offset in %
            const scale = 1 - Math.abs(dist * 0.1);
            const opacity = 1 - Math.abs(dist * 0.1);
            return {
                transform: `translateY(${translatePercent}%) translateX(${Math.abs(dist) * 5}%) scale(${scale * scale})`,
                opacity: opacity,
            };
        }
        
        return { opacity: 0 };
    };

    return (
        <div className="stack-container">
        <div className="stacked-cards">
            {messages.map((msg, i) => (
            <div
                key={i}
                className="card"
                style={{
                ...getStyle(i),
                transition: "transform 0.5s ease, opacity 0.5s ease",
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