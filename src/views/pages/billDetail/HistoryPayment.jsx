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
                  <TableCell>Mã giao dịch</TableCell>
                  <TableCell>Số tiền</TableCell>
                  <TableCell>Phương thanh toán</TableCell>
                  <TableCell>Loại thanh toán</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Người tạo</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyPayments.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{payment.maGiaoDich}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      {payment.tienNhan ? payment.tienNhan.toLocaleString() + ' đ' : 'Chưa có'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payment.phuongThanhToan === 1 ? 'Tiền mặt' : 'Chuyển khoản'}
                        style={{
                          backgroundColor: payment.phuongThanhToan === 1 ? 'purple' : '#4CAF50',
                          color: 'white',
                          borderRadius: '5px'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payment.loaiThanhToan === 0 ? 'Thanh toán' : 'Trả Sau'}
                        style={{
                          backgroundColor: payment.loaiThanhToan === 0 ? '#4CAF50' : 'red',
                          color: 'white',
                          borderRadius: '5px'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payment.trangThai == 0 ? 'Thành công' : 'Chờ'}
                        style={{
                          backgroundColor: payment.trangThai === 0 ? '#4CAF50' : '#FFB74D',
                          color: 'white',
                          borderRadius: '5px'
                        }}
                      />
                    </TableCell>
                    <TableCell>{payment.nguoiTao ? payment.nguoiTao : 'Chưa xác định'}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{payment.ngayTao}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      {error && <Snackbar open={Boolean(error)} autoHideDuration={3000} onClose={handleCloseSnackbar} message={error} />}
    </Grid>
  );
}

export default HistoryPayment;
