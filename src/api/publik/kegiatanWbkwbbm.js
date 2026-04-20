import api from "../axios";

export const getWBKWBBM = (params) => api.get("/kegiatan_wbkwbbm", { params });
export const createWBKWBBM = (data) =>
  api.post("/kegiatan_wbkwbbm", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateWBKWBBM = (id, data) =>
  api.post(`/kegiatan_wbkwbbm/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteWBKWBBM = (id) => api.delete(`/kegiatan_wbkwbbm/${id}`);
