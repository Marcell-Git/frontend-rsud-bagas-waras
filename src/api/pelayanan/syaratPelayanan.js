import api from "../axios";

export const getSyaratPelayanan = () => api.get("/syarat_pelayanan");
export const getSyaratPelayananById = (id) =>
  api.get(`/syarat_pelayanan/${id}`);
export const createSyaratPelayanan = (data) =>
  api.post("/syarat_pelayanan", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateSyaratPelayanan = (id, data) =>
  api.post(`/syarat_pelayanan/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteSyaratPelayanan = (id) =>
  api.delete(`/syarat_pelayanan/${id}`);
