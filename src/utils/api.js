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
export const sendRegistrationRequest = ({ data }) =>
  apiClub.post(`/signup`, data);

const General = axios.create({
  baseURL: `http://localhost:5001/api/v1`,
});

export const ReportNotices = ({ clubId, noticeId }) => {
  return General.patch(`/clubs/${clubId}/notices/${noticeId}/report`);
};
