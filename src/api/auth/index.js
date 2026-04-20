import api from "../axios";

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = async () => {
  await api.post("/logout");
  localStorage.removeItem("token");
};

export const getMe = async () => {
  const response = await api.get("/me");
  return response.data;
};
