import axios from "axios";
import { TOKEN_STORAGE_KEY } from "../constants";
import { message } from "antd";
import { onLogOut } from "../hooks/useAuth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URLS,
});

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const status = error.status;

    switch (status) {
      case 500: {
        message.error("Vui lòng đăng nhập lại tài khoản!");
        setTimeout(() => {
          onLogOut();
          window.location.href = "/login";
        }, 2000);
        break;
      }

      case 401: {
        message.error("Thông tin đăng nhập không chính xác!");
        break;
      }

      case 403: {
        message.error("Tài khoản của bạn không có quyền truy cập!");
        break;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
