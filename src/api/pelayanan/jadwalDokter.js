import api from "../axios";

export const getJadwalDokter = (params) => api.get("/jadwal_dokter", { params });
export const getAllDokter = () => api.get("/jadwal_dokter/all");
export const createJadwalDokter = (data) =>
  api.post("/jadwal_dokter", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getJadwalDokterHariIni = () => api.get("/jadwal_dokter/hari-ini");
export const updateJadwalDokter = (id, data) =>
  api.post(`/jadwal_dokter/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteJadwalDokter = (id) => api.delete(`/jadwal_dokter/${id}`);
