import api from "../axios";

export const getTugasDivisi = () => api.get("/tugas_per_divisi");
export const createTugasDivisi = (data) => api.post("/tugas_per_divisi", data);
export const updateTugasDivisi = (id, data) => api.put(`/tugas_per_divisi/${id}`, data);
export const deleteTugasDivisi = (id) => api.delete(`/tugas_per_divisi/${id}`);
