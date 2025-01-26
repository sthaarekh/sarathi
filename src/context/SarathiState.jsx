import React, { useState } from 'react';
import SarathiContext from './SarathiContext';

const SarathiState = (props) => {
    const host = "http://localhost:5001";
    const [clubs, setClubs] = useState([]); // Initialize as an empty array
    const [notices, setNotices] = useState([]); // Initialize as an empty array

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
        } catch (error) {
            console.error("Error fetching clubs:", error);
        }
    };
    const getNoticesOfClub = async (clubId) => {
        console.log(clubId)
        try {
            const response = await fetch(`${host}/api/v1/clubs/notice/${clubId}`, {
                method: "GET",
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            setNotices(json.data);
        } catch (error) {
          console.error("Error fetching notices:", error.message);
        }
      };

    return (
        <SarathiContext.Provider value={{ clubs, fetchClubs, notices, getNoticesOfClub }}>
            {props.children}
        </SarathiContext.Provider>
    );
};

export default SarathiState;
