import api from "../axios";

export const getLandasanHukum = (params) => api.get("/landasan_hukum", { params });
export const getLandasanHukumById = (id) => api.get(`/landasan_hukum/${id}`);
export const createLandasanHukum = (data) => api.post("/landasan_hukum", data);
export const updateLandasanHukum = (id, data) => api.put(`/landasan_hukum/${id}`, data);
export const deleteLandasanHukum = (id) => api.delete(`/landasan_hukum/${id}`);
