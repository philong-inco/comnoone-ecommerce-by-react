import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addCouponToBill } from 'services/admin/bill/billService';
import { getAllCouponsToBill } from 'services/admin/coupons/couponsService';

function CouponDiaLog(props) {
  const { id } = useParams();
  const { showDiaLogCoupon, bill, handleCloseDiaLogCoupon, onLoading } = props;

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const handleAddCouponToBill = async (couponId) => {
    try {
      const response = await addCouponToBill(couponId, id);
      if (response.status_code === 201) {
        setSnackbarMessage('Thêm phiếu giảm giá thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        // fetchBillInFo();
        onLoading();
        handleCloseDiaLogCoupon();
      } else {
      }
    } catch (error) {
      if (response.status_code === 201) {
        setSnackbarMessage('Thêm phiếu giảm giá thất bại');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  useEffect(() => {
    if (showDiaLogCoupon) {
      fetchApiGetAllCouponsToBill();
    }
  }, [showDiaLogCoupon]);

  const fetchApiGetAllCouponsToBill = async () => {
    try {
      // || ID
      const response = await getAllCouponsToBill(id);
      if (response.status_code === 200) {
        setCoupons(response.data);
      } else {
      }
    } catch (error) {
      setSnackbarMessage('Api phiếu giảm giá lỗi');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <Dialog open={showDiaLogCoupon} onClose={handleCloseDiaLogCoupon} maxWidth="md" fullWidth>
        <DialogTitle>Danh sách khách hàng</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Mã phiếu</TableCell>
                  {/* <TableCell>Tên </TableCell> */}
                  <TableCell>Giá trị </TableCell>
                  <TableCell>Đơn từ </TableCell>
                  <TableCell>Giá trị đối đa </TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Loại phiếu</TableCell>

                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell></TableCell>
                    <TableCell>{coupon.ma} </TableCell>
                    {/* <TableCell>{coupon.ten}</TableCell> */}

                    <TableCell>
                      {parseInt(coupon.giaTriGiamGia || 0).toLocaleString() || '0'} {coupon.loaiGiamGia === 1 ? '%' : 'VNĐ' || ''}
                    </TableCell>
                    <TableCell>{parseFloat(coupon.giaTriDonToiThieu || 0).toLocaleString() || '0'}</TableCell>
                    <TableCell>{parseFloat(coupon.giamToiDa || 0).toLocaleString() || '0'} VNĐ </TableCell>
                    <TableCell>{coupon.soLuong}</TableCell>
                    <TableCell>{coupon.phamViApDung == 1 ? 'Công khai' : 'Cá nhân'}</TableCell>

                    <TableCell>
                      <Button
                        onClick={() => {
                          handleAddCouponToBill(coupon.id);
                        }}
                        variant="contained"
                        color="primary"
                        disabled={bill.idPhieuGiamGia === coupon.id ? true : false || false}
                      >
                        Chọn
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDiaLogCoupon} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CouponDiaLog;