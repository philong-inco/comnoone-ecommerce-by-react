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
    CircularProgress
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
        .max(new Date(), 'Ngày sinh phải là quá khứ hoặc hiện tại')
        .required('Ngày sinh không được để trống'),
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
        debugger;
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`);
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

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            debugger;
            let formData = {}
            formData.ten = data.ten;
            formData.email = data.email;
            formData.sdt = data.sdt;
            formData.ngay_sinh = new Date(data.ngay_sinh).toISOString();
            formData.gioi_tinh = data.gioi_tinh;
            formData.hinhAnh = imageUrl;
            formData.idPhuongXa = selectedWard;
            formData.idQuanHuyen = selectedDistrict;
            formData.idTinhThanhPho = selectedProvince;
            formData.diaChiNhanHang = data.dia_chi;

            await validationSchema.validate(formData);

            const url = `http://localhost:8080/api/khachhang/create`
            const method = 'post'

            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                setSnackbarMessage('Dữ liệu đã được gửi thành công!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setTimeout(() => {
                    handleNavigate();
                }, 1000);
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            setSnackbarMessage('Có lỗi xảy ra khi xử lý yêu cầu!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Typography variant="h1" gutterBottom style={{ textAlign: "center", marginBottom: '5%' }}>
                Thêm Khách Hàng
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container spacing={3}>
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
                                            {...register('sdt')}
                                            InputLabelProps={{ shrink: true }}
                                            error={!!errors.sdt}
                                            helperText={errors.sdt?.message}
                                            sx={{ mb: 2 }}

                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            variant="outlined"
                                            {...register('email')}
                                            InputLabelProps={{ shrink: true }}
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />
                            </Grid>
                            {/* Thiếu 1 */}
                        </Grid>

                        <Grid container spacing={3}>
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

                        <Grid container spacing={3}>
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
                                                    <MenuItem key={province.id} value={province.id}>{province.name}</MenuItem>
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
                                                    <MenuItem key={district.id} value={district.id}>{district.ten}</MenuItem>
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
                                                    <MenuItem key={ward.id} value={ward.id}>{ward.ten}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

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
                        <Button style={{ width: '10%', marginLeft: '50%' }} type="submit" variant="contained" color="primary" fullWidth>
                            {loading ? <CircularProgress size={24} /> : 'Lưu'}
                        </Button>
                        {error && <FormHelperText error>{error}</FormHelperText>}
                    </Grid>

                    {/* Image Preview */}
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
                                        borderRadius: '50%', // Make the image circular
                                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Add shadow for pop-up effect
                                        transition: 'all 0.3s ease', // Smooth transition for hover effect
                                    }}
                                    onClick={openCloudinaryWidget} // Trigger the image upload widget on click
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </form>

            {/* Snackbar for Success and Error Messages */}
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
        </LocalizationProvider>
    );
}

export default KhachHangConfiguration;
