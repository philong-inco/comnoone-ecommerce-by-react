import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, getSearchKeyWord, getSearchGioiTinh, getSelectHangKhachHang } from 'services/admin/customer/customerService.js';
import { IconEdit } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
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
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';

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
        const ws = XLSX.utils.json_to_sheet(khachhang.map((kh, index) => ({
            STT: index + 1 + currentPage * 10,
            'Mã Khách Hàng': kh.ma,
            'Tên Khách Hàng': kh.ten,
            'Hạng Khách Hàng': getHangKhachHang(kh.hangKhachHang).props.label,
            'Ngày Sinh': formatDate(kh.ngaySinh),
            Email: kh.email,
            'Số Điện Thoại': kh.sdt,
            'Giới Tính': getGioiTinhKhachHang(kh.gioiTinh)
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Danh Sách Khách Hàng');
        XLSX.writeFile(wb, 'DanhSachKhachHang.xlsx');
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
                                <FormLabel component="legend" sx={{ mr: 2, whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                                    Tìm kiếm
                                </FormLabel>
                                <TextField
                                    value={searchKeyWord}
                                    onChange={(e) => setSearchKeyWord(e.target.value)}
                                    variant="outlined"
                                    placeholder="Nhập tên khách hàng"
                                />
                            </Box>
                        </FormControl>
                    </Grid>

                    <Box
                        sx={{
                            borderLeft: '1px solid black',
                            height: '40px',
                            mx: 3,
                            mt: 3,
                            alignSelf: 'center'
                        }}
                    />

                    <Grid item xs={3.5}>
                        <FormControl fullWidth margin="normal">
                            <Box display="flex" alignItems="center">
                                <FormLabel component="legend" sx={{ mr: 2, whiteSpace: 'nowrap', fontWeight: 'bold' }}>
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

                    <Box
                        sx={{
                            borderLeft: '1px solid black',
                            height: '40px',
                            mx: 3,
                            mt: 3,
                            alignSelf: 'center'
                        }}
                    />

                    <Grid item xs={3.5}>
                        <FormControl fullWidth margin="normal">
                            <Box display="flex" alignItems="center">
                                <FormLabel component="legend" sx={{ mr: 1.3, whiteSpace: 'nowrap', fontWeight: 'bold' }}>
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
                        color="secondary"
                        onClick={handleNavigate}
                    >
                        + Thêm Khách Hàng
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
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </MainCard>
    )
}

export default KhachHang;
