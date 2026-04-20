import api from "../axios";

export const getPengaduanMasyarakat = (params) => api.get("/pengaduan_masyarakat", { params });
export const createPengaduanMasyarakat = (data) => api.post("/pengaduan_masyarakat", data);
export const deletePengaduanMasyarakat = (id) => api.delete(`/pengaduan_masyarakat/${id}`);
