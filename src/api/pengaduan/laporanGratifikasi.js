import api from "../axios";

export const getLaporanGratifikasi = (params) => api.get("/laporan_gratifikasi", { params });
export const getLaporanGratifikasiById = (id) => api.get(`/laporan_gratifikasi/${id}`);
export const createLaporanGratifikasi = (data) => api.post("/laporan_gratifikasi", data);
export const updateLaporanGratifikasi = (id, data) => api.put(`/laporan_gratifikasi/${id}`, data);
export const deleteLaporanGratifikasi = (id) => api.delete(`/laporan_gratifikasi/${id}`);
