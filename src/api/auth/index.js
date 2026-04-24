import api from "../axios";
import { setWithExpiry, removeWithExpiry } from "../../utils/localStorageHelper";

const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 jam

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  if (response.data.access_token) {
    setWithExpiry("token", response.data.access_token, EXPIRY_TIME);
    setWithExpiry("user", response.data.user, EXPIRY_TIME);
  }
  return response.data;
};

export const logout = async () => {
  await api.post("/logout");
  removeWithExpiry("token");
  removeWithExpiry("user");
};

export const getMe = async () => {
  const response = await api.get("/me");
  return response.data;
};
