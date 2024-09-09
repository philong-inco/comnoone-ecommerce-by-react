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
  Alert
} from '@mui/material';
import { getAllProduct } from 'services/admin/product/productService';
import { createSerialNumberSold } from 'services/admin/serialNumberSold/serialNumberSoldService';

function ProductList({ onProductSelected, handleLoading, handleLoadingTimeLine }) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const fetchProduct = async () => {
    const response = await getAllProduct();
    if (response.code === 200) {
      setProducts(response.data);
    }
  };

  const handleSelect = async (productId) => {
    const data = {
      idSanPham: productId,
      maHoaDon: id
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
                  <Button variant="contained" color="primary" onClick={() => handleSelect(product.id)}>
                    Chọn
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={() => setNotification({ ...notification, open: false })}>
        <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default ProductList;
