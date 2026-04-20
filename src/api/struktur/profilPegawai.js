import api from "../axios";

export const getPegawai = () => api.get("/profil_pegawai");
export const createPegawai = (data) => api.post("/profil_pegawai", data);
export const updatePegawai = (id, data) => api.put(`/profil_pegawai/${id}`, data);
export const deletePegawai = (id) => api.delete(`/profil_pegawai/${id}`);
