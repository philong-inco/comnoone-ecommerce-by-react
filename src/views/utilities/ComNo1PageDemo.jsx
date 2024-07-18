// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import logocomno1 from 'assets/images/logocomno1.png';

const ComNo1PageDemo = () => {
  const [abc, setabc] = useState('');
  return (
    <MainCard title="Thay đổi tiêu đề ở đây">
      <div >
         <img src={logocomno1} alt="Berry" width="250" />
        </div>
      <Typography>
        Tất cả nội dung đặt trong MainCard... ok nhé anh em <br />
        <br />
        Anh để cấu hình menu tại src/menu-items/quanLy.js <br />
        Bỏ thanh điều hướng ngay bên trên được, bấm vào menu mở ra tab mới được <br />
        anh em vào file đó đọc nhé <br />
        Ví dụ "Bán hàng tại quầy" là bỏ thanh điều hướng đi <br />
        Ví dụ "chính sách" là mở ra trang mới
      </Typography>
    </MainCard>
  )
};

export default ComNo1PageDemo;
