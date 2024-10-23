import React, { useEffect, useRef, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TableContainer,
  Paper,
  Snackbar,
  Alert,
  Tooltip
} from '@mui/material';
import { addPaymentHistory, deleteHDHTT, getAllHistoryPaymentByBillCode } from 'services/admin/hdhttt';
import { useParams } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { payCounter } from 'services/admin/bill/billService';

const PaymentDialog2 = (props) => {
  const { id } = useParams();
  const iframeRef = useRef();
  const { open, onCloseDialog, data, onReload } = props;
  const [loading, setLoading] = useState(true);
  const [lichSuThanhToan, setLichSuThanhToan] = useState([]);
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('');
  const [soTien, setSoTien] = useState('');
  const [tienThieu, setTienThieu] = useState(0);
  const [tienDaThanhToan, setTienDaThanhToan] = useState(0);
  const [xacNhanMo, setXacNhanMo] = useState(false);
  const [tienDu, setTienDu] = useState(0);
  //
  const [xacNhanThanhToan, setXacNhanThanhToan] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const [pdfUrl, setPdfUrl] = useState(null);

  const handlePhuongThucThanhToanChange = (phuongThuc) => {
    setPhuongThucThanhToan(phuongThuc);
    setXacNhanMo(true);
  };
  console.log('DATA PAY : ', data);

  const handleConfirm = () => {
    const idThanhToan = phuongThucThanhToan === 'cash' ? 1 : 2;
    const newData = {
      idHTTT: idThanhToan,
      soTien: data.tongTienPhaiTra + (data.loaiHoaDon == 1 ? data.tienShip : 0),
      tienNhan: parseFloat(soTien),
      loaiThanhToan: '0',
      // tienShip: data.tienShip,
      loaiHoaDon: data.loaiHoaDon,
      //
      ten: data.ten,
      sdt: data.sdt,
      email: data.email
      // diaChi: data.diaChi,
      // tinh: data.tinh,
      // tenTinh: data.tenTinh,
      // huyen: data.huyen,
      // tenHuyen: data.tenHuyen,
      // phuong: data.phuong,
      // tenPhuong: data.tenPhuong,
      // ghiChu: data.ghiChu
    };
    console.log('Data veef HDHTT : ', newData);

    create(newData);
    setSoTien('');
    setXacNhanMo(false);
  };

  const create = async (newData) => {
    console.log(id);

    try {
      const response = await addPaymentHistory(data.ma, newData);
      if (response.status_code === 201) {
        setSnackbarMessage('Giao dịch thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        // await fetchInvoicePdf();

        fetchAll();
      }
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        if (errorData && errorData.message) {
          const errorMessage = errorData.message.map((err) => `${err.messages}`);
          setSnackbarMessage(errorMessage);
        } else {
          setSnackbarMessage('Đã xảy ra lỗi không xác định.');
        }
      } else {
        setSnackbarMessage('Lỗi mạng hoặc không thể kết nối đến server.');
      }
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.log(error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const fetchAll = async () => {
    try {
      const response = await getAllHistoryPaymentByBillCode(id);
      if (response.status_code === 200) {
        setLichSuThanhToan(response.data);
        const totalPaid = response.data
          .filter((payment) => payment.loaiThanhToan === 0)
          .reduce((sum, payment) => {
            return sum + (payment.tienNhan || 0);
          }, 0);
        setTienDaThanhToan(totalPaid);
      }
    } catch (error) {
    } finally {
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteHDHTT(id);
      if (response) {
        setSnackbarMessage('Hủy giao dịch thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        fetchAll();
      }
    } catch (error) {
      console.log(error);

      setSnackbarMessage('Hủy giao dịch thất bại');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  useEffect(() => {
    fetchAll();
  }, [id]);
  const fetchInvoicePdf = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/bills/order-pdf/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf'
        }
      });

      if (response.ok) {
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);

        // Gọi in PDF từ iframe sau khi đã tải
        setTimeout(() => {
          iframeRef.current.contentWindow.print(); // In file PDF trong iframe
        }, 500);
      } else {
        console.error('Failed to fetch PDF');
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };
  // useEffect(() => {
  //   if (data.loaiHoaDon == 0) {
  //     setTienThieu(data.tongTienPhaiTra || 0);
  //   } else {
  //     setTienThieu(data.tongTienPhaiTra + data.tienShip);
  //   }
  // }, [open]);
  useEffect(() => {
    const tongTienPhaiTra = data.loaiHoaDon === 0 ? data.tongTienPhaiTra : data.tongTienPhaiTra + data.tienShip;

    const currentTienThieu = tongTienPhaiTra - tienDaThanhToan;
    setTienThieu(currentTienThieu > 0 ? currentTienThieu : 0);

    const tienDu = tienDaThanhToan - tongTienPhaiTra;
    setTienDu(tienDu > 0 ? tienDu : 0);
  }, [tienDaThanhToan, data]);
  // 86.426.531,57
  const handleConfirmThanhToan = () => {
    console.log(data);
    const newData = {
      thanhToanSau: data.thanhToanSau,
      loaiHoaDon: data.loaiHoaDon,
      tienShip: data.tienShip,
      ten: data.tenKhachHang,
      sdt: data.sdt,
      email: data.email,
      diaChi: data.diaChi,
      tinh: data.tinh,
      tenTinh: data.tenTinh,
      huyen: data.huyen,
      tenHuyen: data.tenHuyen,
      phuong: data.phuong,
      tenPhuong: data.tenPhuong,
      ghiChu: data.ghiChu
    };
    console.log('new DATA : ', newData);
    apiPayCounter(newData);
  };

  const apiPayCounter = async (data) => {
    try {
      const response = await payCounter(id, data);
      if (response.status_code === 201) {
        setSnackbarMessage('Xác nhận thanh toán thành công thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setXacNhanMo(false);
        setXacNhanThanhToan(false);
        onCloseDialog();
        await fetchInvoicePdf();
        // setFormData({});
        // setBill({});
        // setFormDataAddress({});
        // setShowPDF(true);
        onReload();
        // onReload();
      }
    } catch (error) {
      console.log(error);

      setSnackbarMessage('Không thể thực hiện thanh toán');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  return (
    <>
      <Dialog open={open} onClose={onCloseDialog} fullWidth maxWidth="md">
        <DialogTitle variant="h4">Thanh toán</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h3" color="error">
                  Cần thanh toán : {(data.loaiHoaDon === 0 ? data.tongTienPhaiTra : data.tongTienPhaiTra + data.tienShip).toLocaleString()}{' '}
                  VNĐ
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Số tiền"
                  type="number"
                  value={soTien}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (parseFloat(value) >= 0 || value === '') {
                      setSoTien(value);
                    }
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant={phuongThucThanhToan === 'cash' ? 'contained' : 'outlined'}
                  onClick={() => handlePhuongThucThanhToanChange('cash')}
                  fullWidth
                >
                  Tiền mặt
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant={phuongThucThanhToan === 'transfer' ? 'contained' : 'outlined'}
                  onClick={() => handlePhuongThucThanhToanChange('transfer')}
                  fullWidth
                >
                  Chuyển khoản
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">Tiền dư: {tienDu.toLocaleString()} VNĐ</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" color="error">
                  Tiền thiếu: {tienThieu.toLocaleString()} VNĐ
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">Khách thanh toán : {tienDaThanhToan.toLocaleString()} VNĐ</Typography>
              </Grid>

              <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Ngày tạo</TableCell>
                        {/* <TableCell>Số tiền</TableCell> */}
                        <TableCell>Tiền nhận</TableCell>
                        <TableCell>Phương thanh toán</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Người tạo</TableCell>
                        <TableCell>Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lichSuThanhToan.map((thanhToan, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{thanhToan.ngayTao}</TableCell>
                          {/* <TableCell>{thanhToan.soTien ? thanhToan.soTien.toLocaleString() : 'Chưa có'}</TableCell> */}
                          <TableCell>{thanhToan.tienNhan ? thanhToan.tienNhan.toLocaleString() : ''}</TableCell>
                          <TableCell>{thanhToan.phuongThanhToan === 1 ? 'Tiền mặt' : 'Chuyển khoản'}</TableCell>
                          <TableCell>{thanhToan.loaiThanhToan === 0 ? 'Thanh toán' : 'Trả Sau'}</TableCell>
                          <TableCell>{thanhToan.nguoiTao ? thanhToan.nguoiTao : 'Chưa xác định'}</TableCell>
                          <TableCell>
                            <Tooltip label="Hủy bỏ giao dịch này">
                              <Button onClick={() => handleDelete(thanhToan.id)}>
                                <Delete color="erorr" />
                              </Button>
                            </Tooltip>{' '}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button onClick={() => setXacNhanThanhToan(true)} disabled={tienThieu > 0}>
                  Thanh toán
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        {/* Dialog xác nhận */}
        <Dialog open={xacNhanMo} onClose={() => setXacNhanMo(false)}>
          <DialogTitle>Xác nhận</DialogTitle>
          <DialogContent>
            Bạn có chắc chắn muốn thanh toán bằng {phuongThucThanhToan === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'} không?
          </DialogContent>
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Button onClick={() => setXacNhanMo(false)}>Hủy</Button>
            <Button onClick={handleConfirm} color="primary">
              OK
            </Button>
          </Grid>
        </Dialog>
      </Dialog>

      {/* Dialog xác nhận thanh toán */}
      <Dialog open={xacNhanThanhToan} onClose={() => setXacNhanThanhToan(false)}>
        <DialogTitle>Xác nhận thanh toán</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn thanh toán bằng hóa đơn <strong>{data.ma} </strong> không?
        </DialogContent>
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <Button onClick={() => setXacNhanThanhToan(false)}>Hủy</Button>
          <Button onClick={handleConfirmThanhToan} color="primary">
            OK
          </Button>
        </Grid>
      </Dialog>
      {pdfUrl && (
        <iframe
          ref={iframeRef}
          src={pdfUrl}
          width="0"
          height="0"
          style={{ display: 'none' }} // Ẩn iframe
          title="PDF"
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PaymentDialog2;
