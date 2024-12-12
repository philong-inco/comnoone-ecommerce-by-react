import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Fab,
  Select,
  Divider,
  FormControl,
  Chip,
  Snackbar,
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
  Button,
  InputAdornment,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BigNumber from 'bignumber.js';
import { getDataProducts, getDataProductsDetail, themDotGiamGia, updateDotGiamGia } from 'services/admin/coupons/dotGiamGiaService';
function DotGiamGiaConfiguration() {
  const [sanPhamChiTiet, setSanPhamChiTiet] = useState({});
  const [sanPhamList, setSanPhamList] = useState([]);
  const [selectedSanPham, setSelectedSanPham] = useState([]);
  const [selectedSanPhamChiTiet, setSelectedSanPhamChiTiet] = useState({});
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChiTietPage, setIsChiTietPage] = useState(false);
  const [isUpdatePage, setIsUpdatePage] = useState(false);
  const [currencyType, setCurrencyType] = useState('%');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    loadData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (location.pathname.includes('/dotgiamgia/cauhinhdotgiamgia/view')) {
      setIsChiTietPage(true);
    } else {
      setIsChiTietPage(false);
    }
  }, [location, id]);

  useEffect(() => {
    if (location.pathname.includes('/dotgiamgia/cauhinhdotgiamgia/edit')) {
      setIsUpdatePage(true);
    } else {
      setIsUpdatePage(false);
    }
  }, [location, id]);

  useEffect(() => {
    const fetchSanPhamChiTiet = async () => {
      try {
        const fetchedSanPhamChiTiet = await Promise.all(
          selectedSanPham.map(async (sanPhamId) => {
            const response = await getDataProductsDetail(sanPhamId);
            return { sanPhamId, productDetails: response.data };
          })
        );
        setSanPhamChiTiet((prevState) => {
          const updatedState = { ...prevState };
          fetchedSanPhamChiTiet.forEach(({ sanPhamId, productDetails }) => {
            updatedState[sanPhamId] = productDetails;
          });
          return updatedState;
        });
      } catch (error) {
        setSnackbar({ open: true, message: 'không thể tìm được sản phẩm chi tiết', severity: 'error' });
      }
    };

    if (selectedSanPham.length > 0) {
      fetchSanPhamChiTiet();
    }
  }, [selectedSanPham]);

  useEffect(() => {
    fetchDggDetail(id);
    loadData(currentPage, pageSize);
  }, [id]);

  const loadData = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await getDataProducts(page - 1, pageSize);
      setSanPhamList(response.data || []);
      setTotalPages(response.totalPage || 1);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
      setSnackbar({ open: true, message: 'Lỗi khi tải dữ liệu sản phẩm', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleNavigate = () => {
    navigate('/dotgiamgia/danhsachdotgiamgia');
  };

  const handleSelectSanPham = async (sanPhamId) => {
    setSelectedSanPham((prev) => {
      const newSelected = prev.includes(sanPhamId) ? prev.filter((id) => id !== sanPhamId) : [...prev, sanPhamId];
      if (!sanPhamChiTiet[sanPhamId]) {
        (async () => {
          try {
            const response = await getDataProductsDetail(sanPhamId);
            const productDetails = response.data;
            setSanPhamChiTiet((prev) => ({
              ...prev,
              [sanPhamId]: productDetails
            }));
          } catch (error) {
            setSnackbar({ open: true, message: 'Lỗi khi tải sản phẩm chi tiết', severity: 'error' });
          }
        })();
      }

      return newSelected;
    });
  };

  const handleSelectSanPhamChiTiet = (sanPhamId, sanPhamChiTietItem) => {
    setSelectedSanPhamChiTiet((prevState) => {
      const currentItems = prevState[sanPhamId] || [];

      if (currentItems.includes(sanPhamChiTietItem.id)) {
        return {
          ...prevState,
          [sanPhamId]: currentItems.filter((id) => id !== sanPhamChiTietItem.id)
        };
      } else {
        return {
          ...prevState,
          [sanPhamId]: [...currentItems, sanPhamChiTietItem.id]
        };
      }
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
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

  const formik = useFormik({
    initialValues: {
      tenPhieu: '',
      giaTri: '',
      giaTriToiDa: '',
      tuNgay: '',
      denNgay: '',
      loaiChietKhau: '1',
      moTa: '',
    },
    validationSchema: yup.object({
      tenPhieu: yup.string().required('Tên đợt giảm giá là bắt buộc'),
      moTa: yup
      .string()
      .max(256, "Mô tả không được vượt quá 256 ký tự"),
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
              return context.createError({ message: 'Giá trị không được vượt quá 2,000,000' });
            }
          } else if (currencyType === '$') {
            if (!bigNumberValue.isGreaterThan(0)) {
              return context.createError({ message: 'Giá trị phải lớn hơn 0$' });
            }
            if (!bigNumberValue.isLessThanOrEqualTo(2000000)) {
              return context.createError({ message: 'Giá trị không được vượt quá 2,000,000' });
            }
          } else {
            return context.createError({ message: 'Loại phiếu không hợp lệ' });
          }
          return true;
        }),

      giaTriToiDa: yup
        .string()
        .required('Giá trị tối đa không được để trống')
        .test('is-correct-value', 'Giá trị tối đa không hợp lệ', function (value) {
          const { giaTri } = this.parent;
          const bigNumberGiaTri = new BigNumber(giaTri.replace(/\./g, ''));
          const bigNumberGiaTriToiDa = value ? new BigNumber(value.replace(/\./g, '')) : null;

          if (currencyType === '$') {
            if (!bigNumberGiaTriToiDa || !bigNumberGiaTriToiDa.isEqualTo(bigNumberGiaTri)) {
              return this.createError({ message: 'Giá trị tối đa phải bằng với giá trị giảm giá khi loại chiết khấu là tiền.' });
            }
          }
          return true;
        }),

      tuNgay: yup.date().required('Ngày bắt đầu là bắt buộc').min(new Date(), 'Ngày bắt đầu phải từ hiện tại trở đi'),

      denNgay: yup
        .date()
        .required('Ngày kết thúc là bắt buộc')
        .when('tuNgay', (tuNgay, schema) => {
          return schema.min(tuNgay, 'Ngày kết thúc phải sau ngày bắt đầu');
        })

        
    }),

    onSubmit: async (values, { setErrors, validateForm }) => {
      const errors = await validateForm();
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      try {
        setIsSubmitting(true);
        const listSanPhamChiTiet = Object.values(selectedSanPhamChiTiet).flat();
        const giaTriGiam = new BigNumber(String(values.giaTri).replace(/\./g, ''));
        const giamToiDa = values.giaTriToiDa === '' ? new BigNumber(0) : new BigNumber(String(values.giaTriToiDa).replace(/\./g, ''));

        if (currencyType === '$') {
          if (!giamToiDa.isEqualTo(giaTriGiam)) {
            setErrors({ giaTriToiDa: 'Giá trị tối đa phải bằng với giá trị giảm giá khi loại chiết khấu là tiền.' });
            return;
          }
        }

        if (currencyType === '%') {
          if (!giamToiDa.isLessThanOrEqualTo(2000000)) {
            setErrors({ giaTriToiDa: 'Giá trị giảm không được vượt quá 2,000,000' });
            return;
          }
        }
        
        const data = {
          ten: values.tenPhieu,
          moTa: values.moTa,
          giaTriGiam: values.giaTri,
          giamToiDa: values.giaTriToiDa === '' ? null : new BigNumber(String(values.giaTriToiDa).replace(/\./g, '')).toFixed(),
          loaiChietKhau: currencyType === '%' ? 1 : 2,
          thoiGianBatDau: addSeconds(values.tuNgay),
          thoiGianKetThuc: addSeconds(values.denNgay),
          listSanPhamChiTiet: listSanPhamChiTiet
        };

        let response;
        if (id) {
          response = await updateDotGiamGia(id, data);
          setSnackbar({ open: true, message: 'Đợt giảm giá đã được cập nhật thành công!', severity: 'success' });
        } else {
          response = await themDotGiamGia(data);
          setSnackbar({ open: true, message: 'Đợt giảm giá đã được tạo thành công!', severity: 'success' });
        }

        setTimeout(() => {
          navigate('/dotgiamgia/danhsachdotgiamgia');
        }, 3000);
      } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
    
            if (status === 401) {
                setSnackbar({ open: true, message: 'Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục!', severity: 'warning' });
            } else if (status === 403) {
                setSnackbar({ open: true, message: 'Bạn không có quyền truy cập vào tài nguyên này!', severity: 'error' });
            } else if (data && data.errors) {
                setErrors(data.errors);
            } else {
                setSnackbar({ open: true, message: 'Đã xảy ra lỗi!', severity: 'error' });
            }
        } else {
            console.error(error);
            setSnackbar({ open: true, message: 'Đã xảy ra lỗi!', severity: 'error' });
        }
    } finally {
        setIsSubmitting(false);
    }
    
    }
  });

  const handleConfirmClose = (isConfirmed) => {
    setConfirmOpen(false);
    if (isConfirmed) {
      formik.handleSubmit();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
    setIsSubmitting(false);
  };
  const handleSubmitWithConfirm = () => {
    setConfirmOpen(true);
  };

  function formatNumber(value) {
    const cleanedValue = String(value || '').replace(/\D/g, '');
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const fetchDggDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/discounts/${id}`);
      const data = response.data;

      formik.setValues({
        stat: data.trangThai,
        maPhieu: data.ma,
        tenPhieu: data.ten,
        moTa: data.moTa,
        giaTri: data.giaTriGiam,
        tuNgay: data.thoiGianBatDau,
        denNgay: data.thoiGianKetthuc,
        giaTriToiDa: data.giamToiDa
      });

      setCurrencyType(data.loaiChietKhau === 1 ? '%' : '$');

      const sanPhamChiTietIds = data.spctDotGiamGias || [];
      const sanPhamChiTietData = await Promise.all(
        sanPhamChiTietIds.map(async (idSanPhamChiTiet) => {
          const spctResponse = await axios.get(
            `http://localhost:8080/api/san-pham-chi-tiet/get-by-productdetail-id?idProductDetail=${idSanPhamChiTiet}`
          );
          return spctResponse.data.data;
        })
      );

      const sanPhamIds = sanPhamChiTietData
        .map((item) => parseInt(item.sanPhamId))
        .filter((value, index, self) => !isNaN(value) && self.indexOf(value) === index);

      const selectedSanPhamChiTietData = sanPhamChiTietData.reduce((acc, item) => {
        if (!acc[item.sanPhamId]) {
          acc[item.sanPhamId] = [];
        }
        acc[item.sanPhamId].push(item.id);
        return acc;
      }, {});
      setSelectedSanPham(sanPhamIds);
      setSelectedSanPhamChiTiet(selectedSanPhamChiTietData);
    } catch (error) {
      console.error('Error fetching DGG detail:', error);
    }
  };

  const [typeOfFilter, setTypeOfFilter] = useState('0');

  const handleTextFieldSearch = (event) => {
    const keyword = event.target.value.toString().trim();
    if (typeOfFilter === '0') {
      setFilter((prev) => ({
        ...prev,
        tenSanPham: keyword,
        ma: ''
      }));
    } else if (typeOfFilter === '1') {
      setFilter((prev) => ({
        ...prev,
        ma: keyword,
        tenSanPham: ''
      }));
    }
  };

  const changeTypeOfFilter = (e) => {
    const type = e.target.value;
    setTypeOfFilter(type);
    if (type === '0') {
      setFilter((prev) => ({
        ...prev,
        tenSanPham: filter.ma,
        ma: ''
      }));
    } else if (type === '1') {
      setFilter((prev) => ({
        ...prev,
        ma: filter.tenSanPham,
        tenSanPham: ''
      }));
    }
  };

  const [resetFilter, setResetFilter] = useState(0);

  const cleanFilter = () => {
    setTypeOfFilter('0');
    setFilter((prev) => ({
      ...prev,
      tenSanPham: '',
      ma: ''
    }));
    setResetFilter((prev) => prev + 1);
  };

  const urlFindFilter = 'http://localhost:8080/api/san-pham/find/filter-id?';
  const [filter, setFilter] = useState({
    page: 0,
    size: '5',
    tenSanPham: '',
    ma: '',
    trangThai: 1
  });

  useEffect(() => {
    loadProducts();
  }, [filter]);
  const loadProducts = async () => {
    const queryString = Object.entries(filter)
      .filter(([key, value]) => value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const urlQuery = urlFindFilter + queryString;
    const result = await axios.get(urlQuery);
    setSanPhamList(result.data.data);
    setTotalElement(parseInt(result.data.totalElement));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper style={{ padding: '16px', height: '100%' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Mã Đợt Giảm Giá"
              name="maPhieu"
              fullWidth
              margin="normal"
              value={formik.values.maPhieu}
              onChange={formik.handleChange}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Tên Đợt Giảm Giá"
              name="tenPhieu"
              fullWidth
              margin="normal"
              value={formik.values.tenPhieu}
              onChange={formik.handleChange}
              error={formik.touched.tenPhieu && Boolean(formik.errors.tenPhieu)}
              helperText={formik.touched.tenPhieu && formik.errors.tenPhieu}
            />
            <TextField
              label="Giá trị phiếu"
              name="giaTri"
              fullWidth
              margin="normal"
              value={formik.values.giaTri}
              onChange={formik.handleChange}
              error={formik.touched.giaTri && Boolean(formik.errors.giaTri)}
              helperText={formik.touched.giaTri && formik.errors.giaTri}
              InputProps={{
                readOnly: isChiTietPage|| isUpdatePage,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => !isChiTietPage && setCurrencyType('%')} color={currencyType === '%' ? 'primary' : 'default'}>
                      <PercentIcon />
                    </IconButton>
                    <IconButton onClick={() => !isChiTietPage && setCurrencyType('$')} color={currencyType === '$' ? 'primary' : 'default'}>
                      <AttachMoneyIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
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
                readOnly: isChiTietPage || isUpdatePage,
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography sx={{ color: 'orange', fontWeight: 'bold' }}>₫</Typography>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Từ ngày"
              name="tuNgay"
              type="datetime-local"
              fullWidth
              margin="normal"
              InputProps={{ readOnly: isChiTietPage }}
              value={formik.values.tuNgay}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              error={formik.touched.tuNgay && Boolean(formik.errors.tuNgay)}
              helperText={formik.touched.tuNgay && formik.errors.tuNgay}
            />
            <TextField
              label="Đến ngày"
              name="denNgay"
              type="datetime-local"
              fullWidth
              margin="normal"
              InputProps={{ readOnly: isChiTietPage }}
              value={formik.values.denNgay}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              error={formik.touched.denNgay && Boolean(formik.errors.denNgay)}
              helperText={formik.touched.denNgay && formik.errors.denNgay}
            />

            <TextField
              label="Mô tả đợt giảm giá"
              name="moTa"
              fullWidth
              margin="normal"
              value={formik.values.moTa}
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              error={formik.touched.moTa && Boolean(formik.errors.moTa)}
              helperText={formik.touched.moTa && formik.errors.moTa}
              sx={{ fontFamily: 'Arial, sans-serif' }} // Áp dụng font Arial
            />

            {!isChiTietPage && (
              <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmitWithConfirm}>
                Lưu
              </Button>
            )}
          </form>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        {/* Danh sách sản phẩm */}
        <Paper style={{ padding: '16px', height: '100%' }}>
          <Typography variant="h6">Danh sách sản phẩm</Typography>
          <Divider />

          <div style={{ display: 'flex', padding: 10, paddingTop: 20 }}>
            <TextField
              sx={{ maxHeight: '10px' }}
              color="secondary"
              onChange={handleTextFieldSearch}
              id="outlined-basic"
              label="Nhập từ khóa"
              variant="outlined"
            />

            <div style={{ marginLeft: 10, display: 'flex', alignItems: 'center' }}>
              <FormControl>
                {/* <FormLabel id="demo-controlled-radio-buttons-group">Tìm theo:</FormLabel> */}
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={typeOfFilter}
                  row
                  onChange={changeTypeOfFilter}
                >
                  <FormControlLabel value="0" control={<Radio color="secondary" size="small" />} label="Tên" />
                  <FormControlLabel value="1" control={<Radio color="secondary" size="small" />} label="Mã" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          {loading ? (
            <Typography>Đang tải dữ liệu...</Typography>
          ) : (
            <TableContainer component={Paper} style={{ marginTop: '16px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>Mã sản phẩm</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Tên sản phẩm</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Trạng Thái</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Chọn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sanPhamList.length > 0 ? (
                    sanPhamList.map((sanPham) => (
                      <TableRow key={sanPham.id}>
                        <TableCell sx={{ textAlign: 'center' }}>{sanPham.ma}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{sanPham.ten}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Box
                            sx={{
                              backgroundColor: sanPham.trangThai === 1 ? '#4caf50' : '#f44336',
                              color: '#ffffff',
                              padding: '6px 12px',
                              borderRadius: '12px',
                              textAlign: 'center',
                              fontWeight: 'bold'
                            }}
                          >
                            {sanPham.trangThai === 1 ? 'Hoạt động' : 'Đã tắt'}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Checkbox
                            checked={selectedSanPham.includes(sanPham.id)}
                            onChange={() => handleSelectSanPham(sanPham.id)}
                            disabled={isChiTietPage || isUpdatePage}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography variant="body2" color="textSecondary" align="center">
                          Không có sản phẩm nào
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Box display="fixed" justifyContent="center" alignItems="center" marginTop={2}>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
          </Box>
        </Paper>

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
          <ArrowBackIcon /> {/* Icon quay lại */}
        </Fab>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          {selectedSanPham.map((sanPhamId) => {
            const sanPham = sanPhamList.find((sp) => sp.id === sanPhamId);
            return <Tab key={sanPhamId} label={sanPham ? `${sanPham.ten}` : `Sản phẩm ${sanPhamId}`} />;
          })}
        </Tabs>
        {selectedSanPham.map(
          (sanPhamId) =>
            tabIndex === selectedSanPham.indexOf(sanPhamId) && (
              <Box key={sanPhamId} sx={{ marginTop: 2 }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Chọn</TableCell>
                        <TableCell>Giá bán</TableCell>
                        <TableCell>Bàn phím</TableCell>
                        <TableCell>CPU</TableCell>
                        <TableCell>Hệ điều hành</TableCell>
                        <TableCell>Màn hình</TableCell>
                        <TableCell>Màu sắc</TableCell>
                        <TableCell>RAM</TableCell>
                        <TableCell>VGA</TableCell>
                        <TableCell>Webcam</TableCell>
                        <TableCell>Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sanPhamChiTiet[sanPhamId]?.map((sanPhamChiTietItem) => (
                        <TableRow key={sanPhamChiTietItem.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedSanPhamChiTiet[sanPhamId]?.includes(sanPhamChiTietItem.id) || false}
                              onChange={() => handleSelectSanPhamChiTiet(sanPhamId, sanPhamChiTietItem)}
                              disabled={isChiTietPage || isUpdatePage}
                            />
                          </TableCell>
                          <TableCell>{sanPhamChiTietItem.giaBan}</TableCell>
                          <TableCell>{sanPhamChiTietItem.banPhim}</TableCell>
                          <TableCell>{sanPhamChiTietItem.cpu}</TableCell>
                          <TableCell>{sanPhamChiTietItem.heDieuHanh}</TableCell>
                          <TableCell>{sanPhamChiTietItem.manHinh}</TableCell>
                          <TableCell>{sanPhamChiTietItem.mauSac}</TableCell>
                          <TableCell>{sanPhamChiTietItem.ram}</TableCell>
                          <TableCell>{sanPhamChiTietItem.vga}</TableCell>
                          <TableCell>{sanPhamChiTietItem.webcam}</TableCell>
                          <TableCell>
                            {' '}
                            <Box
                              sx={{
                                display: 'inline-block',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                backgroundColor: sanPhamChiTietItem.trangThai === 0 ? 'error.light' : 'success.light',
                                color: sanPhamChiTietItem.trangThai === 0 ? 'error.dark' : 'success.dark',
                                fontWeight: 'bold'
                              }}
                            >
                              {sanPhamChiTietItem.trangThai === 0 ? 'Không hoạt động' : 'Hoạt động'}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )
        )}
      </Box>

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

export default DotGiamGiaConfiguration;
