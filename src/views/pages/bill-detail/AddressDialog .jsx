import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchAllProvince, fetchAllProvinceDistricts, fetchAllProvinceWard } from 'services/admin/ghn';

const AddressDialog = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const loadProvinces = async () => {
      const data = await fetchAllProvince();
      setProvinces(data.data);
    };
    loadProvinces();
  }, []);

  const handleProvinceChange = async (event) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    const data = await fetchAllProvinceDistricts(provinceId);
    setDistricts(data.data);
    setSelectedDistrict('');
    setSelectedWard('');
    setWards([]); // Reset wards khi thay đổi tỉnh/thành phố
  };

  const handleDistrictChange = async (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    const data = await fetchAllProvinceWard(districtId);
    setWards(data.data);
    setSelectedWard(''); // Reset phường/xã khi thay đổi quận/huyện
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected Address:', {
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard
    });
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Cập nhập địa chỉ
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Chọn Địa Chỉ</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px', width: '100%' }}>
              <select id="province" value={selectedProvince} onChange={handleProvinceChange} style={muiSelectStyle}>
                <option value="">Chọn Tỉnh/Thành Phố</option>
                {provinces.map((province) => (
                  <option key={province.ProvinceID} value={province.ProvinceID}>
                    {province.ProvinceName}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px', width: '100%' }}>
              <select
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedProvince}
                style={muiSelectStyle}
              >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                  <option key={district.DistrictID} value={district.DistrictID}>
                    {district.DistrictName}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px', width: '100%' }}>
              <select id="ward" value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict} style={muiSelectStyle}>
                <option value="">Chọn Phường/Xã</option>
                {wards.map((ward) => (
                  <option key={ward.WardCode} value={ward.WardCode}>
                    {ward.WardName}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Xác Nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const muiSelectStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '4px',
  fontSize: '16px',
  lineHeight: '1.5',
  transition: 'border-color 0.3s, box-shadow 0.3s',
  appearance: 'none',
  backgroundColor: 'white',
  '&:hover': {
    borderColor: 'rgba(0, 0, 0, 0.87)'
  },
  '&:focus': {
    borderColor: '#3f51b5',
    boxShadow: '0 0 0 2px rgba(63, 81, 181, 0.2)'
  },
  '&:disabled': {
    backgroundColor: '#f5f5f5',
    cursor: 'not-allowed'
  }
};

export default AddressDialog;
