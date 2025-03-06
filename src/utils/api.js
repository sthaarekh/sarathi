import axios from "axios";
const ip = "http://localhost:5001"
const api = axios.create({
  baseURL: `${ip}/api/v1/admin/`,
  withCredentials: true,
});

export const getAllClubs = () => api.get("/clubs");
export const DeleteAClub = (id) => api.delete(`/clubs/${id}`);
export const getAllQuestions = (id) => api.get(`/clubs/${id}/questions`);
export const getAllReportedNotices = () => api.get(`reportednotices`);
export const deleteClub = (id) => api.delete(`/clubs/${id}`);
export const verifyClub = (id) => api.patch(`/clubs/${id}`);
export const holdClub = (id) => api.patch(`/clubs/hold/${id}`);
export const deleteQuestionsForAClub = (id) =>
  api.delete(`clubs/${id}/questions`);
export const deleteReportedNotice = (id) =>
  api.delete(`notice/${id}`);
export const deleteNoticesByClub = (clubId) =>
  api.delete(`notices/${clubId}`);
export const deleteClubAdmin = (id) =>
  api.delete(`clubadmin/${id}`);

const apiClub = axios.create({
  baseURL: `${ip}/api/v1/clubs/`,
});
export const getAllNotices = (id) => apiClub.get(`notice/${id}`);
export const sendRegistrationRequest = ({ data }) =>
  apiClub.post(`/signup`, data);
export const uploadNotice = (clubId, formData) => {
  return apiClub.post(`notice/${clubId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const login = async (email, password) => {
  try {
    const response = await apiClub.post(
      `login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3OTYxNTIwYTAwNzY2ZTk1OWI0OTYzNyIsInVzZXJuYW1lIjoic3RoYWFyZWtoIiwiZW1haWwiOiJhcmVraHNocmVzdGhhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA0JGIyRmNGZlZWMTlEWTYxMC9HTVVGOXUwR3BpOW82Tk1lNHpDelo4elJ5clcwT3lEbWVab3NxIiwiZW1haWxWZXJpZmllZCI6dHJ1ZSwiX192IjowfSwiaWF0IjoxNzM3ODg5NTA0LCJleHAiOjE3Mzc4OTY3MDR9.ftlgpHcMDZPQlbD-Ms_tWJN2JtYowbv6PYBYesNLVRQ",
        },
      }
    );

    console.log("Login successful:", response.data);
    localStorage.setItem("authToken", response.data.token);

    return response.data;
  } catch (error) {
    return error;
  }
};
export const updateClubDetails = (clubId, formData) => {
  return apiClub.patch(`clubDetails/${clubId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const general = axios.create({
  baseURL: `${ip}/api/v1`,
});

export const ReportNotices = ({ clubId, noticeId }) => {
  return general.patch(`/clubs/${clubId}/notices/${noticeId}/report`);
};
