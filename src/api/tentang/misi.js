import api from "../axios";

export const getMisi = () => api.get("/misi");
export const getMisiById = (id) => api.get(`/misi/${id}`);
export const createMisi = (data) => api.post("/misi", data);
export const updateMisi = (id, data) => api.put(`/misi/${id}`, data);
export const deleteMisi = (id) => api.delete(`/misi/${id}`);
