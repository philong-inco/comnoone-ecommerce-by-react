import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
    MenuItem, Select, Divider, FormControl, Chip, Snackbar, Alert, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, FormLabel, Checkbox, Box, Pagination, TableBody, TableCell, TableRow, TableHead,
    Table, TableContainer, Typography, TextField, Grid, Paper, Button, InputAdornment, IconButton, Tabs, Tab
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BigNumber from 'bignumber.js';
import { getDataProducts, getDataProductsDetail } from 'services/admin/coupons/dotGiamGiaService';
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
    const [currencyType, setCurrencyType] = useState('%');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        loadData(currentPage, pageSize);
    }, [currentPage, pageSize]);

    useEffect(() => {
        if (location.pathname.includes('/view') || id) {
            setIsChiTietPage(true);
        } else {
            setIsChiTietPage(false);
        }
    }, [location, id]);

    useEffect(() => {
        loadData(currentPage, pageSize);
        fetchDggDetail(id);
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

    const handleSelectSanPham = async (sanPhamId) => {
        setSelectedSanPham((prev) => {
            if (prev.includes(sanPhamId)) {
                return prev.filter((id) => id !== sanPhamId);
            } else {
                return [...prev, sanPhamId];
            }
        });

        if (!sanPhamChiTiet[sanPhamId]) {
            try {
                const response = await getDataProductsDetail(sanPhamId);
                const productDetails = response.data.data;
                setSanPhamChiTiet((prev) => ({
                    ...prev,
                    [sanPhamId]: productDetails,
                }));
            } catch (error) {
                setSnackbar({ open: true, message: 'Lỗi khi tải sản phẩm chi tiết', severity: 'error' });
            }
        }
    };

    const handleSelectSanPhamChiTiet = (sanPhamId, sanPhamChiTietItemId) => {
        setSelectedSanPhamChiTiet((prev) => {
            const chiTietIds = prev[sanPhamId] || [];
            if (chiTietIds.includes(sanPhamChiTietItemId)) {
                return {
                    ...prev,
                    [sanPhamId]: chiTietIds.filter((id) => id !== sanPhamChiTietItemId),
                };
            } else {
                return {
                    ...prev,
                    [sanPhamId]: [...chiTietIds, sanPhamChiTietItemId],
                };
            }
        });
    };
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
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

    const formik = useFormik({
        initialValues: {
            tenPhieu: '',
            giaTri: '',
            giaTriToiDa: '',
            tuNgay: '',
            denNgay: '',
            loaiChietKhau: '1'
        },
        validationSchema: yup.object({
            tenPhieu: yup.string().required('Tên đợt giảm giá là bắt buộc'),
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
                    } else if (currencyType === '$') {
                        if (!bigNumberValue.isGreaterThan(0)) {
                            return context.createError({ message: 'Giá trị phải lớn hơn 0$' });
                        }
                    } else {
                        return context.createError({ message: 'Loại phiếu không hợp lệ' });
                    }
                    return true;
                }),
            tuNgay: yup.date()
                .required('Ngày bắt đầu là bắt buộc')
                .min(new Date(), 'Ngày bắt đầu phải từ hiện tại trở đi'),
            denNgay: yup.date()
                .required('Ngày kết thúc là bắt buộc')
                .when('tuNgay', (tuNgay, schema) => {
                    return schema.min(tuNgay, 'Ngày kết thúc phải sau ngày bắt đầu');
                }),
        }),
        onSubmit: async (values) => {
            try {
                debugger;
                setIsSubmitting(true);
                const listSanPhamChiTiet = Object.values(selectedSanPhamChiTiet).flat();
                const listIdSanPhamChiTiet = listSanPhamChiTiet.map(sanPham => sanPham.id);
                const data = {
                    ten: values.tenPhieu,
                    moTa: values.moTa,
                    giaTriGiam: values.giaTri,
                    loaiChietKhau: currencyType === '%' ? 1 : 2,
                    thoiGianBatDau: addSeconds(values.tuNgay),
                    thoiGianKetThuc: addSeconds(values.denNgay),
                    listSanPhamChiTiet: listIdSanPhamChiTiet
                }

                let response;
                if (id) {
                    response = await axios.put(`http://localhost:8080/api/v1/discounts/update/${id}`, data);
                    setSnackbar({ open: true, message: 'Đợt giảm giá đã được cập nhật thành công!', severity: 'success' });
                } else {
                    response = await axios.post('http://localhost:8080/api/v1/discounts/add', data);
                    setSnackbar({ open: true, message: 'Đợt giảm giá đã được tạo thành công!', severity: 'success' });
                }
            } catch (error) {
                console.log(error);
                setSnackbar({ open: true, message: 'Đã xảy ra lỗi!', severity: 'error' });
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
                denNgay: data.thoiGianKetthuc
            });
            debugger;
            setCurrencyType(data.loaiChietKhau === 1 ? '%' : "$");
            
            const sanPhamChiTietIds = data.spctDotGiamGias || [];
            
            // Lấy chi tiết sản phẩm và sản phẩm tương ứng
            const sanPhamChiTietData = await Promise.all(
                sanPhamChiTietIds.map(async (idSanPhamChiTiet) => {
                    const spctResponse = await axios.get(`http://localhost:8080/api/san-pham-chi-tiet/get-by-productdetail-id?idProductDetail=${idSanPhamChiTiet}`);
                    return spctResponse.data.data; // Truy cập vào `data` của response
                })
            );
            
            // Tạo danh sách sản phẩm và sản phẩm chi tiết
            const sanPhamIds = sanPhamChiTietData.map(item => item.sanPham.id); // Lấy id sản phẩm từ `sanPham`
            const selectedSanPhamChiTietData = sanPhamChiTietData.reduce((acc, item) => {
                acc[item.sanPham.id] = acc[item.sanPham.id] ? [...acc[item.sanPham.id], item.id] : [item.id];
                return acc;
            }, {});
    
            // Cập nhật state
            setSelectedSanPham(sanPhamIds);
            setSelectedSanPhamChiTiet(selectedSanPhamChiTietData);
    
        } catch (error) {
            console.error('Error fetching DGG detail:', error);
        }
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
                                readOnly: isChiTietPage,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => !isChiTietPage && setCurrencyType('%')}
                                            color={currencyType === '%' ? 'primary' : 'default'}
                                        >
                                            <PercentIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => !isChiTietPage && setCurrencyType('$')}
                                            color={currencyType === '$' ? 'primary' : 'default'}
                                        >
                                            <AttachMoneyIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
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
                                                    <Box sx={{ backgroundColor: sanPham.trangThai === 1 ? '#4caf50' : '#f44336', color: '#ffffff', padding: '6px 12px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                                                        {sanPham.trangThai === 1 ? 'Hoạt động' : 'Đã tắt'}
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Checkbox
                                                        checked={selectedSanPham.includes(sanPham.id)}
                                                        onChange={() => handleSelectSanPham(sanPham.id)}
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
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </Paper>


            </Grid>
            <Box sx={{ marginTop: 4 }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    {selectedSanPham.map(sanPhamId => (
                        <Tab key={sanPhamId} label={`Sản phẩm ${sanPhamId}`} />
                    ))}
                </Tabs>

                {selectedSanPham.map(sanPhamId => (
                    tabIndex === selectedSanPham.indexOf(sanPhamId) && (
                        <Box key={sanPhamId} sx={{ marginTop: 2 }}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Chọn</TableCell>
                                            <TableCell>Mã</TableCell>
                                            <TableCell>Giá bán</TableCell>
                                            <TableCell>Bàn phím</TableCell>
                                            <TableCell>CPU</TableCell>
                                            <TableCell>Hệ điều hành</TableCell>
                                            <TableCell>Màn hình</TableCell>
                                            <TableCell>Màu sắc</TableCell>
                                            <TableCell>RAM</TableCell>
                                            <TableCell>Sản phẩm</TableCell>
                                            <TableCell>VGA</TableCell>
                                            <TableCell>Webcam</TableCell>
                                            <TableCell>Trạng thái</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sanPhamChiTiet[sanPhamId]?.map(sanPhamChiTietItem => (
                                            <TableRow key={sanPhamChiTietItem.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={(selectedSanPhamChiTiet[sanPhamId] || []).some(item => item.id === sanPhamChiTietItem.id)}
                                                        onChange={() => handleSelectSanPhamChiTiet(sanPhamId, sanPhamChiTietItem)}
                                                    />
                                                </TableCell>
                                                <TableCell>{sanPhamChiTietItem.ma}</TableCell>
                                                <TableCell>{sanPhamChiTietItem.giaBan}</TableCell>
                                                <TableCell>{sanPhamChiTietItem.banPhim}</TableCell>
                                                <TableCell>{sanPhamChiTietItem.cpu}</TableCell>
                                                <TableCell>{sanPhamChiTietItem.heDieuHanh}</TableCell>
                                                <TableCell>{sanPhamChiTietItem.manHinh}</TableCell>
                                                <TableCell>{sanPhamChiTietItem.mauSac}</TableCell>
                                                <TableCell>{sanPhamChiTietItem.ram}</TableCell>
                                                <TableCell>{sanPhamChiTietItem.sanPham}</TableCell>
                                                <TableCell>{sanPhamChiTietItem.vga}</TableCell>
                                                <TableCell>{sanPhamChiTietItem.webcam}</TableCell>
                                                <TableCell> <Box
                                                    sx={{
                                                        display: 'inline-block',
                                                        padding: '4px 8px',
                                                        borderRadius: '8px',
                                                        backgroundColor: sanPhamChiTietItem.trangThai === 0 ? 'error.light' : 'success.light',
                                                        color: sanPhamChiTietItem.trangThai === 0 ? 'error.dark' : 'success.dark',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {sanPhamChiTietItem.trangThai === 0 ? 'Không hoạt động' : 'Hoạt động'}
                                                </Box></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )
                ))}
            </Box>

            <Snackbar open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Dialog
                open={confirmOpen}
                onClose={() => handleConfirmClose(false)}
            >
                <DialogTitle>Xác nhận</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn lưu thông tin phiếu giảm giá này?
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

export default DotGiamGiaConfiguration;
