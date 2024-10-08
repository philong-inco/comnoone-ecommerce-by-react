import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllHistoryPaymentByBillCode } from 'services/admin/hdhttt';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Paper, Typography, Grid } from '@mui/material';

function HistoryPayment(props) {
  const { id } = useParams();
  const [historyPayments, setHistoryPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    try {
      const response = await getAllHistoryPaymentByBillCode(id);
      if (response.status_code === 200) {
        setHistoryPayments(response.data);
      }
    } catch (error) {
      setError('Không thể tải lịch sử thanh toán');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [id]);

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Grid container style={{ marginTop: '20px' }}>
      <Grid item xs={12}>
        {loading ? (
          <Typography>Đang tải...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {' '}
                  <TableCell>STT</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Số tiền</TableCell>
                  <TableCell>Phương thanh toán</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Người tạo</TableCell> {/* Cột mới */}
                </TableRow>
              </TableHead>
              <TableBody>
                {historyPayments.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{payment.ngayTao}</TableCell>
                    <TableCell>{payment.soTien ? payment.soTien.toLocaleString() : 'Chưa có'}</TableCell>
                    <TableCell>{payment.phuongThanhToan === 1 ? 'Tiền mặt' : 'Chuyển khoản'}</TableCell>
                    <TableCell>{payment.loaiThanhToan === 0 ? 'Thanh toán' : 'Trả SAu'}</TableCell>
                    <TableCell>{payment.nguoiTao ? payment.nguoiTao : 'Chưa xác định'}</TableCell> {/* Ô mới cho người tạo */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      {error && <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar} message={error} />}
    </Grid>
  );
}

export default HistoryPayment;
