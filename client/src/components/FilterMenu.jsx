import { useState, useEffect, useRef } from 'react';


import '../styles/filter-menu.css';

function FilterMenu({ activeFilter, setFilter }) {
    const containerRef = useRef(null);
    const [buttonStyle, setButtonStyle] = useState({ left: 0});
    const filters = ["Today", "This Week", "All"];
    const width = 100 / (filters.length);

    useEffect(() => {
        // when the active filter changes, this runs
        // console.log("changed");
        const activeButton = containerRef.current.querySelector('#active-button');
        if (activeButton) {
            // console.log(activeButton + "\n" + activeButton.offsetLeft);
            setButtonStyle({
                left: activeButton.offsetLeft + "px",
            });
        }
    }, [activeFilter]);

    return(
        <div id="button-group" ref={containerRef}>
            <div id="sliding-highlight" style={{ left: buttonStyle.left, width: `${width}%`}}/>
            {
                filters.map((c) => (
                    <button
                        key={c}
                        className={'top-menu-button'}
                        id={`${activeFilter === c ? "active-button" : ""}`}
                        onClick={() => setFilter(c)}
                        style={{ width: `${width}%` }}
                    >
                        {c}
                    </button>
                ))
            }
        </div>
    );
}

export default FilterMenu;