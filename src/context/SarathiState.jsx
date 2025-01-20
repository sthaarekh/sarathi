import React, { useState } from 'react';
import SarathiContext from './SarathiContext';

const SarathiState = (props) => {
    const host = "http://localhost:5001";
    const [clubs, setClubs] = useState([]); // Initialize as an empty array

    // Function to fetch clubs and update the state
    const fetchClubs = async () => {
        try {
            const response = await fetch(`${host}/api/v1/clubs`, {
                method: "GET",
                headers: {
                    "Cache-Control": "no-cache", // Prevent caching
                    "Content-Type": "application/json", // Ensure proper headers
                },
            });
            const json = await response.json();
            setClubs(json.data.clubs); // Update state with fetched data
            console.log(json.data.clubs)
        } catch (error) {
            console.error("Error fetching clubs:", error);
        }
    };

    return (
        <SarathiContext.Provider value={{ clubs, fetchClubs }}>
            {props.children}
        </SarathiContext.Provider>
    );
};

export default SarathiState;
