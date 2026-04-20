import api from "../axios";

export const getFungsiRSUD = () => api.get("/fungsi_rsud");
export const createFungsiRSUD = (data) => api.post("/fungsi_rsud", data);
export const updateFungsiRSUD = (id, data) => api.put(`/fungsi_rsud/${id}`, data);
export const deleteFungsiRSUD = (id) => api.delete(`/fungsi_rsud/${id}`);
