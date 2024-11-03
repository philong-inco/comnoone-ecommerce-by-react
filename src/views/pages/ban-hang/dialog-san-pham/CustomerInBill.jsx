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
  Tooltip
} from '@mui/material';
import { GridCheckCircleIcon } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addCustomerToBill } from 'services/admin/bill/billService';
import { fetchSearchCustomer, findCustomerByPhone } from 'services/admin/customer/customerService';

function CustomerInBill(props) {
  const { id } = useParams();
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
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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

  return (
    <>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 1, borderRadius: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h3">Khách hàng</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleShowDiaLogCustomer();
            }}
            disabled={id ? false : true}
          >
            Chọn khách hàng
          </Button>
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
        <DialogTitle>Danh sách khách hàng</DialogTitle>
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
                  <TableCell>Hành động</TableCell>
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
                        <IconButton
                          onClick={() => {
                            handleAddCustomerToBill(customer.id);
                          }}
                          color="primary"
                          disabled={bill?.idKhachHang === false || bill.idKhachHang === customer.id}
                        >
                          <GridCheckCircleIcon />
                        </IconButton>
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
          <Button onClick={handleCloseShowDiaLogCustomer} color="primary">
            Đóng
          </Button>
        </DialogActions>
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
