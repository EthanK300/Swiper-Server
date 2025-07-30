import React, { useState, useEffect } from "react";
import "../styles/device-scroller.css";
import phone from '../assets/phoneart.png';
import tablet from '../assets/tabletart.png';
import laptop from '../assets/laptopart.png';
import StackedScroll from "./StackedScroller";

const devices = [
    phone,
    laptop,
    tablet,
];

function DeviceScroll() {
    // store active center card index
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev === devices.length - 1 ? 0 : prev + 1));
        }, 4500); 
        // scroll every 3 seconds
        return () => clearInterval(interval);
    }, []);

    // calculate positional scrolling for fading
    const getStyle = (index) => {
        if (index === activeIndex) {
            return { transform: "translateX(0%)", opacity: 1, zIndex: 2 };
        } else if (index === (activeIndex + 1) % devices.length) {
            return { transform: "translateX(100%)", opacity: 0, zIndex: 1 };
        } else if (index === (activeIndex - 1 + devices.length) % devices.length) {
            return { transform: "translateX(-100%)", opacity: 0, zIndex: 1 };
        } else {
            return { transform: "translateX(200%)", opacity: 0, zIndex: 0 }; // hidden if too far
        }
    };

    return (
        <div className="device-container">
            {devices.map((img, i) => (
            <div
                key={i}
                className="device"
                id={`device-${i}`}
                style={{
                ...getStyle(i),
                transition: "transform 1s ease, opacity 1s ease",
                }}
            >
                <img
                    id={`img-${i}`}
                    key={i}
                    src={img}
                    alt="device"
                    className="image"
                ></img>
                <StackedScroll id={`scroller-${i}`} className="scroller"/>
            </div>
            ))}
        </div>
    );
}

export default DeviceScroll;