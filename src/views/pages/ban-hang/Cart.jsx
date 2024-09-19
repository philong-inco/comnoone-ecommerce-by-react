import { Update } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  TableRow,
  Typography,
  Pagination,
  DialogActions,
  Checkbox,
  Chip,
  Radio
} from '@mui/material';
import { Box } from '@mui/system';
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addCustomerToBill, getBillByCode } from 'services/admin/bill/billService';
import { getAll } from 'services/admin/customer/customerService';

import { getAllProduct } from 'services/admin/product/productService';

import { getAllSerialNumberByProductId } from 'services/admin/serial-number/serialNumber';
import {
  createSerialNumberSold,
  deletedById,
  getAllSerialNumberSoldByBillId
} from 'services/admin/serialNumberSold/serialNumberSoldService';
import { getStatusSerialColor } from 'utils/serialUtil/serialUtil';

function Cart(bill) {
  const { id } = useParams();

  const [billInFo, setBillInFo] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [serialNumberInBill, setSerialNumberInBill] = useState([]);
  const [serialNumberSold, setSerialNumberSold] = useState([]);

  // product list
  const [products, setProducts] = useState([]);
  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // selectedSerialIds
  const [selectedRows, setSelectedRows] = useState([]);
  const [serials, setSerials] = useState([]);
  const [productId, setProductId] = useState(null);
  const [pageSerial, setPageSerial] = useState(1);
  const [sizeSerial, setSizeSerial] = useState(5);
  const [totalSerial, setTotalSerial] = useState(0);
  // customer
  const [customer, setCustomer] = useState({
    ten: '',
    sdt: '',
    email: ''
  });
  const [customers, setCustomers] = useState([]);
  const [showDiaLogCustomer, setShowDiaLogCustomer] = useState(false);
  const [pageCustomer, setPageCustomer] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);

  // hóa đơn ct
  const fetchSerialNumberSold = async () => {
    const response = await getAllSerialNumberSoldByBillId(id);
    if (response.status_code === 200) {
      setSerialNumberSold(response.data);
      const allSerialNumberIds = response.data.flatMap((product) => product.serialNumbers.map((serial) => serial.serialNumberId));
      // setSerialNumberInBill(allSerialNumberIds);
      setSelectedRows(allSerialNumberIds);
    }
  };

  const fetchDelete = async (billCodeRequest, serialNumberIdsRequest) => {
    const response = await deletedById(billCodeRequest, serialNumberIdsRequest);
    if (response.status_code === 200) {
      fetchSerialNumberSold();
      fetchBill();
      alert('Oke');
    }
  };

  const fetchBillInFo = async () => {
    const response = await getBillByCode(id);
    console.log('DATA KH : ', response);

    if (response.status_code === 200) {
      setBillInFo(response.data);
      setCustomer({
        ten: response.data.tenKhachHang,
        sdt: response.data.sdt,
        email: response.data.email,
        diaChi: response.data.diaChi
      });
    }
  };

  useEffect(() => {
    fetchSerialNumberSold();
    if (id) {
      fetchBillInFo();
    }
  }, [loading, id]);

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
  console.log('Customer : ', customer);

  // xóa toàn bộ sản phẩm
  const handleDelete = (value) => {
    const serialNumberIds = value.serialNumbers.map((item) => item.serialNumberId);
    const data = {
      billCode: id,
      serialNumberIds: serialNumberIds
    };
    console.log('data : ', data);
    fetchDelete(id, serialNumberIds);
  };

  // sản phẩm
  const fetchProduct = async () => {
    const response = await getAllProduct();
    if (response.code === 200) {
      setProducts(response.data);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  // fetch Serial Number
  const fetchSerialNumberByProduct = async (productId, page, size) => {
    const response = await getAllSerialNumberByProductId(productId, page - 1, size);
    if (response.status_code === 200) {
      setSerials(response.data.result);
      setTotalSerial(response.data.meta.total);
      setPageSerial(response.data.meta.page + 1);
    }
  };

  const handleChangePageSerial = (newPage) => {
    setSelectedRows(selectedRows);
    setPageSerial(newPage);
    fetchSerialNumberByProduct(productId, newPage, sizeSerial);
  };
  // thêm serial
  const handleSubmitSerials = async () => {
    const data = {
      billCode: id,
      listSerialNumberId: selectedRows
    };

    console.log('Thêm serial : ', data);
    const response = await createSerialNumberSold(data);
    if (response.status_code === 201) {
      setOpenDialog(false);
      setSelectedRows([]);
      setPageSerial(1);
      setProductId(null);
      setSelectedProduct(null);
      fetchSerialNumberSold();
      fetchBillInFo();
    }
  };
  // tích chọn serial
  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  // mở chọn serial
  const handleOpenDialog = (id) => {
    setProductId(id);
    fetchSerialNumberSold();
    fetchSerialNumberByProduct(id, pageSerial, 5);
    setOpenDialog(true);
  };

  // đóng chọn serial
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRows([]);
    setPageSerial(1);
    setProductId(null);
    setSelectedProduct(null);
  };
  // api khách hàng
  const fetchApiAllCustomer = async (page) => {
    try {
      const response = await getAll(page - 1);
      if (response) {
        setCustomers(response.content);
        setTotalCustomers(response.totalPages);
      } else {
      }
    } catch (error) {}
  };

  const handleAddCustomerToBill = async (customerId) => {
    try {
      const response = await addCustomerToBill(customerId, id);
      if (response.status_code) {
        alert('Thêm oke');
        setCustomer({
          ten: response.data.tenKhachHang,
          sdt: response.data.sdt,
          email: response.data.email
        });
        handleCloseShowDiaLogCustomer();
      } else {
      }
    } catch (error) {}
  };
  const handleChangePageCustomer = (newPage) => {
    setPageCustomer(newPage);
    console.log('Trang : ', newPage);

    fetchApiAllCustomer(newPage);
  };
  const handleShowDiaLogCustomer = (id) => {
    setShowDiaLogCustomer(true);
    fetchApiAllCustomer(pageCustomer);
  };

  // đóng chọn serial
  const handleCloseShowDiaLogCustomer = () => {
    setShowDiaLogCustomer(false);
    setCustomers([]);
  };

  return (
    <>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 5, borderRadius: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justifyContent="space-between" alignItems="center">
            <Typography variant="h3">Giỏ hàng</Typography>
            <Button variant="contained" color="warning" onClick={handleShowModal} disabled={id ? false : true}>
              Thêm sản phẩm
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ảnh</TableCell>
                <TableCell>Mã SP</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Thành tiền</TableCell>
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
                  <TableCell>
                    {product.productName} <br />
                    <strong style={{ color: 'red' }}>{parseInt(product.price).toLocaleString()} VNĐ</strong>
                  </TableCell>

                  <TableCell>
                    <strong>{product.quantity} </strong>
                  </TableCell>
                  <TableCell>
                    <strong style={{ color: 'red' }}>{parseInt(product.quantity * product.price).toLocaleString()} VNĐ</strong>
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
                    <Button
                      sx={{ color: 'white', marginRight: '5px', backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#388E3C' } }}
                      onClick={() => handleOpenDialog(product.productDetailId)}
                    >
                      Cập nhập
                    </Button>
                    <Button
                      sx={{ color: 'white', backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
                      onClick={() => handleDelete(product)}
                    >
                      Hủy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="end" alignItems="center" mt={2}>
          <Typography variant="h4">
            Tổng tiền : <strong style={{ color: 'red' }}>{billInFo.tongTienBanDau}</strong> VNĐ
          </Typography>
        </Grid>
      </Grid>
      <>
        <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 5, borderRadius: 4 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h3">Khách hàng</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleShowDiaLogCustomer();
              }}
              disabled={id ? false : true}
            >
              Chọn khách hàng
            </Button>
          </Grid>
          <Grid container spacing={2} paddingY={2} borderBottom={1} borderColor="grey.300">
            <Grid item xs={6}>
              <Typography variant="subtitle1">Tên khách hàng : {customer.ten}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Email : {customer.email}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} paddingY={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Số điện thoại : {customer.sdt}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Địa chỉ : {customer.diaChi}</Typography>
            </Grid>
          </Grid>
          {/* </Paper> */}
        </Grid>
      </>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 5, borderRadius: 4 }}>
        <Grid item xs={9}>
          <Typography variant="h3">Thông tin đơn hàng </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" justifyContent="end">
            <Button variant="outlined">Bán Giao Hàng</Button>
            <Button variant="contained" color="primary" sx={{ marginLeft: 2, padding: 1 }}>
              Tiến hành thanh toán
            </Button>
          </Box>
        </Grid>
        <Grid mt={2} item xs={12} sx={{ borderTop: 1 }} />

        <Grid item xs={9}>
          GHN{' '}
        </Grid>
        <Grid item xs={3}>
          <TextField label="Mã Giảm Giá" defaultValue="VOUCHER122" variant="outlined" size="small" />
          <Button variant="contained" color="warning" size="small" sx={{ padding: 1, borderRadius: 3, marginLeft: 2 }}>
            Chọn Mã Giảm Giá
          </Button>
          <Typography mt={1} variant="h4">
            {' '}
            Tổng tiền hàng: 64.000.000 đ{' '}
          </Typography>
          <Typography mt={1} variant="h4">
            {' '}
            Giảm giá: 7.000.000 đ{' '}
          </Typography>
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Khách cần trả: 57.000.000 đ
          </Typography>
          <Typography mt={1} variant="h4" fontWeight="bold">
            Khách thanh toán: 0 đ
          </Typography>
          <Typography mt={1} variant="h4">
            {' '}
            Tiền thừa trả khách: -57.000.000 đ{' '}
          </Typography>
        </Grid>
      </Grid>

      {/* </Box> */}

      {/* ------------------ DIALOG ------------------- */}
      {/* Dialog  Danh sách sản phẩm*/}
      <Dialog open={showModal} onClose={handleCancel} maxWidth="xl" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3">Danh sách sản phẩm</Typography>
          <Button onClick={handleCancel}>Đóng</Button>
        </DialogTitle>
        {/* Danh sách sản phẩm */}
        <DialogContent>
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
          </Paper>
        </DialogContent>
      </Dialog>

      {/* Dialog Chọn serial */}
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
      {/* Khách hàng */}
      <Dialog open={showDiaLogCustomer} onClose={handleCloseShowDiaLogCustomer} maxWidth="md" fullWidth>
        <DialogTitle>Danh sách khách hàng</DialogTitle>
        <DialogContent>
          {/* Thêm bảng vào Dialog */}
          <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell>SDT</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell></TableCell>
                    <TableCell>{`${customer.ho ? customer.ho : ''} ${customer.ten ? customer.ten : ''}`.trim() || 'N/A'}</TableCell>
                    <TableCell>{customer.sdt}</TableCell>
                    <TableCell>{customer.email ? customer.email : 'N/A'}</TableCell>
                    <TableCell>
                      {' '}
                      <Button
                        onClick={() => {
                          handleAddCustomerToBill(customer.id);
                        }}
                        variant="contained"
                        color="primary"
                      >
                        Chọn
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <Pagination
          sx={{ marginTop: '10px', textAlign: 'center' }}
          count={totalCustomers}
          page={pageCustomer}
          onChange={(event, value) => handleChangePageCustomer(value)}
        />
        <DialogActions>
          <Button onClick={handleCloseShowDiaLogCustomer} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default Cart;
