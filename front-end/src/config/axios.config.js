import axios from "axios";
// const BASE_URL = "https://dashboard-back-end-ye52.onrender.com";
const BASE_URL = "http://localhost:5000";

axios.defaults.baseURL = BASE_URL;
// axios.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("authToken");
//     console.log("Sending token:", token);
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
axios.defaults.withCredentials = true;
export default axios;
