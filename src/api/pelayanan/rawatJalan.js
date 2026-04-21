import api from "../axios";

export const getPoli = (params) => api.get("/rawat_jalan", { params });
export const createPoli = (data) => api.post("/rawat_jalan", data);
export const updatePoli = (id, data) => api.put(`/rawat_jalan/${id}`, data);
export const deletePoli = (id) => api.delete(`/rawat_jalan/${id}`);
