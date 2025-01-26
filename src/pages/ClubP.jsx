import React from 'react'
import SarathiContext from '../context/SarathiContext';
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const ClubP = () => {
  const id = "678f4c06c1c80b6518063f85"; // Assigning the fixed id
  const context = useContext(SarathiContext);
  const { clubs, fetchClubs, notices, getNoticesOfClub } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchClubs(); // Wait for fetchClubs to complete
        await getNoticesOfClub(id); // Wait for getNoticesOfClub to complete
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);
  
    console.log('Clubs:', clubs);
    console.log('Notices:', notices);
  return (
    <div>
      
    </div>
  )
}

export default ClubP
