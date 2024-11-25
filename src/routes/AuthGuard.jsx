import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Typography, Container, Stack } from '@mui/material'; 
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AuthGuard = ({ children, allowedRoles }) => {
  const [authError, setAuthError] = useState(null);  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('COMNOONE_TOKEN');
      console.log('JWT Token:', token);

      if (!token) {
        setAuthError('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('response', response);

        if (response.status === 200) {
          const userData = await response.json();
          console.log(userData);

          if (!allowedRoles.includes(userData.role)) {
            setAuthError('Bạn không có quyền truy cập vào trang này.');
            return;
          }
          console.log('Quyền truy cập hợp lệ:', userData.role);
        } else {
          const errorData = await response.json();
          console.error('Lỗi:', errorData);
          if (errorData.code === 701) {
            setAuthError('Token đã hết hạn, vui lòng đăng nhập lại.');
          } else {
            setAuthError(`Lỗi xác thực: ${errorData.code}`);
          }
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setAuthError('Xảy ra lỗi trong quá trình xác thực, vui lòng thử lại.');
      }
    };

    checkAuth();
  }, [allowedRoles]);
  if (authError) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="50vh"
        bgcolor="#f3f4f6" 
      >
        <Container maxWidth="sm">
          <Stack spacing={3} alignItems="center"> 
            <ErrorOutlineIcon sx={{ fontSize: 64, color: '#d32f2f' }} /> 
            
            <Alert 
              severity="error" 
              variant="outlined"
              sx={{ width: '100%', bgcolor: '#ffe6e6', p: 2, border: '1px solid #d32f2f', borderRadius: 2 }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                Xác thực thất bại!
              </Typography>
              <Typography variant="body1" sx={{ color: '#d32f2f' }}>
                {authError}
              </Typography>
            </Alert>
          </Stack>
        </Container>
      </Box>
    );
  }

  return children;
};

export default AuthGuard;
