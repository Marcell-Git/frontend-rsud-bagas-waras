import api from "../axios";

export const getPPID = (params) => api.get("/berkas_ppid", { params });
export const getInformasiBerkala = () => api.get("/berkas_ppid/informasi_berkala");
export const getInformasiSertaMerta = () => api.get("/berkas_ppid/informasi_serta_merta");
export const getInformasiSetiapSaat = () => api.get("/berkas_ppid/informasi_setiap_saat");
export const getInformasiDikecualikan = () => api.get("/berkas_ppid/informasi_dikecualikan");
export const createPPID = (data) =>
  api.post("/berkas_ppid", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updatePPID = (id, data) =>
  api.post(`/berkas_ppid/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deletePPID = (id) => api.delete(`/berkas_ppid/${id}`);
