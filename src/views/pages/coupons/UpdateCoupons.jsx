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
  Radio,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { createPGG, getPGGById, updatedPGG } from 'services/admin/coupons/couponsService';
import { getPageKH } from 'services/admin/customer/customerService';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCoupons() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectAll, setSelectAll] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerCoupons, setCustomerCoupons] = useState([]);
  const [showCustomerTable, setShowCustomerTable] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: ''
  });

  //   const columns = [
  //     {
  //       title: (
  //         <Checkbox
  //           checked={selectAll}
  //           onChange={() => {
  //             const newSelectAll = !selectAll;
  //             setSelectAll(newSelectAll);
  //             if (newSelectAll) {
  //               setCustomerCoupons(customers.map((customer) => customer.id));
  //             } else {
  //               setCustomerCoupons([]);
  //             }
  //           }}
  //         />
  //       ),
  //       key: 'checkbox',
  //       render: (record) => <Checkbox checked={customerCoupons.includes(record.id)} onChange={() => onSelectChange(record.id)} />
  //     },
  //     {
  //       title: 'Họ và tên',
  //       key: 'ten',
  //       render: (record) => {
  //         const hoVaTen = `${record.ho ? record.ho : ''} ${record.ten ? record.ten : ''}`.trim();
  //         return hoVaTen || 'N/A';
  //       }
  //     },
  //     {
  //       title: 'SDT',
  //       key: 'sdt',
  //       render: (record) => (record.sdt ? record.sdt : 'N/A')
  //     },
  //     {
  //       title: 'Email',
  //       key: 'email',
  //       render: (record) => (record.email ? record.email : 'N/A')
  //     }
  //   ];

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
      ngayHetHan: formValues.ngayKetThuc ? moment(formValues.ngayKetThuc).format('YYYY-MM-DD') : undefined
    };
    console.log(data);
    try {
      const response = await updatedPGG(id, data);
      if (response.status_code === 200 || response.status_code === 201) {
        setFormValues({});
        setCustomerCoupons([]);
        setSelectAll(false);
        setNotification({
          open: true,
          message: 'Tạo phiếu giảm giá thành công!',
          type: 'success'
        });
        navigate('/phieugiamgia/danhsach');
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'Có lỗi xảy ra khi tạo phiếu giảm giá!',
        type: 'error'
      });
    } finally {
    }
  };

  const handlePhamViApDungChange = (event) => {
    const value = event.target.value;
    setFormValues({ ...formValues, phamViApDung: value });
    setShowCustomerTable(value === '2');
  };

  const fetchApiAllCustomer = async () => {
    setLoading(true);
    try {
      const response = await getPageKH();
      console.log('res', response);
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
          giamToiGia: data.giamToiGia,
          moTa: data.moTa,
          ngayBatDau: moment(data.ngayBatDau),
          ngayKetThuc: moment(data.ngayHetHan)
        });
        setCustomerCoupons(data.khachHangPhieuGiamGias.map((kh) => kh.id));
        setShowCustomerTable(data.phamViApDung.toString() === '2');
      }
    } catch (error) {
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
  console.log(customers);

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
                  <TextField label="Mã" name="ma" value={formValues.ma || ''} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Tên phiếu" name="ten" value={formValues.ten || ''} onChange={handleChange} fullWidth />
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Giảm tối đa"
                    name="giamToiGia"
                    value={formValues.giamToiGia || ''}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Ngày bắt đầu"
                    value={formValues.ngayBatDau || null}
                    onChange={(date) => handleDateChange('ngayBatDau', date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Ngày kết thúc"
                    value={formValues.ngayKetThuc || null}
                    onChange={(date) => handleDateChange('ngayKetThuc', date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Mô tả" name="moTa" value={formValues.moTa || ''} onChange={handleChange} multiline rows={4} fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11} md={6}>
              {/* <Paper style={{ height: '70vh', overflow: 'auto' }}>
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
                      <TableBody>
                        {customers.map((record) => (
                          <TableRow key={record.id}>
                            {columns.map((column) => (
                              <TableCell key={column.key}>
                                {column.render ? column.render(record[column.key], record) : record[column.key]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper> */}
            </Grid>
          </Grid>
          <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Lưu
            </Button>
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
