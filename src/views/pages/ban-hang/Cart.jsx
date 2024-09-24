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
  Radio,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, display } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  addCouponToBill,
  addCouponToBillByCode,
  addCustomerToBill,
  getBillByCode,
  payCounter,
  updateStatusByCode
} from 'services/admin/bill/billService';
import { getAllCouponsToBill } from 'services/admin/coupons/couponsService';
import { getAll } from 'services/admin/customer/customerService';
import { getAllProduct } from 'services/admin/product/productService';
import { getAllSerialNumberByProductId, getAllSerialNumberByProductId2 } from 'services/admin/serial-number/serialNumber';
import {
  createSerialNumberSold,
  deletedById,
  getAllSerialNumberSoldByBillId
} from 'services/admin/serialNumberSold/serialNumberSoldService';
import { getStatusSerialColor } from 'utils/serialUtil/serialUtil';
import PdfForm from 'utils/pdf/pdf';

function Cart(props) {
  const { bill, onReload } = props;
  const { id } = useParams();
  const inputRef = useRef(null);

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
  // phiếu giảm giá
  const [showDiaLogCoupon, setShowDiaLogCoupon] = useState(false);
  const [coupons, setCoupons] = useState([]);

  // tiến hành thanh toán
  const [amount, setAmount] = useState('0');
  const [error, setError] = useState('');
  const [showDiaLogPayment, setShowDiaLogPayment] = useState(false);
  const [payment, setPayment] = useState({
    maGiaoDich: '',
    phuongThuc: '',
    soTien: ''
  });
  const [payments, setPayments] = useState([]);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.trim();
    setAmount(value);
    if (value === '' || isNaN(value) || Number(value) < 0) {
      setError('Số tiền phải là số ');
    } else if (value < billInFo.tongTienPhaiTra) {
      setError('Số tiền chưa đủ');
    } else {
      setPayments({
        phuongThuc: '0'
      });
      setError('');
    }
  };

  const handleOpenPaymentDialog = (id) => {
    setShowDiaLogPayment(true);
  };

  const handleClosePaymentDialog = () => {
    setShowDiaLogPayment(false);
    // setAmount('');
    // setError('');
  };

  const handleBtnTienMat = () => {
    if (amount === '' || isNaN(amount) || Number(amount) < 0) {
      setSnackbarMessage('Số tiền phải là số');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      return;
    }
    if (amount < billInFo.tongTienPhaiTra) {
      setSnackbarMessage('Số tiền khách trả chưa đủ');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    if (confirm('Bạn chắc chắn muôn thanh toán bằng tiền mặt')) {
      // setPayments([..., payment])
      // call api
      return;
    }
  };

  const handleBtnXacNhanThanhToan = () => {
    if (amount === '' || isNaN(amount) || Number(amount) < 0) {
      setSnackbarMessage('Số tiền phải là số');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    if (amount < billInFo.tongTienPhaiTra) {
      setSnackbarMessage('Số tiền khách trả chưa đủ');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (confirm(`Xác nhận số tiền bạn nhập là ${parseInt(amount || 0).toLocaleString() || '0'} VNĐ`)) {
      ApiUpdateStatusByCode();
      return;
    }
  };

  const ApiUpdateStatusByCode = async () => {
    try {
      const response = await updateStatusByCode(id, 'XAC_NHAN');
      console.log(response); // Kiểm tra phản hồi

      if (response.status_code === 200) {
        setSnackbarMessage('Xác nhân đơn đơn hàng thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleClosePaymentDialog();
      } else {
        setSnackbarMessage('Xác nhận đơn hàng thất bại');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('Xác nhận đơn hàng thất bại');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const apiPayCounter = async () => {
    try {
      const response = await payCounter(id);
      if (response.status_code === 201) {
        setSnackbarMessage('Xác nhận thanh toán thành công thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setBillInFo({});
        handleSomeAction();
      }
    } catch (error) {
      setSnackbarMessage('Hóa đơn chưa được xác nhận');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
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
      fetchBillInFo();
      setSnackbarMessage('Xóa sản phẩm khoải hóa đơn thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
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
    fetchBillInFo();
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
    const response = await getAllSerialNumberByProductId2(productId, page - 1, size);
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

    const response = await createSerialNumberSold(data);
    if (response.status_code === 201) {
      setSnackbarMessage('Thêm sản phẩm thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
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
        setSnackbarMessage('Thêm khách hàng thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setCustomer({
          ten: response.data.tenKhachHang,
          sdt: response.data.sdt,
          email: response.data.email
        });
        handleCloseShowDiaLogCustomer();
      } else {
      }
    } catch (error) {
      setSnackbarMessage('Thêm khách hàng thất bại');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleChangePageCustomer = (newPage) => {
    setPageCustomer(newPage);
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

  // api phiếu giảm giá
  const fetchApiGetAllCouponsToBill = async () => {
    try {
      const response = await getAllCouponsToBill(billInFo.ma);
      if (response.status_code === 200) {
        setCoupons(response.data);
      } else {
      }
    } catch (error) {}
  };

  const handleAddCouponToBill = async (couponId) => {
    try {
      const response = await addCouponToBill(couponId, id);
      if (response.status_code === 201) {
        setSnackbarMessage('Thêm phiếu giảm giá thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        fetchBillInFo();
        handleCloseDiaLogCoupon();
      } else {
      }
    } catch (error) {
      if (response.status_code === 201) {
        setSnackbarMessage('Thêm phiếu giảm giá thất bại');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleAddCouponToBillByCode = async (couponCode) => {
    try {
      const response = await addCouponToBillByCode(couponCode, id);
      if (response.status_code === 201) {
        if (response.status_code === 201) {
          setSnackbarMessage('Thêm phiếu giảm giá thành công');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          fetchBillInFo();
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        } else {
          alert('Thêm thất bại');
        }
      }
    } catch (error) {
      setSnackbarMessage('Bạn không đủ điều kiện để sử dụng');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSubmitFormCoupon = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const maPGG = formData.get('maPGG');
    // addCouponToBillByCode
    handleAddCouponToBillByCode(maPGG.trim());
  };

  const handleShowDiaLogCoupon = (id) => {
    setShowDiaLogCoupon(true);
    fetchApiGetAllCouponsToBill();
  };
  const handleCloseDiaLogCoupon = () => {
    setShowDiaLogCoupon(false);
    setCoupons([]);
  };

  // Kiểm tra hàm onReload
  console.log('onReload prop:', onReload);

  const handleSomeAction = () => {
    if (typeof onReload === 'function') {
      onReload(); // Gọi hàm reload
    } else {
      console.error('onReload is not a function');
    }
  };
  return (
    <>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 5, borderRadius: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justifyContent="space-between" alignItems="center">
            <Typography variant="h3">Giỏ hàng</Typography>
            {/* <PdfForm serials={serialNumberSold} hiden={true} /> */}
            <Button variant="contained" color="warning" onClick={handleShowModal} disabled={id ? false : true}>
              Thêm sản phẩm
            </Button>
            {/* <Button variant="contained" color="warning" onClick={handleSomeAction}>
              Load
            </Button> */}
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
            Tổng tiền : <strong style={{ color: 'red' }}> {parseInt(billInFo.tongTienBanDau || 0).toLocaleString() || '0'} </strong> VNĐ
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
        <Grid item xs={8}>
          <Typography variant="h3">Thông tin đơn hàng </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="end">
            <Button variant="outlined" disabled={id ? false : true}>
              Bán Giao Hàng
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: 2, padding: 1 }}
              onClick={() => {
                handleOpenPaymentDialog();
              }}
              disabled={id ? false : true}
            >
              Tiến hành thanh toán
            </Button>
          </Box>
        </Grid>
        <Grid mt={2} item xs={12} sx={{ borderTop: 1 }} />

        <Grid item xs={9}>
          GHN{' '}
        </Grid>
        <Grid item xs={3}>
          <form onSubmit={handleSubmitFormCoupon}>
            <TextField label="Mã Giảm Giá" name="maPGG" variant="outlined" size="small" inputRef={inputRef} fullWidth />
          </form>
          <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{ padding: 1, borderRadius: 3, marginLeft: 2 }}
            onClick={() => {
              handleShowDiaLogCoupon();
            }}
            disabled={id ? false : true}
          >
            Chọn Mã Giảm Giá :
          </Button>
          <Typography mt={1} variant="h4">
            Tổng tiền hàng: {parseInt(billInFo.tongTienBanDau || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4">
            Phiếu giảm giá : {billInFo.maPGG || ''}
          </Typography>
          <Typography mt={1} variant="h4">
            Giảm giá: {parseInt(billInFo.giaTriPhieuGiamGia || 0).toLocaleString() || '0'} {billInFo.loaiPGG === 1 ? '%' : 'VNĐ' || ''}
          </Typography>
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Khách cần trả: {parseInt(billInFo.tongTienPhaiTra || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4" fontWeight="bold">
            Tiền thừa:{' '}
            {`${Math.max(0, parseFloat(amount || '0') - parseFloat(billInFo?.tongTienPhaiTra || '0')).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}`}
          </Typography>
          {/* <Typography mt={1} variant="h4">
            {' '}
            Tiền thừa trả khách: -57.000.000 đ{' '}
          </Typography> */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              apiPayCounter();
            }}
            disabled={id ? false : true}
          >
            Xác nhận thanh toán
          </Button>
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
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      disabled={row.trangThai == 1}
                    />
                    <TableCell>{row.ma}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.trangThai == 0 ? 'Chưa bán' : row.trangThai == 1 ? 'Đã bán' : 'Hủy'}
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
      {/* Phiếu giảm giá */}
      <Dialog open={showDiaLogCoupon} onClose={handleCloseDiaLogCoupon} maxWidth="md" fullWidth>
        <DialogTitle>Danh sách khách hàng</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Mã phiếu</TableCell>
                  {/* <TableCell>Tên </TableCell> */}
                  <TableCell>Giá trị </TableCell>
                  <TableCell>Giá trị đối đa </TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell></TableCell>
                    <TableCell>{coupon.ma} </TableCell>
                    {/* <TableCell>{coupon.ten}</TableCell> */}
                    <TableCell>
                      {parseInt(coupon.giaTriGiamGia || 0).toLocaleString() || '0'} {coupon.loaiGiamGia === 1 ? '%' : 'VNĐ' || ''}
                    </TableCell>
                    <TableCell>{parseInt(coupon.giamToiDa || 0).toLocaleString() || '0'} VNĐ </TableCell>
                    <TableCell>{coupon.soLuong}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleAddCouponToBill(coupon.id);
                        }}
                        variant="contained"
                        color="primary"
                        disabled={billInFo.idPhieuGiamGia === coupon.id ? true : false || false}
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
        <DialogActions>
          <Button onClick={handleCloseDiaLogCoupon} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      {/* DiaLog Tiến Hành Thanh Toán */}
      <Dialog
        open={showDiaLogPayment}
        onClose={() => {
          setShowDiaLogPayment(false);
          setAmount('');
          setError('');
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Thanh toán</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Số tiền"
                fullWidth
                variant="outlined"
                value={amount}
                // value={parseInt(amount || 0).toLocaleString() || '0'}
                error={!!error}
                helperText={error}
                onChange={handleAmountChange}
              />
            </Grid>

            {/* Tiền mặt và Chuyển khoản buttons */}
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" onClick={handleBtnTienMat}>
                Tiền mặt
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary">
                Chuyển khoản
              </Button>
            </Grid>

            {/* Tổng tiền */}
            <Grid item xs={12}>
              <Typography variant="h6" align="right" color="error">
                {`${parseInt(billInFo?.tongTienPhaiTra || 0).toLocaleString('vi-VN')} VNĐ`}
              </Typography>
            </Grid>

            {/* Table */}
            {/* <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Mã giao dịch</TableCell>
                      <TableCell>Số tiền</TableCell>
                      <TableCell>Phương thức</TableCell>
                      <TableCell>Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>99.999.999 VND</TableCell>
                      <TableCell>
                        <Button size="small" variant="contained" color="success">
                          Tiền mặt
                        </Button>
                      </TableCell>
                      <TableCell>
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid> */}

            {/* Số tiền khách thanh toán */}
            <Grid item xs={12}>
              <Typography variant="h6">
                Khách thanh toán:
                <span style={{ color: 'red', float: 'right' }}>
                  {`${parseFloat(billInFo?.tongTienPhaiTra || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`}
                </span>
              </Typography>
              <Typography variant="h6">
                Tiền thừa:
                <span style={{ color: 'blue', float: 'right' }}>
                  {`${(parseFloat(amount || '0') - parseFloat(billInFo?.tongTienPhaiTra || '0')).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`}
                  VND
                </span>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setShowDiaLogPayment(false);
              setAmount('');
              setError('');
            }}
            color="error"
          >
            Huỷ
          </Button>
          <Button variant="contained" color="primary" onClick={handleBtnXacNhanThanhToan}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Cart;
