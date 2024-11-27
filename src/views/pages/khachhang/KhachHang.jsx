import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAll,
  getSearchKeyWord,
  getSearchGioiTinh,
  getSelectHangKhachHang,
  getDanhSachKhachHang
} from 'services/admin/customer/customerService.js';
import { IconEdit } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/Add';
import * as XLSX from 'xlsx';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
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
  Avatar,
  FormLabel,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Select,
  MenuItem,
  Grid,
  TablePagination,
  Fab
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
const KhachHang = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElement, setTotalElement] = useState(0);
  const [khachhang, setKhachHang] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const [selectHangKhachHang, setSelectHangKhachHang] = useState('');
  const [getAllDanhSach, setAllDanhSach] = useState('');
  const [filter, setFilter] = useState({
    page: 0,
    size: 5
  });

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
        result = await getSearchKeyWord(filter.page, searchKeyWord);
      } else if (searchRadio !== '') {
        result = await getSearchGioiTinh(filter.page, searchRadio);
      } else if (selectHangKhachHang !== '') {
        result = await getSelectHangKhachHang(filter.page, selectHangKhachHang);
      } else {
        result = await getAll(filter.page);
      }
      setKhachHang(result.content);
      setTotalElement(result.totalElements);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKhachHang();
  }, [filter.page, filter.size, searchKeyWord, searchRadio, selectHangKhachHang]);

  useEffect(() => {
    getAllDanhSachKhachHang();
  }, []);

  const getAllDanhSachKhachHang = async () => {
    try {
      const result = await getDanhSachKhachHang();
      setAllDanhSach(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setFilter((prev) => ({
      ...prev,
      page: newPage
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setFilter({
      ...filter,
      size: parseInt(event.target.value, 10),
      page: 0
    });
  };

  const getGioiTinhKhachHang = (sex) => {
    switch (sex) {
      case 0:
        return 'Nữ';
      case 1:
        return 'Nam';
      default:
        return 'Không xác định';
    }
  };

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
            color="default"
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
            color="default"
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
            color="default"
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
            color="default"
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
            color="default"
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
            color="default"
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

  const handleNavigate = () => {
    navigate('/khachhang/khachhangconfiguration');
  };

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
    const ws = XLSX.utils.json_to_sheet(
      getAllDanhSach.map((kh, index) => ({
        STT: index + 1 + (currentPage - 1) * 10,
        'Hình Ảnh': kh.hinhAnh,
        Mã: kh.ma,
        Tên: kh.ten,
        'Ngày Sinh': formatDate(kh.ngaySinh),
        'Số Điện Thoại': kh.sdt,
        'Giới Tính': kh.gioiTinh == 1 ? 'Nam' : 'Nữ',
        Email: kh.email,
        'Địa Chỉ': kh.diaChi
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Danh Sách Khách Hàng');
    XLSX.writeFile(wb, 'danh_sach_khach_hang.xlsx');
  };

  return (
    <MainCard style={{ textAlign: 'center' }}>
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
        <Grid container spacing={2} alignItems="center">
          {/* Trường Tìm Kiếm */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel
                  component="legend"
                  sx={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap', // Ngăn chữ xuống dòng
                    width: '50%' // Đặt chiều rộng cho label
                  }}
                >
                  Tìm kiếm
                </FormLabel>
                <TextField
                  value={searchKeyWord}
                  onChange={(e) => setSearchKeyWord(e.target.value)}
                  variant="outlined"
                  placeholder="Nhập tên khách hàng"
                  fullWidth
                />
              </Box>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <Box display="flex" alignItems="center">
                <FormLabel
                  component="legend"
                  sx={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    width: '30%' // Đặt chiều rộng cho label để phù hợp
                  }}
                >
                  Giới Tính
                </FormLabel>
                <RadioGroup
                  row
                  value={searchRadio}
                  onChange={handleRadioChange}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start', // Căn giữa các nút radio
                    flexGrow: 1,
                    marginLeft: '10px' // Khoảng cách giữa label và radio
                  }}
                >
                  {statuses.map((status) => (
                    <FormControlLabel key={status.id} value={status.id} control={<Radio />} label={status.name} sx={{ marginRight: 2 }} />
                  ))}
                </RadioGroup>
              </Box>
            </FormControl>
          </Grid>

          {/* Trường Hạng Khách Hàng */}
          {/* <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel
                  component="legend"
                  sx={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap', // Ngăn chữ xuống dòng
                    width: '50%' // Đặt chiều rộng cho label
                  }}
                >
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
                  <MenuItem value="">
                    <em>-- Chọn hạng khách hàng --</em>
                  </MenuItem>
                  <MenuItem value={0}>Đồng</MenuItem>
                  <MenuItem value={1}>Bạc</MenuItem>
                  <MenuItem value={2}>Vàng</MenuItem>
                  <MenuItem value={3}>Bạch Kim</MenuItem>
                  <MenuItem value={4}>Kim Cương</MenuItem>
                </Select>
              </Box>
            </FormControl>
          </Grid> */}
        </Grid>

        <Box
          sx={{
            position: 'fixed',
            top: 350,
            right: 16,
            zIndex: 1300
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            title="Thêm khách hàng"
            sx={{
              height: '60px',
              width: '60px',
              backgroundColor: '#007bff',
              color: '#fff',
              boxShadow: '0px 8px 15px rgba(0, 123, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#0056b3',
                boxShadow: '0px 15px 20px rgba(0, 86, 179, 0.4)',
                transform: 'translateY(-3px)'
              },
              '&:active': {
                backgroundColor: '#004080',
                boxShadow: '0px 5px 10px rgba(0, 64, 128, 0.2)',
                transform: 'translateY(1px)'
              }
            }}
            onClick={handleNavigate}
          >
            <AddIcon sx={{ fontSize: '30px' }} />
          </Fab>
        </Box>

        <Box
          sx={{
            position: 'fixed',
            top: 420,
            right: 16,
            zIndex: 1300
          }}
        >
          <Fab
            color="primary"
            aria-label="export"
            title="Xuất danh sách khách hàng"
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
                transform: 'translateY(-3px)'
              },
              '&:active': {
                backgroundColor: '#1e7e34',
                boxShadow: '0px 5px 10px rgba(30, 126, 52, 0.2)',
                transform: 'translateY(1px)'
              }
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
              <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>STT</TableCell>
              <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>Hình Ảnh</TableCell>
              <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>Mã Khách Hàng</TableCell>
              <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>Tên Khách Hàng</TableCell>
              {/* <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>Hạng Khách Hàng</TableCell> */}
              <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>Ngày Sinh</TableCell>
              <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>Email</TableCell>
              <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>Số Điện Thoại</TableCell>
              <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>Giới Tính</TableCell>
              <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {khachhang.length > 0 &&
              khachhang.map((kh, index) => {
                const ngaySinh = formatDate(kh.ngaySinh);
                const { text: hangText, color: hangColor } = getHangKhachHang(kh.hangKhachHang);
                return (
                  <TableRow key={kh.id}>
                    <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>{index + 1 + (currentPage - 1) * 5}</TableCell>
                    <TableCell sx={{ fontSize: '12px', padding: '8px', textAlign: 'center' }}>
                      <Avatar alt={kh.ten} src={kh.hinhAnh} sx={{ width: 100, height: 100 }} />
                    </TableCell>
                    <TableCell sx={{  padding: '8px', textAlign: 'center' }}>{kh.ma}</TableCell>
                    <TableCell sx={{  padding: '8px', textAlign: 'center' }}>{kh.ten}</TableCell>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{ngaySinh}</TableCell>
                    <TableCell sx={{  padding: '8px', textAlign: 'center' }}>{kh.email}</TableCell>
                    <TableCell sx={{  padding: '8px', textAlign: 'center' }}>{kh.sdt}</TableCell>
                    <TableCell sx={{  padding: '8px', textAlign: 'center' }}>{getGioiTinhKhachHang(kh.gioiTinh)}</TableCell>
                    <TableCell sx={{  padding: '8px', textAlign: 'center' }}>
                      <Button className="btn btn-link">
                        <IconEdit stroke={2} onClick={() => handleEdit(kh.id)} />
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
    </MainCard>
  );
};

export default KhachHang;
