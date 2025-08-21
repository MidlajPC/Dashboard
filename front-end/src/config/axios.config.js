import axios from "axios";
const BASE_URL = "http://localhost:5000";

axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default axios;
