import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material'; // Add Switch import
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
    Pagination
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { searchNhanVienKeyWord, getAll, searchTrangThai, deleteNhanVien, rollBackStatus } from 'services/admin/employee/employeeService';
import { textAlign } from '@mui/system';

const DanhSachNhanVien = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [searchRadio, setSearchRadio] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteIdStatus, setDeleteIdStatus] = useState(null); // For holding the status change
    const [nhanVien, setNhanVien] = useState([]);
    const [statuses] = useState([
        { id: '', name: 'Tất Cả' },
        { id: '0', name: 'Đã Nghỉ Việc' },
        { id: '1', name: 'Đang Làm Việc' }
    ]);

    const navigate = useNavigate();

    const fetchNhanVien = async () => {
        try {
            let result;
            if (searchKeyWord) {
                result = await searchNhanVienKeyWord(currentPage, searchKeyWord);
            } else if (searchRadio) {
                result = await searchTrangThai(currentPage, searchRadio);
            } else {
                result = await getAll(currentPage);

                setTotalPages(result.totalPages);
            }
            setNhanVien(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNhanVien();
    }, [currentPage, searchKeyWord, searchRadio]);

    const getStatusNhanVien = (status) => {
        switch (status) {
            case 0:
                return 'Đã Nghỉ Việc';
            case 1:
                return 'Đang Làm Việc';
            default:
                return 'Chưa Xác Định';
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setCurrentPage(0);
        setSearchRadio('');
    };

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setSearchRadio(value);
        setCurrentPage(0);
        setSearchKeyWord('');
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
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
        setCurrentPage(value - 1);
    };

    const handleSwitchChange = (id, currentStatus) => {
        setDeleteId(id);
        setDeleteIdStatus(currentStatus === 1 ? 0 : 1);
        setConfirmOpen(true);
    };

    const handleNavigate = () => {
        navigate('/nhanvien/configuration');
    };

    return (
        <MainCard style={{ textAlign: "center" }} title="Danh Sách Nhân Viên">
            <Button variant="contained" style={{ marginLeft:"80%" , marginBottom: "10px"}} color="secondary" onClick={handleNavigate}>
                + Thêm Nhân Viên
            </Button>
            <Box display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                p={2}
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 8px rgba(0.2, 0.1, 0.2, 0.3)',
                    borderRadius: '8px',
                }}>

                <form onSubmit={handleSearch}>
                    <TextField
                        label="Tìm kiếm"
                        value={searchKeyWord}
                        onChange={(e) => setSearchKeyWord(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                </form>
                <FormControl component="fieldset" margin="normal">
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '1%' }}>STT</TableCell>
                            <TableCell>Mã</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Vai Trò</TableCell>
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
                                    <TableCell>{index + 1 + currentPage * 10}</TableCell>
                                    <TableCell>{nv.ma}</TableCell>
                                    <TableCell>{nv.ten}</TableCell>
                                    <TableCell>{nv.vaiTro}</TableCell>
                                    <TableCell>{ngaySinh}</TableCell>
                                    <TableCell>{nv.sdt}</TableCell>
                                    <TableCell>{nv.email}</TableCell>
                                    <TableCell>{nv.diaChi}</TableCell>
                                    <TableCell>{getStatusNhanVien(nv.trangThai)}</TableCell>
                                    <TableCell>
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
                    page={currentPage + 1}
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
