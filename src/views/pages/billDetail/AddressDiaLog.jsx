import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchAllDayShip, fetchAllProvince, fetchAllProvinceDistricts, fetchAllProvinceWard, getMoneyShip } from 'services/admin/ghn';
import './Address.css';
import { getBillByCode, updateAddressInBill } from 'services/admin/bill/billService';
import { useParams } from 'react-router-dom';
function AddressDiaLog(props) {
  const { onLoading } = props;
  const { id } = useParams();
  const [bill, setBill] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  // thong báo
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [errorMessages, setErrorMessages] = useState({});

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
    tienShip: ''
  });
  const [formDataError, setFormDataError] = useState({
    ten: '',
    sdt: '',
    email: ''
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      fetchBill();
      loadProvinces();
    }
  }, [open]);

  useEffect(() => {
    loadProvinces();
  }, [formData.tinh]);

  const fetchBill = async () => {
    try {
      const response = await getBillByCode(id);
      if (response.status_code === 200) {
        setBill(response.data);
        setFormData((prevData) => ({
          ...prevData,
          ten: response.data.tenKhachHang,
          tinh: response.data.tinh,
          huyen: response.data.huyen,
          phuong: response.data.phuong,
          tienShip: response.data.tienShip,
          ten: response.data.ten,
          sdt: response.data.sdt,
          email: response.data.email,
          diaChi: response.data.diaChi,
          ghiChu: response.data.ghiChu,
          tienShip: response.data.tienShip
        }));
      }
    } catch (error) {
      setSnackbarMessage('Lỗi');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

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

  console.log('TP : ', provinces);
  console.log('Quận : ', districts);
  console.log('Huyện : ', wards);
  console.log('Form Data : ', formData);

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
      const response = await updateAddressInBill(id, trimmedFormData);
      console.log(response);

      if (response.status_code == 201) {
        setSnackbarMessage('Cập nhập địa chỉ thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
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
        handleClose();
      }
    } catch (error) {
      console.log('Looxi : ', error);
      if (error.response && error.response.data) {
        const errorMessages = error.response.data.message;

        // Cập nhật thông báo lỗi cho các trường tương ứng
        const newFormDataError = {
          ten: '',
          sdt: '',
          email: ''
          // Khởi tạo cho các trường khác nếu cần
        };

        // Lưu các lỗi không được phép để trống
        const requiredFieldErrors = errorMessages.filter((error) => [6002, 6004, 6006].includes(error.error_code));

        // Nếu có lỗi không được để trống, cập nhật trước
        if (requiredFieldErrors.length > 0) {
          requiredFieldErrors.forEach((error) => {
            const field = error.field; // Tên trường
            const message = error.messages; // Thông điệp lỗi

            // Cập nhật thông báo lỗi vào formDataError
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
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Cập nhật địa chỉ
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Chọn Địa Chỉ</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="address-form">
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
            </div>

            {/* Textarea nhập ghi chú */}
            <div className="form-group">
              <textarea id="ghiChu" placeholder="Ghi chú" value={formData.ghiChu} onChange={handleInputChange}></textarea>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <strong style={{ fontSize: '24px' }}>{formatCurrency(formData.tienShip)}</strong> {/* Tăng kích thước chữ ở đây */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'flex-end', width: '100%' }}>
                <Button onClick={handleClose} color="secondary">
                  Hủy
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Gửi thông tin
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddressDiaLog;