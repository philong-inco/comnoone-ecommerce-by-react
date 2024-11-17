import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Switch } from '@mui/material';
import * as XLSX from 'xlsx';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Pagination,
    InputLabel,
    Select,
    MenuItem,
    Avatar,
    Chip,
    Fab,
    Grid,
    TablePagination,
    Alert,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

import MainCard from 'ui-component/cards/MainCard';
import { searchNhanVienKeyWord, getAll, searchTrangThai, deleteNhanVien, rollBackStatus, searchGioiTinh, sentEmailForgotPassword, getDanhSachNhanVien } from 'services/admin/employee/employeeService';
import { IconEdit } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/Add';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

const DanhSachNhanVien = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [searchRadio, setSearchRadio] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteIdStatus, setDeleteIdStatus] = useState(null);
    const [nhanVien, setNhanVien] = useState([]);
    const [allNhanVien, setAllNhanVien] = useState([]);
    const [selectGioiTinh, setSelectGioiTinh] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [nvEmail, setNvEmail] = useState(null);
    const statuses = [
        { id: '', name: 'Tất Cả' },
        { id: '0', name: 'Đã Nghỉ Việc' },
        { id: '1', name: 'Đang Làm Việc' }
    ];

    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        page: 0,
        size: 5,
    });

    const [totalElement, setTotalElement] = useState(0);
    const fetchNhanVien = async () => {
        try {
            debugger;
            let result;
            if (searchKeyWord) {
                result = await searchNhanVienKeyWord(filter.page, filter.size, searchKeyWord);
            } else if (searchRadio) {
                result = await searchTrangThai(filter.page, filter.size, searchRadio);
            } else if (selectGioiTinh !== '') {
                result = await searchGioiTinh(filter.page, filter.size, selectGioiTinh);
            } else {
                result = await getAll(filter.page, filter.size);
            }
            setNhanVien(result.content);
            setTotalElement(result.totalElements);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setFilter((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    const handleChangeRowsPerPage = (event) => {
        setFilter({
            ...filter,
            size: parseInt(event.target.value, 10),
            page: 0,
        });
    };

    const getAllNhanVien = async () => {
        let result;
        try {
            result = await getDanhSachNhanVien();
            setAllNhanVien(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNhanVien();
    }, [filter.page, filter.size, searchKeyWord, searchRadio, selectGioiTinh]);

    useEffect(() => {
        getAllNhanVien();
    }, []);

    const getStatusNhanVien = (status) => {
        switch (status) {
            case 0:
                return (
                    <Chip

                        label="Đã Nghỉ Việc"
                        color="default"
                        style={{ backgroundColor: '#f44336', color: '#fff' }}
                    />
                )
            case 1:
                return (
                    <Chip
                        label="Đang Làm Việc"
                        color="success"
                        style={{ backgroundColor: '#4caf50', color: '#fff' }}
                    />
                )
            default:
                return (
                    <Chip
                        label="Không xác định"
                        color="warning"
                        style={{ backgroundColor: '#ff9800', color: '#fff' }}
                    />
                )
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setCurrentPage(1);
        setSearchRadio('');
        setSelectGioiTinh('');

    };

    const handleSearchKeyWord = (event) => {
        setSearchKeyWord(event.target.value);
        setCurrentPage(1);

        setSearchRadio('');
        setSelectGioiTinh("");
    }

    const handleRadioChange = (event) => {
        debugger;
        setSearchRadio(event.target.value);
        setCurrentPage(1);
        setSearchKeyWord('');
        setSelectGioiTinh('');
    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectGioiTinh(value);
        setCurrentPage(1);
        setSearchKeyWord('');
        setSearchRadio('');
    };

    const handleYearChange = (event) => {
        setSearchYear(event.target.value);
        setCurrentPage(1);
        setSearchRadio('');
        setSelectGioiTinh('');
        setSearchKeyWord('');

    };


    const handleConfirmDelete = async () => {
        setConfirmOpen(false);
        try {
            if (deleteIdStatus === 0) {
                await deleteNhanVien(deleteId);
            } else {
                await rollBackStatus(deleteId);
            }
            fetchNhanVien();
        } catch (error) {
            console.error('Error updating employee status:', error);
        }
    };

    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setDeleteId(null);
        setDeleteIdStatus(null);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSwitchChange = (id, currentStatus) => {
        setDeleteId(id);
        setDeleteIdStatus(currentStatus === 1 ? 0 : 1);
        setConfirmOpen(true);
    };

    const handleNavigate = () => {
        navigate('/nhanvien/configuration');
    };

    const handleEdit = (id) => {
        navigate(`/nhanvien/configuration/${id}`);
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(101), (_, index) => currentYear - index);

    const handleExportExcel = async () => {
        try {
            let filteredData;
            if (searchKeyWord) {
                filteredData = await searchNhanVienKeyWord(filter.page, filter.size, searchKeyWord);
            } else if (searchRadio) {
                filteredData = await searchTrangThai(filter.page, filter.size, searchRadio);
            } else if (selectGioiTinh !== '') {
                filteredData = await searchGioiTinh(filter.page, filter.size, selectGioiTinh);
            } else {
                filteredData = await getAll(filter.page, filter.size);
            }

            const ws = XLSX.utils.json_to_sheet(filteredData.content.map((nv, index) => ({
                STT: index + 1 + (filter.page - 1) * filter.size,
                'Hình Ảnh': nv.hinhAnh,
                Mã: nv.ma,
                Tên: nv.ten,
                'Ngày Sinh': formatDate(nv.ngaySinh),
                'Số Điện Thoại': nv.sdt,
                Email: nv.email,
                'Địa Chỉ': nv.diaChi,
                'Trạng Thái': nv.trangThai === 1 ? 'Đang Làm Việc' : 'Đã Nghỉ Việc'
            })));

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Nhân Viên");
            XLSX.writeFile(wb, "danh_sach_nhan_vien.xlsx");
        } catch (error) {
            console.log("Lỗi khi xuất file Excel:", error);
        }
    };
    const openDialog = (email) => {
        setIsDialogOpen(true);
        setNvEmail(email);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    const handleResetPassword = async (email) => {
        if (!email) {
            setSnackbar({
                open: true,
                message: "Email không hợp lệ.",
                severity: "error",
            });
            return;
        }

        setLoading(true);
        try {
            await sentEmailForgotPassword(email);
            setSnackbar({
                open: true,
                message: "Email reset mật khẩu đã được gửi!",
                severity: "success",
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Có lỗi xảy ra khi gửi email.",
                severity: "error",
            });
        } finally {
            setLoading(false);
            setIsDialogOpen(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };


    return (
        <MainCard style={{ textAlign: "center" }}>
            <Box
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 8px rgba(0.3, 0.3, 0.2, 0.3)',
                    borderRadius: '8px',
                    p: 3,
                    mb: 3,
                    width: '100%',
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Tìm Kiếm
                        </FormLabel>
                        <TextField
                            label="Tìm kiếm theo mã, tên, email, số điện thoại"
                            value={searchKeyWord}
                            onChange={handleSearchKeyWord}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Giới Tính
                        </FormLabel>
                        <FormControl fullWidth>
                            <InputLabel id="gender-select-label">-- Chọn giới tính --</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                id="gender-select"
                                value={selectGioiTinh}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value=""><em>-- Chọn giới tính --</em></MenuItem>
                                <MenuItem value={1}>Nam</MenuItem>
                                <MenuItem value={0}>Nữ</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Trạng Thái
                        </FormLabel>
                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                                row
                                value={searchRadio}
                                onChange={handleRadioChange}
                            >
                                {statuses.map((status) => (
                                    <FormControlLabel
                                        key={status.id}
                                        value={status.id}
                                        control={<Radio />}
                                        label={status.name}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        position: 'fixed',
                        top: 350,
                        right: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 1300,
                    }}
                >
                    <Fab
                        color="primary"
                        aria-label="add"
                        title="Thêm Nhân Viên"
                        sx={{
                            height: '60px',
                            width: '60px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            boxShadow: '0px 8px 15px rgba(0, 123, 255, 0.3)',
                            transition: 'all 0.3s ease',
                            marginBottom: '10px',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                                boxShadow: '0px 15px 20px rgba(0, 86, 179, 0.4)',
                                transform: 'translateY(-3px)',
                            },
                            '&:active': {
                                backgroundColor: '#004080',
                                boxShadow: '0px 5px 10px rgba(0, 64, 128, 0.2)',
                                transform: 'translateY(1px)',
                            },
                        }}
                        onClick={handleNavigate}
                    >
                        <AddIcon sx={{ fontSize: '30px' }} />
                    </Fab>

                    <Fab
                        color="primary"
                        aria-label="export"
                        title="Xuất danh sách nhân viên"
                        sx={{
                            height: '60px',
                            width: '60px',
                            backgroundColor: '#28a745',
                            color: '#fff',
                            boxShadow: '0px 8px 15px rgba(40, 167, 69, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#218838',
                                boxShadow: '0px 15px 20px rgba(33, 136, 56, 0.4)',
                                transform: 'translateY(-3px)',
                            },
                            '&:active': {
                                backgroundColor: '#1e7e34',
                                boxShadow: '0px 5px 10px rgba(30, 126, 52, 0.2)',
                                transform: 'translateY(1px)',
                            },
                        }}
                        onClick={handleExportExcel}
                    >
                        <InsertDriveFileIcon sx={{ fontSize: '30px' }} />
                    </Fab>
                </Box>
            </Box>



            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Hình Ảnh</TableCell>
                            <TableCell>Mã</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Ngày Sinh</TableCell>
                            <TableCell>Số Điện Thoại</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Địa Chỉ</TableCell>
                            <TableCell>Trạng Thái</TableCell>
                            <TableCell>Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nhanVien.length > 0 && nhanVien.map((nv, index) => {
                            const ngaySinh = formatDate(nv.ngaySinh);
                            return (
                                <TableRow key={nv.id}>
                                    <TableCell>{index + 1 + (currentPage - 1) * 5}</TableCell>
                                    <TableCell>
                                        <Avatar
                                            alt={nv.ten}
                                            src={nv.hinhAnh}
                                            sx={{ width: 100, height: 100 }}
                                        />
                                    </TableCell>
                                    <TableCell>{nv.ma}</TableCell>
                                    <TableCell>{nv.ten}</TableCell>
                                    <TableCell>{ngaySinh}</TableCell>
                                    <TableCell>{nv.sdt}</TableCell>
                                    <TableCell>{nv.email}</TableCell>
                                    <TableCell>{nv.diaChi}</TableCell>
                                    <TableCell>{getStatusNhanVien(nv.trangThai)}</TableCell>
                                    <TableCell>
                                        <Button className="btn btn-link" title="Sửa Nhân Viên">
                                            <IconEdit stroke={2} onClick={() => handleEdit(nv.id)} />
                                        </Button>

                                        <Switch
                                            checked={nv.trangThai === 1}
                                            onChange={() => handleSwitchChange(nv.id, nv.trangThai)}
                                            color="primary"
                                            title="Trạng thái nhân viên"
                                        />
                                        <Button
                                            title="Cấp lại mật khẩu cho nhân viên"
                                            onClick={() => openDialog(nv.email)} 
                                            variant="text"
                                            sx={{ minWidth: 0, padding: 0 }}
                                        >
                                            <KeyIcon sx={{ fontSize: 30, color: 'green' }} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={totalElement}
                rowsPerPage={filter.size}
                page={filter.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog
                open={confirmOpen}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Xác nhận thay đổi trạng thái"}</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn {deleteIdStatus === 0 ? 'xóa' : 'khôi phục'} nhân viên này không?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                        {deleteIdStatus === 0 ? 'Xóa' : 'Khôi phục'}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Dialog Xác Nhận */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Xác nhận cấp lại mật khẩu</DialogTitle>
                <DialogContent>
                    {nvEmail ? (
                        <Typography>
                            Bạn có chắc chắn muốn cấp lại mật khẩu cho nhân viên <strong>{nvEmail}</strong> không?
                        </Typography>
                    ) : (
                        <Typography color="error">
                            Không thể lấy thông tin email của nhân viên. Vui lòng kiểm tra lại dữ liệu.
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button onClick={() => handleResetPassword(nvEmail)}>Xác nhận</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Thông Báo */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </MainCard>
    );
};

export default DanhSachNhanVien;
