import { useState } from 'react';


import '../styles/filter-menu.css';


function FilterMenu() {

    const [activeFilter, setFilter] = useState("Today");
    const filters = ["Today", "This Week", "All"];
    const width = 100 / (filters.length);
    console.log();

    return(
        <div id="button-group">
            {
                filters.map((c) => (
                    <button
                        key={c}
                        className={`top-menu-button ${activeFilter === c ? "active-button" : ""}`}
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