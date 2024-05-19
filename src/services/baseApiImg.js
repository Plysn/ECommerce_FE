import axios from "axios";

const API_URL = `https://ecommercebackend-953d.up.railway.app/api`;
// const API_URL = `http://localhost:8888/api`;

const apiImg = axios.create({
  baseURL: API_URL,
  headers: {
    "accept ": "application/json",
    "Content-Type": "multipart/form-data",
  },
});

apiImg.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers["Authorization"] = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiImg;
