import api from "../axios";

export const getLinkEksternal = () => api.get("/link_eksternal");
export const getLinkEksternalById = (id) => api.get(`/link_eksternal/${id}`);
export const createLinkEksternal = (data) =>
  api.post("/link_eksternal", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateLinkEksternal = (id, data) =>
  api.post(`/link_eksternal/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteLinkEksternal = (id) => api.delete(`/link_eksternal/${id}`);
