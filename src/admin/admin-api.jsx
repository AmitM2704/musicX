import axios from "axios";

const API = axios.create({
  baseURL: "https://music-x-server.onrender.com/api/admin"
});

// Add token to requests automatically
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
