import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Snackbar,
  Alert,
  Modal,
  Paper,
  IconButton,
  FormLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const validationSchema = Yup.object().shape({
  ten: Yup.string()
    .max(50, 'Tên không được vượt quá 50 ký tự')
    .required('Tên không được để trống'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
  sdt: Yup.string()
    .matches(/^\+?[0-9. ()-]{7,25}$/, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại không được để trống'),
  ngay_sinh: Yup.date()
    .max(new Date(), 'Ngày sinh phải là quá khứ hoặc hiện tại')
    .required('Ngày sinh không được để trống'),
  gioi_tinh: Yup.number().required('Giới tính không được để trống'),
  hinhAnh: Yup.string(),
});

const addressValidationSchema = Yup.object().shape({
  ten_nguoi_nhan: Yup.string().required('Tên người nhận không được để trống'),
  sdt_nguoi_nhan: Yup.string().required('Số điện thoại người nhận không được để trống'),
  email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  dia_chi_nhan_hang: Yup.string().required('Địa chỉ nhận hàng không được để trống'),
  province: Yup.string().required('Tỉnh thành không được để trống'),
  district: Yup.string().required('Quận huyện không được để trống'),
  ward: Yup.string().required('Phường xã không được để trống'),
});

function KhachHangAddress() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      addresses: [],
    },
  });

  const { register: registerAddress, handleSubmit: handleSubmitAddress, control: controlAddress, formState: { errors: addressErrors }, setValue: setValueAddress, reset: resetAddress } = useForm({
    resolver: yupResolver(addressValidationSchema),
    defaultValues: {
      ten_nguoi_nhan: '',
      sdt_nguoi_nhan: '',
      email: '',
      dia_chi_nhan_hang: '',
      province: '',
      district: '',
      ward: '',
    },
  });

  const [imageUrl, setImageUrl] = useState('');
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
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchProvinces, setSearchProvinces] = useState('');
  const [searchWards, setSearchWards] = useState('');
  useEffect(() => {
    if (isProvincesLoaded && id) {
      fetchKhachHangInfo(id);
    }
  }, [isProvincesLoaded, id]);

  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict);
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

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
      const formattedData = response.data.data.map(district => ({
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
      const formattedData = response.data.data.map(ward => ({
        id: ward.id,
        ten: ward.name
      }));
      setWards(formattedData);
    } catch (error) {
      setError('Failed to fetch wards');
    }
  };

  const fetchKhachHangInfo = async (id) => {
    try {
      debugger;
      const response = await axios.get(`http://localhost:8080/api/khachhang/searchbyid/${id}`);
      const khachHangData = response.data;
      setValue('ten', khachHangData.ten);
      setValue('sdt', khachHangData.sdt);
      setValue('email', khachHangData.email);
      setValue('ngay_sinh', khachHangData.ngaySinh.split('T')[0]);
      setValue('gioi_tinh', khachHangData.gioiTinh.toString());
      setImageUrl(khachHangData.hinhAnh);

      const responseDiaChi = await axios.get(`http://localhost:8080/api/diachi/getAllDiaChiByIdKhachHang/${id}`);
      const diaChiList = responseDiaChi.data;
      setAddresses(diaChiList);
     
      for (const [index, diaChi] of diaChiList.entries()) {

        const formattedTinhThanhPhoId = diaChi.idTinhThanhPho.toString().padStart(2, '0');
        const formattedQuanHuyenId = diaChi.idQuanHuyen.toString().padStart(3, '0');
        let districtData = [];
        try {
          const responseDistrict = await axios.get(`https://esgoo.net/api-tinhthanh/2/${formattedTinhThanhPhoId}.htm`);
          districtData = responseDistrict.data.data.map(district => ({
            id: district.id,
            ten: district.name
          }));
          setDistricts(districtData);
        } catch (error) {
          setError('Failed to fetch districts');
        }
        let wardData = [];
        try {
          const responseWard = await axios.get(`https://esgoo.net/api-tinhthanh/3/${formattedQuanHuyenId}.htm`);
          wardData = responseWard.data.data.map(ward => ({
            id: ward.id,
            ten: ward.name
          }));
          setWards(wardData);
        } catch (error) {
          setError('Failed to fetch wards');
        }
      }

    } catch (error) {
      setError('Failed to fetch KhachHang Info');
    }
  };


  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  }

  const onSubmit = async (data) => {
    try {
      let formData = {
        ten: data.ten,
        sdt: data.sdt,
        email: data.email,
        ngay_sinh: new Date(data.ngay_sinh).toISOString(),
        gioi_tinh: data.gioi_tinh,
        hinhAnh: data.hinhAnh
      };

      // Tính tuổi từ ngày sinh
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

      await validationSchema.validate(formData);
      const url = `http://localhost:8080/api/khachhang/update/${id}`;
      await axios.put(url, formData);
      setSnackbarMessage('Cập nhật thành công!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Có lỗi xảy ra khi cập nhật thông tin!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetAddress();
  };

  const onAddressSubmit = async (data) => {
    try {
      const newAddress = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
      };

      setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
      handleCloseModal();
    } catch (error) {
      setSnackbarMessage('Có lỗi xảy ra khi thêm địa chỉ!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const openCloudinaryWidget = () => {
    window.cloudinary.openUploadWidget({
      cloudName: 'daljc2ktr',
      uploadPreset: 'ovuxjxsx',
      sources: ['local', 'url', 'camera', 'google_photos', 'facebook', 'dropbox', 'instagram'],
      multiple: false,
      cropping: true,
      folder: 'customers_images',
    },
      (error, result) => {
        if (!error && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  };



  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
      {/* Thông tin khách hàng */}
      <Box sx={{ width: '33%', p: 2, borderRight: '1px solid #ddd' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '5%' }}>
          Thông tin khách hàng
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Image Preview */}
            <Grid item xs={12}>

              <Box display="flex" flexDirection="column" alignItems="center" height="100%">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Ảnh đại diện"
                    style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src='../src/assets/images/images.jpg'
                    alt="Ảnh đại diện"
                    style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                  />
                )}
                <Button
                  onClick={openCloudinaryWidget}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Chọn ảnh
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Tên"
                fullWidth
                {...register('ten')}
                InputLabelProps={{ shrink: true }}
                error={!!errors.ten}
                helperText={errors.ten?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                {...register('email')}
                InputLabelProps={{ shrink: true }}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Số điện thoại"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('sdt')}
                error={!!errors.sdt}
                helperText={errors.sdt?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ngày sinh"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('ngay_sinh')}
                error={!!errors.ngay_sinh}
                helperText={errors.ngay_sinh?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" error={!!errors.gioi_tinh}>
                <FormLabel component="legend">Giới tính *</FormLabel>
                <Controller
                  name="gioi_tinh"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <div>
                        <Radio
                          value="1"
                          checked={field.value === "1"}
                          onChange={field.onChange}
                        />
                        Nam
                      </div>
                      <div style={{ marginLeft: '16px' }}>
                        <Radio
                          value="0"
                          checked={field.value === "0"}
                          onChange={field.onChange}
                        />
                        Nữ
                      </div>
                    </RadioGroup>
                  )}
                />
                {errors.gioi_tinh && <FormHelperText>{errors.gioi_tinh.message}</FormHelperText>}
              </FormControl>
            </Grid>

          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Cập nhật
          </Button>
        </form>
      </Box>

      <Box sx={{ width: '67%', p: 2 }}>

        <Grid item xs={8}>
          <Paper elevation={3}>
            <Box p={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Danh sách địa chỉ</Typography>
                <IconButton color="primary" onClick={handleOpenModal}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                {addresses.map((address, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="body1">
                        Tên người nhận: {address.tenNguoiNhan}
                      </Typography>
                      <Typography variant="body1">
                        Số điện thoại: {address.sdtNguoiNhan}
                      </Typography>
                      {/* <Typography variant="body1">Email: {address.email}</Typography> */}
                      <Typography variant="body1">
                        Tỉnh/Thành phố: {provinces.find(p => p.id == address.idTinhThanhPho)?.name}
                      </Typography>
                      <Typography variant="body1">
                        Quận/Huyện: {districts.find(d => d.id == address.idQuanHuyen)?.ten}
                      </Typography>
                      <Typography variant="body1">
                        Phường/Xã: {wards.find(w => w.id == address.idPhuongXa)?.ten}
                      </Typography>
                      <Typography variant="body1">Địa chỉ: {address.diaChiNhanHang}</Typography>

                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Box>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Paper sx={{ p: 3, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%' }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Thêm địa chỉ mới
          </Typography>
          <form onSubmit={handleSubmitAddress(onAddressSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Tên người nhận"
                  fullWidth
                  {...registerAddress('ten_nguoi_nhan')}
                  error={!!addressErrors.ten_nguoi_nhan}
                  helperText={addressErrors.ten_nguoi_nhan?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Số điện thoại người nhận"
                  fullWidth
                  {...registerAddress('sdt_nguoi_nhan')}
                  error={!!addressErrors.sdt_nguoi_nhan}
                  helperText={addressErrors.sdt_nguoi_nhan?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Địa chỉ nhận hàng"
                  fullWidth
                  {...registerAddress('dia_chi_nhan_hang')}
                  error={!!addressErrors.dia_chi_nhan_hang}
                  helperText={addressErrors.dia_chi_nhan_hang?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Tỉnh thành</InputLabel>
                      <Select
                        {...registerAddress('province')}
                        error={!!addressErrors.province}
                        onChange={(e) => {
                          setSelectedProvince(e.target.value);
                          setValueAddress('district', '');
                          setValueAddress('ward', '');
                        }}
                      >
                        {provinces.map((province) => (
                          <MenuItem key={province.id} value={province.id}>
                            {province.ten}
                          </MenuItem>
                        ))}
                      </Select>
                      {addressErrors.province && (
                        <Typography variant="body2" color="error">
                          {addressErrors.province.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Quận huyện</InputLabel>
                      <Select
                        {...registerAddress('district')}
                        error={!!addressErrors.district}
                        onChange={(e) => {
                          setSelectedDistrict(e.target.value);
                          setValueAddress('ward', '');
                        }}
                      >
                        {districts.map((district) => (
                          <MenuItem key={district.id} value={district.id}>
                            {district.ten}
                          </MenuItem>
                        ))}
                      </Select>
                      {addressErrors.district && (
                        <Typography variant="body2" color="error">
                          {addressErrors.district.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Phường xã</InputLabel>
                      <Select
                        {...registerAddress('ward')}
                        error={!!addressErrors.ward}
                      >
                        {wards.map((ward) => (
                          <MenuItem key={ward.id} value={ward.id}>
                            {ward.ten}
                          </MenuItem>
                        ))}
                      </Select>
                      {addressErrors.ward && (
                        <Typography variant="body2" color="error">
                          {addressErrors.ward.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                Hủy
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Thêm
              </Button>
            </Box>
          </form>
        </Paper>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>

  );
}

export default KhachHangAddress;
