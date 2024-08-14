import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, getSearchKeyWord, getSearchGioiTinh, getSelectHangKhachHang, getDanhSachKhachHang } from 'services/admin/customer/customerService.js';
import { IconEdit } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/Add';
import * as XLSX from 'xlsx';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import Divider from '@mui/material/Divider';

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
    MenuItem,
    Grid,
    Typography
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
const KhachHang = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [khachhang, setKhachHang] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [searchRadio, setSearchRadio] = useState('');
    const [selectHangKhachHang, setSelectHangKhachHang] = useState('');
    const [getAllDanhSach, setAllDanhSach] = useState('');

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
                result = await getAll(currentPage - 1);
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

    useEffect(() => {
        getAllDanhSachKhachHang();
    }, [])

    const getAllDanhSachKhachHang = async () => {
        try {
            const result = await getDanhSachKhachHang();
            setAllDanhSach(result);
        } catch (error) {
            console.log(error);
        }
    }

    
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
        setCurrentPage(value);
    }

    const handleNavigate = () => {
        navigate('/khachhang/khachhangconfiguration');
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

    const handleExportExcel = () => {
        debugger;
        const ws = XLSX.utils.json_to_sheet(getAllDanhSach.map((kh, index) => ({
            STT: index + 1 + (currentPage - 1) * 10,
            'Hình Ảnh': kh.hinhAnh,
            'Mã': kh.ma,
            'Tên': kh.ten,
            'Ngày Sinh': formatDate(kh.ngaySinh),
            'Số Điện Thoại': kh.sdt,
            'Giới Tính' : kh.gioiTinh == 1 ? 'Nam' : 'Nữ',
            'Email': kh.email,
            'Địa Chỉ': kh.diaChi,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Khách Hàng");
        XLSX.writeFile(wb, "danh_sach_khach_hang.xlsx");
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
        width: '100%'
    }}
>
    <Grid container spacing={2} flex={4} alignItems="center">
        <Grid item xs={3}>
            <FormControl fullWidth margin="normal">
                <Box display="flex" alignItems="center">
                    <FormLabel component="legend" sx={{ mr: 5, whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                        Tìm kiếm
                    </FormLabel>
                    <TextField
                        value={searchKeyWord}
                        onChange={(e) => setSearchKeyWord(e.target.value)}
                        variant="outlined"
                        placeholder="Nhập tên khách hàng"
                        maxWidth
                    />
                </Box>
            </FormControl>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />

        <Grid item xs={3.5}>
            <FormControl fullWidth margin="normal">
                <Box display="flex" alignItems="center">
                    <FormLabel component="legend" sx={{ mr: 7, whiteSpace: 'nowrap', fontWeight: 'bold', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        Giới Tính
                    </FormLabel>
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
                                sx={{ margin: '7 8px' }}
                            />
                        ))}
                    </RadioGroup>
                </Box>
            </FormControl>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />

        <Grid item xs={3.5}>
            <FormControl fullWidth margin="normal">
                <Box display="flex" alignItems="center">
                    <FormLabel component="legend" sx={{ mr: 4, whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                        Hạng Khách Hàng
                    </FormLabel>
                    <Select
                        labelId="hang-khach-hang-label"
                        id="hang-khach-hang-select"
                        value={selectHangKhachHang}
                        onChange={handleSelectChange}
                        displayEmpty
                        fullWidth
                    >
                        <MenuItem value=''><em>-- Chọn hạng khách hàng --</em></MenuItem>
                        <MenuItem value={0}>Đồng</MenuItem>
                        <MenuItem value={1}>Bạc</MenuItem>
                        <MenuItem value={2}>Vàng</MenuItem>
                        <MenuItem value={3}>Bạch Kim</MenuItem>
                        <MenuItem value={4}>Kim Cương</MenuItem>
                    </Select>
                </Box>
            </FormControl>
        </Grid>
    </Grid>
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        ml={2}
    >
        <Button
            variant="contained"
            color="primary"
            onClick={handleNavigate}
            sx={{
                height: '45px',
                minWidth: '200px',
                padding: '8px 10px',
                borderRadius: '20px',
                backgroundColor: '#007bff',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '13px',
                boxShadow: '0px 8px 15px rgba(0, 123, 255, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
        >
            <AddIcon
                sx={{
                    position: 'absolute',
                    left: '16px',
                    backgroundColor: '#9c27b0',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5px',
                }}
            />
            <span style={{ marginLeft: '25px' }}>Thêm Khác Hàng</span>
        </Button>

        <Button
            variant="contained"
            color="primary"
            onClick={handleExportExcel}
            sx={{
                marginTop: '10px',
                height: '45px',
                minWidth: '200px',
                padding: '8px 10px',
                borderRadius: '20px',
                backgroundColor: '#28a745',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '13px',
                boxShadow: '0px 8px 15px rgba(40, 167, 69, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
        >
            <InsertDriveFileIcon
                sx={{
                    position: 'absolute',
                    left: '16px',
                    backgroundColor: '#ffffff',
                    color: '#28a745',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5px',
                }}
            />
            <span style={{ marginLeft: '25px' }}>Danh Sách Khách Hàng</span>
        </Button>
    </Box>
</Box>
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
                                        <TableCell align="center">{index + 1 + (currentPage - 1) * 5}</TableCell>
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
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </MainCard>
    )
}

export default KhachHang;
