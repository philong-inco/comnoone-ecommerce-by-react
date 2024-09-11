import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  TextField
} from '@mui/material';
import { getAllProduct } from 'services/admin/product/productService';
import { createSerialNumberSold } from 'services/admin/serialNumberSold/serialNumberSoldService';
import { Box } from '@mui/system';

function ProductList({ onProductSelected, handleLoading, handleLoadingTimeLine }) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchProduct = async () => {
    const response = await getAllProduct();
    if (response.code === 200) {
      setProducts(response.data);
    }
  };

  const handleSelect = async (productId) => {
    const data = {
      listSerialNumberId: [1, 2, 3, 4, 5, 6, 7, 8, 42, 41, 40, 39],
      billCode: id
    };

    const response = await createSerialNumberSold(data);
    if (response.status_code === 201) {
      handleLoading();
      handleLoadingTimeLine();
      setNotification({
        open: true,
        message: 'Thêm mới thành công',
        severity: 'success'
      });
      if (onProductSelected) {
        onProductSelected();
      }
    }
  };

  const handleOpenDialog = (product) => {
    // setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRows([]);
    setSelectedProduct(null);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((rowId) => rowId !== id) : [...prevSelected, id]));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Tìm kiếm</Typography>
        </Grid>
      </Grid>

      <TableContainer sx={{ maxHeight: '70vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Ảnh</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Mã</TableCell>
              <TableCell>Bàn phím</TableCell>
              <TableCell>CPU</TableCell>
              <TableCell>Màn hình</TableCell>
              <TableCell>Màu sắc</TableCell>
              <TableCell>RAM</TableCell>
              <TableCell>VGA</TableCell>
              <TableCell>Webcam</TableCell>
              <TableCell>Ổ cứng</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src="https://via.placeholder.com/50" alt="Product" width="50" />
                </TableCell>
                <TableCell>{product.sanPham}</TableCell>
                <TableCell>{product.ma}</TableCell>
                <TableCell>{product.banPhim}</TableCell>
                <TableCell>{product.cpu}</TableCell>
                <TableCell>{product.manHinh}</TableCell>
                <TableCell>{product.mauSac}</TableCell>
                <TableCell>{product.ram}</TableCell>
                <TableCell>{product.vga}</TableCell>
                <TableCell>{product.webcam}</TableCell>
                <TableCell>{product.ocung}</TableCell>
                <TableCell>
                  <Typography color="error">{parseInt(product.giaBan).toLocaleString()} VNĐ</Typography>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleOpenDialog(product)}>
                    Chọn
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            width: '500px'
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Danh sách serial</span>
            <TextField variant="outlined" size="small" label="Tìm kiếm" style={{ marginRight: '16px' }} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Chọn</TableCell>
                  <TableCell>Mã</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { id: 1, code: 'A001', status: 'Có sẵn' },
                  { id: 2, code: 'A002', status: 'Hết hàng' }
                ].map((row) => (
                  <TableRow key={row.id}>
                    <Checkbox checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} />
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button
            onClick={() => {
              console.log('Selected rows:', selectedRows);
              handleCloseDialog();
            }}
            variant="contained"
            color="primary"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={() => setNotification({ ...notification, open: false })}>
        <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default ProductList;
