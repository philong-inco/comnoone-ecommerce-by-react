import {
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  TextField,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../billDetail/Address.css';
import { addCouponToBillByCode, getBillByCode, payCounter, updateAddressInBill } from 'services/admin/bill/billService';
import { fetchAllDayShip, fetchAllProvince, fetchAllProvinceDistricts, fetchAllProvinceWard, getMoneyShip } from 'services/admin/ghn';
import PaymentDialog2 from '../billDetail/PaymentDialog2';
import CouponDiaLog from '../billDetail/CouponDiaLog';
import PdfForm from 'utils/pdf/pdf';

function Test(props) {
  const { id } = useParams();
  const {
    // bill,
    billInfo,
    onLoading,
    onReload
  } = props;
  const inputRef = useRef(null);
  const [isDelivery, setIsDelivery] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [bill, setBill] = useState({});

  const [showPDF, setShowPDF] = useState(false);

  // pgg
  const [showDiaLogCoupon, setShowDiaLogCoupon] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // pay

  const [formData, setFormData] = useState({
    ten: '',
    tenKhachHang: '',
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
    tienShip: '',
    loaiHoaDon: '',
    thanhToanSau: ''
  });
  const [formDataError, setFormDataError] = useState({
    ten: '',
    sdt: '',
    email: '',
    tinh: '',
    huyen: '',
    phuong: ''
  });

  // pay
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  // address
  const [formDataAddress, setFormDataAddress] = useState({
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
    tienShip: ''
  });

  const fetchBill = async () => {
    try {
      const response = await getBillByCode(id);
      if (response.status_code === 200) {
        setBill(response.data);
        setFormData({
          ...response.data,
          ten: response.data.tenKhachHang
        });
        setIsDelivery(response.data.loaiHoaDon);

        if (response.data.phuong && response.data.huyen) {
          getDeliveryDate(response.data.huyen, response.data.phuong);
        }
      }
    } catch (error) {
      setSnackbarMessage(error.response.data.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchBill();
  }, [billInfo]);
  // }, [id]);

  useEffect(() => {
    loadProvinces();
  }, [formData.huyen]);

  // tỉnh thành
  const loadProvinces = async () => {
    const data = await fetchAllProvince();
    setProvinces(data.data);
    if (formData?.tinh) {
      setSelectedProvince(formData.tinh);
      const selectedProvince = data.data.find((province) => province.ProvinceID === parseInt(formData.tinh));
      setFormData((prevData) => ({
        ...prevData,
        tenTinh: selectedProvince ? selectedProvince.ProvinceName : ''
      }));

      // Tải quận huyện tương ứng
      const districtsData = await fetchAllProvinceDistricts(formData.tinh);
      setDistricts(districtsData.data);
      setSelectedDistrict('');
      setSelectedWard('');
      setWards([]);

      // Tải phường tương ứng nếu có
      if (formData?.huyen) {
        setSelectedDistrict(formData.huyen);
        const selectedDistrict = districtsData.data.find((district) => district.DistrictID === parseInt(formData.huyen));
        setFormData((prevData) => ({
          ...prevData,
          tenHuyen: selectedDistrict ? selectedDistrict.DistrictName : ''
        }));

        const wardsData = await fetchAllProvinceWard(formData.huyen);

        setWards(wardsData.data);
        const selectedWard = wardsData.data.find((ward) => ward.WardCode === formData.phuong);
        // console.log('Đc chọn : ', selectedWard);
        // console.log('Đc chọn tên: ', selectedWard.WardName);

        setSelectedWard(selectedWard.WardCode);
        setFormData((prevData) => ({
          ...prevData,
          phuong: selectedWard.WardCode,
          tenPhuong: selectedWard ? selectedWard.WardName : ''
        }));
        getDeliveryDate(selectedDistrict, selectedWard);
      }
    }
  };

  const handleProvinceChange = async (event) => {
    handleInputChange(event);
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);

    const selectedProvince = provinces.find((province) => province.ProvinceID === parseInt(provinceId));
    setFormData((prevData) => ({
      ...prevData,
      tinh: provinceId,
      tenTinh: selectedProvince ? selectedProvince.ProvinceName : '',
      phuong: '',
      huyen: ''
    }));

    const districtsData = await fetchAllProvinceDistricts(provinceId);
    setDistricts(districtsData.data);
    setSelectedDistrict('');
    setSelectedWard('');
    setWards([]);
  };

  const handleDistrictChange = async (event) => {
    handleInputChange(event);
    const districtId = event.target.value;
    setSelectedDistrict(districtId);

    const selectedDistrict = districts.find((district) => district.DistrictID === parseInt(districtId));
    setFormData((prevData) => ({
      ...prevData,
      huyen: districtId,
      tenHuyen: selectedDistrict ? selectedDistrict.DistrictName : ''
    }));

    const wardsData = await fetchAllProvinceWard(districtId);
    setWards(wardsData.data);
    setSelectedWard('');
  };

  const handleWardChange = (event) => {
    handleInputChange(event);
    const wardCode = event.target.value;
    setSelectedWard(wardCode);
    const selectedWard = wards.find((ward) => ward.WardCode === wardCode);
    setFormData((prevData) => ({
      ...prevData,
      phuong: wardCode,
      tenPhuong: selectedWard ? selectedWard.WardName : ''
    }));

    getDeliveryDate(selectedDistrict, wardCode);
  };

  const getDeliveryDate = async (to_district_id, to_ward_code) => {
    console.log('to_district_id', to_district_id);
    console.log('to_ward_code', to_ward_code);
    const dayShip = await fetchAllDayShip(to_district_id, to_ward_code);
    const moneyShip = await getMoneyShip(to_district_id, to_ward_code);
    const date = new Date(dayShip.data.leadtime * 1000);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    setFormData((prevOrderInfo) => ({
      ...prevOrderInfo,
      tienShip: moneyShip.data.total,
      ngayNhanHangDuKien: formattedDate
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleSubmitFormCoupon = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const maPGG = formData.get('maPGG');
    handleAddCouponToBillByCode(maPGG.trim());
  };

  const handleAddCouponToBillByCode = async (couponCode) => {
    try {
      const response = await addCouponToBillByCode(couponCode, id);
      if (response.status_code === 201) {
        if (response.status_code === 201) {
          setSnackbarMessage('Thêm phiêu giảm giá vào hóa đơn thành công');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          onLoading();
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        }
      }
    } catch (error) {
      setSnackbarMessage(error.response.data.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // hiển thi form address
  const handleSwitchChange = (event) => {
    const { name, value } = event.target;
    setIsDelivery(event.target.checked);
    setFormData((prevData) => ({
      ...prevData,
      ten: bill?.tenKhachHang,
      tinh: bill?.tinh,
      huyen: bill?.huyen,
      phuong: bill?.phuong,
      tienShip: event.target.checked ? 0 : bill?.tienShip,
      sdt: bill?.sdt,
      email: bill?.email,
      diaChi: bill?.diaChi,
      ghiChu: bill?.ghiChu,
      loaiHoaDon: isDelivery ? 0 : 1,
      // thanhToanSau: isDelivery ? bill?.thanhToanSau : 0
      thanhToanSau: bill?.thanhToanSau
    }));
    // loadProvinces();
    if (bill?.phuong && bill?.huyen) {
      getDeliveryDate(bill.huyen, bill.phuong);
    }
  };
  const handlePaymentSwitchChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      thanhToanSau: event.target.checked ? 1 : 0
    }));
  };

  const handleShowDiaLogCoupon = (id) => {
    setShowDiaLogCoupon(true);
  };

  // pgg
  const handleCloseDiaLogCoupon = () => {
    setShowDiaLogCoupon(false);
  };

  const openPaymentDialog = () => {
    const errors = {};
    if (isDelivery) {
      // Kiểm tra tên
      if (!formData.ten) {
        errors.ten = 'Vui lòng nhập tên của bạn';
      } else if (formData.ten.length < 5) {
        errors.ten = 'Tên phải có ít nhất 5 ký tự';
      } else if (!/^[\p{L} ]+$/u.test(formData.ten)) {
        errors.ten = 'Tên chỉ được nhập chữ và khoảng trắng';
      }
      if (!formData.sdt) {
        errors.sdt = 'Vui lòng nhập số điện thoại';
      } else if (!/^0\d{9}$/.test(formData.sdt)) {
        errors.sdt = 'Số điện thoại không hợp lệ';
      }

      if (!formData.email) {
        errors.email = 'Vui lòng nhập email';
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        errors.email = 'Email không hợp lệ';
      }
      if (!formData.tinh) {
        errors.tinh = 'Vui lòng chọn Tỉnh/Thành Phố';
      }
      if (!formData.huyen) {
        errors.huyen = 'Vui lòng chọn Quận/Huyện';
      }
      if (!formData.phuong) {
        errors.phuong = 'Vui lòng chọn Phường/Xã';
      }
    }
    console.log('Form Data Oke : ', formData);
    setFormDataError(errors);
    if (Object.keys(errors).length > 0) {
      setSnackbarMessage('Thông tin đơn hàng chưa cung cấp đủ');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    } else {
      setFormDataError({});
      if (isDelivery) {
        if (
          formData.tinh != bill.tinh ||
          formData.huyen != bill.huyen ||
          formData.phuong != bill.phuong ||
          formData.ten != bill.ten ||
          formData.sdt != bill.sdt ||
          formData.diaChi != bill.diaChi ||
          formData.ghiChu != bill.ghiChu
        ) {
          updateAddress({
            ten: formData.ten,
            sdt: formData.sdt,
            email: formData.email,
            diaChi: formData.diaChi,
            tinh: formData.tinh,
            tenTinh: provinces.find((province) => province.ProvinceID === parseInt(formData.tinh)).ProvinceName,
            huyen: formData.huyen,
            tenHuyen: districts.find((district) => district.DistrictID === parseInt(formData.huyen)).DistrictName,
            phuong: formData.phuong,
            tenPhuong: wards.find((ward) => ward.WardCode === formData.phuong).WardName,
            ghiChu: formData.ghiChu,
            tienShip: formData.tienShip
          });
        }
      }
    }
    // // lưu lại địa chỉ
    // setFormDataAddress({
    //   ten: formData.ten,
    //   sdt: formData.sdt,
    //   email: formData.email,
    //   diaChi: formData.diaChi,
    //   tinh: formData.tinh,
    //   tenTinh: provinces.find((province) => province.ProvinceID === parseInt(formData.tinh)).ProvinceName,
    //   huyen: formData.huyen,
    //   tenHuyen: districts.find((district) => district.DistrictID === parseInt(formData.huyen)).DistrictName,
    //   phuong: formData.phuong,
    //   tenPhuong: wards.find((ward) => ward.WardCode === formData.phuong).WardName,
    //   ghiChu: formData.ghiChu,
    //   tienShip: formData.tienShip
    // });
    // update adddress

    // Kiểm tra tổng sản phẩm
    if (bill.tongSanPham === 0) {
      setSnackbarMessage('Hóa đơn chưa có sản phẩm nào');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    if (formData.thanhToanSau == 0) {
      setIsPaymentDialogOpen(true);
    } else {
      const data = {
        thanhToanSau: formData.thanhToanSau,
        loaiHoaDon: formData.loaiHoaDon,
        ten: formData.ten,
        sdt: formData.sdt,
        email: formData.email,
        diaChi: formData.diaChi,
        tinh: formData.tinh,
        tenTinh: formData.tenTinh,
        huyen: formData.huyen,
        tenHuyen: formData.tenHuyen,
        phuong: formData.phuong,
        tenPhuong: formData.tenPhuong,
        ghiChu: formData.ghiChu
      };
      apiPayCounter(data);
      console.log('Trả sau : => ', data);
      alert('ttt');
    }
    // Mở hộp thoại thanh toán
  };
  console.log('Addresss : ', formDataAddress);

  const onClosePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
  };

  const apiPayCounter = async (data) => {
    try {
      const response = await payCounter(id, data);
      if (response.status_code === 201) {
        setSnackbarMessage('Xác nhận thanh toán thành công thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setFormData({});
        setBill({});
        setFormDataAddress({});
        setShowPDF(true);
        onReload();

        onLoading();
        // onReload();
      }
    } catch (error) {
      console.log(error);

      setSnackbarMessage('Lỗi');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const updateAddress = async (newAddress) => {
    try {
      const response = await updateAddressInBill(id, newAddress);
      if (response.status_code == 201) {
        // setSnackbarMessage('Caapj nhaapj ddiaj cir');
        // setSnackbarSeverity('success');
        // setSnackbarOpen(true);
        // onLoading();

        fetchBill();
      }
    } catch (error) {
      console.log(error);

      setSnackbarMessage('Lỗi Adddress');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  console.log('setIsDelivery : ', isDelivery);

  console.log('FOrm DATA : ', formData);

  console.log('BILL IN ODER INFORMATION : ', bill);
  const handlePrint = () => {
    setShowPDF(true);
  };

  useEffect(() => {
    // Gọi hàm in tại đây nếu cần
    if (showPDF) {
      handlePrint(); // Hoặc gọi hàm in của bạn
      setShowPDF(false);
    }
  }, [showPDF]);

  const loadAll = () => {
    onReload();
  };
  return (
    <>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 5, borderRadius: 4 }}>
        <Grid item xs={8}>
          <Typography variant="h3">Thông tin đơn hàng </Typography>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid mt={2} item xs={12} sx={{ borderTop: 1 }} />

        <Grid item xs={8}>
          {isDelivery && id ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Tên của bạn"
                  id="ten"
                  placeholder="Nhập tên của bạn"
                  value={formData.ten}
                  onChange={handleInputChange}
                  error={!!formDataError.ten}
                  helperText={formDataError.ten}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: !!formData.ten
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Số điện thoại"
                  id="sdt"
                  placeholder="Nhập số điện thoại"
                  value={formData.sdt}
                  onChange={handleInputChange}
                  error={!!formDataError.sdt}
                  helperText={formDataError.sdt}
                  fullWidth
                  margin="normal"
                  type="tel"
                  InputLabelProps={{
                    shrink: !!formData.sdt // Đưa label lên nếu có dữ liệu
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Email"
                  id="email"
                  placeholder="Nhập email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formDataError.email}
                  helperText={formDataError.email}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: !!formData.email // Đưa label lên nếu có dữ liệu
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Địa chỉ giao hàng"
                  id="diaChi"
                  placeholder="Nhập địa chỉ giao hàng"
                  value={formData.diaChi}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  InputLabelProps={{
                    shrink: !!formData.diaChi // Đưa label lên nếu có dữ liệu
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="tinh-label">Tỉnh/Thành Phố</InputLabel>
                  <Select labelId="tinh-label" id="tinh" value={formData.tinh} onChange={handleProvinceChange} error={!!formDataError.tinh}>
                    <MenuItem value="" disabled>
                      Chọn Tỉnh/Thành Phố
                    </MenuItem>
                    {provinces.map((province) => (
                      <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                        {province.ProvinceName}
                      </MenuItem>
                    ))}
                  </Select>
                  {formDataError.tinh && <Typography color="error">{formDataError.tinh}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="huyen-label">Quận/Huyện</InputLabel>
                  <Select labelId="huyen-label" id="huyen" value={formData.huyen} onChange={handleDistrictChange}>
                    <MenuItem value="">Chọn Quận/Huyện</MenuItem>
                    {districts.map((district) => (
                      <MenuItem key={district.DistrictID} value={district.DistrictID}>
                        {district.DistrictName}
                      </MenuItem>
                    ))}
                  </Select>
                  {formDataError.huyen && <Typography color="error">{formDataError.huyen}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="phuong-label">Phường/Xã</InputLabel>
                  <Select labelId="phuong-label" id="phuong" value={formData.phuong} onChange={handleWardChange}>
                    <MenuItem value="">Chọn Phường/Xã</MenuItem>
                    {wards.map((ward) => (
                      <MenuItem key={ward.WardCode} value={ward.WardCode}>
                        {ward.WardName}
                      </MenuItem>
                    ))}
                  </Select>
                  {formDataError.phuong && <Typography color="error">{formDataError.phuong}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Ghi chú"
                  id="ghiChu"
                  placeholder="Ghi chú"
                  value={formData.ghiChu}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  InputLabelProps={{
                    shrink: !!formData.ghiChu // Đưa label lên nếu có dữ liệu
                  }}
                />
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <strong style={{ fontSize: '24px' }}> Phí ship : {formatCurrency(formData.tienShip)}</strong>
                {/* <strong style={{ fontSize: '24px' }}>Ngày nhận hàng dự kiến : {formData.ngayNhanHangDuKien || ''}</strong> */}
              </Grid>
            </Grid>
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
              <input
                type="text"
                placeholder="Mã Giảm Giá"
                name="maPGG"
                style={{ width: '150%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                ref={inputRef}
              />
            </form>{' '}
          </Box>
          <FormControlLabel
            disabled={id ? false : true}
            control={<Switch checked={isDelivery} onChange={handleSwitchChange} color="primary" />}
            label={isDelivery ? 'Giao hàng' : 'Tại quầy'}
          />
          {isDelivery && (
            <FormControlLabel
              control={<Switch checked={formData?.thanhToanSau === 1} onChange={handlePaymentSwitchChange} color="primary" />}
              label={'Trả sau'}
            />
          )}
          <Typography mt={1} variant="h4">
            Tổng tiền hàng: {id ? parseFloat(formData?.tongTienBanDau || 0).toLocaleString() || '0' : 0} VNĐ
          </Typography>
          <Typography mt={1} variant="h4">
            Phiếu giảm giá : {id ? formData?.maPGG || '' : ''}
          </Typography>
          <Typography mt={1} variant="h4">
            Giảm giá: - {id ? parseFloat(formData?.giaTriPhieuGiamGia || 0).toLocaleString() || '0' : '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4">
            Giảm hạng: - {id ? parseFloat(formData?.tienGiamHangKhachHang || 0).toLocaleString() || '0' : '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Tiền sau giảm giá: {id ? parseFloat(formData?.tongTienPhaiTra || 0).toLocaleString() || '0' : '0'} VNĐ
          </Typography>
          {isDelivery && (
            <Typography mt={1} variant="h4">
              Tiền ship: + {id ? parseFloat(formData?.tienShip || 0).toLocaleString() || '0' : '0'} VNĐ
            </Typography>
          )}
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Khách cần trả:{' '}
            {id ? parseFloat(formData?.tongTienPhaiTra + (isDelivery ? formData.tienShip : 0) || 0).toLocaleString() || '0' : '0'} VNĐ
          </Typography>
          <Button variant="contained" color="primary" onClick={openPaymentDialog} disabled={!id}>
            Xác nhận thanh toán
          </Button>
          {/* {isPaymentDialogOpen && (
              <PaymentDialog open={isPaymentDialogOpen} onClose={onClosePaymentDialog} onSubmit={handlePaymentSubmit} data={formData} />
            )} */}
          <PaymentDialog2 open={isPaymentDialogOpen} onClose={onClosePaymentDialog} data={formData} onReload={loadAll} />
        </Grid>
      </Grid>

      <CouponDiaLog
        showDiaLogCoupon={showDiaLogCoupon}
        handleCloseDiaLogCoupon={handleCloseDiaLogCoupon}
        bill={bill}
        onLoading={() => {
          onLoading();
        }}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {showPDF && <PdfForm hiden={showPDF} code={bill.ma} />}
    </>
  );
}
export default Test;
