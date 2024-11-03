import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllHistoryPaymentByBillCode } from 'services/admin/hdhttt';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Paper, Typography, Grid, Chip } from '@mui/material';

function HistoryPayment(props) {
  const { id } = useParams();
  const { bill } = props;
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
  }, [id, bill]);

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Grid container spacing={2} padding={3} sx={{ backgroundColor: 'white', borderRadius: 4, mt: 2, boxShadow: 3 }}>
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
                  <TableCell>Số tiền</TableCell>
                  {/* <TableCell>Phương thanh toán</TableCell> */}
                  <TableCell>Trạng thái</TableCell> <TableCell>Ngày tạo</TableCell>
                  <TableCell>Người tạo</TableCell> {/* Cột mới */}
                </TableRow>
              </TableHead>
              {/* <TableBody>
                {historyPayments.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{payment.ngayTao}</TableCell>
                    <TableCell>{payment.soTien ? payment.soTien.toLocaleString() : 'Chưa có'}</TableCell>
                    <TableCell>
                      {payment.phuongThanhToan === null ? '' : payment.phuongThanhToan === 1 ? 'Tiền mặt' : 'Chuyển khoản'}
                    </TableCell>
                    <TableCell>{payment.loaiThanhToan === 0 ? 'Thanh toán' : 'Trả Sau'}</TableCell>
                    <TableCell>{payment.nguoiTao ? payment.nguoiTao : 'Chưa xác định'}</TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
              <TableBody>
                {Array.from(new Map(historyPayments.map((payment) => [payment.soTien, payment])).values()).map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <strong>{payment.soTien ? payment.soTien.toLocaleString() + ' đ' : 'Chưa có'}</strong>{' '}
                    </TableCell>
                    <TableCell>
                      {payment.loaiThanhToan === 0 ? (
                        <Chip label="Thanh toán" color="success" size="small" /> // Chip màu xanh cho 'Thanh toán'
                      ) : (
                        <Chip label="Trả Sau" color="error" size="small" /> // Chip màu đỏ cho 'Trả Sau'
                      )}
                    </TableCell>
                    <TableCell>{payment.ngayTao}</TableCell>
                    <TableCell>{payment.nguoiTao ? payment.nguoiTao : 'Chưa xác định'}</TableCell>
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
