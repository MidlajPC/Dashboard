import axios from "axios";
const BASE_URL = "https://dashboard-back-en.vercel.app";
// const BASE_URL = "https://dashboard-back-end-ye52.onrender.com";
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
