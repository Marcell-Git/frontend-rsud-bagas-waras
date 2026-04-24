import api from "../axios";

export const getJdih = () => api.get("/jdih");
export const createJdih = (data) =>
  api.post("/jdih", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateJdih = (id, data) =>
  api.post("/jdih/${id}", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteJdih = (id) => api.delete("/jdih/${id}");
