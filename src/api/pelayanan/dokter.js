import api from "../axios";

export const getDokter = (params) => api.get("/dokter", { params });
export const getDokterSelection = () => api.get("/dokter/selection");
export const createDokter = (data) =>
  api.post("/dokter", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateDokter = (id, data) =>
  api.post(`/dokter/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteDokter = (id) => api.delete(`/dokter/${id}`);
