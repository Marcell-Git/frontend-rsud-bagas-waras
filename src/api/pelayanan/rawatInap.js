import api from "../axios";

export const getRawatInap = () => api.get("/rawat_inap");
export const getRawatInapById = (id) => api.get(`/rawat_inap/${id}`);
export const createRawatInap = (data) =>
  api.post("/rawat_inap", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateRawatInap = (id, data) =>
  api.post(`/rawat_inap/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteRawatInap = (id) => api.delete(`/rawat_inap/${id}`);
