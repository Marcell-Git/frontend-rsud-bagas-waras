import api from "../axios";

export const getIndexKepuasanApi = (params) => api.get("/index-kepuasan-masyarakat", { params });
export const createIndexKepuasanApi = (data) => api.post("/index-kepuasan-masyarakat", data, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const updateIndexKepuasanApi = (id, data) => api.post(`/index-kepuasan-masyarakat/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const deleteIndexKepuasanApi = (id) => api.delete(`/index-kepuasan-masyarakat/${id}`);




