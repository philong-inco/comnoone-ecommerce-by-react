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
  ToggleButton
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Address.css';
import { fetchAllDayShip, fetchAllProvince, fetchAllProvinceDistricts, fetchAllProvinceWard, getMoneyShip } from 'services/admin/ghn';
import { addCouponToBill, addCouponToBillByCode, getBillByCode, payCounter, updateAddressInBill } from 'services/admin/bill/billService';
import { getAllCouponsToBill } from 'services/admin/coupons/couponsService';
import PaymentDialog from './PaymentDialog';
import CouponDiaLog from './CouponDiaLog';
import PaymentDialog2 from './PaymentDialog2';

function OrderInformation(props) {
  const { id } = useParams();
  const {
    // bill,
    billInfo,
    onLoading
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

  // pgg
  const [showDiaLogCoupon, setShowDiaLogCoupon] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // pay

  const [formData, setFormData] = useState({
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

  const fetchBill = async () => {
    try {
      const response = await getBillByCode(id);
      if (response.status_code === 200) {
        setBill(response.data);
        setFormData(response.data);
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
    console.log('Load 1 ');
  }, [billInfo]);

  useEffect(() => {
    loadProvinces();
    console.log('Load 2 ');
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
        setSelectedWard(selectedWard);
        setFormData((prevData) => ({
          ...prevData,
          phuong: selectedWard,
          tenPhuong: selectedWard ? selectedWard.WardName : ''
        }));
        getDeliveryDate(selectedDistrict, selectedWard);
      }
    }
  };
  console.log('PPPPP : ', selectedWard);

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
    // handleInputChange(event);
    // const districtId = event.target.value;
    // setSelectedDistrict(districtId);
    // const selectedDistrict = districts.find((district) => district.DistrictID === parseInt(districtId));
    // setFormData((prevData) => ({
    //   ...prevData,
    //   huyen: districtId,
    //   tenHuyen: selectedDistrict ? selectedDistrict.DistrictName : ''
    // }));
    // const data = await fetchAllProvinceWard(districtId);
    // setWards(data.data);
    // setSelectedWard('');
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
    // addCouponToBillByCode
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
    // setOrderInfo((prevOrderInfo) => ({
    //   ...prevOrderInfo,
    //   loaiHoaDon: isDelivery ? 0 : 1
    // }));
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
      loaiHoaDon: bill?.loaiHoaDon,
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
    if (bill.tongSanPham === 0) {
      setSnackbarMessage('Hóa đơn chưa có sản phẩm nào');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    setIsPaymentDialogOpen(true);
  };

  const onClosePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
  };
  const handlePaymentSubmit = (paymentData) => {
    console.log('Dữ liệu thanh toán:', paymentData);
    const data = {
      ...formData,
      loaiHoaDon: isDelivery ? 1 : 0,
      idChuyenKhoan: paymentData.idChuyenKhoan,
      idTienMat: paymentData.idTienMat,
      soTienChuyenKhoan: paymentData.soTienChuyenKhoan,
      soTienMat: paymentData.soTienMat
    };
    const newFormDataError = {
      ten: '',
      sdt: '',
      email: '',
      tinh: '',
      huyen: '',
      phuong: ''
    };
    let checked = false;
    if (formData.loaiHoaDon === 1) {
    }

    setFormData(newFormDataError);
    // if (checked) {
    debugger;
    apiPayCounter(data);
    // }
    console.log('Data : ', data);
  };
  const apiPayCounter = async (data) => {
    try {
      const response = await payCounter(id, data);
      if (response.status_code === 201) {
        setSnackbarMessage('Xác nhận thanh toán thành công thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        // setBillInFo({});
        // setCustomer({});
        // setAmount(0);
        // handleSomeAction();
        onLoading();
      }
    } catch (error) {
      console.log(error);

      setSnackbarMessage('Lỗi');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  console.log('setIsDelivery : ', isDelivery);

  console.log('FOrm DATA : ', formData);

  console.log('BILL IN ODER INFORMATION : ', bill);
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
            <>
              <div
                // onSubmit={handleSubmit}
                className="address-form "
              >
                <div className="form-row">
                  {/* Trường nhập tên */}
                  <div className="form-group">
                    <input
                      type="text"
                      id="ten"
                      placeholder="Nhập tên của bạn"
                      value={formData.ten || formData.tenKhachHang}
                      onChange={handleInputChange}
                    />
                    {formDataError.ten && <span className="error-message">{formDataError.ten}</span>}
                  </div>

                  {/* Trường nhập số điện thoại */}
                  <div className="form-group">
                    <input
                      type="tel"
                      id="sdt"
                      placeholder="Nhập số điện thoại"
                      value={formData.sdt}
                      onChange={handleInputChange}
                      //   pattern="^0\\d{9}$"
                      //   required
                    />
                    {formDataError.sdt && <span className="error-message">{formDataError.sdt}</span>}
                  </div>

                  {/* Trường nhập email */}
                  <div className="form-group">
                    <input id="email" placeholder="Nhập email" value={formData.email} onChange={handleInputChange} />
                    {formDataError.email && <span className="error-message">{formDataError.email}</span>}
                  </div>
                </div>

                {/* Trường nhập địa chỉ */}
                <div className="form-group">
                  <textarea
                    id="diaChi"
                    placeholder="Nhập địa chỉ giao hàng"
                    value={formData.diaChi}
                    onChange={handleInputChange}
                    // required
                  ></textarea>
                </div>

                {/* Dropdown chọn Tỉnh/Thành Phố */}
                <div className="form-group">
                  <select id="tinh" value={formData.tinh} onChange={handleProvinceChange}>
                    <option value="" disabled selected>
                      Chọn Tỉnh/Thành Phố
                    </option>
                    {provinces.map((province) => (
                      <option key={province.ProvinceID} value={province.ProvinceID}>
                        {province.ProvinceName}
                      </option>
                    ))}
                  </select>
                  {formDataError.tinh && <span className="error-message">{formDataError.tinh}</span>}
                </div>

                {/* Dropdown chọn Quận/Huyện */}
                <div className="form-group">
                  <select
                    id="huyen"
                    value={formData.huyen}
                    onChange={handleDistrictChange}
                    //    disabled={!formData.tinh}
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                      <option key={district.DistrictID} value={district.DistrictID}>
                        {district.DistrictName}
                      </option>
                    ))}
                  </select>
                  {formDataError.huyen && <span className="error-message">{formDataError.huyen}</span>}
                </div>

                {/* Dropdown chọn Phường/Xã */}
                <div className="form-group">
                  <select
                    id="phuong"
                    value={formData.phuong}
                    onChange={(e) => {
                      handleWardChange(e);
                    }}
                    // disabled={!formData.huyen}
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.WardCode} value={ward.WardCode}>
                        {ward.WardName}
                      </option>
                    ))}
                  </select>
                  {formDataError.phuong && <span className="error-message">{formDataError.phuong}</span>}
                </div>

                {/* Textarea nhập ghi chú */}
                <div className="form-group">
                  <textarea id="ghiChu" placeholder="Ghi chú" value={formData.ghiChu} onChange={handleInputChange}></textarea>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <strong style={{ fontSize: '24px' }}>{formatCurrency(formData.tienShip)}</strong>
                  <strong style={{ fontSize: '24px' }}>{formData.ngayNhanHangDuKien}</strong>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'flex-end', width: '100%' }}></div>
                </div>
              </div>
            </>
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
              label={formData?.thanhToanSau === 1 ? 'Thanh toán trước gg' : 'Thanh toán sau'}
            />
          )}
          <Typography mt={1} variant="h4">
            Tổng tiền hàng: {parseFloat(bill?.tongTienBanDau || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4">
            Phiếu giảm giá : {bill?.maPGG || ''}
          </Typography>
          <Typography mt={1} variant="h4">
            Giảm giá: - {parseFloat(bill?.giaTriPhieuGiamGia || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4">
            Giảm hạng: - {parseFloat(bill?.tienGiamHangKhachHang || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Tiền sau giảm giá: {parseFloat(bill?.tongTienPhaiTra || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          {isDelivery && (
            <Typography mt={1} variant="h4">
              Tiền ship: + {parseFloat(formData?.tienShip || 0).toLocaleString() || '0'} VNĐ
            </Typography>
          )}
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Khách cần trả: {parseFloat(bill?.tongTienPhaiTra + (isDelivery ? formData.tienShip : 0) || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          <Button variant="contained" color="primary" onClick={openPaymentDialog} disabled={!id}>
            Xác nhận thanh toán
          </Button>

          {isPaymentDialogOpen && <PaymentDialog2 open={isPaymentDialogOpen} onClose={onClosePaymentDialog} data={formData} />}
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
export default OrderInformation;
