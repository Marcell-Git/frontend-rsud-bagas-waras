import api from "../axios";

export const getBuletin = () => api.get("/buletin");
export const getBuletinById = (id) => api.get(`/buletin/${id}`);
export const createBuletin = (data) =>
  api.post("/buletin", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateBuletin = (id, data) =>
  api.post(`/buletin/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteBuletin = (id) => api.delete(`/buletin/${id}`);
