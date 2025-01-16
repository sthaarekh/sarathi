import React, { useState } from 'react';
import SarathiContext from './SarathiContext';

const SarathiState = (props) => {
    const host = "http://localhost:5001";
    const [clubs, setClubs] = useState();

    const fetchClubs = async () => {
        const response = await fetch(`${host}/api/v1/clubs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const json = await response.json();
        console.log(json)
        setClubs(json);
    };

    return (
        <SarathiContext.Provider value={{ clubs, fetchClubs }}>
            {props.children}
        </SarathiContext.Provider>
    ); // Properly close the return statement
};

export default SarathiState;
