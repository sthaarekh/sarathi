import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5001/api/v1/admin/" });

export const getAllClubs = () => api.get("/clubs");
export const DeleteAClub = (id) => api.delete(`/clubs/${id}`);
export const getllAllQuestions = (id) => api.get(`/clubs/${id}/questions`);
export const verifyClub = (id) => api.patch(`/clubs/${id}`);
export const deleteQuestionsForAClub = (id) =>
  api.delete(`clubs/${id}/questions`);

const apiClub = axios.create({
  baseURL: "http://localhost:5001/api/v1/clubs/",
});
export const getAllNotices = (id) => apiClub.get(`notice/${id}`);
export const sendRegistrationRequest = ({ data }) =>apiClub.post(`/signup`, data);
export const uploadNotice = (clubId, formData) => {
  return apiClub.post(`notice/${clubId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const login = async (email, password) => {
  try {
    const response = await apiClub.post(`login`, 
      { email, password }, 
      {
        headers: {
          "Content-Type": "application/json",
          "Cookie": "authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3OTYxNTIwYTAwNzY2ZTk1OWI0OTYzNyIsInVzZXJuYW1lIjoic3RoYWFyZWtoIiwiZW1haWwiOiJhcmVraHNocmVzdGhhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA0JGIyRmNGZlZWMTlEWTYxMC9HTVVGOXUwR3BpOW82Tk1lNHpDelo4elJ5clcwT3lEbWVab3NxIiwiZW1haWxWZXJpZmllZCI6dHJ1ZSwiX192IjowfSwiaWF0IjoxNzM3ODg5NTA0LCJleHAiOjE3Mzc4OTY3MDR9.ftlgpHcMDZPQlbD-Ms_tWJN2JtYowbv6PYBYesNLVRQ",
        },
      }
    );

    console.log("Login successful:", response.data);
    localStorage.setItem("authToken", response.data.token);

    return response.data;
  } catch (error) {
    return error;
    // console.error("Error during login:", error.response?.data || error.message);
  }
};