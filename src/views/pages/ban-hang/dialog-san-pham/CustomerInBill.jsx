import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableCell,
  TableBody,
  Pagination,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import { GridCheckCircleIcon } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addCustomerToBill } from 'services/admin/bill/billService';
import { fetchSearchCustomer, findCustomerByPhone } from 'services/admin/customer/customerService';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

function CustomerInBill(props) {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm();
  const { bill, onLoading } = props;
  const [customers, setCustomers] = useState([]);
  const [showDiaLogCustomer, setShowDiaLogCustomer] = useState(false);
  const [pageCustomer, setPageCustomer] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [customer, setCustomer] = useState({
    ten: '',
    sdt: '',
    email: '',
    diaChi: ''
  });
  const [openAddCustomer, setOpenAddCustomer] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpenAddCustomer(true);
    // handleCloseShowDiaLogCustomer();
  };
  const handleClose = () => setOpenAddCustomer(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (!id) {
      setCustomer({
        ten: '',
        sdt: '',
        email: '',
        diaChi: ''
      });
    } else {
      setCustomer({
        ten: bill.tenKhachHang,
        sdt: bill.sdt || '',
        email: bill.email,
        diaChi: bill.diaChi
      });
    }
  }, [id, bill]);

  console.log('bill', bill);
  console.log('setCustomer ', customer);

  const fetchApiAllCustomer = async (page) => {
    try {
      // searchCustomer
      // const response = await getAll(page - 1);
      const response = await fetchSearchCustomer(searchCustomer, page - 1);
      if (response) {
        setCustomers(response.content);
        setTotalCustomers(response.totalPages);
      } else {
      }
    } catch (error) {
      setSnackbarMessage('Api khách hàng lỗi');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleChangeSearchCustomer = (e) => {
    const { value } = e.target;
    setSearchCustomer(value.trim());
    fetchApiAllCustomer(pageCustomer);
  };

  const handleAddCustomerToBill = async (customerId) => {
    try {
      const response = await addCustomerToBill(customerId, id);
      if (response.status_code) {
        setSnackbarMessage('Thêm khách hàng thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        console.log('DATA IN CUSMTOM  :', response.data);

        setCustomer({
          ten: response.data.tenKhachHang,
          sdt: response.data.sdt,
          email: response.data.email,
          diaChi: response.data.diaChi
        });
        onLoading();
        handleCloseShowDiaLogCustomer();
      } else {
      }
    } catch (error) {
      setSnackbarMessage('Thêm khách hàng thất bại');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const findCustomerByPhoneNumber = async (phoneNumber) => {
    try {
      const response = await findCustomerByPhone(phoneNumber);
      if (response) {
        setSnackbarMessage('Thêm khách hàng thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleAddCustomerToBill(response.data.id, id);
        setCustomer({
          ten: response.data.ten,
          sdt: response.data.sdt,
          email: response.data.email
        });
      } else {
        setSnackbarMessage('Khoong thể thêm');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log(error);

      setSnackbarMessage(error.response.data.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  const handleSubmitFormFindCumster = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sdt = formData.get('sdt');
    findCustomerByPhoneNumber(sdt.trim());
  };
  const handleChangePageCustomer = (newPage) => {
    setPageCustomer(newPage);
    fetchApiAllCustomer(newPage);
  };

  const handleShowDiaLogCustomer = (id) => {
    setShowDiaLogCustomer(true);
    fetchApiAllCustomer(pageCustomer);
  };

  const handleCloseShowDiaLogCustomer = () => {
    setShowDiaLogCustomer(false);
    setCustomers([]);
  };
  //
  const onSubmit = async (data) => {
    setLoading(true);
    let finalData = {
      ten: data.name,
      email: data.email,
      sdt: data.phone,
      ngay_sinh: new Date(data.dob).toISOString(),
      gioi_tinh: data.gender,
      hinhAnh: null,
      idPhuongXa: 100410,
      idQuanHuyen: 3310,
      idTinhThanhPho: 247,
      diaChiNhanHang: ''
    };
    console.log('Customer Data:', finalData);
    try {
      const response = await axios.post(`https://weblaptop-by-springboot-and-reactjs-aqjc.onrender.com/api/khachhang/create`, finalData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        console.log(response);
        handleAddCustomerToBill(response.data.id);
        setSnackbarMessage('Dữ liệu khách hàng được thêm thành công!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        reset();
        handleClose();
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.log(error);

      handleApiError(error);
    }
    setLoading(false);

    // handleClose();
  };
  const handleApiError = (error) => {
    // debugger;
    let errorMessage = 'Có lỗi xảy ra khi xử lý yêu cầu!';

    if (error.response && error.response.data) {
      const errorData = error.response.data;

      if (errorData.message) {
        errorMessage = errorData.message;
      }

      if (errorData.error) {
        const mainError = errorData.error.split(':').pop().trim();
        errorMessage = `${errorMessage}: ${mainError}`;
      }
      if (errorData.errors && Array.isArray(errorData.errors)) {
        const additionalErrors = errorData.errors.map((err) => err.message || err).join('; ');
        errorMessage = `${errorMessage}. Chi tiết: ${additionalErrors}`;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    setSnackbarMessage(errorMessage);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  };

  const validateDateOfBirth = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const isAdult = age > 16 || (age === 16 && today >= new Date(birthDate.setFullYear(today.getFullYear())));
    return isAdult || 'Khách hàng phải đủ 16 tuổi';
  };

  return (
    <>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 1, borderRadius: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h3">Khách hàng</Typography>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleShowDiaLogCustomer();
              }}
              disabled={!id}
              sx={{ mr: 1 }} // Thêm margin giữa các nút
            >
              Chọn khách hàng
            </Button>
            <Button disabled={!id} variant="contained" color="primary" onClick={handleOpen}>
              Thêm nhanh
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} paddingY={2} borderBottom={1} borderColor="grey.300">
          <Grid item xs={6}>
            <Typography variant="subtitle1">Tên khách hàng : {customer.ten}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Email : {customer.email}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} paddingY={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
              Số điện thoại :{/* {customer.sdt} */}
              <form onSubmit={handleSubmitFormFindCumster} style={{ width: '70%', marginLeft: '5px' }}>
                {/* <input
                  type="text"
                  placeholder="Số điện thoại"
                  // value={customer.sdt}
                  name="sdt"
                  defaultValue={customer.sdt}
                  style={{ width: '50%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                /> */}
                <TextField
                  color="secondary"
                  type="text"
                  placeholder="Số điện thoại"
                  name="sdt"
                  // defaultValue={customer.sdt || ''}
                  value={customer.sdt}
                  variant="outlined" // Hoặc 'filled' hoặc 'standard' tùy theo kiểu bạn muốn
                  label="Số điện thoại" // Thêm label cho TextField
                  InputLabelProps={{
                    shrink: !!customer.sdt // Đưa label lên nếu có dữ liệu
                  }}
                  onChange={(e) => {
                    setCustomer({
                      ...customer, // Giữ lại các giá trị khác của customer
                      sdt: e.target.value // Cập nhật giá trị sdt
                    });
                  }}
                  fullWidth // Đảm bảo trường nhập chiếm toàn bộ chiều rộng của không gian cha
                  margin="normal" // Khoảng cách tiêu chuẩn xung quanh trường nhập
                />
              </form>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Địa chỉ : {customer.diaChi}</Typography>
          </Grid>
        </Grid>
        {/* </Paper> */}
      </Grid>
      {/*  */}

      {/* Khách hàng */}
      <Dialog open={showDiaLogCustomer} onClose={handleCloseShowDiaLogCustomer} maxWidth="md" fullWidth>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
          <DialogTitle style={{ margin: 0 }}>Danh sách khách hàng</DialogTitle>
          {/* <AddCustomer handleCloseShowDiaLogCustomer={handleCloseShowDiaLogCustomer} onLoading={loadAll()} /> */}
        </div>
        <DialogContent>
          {/* Thêm bảng vào Dialog */}
          <input
            type="text"
            name="search"
            placeholder="Tìm theo mã , tên , sđt , email"
            onChange={handleChangeSearchCustomer}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell>SDT</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Hành động </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell></TableCell>
                    <TableCell>{`${customer.ho ? customer.ho : ''} ${customer.ten ? customer.ten : ''}`.trim() || 'N/A'}</TableCell>
                    <TableCell>{customer.sdt}</TableCell>
                    <TableCell>{customer.email ? customer.email : 'N/A'}</TableCell>
                    <TableCell>
                      <Tooltip title="Chọn khách hàng này" placement="top">
                        {/* <IconButton
                          onClick={() => {
                            handleAddCustomerToBill(customer.id);
                          }}
                          color="secondary"
                          disabled={bill?.idKhachHang === false || bill.idKhachHang === customer.id}
                        >
                          <GridCheckCircleIcon />
                        </IconButton> */}
                        <Button
                          onClick={() => {
                            handleAddCustomerToBill(customer.id);
                          }}
                          variant="contained"
                          color="secondary"
                          disabled={bill?.idKhachHang === false || bill.idKhachHang === customer.id}
                        >
                          Chọn
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <Pagination
          sx={{ marginTop: '10px', textAlign: 'center' }}
          count={totalCustomers}
          page={pageCustomer}
          onChange={(event, value) => handleChangePageCustomer(value)}
        />
        <DialogActions>
          <Button onClick={handleCloseShowDiaLogCustomer} variant="contained" color="error">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddCustomer} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Thêm mới khách hàng</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {/* Họ và Tên */}
            <TextField
              fullWidth
              label="Họ và tên"
              margin="dense"
              {...register('name', {
                required: 'Họ và tên là bắt buộc',
                minLength: { value: 5, message: 'Họ và tên phải từ 5 ký tự' },
                maxLength: { value: 25, message: 'Họ và tên không vượt quá 25 ký tự' }
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              margin="dense"
              {...register('email', {
                required: 'Email là bắt buộc',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: 'Email không hợp lệ'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            {/* Số điện thoại */}
            <TextField
              fullWidth
              label="Số điện thoại"
              margin="dense"
              {...register('phone', {
                required: 'Số điện thoại là bắt buộc',
                pattern: {
                  value: /^0[0-9]{9}$/,
                  message: 'Số điện thoại phải bắt đầu bằng 0 và gồm 10 chữ số'
                }
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            {/* Ngày sinh */}
            <TextField
              fullWidth
              type="date"
              label="Ngày sinh"
              InputLabelProps={{ shrink: true }}
              margin="dense"
              {...register('dob', {
                required: 'Ngày sinh là bắt buộc',
                validate: validateDateOfBirth
              })}
              error={!!errors.dob}
              helperText={errors.dob?.message}
            />
            {/* Giới tính */}
            <FormControl component="fieldset" margin="dense">
              <FormLabel component="legend">Giới tính</FormLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue="1" // Nam mặc định
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value="1" control={<Radio />} label="Nam" />
                    <FormControlLabel value="0" control={<Radio />} label="Nữ" />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Hủy
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              Lưu
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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

export default CustomerInBill;
