// src/services/Levelsapi.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:2636/v1/levels/",
  timeout: 2000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.authorization = token
  }
  return config;
})

export const getLevels = async (params = { limit: 20, skip: 0 }) => {
  try {
    const res = await apiClient.get("list", { params })
    return res.data.levels
  } catch (e) {
    return { error: true, e }
  }
};
