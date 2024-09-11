import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Để lấy id từ URL
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, Checkbox, Box, Pagination, TableBody, TableCell, TableRow, TableHead, Table, TableContainer, Typography, TextField, Grid, Paper, RadioGroup, FormControlLabel, Radio, Button, InputAdornment, IconButton } from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getAllChangePageSize } from 'services/admin/customer/customerService.js';
import axios from 'axios';  // Axios for API calls
import { useNavigate } from 'react-router-dom';

function PhieuGiamGiaConfiguration() {
  const [currencyType, setCurrencyType] = useState('%');
  const [khachHang, setKhachHang] = useState([]);
  const [selectedKhachHang, setSelectedKhachHang] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmOpen, setConfirmOpen] = useState(false); // Thêm state cho Dialog xác nhận
  const [selectAll, setSelectAll] = useState(false);

  const validationSchema = yup.object({
    tenPhieu: yup.string().required('Tên phiếu giảm giá là bắt buộc'),
    giaTri: yup
      .number('Chỉ được nhập số')
      .required('Giá trị là bắt buộc')
      .positive('Giá trị phải lớn hơn 0'),
    giaTriToiDa: yup
      .number('Chỉ được nhập số')
      .required('Giá trị tối đa là bắt buộc')
      .positive('Giá trị tối đa phải lớn hơn 0'),
    soLuong: yup
      .number('Chỉ được nhập số')
      .required('Số lượng là bắt buộc')
      .positive('Số lượng phải lớn hơn 0'),
    dieuKien: yup.string().required('Điều kiện là bắt buộc'),
    tuNgay: yup
      .date()
      .min(new Date(), 'Từ ngày phải là ngày trong tương lai')
      .required('Từ ngày là bắt buộc'),
    denNgay: yup
      .date()
      .min(yup.ref('tuNgay'), 'Đến ngày phải sau từ ngày')
      .required('Đến ngày là bắt buộc'),
  });

  useEffect(() => {
    fetchKhachHang();
    fetchCouponDetail();
  }, [currentPage, id]);

  const fetchKhachHang = async () => {
    const results = await getAllChangePageSize(currentPage - 1, 7);
    setKhachHang(results.content);
    setTotalPages(results.totalPages);
  };
  const handleNavigate = () => {
    navigate('/phieugiamgia/cauhinhphieugiamgia');
  };

  useEffect(() => {
    console.log("Danh sách khách hàng đã chọn:", selectedKhachHang);
  }, []);

  const formik = useFormik({
    initialValues: {
      tenPhieu: '',
      giaTri: '',
      giaTriToiDa: '',
      soLuong: '',
      dieuKien: '',
      tuNgay: '',
      denNgay: '',
      kieu: '1',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        debugger;
        const data = {
          ten: values.tenPhieu,
          giaTriDonToiThieu: values.dieuKien,
          ngayBatDau: addSeconds(values.tuNgay),
          ngayHetHan: addSeconds(values.denNgay),
          loaiGiamGia: currencyType === '%' ? 1 : 2,
          giaTriGiamGia: values.giaTri,
          giamToiDa: values.giaTriToiDa,
          phamViApDung: values.kieu,
          soLuong: values.soLuong,
          listKhachHang: selectedKhachHang,
        };

        let response;
        if (id) {
          response = await axios.put(`http://localhost:8080/api/v1/coupons/update/${id}`, data);
          setSnackbar({ open: true, message: 'Phiếu giảm giá đã được cập nhật thành công!', severity: 'success' });
        } else {
          response = await axios.post('http://localhost:8080/api/v1/coupons/add', data);
          setSnackbar({ open: true, message: 'Phiếu giảm giá đã được tạo thành công!', severity: 'success' });
        }

        navigate('/phieugiamgia/cauhinhphieugiamgia');
      } catch (error) {
        setSnackbar({ open: true, message: 'Có lỗi xảy ra khi xử lý phiếu giảm giá', severity: 'error' });
      }
    },
  });

  const handleCurrencyChange = (type) => {
    setCurrencyType(type);
  };

  const handleSelectKhachHang = (id) => {
    setSelectedKhachHang((prevSelected) => {
      const newSelected = Array.isArray(prevSelected) && prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...(Array.isArray(prevSelected) ? prevSelected : []), id];

      console.log("Selected KhachHang within handler:", newSelected);  // Kiểm tra giá trị mới
      return newSelected;
    });
  };



  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update currentPage when pagination is clicked
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  function addSeconds(dateTimeStr) {
    if (!dateTimeStr) return "";
    if (dateTimeStr.length === 16) {
      return `${dateTimeStr}:00`;
    }
    if (dateTimeStr.length === 19) {
      return dateTimeStr;
    }

    return dateTimeStr;
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchCouponDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/coupons/detail/${id}`);
      const coupon = response.data;
      debugger;
      formik.setValues({
        maPhieu: coupon.data.ma,
        tenPhieu: coupon.data.ten,
        giaTri: coupon.data.giaTriGiamGia,
        giaTriToiDa: coupon.data.giamToiDa,
        soLuong: coupon.data.soLuong,
        dieuKien: coupon.data.giaTriDonToiThieu,
        tuNgay: coupon.data.ngayBatDau,
        denNgay: coupon.data.ngayHetHan,
        kieu: coupon.data.phamViApDung.toString(),
      });
      setCurrencyType(coupon.data.loaiGiamGia === 1 ? '%' : '$');
      const khachHangIds = coupon.data.khachHangPhieuGiamGias || [];
      setSelectedKhachHang(khachHangIds);
    } catch (error) {
      console.error('Error fetching coupon detail:', error);
    }
  };

  const isChiTietPage = location.pathname.includes('/phieugiamgia/chitietphieugiamgia');

  const handleSubmitWithConfirm = () => {
    setConfirmOpen(true); // Mở hộp thoại xác nhận
  };
  const handleConfirmClose = (isConfirmed) => {
    setConfirmOpen(false);
    if (isConfirmed) {
      formik.handleSubmit();
    }
  };

  function formatNumber(value) {
    const cleanedValue = String(value || "").replace(/\D/g, "");
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedKhachHang([]); // Bỏ chọn tất cả
    } else {
      setSelectedKhachHang(khachHang.map((row) => row.id)); // Chọn tất cả khách hàng trong trang
    }
    setSelectAll(!selectAll); // Đổi trạng thái checkbox "chọn tất cả"
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper style={{ padding: '16px' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Mã Phiếu Giảm Giá"
              name="maPhieu"
              fullWidth
              margin="normal"
              value={formik.values.maPhieu}
              onChange={formik.handleChange}
              error={formik.touched.maPhieu && Boolean(formik.errors.maPhieu)}
              helperText={formik.touched.maPhieu && formik.errors.maPhieu}
              InputProps={{
                readOnly: true, 
              }}
              InputLabelProps={{
                shrink: true, 
              }}
            />

            <TextField
              label="Tên Phiếu Giảm Giá"
              name="tenPhieu"
              fullWidth
              margin="normal"
              value={formik.values.tenPhieu}
              onChange={formik.handleChange}
              error={formik.touched.tenPhieu && Boolean(formik.errors.tenPhieu)}
              helperText={formik.touched.tenPhieu && formik.errors.tenPhieu}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Giá trị"
                  name="giaTri"
                  fullWidth
                  margin="normal"
                  value={formik.values.giaTri}
                  onChange={formik.handleChange}
                  error={formik.touched.giaTri && Boolean(formik.errors.giaTri)}
                  helperText={formik.touched.giaTri && formik.errors.giaTri}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleCurrencyChange('%')}
                          color={currencyType === '%' ? 'primary' : 'default'}
                        >
                          <PercentIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleCurrencyChange('$')}
                          color={currencyType === '$' ? 'primary' : 'default'}
                        >
                          <AttachMoneyIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Giá trị tối đa"
                  name="giaTriToiDa"
                  fullWidth
                  margin="normal"
                  value={formatNumber(formik.values.giaTriToiDa)}
                  onChange={formik.handleChange}
                  error={formik.touched.giaTriToiDa && Boolean(formik.errors.giaTriToiDa)}
                  helperText={formik.touched.giaTriToiDa && formik.errors.giaTriToiDa}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography sx={{ color: 'orange', fontWeight: 'bold' }}>₫</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Số lượng"
                  name="soLuong"
                  fullWidth
                  margin="normal"
                  value={formik.values.soLuong}
                  onChange={formik.handleChange}
                  error={formik.touched.soLuong && Boolean(formik.errors.soLuong)}
                  helperText={formik.touched.soLuong && formik.errors.soLuong}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Điều kiện"
                  name="dieuKien"
                  fullWidth
                  margin="normal"
                  value={formatNumber(formik.values.dieuKien)}
                  onChange={formik.handleChange}
                  error={formik.touched.dieuKien && Boolean(formik.errors.dieuKien)}
                  helperText={formik.touched.dieuKien && formik.errors.dieuKien}
                />
              </Grid>
            </Grid>

            {/* Các trường ngày tháng */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Từ ngày"
                  name="tuNgay"
                  type="datetime-local"
                  fullWidth
                  margin="normal"
                  value={formik.values.tuNgay}
                  onChange={formik.handleChange} InputLabelProps={{
                    shrink: true,
                  }}
                  error={formik.touched.tuNgay && Boolean(formik.errors.tuNgay)}
                  helperText={formik.touched.tuNgay && formik.errors.tuNgay}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Đến ngày"
                  name="denNgay"
                  type="datetime-local"
                  fullWidth
                  margin="normal"
                  value={formik.values.denNgay}
                  onChange={formik.handleChange}
                  error={formik.touched.denNgay && Boolean(formik.errors.denNgay)}
                  helperText={formik.touched.denNgay && formik.errors.denNgay}
                />
              </Grid>

            </Grid>
            <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
              <Grid item>
                <FormLabel component="legend">Phạm vi áp dụng</FormLabel>
              </Grid>
              <Grid item>
                <RadioGroup
                  row
                  aria-label="phạm vi áp dụng"
                  name="kieu"
                  value={formik.values.kieu}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Công khai" />
                  <FormControlLabel value="2" control={<Radio />} label="Cá nhân hóa" />
                </RadioGroup>
              </Grid>
            </Grid>
            {!isChiTietPage && (
              <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmitWithConfirm}>
                Lưu
              </Button>
            )}
          </form>
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <Paper style={{ padding: '16px', height: '100%' }}>
          <Typography variant="h6">Chọn khách hàng</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectAll} // Checkbox chọn tất cả
                    onChange={handleSelectAll}
                  />
                  </TableCell>
                  <TableCell>Tên khách hàng</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Ngày sinh</TableCell>
                  <TableCell>Hạng khách hàng</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {khachHang.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={Array.isArray(selectedKhachHang) && selectedKhachHang.includes(row.id)}
                        onChange={() => handleSelectKhachHang(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.ten}</TableCell>
                    <TableCell>{row.sdt}</TableCell>
                    <TableCell>{formatDate(row.ngaySinh)}</TableCell>
                    <TableCell>{row.hangKhachHang}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Paper>
      </Grid>
      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirm Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => handleConfirmClose(false)}
      >
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn lưu phiếu giảm giá này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmClose(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={() => handleConfirmClose(true)} color="primary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default PhieuGiamGiaConfiguration;
