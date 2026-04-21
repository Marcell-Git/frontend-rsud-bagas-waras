import api from "../axios";

export const getBerita = (params) => api.get("/berita", { params });
export const getBeritaById = (id) => api.get(`/berita/${id}`);
export const createBerita = (data) =>
  api.post("/berita", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateBerita = (id, data) =>
  api.post(`/berita/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteBerita = (id) => api.delete(`/berita/${id}`);
