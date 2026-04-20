import api from "../axios";

export const getJadwalDokter = (params) => api.get("/jadwal_dokter", { params });
export const createJadwalDokter = (data) => api.post("/jadwal_dokter", data);
export const updateJadwalDokter = (id, data) => api.put(`/jadwal_dokter/${id}`, data);
export const deleteJadwalDokter = (id) => api.delete(`/jadwal_dokter/${id}`);
