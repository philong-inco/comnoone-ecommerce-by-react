import apiClient from "./api";

const authApi = {
  signUp: (data) => {
    return apiClient.post("/khachhang/create", data);
  },
  signIn: (data) => {
    debugger;
    return apiClient.post("/v1/auth/login", data);
  },
  sendEmailForgotPassword: (email) => {
    return apiClient.get("/khachhang/sendemailforgotpassword", {
      params: { email },
    });
  },
  updatePassword: ({ id, newPassword }) => {
    return apiClient.put(`/khachhang/update-password/${id}`, null, {
      params: { newPassword },
    });
  },
};

export default authApi;
