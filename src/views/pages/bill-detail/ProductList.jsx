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
  TextField,
  Chip,
  TablePagination,
  Pagination
} from '@mui/material';
import { getAllProduct } from 'services/admin/product/productService';
import { createSerialNumberSold } from 'services/admin/serialNumberSold/serialNumberSoldService';
import { Box } from '@mui/system';
import { getAllSerialNumberByProductId } from 'services/admin/serial-number/serialNumber';
import { getStatusSerialColor } from 'utils/serialUtil/serialUtil';

function ProductList({ onProductSelected, handleLoading, handleLoadingTimeLine, selectedSerialIds = [] }) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRows, setSelectedRows] = useState(selectedSerialIds);
  const [serials, setSerials] = useState([]);
  const [productId, setProductId] = useState(null);
  const [pageSerial, setPageSerial] = useState(1);
  const [sizeSerial, setSizeSerial] = useState(5);
  const [totalSerial, setTotalSerial] = useState(0);
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
  const fetchSerialNumberByProduct = async (productId, page, size) => {
    const response = await getAllSerialNumberByProductId(productId, page - 1, size);
    if (response.status_code === 200) {
      setSerials(response.data.result);
      setTotalSerial(response.data.meta.total);
      setPageSerial(response.data.meta.page + 1);
    }
  };
  const handleOpenDialog = (id) => {
    setProductId(id);
    fetchSerialNumberByProduct(id, pageSerial, 5);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRows([]);
    setPageSerial(1);
    setProductId(null);
    setSelectedProduct(null);
  };

  const handleSubmitSerials = async () => {
    const data = {
      billCode: id,
      listSerialNumberId: selectedRows
    };
    const response = await createSerialNumberSold(data);
    if (response.status_code === 201) {
      setOpenDialog(false);
      setSelectedRows([]);
      setPageSerial(1);
      setProductId(null);
      setSelectedProduct(null);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChangePageSerial = (newPage) => {
    setSelectedRows(selectedRows);
    setPageSerial(newPage);
    fetchSerialNumberByProduct(productId, newPage, sizeSerial);
  };

  const handleChangeSizeSerial = (event) => {
    setSizeSerial(parseInt(event.target.value, 10));
    setPageSerial(1);
  };

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
                  <Button variant="contained" color="primary" onClick={() => handleOpenDialog(product.id)}>
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
            width: '700px'
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
                {serials.map((row) => (
                  <TableRow key={row.id}>
                    <Checkbox checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} />
                    <TableCell>{row.ma}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.trangThai == 0 ? 'Còn hàng' : row.trangThai == 2 ? 'Đã bán' : 'Hủy'}
                        style={{ backgroundColor: getStatusSerialColor(row.trangThai), color: '#fff' }}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            sx={{ marginTop: '10px', textAlign: 'center' }}
            count={Math.ceil(totalSerial / sizeSerial)}
            page={pageSerial}
            onChange={(event, value) => handleChangePageSerial(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button
            onClick={() => {
              handleSubmitSerials();
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
