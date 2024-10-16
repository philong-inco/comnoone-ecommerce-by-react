import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Checkbox,
  ListItemText,
  Fab,
  FormHelperText,
  Snackbar,
  FormLabel,
  RadioGroup,
  Alert,
  Radio,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
const schema = Yup.object().shape({
  ten: Yup.string().required('Họ và tên không được để trống').max(255, 'Tên không được vượt quá 255 ký tự').typeError('Tên xảy ra lỗi !'),
  sdt: Yup.string()
    .required('Số điện thoại không được để trống')
    .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
  email: Yup.string()
    .required('Email không được để trống')
    .email('Email không đúng định dạng')
    .max(255, 'Email không được vượt quá 255 ký tự'),
  ngay_sinh: Yup.date().required('Ngày sinh không được để trống').typeError('Ngày sinh không hợp lệ'),
  gioi_tinh: Yup.number().required('Giới tính không được để trống').oneOf([0, 1], 'Giới tính phải là 0 hoặc 1'),
  hinh_anh: Yup.string().nullable(),
  dia_chi: Yup.string()
    .required("Địa chỉ không được để trống")
    .max(256, "Địa chỉ không được vượt quá 256 ký tự"),
});

function NhanVienConfiguration() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm({
    resolver: yupResolver(schema)
  });
  const [imageUrl, setImageUrl] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [isProvincesLoaded, setIsProvincesLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = (data) => {
    setFormData(data);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmSubmit = async () => {
    console.log('Dữ liệu form:', formData);
    setOpenDialog(false);
    await onSubmit(formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchProvinces();
      } catch (error) {
        setError('Failed to fetch initial data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isProvincesLoaded && id) {
      fetchNhanVien(id);
    }
  }, [isProvincesLoaded, id]);

  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      const firstErrorMessage = errors[firstErrorKey]?.message || 'Đã xảy ra lỗi';
      setSnackbarMessage(firstErrorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [errors]);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
      if (response.data.data && Array.isArray(response.data.data)) {
        setProvinces(response.data.data);
        setIsProvincesLoaded(true);
      } else {
        setError('Invalid or empty data received from provinces API');
      }
    } catch (error) {
      setError('Failed to fetch provinces');
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
      const formattedData = response.data.data.map((district) => ({
        id: district.id,
        ten: district.name
      }));
      setDistricts(formattedData);
    } catch (error) {
      setError('Failed to fetch districts');
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
      const formattedData = response.data.data.map((ward) => ({
        id: ward.id,
        ten: ward.name
      }));
      setWards(formattedData);
    } catch (error) {
      setError('Failed to fetch wards');
    }
  };

  function toNonAccentVietnamese(str) {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, 'A');
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, 'E');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, 'I');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, 'O');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, 'U');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, 'Y');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  const fetchNhanVien = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/nhan_vien/${id}`);
      const nhanVienData = response.data;
      const gioiTinhString = nhanVienData.gioiTinh !== undefined ? nhanVienData.gioiTinh.toString() : '1';
      console.log('Giới tính sau khi convert: ', gioiTinhString);
      setValue('gioi_tinh', gioiTinhString);
      setValue('ten', nhanVienData.ten);
      setValue('sdt', nhanVienData.sdt);
      setValue('email', nhanVienData.email);
      setValue('tai_khoan_ngan_hang', nhanVienData.taiKhoanNganHang);
      setValue('hinh_anh', nhanVienData.hinhAnh);

      if (nhanVienData.hinhAnh) {
        setImageUrl(nhanVienData.hinhAnh);
      } else {
        setImageUrl('https://res.cloudinary.com/daljc2ktr/image/upload/v1722592745/employee_images/zbphcixipri1c8rcdeov.jpg');
      }
      setValue('ngay_sinh', nhanVienData.ngaySinh.split('T')[0]);

      if (nhanVienData.diaChi) {
        const addressParts = nhanVienData.diaChi.split(',').map((part) => part.trim());
        if (addressParts.length >= 4) {
          const dia_chi_chi_tiet = addressParts[0];
          setValue('dia_chi', dia_chi_chi_tiet);

          const selectedProvinceName = addressParts[3].trim().toLowerCase();
          const selectedDistrictName = addressParts[2].trim().toLowerCase();
          const selectedWardName = addressParts[1].trim().toLowerCase();

          let selectedProvince = provinces.find(
            (province) => province.name_en.trim().toLowerCase() == toNonAccentVietnamese(selectedProvinceName)
          );
          if (!selectedProvince) {
            setError(`Province not found: ${selectedProvinceName}`);
            return;
          }
          if (selectedProvince) {
            setSelectedProvince(selectedProvince.id);
            await fetchDistricts(selectedProvince.id);
          }
          let districtData = [];

          try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince.id}.htm`);
            const formattedData = response.data.data.map((district) => ({
              id: district.id,
              ten: district.name
            }));
            districtData = formattedData;
          } catch (error) {
            setError('Failed to fetch districts');
          }

          const selectedDistrict = districtData.find((district) => district.ten.trim().toLowerCase() === selectedDistrictName);

          if (selectedDistrict) {
            setSelectedDistrict(selectedDistrict.id);
          }
          let wardData = [];
          try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict.id}.htm`);
            const formattedData = response.data.data.map((ward) => ({
              id: ward.id,
              ten: ward.name
            }));
            wardData = formattedData;
          } catch (error) {
            setError('Failed to fetch wards');
          }

          const selectedWard = wardData.find((ward) => ward.ten.trim().toLowerCase() === selectedWardName);
          if (selectedWard) {
            setSelectedWard(selectedWard.id);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setError('Failed to fetch employee details');
    }
  };

  const openCloudinaryWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'daljc2ktr',
        uploadPreset: 'ovuxjxsx',
        sources: ['local', 'url', 'camera', 'google_photos', 'facebook', 'dropbox', 'instagram'],
        multiple: false,
        cropping: true,
        folder: 'employee_images'
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setImageUrl(result.info.secure_url);
          setValue('hinh_anh', result.info.secure_url);
        }
      }
    );
  };
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let formData = {};
      formData.ten = data.ten;
      formData.sdt = data.sdt;
      formData.email = data.email;
      formData.tai_khoan_ngan_hang = data.tai_khoan_ngan_hang;
      ``;
      const today = new Date();
      const birthDate = new Date(data.ngay_sinh);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        setSnackbarMessage('Tuổi phải lớn hơn hoặc bằng 18!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }
      formData.ngay_sinh = new Date(data.ngay_sinh).toISOString();
      formData.gioi_tinh = data.gioi_tinh;
      formData.hinh_anh = data.hinh_anh;
      const diaChi = `${data.dia_chi}, ${selectedWard ? wards.find((ward) => ward.id === selectedWard).ten : ''}, ${selectedDistrict ? districts.find((district) => district.id === selectedDistrict).ten : ''}, ${selectedProvince ? provinces.find((province) => province.id === selectedProvince).name : ''}`;
      formData.dia_chi = diaChi;
      formData.list_vai_tro = ['Nhân Viên'];

      await schema.validate(formData);
      const url = id ? `http://localhost:8080/api/nhan_vien/update/${id}` : 'http://localhost:8080/api/nhan_vien/create';
      const method = id ? 'put' : 'post';

      const response = await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (id) {
        setSnackbarMessage('Cập nhật nhân viên thành công!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setTimeout(() => {
          handleNavigate();
        }, 1000);
      } else {
        setSnackbarMessage('Thêm nhân viên thành công!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setTimeout(() => {
          handleNavigate();
        }, 1000);
      }
      console.log(response);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.error;
      const errorDetails = errorMessage.split(':').pop().trim();
      setSnackbarMessage(errorDetails);
    } else if (error.response && error.response.data && error.response.data.error) {
      setSnackbarMessage(error.response.data.error);
    } else if (error.message) {
      setSnackbarMessage(error.message);
    } else {
      setSnackbarMessage('Có lỗi xảy ra khi xử lý yêu cầu!');
    }
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleNavigate = () => {
    navigate('/nhanvien/danhsachnhanvien');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Typography variant="h1" gutterBottom style={{ textAlign: 'center', marginBottom: '5%' }}>
        {id ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
      </Typography>
      <form onSubmit={handleSubmit(handleOpenDialog)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center" height="100%">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Ảnh đại diện"
                  style={{
                    width: '250px',
                    height: '250px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={openCloudinaryWidget}
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/daljc2ktr/image/upload/v1722592745/employee_images/zbphcixipri1c8rcdeov.jpg"
                  alt=""
                  style={{
                    width: '250px',
                    height: '250px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={openCloudinaryWidget}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="ten"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      error={!!errors.ten}
                      helperText={errors.ten?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="sdt"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      error={!!errors.sdt}
                      helperText={errors.sdt?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="ngay_sinh"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="date"
                      fullWidth
                      label="Ngày sinh"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      error={!!errors.ngay_sinh}
                      helperText={errors.ngay_sinh?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl component="fieldset" error={!!errors.gioi_tinh}>
                  <FormLabel component="legend">Giới tính *</FormLabel>
                  <Controller
                    name="gioi_tinh"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        value={field.value || ''} // Giá trị từ form
                        onChange={(e) => field.onChange(e.target.value)} // Cập nhật giá trị khi thay đổi
                        row
                      >
                        <FormControlLabel value="1" control={<Radio />} label="Nam" />
                        <FormControlLabel value="0" control={<Radio />} label="Nữ" />
                      </RadioGroup>
                    )}
                  />
                  {errors.gioi_tinh && <FormHelperText>{errors.gioi_tinh.message}</FormHelperText>}
                </FormControl>
              </Grid>
              {/* Địa chỉ */}
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Tỉnh/Thành Phố *</InputLabel>
                      <Controller
                        name="province"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                            {provinces.map((province) => (
                              <MenuItem key={province.id} value={province.id}>
                                {province.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Quận/Huyện *</InputLabel>
                      <Controller
                        name="district"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                            <MenuItem value="">Chọn quận/huyện</MenuItem>
                            {districts.map((district) => (
                              <MenuItem key={district.id} value={district.id}>
                                {district.ten}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Phường/Xã *</InputLabel>
                      <Controller
                        name="ward"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                            <MenuItem value="">Chọn phường/xã</MenuItem>
                            {wards.map((ward) => (
                              <MenuItem key={ward.id} value={ward.id}>
                                {ward.ten}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* Địa chỉ chi tiết */}
              <Grid item xs={12}>
                <Controller
                  name="dia_chi"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Địa chỉ"
                      multiline
                      rows={4}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.dia_chi}
                      helperText={errors.dia_chi?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Nút Lưu */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary" style={{ width: '150px' }}>
                {loading ? <CircularProgress size={24} /> : 'Lưu'}
              </Button>
            </Box>
            {error && <FormHelperText error>{error}</FormHelperText>}
          </Grid>
        </Grid>
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
      </form>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{formData.id ? 'Xác nhận cập nhật nhân viên' : 'Xác nhận thêm nhân viên'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {formData.id ? 'Bạn có chắc chắn muốn cập nhật thông tin nhân viên này?' : 'Bạn có chắc chắn muốn thêm nhân viên này?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}

export default NhanVienConfiguration;
