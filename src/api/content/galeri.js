import api from "../axios";

export const getGaleri = (params) => api.get("/galeri", { params });
export const createGaleri = (data) =>
  api.post("/galeri", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateGaleri = (id, data) =>
  api.post(`/galeri/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteGaleri = (id) => api.delete(`/galeri/${id}`);
