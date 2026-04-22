import api from "../axios";

export const getStandarPelayanan = (params) => api.get("/standar-pelayanan", { params });
export const createStandarPelayanan = (data) =>
  api.post("/standar-pelayanan", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateStandarPelayanan = (id, data) =>
  api.post(`/standar-pelayanan/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteStandarPelayanan = (id) => api.delete(`/standar-pelayanan/${id}`);
