import api from "../axios";

export const getPengumuman = () => api.get("/pengumuman");
export const getPengumumanById = (id) => api.get(`/pengumuman/${id}`);
export const createPengumuman = (data) =>
  api.post("/pengumuman", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updatePengumuman = (id, data) =>
  api.post(`/pengumuman/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deletePengumuman = (id) => api.delete(`/pengumuman/${id}`);
