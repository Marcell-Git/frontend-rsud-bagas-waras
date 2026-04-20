import api from "../axios";

export const getPPID = (params) => api.get("/berkas_ppid", { params });
export const createPPID = (data) =>
  api.post("/berkas_ppid", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updatePPID = (id, data) =>
  api.post(`/berkas_ppid/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deletePPID = (id) => api.delete(`/berkas_ppid/${id}`);
