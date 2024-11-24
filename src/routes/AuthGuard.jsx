import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children, allowedRoles }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('COMNOONE_TOKEN');
      console.log('JWT Token:', token);
      // const tk =
      //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5oQGdtYWlsLmNvbSIsImlhdCI6MTczMTg1NDAzMywiZXhwIjoxNzMxOTQwNDMzfQ.6Xq8NAVShFsROwhqsNOy46lw9voAfsuFY6mSraeIjVU';
      if (!token) {
        return navigate('/login');
      }

      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        console.log('response', response);

        if (response.status === 200) {
          const userData = await response.json();
          console.log(userData);

          // if (userData.role === 'CUSTOMER') {
          //   return navigate('/403');
          // }

          // if (['ADMIN', 'STAFF'].includes(userData.role)) {
          //   console.log('Quyền truy cập hợp lệ:', userData.role);
          // }
          if (!allowedRoles.includes(userData.role)) {
            alert('Bạn không có quyền truy cập vào trang này.');
            return navigate('/403');
          }
          console.log('Quyền truy cập hợp lệ:', userData.role);
        } else {
          const errorData = await response.json();
          console.error('Lỗi:', errorData);
          if (errorData.code == 701) {
            alert('Token hết hạn');
            navigate('/login');
          }
          console.error('Lỗi:', errorData.message);
          alert(`Lỗi xác thực: ${errorData.code}`);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, allowedRoles]);
  return children;
};

export default AuthGuard;
