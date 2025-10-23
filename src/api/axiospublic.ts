// axiosPublic.ts
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:8092/api", // change if your backend URL differs
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default axiosPublic;
