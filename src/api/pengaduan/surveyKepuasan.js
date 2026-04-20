import api from "../axios";

export const getSurveyKepuasan = (params) => api.get("/survey_kepuasan", { params });
export const getSurveyKepuasanById = (id) => api.get(`/survey_kepuasan/${id}`);
export const createSurveyKepuasan = (data) => api.post("/survey_kepuasan", data);
export const updateSurveyKepuasan = (id, data) => api.put(`/survey_kepuasan/${id}`, data);
export const deleteSurveyKepuasan = (id) => api.delete(`/survey_kepuasan/${id}`);
export const getStatistik = () => api.get("/survey_kepuasan/statistik");
