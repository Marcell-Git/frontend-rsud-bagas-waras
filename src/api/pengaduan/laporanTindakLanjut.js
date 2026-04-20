import api from "../axios";

export const getLaporanTindakLanjut = (params) => api.get("/laporan_tindak_lanjut", { params });
export const getLaporanTindakLanjutById = (id) => api.get(`/laporan_tindak_lanjut/${id}`);
export const createLaporanTindakLanjut = (data) => api.post("/laporan_tindak_lanjut", data);
export const updateLaporanTindakLanjut = (id, data) => api.put(`/laporan_tindak_lanjut/${id}`, data);
export const deleteLaporanTindakLanjut = (id) => api.delete(`/laporan_tindak_lanjut/${id}`);
