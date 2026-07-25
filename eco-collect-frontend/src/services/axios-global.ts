import { store } from "@/store/store";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const authState =
    typeof state.auth === "string" ? JSON.parse(state.auth) : state.auth;
  const token = authState?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
