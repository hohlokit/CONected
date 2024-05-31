import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api as axiosInstance } from "../services/api";

export const useAxiosInterceptors = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const headers = {
          "ngrok-skip-browser-warning": true,
        };
        const token = localStorage.getItem("auth_token");
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        config.headers = headers;
        return config;
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          localStorage.removeItem("auth_token");

          navigate("/login", { replace: true });
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};
