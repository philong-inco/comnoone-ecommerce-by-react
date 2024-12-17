import React, { useEffect, useRef, useState } from 'react';
// import mbBankImage from '../../../assets/images/MB-Banl.jpg';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';

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
  Tooltip,
  IconButton
} from '@mui/material';
import { addPaymentHistory, deleteHDHTT, getAllHistoryPaymentByBillCode } from 'services/admin/hdhttt';
import { useParams } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { payCounter } from 'services/admin/bill/billService';
import { createVNPay } from 'services/admin/vnpay';
import { getQr } from 'services/admin/vietqr';

const PaymentDialog2 = (props) => {
  const { id } = useParams();
  const iframeRef = useRef();
  const { open, onCloseDialog, data, onReload } = props;
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);

  const [lichSuThanhToan, setLichSuThanhToan] = useState([]);
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('');
  const [soTien, setSoTien] = useState('');
  const [tienThieu, setTienThieu] = useState(0);
  const [tienDaThanhToan, setTienDaThanhToan] = useState(0);
  const [xacNhanMo, setXacNhanMo] = useState(false);
  const [tienDu, setTienDu] = useState(0);
  //
  const [xacNhanThanhToan, setXacNhanThanhToan] = useState(false);

  //
  const [isPrintPdf, setIsPrintPdf] = useState(false);
  const [isConformPdf, setIsConformPdf] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const [openQr, setOpenQr] = useState(false);

  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(false);

  const [openVietQr, setOpenVietQr] = useState(false);
  const [qr, setQr] = useState(null);

  const [openConfirmVietQr, setOpenConfirmVietQr] = useState(false);

  const handlePhuongThucThanhToanChange = (phuongThuc) => {
    setPhuongThucThanhToan(phuongThuc);
    setXacNhanMo(true);
  };
  console.log('DATA PAY : ', data);

  const handleConfirm = () => {
    if (soTien === '' || soTien === null || soTien == undefined || soTien <= 0) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    console.log(soTien);

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
    try {
      const response = await addPaymentHistory(data.ma, newData);
      if (response.status_code === 201) {
        setSnackbarMessage('Giao dịch thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setOpenConfirmVietQr(false);
        setOpenVietQr(false);
        fetchAll();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessages = error.response.data.message.map((msg) => msg.messages).join(', ');
        setSnackbarMessage(` ${errorMessages}`);
      } else {
        setSnackbarMessage('Đã xảy ra lỗi không xác định');
      }
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
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
  const printPdf = () => {
    setIsPrintPdf(true);
    const code = localStorage.getItem('billCode');
    fetchInvoicePdf(code);
    setIsConformPdf(false);
  };

  const fetchInvoicePdf = async (code) => {
    try {
      const response = await fetch(`https://weblaptop-by-springboot-and-reactjs-aqjc.onrender.com/api/bills/order-pdf/${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf'
        }
      });

      if (response.ok) {
        setSnackbarMessage('In hóa đơn thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setIsConformPdf(false);
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);

        // Gọi in PDF từ iframe sau khi đã tải
        setTimeout(() => {
          iframeRef.current.contentWindow.print(); // In file PDF trong iframe
        }, 500);
        onReload();
      } else {
        console.error(response);

        console.error('Failed to fetch PDF');
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
      setSnackbarMessage('In hóa đơn thất bại');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      localStorage.setItem('billCode', '');
      setSnackbarOpen(true);
    }
  };
  useEffect(() => {
    const tongTienPhaiTra = data.loaiHoaDon === 0 ? data.tongTienPhaiTra : data.tongTienPhaiTra + data.tienShip;

    const currentTienThieu = tongTienPhaiTra - tienDaThanhToan;
    setTienThieu(currentTienThieu > 0 ? currentTienThieu : 0);
    setSoTien(currentTienThieu > 0 ? currentTienThieu : 0);
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
      setLoading(false);
      setLoading2(true);
      const response = await payCounter(id, data);
      if (response.status_code === 201) {
        setSnackbarMessage('Xác nhận thanh toán thành công thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setXacNhanMo(false);
        setXacNhanThanhToan(false);
        onCloseDialog();
        localStorage.setItem('billCode', response.data);
        setIsConformPdf(true);
        onReload();
      }
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.response.data.error);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(true);
      setLoading2(false);
    }
  };

  // const handleClickOpenQR = () => {
  //   setOpenQr(true);
  // };

  function formatCurrency(amount, locale = 'vi-VN', currency = 'VND') {
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
      currency: currency
    }).format(amount);
  }

  const handleChangePrice = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setSoTien(value);
  };

  const handleOpenVietQr = async () => {
    try {
      const res = await getQr(soTien, data.ma);
      if (res.code == '00') {
        setQr(res.data.qrDataURL);
        setOpenVietQr(true);
      }
      setSnackbarMessage('Tạo QR thanh toán thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch {
      setSnackbarMessage('Tạm thời không thể gen mã QR');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleClonseVietQr = () => {
    setQr(null);
    setOpenVietQr(false);
  };

  const handleConfirmVietQr = (phuongThuc) => {
    setPhuongThucThanhToan(phuongThuc);
    setOpenConfirmVietQr(true);
  };
  return (
    <>
      <Dialog open={open} onClose={onCloseDialog} fullWidth maxWidth="md">
        <DialogTitle variant="h4">Thanh toán</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs={6} style={{ textAlign: 'left' }}>
                  <Typography variant="h3" color="error">
                    Cần thanh toán: {(data.loaiHoaDon === 0 ? data.tongTienPhaiTra : data.tongTienPhaiTra + data.tienShip).toLocaleString()}{' '}
                    VNĐ
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Số tiền"
                  value={soTien ? formatCurrency(soTien) : ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    // if (parseFloat(value) >= 0 || value !== '') {
                    // setSoTien(value);
                    handleChangePrice(e);
                    // }
                  }}
                  error={error}
                  helperText={error ? 'Số tiền không được để trống và lớn hơn 0' : ''}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant={phuongThucThanhToan === 'cash' ? 'contained' : 'outlined'}
                  onClick={() => handlePhuongThucThanhToanChange('cash')}
                  fullWidth
                  disabled={tienThieu <= 0}
                >
                  Tiền mặt
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant={phuongThucThanhToan === 'transfer' ? 'contained' : 'outlined'}
                  onClick={() =>
                    // handlePhuongThucThanhToanChange('transfer')
                    handleOpenVietQr()
                  }
                  disabled={tienThieu <= 0}
                  fullWidth
                >
                  Chuyển khoản
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">Khách thanh toán : {tienDaThanhToan.toLocaleString()} VNĐ</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" color="error">
                  Tiền thiếu: {tienThieu.toLocaleString()} VNĐ
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">Tiền dư: {tienDu.toLocaleString()} VNĐ</Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Ngày tạo</TableCell>
                        {/* <TableCell>Mã giao dịch</TableCell> */}
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
                          {/* <TableCell>{thanhToan.maGiaoDich}</TableCell> */}

                          {/* <TableCell>{thanhToan.soTien ? thanhToan.soTien.toLocaleString() : 'Chưa có'}</TableCell> */}
                          <TableCell>{thanhToan.tienNhan ? thanhToan.tienNhan.toLocaleString() + ' đ' : ''}</TableCell>
                          <TableCell>{thanhToan.phuongThanhToan === 1 ? 'Tiền mặt' : 'Chuyển khoản'}</TableCell>
                          <TableCell>{thanhToan.loaiThanhToan === 0 ? 'Thanh toán' : 'Trả Sau'}</TableCell>
                          <TableCell>{thanhToan.nguoiTao ? thanhToan.nguoiTao : 'Chưa xác định'}</TableCell>
                          <TableCell>
                            <Tooltip title="Hủy bỏ giao dịch này" placement="top">
                              <Button onClick={() => handleDelete(thanhToan.id)}>
                                <Delete color="error" />
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
                <Button onClick={() => setXacNhanThanhToan(true)} disabled={tienThieu > 0 && loading} variant="contained" color="secondary">
                  Hoàn thành
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
          <Grid item xs={12} sx={{ textAlign: 'right', padding: '5px' }}>
            <Button onClick={() => setXacNhanMo(false)} variant="contained" color="error" sx={{ marginRight: '5px' }}>
              Hủy
            </Button>
            <Button onClick={handleConfirm} variant="contained" color="secondary">
              Xác nhận
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
          <Button onClick={() => setXacNhanThanhToan(false)} variant="contained" color="error" sx={{ marginRight: '5px' }}>
            Hủy
          </Button>
          <Button onClick={handleConfirmThanhToan} variant="contained" disabled={loading2} color="secondary">
            Xác nhận
          </Button>
        </Grid>
      </Dialog>
      <Dialog
        open={isConformPdf}
        onClose={() => {
          setIsConformPdf(false);
          localStorage.setItem('billCode', '');
        }}
      >
        <DialogTitle>Xác nhận in hóa đơn</DialogTitle>
        <DialogContent>Bạn có muốn in hóa đơn không </DialogContent>
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <Button
            onClick={() => {
              setIsConformPdf(false);
              localStorage.setItem('billCode', '');
              onReload();
            }}
            variant="contained"
            color="error"
            sx={{ marginRight: '5px' }}
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              setIsConformPdf(false);
              printPdf();
            }}
            variant="contained"
            color="secondary"
          >
            Có
          </Button>
        </Grid>
      </Dialog>

      <Dialog open={openVietQr} onClose={handleClonseVietQr}>
        {qr && <img src={qr}></img>}
        <Button
          onClick={() => {
            handleConfirmVietQr('transfer');
            handleClonseVietQr();
          }}
          variant="contained"
          color="secondary"
        >
          Xác nhận
        </Button>
      </Dialog>
      {/* Xác nhận nhận tiền */}
      <Dialog open={openConfirmVietQr} onClose={() => setOpenConfirmVietQr(false)}>
        <DialogTitle>Xác nhận thanh toán</DialogTitle>
        <DialogContent>
          Bạn chắc chắn đã nhận số tiền là : <strong>{formatCurrency(soTien)} đ</strong> ?
        </DialogContent>
        <Grid item xs={12} sx={{ textAlign: 'right', padding: '5px' }}>
          <Button onClick={() => setOpenConfirmVietQr(false)} variant="contained" color="error" sx={{ marginRight: '5px' }}>
            Hủy
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="secondary">
            Đúng vậy
          </Button>
        </Grid>
      </Dialog>
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
    </>
  );
};

export default PaymentDialog2;
