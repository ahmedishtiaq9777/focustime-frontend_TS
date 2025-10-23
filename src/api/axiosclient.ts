// src/api/axiosClient.ts
import axios from "axios";
import { baseUrl } from "../utils/variables";
import { useAuth } from "../context/authContext";

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: baseUrl, // change to your API base URL
});

// Add a request interceptor to attach the token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    console.log("token while request", token);
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      alert("Session expired. Please log in again.");
      const { logout } = useAuth();
      logout();
      // localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
