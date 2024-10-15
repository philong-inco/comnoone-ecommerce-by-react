import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Switch, TablePagination, 
    FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    TextField, Grid, IconButton, Tooltip, Box, Table, TableBody, Fab, InputAdornment, InputLabel,
    TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Alert, MenuItem, Select
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { listDotGiamGia, startDGG, stopDPGG, deleteDGG } from 'services/admin/coupons/dotGiamGiaService';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

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
        size: 5
    });

    const [size, setSize] = useState(5);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openConfirmDialogOne, setOpenConfirmDialogOne] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState(null);
    const [selectedCouponStatus, setSelectedCouponStatus] = useState(null);
    const navigate = useNavigate();

    const fetchCoupons = async () => {
        try {
            const response = await listDotGiamGia({
                ...filters,
                size,
                page: currentPage - 1,
            });
            setDotGiamGia(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchCoupons(false); // Không áp dụng bộ lọc khi tải lại định kỳ
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);
    
    useEffect(() => {
        fetchCoupons();
    }, [currentPage, size, filters]);

    const handleFilterChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        });
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage + 1); 
    };
    
    const handleRowsPerPageChange = (event) => {
        setSize(parseInt(event.target.value, 10));
        setCurrentPage(1);
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
        await deleteDGG(selectedCouponId);
        setOpenConfirmDialog(false);
        fetchCoupons();
        setSnackbarMessage('Hủy đợt giảm giá thành công');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleCloseConfirmDialogOne = () => {
        setOpenConfirmDialogOne(false);
        setSelectedCouponId(null);
    };

    const handleConfirmSwitchChange = (id, trangThai) => {
        setSelectedCouponId(id);
        setSelectedCouponStatus(trangThai);
        setOpenConfirmDialogOne(true);
    };

    const handleSwitchChange = async () => {
        const newStatus = selectedCouponStatus === 1 ? 1 : 4;
        try {
            if (newStatus === 4) {
                const response = await startDGG(selectedCouponId);
                if (response.status === 200) {
                    setSnackbarMessage('Phiếu giảm giá đã được bắt đầu áp dụng.');
                } else {
                    throw new Error('Có lỗi xảy ra khi bắt đầu áp dụng phiếu giảm giá.');
                }
            } else if (newStatus === 1) {
                const response = await stopDPGG(selectedCouponId);
                if (response.status === 200) {
                    setSnackbarMessage('Phiếu giảm giá đã được ngừng áp dụng.');
                } else {
                    throw new Error('Có lỗi xảy ra khi ngừng áp dụng phiếu giảm giá.');
                }
            }
            setSnackbarSeverity('success');
            fetchCoupons();
        } catch (error) {
            console.error(error);
            setSnackbarMessage(error.message || 'Cập nhật trạng thái thất bại.');
            setSnackbarSeverity('error');
        } finally {
            setOpenSnackbar(true);
            setOpenConfirmDialogOne(false);
        }
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
            case 4: return 'black';
            default: return 'blue';
        }
    };

    const getStatusName = (status) => {
        switch (status) {
            case 0: return 'Sắp Diễn Ra';
            case 1: return 'Đang Diễn Ra';
            case 2: return 'Đã Diễn Ra';
            case 3: return 'Đã Hủy';
            case 4: return 'Đang tạm dừng';
            default: return 'Không xác định';
        }
    };

    const handleClearFilters = () => {
        setFilters({
            tenOrMa: '',
            ngayBatDau: '',
            ngayKetThuc: '',
            trangThai: '',
        });
    };

    return (
        <div>
            <Box sx={{ backgroundColor: '#f0f0f0', p: 2, borderRadius: 2, marginBottom: 2 }}>
                <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2 }}>
                    <Grid container spacing={3} alignItems="center" p={2}>
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

                        <Grid item xs={12} sm={2}>
                            <IconButton
                                onClick={handleClearFilters}
                                color="secondary"
                                sx={{
                                    border: '1px solid',
                                    borderRadius: 2,
                                    padding: 1,
                                    backgroundColor: '#f5f5f5',
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        transition: 'transform 0.3s ease',
                                    },
                                    '&:hover .MuiSvgIcon-root': {
                                        transform: 'rotate(360deg)',
                                    },
                                }}
                            >
                                <DeleteSweepIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{
                            position: 'fixed',
                            top: 340,
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
                            <TableCell>Chi tiết</TableCell>
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
                                    </TableCell>
                                    <TableCell>
                                        {(phieu.trangThai === 0 || phieu.trangThai === 4) && (
                                            <>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => handleEdit(phieu.id)}
                                                >
                                                    <Tooltip title="Chỉnh sửa">
                                                        <EditIcon />
                                                    </Tooltip>
                                                </IconButton>
                                            </>
                                        )}

                                        {(phieu.trangThai === 0 || phieu.trangThai === 1 || phieu.trangThai === 4) && (
                                            <>
                                                <Tooltip title="Hủy đợt giảm giá">
                                                    <IconButton color="error" onClick={() => handleOpenConfirmDialog(phieu.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )}

                                        {(phieu.trangThai === 1 || phieu.trangThai === 4) && (
                                            <>
                                                <Switch
                                                    checked={phieu.trangThai === 1}
                                                    onChange={() => handleConfirmSwitchChange(phieu.id, phieu.trangThai)}
                                                />
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

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalPages * size}
                page={currentPage - 1}
                onPageChange={handlePageChange}
                rowsPerPage={size}
                onRowsPerPageChange={handleRowsPerPageChange}
            />

            <Dialog
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
            >
                <DialogTitle>Xác nhận hủy phiếu</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn hủy phiếu này? Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openConfirmDialogOne}
                onClose={handleCloseConfirmDialogOne}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Xác nhận thay đổi trạng thái?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn thay đổi trạng thái của đợt giảm giá này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialogOne}>Hủy</Button>
                    <Button onClick={handleSwitchChange} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default DotGiamGia;
