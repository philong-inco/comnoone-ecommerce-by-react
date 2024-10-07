import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
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
    FormHelperText,
    FormLabel,
    Snackbar,
    Alert,
    RadioGroup,
    Radio,
    CircularProgress,
    FormControlLabel,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

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
        .required('Ngày sinh không được để trống')
        .max(new Date(), 'Ngày sinh phải là quá khứ hoặc hiện tại')
        .test('age', 'Khách hàng phải từ 10 tuổi trở lên', value => {
            if (!value) return false;
            const today = new Date();
            const birthDate = new Date(value);
            let age = today.getFullYear() - birthDate.getFullYear(); // Changed from const to let
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--; // Now the reassignment is valid because "age" is a let
            }
            return age >= 10;
        }),

    gioi_tinh: Yup.number().required('Giới tính không được để trống'),
    hinhAnh: Yup.string(),
});

function KhachHangConfiguration() {
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const [imageUrl, setImageUrl] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [isProvincesLoaded, setIsProvincesLoaded] = useState(false);

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
            const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: {
                    token: '0292ba75-34b6-11ef-89ca-1aad91406dac'
                }
            });
            setProvinces(response.data.data); // Set the response data to provinces state
        } catch (error) {
            console.error('Error fetching provinces:', error);
            throw error;
        }
    };

    const fetchDistricts = async (provinceId) => {
        try {
            const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
                headers: {
                    token: '0292ba75-34b6-11ef-89ca-1aad91406dac'
                },
                params: {
                    province_id: provinceId
                }
            });
            setDistricts(response.data.data); // Set the response data to districts state
        } catch (error) {
            console.error('Error fetching districts:', error);
            throw error;
        }
    };

    const fetchWards = async (districtId) => {
        try {
            const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
                headers: {
                    token: '0292ba75-34b6-11ef-89ca-1aad91406dac'
                },
                params: {
                    district_id: districtId
                }
            });
            setWards(response.data.data); // Set the response data to wards state
        } catch (error) {
            console.error('Error fetching wards:', error);
            throw error;
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

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const handleNavigate = () => {
        navigate('/khachhang/danhsachkhachhang');
    }

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const onSubmit = (data) => {
        setFormData(data);
        setConfirmDialogOpen(true);
    };


    const handleConfirmClose = async (isConfirmed) => {
        setConfirmDialogOpen(false);

        if (isConfirmed && formData) {
            setLoading(true);
            try {
                let finalData = {
                    ten: formData.ten,
                    email: formData.email,
                    sdt: formData.sdt,
                    ngay_sinh: new Date(formData.ngay_sinh).toISOString(),
                    gioi_tinh: formData.gioi_tinh,
                    hinhAnh: imageUrl,
                    idPhuongXa: selectedWard,
                    idQuanHuyen: selectedDistrict,
                    idTinhThanhPho: selectedProvince,
                    diaChiNhanHang: formData.dia_chi
                };

                await validationSchema.validate(finalData);

                const response = await axios.post(`http://localhost:8080/api/khachhang/create`, finalData, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 200) {
                    setSnackbarMessage('Dữ liệu khách hàng được thêm thành công!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    setTimeout(handleNavigate, 3000);
                } else {
                    throw new Error('Unexpected response status');
                }
            } catch (error) {
                handleApiError(error);
            } finally {
                setLoading(false);
            }
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

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Typography variant="h1" gutterBottom style={{ textAlign: "center", marginBottom: '5%' }}>
                Thêm Khách Hàng
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
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
                            )}
                        </Box>
                    </Grid>

                    {/* Form Fields Section */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={3}>
                            {/* Personal Information */}
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
                                            {...register('sdt')}
                                            error={!!errors.sdt}
                                            helperText={errors.sdt?.message}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Email & Date of Birth */}
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
                                            {...register('email')}
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

                            {/* Gender */}
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
                                                    control={<Radio />}
                                                    label="Nam"
                                                />
                                                <FormControlLabel
                                                    value="0"
                                                    control={<Radio />}
                                                    label="Nữ"
                                                />
                                            </RadioGroup>
                                        )}
                                    />
                                    {errors.gioi_tinh && <FormHelperText>{errors.gioi_tinh.message}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            {/* Address Section */}
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Tỉnh/Thành Phố *</InputLabel>
                                    <Controller
                                        name="idTinhThanhPho"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                value={selectedProvince}
                                                onChange={(e) => setSelectedProvince(e.target.value)}
                                            >
                                                {provinces.map((province) => (
                                                    <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                                                        {province.ProvinceName}
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
                                            <Select
                                                {...field}
                                                value={selectedDistrict}
                                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                            >
                                                <MenuItem value="">Chọn quận/huyện</MenuItem>
                                                {districts.map((district) => (
                                                    <MenuItem key={district.DistrictID} value={district.DistrictID}>
                                                        {district.DistrictName}
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
                                            <Select
                                                {...field}
                                                value={selectedWard}
                                                onChange={(e) => setSelectedWard(e.target.value)}
                                            >
                                                <MenuItem value="">Chọn phường/xã</MenuItem>
                                                {wards.map((ward) => (
                                                    <MenuItem key={ward.WardCode} value={ward.WardCode}>
                                                        {ward.WardName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            {/* Full Address */}
                            <Grid item xs={12}>
                                <Controller
                                    name="dia_chi"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Địa chỉ Nhận Hàng"
                                            multiline
                                            rows={4}
                                            style={{ marginBottom: '30px' }}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            error={!!errors.dia_chi}
                                            helperText={errors.dia_chi?.message}
                                        />
                                    )}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{ width: '150px' }}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Lưu'}
                                    </Button>
                                </Box>
                                {error && <FormHelperText error>{error}</FormHelperText>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
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

            <Dialog
                open={confirmDialogOpen}
                onClose={() => handleConfirmClose(false)}
            >
                <DialogTitle>Xác nhận lưu</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn lưu thông tin này không?
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
        </LocalizationProvider>
    );
}

export default KhachHangConfiguration;
