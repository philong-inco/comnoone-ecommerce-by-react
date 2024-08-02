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
  Radio,
  FormHelperText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { IconPencil } from '@tabler/icons-react';
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
  dia_chi_nhan_hang: Yup.string().required('Địa chỉ nhận hàng không được để trống')
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
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (isProvincesLoaded && id) {
      fetchKhachHangInfo(id);
    }
  }, [isProvincesLoaded, id]);

  useEffect(() => {
    if (selectedProvince) {
      console.log('1231231', districts);
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
        name: district.name
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
        name: ward.name
      }));
      setWards(formattedData);
    } catch (error) {
      setError('Failed to fetch wards');
    }
  };

  const fetchKhachHangInfo = async (id) => {
    try {
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
      const provinces = new Set();
      const districts = new Set();

      for (const diaChi of diaChiList) {
        provinces.add(diaChi.idTinhThanhPho);
        districts.add(diaChi.idQuanHuyen);
      }

      const fetchDistrictsAndWards = async () => {
        const districtPromises = Array.from(provinces).map(async (districtId) => {
          const formattedTinhThanhPhoId = districtId.toString().padStart(2, '0');
          try {
            const responseDistrict = await axios.get(`https://esgoo.net/api-tinhthanh/2/${formattedTinhThanhPhoId}.htm`);
            return responseDistrict.data.data.map(district => ({
              id: district.id,
              name: district.name
            }));
          } catch (error) {
            setError('Failed to fetch districts');
            return [];
          }
        });
        const allDistricts = (await Promise.all(districtPromises)).flat();
        setDistricts(allDistricts);
        const wardPromises = Array.from(districts).map(async (districtId) => {
          const formattedQuanHuyenId = districtId.toString().padStart(3, '0');
          try {
            const responseWard = await axios.get(`https://esgoo.net/api-tinhthanh/3/${formattedQuanHuyenId}.htm`);
            return responseWard.data.data.map(ward => ({
              id: ward.id,
              name: ward.name
            }));
          } catch (error) {
            setError('Failed to fetch wards');
            return [];
          }
        });
        const allWards = (await Promise.all(wardPromises)).flat();
        setWards(allWards);
      };
      await fetchDistrictsAndWards();
    } catch (error) {
      setError('Failed to fetch KhachHang Info');
    }
  };


  const handleCloseSnackbar = () => {
    setIsModalOpen(false);
    resetAddress();
    setIsEditing(false);
  }

  const handleNavigate = () => {
    navigate('/khachhang/danhsachkhachhang');
  }
  const onSubmit = async (data) => {
    try {
      let formData = {
        ten: data.ten,
        sdt: data.sdt,
        email: data.email,
        ngay_sinh: new Date(data.ngay_sinh).toISOString(),
        gioi_tinh: data.gioi_tinh,
        hinhAnh: imageUrl
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
      const method = 'put'
      const response = await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        setSnackbarMessage('Cập nhật thành công!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          handleNavigate();
        }, 1000);
      }

    } catch (error) {
      setSnackbarMessage('Có lỗi xảy ra khi cập nhật thông tin!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetAddress();
  };

  const onAddressSubmit = async (data) => {
    debugger
    try {
      let formDataAddress = {};
      formDataAddress.tenNguoiNhan = data.ten_nguoi_nhan;
      formDataAddress.sdtNguoiNhan = data.sdt_nguoi_nhan;
      formDataAddress.diaChiNhanHang = data.dia_chi_nhan_hang;
      formDataAddress.emailNguoiNhan = data.email;
      formDataAddress.khach_hang_id = id;
      formDataAddress.idTinhThanhPho = data.provinces  || selectedProvince;
      formDataAddress.idQuanHuyen = data.districts || selectedDistrict;
      formDataAddress.idPhuongXa = data.wards || selectedWard;

      await addressValidationSchema.validate(formDataAddress);
      try {
        const url = data.id_dia_chi ? `http://localhost:8080/api/diachi/updatelocation/${data.id_dia_chi}` : 'http://localhost:8080/api/diachi/create';
        const method = data.id_dia_chi ? 'PUT' : 'POST';
        const responseAddress = await axios({
          method: method,
          url: url,
          data: formDataAddress,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(responseAddress);
      } catch (error){
        console.log(error);
      }
      

      if (data.id_dia_chi) {
        setSnackbarMessage('Cập nhật thành công địa chỉ!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setTimeout(() => {
          handleCloseModal();
        }, 1000);
      } else {
        setSnackbarMessage('Thêm thành công địa chỉ !');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          handleCloseModal();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
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

  const handleOpenModal = async (address) => {
    setSelectedAddress(address);
    setIsEditing(true);
    setIsModalOpen(true);
    setValueAddress('ten_nguoi_nhan', address.tenNguoiNhan);
    setValueAddress('sdt_nguoi_nhan', address.sdtNguoiNhan);
    setValueAddress('email', address.emailNguoiNhan);
    setValueAddress('dia_chi_nhan_hang', address.diaChiNhanHang);
    setValueAddress('id_dia_chi', address.id);

    try {

      const formattedTinhThanhPhoId = address.idTinhThanhPho.toString().padStart(2, '0');
      const formattedQuanHuyenId = address.idQuanHuyen.toString().padStart(3, '0');
      setValueAddress('provinces', formattedTinhThanhPhoId);
      setValueAddress('districts', formattedQuanHuyenId);
      const formaterPhuongXaId = address.idPhuongXa.toString().padStart(5, '0');;
      setValueAddress('wards', formaterPhuongXaId);
    } catch (error) {
      console.error('Failed to fetch address data', error);
    }
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
      <Box sx={{ width: '55%', p: 2 }}>

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
                    <Paper elevation={2} sx={{ p: 2, position: 'relative' }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          display: 'flex',
                          alignItems: 'center',
                          zIndex: 1
                        }}
                      >
                        {address.loaiDiaChi === 1 && (
                          <StarIcon color="warning" sx={{ mr: 1 }} />
                        )}
                        <IconPencil stroke={1} onClick={() => handleOpenModal(address)} />
                      </Box>
                      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', display: 'none' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline' }}>
                          ID:
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', ml: 1 }}>
                          {address.id}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline' }}>
                          Tên người nhận:
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', ml: 1 }}>
                          {address.tenNguoiNhan}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline' }}>
                          Số điện thoại:
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', ml: 1 }}>
                          {address.sdtNguoiNhan}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline' }}>
                          Tỉnh/Thành phố:
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', ml: 1 }}>
                          {provinces.find(p => p.id == address.idTinhThanhPho)?.name}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline' }}>
                          Quận/Huyện:
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', ml: 1 }}>
                          {districts.find(d => d.id == address.idQuanHuyen)?.name}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline' }}>
                          Phường/Xã:
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', ml: 1 }}>
                          {wards.find(w => w.id == address.idPhuongXa)?.name}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline' }}>
                          Địa chỉ:
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', ml: 1 }}>
                          {address.diaChiNhanHang}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Box>

      <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <Box sx={{ width: '400px', bgcolor: 'background.paper', p: 4, mx: 'auto', mt: 4 }}>
          <Typography variant="h6">{isEditing ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ'}</Typography>
          <form onSubmit={handleSubmitAddress(onAddressSubmit)}>

            <TextField
              label="ID"
              fullWidth
              margin="normal"
              style={{ display: 'none' }}
              {...registerAddress('id_dia_chi')}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Tên người nhận"
              fullWidth
              margin="normal"
              {...registerAddress('ten_nguoi_nhan')}
              InputLabelProps={{ shrink: true }}
              error={Boolean(addressErrors.ten_nguoi_nhan)}
              helperText={addressErrors.ten_nguoi_nhan?.message}
            />
            <TextField
              label="Số điện thoại người nhận"
              fullWidth
              margin="normal"
              {...registerAddress('sdt_nguoi_nhan')}
              InputLabelProps={{ shrink: true }}
              error={Boolean(addressErrors.sdt_nguoi_nhan)}
              helperText={addressErrors.sdt_nguoi_nhan?.message}
            />
            <TextField
              label="Email người nhận"
              fullWidth
              margin="normal"
              {...registerAddress('email')}
              InputLabelProps={{ shrink: true }}
              error={Boolean(addressErrors.email)}
              helperText={addressErrors.email?.message}
            />

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Tỉnh thành</InputLabel>
                <Controller
                  name="provinces"
                  control={controlAddress}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        setValueAddress('province', value);
                        setSelectedProvince(value);
                      }}
                      error={Boolean(addressErrors.province)}
                    >
                      {provinces.map((province) => (
                        <MenuItem key={province.id} value={province.id}>
                          {province.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {addressErrors.province && <FormHelperText error>{addressErrors.province.message}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Quận huyện</InputLabel>
                <Controller
                  name="districts"
                  control={controlAddress}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        setValueAddress('district', value);
                        setSelectedDistrict(value);
                      }}
                      error={Boolean(addressErrors.district)}
                    >
                      {districts.map((district) => (
                        <MenuItem key={district.id} value={district.id}>
                          {district.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {addressErrors.district && <FormHelperText error>{addressErrors.district.message}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Phường xã</InputLabel>
                <Controller
                  name="wards"
                  control={controlAddress}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        setValueAddress('ward', value);
                        setSelectedWard(value);
                      }}
                      error={Boolean(addressErrors.ward)}
                    >
                      {wards.map((ward) => (
                        <MenuItem key={ward.id} value={ward.id}>
                          {ward.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {addressErrors.ward && <FormHelperText error>{addressErrors.ward.message}</FormHelperText>}
              </FormControl>
            </Box>
            <TextField
              label="Địa chỉ nhận hàng"
              fullWidth
              margin="normal"
              {...registerAddress('dia_chi_nhan_hang')}
              InputLabelProps={{ shrink: true }}

              error={Boolean(addressErrors.dia_chi_nhan_hang)}
              helperText={addressErrors.dia_chi_nhan_hang?.message}
              sx={{ fontFamily: 'Arial' }}
            />
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'}
            </Button>
            <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 10, right: 10 }}>
              <CloseIcon />
            </IconButton>
          </form>
        </Box>
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
