import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const authApi = {
  signUp: (data) => {
    return axios.post(`${API_BASE_URL}/khachhang/create`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  signIn: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/auth/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error.response?.data || "Đăng nhập thất bại.";
    }
  },

  sendEmailForgotPassword: (email) => {
    return axios.get(`${API_BASE_URL}/khachhang/sendemailforgotpassword`, {
      params: { email },
      headers: { "Content-Type": "application/json" },
    });
  },
  updatePassword: ({ id, newPassword }) => {
    return axios.put(
      `${API_BASE_URL}/khachhang/update-password/${id}`,
      null,
      {
        params: { newPassword },
        headers: { "Content-Type": "application/json" },
      }
    );
  },
};

export default authApi;
