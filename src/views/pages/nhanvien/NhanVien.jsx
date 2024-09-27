import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
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
    Grid
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { searchNhanVienKeyWord, getAll, searchTrangThai, deleteNhanVien, rollBackStatus, searchGioiTinh, searchYearOfEmplpyee, getDanhSachNhanVien } from 'services/admin/employee/employeeService';
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

    const statuses = [
        { id: '', name: 'Tất Cả' },
        { id: '0', name: 'Đã Nghỉ Việc' },
        { id: '1', name: 'Đang Làm Việc' }
    ];

    const navigate = useNavigate();

    const fetchNhanVien = async () => {
        try {
            let result;
            if (searchKeyWord) {
                result = await searchNhanVienKeyWord(currentPage - 1, searchKeyWord);
            } else if (searchRadio) {
                result = await searchTrangThai(currentPage - 1, searchRadio);
            } else if (selectGioiTinh !== '') {
                result = await searchGioiTinh(currentPage - 1, selectGioiTinh);
            } else {
                result = await getAll(currentPage - 1);
            }
            setNhanVien(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
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
    }, [currentPage, searchKeyWord, searchRadio, selectGioiTinh]);

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

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(allNhanVien.map((nv, index) => ({
            STT: index + 1 + (currentPage - 1) * 10,
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
    };
    return (
        <MainCard style={{ textAlign: "center" }} title="Danh Sách Nhân Viên">
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
                        bottom: 16,
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
                                        <Button className="btn btn-link">
                                            <IconEdit stroke={2} onClick={() => handleEdit(nv.id)} />
                                        </Button>
                                        <Switch
                                            checked={nv.trangThai === 1}
                                            onChange={() => handleSwitchChange(nv.id, nv.trangThai)}
                                            color="primary"
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
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
        </MainCard>
    );
};

export default DanhSachNhanVien;
