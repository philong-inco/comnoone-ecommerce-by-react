import React, { useState } from "react";
import { message } from "antd";
import { Box, Typography, Button, CircularProgress, TextField, Paper } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import authApi from "../../../services/admin/authApi";

const FullscreenSignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { onLogin } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      const data = await authApi.signIn(formData);
      
      if (data.role === "CUSTOMER") {
        message.error("Tài khoản không tồn tại!");
        setIsSigningIn(false);
        return;
      }

      if (data.trangThai === 3) {
        setShowUpdatePassword(true);
        setIsSigningIn(false);
        return;
      }
      onLogin(data);
      message.success("Đăng nhập thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Đăng nhập
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tên đăng nhập"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mật khẩu"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSigningIn}
          >
            {isSigningIn ? <CircularProgress size={24} /> : "Đăng nhập"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default FullscreenSignIn;
