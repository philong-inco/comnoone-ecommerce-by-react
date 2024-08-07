import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
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
    Chip
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { searchNhanVienKeyWord, getAll, searchTrangThai, deleteNhanVien, rollBackStatus, searchGioiTinh, searchYearOfEmplpyee } from 'services/admin/employee/employeeService';
import { IconEdit } from '@tabler/icons-react';

const DanhSachNhanVien = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [searchRadio, setSearchRadio] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteIdStatus, setDeleteIdStatus] = useState(null);
    const [nhanVien, setNhanVien] = useState([]);
    const [selectGioiTinh, setSelectGioiTinh] = useState('');
    const [searchYear, setSearchYear] = useState('');

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
            } else if (searchYear !== '') {
                result = await searchYearOfEmplpyee(currentPage - 1, searchYear);
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

    useEffect(() => {
        fetchNhanVien();
    }, [currentPage, searchKeyWord, searchRadio, selectGioiTinh, searchYear]);

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
        setSearchYear('');
    };

    const handleRadioChange = (event) => {
        setSearchRadio(event.target.value);
        setCurrentPage(1);
        setSearchKeyWord('');
        setSelectGioiTinh('');
        setSearchYear('');
    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectGioiTinh(value);
        setCurrentPage(1);
        setSearchKeyWord('');
        setSearchYear('');
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

    // Tạo danh sách năm từ năm hiện tại - 100 đến năm hiện tại
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(101), (_, index) => currentYear - index);

    return (
        <MainCard style={{ textAlign: "center" }} title="Danh Sách Nhân Viên">
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                p={2}
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 8px rgba(0.3, 0.3, 0.2, 0.3)',
                    borderRadius: '8px',
                }}
            >
                <Box flex={1} mr={2}>
                    <form onSubmit={handleSearch}>
                        <FormLabel component="legend">Tìm Kiếm</FormLabel>
                        <TextField
                            label="Tìm kiếm"
                            value={searchKeyWord}
                            onChange={(e) => setSearchKeyWord(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                    </form>
                </Box>
                <Box flex={0.5} mx={2}>
                    <FormLabel component="legend">Giới Tính</FormLabel>

                    <FormControl fullWidth margin="dense">
                        <InputLabel id="gender-select-label">-- Chọn giới tính --</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            value={selectGioiTinh}
                            label="Giới tính"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value=""><em>-- Chọn giới tính --</em></MenuItem>
                            <MenuItem value={1}>Nam</MenuItem>
                            <MenuItem value={0}>Nữ</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box flex={0.5} mx={2}>
                    <FormLabel component="legend">Năm Sinh</FormLabel>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="year-select-label">-- Chọn năm sinh --</InputLabel>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            value={searchYear}
                            label="Năm Sinh"
                            onChange={handleYearChange}
                        >
                            <MenuItem value=""><em>-- Chọn năm sinh --</em></MenuItem>
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box flex={1} ml={2}>
                    <FormControl component="fieldset" fullWidth margin="normal">
                        <FormLabel component="legend">Trạng thái</FormLabel>
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
                </Box>
            </Box>

            <Button variant="contained" style={{ marginLeft: "85%", marginBottom: "10px" }} color="secondary" onClick={handleNavigate}>
                + Thêm Nhân Viên
            </Button>
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
                                    <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
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
