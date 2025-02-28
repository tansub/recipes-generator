import axios from "axios";
const instance = axios.create({
  // http://localhost:3003/api/auth/login
  baseURL: "http://localhost:3003/api",
  validateStatus: () => true,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
