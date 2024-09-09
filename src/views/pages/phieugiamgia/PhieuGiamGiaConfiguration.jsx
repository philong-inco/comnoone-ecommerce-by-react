import React, { useState, useEffect } from 'react';
import {Checkbox,  Box, Pagination, TableBody, TableCell, TableRow, TableHead, Table, TableContainer, Typography, TextField, Grid, Paper, RadioGroup, FormControlLabel, Radio, Button, InputAdornment, IconButton } from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getAll } from 'services/admin/customer/customerService.js';

function PhieuGiamGiaConfiguration() {
  const [currencyType, setCurrencyType] = useState('%');
  const [khachHang, setKhachHang] = useState([]);
  const [selectedKhachHang, setSelectedKhachHang] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const validationSchema = yup.object({
    maPhieu: yup.string().required('Mã phiếu giảm giá là bắt buộc'),
    tenPhieu: yup.string().required('Tên phiếu giảm giá là bắt buộc'),
    giaTri: yup
      .number('Chỉ được nhập số')
      .required('Giá trị là bắt buộc')
      .positive('Giá trị phải lớn hơn 0'),
    giaTriToiDa: yup
      .number('Chỉ được nhập số')
      .required('Giá trị tối đa là bắt buộc')
      .positive('Giá trị tối đa phải lớn hơn 0'),
    soLuong: yup
      .number('Chỉ được nhập số')
      .required('Số lượng là bắt buộc')
      .positive('Số lượng phải lớn hơn 0'),
    dieuKien: yup.string().required('Điều kiện là bắt buộc'),
    tuNgay: yup
      .date()
      .min(new Date(), 'Từ ngày phải là ngày trong tương lai')
      .required('Từ ngày là bắt buộc'),
    denNgay: yup
      .date()
      .min(yup.ref('tuNgay'), 'Đến ngày phải sau từ ngày')
      .required('Đến ngày là bắt buộc'),
  });


  useEffect(() => {
    fetchKhachHang();
  }, []);

  const fetchKhachHang = async () => {
    debugger;
    const results = await getAll(currentPage - 1);
    setKhachHang(results.content);
    setTotalPages(results.totalPages);
  };
  const formik = useFormik({
    initialValues: {
      maPhieu: '',
      tenPhieu: '',
      giaTri: '',
      giaTriToiDa: '',
      soLuong: '',
      dieuKien: '',
      tuNgay: '',
      denNgay: '',
      kieu: '1',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Submitted data:', values);
    },
  });

  const handleCurrencyChange = (type) => {
    setCurrencyType(type);
  };

  const handleSelectKhachHang = (id) => {
    setSelectedKhachHang((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper style={{ padding: '16px' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Mã Phiếu Giảm Giá"
              name="maPhieu"
              fullWidth
              margin="normal"
              value={formik.values.maPhieu}
              onChange={formik.handleChange}
              error={formik.touched.maPhieu && Boolean(formik.errors.maPhieu)}
              helperText={formik.touched.maPhieu && formik.errors.maPhieu}
            />
            <TextField
              label="Tên Phiếu Giảm Giá"
              name="tenPhieu"
              fullWidth
              margin="normal"
              value={formik.values.tenPhieu}
              onChange={formik.handleChange}
              error={formik.touched.tenPhieu && Boolean(formik.errors.tenPhieu)}
              helperText={formik.touched.tenPhieu && formik.errors.tenPhieu}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Giá trị"
                  name="giaTri"
                  fullWidth
                  margin="normal"
                  value={formik.values.giaTri}
                  onChange={formik.handleChange}
                  error={formik.touched.giaTri && Boolean(formik.errors.giaTri)}
                  helperText={formik.touched.giaTri && formik.errors.giaTri}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleCurrencyChange('%')}
                          color={currencyType === '%' ? 'primary' : 'default'}
                        >
                          <PercentIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleCurrencyChange('$')}
                          color={currencyType === '$' ? 'primary' : 'default'}
                        >
                          <AttachMoneyIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Giá trị tối đa"
                  name="giaTriToiDa"
                  fullWidth
                  margin="normal"
                  value={formik.values.giaTriToiDa}
                  onChange={formik.handleChange}
                  error={formik.touched.giaTriToiDa && Boolean(formik.errors.giaTriToiDa)}
                  helperText={formik.touched.giaTriToiDa && formik.errors.giaTriToiDa}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography sx={{ color: 'orange', fontWeight: 'bold' }}>₫</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Số lượng"
                  name="soLuong"
                  fullWidth
                  margin="normal"
                  value={formik.values.soLuong}
                  onChange={formik.handleChange}
                  error={formik.touched.soLuong && Boolean(formik.errors.soLuong)}
                  helperText={formik.touched.soLuong && formik.errors.soLuong}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Điều kiện"
                  name="dieuKien"
                  fullWidth
                  margin="normal"
                  value={formik.values.dieuKien}
                  onChange={formik.handleChange}
                  error={formik.touched.dieuKien && Boolean(formik.errors.dieuKien)}
                  helperText={formik.touched.dieuKien && formik.errors.dieuKien}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography sx={{ color: 'orange', fontWeight: 'bold' }}>₫</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              label="Từ ngày"
              name="tuNgay"
              type="datetime-local"
              fullWidth
              margin="normal"
              value={formik.values.tuNgay}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().slice(0, 16),
              }}
              error={formik.touched.tuNgay && Boolean(formik.errors.tuNgay)}
              helperText={formik.touched.tuNgay && formik.errors.tuNgay}
            />

            <TextField
              label="Đến ngày"
              name="denNgay"
              type="datetime-local"
              fullWidth
              margin="normal"
              value={formik.values.denNgay}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: formik.values.tuNgay ? formik.values.tuNgay : new Date().toISOString().slice(0, 16), // Giới hạn ngày sau "Từ ngày"
              }}
              error={formik.touched.denNgay && Boolean(formik.errors.denNgay)}
              helperText={formik.touched.denNgay && formik.errors.denNgay}
            />

            <RadioGroup
              row
              name="kieu"
              value={formik.values.kieu}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="Công Khai" />
              <FormControlLabel value="2" control={<Radio />} label="Cá Nhân" />
            </RadioGroup>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Tạo Mới
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Danh sách khách hàng</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Mã Khách Hàng</TableCell>
                  <TableCell>Tên Khách Hàng</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Ng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  khachHang.length > 0 && khachHang.map((kh, index) => {
                    const ngaySinh = formatDate(kh.ngaySinh);
                    return (<TableRow key={kh.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedKhachHang.includes(kh.id)}
                          onChange={() => handleSelectKhachHang(kh.id)}
                        />
                      </TableCell>
                      <TableCell>{kh.ten}</TableCell>
                      <TableCell>{kh.sdt}</TableCell>
                      <TableCell>{kh.email}</TableCell>
                      <TableCell>{ngaySinh}</TableCell>
                    </TableRow>)
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default PhieuGiamGiaConfiguration;
