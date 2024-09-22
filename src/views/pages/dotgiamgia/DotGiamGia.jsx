import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
     FormControl,
    TextField, Grid, IconButton, Tooltip, Box, Table, TableBody, Fab, InputAdornment, InputLabel,
    TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Snackbar, Alert, MenuItem, Select
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { listDotGiamGia } from 'services/admin/coupons/dotGiamGiaService';

function DotGiamGia() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [dotGiamGia, setDotGiamGia] = useState([]);
    const [filters, setFilters] = useState({
        tenOrMa: '',
        giaTri: '',
        trangThai: '',
        ngayBatDau: '',
        ngayKetThuc: '',
        size: 6
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState(null);
    const navigate = useNavigate();

    // Hàm gọi API để lấy danh sách phiếu giảm giá
    const fetchCoupons = async () => {
        const response = await listDotGiamGia(filters);
        setDotGiamGia(response.data.content);
        setTotalPages(response.data.totalPages);
    };

    useEffect(() => {
        fetchCoupons(currentPage);
        const intervalId = setInterval(() => {
            fetchCoupons(currentPage);
        }, 2000);
    
        return () => clearInterval(intervalId); 
    }, [currentPage]);
    
    useEffect(() => {
        fetchCoupons();
    }, [filters, currentPage]);

    const handleFilterChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        setFilters({ ...filters, page: value - 1 });
    };

    const handleViewCoupon = (id) => {
        navigate(`/dotgiamgia/cauhinhdotgiamgia/view/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/dotgiamgia/cauhinhdotgiamgia/edit/${id}`);
    };

    const handleOpenConfirmDialog = (id) => {
        setSelectedCouponId(id);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };
    const handleNavigate = () => {
        navigate('/dotgiamgia/cauhinhdotgiamgia');
    };

    const handleDelete = async () => {
        await deletedCoupons(selectedCouponId);
        setOpenConfirmDialog(false);
        fetchCoupons();
        setSnackbarMessage('Xóa phiếu giảm giá thành công');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 0: return 'gray';
            case 1: return 'green';
            case 2: return 'red';
            case 3: return '#FFA500';
            default: return 'blue';
        }
    };

    const getStatusName = (status) => {
        switch (status) {
            case 0: return 'Sắp Diễn Ra';
            case 1: return 'Đang Diễn Ra';
            case 2: return 'Đã Diễn Ra';
            case 3: return 'Đã Hủy';
            default: return 'Không xác định';
        }
    };

    return (
        <div>
            <Box sx={{ backgroundColor: '#f0f0f0', p: 2, borderRadius: 2, marginBottom: 2 }}>
                <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2 }}>
                    <Grid container spacing={3} p={2}>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    name="tenOrMa"
                                    label="Tên hoặc Mã"
                                    value={filters.tenOrMa}
                                    onChange={handleFilterChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    name="giaTri"
                                    label="Giá Trị"
                                    value={filters.giaTri}
                                    onChange={handleFilterChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    name="ngayBatDau"
                                    type="datetime-local"
                                    label="Ngày Bắt Đầu"
                                    InputLabelProps={{ shrink: true }}
                                    value={filters.ngayBatDau}
                                    onChange={handleFilterChange}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    name="ngayKetThuc"
                                    type="datetime-local"
                                    label="Ngày Kết Thúc"
                                    InputLabelProps={{ shrink: true }}
                                    value={filters.ngayKetThuc}
                                    onChange={handleFilterChange}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Trạng Thái</InputLabel>
                                <Select
                                    name="trangThai"
                                    value={filters.trangThai}
                                    onChange={handleFilterChange}
                                    fullWidth
                                    label="Trạng Thái"
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    <MenuItem value="0">Sắp Diễn Ra</MenuItem>
                                    <MenuItem value="1">Đang Diễn Ra</MenuItem>
                                    <MenuItem value="2">Đã Diễn Ra</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            boxShadow: 3,
                        }}
                        onClick={handleNavigate}
                    >
                        <AddIcon />
                    </Fab>
                </Box>
            </Box>


            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Mã đợt giảm giá</TableCell>
                            <TableCell>Tên đợt giảm giá</TableCell>
                            <TableCell>Ngày bắt đầu</TableCell>
                            <TableCell>Ngày kết thúc</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dotGiamGia.length > 0 ? (
                            dotGiamGia.map((phieu, index) => (
                                <TableRow key={phieu.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{phieu.ma}</TableCell>
                                    <TableCell>{phieu.ten}</TableCell>
                                    <TableCell>{phieu.thoiGianBatDau}</TableCell>
                                    <TableCell>{phieu.thoiGianKetthuc}</TableCell>
                                    <TableCell>
                                        <Box sx={{
                                            backgroundColor: getStatusColor(phieu.trangThai),
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '8px',
                                            textAlign: 'center',
                                            width: '120px',
                                            fontWeight: 'bold',
                                        }}>
                                            {getStatusName(phieu.trangThai)}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Xem chi tiết">
                                            <IconButton onClick={() => handleViewCoupon(phieu.id)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {phieu.trangThai === 0 && (
                                            <>
                                                <Tooltip title="Chỉnh sửa">
                                                    <IconButton color="secondary" onClick={() => handleEdit(phieu.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Hủy phiếu">
                                                    <IconButton color="error" onClick={() => handleOpenConfirmDialog(phieu.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Không có phiếu giảm giá nào</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" my={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default DotGiamGia;
