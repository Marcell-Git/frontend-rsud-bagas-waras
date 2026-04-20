import api from "../axios";

export const getLaporanBenturanKepentingan = (params) => api.get("/laporan_bentur_kepentingan", { params });
export const getLaporanBenturanKepentinganById = (id) => api.get(`/laporan_bentur_kepentingan/${id}`);
export const createLaporanBenturanKepentingan = (data) => api.post("/laporan_bentur_kepentingan", data);
export const updateLaporanBenturanKepentingan = (id, data) => api.put(`/laporan_bentur_kepentingan/${id}`, data);
export const deleteLaporanBenturanKepentingan = (id) => api.delete(`/laporan_bentur_kepentingan/${id}`);
