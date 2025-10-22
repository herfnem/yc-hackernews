import { API_BASE_URL } from "@/lib/constants";
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const hackerNewsAPI: AxiosInstance = axios.create(config);

// add a request interceptor
hackerNewsAPI.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

hackerNewsAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      //   originalRequest._retry = true;
      //   const refreshToken = localStorage.getItem("refresh_token");
      //   if (refreshToken) {
      //     const response = await axios.post(
      //       `${baseURL}/auth/refresh/?refresh_token=${refreshToken}`,
      //     );
      //     if (response.status === 200) {
      //       localStorage.setItem("access_token", response.data.access_token);
      //       localStorage.setItem("refresh_token", response.data.refresh_token);
      //       return api(originalRequest);
      //     }
      //     if (response.status === 401) {
      redirectToLogin();
      //     }
      //   }
    }
    return Promise.reject(error);
  },
);

const redirectToLogin = () => {
  localStorage.clear();
  window.location.href = "/auth/login/";
};

export { hackerNewsAPI };
