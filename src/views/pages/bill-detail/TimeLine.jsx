import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { revertBillStatus } from 'services/admin/bill/billService';
import { getStatusBillHistory } from 'utils/billUtil/billStatus';

function TimeLine(props) {
  const { billHistory, handleLoading } = props;
  const { id } = useParams();

  const handleRevertBillStatus = async () => {
    try {
      const response = await revertBillStatus(id);
      if (response.status_code === 201) {
        alert('Quay lại thành công');
        //   notification.success({
        //     message: 'Thành công',
        //     description: response.message,
        //     showProgress: true,
        //     duration: 2,
        //   })
        handleLoading();
      }
    } catch (error) {
      console.log(error);
      alert('Quay lại thất bại');

      // notification.error({
      //   message: 'Lỗi',
      //   description: 'Không thể quay lại trạng thái trước đó',
      //   showProgress: true,
      //   duration: 2,
      // })
    }
  };
  return (
    <div>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', borderRadius: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Lịch sử đơn hàng</Typography>
        </Grid>
        {billHistory.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={item.id}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 2 }}
          >
            <Card sx={{ width: '100%', textAlign: 'center' }}>
              <CardContent sx={{ padding: 2 }}>
                <img src="https://via.placeholder.com/50" alt="Hình ảnh" style={{ width: '20%', height: 'auto' }} />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {getStatusBillHistory(item.trangThai)}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontSize: '0.875rem' }}>
                  {item.ngayTao}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 0 }}>
          <Button variant="contained" color="primary" onClick={handleRevertBillStatus}>
            Quay lại trước đó
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default TimeLine;
