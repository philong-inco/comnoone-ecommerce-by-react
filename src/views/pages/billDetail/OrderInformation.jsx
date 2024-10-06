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
  DialogActions
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Address.css';
import { fetchAllDayShip, fetchAllProvince, fetchAllProvinceDistricts, fetchAllProvinceWard, getMoneyShip } from 'services/admin/ghn';
import { addCouponToBill, addCouponToBillByCode, updateAddressInBill } from 'services/admin/bill/billService';
import { getAllCouponsToBill } from 'services/admin/coupons/couponsService';
import PaymentDialog from './PaymentDialog';
function OrderInformation(props) {
  const { id } = useParams();
  const { bill, onLoading } = props;
  const inputRef = useRef(null);
  const [isDelivery, setIsDelivery] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  // pgg
  const [showDiaLogCoupon, setShowDiaLogCoupon] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  // loading address
  // useEffect(() => {
  //   if (isDelivery) {
  //     // fetchBill();
  //     console.log('Load 1 ');
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       ten: bill?.tenKhachHang,
  //       tinh: bill?.tinh,
  //       huyen: bill?.huyen,
  //       phuong: bill?.phuong,
  //       tienShip: bill?.tienShip,
  //       sdt: bill?.sdt,
  //       email: bill?.email,
  //       diaChi: bill?.diaChi,
  //       ghiChu: bill?.ghiChu
  //     }));
  //     loadProvinces();
  //   }
  // }, [isDelivery]);
  // useEffect(() => {
  //   loadProvinces();
  //   console.log('Load 2 ');
  // }, [formData.tinh]);

  // useEffect(() => {
  //   if (isDelivery) {
  //     // fetchBill();
  //     console.log('Load 1 ');
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       ten: bill?.tenKhachHang,
  //       tinh: bill?.tinh,
  //       huyen: bill?.huyen,
  //       phuong: bill?.phuong,
  //       tienShip: bill?.tienShip,
  //       sdt: bill?.sdt,
  //       email: bill?.email,
  //       diaChi: bill?.diaChi,
  //       ghiChu: bill?.ghiChu,
  //       loaiHoaDon: bill?.loaiHoaDon
  //     }));

  //     // loadProvinces();
  //   }
  // }, [isDelivery]);

  useEffect(() => {
    if (isDelivery) {
      // fetchBill();
      console.log('Load 1 ');
      setFormData((prevData) => ({
        ...prevData,
        ten: bill?.tenKhachHang,
        tinh: bill?.tinh,
        huyen: bill?.huyen,
        phuong: bill?.phuong,
        // tienShip: bill?.tienShip,
        sdt: bill?.sdt,
        email: bill?.email,
        diaChi: bill?.diaChi,
        ghiChu: bill?.ghiChu,
        loaiHoaDon: bill?.loaiHoaDon
      }));

      // loadProvinces();
      if (bill?.phuong && bill?.huyen) {
        getDeliveryDate(bill.huyen, bill.phuong);
      }
    }
  }, [bill]);

  useEffect(() => {
    loadProvinces();

    console.log('Load 2 ');
  }, [formData.tinh]);

  console.log('FOrm DATA : ', formData);

  console.log('BILL IN ODER INFORMATION : ', bill);

  // tỉnh thành
  const loadProvinces = async () => {
    const data = await fetchAllProvince();
    setProvinces(data.data);
    if (formData?.huyen) {
      const data = await fetchAllProvinceDistricts(formData.tinh);
      setDistricts(data.data);
      setSelectedDistrict('');
      setSelectedWard('');
      setWards([]);
    }
    if (formData?.huyen) {
      const data = await fetchAllProvinceWard(formData.huyen);
      setWards(data.data);
      setSelectedWard('');
    }
    if (formData?.tinh != null) {
      setSelectedProvince(formData.tinh);
      const selectedProvince = provinces.find((province) => province.ProvinceID === parseInt(formData.tinh));
      setFormData((prevData) => ({
        ...prevData,
        tinh: formData.tinh,
        tenTinh: selectedProvince ? selectedProvince.ProvinceName : ''
      }));
    }
    if (formData?.huyen != null) {
      setSelectedDistrict(formData.huyen);
      const selectedDistrict = districts.find((district) => district.DistrictID === parseInt(formData.huyen));
      setFormData((prevData) => ({
        ...prevData,
        huyen: formData.huyen,
        tenHuyen: selectedDistrict ? selectedDistrict.DistrictName : ''
      }));
    }

    if (formData?.phuong != null) {
      setSelectedWard(formData.phuong);
      const selectedWard = wards.find((ward) => ward.WardCode === formData.phuong);
      setFormData((prevData) => ({
        ...prevData,
        phuong: formData.phuong,
        tenPhuong: selectedWard ? selectedWard.WardName : ''
      }));
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
    const data = await fetchAllProvinceDistricts(provinceId);
    setDistricts(data.data);
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
    const data = await fetchAllProvinceWard(districtId);
    setWards(data.data);
    setSelectedWard('');
  };

  const handleWardChange = (event) => {
    handleInputChange(event);
    const wardCode = event.target.value;
    setSelectedWard(event.target.value);
    const selectedWard = wards.find((ward) => ward.WardCode === wardCode);
    setFormData((prevData) => ({
      ...prevData,
      phuong: wardCode,
      tenPhuong: selectedWard ? selectedWard.WardName : ''
    }));
    getDeliveryDate(selectedDistrict, event.target.value);
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
      tienShip: moneyShip.data.total
    }));
    // console.log('DATA 2 : ', dayShip);
    // console.log('Ngày nhận hàng : ', formattedDate);
    // console.log('DATA 3 : ', moneyShip);
    // console.log('Giá ship : ', moneyShip.data.total);
  };
  // submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedFormData = {
      ...formData,
      ten: formData.ten?.trim(),
      sdt: formData.sdt?.trim(),
      email: formData.email?.trim(),
      diaChi: formData.diaChi?.trim(),
      tinh: formData.tinh?.trim(),
      huyen: formData.huyen?.trim(),
      phuong: formData.phuong?.trim(),
      ghiChu: formData.ghiChu?.trim(),
      tienShip: formData.tienShip
    };
    try {
      // sửa lại thành payCount
      const response = await updateAddressInBill(id, trimmedFormData);
      if (response.status_code == 201) {
        setFormData({
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
        setFormDataError({
          ten: '',
          sdt: '',
          email: ''
        });
        onLoading();
        // handleClose();
        setSnackbarMessage('Cập nhập địa chỉ thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log('Error Address : ', error);
      if (error.response && error.response.data) {
        const errorMessages = error.response.data.message;
        const newFormDataError = {
          ten: '',
          sdt: '',
          email: '',
          tinh: '',
          huyen: '',
          phuong: ''
        };
        const requiredFieldErrors = errorMessages.filter((error) => [6002, 6004, 6006, 6008, 6009, 6010, 6011].includes(error.error_code));
        if (requiredFieldErrors.length > 0) {
          requiredFieldErrors.forEach((error) => {
            const field = error.field;
            const message = error.messages;
            switch (field) {
              case 'email':
                newFormDataError.email = message;
                break;
              case 'sdt':
                newFormDataError.sdt = message;
                break;
              case 'ten':
                newFormDataError.ten = message;
                break;
              case 'tinh':
                newFormDataError.tinh = message;
                break;
              case 'huyen':
                newFormDataError.huyen = message;
                break;
              case 'phuong':
                newFormDataError.phuong = message;
                break;
              default:
                break;
            }
          });
        } else {
          // Nếu không có lỗi không được để trống, kiểm tra các lỗi khác
          errorMessages.forEach((error) => {
            const field = error.field; // Tên trường
            const message = error.messages; // Thông điệp lỗi
            const errorCode = error.error_code; // Mã lỗi

            // Cập nhật thông báo lỗi vào formDataError dựa trên mã lỗi
            switch (errorCode) {
              case 6003: // EMAIL_INVALID
                newFormDataError.email = message;
                break;
              case 6005: // PHONE_INVALID
                newFormDataError.sdt = message;
                break;
              case 6007: // NAME_INVALID
                newFormDataError.ten = message;
                break;
              default:
                break;
            }
          });
        }

        setFormDataError(newFormDataError);
      } else {
        console.error('Có lỗi xảy ra:', error);
        setSnackbarMessage('Có lỗi xảy ra khi cập nhật!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
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
          // fetchBillInFo();
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
      // tienShip: bill?.tienShip,
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
    fetchApiGetAllCouponsToBill();
  };

  // pgg
  const handleCloseDiaLogCoupon = () => {
    setShowDiaLogCoupon(false);
    setCoupons([]);
  };

  // api phiếu giảm giá
  const fetchApiGetAllCouponsToBill = async () => {
    try {
      // || ID
      const response = await getAllCouponsToBill(bill.ma);
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
        // fetchBillInFo();
        onLoading();
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
  // Pay

  const openPaymentDialog = () => {
    setIsPaymentDialogOpen(true);
  };

  const onClosePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
  };
  return (
    <>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 5, borderRadius: 4 }}>
        <Grid item xs={8}>
          <Typography variant="h3">Thông tin đơn hàng </Typography>
        </Grid>
        <Grid item xs={4}>
          {/* <Box display="flex" justifyContent="end">
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
          </Box> */}
        </Grid>
        <Grid mt={2} item xs={12} sx={{ borderTop: 1 }} />

        <Grid item xs={8}>
          {isDelivery && id ? (
            //  || bill?.loaiHoaDon === 1
            <>
              <div
                // onSubmit={handleSubmit}
                className="address-form "
              >
                <div className="form-row">
                  {/* Trường nhập tên */}
                  <div className="form-group">
                    <input type="text" id="ten" placeholder="Nhập tên của bạn" value={formData.ten} onChange={handleInputChange} />
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
                    <option value="" disabled>
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
                  <strong style={{ fontSize: '24px' }}>{formatCurrency(formData.tienShip)}</strong> {/* Tăng kích thước chữ ở đây */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'flex-end', width: '100%' }}>
                    {/* <Button onClick={handleClose} color="secondary">
                      Hủy
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      Gửi thông tin
                    </Button> */}
                  </div>
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
              {/* <TextField label="Mã Giảm Giá" name="maPGG" variant="outlined" size="small" inputRef={inputRef} fullWidth /> */}
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
              label={formData?.thanhToanSau === 1 ? 'Thanh toán trước' : 'Thanh toán sau'}
            />
          )}

          <Typography mt={1} variant="h4">
            Tổng tiền hàng: {parseFloat(bill?.tongTienBanDau || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4">
            Phiếu giảm giá : {bill?.maPGG || ''}
          </Typography>
          <Typography mt={1} variant="h4">
            Giảm giá: {parseFloat(bill?.giaTriPhieuGiamGia || 0).toLocaleString() || '0'} {bill?.loaiPGG === 1 ? '%' : 'VNĐ' || ''}
          </Typography>
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Tiền sau giảm giá: {parseFloat(bill?.tongTienPhaiTra || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          {isDelivery && (
            <Typography mt={1} variant="h4">
              Tiền ship: {parseFloat(formData?.tienShip || 0).toLocaleString() || '0'} VNĐ
            </Typography>
          )}
          <Typography mt={1} variant="h4" fontWeight="bold" color="error">
            Khách cần trả:{' '}
            {parseFloat(bill?.tongTienPhaiTra + (isDelivery ? formData.tienShip : bill.tienShip) || 0).toLocaleString() || '0'} VNĐ
          </Typography>
          <Typography mt={1} variant="h4" fontWeight="bold">
            Tiền thừa:{' '}
          </Typography>

          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => {
              //   apiPayCounter();
              //   handleOpenPaymentDialog();
            }}
            disabled={id ? false : true}
          >
            Xác nhận thanh toán
          </Button> */}

          <Button
            variant="contained"
            color="primary"
            onClick={openPaymentDialog}
            disabled={!id} // Vô hiệu hóa nút nếu không có id
          >
            Xác nhận thanh toán
          </Button>
          {isPaymentDialogOpen && <PaymentDialog open={isPaymentDialogOpen} onClose={onClosePaymentDialog} data={formData} />}
        </Grid>
      </Grid>
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
                  <TableCell>Đơn từ </TableCell>
                  <TableCell>Giá trị đối đa </TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Loại phiếu</TableCell>

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
                    <TableCell>{coupon.giaTriDonToiThieu}</TableCell>
                    <TableCell>{parseInt(coupon.giamToiDa || 0).toLocaleString() || '0'} VNĐ </TableCell>
                    <TableCell>{coupon.soLuong}</TableCell>
                    <TableCell>{coupon.phamViApDung == 1 ? 'Công khai' : 'Cá nhân'}</TableCell>

                    <TableCell>
                      <Button
                        onClick={() => {
                          handleAddCouponToBill(coupon.id);
                        }}
                        variant="contained"
                        color="primary"
                        disabled={bill.idPhieuGiamGia === coupon.id ? true : false || false}
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
