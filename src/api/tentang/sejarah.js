import api from "../axios";

export const getSejarah = (params) => api.get("/sejarah", { params });
export const getSejarahById = (id) => api.get(`/sejarah/${id}`);
export const createSejarah = (data) => api.post("/sejarah", data);
export const updateSejarah = (id, data) => api.put(`/sejarah/${id}`, data);
export const deleteSejarah = (id) => api.delete(`/sejarah/${id}`);
