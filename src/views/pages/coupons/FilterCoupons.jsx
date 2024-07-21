import React, { useState } from 'react';
import { Box, Grid, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const FilterCoupons = ({ handleSearch, handleStatusChange, handlePhamViChange, handleLoaiPhieuChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [loaiGiamGia, setLoaiGiamGia] = useState('');
  const [trangThai, setTrangThai] = useState('');
  const [phamViApDung, setPhamViApDung] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const handleLoaiGiamGiaChange = (e) => {
    setLoaiGiamGia(e.target.value);
    handleLoaiPhieuChange(e);
  };

  const handleTrangThaiChange = (e) => {
    setTrangThai(e.target.value);
    handleStatusChange(e);
    handlePhamViChange(e);
  };

  const handlePhamViFChange = (e) => {
    setPhamViApDung(e.target.value);
    handlePhamViChange(e);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ backgroundColor: '#f0f0f0', p: 2, borderRadius: 2, marginBottom: 2 }}>
        <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2 }}>
          <Grid container spacing={2}>
            {/* Tìm kiếm */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tìm kiếm theo mã"
                placeholder="Tìm kiếm theo mã"
                fullWidth
                value={searchValue}
                onChange={handleSearchChange}
              />
            </Grid>
            {/* Vẫn đang lỗi nên chưa làm */}
            {/* Ngày bắt đầu */}
            <Grid item xs={12} sm={3}>
              <DatePicker label="Ngày bắt đầu" renderInput={(params) => <TextField {...params} fullWidth />} />
            </Grid>

            {/* Ngày kết thúc */}
            <Grid item xs={12} sm={3}>
              <DatePicker label="Ngày kết thúc" renderInput={(params) => <TextField {...params} fullWidth />} />
            </Grid>

            {/* Phạm vi áp dụng*/}
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Phạm vi áp dụng</FormLabel>
                <RadioGroup row name="phamViApDung" value={phamViApDung} onChange={handlePhamViFChange}>
                  <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                  <FormControlLabel value="1" control={<Radio />} label="Công khai" />
                  <FormControlLabel value="2" control={<Radio />} label="Riêng tư" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Trạng thái */}
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Trạng thái</FormLabel>
                <RadioGroup row name="trangThai" value={trangThai} onChange={handleTrangThaiChange}>
                  <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                  <FormControlLabel value="0" control={<Radio />} label="Chưa đến" />
                  <FormControlLabel value="1" control={<Radio />} label="Đang áp dụng" />
                  <FormControlLabel value="2" control={<Radio />} label="Hết hạn" />
                  <FormControlLabel value="3" control={<Radio />} label="Hủy" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* Loại phiếu */}
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Loại phiếu</FormLabel>
                <RadioGroup row name="loaiGiamGia" value={loaiGiamGia} onChange={handleLoaiGiamGiaChange}>
                  <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                  <FormControlLabel value="1" control={<Radio />} label="%" />
                  <FormControlLabel value="2" control={<Radio />} label="VND" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default FilterCoupons;
