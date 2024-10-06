import { AddCircleOutline, RemoveCircleOutline, Update } from '@mui/icons-material';
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
  Snackbar,
  Alert,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  addCouponToBill,
  addCouponToBillByCode,
  addCustomerToBill,
  getBillByCode,
  payCounter,
  updateStatusByCode
} from 'services/admin/bill/billService';
import { getAllCouponsToBill } from 'services/admin/coupons/couponsService';
import { fetchSearchCustomer, findCustomerByPhone, getAll } from 'services/admin/customer/customerService';
import { getAllProduct } from 'services/admin/product/productService';
import { findSerialNumberByProductIdAndCodeSerial, getAllSerialNumberByProductId2 } from 'services/admin/serial-number/serialNumber';
import {
  createSerialNumberSold,
  deletedById,
  getAllSerialNumberSoldByBillId
} from 'services/admin/serialNumberSold/serialNumberSoldService';
import { getStatusSerialColor } from 'utils/serialUtil/serialUtil';
import PdfForm from 'utils/pdf/pdf';
import { fetchAllDayShip, fetchAllProvince, fetchAllProvinceDistricts, fetchAllProvinceWard, getMoneyShip } from 'services/admin/ghn';
import { getDefaultAddressByIdCustomer } from 'services/admin/address';
import ProductList from './dialog-san-pham/ProductList';

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
  const [defaultSelectRows, setDefaultSelectRows] = useState([]);
  const [serials, setSerials] = useState([]);
  const [productId, setProductId] = useState(null);
  const [pageSerial, setPageSerial] = useState(1);
  const [sizeSerial, setSizeSerial] = useState(5);
  const [totalSerial, setTotalSerial] = useState(0);
  const [searchSerial, setSearchSerial] = useState('');

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
  const [searchCustomer, setSearchCustomer] = useState('');
  // phiếu giảm giá
  const [showDiaLogCoupon, setShowDiaLogCoupon] = useState(false);
  const [coupons, setCoupons] = useState([]);

  // tiến hành thanh toán

  const [showDiaLogPayment, setShowDiaLogPayment] = useState(false);

  const [isCashChecked, setIsCashChecked] = useState(true);
  const [isTransferChecked, setIsTransferChecked] = useState(true);
  const [cashAmount, setCashAmount] = useState('0');
  const [transferAmount, setTransferAmount] = useState('0');
  const [cashError, setCashError] = useState('');
  const [transferError, setTransferError] = useState('');
  const [errorAmount, setErrorAmount] = useState('');

  const handleCashChange = (event) => {
    const checked = event.target.checked;
    setIsCashChecked(checked);
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      tienMat: checked ? 1 : null
    }));
    if (!checked) {
      setCashAmount('');
    }
  };

  const handleTransferChange = (event) => {
    const checked = event.target.checked;
    setIsTransferChecked(checked);
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      chuyenKhoan: checked ? 2 : null
    }));
    if (!event.target.checked) {
      setTransferAmount('');
    }
  };

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // address
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [isDelivery, setIsDelivery] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    chuyenKhoan: 2,
    tienMat: 1,
    loaiHoaDon: 0,
    ten: '',
    sdt: '',
    email: '',
    diaChi: '',
    tinh: '',
    tenTinh: '',
    huyen: '',
    tenHuyen: '',
    phuong: '',
    tenPhuong: '',
    ghiChu: '',
    ngayNhanHang: '',
    tienShip: '0'
  });

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({
      ...orderInfo,
      [name]: value
    });
  };

  // hiển thi form address
  const handleSwitchChange = (event) => {
    const { name, value } = event.target;
    setIsDelivery(event.target.checked);
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      loaiHoaDon: isDelivery ? 0 : 1
    }));
  };
  console.log('Loại hóa đơn : ', orderInfo);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // const handleAmountChange = (e) => {
  //   const value = e.target.value.trim();
  //   setAmount(value);
  //   if (value === '' || isNaN(value) || Number(value) < 0) {
  //     setError('Số tiền phải là số ');
  //   } else if (value < billInFo.tongTienPhaiTra) {
  //     setError('Số tiền chưa đủ');
  //   } else {
  //     setPayments({
  //       phuongThuc: '0'
  //     });
  //     setError('');
  //   }
  // };

  const handleOpenPaymentDialog = (id) => {
    setShowDiaLogPayment(true);
  };

  const handleClosePaymentDialog = () => {
    setShowDiaLogPayment(false);
    setCashAmount('0');
    setTransferAmount('0');
    setCashError('');
    setTransferError('');
    setErrorAmount('');
  };

  const handleAmountChange = (e, type) => {
    const value = e.target.value.replace(/\./g, '');

    // Kiểm tra số tiền phải là số dương
    if (isNaN(value) || Number(value) <= 0) {
      if (type === 'cash') {
        setCashError('Số tiền không hợp lệ');
        setCashAmount(value);
      } else if (type === 'transfer') {
        setTransferError('Số tiền không hợp lệ');
        setTransferAmount(value);
      }
      return;
    }

    if (parseFloat(value) < 0) {
      if (type === 'cash') {
        setCashError('Số tiền không được âm');
        setCashAmount(value);
      } else if (type === 'transfer') {
        setTransferError('Số tiền không được âm');
        setTransferAmount(value);
      }
      return;
    }
    let newCashAmount = cashAmount;
    let newTransferAmount = transferAmount;

    // Xóa lỗi nếu hợp lệ
    if (type === 'cash') {
      newCashAmount = value;
      setCashAmount(value);
      setCashError('');
    } else if (type === 'transfer') {
      newTransferAmount = value;
      setTransferAmount(value);
      setTransferError('');
    }
    const tongTienPhaiTra = Math.round(parseFloat(billInFo?.tongTienPhaiTra || 0));
    console.log('TTT : ', tongTienPhaiTra);

    // Kiểm tra tổng số tiền
    const total = parseFloat(newCashAmount || 0) + parseFloat(newTransferAmount || 0);

    if (total >= tongTienPhaiTra) {
      setErrorAmount('');
    } else {
      setErrorAmount('Tổng số tiền phải lớn hơn hoặc bằng tổng tiền phải trả');
    }
  };

  // const handleBtnTienMat = () => {
  //   if (amount === '' || isNaN(amount) || Number(amount) < 0) {
  //     setSnackbarMessage('Số tiền phải là số');
  //     setSnackbarSeverity('error');
  //     setSnackbarOpen(true);

  //     return;
  //   }
  //   if (amount < billInFo.tongTienPhaiTra) {
  //     setSnackbarMessage('Số tiền khách trả chưa đủ');
  //     setSnackbarSeverity('error');
  //     setSnackbarOpen(true);
  //     return;
  //   }
  //   if (confirm('Bạn chắc chắn muôn thanh toán bằng tiền mặt')) {
  //     // setPayments([..., payment])
  //     // call api
  //     return;
  //   }
  // };
  function formatNumber(value) {
    const cleanedValue = String(value || '').replace(/\D/g, '');
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  const handleBtnXacNhanThanhToan = () => {
    if (orderInfo.chuyenKhoan == null && orderInfo.tienMat == null) {
      setSnackbarMessage('Bạn chưa chọn phương thức thanh toán');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    // if (amount === '' || isNaN(amount) || Number(amount) < 0) {
    //   setSnackbarMessage('Số tiền phải là số');
    //   setSnackbarSeverity('error');
    //   setSnackbarOpen(true);
    //   return;
    // }
    // if (amount < billInFo.tongTienPhaiTra) {
    //   setSnackbarMessage('Số tiền khách trả chưa đủ');
    //   setSnackbarSeverity('error');
    //   setSnackbarOpen(true);
    //   return;
    // }
    // if (confirm(`Xác nhận số tiền bạn nhập là ${parseInt(amount || 0).toLocaleString() || '0'} VNĐ`)) {
    //   ApiUpdateStatusByCode();
    //   return;
    // }
  };

  const apiUpdateStatusByCode = async () => {
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
      const response = await payCounter(id, orderInfo);
      if (response.status_code === 201) {
        setSnackbarMessage('Xác nhận thanh toán thành công thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setBillInFo({});
        setCustomer({});
        // setAmount(0);
        handleSomeAction();
      }
    } catch (error) {
      setSnackbarMessage(error.response.data.message);
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
      setDefaultSelectRows(allSerialNumberIds);
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
    if (response.status_code === 200) {
      setBillInFo(response.data);
      setCustomer({
        ten: response.data.tenKhachHang,
        sdt: response.data.sdt,
        email: response.data.email,
        diaChi: response.data.diaChi
      });
      // if (response.data?.idKhachHang) {
      //   const responseAddress = await getDefaultAddressByIdCustomer(response.data.idKhachHang);
      // }
      setOrderInfo({
        chuyenKhoan: 2,
        tienMat: 1,
        loaiHoaDon: isDelivery ? 1 : 0,
        ten: response.data.tenKhachHang,
        sdt: response.data.sdt,
        email: response.data.email,
        diaChi: response.data.diaChi,
        tinh: response.data?.tinh || '',
        tenTinh: '',
        huyen: response.data?.huyen || '',
        tenHuyen: '',
        phuong: response.data?.phuong || '',
        tenPhuong: '',
        ghiChu: '',
        ngayNhanHang: '',
        tienShip: '0'
      });
    }
  };
  console.log('Orde : ', orderInfo);

  useEffect(() => {
    fetchSerialNumberSold();
    if (id) {
      fetchBillInFo();
    }
  }, [loading, id]);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  // xóa toàn bộ sản phẩm
  const handleDelete = (value) => {
    const serialNumberIds = value.serialNumbers.map((item) => item.serialNumberId);
    const data = {
      billCode: id,
      serialNumberIds: serialNumberIds
    };
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
  const fetchSerialNumberByProduct = async (productId, codeSerial, page, size) => {
    const response = await findSerialNumberByProductIdAndCodeSerial(productId, codeSerial || '', page - 1, size);
    if (response.status_code === 200) {
      setSerials(response.data.result);
      setTotalSerial(response.data.meta.total);
      setPageSerial(response.data.meta.page + 1);
    }
  };

  const handleChangePageSerial = (newPage) => {
    setSelectedRows(selectedRows);
    setPageSerial(newPage);
    fetchSerialNumberByProduct(productId, searchSerial, newPage, sizeSerial);
  };

  const handleSearchChange = (event) => {
    const newSearchSerial = event.target.value;
    setSearchSerial(newSearchSerial.trim());
    fetchSerialNumberByProduct(productId, newSearchSerial, pageSerial, sizeSerial);
  };
  // thêm serial
  const handleSubmitSerials = async () => {
    const data = {
      billCode: id,
      listSerialNumberId: selectedRows,
      productId: productId
    };

    const response = await createSerialNumberSold(data);
    if (response.status_code === 201) {
      setSnackbarMessage('Cập nhập số lượng sản phẩm thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setOpenDialog(false);
      setSelectedRows([]);
      setSearchSerial('');
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
    fetchSerialNumberByProduct(id, searchSerial, pageSerial, 5);
    setOpenDialog(true);
  };

  // đóng chọn serial
  const handleCloseDialog = () => {
    setSearchSerial('');
    setOpenDialog(false);
    setSelectedRows([]);
    setDefaultSelectRows([]);
    setPageSerial(1);
    setProductId(null);
    setSelectedProduct(null);
  };

  // api khách hàng
  const fetchApiAllCustomer = async (page) => {
    try {
      // searchCustomer
      // const response = await getAll(page - 1);
      const response = await fetchSearchCustomer(searchCustomer, page - 1);
      if (response) {
        setCustomers(response.content);
        setTotalCustomers(response.totalPages);
      } else {
      }
    } catch (error) {
      setSnackbarMessage('Api khách hàng lỗi');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleChangeSearchCustomer = (e) => {
    const { value } = e.target;
    setSearchCustomer(value.trim());
    fetchApiAllCustomer(pageCustomer);
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

        setOrderInfo((prevOrderInfo) => ({
          ...prevOrderInfo,
          ten: response.data.tenKhachHang,
          sdt: response.data.sdt,
          email: response.data.email
        }));
        fetchBillInFo();
        loadProvinces();
        handleCloseShowDiaLogCustomer();
      } else {
      }
    } catch (error) {
      setSnackbarMessage('Thêm khách hàng thất bại');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const findCustomerByPhoneNumber = async (phoneNumber) => {
    try {
      const response = await findCustomerByPhone(phoneNumber);
      if (response.status_code === 200) {
        setSnackbarMessage('Thêm khách hàng thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleAddCustomerToBill(response.data.id, id);
        setCustomer({
          ten: response.data.ten,
          sdt: response.data.sdt,
          email: response.data.email
        });
      } else {
        setSnackbarMessage('Không tìm thấy khách hàng với số điện thoại này !');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('Không tìm thấy khách hàng với số điện thoại này !');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  const handleSubmitFormFindCumster = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sdt = formData.get('sdt');
    findCustomerByPhoneNumber(sdt.trim());
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
    } catch (error) {
      setSnackbarMessage('Api phiếu giảm giá lỗi');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
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
      setSnackbarMessage('Thêm phiếu giảm giá thất bại');
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

  // address
  const loadProvinces = async () => {
    const data = await fetchAllProvince();
    setProvinces(data.data);
    if (orderInfo?.huyen) {
      const data = await fetchAllProvinceDistricts(orderInfo.tinh);
      setDistricts(data.data);
      setSelectedDistrict('');
      setSelectedWard('');
      setWards([]);
    }
    if (orderInfo?.huyen) {
      const data = await fetchAllProvinceWard(orderInfo.huyen);
      setWards(data.data);
      setSelectedWard('');
    }
  };
  useEffect(() => {
    loadProvinces();
  }, [orderInfo.tinh]);
  console.log('TP Tỉnh : ', provinces);
  console.log('Quận Huyện  : ', districts);
  console.log('Xã phường  : ', wards);

  const handleProvinceChange = async (event) => {
    handleOrderChange(event);
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    const selectedProvince = provinces.find((province) => province.ProvinceID === parseInt(provinceId));
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      tinh: provinceId,
      tenTinh: selectedProvince ? selectedProvince.ProvinceName : '',
      phuong: '',
      huyen: ''
    }));
    const data = await fetchAllProvinceDistricts(provinceId);
    setDistricts(data.data);
    setSelectedDistrict('');
    setSelectedWard('');
    setWards([]);
  };

  const handleDistrictChange = async (event) => {
    handleOrderChange(event);
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    const selectedDistrict = districts.find((district) => district.DistrictID === parseInt(districtId));
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      huyen: districtId,
      tenHuyen: selectedDistrict ? selectedDistrict.DistrictName : ''
    }));
    const data = await fetchAllProvinceWard(districtId);
    setWards(data.data);
    setSelectedWard('');
  };

  const handleWardChange = (event) => {
    handleOrderChange(event);
    const wardCode = event.target.value;
    setSelectedWard(wardCode);
    const selectedWard = wards.find((ward) => ward.WardCode === wardCode);
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      phuong: wardCode,
      tenPhuong: selectedWard ? selectedWard.WardName : ''
    }));
    getDeliveryDate(selectedDistrict, event.target.value);
  };

  const getDeliveryDate = async (to_district_id, to_ward_code) => {
    const dayShip = await fetchAllDayShip(to_district_id, to_ward_code);
    const moneyShip = await getMoneyShip(to_district_id, to_ward_code);
    const date = new Date(dayShip.data.leadtime * 1000);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      ngayNhanHang: formattedDate,
      tienShip: moneyShip.data.total
    }));
    console.log('DATA 2 : ', dayShip);
    console.log('Ngày nhận hàng : ', formattedDate);
    console.log('DATA 3 : ', moneyShip);
    console.log('Giá ship : ', moneyShip.data.total);
  };

  console.log('1 P : ', selectedProvince);
  console.log('2 D : ', selectedDistrict);
  console.log('1 W : ', selectedWard);

  // Kiểm tra hàm onReload
  const handleSomeAction = () => {
    if (typeof onReload === 'function') {
      onReload(); // Gọi hàm reload
    } else {
      console.error('onReload is not a function');
    }
  };

  const handleLoadProductInBill = () => {
    fetchSerialNumberSold();
    fetchBillInFo();
  };
  return (
    <>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 5, borderRadius: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justifyContent="space-between" alignItems="center">
            <Typography variant="h3">Giỏ hàng</Typography>
            {/* <PdfForm serials={serialNumberSold} code={billInFo.ma} hiden={true} /> */}
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handleOpenDialog(product.productDetailId)}>
                        <RemoveCircleOutline />
                      </IconButton>

                      <TextField
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleOpenDialog(product.productDetailId)}
                        inputProps={{ min: 0 }}
                        sx={{
                          width: 50,
                          height: 30, // Điều chỉnh chiều cao
                          '& .MuiInputBase-input': {
                            padding: '5px 10px' // Điều chỉnh padding để phù hợp với chiều cao
                          }
                        }}
                      />

                      <IconButton onClick={() => handleOpenDialog(product.productDetailId)}>
                        <AddCircleOutline />
                      </IconButton>
                    </div>
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
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                Số điện thoại :{/* {customer.sdt} */}
                <form onSubmit={handleSubmitFormFindCumster} style={{ width: '70%', marginLeft: '5px' }}>
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    // value={customer.sdt}
                    name="sdt"
                    defaultValue={customer.sdt}
                    style={{ width: '50%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </form>
              </Typography>
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

        <Grid item xs={8}>
          {isDelivery && id ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <div style={{ flex: '0 0 32%' }}>
                <input
                  type="text"
                  name="ten"
                  value={orderInfo.ten}
                  placeholder="Họ và Tên"
                  onChange={handleOrderChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>

              <div style={{ flex: '0 0 32%' }}>
                <input
                  type="text"
                  name="sdt"
                  value={orderInfo.sdt}
                  placeholder="Số điện thoại"
                  onChange={handleOrderChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>

              <div style={{ flex: '0 0 32%' }}>
                <input
                  type="text"
                  name="email"
                  value={orderInfo.email}
                  placeholder="Email"
                  onChange={handleOrderChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>

              <div style={{ flex: '0 0 100%' }}>
                <input
                  type="text"
                  name="diaChi"
                  value={orderInfo.diaChi}
                  placeholder="Địa chỉ"
                  onChange={handleOrderChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', width: '100%' }}>
                <div style={{ width: '32%' }}>
                  <select
                    id="province"
                    name="province"
                    value={orderInfo.tinh}
                    // value={selectedProvince}
                    onChange={handleProvinceChange}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  >
                    <option value="" disabled selected>
                      Chọn Tỉnh/Thành Phố
                    </option>
                    {provinces.map((province) => (
                      <option key={province.ProvinceID} value={province.ProvinceID}>
                        {province.ProvinceName}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ width: '32%' }}>
                  <select
                    id="district"
                    name="district"
                    value={orderInfo.huyen}
                    // value={selectedDistrict}
                    onChange={handleDistrictChange}
                    // disabled={!selectedProvince}
                    disabled={!orderInfo.tinh}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  >
                    <option value="" disabled selected>
                      Chọn Quận/Huyện
                    </option>
                    {districts.map((district) => (
                      <option key={district.DistrictID} value={district.DistrictID}>
                        {district.DistrictName}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ width: '32%' }}>
                  <select
                    id="ward"
                    // value={selectedWard}
                    name="ward"
                    value={orderInfo.phuong}
                    disabled={!orderInfo.huyen}
                    onChange={handleWardChange}
                    // disabled={!selectedDistrict}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  >
                    <option value="" disabled selected>
                      Chọn Phường/Xã
                    </option>
                    {wards.map((ward) => (
                      <option key={ward.WardCode} value={ward.WardCode}>
                        {ward.WardName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ flex: '0 0 100%' }}>
                <textarea
                  name="ghiChu"
                  value={orderInfo.ghiChu}
                  placeholder="Ghi chú"
                  onChange={handleOrderChange}
                  style={{ width: '100%', border: '1px solid grey', minHeight: '80px', padding: '10px', borderRadius: '4px' }}
                ></textarea>
              </div>

              <div style={{ flex: '0 0 100%', display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                <img src="https://ghn.vn/img/logo_ghn.png" alt="GHN Logo" style={{ width: '100px', marginRight: '10px' }} />
                <span>
                  Thời gian nhận hàng dự kiến: <strong>{orderInfo.ngayNhanHang}</strong>{' '}
                </span>
                <br />
              </div>
            </div>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              variant="contained"
              color="warning"
              size="small"
              sx={{ padding: 1, borderRadius: 3, mr: 2 }}
              onClick={() => {
                handleShowDiaLogCoupon();
              }}
              disabled={id ? false : true}
            >
              Chọn Mã Giảm Giá :
            </Button>
            <form onSubmit={handleSubmitFormCoupon}>
              {/* <TextField label="Mã Giảm Giá" name="maPGG" variant="outlined" size="small" inputRef={inputRef} fullWidth /> */}
              <input
                type="text"
                placeholder="Mã Giảm Giá"
                name="maPGG"
                style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                ref={inputRef}
              />
            </form>{' '}
          </Box>
          <FormControlLabel
            disabled={id ? false : true}
            control={<Switch checked={isDelivery} onChange={handleSwitchChange} color="primary" />}
            label={isDelivery ? 'Giao hàng' : 'Tại quầy'}
          />
          <Typography mt={1} variant="h4">
            Tổng tiền hàng: {parseFloat(billInFo.tongTienBanDau || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4">
            Phiếu giảm giá : {billInFo.maPGG || ''}
          </Typography>
          <Typography mt={1} variant="h4">
            Giảm giá: {parseFloat(billInFo.giaTriPhieuGiamGia || 0).toLocaleString() || '0'} {billInFo.loaiPGG === 1 ? '%' : 'VNĐ' || ''}
          </Typography>
          {isDelivery && (
            <Typography mt={1} variant="h4">
              Tiền ship: {parseFloat(orderInfo.tienShip || 0).toLocaleString() || '0'} VNĐ
            </Typography>
          )}
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Khách cần trả: {parseFloat(billInFo.tongTienPhaiTra || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4" fontWeight="bold">
            Tiền thừa:{' '}
            {/* {`${Math.max(0, parseFloat(amount || '0') - parseFloat(billInFo?.tongTienPhaiTra || '0')).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}`} */}
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
              handleOpenPaymentDialog();
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
        <ProductList onLoading={handleLoadProductInBill} selectedRowsInBill={selectedRows} />
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
            <TextField variant="outlined" size="small" label="Tìm kiếm" style={{ marginRight: '16px' }} onChange={handleSearchChange} />
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
                      // disabled={row.trangThai == 1}
                      disabled={row.trangThai === 1 && !selectedRows.includes(row.id) && !defaultSelectRows.includes(row.id)}
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
          <input
            type="text"
            name="search"
            placeholder="Tìm theo mã , tên , sđt , email"
            onChange={handleChangeSearchCustomer}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
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
                        disabled={billInFo?.idKhachHang === false || billInFo.idKhachHang === customer.id}
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
      <Dialog open={showDiaLogPayment} onClose={handleClosePaymentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Thanh toán</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            {isCashChecked && (
              <Grid item xs={12}>
                <TextField
                  label="Số tiền mặt"
                  fullWidth
                  variant="outlined"
                  // value={cashAmount}
                  value={formatNumber(cashAmount)}
                  onChange={(e) => handleAmountChange(e, 'cash')}
                  error={!!cashError}
                  helperText={cashError}
                />
              </Grid>
            )}

            {isTransferChecked && (
              <Grid item xs={12}>
                <TextField
                  label="Số tiền chuyển khoản"
                  fullWidth
                  variant="outlined"
                  // value={transferAmount}
                  value={formatNumber(transferAmount)}
                  onChange={(e) => handleAmountChange(e, 'transfer')}
                  error={!!transferError}
                  helperText={transferError}
                />
              </Grid>
            )}
            {errorAmount && (
              <Grid item xs={12}>
                <Typography color="error">{errorAmount}</Typography>
              </Grid>
            )}
            <Grid item xs={6}>
              <Checkbox checked={isCashChecked} onChange={handleCashChange} color="primary" />
              <Typography>Tiền mặt</Typography>
            </Grid>
            <Grid item xs={6}>
              <Checkbox checked={isTransferChecked} onChange={handleTransferChange} color="primary" />
              <Typography>Chuyển khoản</Typography>
            </Grid>

            {/* Tổng tiền */}
            <Grid item xs={12}>
              <Typography variant="h6" align="right" color="error">
                {`${parseInt(billInFo?.tongTienPhaiTra || 0).toLocaleString('vi-VN')} VNĐ`}
              </Typography>
            </Grid>

            {/* Khách thanh toán và tiền thừa */}
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
                  {`${(parseFloat(cashAmount || '0') + parseFloat(transferAmount || '0') - parseFloat(billInFo?.tongTienPhaiTra || '0')).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`}
                  VND
                </span>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClosePaymentDialog} color="error">
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
