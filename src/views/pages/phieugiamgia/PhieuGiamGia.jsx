import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radio, FormControlLabel, RadioGroup, FormLabel, FormControl,
  TextField, Grid, IconButton, Tooltip, Box, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { filterCoupons, deletedCoupons } from 'services/admin/coupons/couponsService';
import DeleteIcon from '@mui/icons-material/Delete';


function PhieuGiamGia() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [danhSachPhieuGiamGia, setDanhSachPhieuGiamGia] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [phamViApDung, setPhamViApDung] = useState('');
  const [loaiGiamGia, setLoaiGiamGia] = useState('');
  const [size, setSize] = useState(5);
  const [ma, setMa] = useState('');
  const [trangThai, setTrangThai] = useState('');
  const [loaiPhieu, setLoaiPhieu] = useState('');
  const [ngayBatDau, setNgayBatDau] = useState(null);
  const [ngayHetHan, setNgayHetHan] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Trạng thái mở hộp thoại xác nhận
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const navigate = useNavigate();

  
  const fetchApi = async (currentPage, size) => {
    try {
      let filterString = `(ma ~~ '${ma}')`;
      if (phamViApDung) {
        filterString += ` and phamViApDung = ${phamViApDung}`;
      }
      if (trangThai) {
        filterString += ` and trangThai = ${trangThai}`;
      }
      if (loaiGiamGia) {
        filterString += ` and loaiGiamGia = ${loaiGiamGia}`;
      }
      if (ngayBatDau && ngayHetHan) {
        filterString += ` and ngayBatDau >= '${ngayBatDau.format('YYYY-MM-DD')}' and ngayHetHan <= '${ngayHetHan.format('YYYY-MM-DD')}'`;
      }
  
      const response = await filterCoupons(currentPage, size, filterString);
      console.log(response.data.meta);  // Debug response
      if (response.status_code === 200) {
        setDanhSachPhieuGiamGia(response.data.result);
        setTotalPages(response.data.meta.pages);  // Cập nhật đúng số trang
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchApi(currentPage, size);
    const intervalId = setInterval(() => {
      fetchApi(currentPage, size);
    }, 2000); // 2 seconds
    return () => clearInterval(intervalId);
  }, [currentPage, size, ma, phamViApDung, loaiGiamGia, trangThai, ngayBatDau, ngayHetHan]);

  useEffect(() => {
    fetchApi(currentPage, size);
  }, [currentPage, size, ma, phamViApDung, loaiGiamGia, trangThai, ngayBatDau, ngayHetHan]);

  const statuses = [
    { id: 0, name: 'Chưa áp dụng', color: 'gray' },
    { id: 1, name: 'Đang áp dụng', color: 'green' },
    { id: 2, name: 'Đã hết hạn', color: 'red' },
    { id: 3, name: 'Đã hủy', color: '#FFA500'  },
  ];

  const resetFilters = () => {
    setPhamViApDung('');
    setLoaiGiamGia('');
    setMa('');
    setTrangThai('');
    setNgayBatDau(null);
    setNgayHetHan(null);
  };

  const handleSearchChange = (e) => {
    setMa(e.target.value);
    resetFilters(); 
  };

  const handleLoaiGiamGiaChange = (e) => {
    setLoaiGiamGia(e.target.value);
    resetFilters();
  };

  const handlePhamViFChange = (e) => {
    setPhamViApDung(e.target.value);
    resetFilters();
  };

  const handleDateChange = (name, value) => {
    if (name === 'ngayBatDau') {
      setNgayBatDau(value);
    } else if (name === 'ngayHetHan') {
      setNgayHetHan(value);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getStatusColor = (statusId) => {
    const status = statuses.find((s) => s.id === statusId);
    return status ? status.color : 'gray';
  };

  const getStatusName = (statusId) => {
    const status = statuses.find((s) => s.id === statusId);
    return status ? status.name : 'Không xác định';
  };
  
  const handleNavigate = () => {
    navigate('/phieugiamgia/cauhinhphieugiamgia');
  };

  const handleEdit = (id) => {
    navigate(`/phieugiamgia/cauhinhphieugiamgia/${id}`);
  };

  const handleViewCoupon = (id) => {
    navigate(`/phieugiamgia/chitietphieugiamgia/${id}`);
  };

  const handleOpenConfirmDialog = (id) => {
    setSelectedCouponId(id); 
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false); 
    setSelectedCouponId(null); 
  };

  const handleDelete = async () => {
    try {
      debugger;
      const response = await deletedCoupons(selectedCouponId); 
      if (response.trangThai === 3) {
        setSnackbarMessage('Phiếu đã được hủy thành công!');
        setSnackbarSeverity('success');
        fetchApi(currentPage, 5); 
      } else {
        setSnackbarMessage('Hủy phiếu thất bại.');
        setSnackbarSeverity('error');
        console.log(error);
      }
    } catch (error) {
      setSnackbarMessage('Đã xảy ra lỗi.');
      setSnackbarSeverity('error');
    }
    setOpenSnackbar(true);
    handleCloseConfirmDialog(); 
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {/* Bộ lọc */}
        <Box sx={{ backgroundColor: '#f0f0f0', p: 2, borderRadius: 2, marginBottom: 2 }}>
          <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tìm kiếm theo mã"
                  placeholder="Tìm kiếm theo mã"
                  fullWidth
                  value={ma}  // Sửa lại giá trị thành 'ma'
                  onChange={(e) => setMa(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="Ngày bắt đầu"
                  value={ngayBatDau}
                  onChange={(date) => handleDateChange('ngayBatDau', date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="Ngày kết thúc"
                  value={ngayHetHan}
                  onChange={(date) => handleDateChange('ngayHetHan', date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Phạm vi áp dụng</FormLabel>
                  <RadioGroup row value={phamViApDung} onChange={(e) => setPhamViApDung(e.target.value)}>
                    <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                    <FormControlLabel value="1" control={<Radio />} label="Công khai" />
                    <FormControlLabel value="2" control={<Radio />} label="Riêng tư" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Loại phiếu</FormLabel>
                  <RadioGroup row value={loaiGiamGia} onChange={(e) => setLoaiGiamGia(e.target.value)}>
                    <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                    <FormControlLabel value="1" control={<Radio />} label="%" />
                    <FormControlLabel value="2" control={<Radio />} label="VND" />
                  </RadioGroup>
                </FormControl>
                <Fab
                  color="primary"
                  aria-label="add"
                  sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                  }}
                  onClick={handleNavigate}
                >
                  <AddIcon />
                </Fab>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </LocalizationProvider>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã phiếu</TableCell>
              <TableCell>Tên phiếu</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ngày kết thúc</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {danhSachPhieuGiamGia.length > 0 ? (
              danhSachPhieuGiamGia.map((phieu, index) => (
                <TableRow key={index}>
                  <TableCell>{phieu.ma}</TableCell>
                  <TableCell>{phieu.ten}</TableCell>
                  <TableCell>{phieu.ngayBatDau}</TableCell>
                  <TableCell>{phieu.ngayHetHan}</TableCell>
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
                    {/* Hiển thị nút chỉnh sửa và hủy chỉ khi trạng thái là 0 */}
                    {phieu.trangThai === 0 && (
                      <>
                        <IconButton
                          color="secondary"
                          onClick={() => handleEdit(phieu.id)}
                        >
                          <Tooltip title="Chỉnh sửa">
                            <EditIcon />
                          </Tooltip>
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleOpenConfirmDialog(phieu.id)}
                        >
                          <Tooltip title="Hủy phiếu">
                            <DeleteIcon />
                          </Tooltip>
                        </IconButton>
                      </>
                    )}
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">Không có dữ liệu</TableCell>
              </TableRow>
            )}
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

      {/* Snackbar component */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
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

export default PhieuGiamGia;
