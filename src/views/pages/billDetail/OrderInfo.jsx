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
import { addCouponToBillByCode, payCounter, updateAddressInBill } from 'services/admin/bill/billService';
import PaymentDialog2 from '../billDetail/PaymentDialog2';
import CouponDiaLog from '../billDetail/CouponDiaLog';
import { fetchAllDayShip, fetchAllProvince, fetchAllProvinceDistricts, fetchAllProvinceWard, getMoneyShip } from 'services/admin/ghn';

function OrderInfo(props) {
  const { id } = useParams();
  const {
    // bill,
    bill,
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

  const [showDiaLogCoupon, setShowDiaLogCoupon] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

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
  useEffect(() => {
    setFormData({
      ...bill,
      ten: bill.tenKhachHang || '',
      email: bill.email || '',
      sdt: bill.sdt || '',
      diaChi: bill.diaChi || ''
    });
    setFormDataError({});
    setIsDelivery(bill.loaiHoaDon == 1);
    loadProvinces();
  }, [id, bill]);
  // address
  const loadProvinces = async () => {
    const data = await fetchAllProvince();
    setProvinces(data.data);
    if (bill?.tinh) {
      const data = await fetchAllProvinceDistricts(bill.tinh);
      setDistricts(data.data);
      setSelectedDistrict('');
      setSelectedWard('');
      setWards([]);
    }
    if (bill?.huyen) {
      const data = await fetchAllProvinceWard(bill.huyen);
      setWards(data.data);
      setSelectedWard('');
    }
    if (bill?.tinh) {
      const selectedProvince = provinces.find((province) => province.ProvinceID === parseInt(bill.tinh));
      setFormData((prevData) => ({
        ...prevData,
        tinh: bill.tinh,
        tenTinh: selectedProvince ? selectedProvince.ProvinceName : ''
      }));
      if (bill?.huyen) {
        const selectedDistrict = districts.find((district) => district.DistrictID === parseInt(bill.huyen));
        setFormData((prevData) => ({
          ...prevData,
          huyen: bill.huyen,
          tenHuyen: selectedDistrict ? selectedDistrict.DistrictName : ''
        }));
        if (bill?.phuong != null) {
          setSelectedWard(bill.phuong);
          const selectedWard = wards.find((ward) => ward.WardCode === bill.phuong);
          setFormData((prevData) => ({
            ...prevData,
            phuong: bill.phuong,
            tenPhuong: selectedWard ? selectedWard.WardName : ''
          }));
          getDeliveryDate(selectedDistrict, bill.phuong);
        }
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

  const handleSwitchChange = (event) => {
    const { name, value } = event.target;
    setIsDelivery(event.target.checked);
    loadProvinces();
    setFormData({
      ...formData,
      loaiHoaDon: event.target.checked ? 1 : 0
    });
    // if (bill?.phuong && bill?.huyen) {
    //   getDeliveryDate(bill.huyen, bill.phuong);
    // }
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
    //   const errors = {};
    //   if (isDelivery) {
    //     // Kiểm tra tên
    //     if (!formData.ten) {
    //       errors.ten = 'Vui lòng nhập tên của bạn';
    //     } else if (formData.ten.length < 5) {
    //       errors.ten = 'Tên phải có ít nhất 5 ký tự';
    //     }
    //     //   } else if (!/^[\p{L} ]+$/u.test(formData.ten)) {
    //     //     errors.ten = 'Tên chỉ được nhập chữ và khoảng trắng';
    //     //   }
    //     if (!formData.sdt) {
    //       errors.sdt = 'Vui lòng nhập số điện thoại';
    //     } else if (!/^0\d{9}$/.test(formData.sdt)) {
    //       errors.sdt = 'Số điện thoại không hợp lệ';
    //     }
    //     if (!formData.email) {
    //       errors.email = 'Vui lòng nhập email';
    //     } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    //       errors.email = 'Email không hợp lệ';
    //     }
    //     if (!formData.tinh) {
    //       errors.tinh = 'Vui lòng chọn Tỉnh/Thành Phố';
    //     }
    //     if (!formData.huyen) {
    //       errors.huyen = 'Vui lòng chọn Quận/Huyện';
    //     }
    //     if (!formData.phuong) {
    //       errors.phuong = 'Vui lòng chọn Phường/Xã';
    //     }
    //   }
    //   console.log('Form Data Oke : ', formData);
    //   setFormDataError(errors);
    //   if (Object.keys(errors).length > 0) {
    //     setSnackbarMessage('Thông tin đơn hàng chưa cung cấp đủ');
    //     setSnackbarSeverity('error');
    //     setSnackbarOpen(true);
    //     return;
    //   } else {
    //     setFormDataError({});
    //     if (isDelivery) {
    //     }
    //   }
    //   // Kiểm tra tổng sản phẩm
    //   if (bill.tongSanPham === 0) {
    //     setSnackbarMessage('Hóa đơn chưa có sản phẩm nào');
    //     setSnackbarSeverity('error');
    //     setSnackbarOpen(true);
    //     return;
    //   }
    //   if (formData.thanhToanSau == 0) {
    //     setIsPaymentDialogOpen(true);
    //   } else {
    //     console.log('ADD___________ : ', formData);
    //     const data = {
    //       thanhToanSau: formData.thanhToanSau,
    //       loaiHoaDon: formData.loaiHoaDon,
    //       ten: formData.ten,
    //       sdt: formData.sdt,
    //       email: formData.email,
    //       diaChi: formData.diaChi,
    //       tinh: formData.tinh,
    //       tenTinh: formData.tenTinh,
    //       huyen: formData.huyen,
    //       tenHuyen: formData.tenHuyen,
    //       phuong: formData.phuong,
    //       tenPhuong: formData.tenPhuong,
    //       ghiChu: formData.ghiChu,
    //       tienShip: formData.tienShip
    //     };
    //     console.log('THANH TOÁN SAU : ', data);
    //     apiPayCounter(data);
    //     console.log('Trả sau : => ', data);
    //     alert('ttt');
    //   }
    // Mở hộp thoại thanh toán
  };

  const onClosePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
  };

  const apiPayCounter = async (data) => {
    //   try {
    //     const response = await payCounter(id, data);
    //     if (response.status_code === 201) {
    //       setSnackbarMessage('Xác nhận thanh toán thành công thành công');
    //       setSnackbarSeverity('success');
    //       setSnackbarOpen(true);
    //       setFormData({});
    //       onReload();
    //       onLoading();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     setSnackbarMessage('Lỗi');
    //     setSnackbarSeverity('error');
    //     setSnackbarOpen(true);
    //   }
  };

  const loadAll = () => {
    onReload();
  };

  console.log('BILL : ', bill);
  console.log('Form data  : ', formData);

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
                  disabled={true}
                  label="Tên của bạn"
                  id="ten"
                  placeholder="Nhập tên của bạn"
                  value={formData.ten || ''}
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
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
                  <Select
                    disabled={true}
                    labelId="tinh-label"
                    id="tinh"
                    value={formData.tinh}
                    onChange={handleProvinceChange}
                    error={!!formDataError.tinh}
                  >
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
                  <Select disabled={true} labelId="huyen-label" id="huyen" value={formData.huyen} onChange={handleDistrictChange}>
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
                  <Select disabled={true} labelId="phuong-label" id="phuong" value={formData.phuong} onChange={handleWardChange}>
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
                  disabled={true}
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
          {/* <FormControlLabel
            disabled={true}
            control={<Switch checked={isDelivery} onChange={handleSwitchChange} color="primary" />}
            label={isDelivery ? 'Giao hàng' : 'Tại quầy'}
          />
          {isDelivery && (
            <FormControlLabel
              control={
                <Switch disabled={true} checked={formData?.thanhToanSau === 1} onChange={handlePaymentSwitchChange} color="primary" />
              }
              label={'Trả sau'}
            />
          )} */}
          <Typography mt={1} variant="h4">
            Tổng tiền hàng: {id ? parseFloat(formData?.tongTienBanDau || 0).toLocaleString() || '0' : 0} VNĐ
          </Typography>
          <Typography mt={1} variant="h4">
            Phiếu giảm giá : {id ? formData?.maPGG || '' : ''}
          </Typography>
          <Typography mt={1} variant="h4">
            Giảm giá: {id ? parseFloat(formData?.giaTriPhieuGiamGia || 0).toLocaleString() || '0' : '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4">
            Giảm hạng: {id ? parseFloat(formData?.tienGiamHangKhachHang || 0).toLocaleString() || '0' : '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Tiền sau giảm giá: {id ? parseFloat(formData?.tongTienPhaiTra || 0).toLocaleString() || '0' : '0'} VNĐ
          </Typography>
          {isDelivery && (
            <Typography mt={1} variant="h4">
              Tiền ship: {id ? parseFloat(formData?.tienShip || 0).toLocaleString() || '0' : '0'} VNĐ
            </Typography>
          )}
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Khách cần trả:{' '}
            {id ? parseFloat(formData?.tongTienPhaiTra + (isDelivery ? formData.tienShip : 0) || 0).toLocaleString() || '0' : '0'} VNĐ
          </Typography>
          {/* <Button variant="contained" color="primary" onClick={openPaymentDialog} disabled={!id}>
            Xác nhận thanh toán
          </Button> */}
          {/* <PaymentDialog2 open={isPaymentDialogOpen} onClose={onClosePaymentDialog} data={formData} onReload={loadAll} /> */}
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
    </>
  );
}

export default OrderInfo;
