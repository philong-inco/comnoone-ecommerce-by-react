import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, getSearchKeyWord, getSearchGioiTinh, getSelectHangKhachHang } from 'services/admin/customer/customerService.js';
import { IconEdit } from '@tabler/icons-react';

import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    Avatar,
    FormLabel,
    TextField,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const KhachHang = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [khachhang, setKhachHang] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [searchRadio, setSearchRadio] = useState('');
    const [selectHangKhachHang, setSelectHangKhachHang] = useState('');
    const statuses = [
        { id: '1', name: 'Nam' },
        { id: '0', name: 'Nữ' },
        { id: '', name: 'Tất cả' }
    ];
    const navigate = useNavigate();

    const fetchKhachHang = async () => {
        try {
            let result;
            if (searchKeyWord) {
                result = await getSearchKeyWord(currentPage - 1, searchKeyWord);
            } else if (searchRadio !== '') {
                result = await getSearchGioiTinh(currentPage - 1, searchRadio);
            } else if (selectHangKhachHang !== '') {
                result = await getSelectHangKhachHang(currentPage - 1, selectHangKhachHang);
            } else {
                result = await getAll(currentPage-1);
            }
            setKhachHang(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchKhachHang();
    }, [currentPage, searchKeyWord, searchRadio, selectHangKhachHang]);

    const getGioiTinhKhachHang = (sex) => {
        switch (sex) {
            case 0:
                return 'Nữ';
            case 1:
                return 'Nam';
            default:
                return 'Không xác định';
        }
    }

    const getHangKhachHang = (hang) => {
        const chipStyles = {
            width: '100px',
            textAlign: 'center'
        };

        switch (hang) {
            case 0:
                return (
                    <Chip
                        label="Đồng"
                        color='default'
                        sx={{
                            ...chipStyles,
                            backgroundColor: '#CD853F',
                            color: '#FFFFFF'
                        }}
                    />
                );
            case 1:
                return (
                    <Chip
                        label="Bạc"
                        color='default'
                        sx={{
                            ...chipStyles,
                            backgroundColor: '#C0C0C0',
                            color: '#000000'
                        }}
                    />
                );
            case 2:
                return (
                    <Chip
                        label="Vàng"
                        color='default'
                        sx={{
                            ...chipStyles,
                            backgroundColor: '#FFD700',
                            color: '#000000'
                        }}
                    />
                );
            case 3:
                return (
                    <Chip
                        label="Bạch Kim"
                        color='default'
                        sx={{
                            ...chipStyles,
                            backgroundColor: '#E5E4E2',
                            color: '#000000'
                        }}
                    />
                );
            case 4:
                return (
                    <Chip
                        label="Kim Cương"
                        color='default'
                        sx={{
                            ...chipStyles,
                            backgroundColor: '#363636',
                            color: '#FFFFFF'
                        }}
                    />
                );
            default:
                return (
                    <Chip
                        label="Không xác định"
                        color='default'
                        sx={{
                            ...chipStyles,
                            backgroundColor: '#FFFFFF',
                            color: '#000000'
                        }}
                    />
                );
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const handleEdit = (id) => {
        navigate(`/khachhang/khachhangaddress/${id}`);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    }

    const handleNavigate = () => {
        navigate('/khachhang/khachhangconfiguration');
    }

    const handleSearchText = (event) => {
        event.preventDefault();
        setCurrentPage(1);
        setSearchRadio('');
    }

    const handleRadioChange = (event) => {
        debugger;
        setSearchRadio(event.target.value);
        setCurrentPage(1);
        setSearchKeyWord('');
        setSelectHangKhachHang('');
    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectHangKhachHang(value);
        setCurrentPage(1);
        setSearchKeyWord('');
        setSearchRadio('');

    };

    return (
        <MainCard style={{ textAlign: "center" }} title="Danh Sách Khách Hàng">
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                p={2}
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                }}
            >
                <Box
                    flex={1}
                    mr={2}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <form onSubmit={handleSearchText}>
                        <FormLabel component="legend" sx={{ mb: 1 }}>
                            Tìm kiếm
                        </FormLabel>
                        <TextField
                            label="Tìm kiếm"
                            value={searchKeyWord}
                            onChange={(e) => setSearchKeyWord(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            sx={{ mb: 1 }}
                        />
                    </form>
                </Box>
                <Box
                    flex={1}
                    ml={2}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <FormControl component="fieldset" fullWidth margin="normal">
                        <FormLabel component="legend" sx={{ mb: 1 }}>
                            Giới Tính
                        </FormLabel>
                        <RadioGroup
                            row
                            value={searchRadio}
                            onChange={handleRadioChange}
                            sx={{ alignItems: 'center', mb: 1 }}
                        >
                            {statuses.map((status) => (
                                <FormControlLabel
                                    key={status.id}
                                    value={status.id}
                                    control={<Radio />}
                                    label={status.name}
                                    sx={{ margin: '0 8px' }}
                                />
                            ))}
                        </RadioGroup>


                    </FormControl>
                </Box>

                <Box flex={1} mx={2}>
                    <FormLabel component="legend">Hạng Khách Hàng</FormLabel>

                    <FormControl fullWidth margin="dense">
                        <InputLabel id="gender-select-label">-- Chọn hạng khách hàng --</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            value={selectHangKhachHang}
                            label="Giới tính"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value=''><em>-- Chọn hạng khách hàng --</em></MenuItem>
                            <MenuItem value={0}>Đồng</MenuItem>
                            <MenuItem value={1}>Bạc</MenuItem>
                            <MenuItem value={2}>Vàng</MenuItem>
                            <MenuItem value={3}>Bạch Kim</MenuItem>
                            <MenuItem value={4}>Kim Cương</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Button variant="contained" style={{ marginLeft: "85%", marginBottom: "10px" }} color="secondary" onClick={handleNavigate}>
                + Thêm Khách Hàng
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Hình Ảnh</TableCell>
                            <TableCell align="center">Mã Khách Hàng</TableCell>
                            <TableCell align="center">Tên Khách Hàng</TableCell>
                            <TableCell align="center">Hạng Khách Hàng</TableCell>
                            <TableCell align="center">Ngày Sinh</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Số Điện Thoại</TableCell>
                            <TableCell align="center">Giới Tính</TableCell>
                            <TableCell align="center">Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            khachhang.length > 0 && khachhang.map((kh, index) => {
                                const ngaySinh = formatDate(kh.ngaySinh);
                                const { text: hangText, color: hangColor } = getHangKhachHang(kh.hangKhachHang);
                                return (
                                    <TableRow key={kh.id}>
                                        <TableCell align="center">{index + 1 + currentPage * 10}</TableCell>
                                        <TableCell align="center">
                                            <Avatar
                                                alt={kh.ten}
                                                src={kh.hinhAnh}
                                                sx={{ width: 100, height: 100 }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{kh.ma}</TableCell>
                                        <TableCell align="center">{kh.ten}</TableCell>
                                        <TableCell>{getHangKhachHang(kh.hangKhachHang)}</TableCell>
                                        <TableCell align="center">{ngaySinh}</TableCell>
                                        <TableCell align="center">{kh.email}</TableCell>
                                        <TableCell align="center">{kh.sdt}</TableCell>
                                        <TableCell align="center">{getGioiTinhKhachHang(kh.gioiTinh)}</TableCell>
                                        <TableCell align="center">
                                            <Button className="btn btn-link">
                                                <IconEdit stroke={2} onClick={() => handleEdit(kh.id)} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
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
        </MainCard>
    )
}

export default KhachHang;
