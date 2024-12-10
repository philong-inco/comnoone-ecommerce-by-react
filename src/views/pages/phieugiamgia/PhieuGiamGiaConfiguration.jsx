import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Để lấy id từ URL
import {
  MenuItem,
  Select,
  Divider,
  FormControl,
  Chip,
  Snackbar,
  Fab,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Checkbox,
  Box,
  Pagination,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  Typography,
  TextField,
  Grid,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios'; // Axios for API calls
import { useNavigate } from 'react-router-dom';
import { getAll, getSearchKeyWord, getSelectHangKhachHang, getDanhSachKhachHang } from 'services/admin/customer/customerService.js';
import BigNumber from 'bignumber.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [selectHangKhachHang, setSelectHangKhachHang] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = yup.object({
    tenPhieu: yup.string().required('Tên phiếu giảm giá là bắt buộc'),
    giaTri: yup
      .string()
      .required('Giá trị là bắt buộc')
      .test('is-valid-value', (value, context) => {
        if (!value) return context.createError({ message: 'Giá trị là bắt buộc' });
        const bigNumberValue = new BigNumber(value.replace(/\./g, ''));
        if (currencyType === '%') {
          if (!bigNumberValue.isGreaterThan(0)) {
            return context.createError({ message: 'Giá trị phải lớn hơn 0%' });
          }
          if (!bigNumberValue.isLessThanOrEqualTo(100)) {
            return context.createError({ message: 'Giá trị không được vượt quá 100%' });
          }
          if (!bigNumberValue.isLessThanOrEqualTo(2000000)) {
            return context.createError({ message: 'Giá trị giảm không được vượt quá 2,000,000' });
          }
        } else if (currencyType === '$') {
          if (!bigNumberValue.isGreaterThan(0)) {
            return context.createError({ message: 'Giá trị phải lớn hơn 0$' });
          }
          if (!bigNumberValue.isLessThanOrEqualTo(2000000)) {
            return context.createError({ message: 'Giá trị giảm không được vượt quá 2,000,000' });
          }
        } else {
          return context.createError({ message: 'Loại phiếu không hợp lệ' });
        }
        return true;
      }),

    soLuong: yup
      .number('Chỉ được nhập số')
      .required('Số lượng là bắt buộc')
      .positive('Số lượng phải lớn hơn 0')
      .integer('Số lượng phải là số nguyên'),
    dieuKien: yup
      .string()
      .required('Điều kiện là bắt buộc')
      .test('is-big-decimal', 'Điều kiện phải lớn hơn 10', (value) => {
        if (!value) return false;
        const bigNumberValue = new BigNumber(value.replace(/\./g, ''));
        return bigNumberValue.isGreaterThan(10);
      }),

    tuNgay: yup.date().min(new Date(), 'Từ ngày phải là ngày trong tương lai').required('Từ ngày là bắt buộc'),

    denNgay: yup.date().min(yup.ref('tuNgay'), 'Đến ngày phải sau từ ngày').required('Đến ngày là bắt buộc')
  });

  useEffect(() => {
    debugger;
    fetchKhachHang();
  }, [currentPage, searchKeyWord, selectHangKhachHang, id]);

  const fetchKhachHang = async () => {
    setLoading(true);
    try {
      let result;
      if (searchKeyWord && selectHangKhachHang == '') {
        result = await getSearchKeyWord(currentPage - 1, searchKeyWord);
      } else if (selectHangKhachHang !== '' && searchKeyWord == '') {
        result = await getSelectHangKhachHang(currentPage - 1, selectHangKhachHang);
      } else if (selectHangKhachHang == '' && searchKeyWord == '') {
        result = await getAll(currentPage - 1);
      }
      setKhachHang(result.content);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDanhSachKhachHang();
    fetchCouponDetail(id);
  }, [id]);

  const getAllDanhSachKhachHang = async () => {
    try {
      const result = await getAll(currentPage - 1);
      setKhachHang(result.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigate = () => {
    navigate('/phieugiamgia/danhsachphieugiamgia');
  };

  useEffect(() => {
    console.log('Danh sách khách hàng đã chọn:', selectedKhachHang);
  }, []);

  useEffect(() => {
    if (selectedKhachHang.length > formik.values.soLuong) {
      formik.setFieldValue('soLuong', selectedKhachHang.length);
      setSnackbar({
        open: true,
        message: `Số lượng khách hàng đã chọn (${selectedKhachHang.length}) nhiều hơn số lượng phiếu đã nhập, số lượng phiếu đã được tự động điều chỉnh.`,
        severity: 'info'
      });
    }
  }, [selectedKhachHang]);

  const formik = useFormik({
    initialValues: {
      tenPhieu: '',
      giaTri: '',
      giaTriToiDa: '',
      soLuong: '',
      dieuKien: '',
      tuNgay: '',
      denNgay: '',
      kieu: '1'
    },
    validationSchema,
    onSubmit: async (values, { setErrors, validateForm }) => {
      const errors = await validateForm();
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      try {
        setIsSubmitting(true);
        if (values.kieu === '2' && selectedKhachHang.length > values.soLuong) {
          setSnackbar({
            open: true,
            message: `Số lượng khách hàng được chọn (${selectedKhachHang.length}) nhiều hơn số lượng phiếu (${values.soLuong}). Vui lòng tăng số lượng phiếu.`,
            severity: 'error'
          });
          return;
        }

        if (values.kieu === '2' && selectedKhachHang.length < 1) {
          setSnackbar({
            open: true,
            message: `Vui lòng chọn khách hàng cho phiếu giảm giá.`,
            severity: 'error'
          });
          return;
        }

        const giaTriGiam = new BigNumber(String(values.giaTri).replace(/\./g, ''));
        const giamToiDa =
          values.giaTriToiDa === '' || values.giaTriToiDa == null
            ? new BigNumber(0)
            : new BigNumber(String(values.giaTriToiDa).replace(/\./g, ''));

        if (values.giaTriToiDa == null || values.giaTriToiDa === '') {
          setErrors({ giaTriToiDa: 'Giá trị tối đa không được để trống.' });
          return;
        }

        if (currencyType === '$') {
          if (!giamToiDa.isEqualTo(giaTriGiam)) {
            setErrors({ giaTriToiDa: 'Giá trị tối đa phải bằng với giá trị giảm giá khi loại chiết khấu là tiền.' });
            return;
          }
        }

        if (currencyType === '%') {
          if (!giamToiDa.isLessThanOrEqualTo(2000000)) {
            setErrors({ giaTriToiDa: 'Giá trị giảm không được vượt quá 2,000,000.' });
            return;
          }
        }

        const data = {
          ten: values.tenPhieu,
          giaTriDonToiThieu: new BigNumber(String(values.dieuKien).replace(/\./g, '')).toFixed(),
          ngayBatDau: addSeconds(values.tuNgay),
          ngayHetHan: addSeconds(values.denNgay),
          loaiGiamGia: currencyType === '%' ? 1 : 2,
          giaTriGiamGia: new BigNumber(String(values.giaTri).replace(/\./g, '')).toFixed(), 
          giamToiDa: values.giaTriToiDa === '' ? null : new BigNumber(String(values.giaTriToiDa).replace(/\./g, '')).toFixed(),
          phamViApDung: values.kieu,
          soLuong: values.soLuong,
          listKhachHang: selectedKhachHang
        };
        let response;
        if (id) {
          response = await axios.put(`https://weblaptop-by-springboot-and-reactjs-aqjc.onrender.com/api/coupons/update/${id}`, data);
          setSnackbar({ open: true, message: 'Phiếu giảm giá đã được cập nhật thành công!', severity: 'success' });
        } else {
          response = await axios.post('https://weblaptop-by-springboot-and-reactjs-aqjc.onrender.com/api/coupons/add', data);
          setSnackbar({ open: true, message: 'Phiếu giảm giá đã được tạo thành công!', severity: 'success' });
        }
        setTimeout(() => {
          navigate('/phieugiamgia/danhsachphieugiamgia');
        }, 3000);
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Đã xảy ra lỗi!';
        const extractedMessage = errorMessage.split(':')[1].split(':')[0].trim();
        setSnackbar({
          open: true,
          message: `Lỗi: ${extractedMessage}`,
          severity: 'error'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const handleCurrencyChange = (type) => {
    setCurrencyType(type);
  };

  const handleSelectKhachHang = (id) => {
    setSelectedKhachHang((prevSelected) => {
      const newSelected =
        Array.isArray(prevSelected) && prevSelected.includes(id)
          ? prevSelected.filter((selectedId) => selectedId !== id)
          : [...(Array.isArray(prevSelected) ? prevSelected : []), id];

      console.log('Selected KhachHang within handler:', newSelected);
      return newSelected;
    });
  };

  const getStatus = (statusId) => {
    const statuses = [
      { id: 0, name: 'Chưa áp dụng', color: 'gray' },
      { id: 1, name: 'Đang áp dụng', color: 'green' },
      { id: 2, name: 'Đã hết hạn', color: 'red' },
      { id: 3, name: 'Đã hủy', color: 'orange' }
    ];

    return statuses.find((status) => status.id === statusId) || { name: 'Không xác định', color: 'default' };
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  function addSeconds(dateTimeStr) {
    if (!dateTimeStr) return '';
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
    setIsSubmitting(false);
  };

  const fetchCouponDetail = async () => {
    try {
      debugger;
      const response = await axios.get(`https://weblaptop-by-springboot-and-reactjs-aqjc.onrender.com/api/coupons/detail/${id}`);
      const coupon = response.data;
      formik.setValues({
        stat: coupon.data.trangThai,
        maPhieu: coupon.data.ma,
        tenPhieu: coupon.data.ten,
        giaTri: coupon.data.giaTriGiamGia,
        giaTriToiDa: coupon.data.giamToiDa,
        soLuong: coupon.data.soLuong,
        dieuKien: coupon.data.giaTriDonToiThieu,
        tuNgay: coupon.data.ngayBatDau,
        denNgay: coupon.data.ngayHetHan,
        kieu: coupon.data.phamViApDung.toString()
      });
      setCurrencyType(coupon.data.loaiGiamGia === 1 ? '%' : '$');
      const khachHangIds = coupon.data.khachHangPhieuGiamGias || [];
      setSelectedKhachHang(khachHangIds);
    } catch (error) {
      console.error('Error fetching coupon detail:', error);
    }
  };

  const isChiTietPage = location.pathname.includes('/phieugiamgia/chitietphieugiamgia');
  const isUpdatePage = location.pathname.includes('/phieugiamgia/cauhinhphieugiamgia/')
  const handleSubmitWithConfirm = () => {
    setConfirmOpen(true);
  };
  const handleConfirmClose = (isConfirmed) => {
    setConfirmOpen(false);
    if (isConfirmed) {
      formik.handleSubmit();
    }
  };

  function formatNumber(value) {
    const cleanedValue = String(value || '').replace(/\D/g, '');
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedKhachHang([]);
    } else {
      setSelectedKhachHang(khachHang.map((row) => row.id));
    }
    setSelectAll(!selectAll);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper style={{ padding: '16px', height: '100%' }}>
          {isChiTietPage && (
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography variant="h6">Trạng thái phiếu:</Typography>
              <Chip
                label={getStatus(formik.values.stat).name}
                sx={{ backgroundColor: getStatus(formik.values.stat).color, color: 'white', fontWeight: 'bold' }}
              />
            </Grid>
          )}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Mã Phiếu Giảm Giá"
              name="maPhieu"
              fullWidth={false}
              margin="normal"
              value={formik.values.maPhieu}
              onChange={formik.handleChange}
              error={formik.touched.maPhieu && Boolean(formik.errors.maPhieu)}
              helperText={formik.touched.maPhieu && formik.errors.maPhieu}
              InputProps={{
                readOnly: true,
                inputProps: { tabIndex: -1 },
                sx: {
                  pointerEvents: 'none',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)' 
                }
              }}
              InputLabelProps={{
                shrink: true
              }}
              sx={{ width: '200px' }}
            />

            <TextField
              label="Tên Phiếu Giảm Giá"
              name="tenPhieu"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: isChiTietPage || isUpdatePage
              }}
              value={formik.values.tenPhieu}
              onChange={formik.handleChange}
              error={formik.touched.tenPhieu && Boolean(formik.errors.tenPhieu)}
              helperText={formik.touched.tenPhieu && formik.errors.tenPhieu}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Giá trị giảm giá"
                  name="giaTri"
                  fullWidth
                  margin="normal"
                  value={formik.values.giaTri}
                  onChange={formik.handleChange}
                  error={formik.touched.giaTri && Boolean(formik.errors.giaTri)}
                  helperText={formik.touched.giaTri && formik.errors.giaTri}
                  InputProps={{
                    readOnly: isChiTietPage || isUpdatePage,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            if (!(isChiTietPage|| isUpdatePage)) {
                              handleCurrencyChange('%');
                            }
                          }}
                          color={currencyType === '%' ? 'primary' : 'default'}
                        >
                          <PercentIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            if (!(isChiTietPage|| isUpdatePage)) {
                              handleCurrencyChange('$');
                            }
                          }}
                          color={currencyType === '$' ? 'primary' : 'default'}
                        >
                          <AttachMoneyIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label=" Giá trị giảm giá tối đa"
                  name="giaTriToiDa"
                  fullWidth
                  margin="normal"
                  value={formatNumber(formik.values.giaTriToiDa)}
                  onChange={formik.handleChange}
                  error={formik.touched.giaTriToiDa && Boolean(formik.errors.giaTriToiDa)}
                  helperText={formik.touched.giaTriToiDa && formik.errors.giaTriToiDa}
                  InputProps={{
                    readOnly: isChiTietPage|| isUpdatePage,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography sx={{ color: 'orange', fontWeight: 'bold' }}>₫</Typography>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Số lượng"
                  value={formik.values.soLuong}
                  onChange={formik.handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: isChiTietPage || isUpdatePage
                  }}
                  margin="normal"
                  name="soLuong"
                  helperText={formik.touched.soLuong && formik.errors.soLuong ? formik.errors.soLuong : ''}
                  error={formik.touched.soLuong && Boolean(formik.errors.soLuong)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Giá trị đơn tối thiểu"
                  name="dieuKien"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: isChiTietPage || isUpdatePage
                  }}
                  value={formatNumber(formik.values.dieuKien)}
                  onChange={formik.handleChange}
                  error={formik.touched.dieuKien && Boolean(formik.errors.dieuKien)}
                  helperText={formik.touched.dieuKien && formik.errors.dieuKien}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Từ ngày"
                  name="tuNgay"
                  type="datetime-local"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: isChiTietPage
                  }}
                  value={formik.values.tuNgay}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true
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
                  InputProps={{
                    readOnly: isChiTietPage
                  }}
                  value={formik.values.denNgay}
                  InputLabelProps={{
                    shrink: true
                  }}
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
                  onChange={(e) => {
                    if (!(isChiTietPage|| isUpdatePage)) {
                      formik.handleChange(e);
                    }
                  }}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Công khai" />
                  <FormControlLabel value="2" control={<Radio />} label="Cá nhân hóa" />
                </RadioGroup>
              </Grid>
            </Grid>
            {!isChiTietPage && (
              <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmitWithConfirm} disabled={isSubmitting}>
                Lưu
              </Button>
            )}
          </form>
        </Paper>
      </Grid>

      {formik.values.kieu === '2' && (
        <Grid item xs={6}>
          <Paper style={{ padding: '16px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Chọn khách hàng
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
              p={2}
              sx={{
                backgroundColor: 'white',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                width: '100%'
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <FormLabel
                      component="legend"
                      sx={{
                        mb: 1,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        color: 'text.primary'
                      }}
                    >
                      Tìm kiếm
                    </FormLabel>
                    <TextField
                      value={searchKeyWord}
                      onChange={(e) => setSearchKeyWord(e.target.value)}
                      variant="outlined"
                      placeholder="Nhập tên khách hàng"
                      fullWidth
                      InputProps={{
                        style: {
                          borderRadius: '8px'
                        }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

                <Fab
                  color="primary"
                  aria-label="back"
                  sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16
                  }}
                  onClick={handleNavigate}
                >
                  <ArrowBackIcon />
                </Fab>
              </Grid>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedKhachHang.length > 0 && selectedKhachHang.length < khachHang.length}
                        checked={selectAll}
                        onChange={handleSelectAll}
                        disabled={isChiTietPage || formik.values.kieu === '1' || isUpdatePage}
                      />
                    </TableCell>
                    <TableCell>Tên khách hàng</TableCell>
                    <TableCell>Số điện thoại</TableCell>
                    <TableCell>Ngày sinh</TableCell>
                    {/* <TableCell>Hạng khách hàng</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {khachHang.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={Array.isArray(selectedKhachHang) && selectedKhachHang.includes(row.id)}
                          onChange={() => handleSelectKhachHang(row.id)}
                          disabled={isChiTietPage || formik.values.kieu === '1'|| isUpdatePage}
                        />
                      </TableCell>
                      <TableCell>{row.ten}</TableCell>
                      <TableCell>{row.sdt}</TableCell>
                      <TableCell>{formatDate(row.ngaySinh)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="fixed" justifyContent="center" alignItems="center" marginTop={2}>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
            </Box>
          </Paper>
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={confirmOpen} onClose={() => handleConfirmClose(false)}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn lưu thông tin phiếu giảm giá này?</DialogContentText>
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
