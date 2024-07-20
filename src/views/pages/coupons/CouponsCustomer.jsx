import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Pagination
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { deleteKhPGG, getKHPGGById } from 'services/admin/coupons/couponsService';

function CouponsCustomer(props) {
  let sttCounter = 0;
  const { id } = props;
  const [customerCoupons, setCustomerCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const fetchApi = async (page = currentPage, size = size) => {
    setLoading(true);
    const response = await getKHPGGById(id, page, size);
    if (response.status_code === 200) {
      setCustomerCoupons(response.data.result);
      setCurrentPage(response.data.meta.page + 1);
      setSize(response.data.meta.pageSize);
      setTotalItems(response.data.meta.total);
    } else {
      console.error('Failed to fetch data from API');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApi(currentPage, size);
  }, [currentPage, size, refreshData]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (couponId) => {
    setSelectedCouponId(couponId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const response = await deleteKhPGG(selectedCouponId, 3);
    if (response.status === 204) {
      setRefreshData(!refreshData);
      console.log('Vào xóa');
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedCouponId(null);
  };

  const columns = [
    { title: 'STT', key: 'STT', render: () => <span>{++sttCounter}</span> },
    { title: 'Mã Phiếu', key: 'maPhieu', render: (record) => record.maPhieu },
    { title: 'Mã Khách Hàng', key: 'maKhachHang', render: (record) => record.maKhachHang || 'N/A' },
    { title: 'Email', key: 'email', render: (record) => record.email || 'N/A' },
    { title: 'Số Điện Thoại', key: 'sdt', render: (record) => record.sdt || 'N/A' },
    {
      title: 'Trạng Thái',
      key: 'trangThai',
      render: (record) => {
        let color = '';
        let status = '';
        switch (record.trangThai) {
          case 0:
            status = 'Chưa sử dụng';
            color = 'default';
            break;
          case 1:
            status = 'Đã sử dụng';
            color = 'success';
            break;
          case 2:
            status = 'Hết hạn';
            color = 'warning';
            break;
          case 3:
            status = 'Hủy';
            color = 'error';
            break;
          default:
            status = 'Unknown';
            color = 'black';
            break;
        }
        return <Typography color={color}>{status}</Typography>;
      }
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (record) => (
        <Tooltip title="Xóa">
          <span>
            <IconButton color="error" disabled={record.trangThai === 3} onClick={() => handleDeleteClick(record.id)}>
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      )
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', p: 2, borderRadius: 5 }}>
      <h1>{id}</h1>
      <Typography variant="h4">Tất cả khách hàng có phiếu giảm giá</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerCoupons.map((record) => (
              <TableRow key={record.id}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{column.render(record)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Select value={size} onChange={handleSizeChange}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        <Pagination count={Math.ceil(totalItems / size)} page={currentPage} onChange={handlePageChange} showFirstButton showLastButton />
      </Box>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Bạn có chắc chắn muốn xóa phiếu này?</DialogTitle>
        <DialogContent>
          <Typography>ID: {selectedCouponId}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      {loading && <CircularProgress />}
    </Box>
  );
}

export default CouponsCustomer;
