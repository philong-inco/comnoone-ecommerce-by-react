import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductList from './ProductList';
import { deletedById, getAllSerialNumberSoldByBillId } from 'services/admin/serialNumberSold/serialNumberSoldService';
import { getBillByCode } from 'services/admin/bill/billService';
import { Update } from '@mui/icons-material';

function ProductInBill(props) {
  const { handleLoading, bill, fetchBill } = props;
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [serialNumberInBill, setSerialNumberInBill] = useState([]);
  const [serialNumberSold, setSerialNumberSold] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const fetchSerialNumberSold = async () => {
    const response = await getAllSerialNumberSoldByBillId(id);
    console.log('API :', response);

    if (response.status_code === 200) {
      setSerialNumberSold(response.data);
      const allSerialNumberIds = response.data.flatMap((product) => product.serialNumbers.map((serial) => serial.serialNumberId));
      setSerialNumberInBill(allSerialNumberIds);
    }
  };
  console.log('DATA : ', serialNumberInBill);

  const fetchDelete = async (idSerialNumber) => {
    const response = await deletedById(idSerialNumber);
    if (response.status_code === 200) {
      setNotification({ open: true, message: response.message, severity: 'success' });
      fetchSerialNumberSold();
      fetchBill();
    }
  };

  const fetchBillInFo = async () => {
    const response = await getBillByCode(id);
    if (response.status_code === 200) {
      setBill(response.data);
    }
  };

  useEffect(() => {
    fetchSerialNumberSold();
  }, [loading]);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleLoadingProductInBill = () => {
    setLoading(!loading);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleProductSelected = () => {
    setShowModal(false);
  };

  const handleDelete = (id) => {
    fetchDelete(id);
  };

  return (
    <>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 1, borderRadius: 4 }}>
        <Paper sx={{ padding: 2, marginTop: 2, borderRadius: 2, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} container justifyContent="space-between" alignItems="center">
              <Typography variant="h5">Danh sách sản phẩm</Typography>
              <Button variant="contained" color="warning" onClick={handleShowModal}>
                Thêm mới sản phẩm
              </Button>
            </Grid>
          </Grid>
          <Dialog open={showModal} onClose={handleCancel} maxWidth="xl" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5">Danh sách sản phẩm</Typography>
              <Button onClick={handleCancel}>Đóng</Button>
            </DialogTitle>
            <DialogContent>
              <ProductList
                handleLoading={handleLoadingProductInBill}
                handleLoadingTimeLine={handleLoading}
                onProductSelected={handleProductSelected}
                selectedSerialIds={serialNumberInBill}
              />
            </DialogContent>
          </Dialog>

          <Divider sx={{ marginY: 2 }} />

          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ảnh</TableCell>
                  <TableCell>Mã SP</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Serial</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serialNumberSold.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img src="https://via.placeholder.com/50" alt="Product" width="50" />
                    </TableCell>
                    <TableCell>{product.productDetailCode}</TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>
                      <strong>{parseInt(product.gia).toLocaleString()} VNĐ</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{product.soLuong} </strong>
                    </TableCell>
                    <TableCell>
                      <strong>
                        {product.serialNumbers.map((serial, index) => (
                          <span key={serial.serialNumberId}>
                            {serial.serialNumberCode}
                            {index < product.serialNumbers.length - 1 && ', '}
                          </span>
                        ))}
                      </strong>
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(product.id)}>
                        <Update color="warning" />
                      </IconButton>
                      {/* <IconButton color="error" onClick={() => handleDelete(product.id)}>
                        <DeleteIcon />
                      </IconButton> */}
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
      </Grid>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 1, borderRadius: 4 }}>
        <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography>
            Phiếu giảm giá : <strong>{bill.maPGG}</strong>
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Typography>
            <strong> Tổng tiền hàng : </strong>{' '}
            <strong style={{ color: 'red', marginLeft: '8px' }}> {parseInt(bill.tongTienBanDau).toLocaleString()} VNĐ</strong>
          </Typography>

          <Typography>
            Giá trị giảm :
            <strong>
              {bill.giaTriPhieuGiamGia} {bill.loaiPGG == 1 ? '%' : 'VNĐ'}
            </strong>
          </Typography>

          <Typography>Phí vận chuyển :</Typography>
          <Divider sx={{ width: '100%', marginY: 1 }} />
          <Typography>
            <strong>Tổng tiền :</strong>
            <strong style={{ color: 'red', marginLeft: '8px' }}> {parseInt(bill.tongTienPhaiTra).toLocaleString()} VNĐ</strong>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductInBill;
