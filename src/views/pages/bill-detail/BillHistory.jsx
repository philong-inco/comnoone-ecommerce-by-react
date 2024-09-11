import React, { useState } from 'react';
import {
  Button,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography
} from '@mui/material';
import { getStatusBillHistory, getStatusBillHistoryColor } from 'utils/billUtil/billStatus';
import { updateStatusByCode } from 'services/admin/bill/billService';
import { useParams } from 'react-router-dom';

function BillHistory(props) {
  const { id } = useParams();
  const { billHistory, handleLoading, bill } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const columns = [
    { id: 'ngayTao', label: 'Thời gian' },
    { id: 'nguoiSua', label: 'Người chỉnh sửa' },
    { id: 'trangThai', label: 'Trạng Thái' },
    { id: 'ghiChuChoCuaHang', label: 'Ghi chú của hàng' },
    { id: 'ghiChuChoKhachHang', label: 'Ghi chú khách hàng' }
  ];

  const handleCancelled = async () => {
    const response = await updateStatusByCode(id, 'HUY');
    if (response.status_code == 204) {
      handleLoading();
      alert(`Thông báo : Hủy hóa đơn ${id} thành công`);
    }
    console.log(response.status_code);
  };

  return (
    <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 1, borderRadius: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button variant="contained" color="error" onClick={handleCancelled} disabled={bill.trangThai === 'HUY'} sx={{ marginRight: 2 }}>
            HỦY
          </Button>
          <Button variant="contained">XÁC NHẬN</Button>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ marginRight: 2 }}>
            IN HÓA ĐƠN
          </Button>
          <Button variant="contained" sx={{ marginRight: 2 }}>
            IN PHIẾU GIAO HÀNG
          </Button>

          <Button variant="contained" color="warning" onClick={handleOpenDialog}>
            CHI TIẾT{' '}
          </Button>
        </Grid>
      </Grid>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            Chi tiết lịch sử thay đổi hóa đơn : <strong>{id}</strong>
          </Typography>
          <Button onClick={handleCloseDialog}>Đóng</Button>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {billHistory.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.ngayTao}</TableCell>
                    <TableCell>{row.nguoiSua}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusBillHistory(row.trangThai)}
                        sx={{ backgroundColor: getStatusBillHistoryColor(row.trangThai), color: '#fff' }}
                      />
                    </TableCell>
                    <TableCell>{row.ghiChuChoCuaHang}</TableCell>
                    <TableCell>{row.ghiChuChoKhachHang}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default BillHistory;
