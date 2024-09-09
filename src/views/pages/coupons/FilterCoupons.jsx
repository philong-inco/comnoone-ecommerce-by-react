import React, { useState } from 'react';
import { Box, Grid, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Input } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const FilterCoupons = ({ handleSearch, handlePhamViChange, handleLoaiPhieuChange, ngayBatDau, ngayHetHan, onDateChange }) => {
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

  const handlePhamViFChange = (e) => {
    setPhamViApDung(e.target.value);
    handlePhamViChange(e);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    onDateChange(name, value);
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
            {/* Ngày bắt đầu */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="Ngày bắt đầu"
                name="ngayBatDau"
                type="date"
                value={ngayBatDau}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            {/* Ngày kết thúc */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="Ngày kết thúc"
                name="ngayHetHan"
                type="date"
                value={ngayHetHan}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
              />
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
