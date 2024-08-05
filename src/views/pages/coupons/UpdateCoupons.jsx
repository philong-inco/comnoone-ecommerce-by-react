import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Snackbar,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { getPGGById, updatedPGG } from 'services/admin/coupons/couponsService';
import { getPageKH } from 'services/admin/customer/customerService';
import { useNavigate, useParams } from 'react-router-dom';
import { handleCouponErrors } from 'utils/handleError/couponsError';

function UpdateCoupons() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectAll, setSelectAll] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerCoupons, setCustomerCoupons] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: ''
  });
  const [errors, setErrors] = useState({});

  const columns = [
    {
      title: (
        <Checkbox
          checked={selectAll}
          onChange={() => {
            const newSelectAll = !selectAll;
            setSelectAll(newSelectAll);
            if (newSelectAll) {
              setCustomerCoupons(customers.map((customer) => customer.id));
            } else {
              setCustomerCoupons([]);
            }
          }}
        />
      ),
      key: 'checkbox',
      render: (record) => <Checkbox checked={customerCoupons.includes(record.id)} onChange={() => onSelectChange(record.id)} />
    },
    {
      title: 'Họ và tên',
      key: 'ten',
      render: (record) => `${record.ho ? record.ho : ''} ${record.ten ? record.ten : ''}`.trim() || 'N/A'
    },
    { title: 'SDT', key: 'sdt' },
    { title: 'Email', key: 'email', render: (text) => (text ? text : 'N/A') }
  ];

  const onSelectChange = (customerId) => {
    setCustomerCoupons((prev) => (prev.includes(customerId) ? prev.filter((id) => id !== customerId) : [...prev, customerId]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setFormValues({ ...formValues, [name]: date });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      ...formValues,
      listKhachHang: customerCoupons,
      ngayBatDau: formValues.ngayBatDau ? moment(formValues.ngayBatDau).format('YYYY-MM-DD') : undefined,
      ngayHetHan: formValues.ngayHetHan ? moment(formValues.ngayHetHan).format('YYYY-MM-DD') : undefined
    };
    console.log('DATA : ', data);
    try {
      const response = await updatedPGG(id, data);
      if (response.status_code === 200 || response.status_code === 201) {
        setFormValues({});
        setCustomerCoupons([]);
        setSelectAll(false);
        setNotification({
          open: true,
          message: 'Cập nhập phiếu giảm giá thành công !!!',
          type: 'success'
        });
        setErrors({});
        setTimeout(() => {
          navigate('/phieugiamgia/danhsach');
        }, 2000);
      }
    } catch (error) {
      handleCouponErrors(error.response?.data, setErrors);
      setNotification({
        open: true,
        message: 'Có lỗi xảy ra khi tạo phiếu giảm giá !!!',
        type: 'error'
      });
    } finally {
    }
  };

  const handlePhamViApDungChange = (event) => {
    const value = event.target.value;
    setFormValues({ ...formValues, phamViApDung: value });
  };

  const fetchApiAllCustomer = async () => {
    setLoading(true);
    try {
      const response = await getPageKH();
      if (response && response.content) {
        setCustomers(response.content);
      } else {
        setNotification({
          open: true,
          message: 'Không thể tải dữ liệu khách hàng!',
          type: 'error'
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'Có lỗi xảy ra khi tải dữ liệu khách hàng!',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCouponById = async (couponId) => {
    try {
      const response = await getPGGById(couponId);
      console.log(response);

      if (response.status_code === 200) {
        const { data } = response;
        setFormValues({
          ma: data.ma,
          ten: data.ten,
          loaiGiamGia: data.loaiGiamGia.toString(),
          phamViApDung: data.phamViApDung.toString(),
          soLuong: data.soLuong,
          giaTriGiamGia: data.giaTriGiamGia,
          giaTriDonToiThieu: data.giaTriDonToiThieu,
          giamToiDa: data.giamToiDa,
          moTa: data.moTa,
          ngayBatDau: moment(data.ngayBatDau).format('YYYY-MM-DD'),
          ngayHetHan: moment(data.ngayHetHan).format('YYYY-MM-DD')
        });
        setCustomerCoupons(data.khachHangPhieuGiamGias);
      }
    } catch (error) {
      console.log('Error : ', error);
      setNotification({
        open: true,
        message: 'Có lỗi xảy ra khi tải dữ liệu phiếu giảm giá!',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    fetchApiAllCustomer();
    if (id) {
      fetchCouponById(id);
    }
  }, [id]);
  console.log('Danh sách khách hàng : ', customers);
  console.log('Danh sách khách hàng vs PGG : ', customerCoupons);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container>
          <Grid item xs={11} md={6}>
            <h4>Thông tin phiếu giảm giá</h4>
          </Grid>
          <Grid item xs={11} md={6}>
            <h4> Danh sách khác hàng</h4>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={11}
              md={6}
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '15px'
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Mã" name="ma" value={formValues.ma || ''} disabled={true} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tên phiếu"
                    name="ten"
                    value={formValues.ten || ''}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.ten}
                    helperText={errors.ten ? errors.ten : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Loại giảm giá</FormLabel>
                    <RadioGroup row name="loaiGiamGia" value={formValues.loaiGiamGia || '1'} onChange={handleChange}>
                      <FormControlLabel value="1" control={<Radio />} label="%" />
                      <FormControlLabel value="2" control={<Radio />} label="VND" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Phạm vi</FormLabel>
                    <RadioGroup row name="phamViApDung" value={formValues.phamViApDung || '1'} onChange={handlePhamViApDungChange}>
                      <FormControlLabel value="1" control={<Radio />} label="Công khai" />
                      <FormControlLabel value="2" control={<Radio />} label="Riêng tư" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Số lượng"
                    name="soLuong"
                    value={formValues.soLuong || ''}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    error={!!errors.soLuong}
                    helperText={errors.soLuong ? errors.soLuong : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Giá trị giảm"
                    name="giaTriGiamGia"
                    value={formValues.giaTriGiamGia || ''}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    error={!!errors.giaTriGiamGia}
                    helperText={errors.giaTriGiamGia ? errors.giaTriGiamGia : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Giá trị đơn tối thiểu"
                    name="giaTriDonToiThieu"
                    value={formValues.giaTriDonToiThieu || ''}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    error={!!errors.giaTriDonToiThieu}
                    helperText={errors.giaTriDonToiThieu ? errors.giaTriDonToiThieu : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Giá trị giảm tối đa"
                    name="giamToiDa"
                    value={formValues.giamToiDa || ''}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    error={!!errors.giamToiDa}
                    helperText={errors.giamToiDa ? errors.giamToiDa : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ngày bắt đầu"
                    name="ngayBatDau"
                    type="date"
                    value={formValues.ngayBatDau || ''}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.ngayBatDau}
                    helperText={errors.ngayBatDau || ''}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ngày kết thúc"
                    name="ngayHetHan"
                    type="date"
                    value={formValues.ngayHetHan || ''}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.ngayHetHan}
                    helperText={errors.ngayHetHan || ''}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Mô tả" name="moTa" value={formValues.moTa || ''} onChange={handleChange} multiline rows={4} fullWidth />
                </Grid>
                <Grid style={{ marginTop: '20px', marginLeft: '20px' }}>
                  <Button type="submit" variant="contained" color="primary" size="large">
                    Lưu
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11} md={6}>
              <Paper style={{ height: '70vh', overflow: 'auto' }}>
                {loading ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%'
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell key={column.key}>{column.title}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {customers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <Checkbox checked={customerCoupons.includes(customer.id)} onChange={() => onSelectChange(customer.id)} />
                            </TableCell>
                            <TableCell>{`${customer.ho ? customer.ho : ''} ${customer.ten ? customer.ten : ''}`.trim() || 'N/A'}</TableCell>
                            <TableCell>{customer.sdt}</TableCell>
                            <TableCell>{customer.email ? customer.email : 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </Grid>
          </Grid>
        </form>
      </LocalizationProvider>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{ style: { backgroundColor: notification.type === 'success' ? 'green' : 'red' } }}
      />
    </>
  );
}

export default UpdateCoupons;
