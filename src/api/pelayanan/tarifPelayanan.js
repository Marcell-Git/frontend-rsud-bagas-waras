import api from "../axios";

export const getTarifPelayanan = (params) => api.get("/tarif-pelayanan", { params });
export const getTarifPelayananById = (id) => api.get(`/tarif-pelayanan/${id}`);
export const createTarifPelayanan = (data) =>
  api.post("/tarif-pelayanan", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateTarifPelayanan = (id, data) =>
  api.post(`/tarif-pelayanan/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteTarifPelayanan = (id) => api.delete(`/tarif-pelayanan/${id}`);
