import api from "../axios";

export const getPengaduanKorupsi = (params) => api.get("/pengaduan_korupsi", { params });
export const getPengaduanKorupsiById = (id) => api.get(`/pengaduan_korupsi/${id}`);
export const createPengaduanKorupsi = (data) => api.post("/pengaduan_korupsi", data);
export const updatePengaduanKorupsi = (id, data) => api.put(`/pengaduan_korupsi/${id}`, data);
export const deletePengaduanKorupsi = (id) => api.delete(`/pengaduan_korupsi/${id}`);
