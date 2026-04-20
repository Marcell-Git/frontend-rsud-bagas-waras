import api from "../axios";

export const getBanner = () => api.get("/banner");
export const createBanner = (data) =>
  api.post("/banner", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateBanner = (id, data) =>
  api.post(`/banner/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteBanner = (id) => api.delete(`/banner/${id}`);
