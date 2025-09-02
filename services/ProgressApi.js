import axios from "axios"

const apiClient = axios.create({
  baseURL: "http://localhost:2636/v1/progress/",
  timeout: 4000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.authorization = token
  return config
})

export const getProgressByUser = async (userId) => {
  try {
    const res = await apiClient.get(`byUser/${userId}`)
    return res.data
  } catch (e) {
    return { error: true, message: "No se pudo obtener el progreso", e }
  }
}

export const updateProgressRequest = async (level) => {
  try {
    const res = await apiClient.put(`update`,level)
    return res.data
  } catch (e) {
    return { error: true, message: "Error al actualizar el progreso", e }
  }
}