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
        backgroundImage: "url('https://res.cloudinary.com/daljc2ktr/image/upload/v1731643195/rszyuca62fo0uosvnhf0.jpg')", // Update path as needed
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Đăng nhập
        </Typography>
          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            Chào mừng bạn đến với hệ thống quản lý cửa hàng{" "}
            <span style={{ color: "#800080", fontWeight: "bold" }}>COMNOONE</span>
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
            color="primary"
            InputLabelProps={{
              shrink: true,
            }}
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
            color="primary"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth

            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            disabled={isSigningIn}
          >
            {isSigningIn ? <CircularProgress size={24} color="inherit" /> : "Đăng nhập"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default FullscreenSignIn;
