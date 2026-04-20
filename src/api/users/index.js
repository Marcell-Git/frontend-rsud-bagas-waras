import api from "../axios";

export const getUsers = (params) => api.get("/user", { params });
export const getUser = (id) => api.get(`/user/${id}`);
export const createUser = (data) => api.post("/user", data);
export const updateUser = (id, data) => api.put(`/user/${id}`, data);
export const deleteUser = (id) => api.delete(`/user/${id}`);
