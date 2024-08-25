import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import StarIcon from '@mui/icons-material/Star';
import { IconDeviceFloppy, IconPhoto, IconTrash } from '@tabler/icons-react';
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
  FormHelperText,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { IconPencil } from '@tabler/icons-react';
import { textAlign } from '@mui/system';
const validationSchema = Yup.object().shape({
  ten: Yup.string()
    .max(50, 'Tên không được vượt quá 50 ký tự')
    .required('Tên không được để trống')
    .matches(/^[a-zA-ZÀ-ỹ\s]*$/, 'Tên chỉ được chứa các ký tự chữ cái và khoảng trắng'),

  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email không hợp lệ')
    .required('Email không được để trống'),

  sdt: Yup.string()
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số')
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
  dia_chi_nhan_hang: Yup.string().required('Địa chỉ nhận hàng không được để trống'),
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
  const [isDefault, setIsDefault] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [pendingChangeValue, setPendingChangeValue] = useState(false);
  const [addressId, setAddressId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    if (selectedAddress) {
      setIsDefault(selectedAddress.isDefault === 1);
    }
  }, [selectedAddress]);
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
        name: district.name
      }));
      setDistricts(formattedData);
    } catch (error) {
      setError('Failed to fetch districts');
    }
  };

  const handleDefaultChange = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setOpenSetDefaultDialog(true);
    } else {
      setOpenUnsetDefaultDialog(true);
    }
  };


  const handleConfirmSetDefault = async () => {
    setOpenSetDefaultDialog(false);
    if (selectedAddress) {
      try {
        await axios.put(`http://localhost:8080/api/diachi/defaultlocation/${selectedAddress.id}?idKhachHang=${id}`, null);
        setDefaultAddressId(selectedAddress.id);
        handleCloseModal();
      } catch (error) {
        console.error('Failed to set default address', error);
      }
    }
  };

  const handleConfirmUnsetDefault = async () => {
    setOpenUnsetDefaultDialog(false);
    if (selectedAddress) {
      try {
        await axios.put(`http://localhost:8080/api/diachi/undefaultlocation/${selectedAddress.id}?idKhachHang=${id}`, null);
        setDefaultAddressId(null); // Unset the default address
        handleCloseModal();
      } catch (error) {
        console.error('Failed to unset default address', error);
      }
    }
  };

  const handleCancelChange = () => {
    setOpenConfirmDialog(false);
    setPendingChangeValue(isDefault);
  };

  const handleDeleteAddress = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/diachi/${addressId}`);

    } catch (error) {
      console.error('Lỗi khi xóa địa chỉ:', error);
    } finally {
      setOpenDialog(false);
      handleCloseModal();
    }
  };

  const handleDeleteClick = () => {
    setIdToDelete(addressId);
    setOpenDialog(true);
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
      setSnackbarOpen("Xảy ra lỗi khi hiển thị thông tin khách hàng!.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setTimeout(() => {
        handleCloseSnackbar();
      }, 1000);
    }
  };


  const handleCloseSnackbar = () => {
    setIsModalOpen(false);
    resetAddress();
    setIsEditing(false);
    setSnackbarOpen(false);
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
        setTimeout(() => {
          handleCloseSnackbar();
        }, 1000);
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
        setSnackbarMessage('Cập nhật thành công khách hàng!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          handleNavigate();
          handleCloseSnackbar();
        }, 1000);
      }

    } catch (error) {
      setSnackbarMessage('Có lỗi xảy ra khi cập nhật thông tin!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      setTimeout(() => {
        handleCloseSnackbar();
      }, 1000);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetAddress();
    fetchKhachHangInfo(id);
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedWard('');

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
      formDataAddress.idTinhThanhPho = data.provinces || selectedProvince;
      formDataAddress.idQuanHuyen = data.districts || selectedDistrict;
      formDataAddress.idPhuongXa = data.wards || selectedWard;
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
      } catch (error) {
        console.log(error);
      }


      if (data.id_dia_chi) {
        setSnackbarMessage('Cập nhật thành công địa chỉ!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setTimeout(() => {
          handleCloseModal();
          handleCloseSnackbar();
        }, 1000);
      } else {
        setSnackbarMessage('Thêm thành công địa chỉ !');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          handleCloseModal();
          handleCloseSnackbar();
        }, 1000);
      }
    } catch (error) {
      setSnackbarMessage('Có lỗi xảy ra khi cập nhật thông tin!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      setTimeout(() => {
        handleCloseSnackbar();
      }, 1000);
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
    setAddressId(address.id)
    try {

      const formattedTinhThanhPhoId = address.idTinhThanhPho.toString().padStart(2, '0');
      const formattedQuanHuyenId = address.idQuanHuyen.toString().padStart(3, '0');
      const formaterPhuongXaId = address.idPhuongXa.toString().padStart(5, '0');;
      setSelectedProvince(formattedTinhThanhPhoId);
      setSelectedDistrict(formattedQuanHuyenId);
      setSelectedWard(formaterPhuongXaId);
    } catch (error) {
      console.error('Failed to fetch address data', error);
    }
  };

  const handleProvinceChange = async (event) => {
    const selectedProvinceId = event.target.value;
    setSelectedProvince(selectedProvinceId);
    setValueAddress('province', selectedProvinceId);
    setSelectedDistrict('');
    setSelectedWard('');
  };

  const handleDistrictChange = async (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedDistrictId);
    setValueAddress('district', selectedDistrictId);
    setSelectedWard('');
  };

  const handleWardChange = (event) => {
    const selectedWardId = event.target.value;
    setSelectedWard(selectedWardId);
    setValueAddress('ward', selectedWardId);
  };


  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
      {/* Thông tin khách hàng */}
      <Box sx={{ width: '33%', p: 2, borderRight: '1px solid #ddd' }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: '5%', textAlign: 'center'}}>
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
                    style={{
                      width: '250px',
                      height: '250px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      borderRadius: '50%',
                      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={openCloudinaryWidget}
                  />
                ) : (
                  <img
                    src='../src/assets/images/images.jpg'
                    alt="Ảnh đại diện"
                    style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '50%' }}
                  />
                )}
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
                      <FormControlLabel
                        value="1"
                        control={<Radio checked={field.value === "1"} onChange={field.onChange} />}
                        label="Nam"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio checked={field.value === "0"} onChange={field.onChange} />}
                        label="Nữ"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.gioi_tinh && <FormHelperText>{errors.gioi_tinh.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<IconDeviceFloppy stroke={2} />}
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                color: 'white',
              }}
            >
              Cập nhật
            </Button>


          </Grid>
        </form>
      </Box>

      <Box sx={{ width: '65%', p: 2 }}>

        <Grid item xs={8}>
          <Paper elevation={3}>
            <Box p={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Danh sách địa chỉ</Typography>
                <IconButton color="primary" onClick={handleOpenModal}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                {addresses.map((address, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        position: 'relative',
                        '&:hover': {
                          backgroundColor: '#f0f0f0',
                          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                          transform: 'scale(1.02)',
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          display: 'flex',
                          alignItems: 'center',
                          zIndex: 1,
                        }}
                      >
                        {address.loaiDiaChi === 1 && (
                          <StarIcon color="warning" sx={{ mr: 1 }} />
                        )}
                        <IconPencil stroke={1} onClick={() => handleOpenModal(address)} />
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
                          Địa chỉ Chi Tiết:
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
          <Typography variant="h4">Địa Chỉ Của Tôi</Typography>
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
              <FormControl fullWidth margin="normal">
                <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
                <Select
                  labelId="province-label"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  label="Tỉnh/Thành phố"
                >
                  {provinces.map((province) => (
                    <MenuItem key={province.id} value={province.id}>
                      {province.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" disabled={!selectedProvince}>
                <InputLabel id="district-label">Quận/Huyện</InputLabel>
                <Select
                  labelId="district-label"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  label="Quận/Huyện"
                >
                  {districts.map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" disabled={!selectedDistrict}>
                <InputLabel id="ward-label">Phường/Xã</InputLabel>
                <Select
                  labelId="ward-label"
                  value={selectedWard}
                  onChange={handleWardChange}
                  label="Phường/Xã"
                >
                  {wards.map((ward) => (
                    <MenuItem key={ward.id} value={ward.id}>
                      {ward.name}
                    </MenuItem>
                  ))}
                </Select>
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
            <FormControlLabel
              control={<Switch checked={isDefault} onChange={handleDefaultChange} />}
              label="Địa chỉ mặc định"
              sx={{ mt: 2 }}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Button
                startIcon={<IconTrash stroke={2} />}
                onClick={handleDeleteClick}
              >
                Xóa Địa Chỉ
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<IconDeviceFloppy stroke={2} />}
                sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FE6B8B 50%, #FF8E53 100%)',
                  },
                }}
              >
                Lưu
              </Button>
            </Box>

          </form>
        </Box>
      </Modal>


      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Xóa Địa Chỉ</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa địa chỉ này?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteAddress} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSetDefaultDialog}
        onClose={() => setOpenSetDefaultDialog(false)}
      >
        <DialogTitle>Xác nhận thay đổi</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn đặt địa chỉ này làm mặc định không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSetDefaultDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmSetDefault} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Thông báo bỏ làm giá trị mặc định */}
      <Dialog
        open={openUnsetDefaultDialog}
        onClose={() => setOpenUnsetDefaultDialog(false)}
      >
        <DialogTitle>Xác nhận thay đổi</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn bỏ địa chỉ này làm mặc định không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUnsetDefaultDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmUnsetDefault} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>


      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>

  );
}

export default KhachHangAddress;
