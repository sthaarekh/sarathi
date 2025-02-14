import React, { useState } from "react";
import SarathiContext from "./SarathiContext";
import axios from "axios";

const SarathiState = (props) => {
  const host = "http://localhost:5001";
  const [clubs, setClubs] = useState([]); // Initialize as an empty array
  const [notices, setNotices] = useState([]); // Initialize as an empty array

  const adminUrl = axios.create({
    baseURL: `http://localhost:5001/api/v1/admin`,
    headers: {
      "Content-Type": "apllication/json",
    },
  });

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
    console.log(clubId);
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

  const login = async (email, password) => {
    try {
      let response = null;
      console.log("email and psswd are ", email, password);
      console.log(email === "admin123@sarathi.com");
      console.log(password === "admin");
      if (email === "admin123@sarathi.com" && password === "admin") {
        console.log("inside admin url");
        console.log("email inside the final step is :" + email);

        response = await fetch("http://localhost:5001/api/v1/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: email, password }),
        });
        console.log("the resposne is ", response);
      } else {
        response = await fetch(`${host}/api/v1/clubs/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie:
              "authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3OTYxNTIwYTAwNzY2ZTk1OWI0OTYzNyIsInVzZXJuYW1lIjoic3RoYWFyZWtoIiwiZW1haWwiOiJhcmVraHNocmVzdGhhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA0JGIyRmNGZlZWMTlEWTYxMC9HTVVGOXUwR3BpOW82Tk1lNHpDelo4elJ5clcwT3lEbWVab3NxIiwiZW1haWxWZXJpZmllZCI6dHJ1ZSwiX192IjowfSwiaWF0IjoxNzM3ODg5NTA0LCJleHAiOjE3Mzc4OTY3MDR9.ftlgpHcMDZPQlbD-Ms_tWJN2JtYowbv6PYBYesNLVRQ",
          },
          body: JSON.stringify({ email, password }),
        });
      }

      if (!response.ok) {
        throw new Error(`Login failed with status: ${response.status}`);
      }
      const json = await response.json();
      console.log("Login successful:", json);

      localStorage.setItem("authToken", json.token);
      return json;
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <SarathiContext.Provider
      value={{ clubs, fetchClubs, notices, getNoticesOfClub, login }}
    >
      {props.children}
    </SarathiContext.Provider>
  );
};

export default SarathiState;
