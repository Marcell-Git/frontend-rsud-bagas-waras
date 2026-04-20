import api from "../axios";

export const getTugasRSUD = () => api.get("/tugas_rsud");
export const createTugasRSUD = (data) => api.post("/tugas_rsud", data);
export const updateTugasRSUD = (id, data) => api.put(`/tugas_rsud/${id}`, data);
export const deleteTugasRSUD = (id) => api.delete(`/tugas_rsud/${id}`);
