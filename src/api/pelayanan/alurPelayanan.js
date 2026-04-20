import api from "../axios";

export const getAlurPelayanan = () => api.get("/alur_pelayanan");
export const getAlurPelayananById = (id) => api.get(`/alur_pelayanan/${id}`);
export const createAlurPelayanan = (data) =>
  api.post("/alur_pelayanan", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateAlurPelayanan = (id, data) =>
  api.post(`/alur_pelayanan/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteAlurPelayanan = (id) => api.delete(`/alur_pelayanan/${id}`);
