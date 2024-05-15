import axios from "axios";

// const API_URL = `https://shoestorebackend.up.railway.app/api`;
const API_URL = `http://localhost:8888/api`;

const token = localStorage.getItem("access_token");

console.log(token);
const parsedToken = JSON.parse(token);
console.log(parsedToken);
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "accept ": "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${parsedToken}`,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
