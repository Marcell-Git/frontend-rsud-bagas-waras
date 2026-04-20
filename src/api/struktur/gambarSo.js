import api from "../axios";

export const getStrukturOrganisasi = () => api.get("/gambar_so");
export const getStrukturOrganisasiById = (id) => api.get(`/gambar_so/${id}`);
export const createStrukturOrganisasi = (data) => api.post("/gambar_so", data, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});
export const updateStrukturOrganisasi = (id, data) => api.post(`/gambar_so/${id}`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});
export const deleteStrukturOrganisasi = (id) => api.delete(`/gambar_so/${id}`);
