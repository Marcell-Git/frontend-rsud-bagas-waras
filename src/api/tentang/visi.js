import api from "../axios";

export const getVisi = () => api.get("/visi");
export const getVisiTerbaru = () => api.get("/visi/terbaru");
export const getVisiById = (id) => api.get(`/visi/${id}`);
export const createVisi = (data) => api.post("/visi", data);
export const updateVisi = (id, data) => api.put(`/visi/${id}`, data);
export const deleteVisi = (id) => api.delete(`/visi/${id}`);
